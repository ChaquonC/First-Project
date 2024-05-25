from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError
from app.models import User
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.aws_helpers import ALLOWED_IMAGE_EXTENSIONS


# tester function to see values
def checkin_value_temp(form, field):
    print("__________________________________________________")
    print(field)
    print(field.data)
    print(type(field.data))
    print("__________________________________________________")

class CreateCharacterForm(FlaskForm):

    # character fields
    name = StringField("name", validators=[DataRequired()])
    sprite = FileField('sprite', validators=[FileRequired(), FileAllowed(list(ALLOWED_IMAGE_EXTENSIONS))])

    #stats fields
    hp = IntegerField('hp', validators=[DataRequired()])
    armor = IntegerField('armor', validators=[DataRequired()])
    damage = IntegerField('damage', validators=[DataRequired()])
    weakness = StringField('weakness', validators=[DataRequired()])
    resistance = StringField('resistance', validators=[DataRequired()])

    #move fields
    firstMoveName = StringField('firstMoveName', validators=[DataRequired()])
    firstMoveType = StringField('firstMoveType', validators=[DataRequired()])
    secondMoveName = StringField('secondMoveName', validators=[DataRequired()])
    secondMoveType = StringField('secondMoveType', validators=[DataRequired()])

    submit = SubmitField('Submit')
