import os
from flask import Flask
from flask_login import LoginManager, UserMixin, current_user, login_user, login_required, logout_user, login_manager
from flask import Flask, render_template, redirect, url_for, request, g, session
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
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    user_email = db.Column(db.String(100))
    password = db.Column(db.String(100))

# create database
db.create_all()
db.session.commit()

@main.route('/', methods=['GET', 'POST'])
def landing_page():
    # redirect(url_for('signin'))
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
        # password needs at least 1 number
        if re.search('[0-9]', password) is None:
            error_msg = "Password needs at least one number"
            return render_template("signup.html", error=error_msg)
        # password needs at least 1 letter
        elif re.search('[a-z]', password) is None:
            error_msg = "Password needs at least one letter"
            return render_template("signup.html", error=error_msg)
        # password and re-entered password match
        if password != request.form.get('repeat'):
            error_msg = "Password doesn't match"
            return render_template("signup.html", error=error_msg)
        user_email = request.form.get('user_email')
        signup_user = User(user_email=user_email, password=password) # new instance of user
        # add user login + password to db
        db.session.add(signup_user)
        db.session.commit()
        return redirect("/signin")

    elif request.method == 'GET':
        return render_template('signup.html')
    
@main.route('/signin', methods=['GET', 'POST'])
def signin():
    if request.method == 'POST':
        user_email = request.form.get('user_email')
        password = request.form.get('password')
        user_name = request.form.get('user_name')
        user = User.query.filter_by(user_email=user_email, password=password).first()
        # return user_name
        if user: 
            login_user(user)
            if user_name != None:
                return render_template('index.html', user_name=user_name)
            else: 
                return render_template('index.html', user_name =" there")
    elif request.method == 'GET':
        return render_template('login.html')
    
if __name__ == "__main__":
    main.run(debug=True)

