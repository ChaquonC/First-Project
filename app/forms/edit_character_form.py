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

class EditCharacterForm(FlaskForm):

    # character fields
    name = StringField("name", validators=[])
    sprite = FileField('sprite', validators=[FileAllowed(list(ALLOWED_IMAGE_EXTENSIONS))])

    #stats fields
    hp = IntegerField('hp', validators=[])
    armor = IntegerField('armor', validators=[])
    damage = IntegerField('damage', validators=[])
    weakness = StringField('weakness', validators=[])
    resistance = StringField('resistance', validators=[])

    #move fields
    firstMoveName = StringField('firstMoveName', validators=[])
    firstMoveType = StringField('firstMoveType', validators=[])
    secondMoveName = StringField('secondMoveName', validators=[])
    secondMoveType = StringField('secondMoveType', validators=[])
    move1ID = IntegerField('move1ID', validators=[])
    move2ID = IntegerField('move2ID', validators=[])
    statsID = IntegerField('statsID', validators=[])

    submit = SubmitField('Submit')
