
## Initial Setup

1. Make sure you have git installed on your device, run the following command on the terminal:

```
git --version
```

2. Clone the repo to a "local" directory (on your computer), 

```
git clone https://github.com/minerva-schools/cs162-minerva-notification
```

then change into the directory

```
cd cs162-minerva-notification
```

3. To make sure everything is up to date on your end, run

```
git pull
```

4. Always create a branch for any new task

```
git checkout -b [name-of-branch]
```

5. If you are using Visual Studio Code to contribute, you can use

```
code .
```

and make your contributions in the branch you have created.

6. Save all changes in Visual Studio Code, then run

```
git add .
git status
git commit -m "A clear message about contribution"
git push
```

## Run Virtual Environment

Virtual environment is a key component in ensuring that the application is configured in the right environment

**Requirements**

* Python 3
* Pip 3

```bash
$ brew install python3
```

Pip3 is installed with Python3

**Installation**

To install virtualenv via pip run:
```bash
$ pip3 install virtualenv
```

On Windows:

```
python -m pip install virtualenv
```

**Usage**

Creation of virtualenv:

    $ virtualenv -p python3 venv

If the above code does not work, you could also do

    $ python3 -m venv venv

To activate the virtualenv:

    $ source venv/bin/activate

Install dependencies in virtual environment:

    $ pip3 install -r requirements.txt

Or, if you are **using Windows** - [reference source:](https://stackoverflow.com/questions/8921188/issue-with-virtualenv-cannot-activate)

    $ venv\Scripts\activate

To deactivate the virtualenv (after you finished working):

    $ deactivate


## Run Application

```
from web import db, create_app
from web.models import *  # This will import all table schemas
db.create_all(app=create_app()) 
exit()
```

Then, start the server by running:

    $ export FLASK_ENV=development
    $ export FLASK_APP=web
    $ export FLASK_DEBUG=1
    $ python3 -m flask run

![summary](https://user-images.githubusercontent.com/42923696/153955668-0987faa3-a71f-436d-bf54-1c3028620b04.png)
