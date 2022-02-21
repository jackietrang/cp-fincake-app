import os
from flask import Flask
from flask_login import LoginManager, UserMixin, current_user, login_user, login_required, logout_user, login_manager
from flask import Flask, render_template, redirect, url_for, request, g, session, jsonify
from flask_sqlalchemy import SQLAlchemy
import re

# set up project directory
project_dir = os.path.dirname(os.path.abspath(__file__))
DATABASE_URL = "sqlite:///{}".format(os.path.join(project_dir, "database.db"))

# set up flask app
main = Flask(__name__, template_folder='./templates', static_folder='./static')
main.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL
main.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 
db = SQLAlchemy(main) 

# set up add and flask-login
main.secret_key = 'jackie trang'
signin = LoginManager() #buitin
signin.init_app(main) #configure app for login 
signin.login_view = 'signin'

# Initialize data table
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(100))
    password = db.Column(db.String(100))
    score_entry = db.relationship('ScoreEntry', backref='user', lazy=True)
    score_level1 = db.relationship('ScoreLevel1', backref='user', lazy=True)
    score_level2 = db.relationship('ScoreLevel2', backref='user', lazy=True)

class ScoreEntry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    score = db.Column('score', db.Integer)
    score_percent = db.Column('score_percent', db.Integer)
    question_num = db.Column('question_num', db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)

    def __init__(self, score, score_percent, question_num, user_id):
        self.score = score
        self.score_percent = score_percent
        self.question_num = question_num
        self.user_id = user_id

class ScoreLevel1(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    score = db.Column('score', db.Integer)
    score_percent = db.Column('score_percent', db.Integer)
    question_num = db.Column('question_num', db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)

    def __init__(self, score, score_percent, question_num, user_id):
        self.score = score
        self.score_percent = score_percent
        self.question_num = question_num
        self.user_id = user_id

class ScoreLevel2(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    score = db.Column('score', db.Integer)
    score_percent = db.Column('score_percent', db.Integer)
    question_num = db.Column('question_num', db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)

    def __init__(self, score, score_percent, question_num, user_id):
        self.score = score
        self.score_percent = score_percent
        self.question_num = question_num
        self.user_id = user_id

        
# create database
db.create_all()
db.session.commit()

@main.route('/', methods=['GET'])
def landing_page():
    return render_template('landing.html')

@signin.user_loader
def load_user(id):
    '''
    This sets the callback for reloading a user from the session. 
    The function you set should take a user ID (a unicode)
     and return a user object, or None if the user does not exist.
    '''
    return User.query.get(int(id))

@main.before_request
def before_request():
    '''
    Set g.user to current_user before running any requests
    '''
    g.user = current_user

@main.route('/signup', methods=['GET','POST'])
def signup():
    '''
    Sign up new users with password requirements
    - POST request: Save user sign-up information to db and redirect them to log-in page
    - GET request: render sign-up page
    '''
    if request.method == 'POST':
        # Checks password requirements
        password = request.form.get('password')
        user_name = request.form.get('user_name')
        signup_user = User(user_name=user_name, password=password) # new instance of user
        # add user login + password to db
        db.session.add(signup_user)
        db.session.commit()
        return redirect("/signin")

    elif request.method == 'GET':
        return render_template('signup.html')
    
@main.route('/signin', methods=['GET', 'POST'])
def signin():
    if request.method == 'POST':
        password = request.form.get('password')
        user_name = request.form.get('user_name')
        user = User.query.filter_by(user_name=user_name, password=password).first()
        if user: 
            login_user(user)
            return redirect('/index')

    elif request.method == 'GET':
        return render_template('login.html')


@main.route('/index', methods=['GET', 'POST'])
def index():
    return render_template('index.html')

@main.route('/entry_test', methods=['GET'])
def entry_test():
    return render_template('entry_test.html')

@main.route('/entry_test_flashcards', methods=['GET'])
def entry_test_flashcards():
    return render_template('flashcard/entry_test_flashcards.html')

@main.route('/consumer_credit_flashcards', methods=['GET'])
def consumer_credit_flashcards():
    return render_template('flashcard/consumer_credit_flash_cards.html')

@main.route('/consumer_credit_quiz', methods=['GET'])
def consumer_credit_quiz():
    return render_template('level1_consumer_credit_quiz.html')

@main.route('/credit_factors_flashcards', methods=['GET'])
def credit_factors_flashcards():
    return render_template('credit_factors_flash_cards.html')

@main.route('/credit_factors_quiz', methods=['GET'])
def credit_factors_quiz():
    return render_template('flashcard/credit_factors_quiz.html')

@main.route('/my_progress', methods=['GET'])
def my_progress():
    score_entry = ScoreEntry.query.order_by(ScoreEntry.id.desc()).first()
    score_level1 = ScoreLevel1.query.order_by(ScoreLevel1.id.desc()).first()
    score_level2 = ScoreLevel2.query.order_by(ScoreLevel2.id.desc()).first()
    return render_template('user_progress.html', user=current_user, score_entry=score_entry, score_level1=score_level1, score_level2=score_level2)

@main.route('/process_score1', methods=['POST', 'GET'])
def process_score1():
  if request.method == "POST":
    
    data = request.get_json()
    db.session.add(ScoreLevel1(data[0]['score'], data[1]['scorePercent'], data[2]['questionNum'], current_user.id))
    db.session.commit()

@main.route('/process_entry', methods=['POST', 'GET'])
def process_entry():
  if request.method == "POST":
    data = request.get_json()
    print(data, 'jackie_data')
    db.session.add(ScoreEntry(data[0]['score'], data[1]['scorePercent'], data[2]['questionNum'], current_user.id))
    db.session.commit()
    
if __name__ == "__main__":
    main.run(debug=True)

