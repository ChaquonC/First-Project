from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
from sqlalchemy import or_

def user_exists(form, field):
    credential = field.data
    user = User.query.filter(or_(User.email == credential, User.username == credential)).first()
    if not user:
        raise ValidationError('Credential provided not found')

def password_matches(form, field):
    password = field.data
    credential = form.data['credential']
    user = User.query.filter(or_(User.email == credential, User.username == credential)).first()
    if not user:
        raise ValidationError('No such user exists.')
    if not user.check_password(password):
        raise ValidationError('Password was incorrect.')

class LoginForm(FlaskForm):
    credential = StringField('credential', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired(), password_matches])
