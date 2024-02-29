from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

def user_exists(form, field):
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("Email address is already in use")

def username_exists(form, field):
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError("Username is already taken")

def password_length_checker(form, field):
    password = field.data
    if len(password) < 6:
        raise ValidationError("Please input atleast 6 characters")

def username_length_checker(form, field):
    user = field.data
    if len(username) < 4:
        raise ValidationError("Please input atleast 4 characters")

class SignUpForm(FlaskForm):
    username = StringField("username", validators=[DataRequired(), username_exists, username_length_checker])
    email = StringField("email", validators=[DataRequired(), Email(), user_exists])
    password = StringField, validators=[DataRequired(), password_length_checker]
