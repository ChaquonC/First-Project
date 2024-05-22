from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError
from app.models import User
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.aws_helpers import ALLOWED_IMAGE_EXTENSIONS


class CreateCharacterForm(FlaskForm):
    hp = IntegerField('hp', validators=[DataRequired()])
    armor = IntegerField('armor', validators=[DataRequired()])
    damage = IntegerField('damage', validators=[DataRequired()])
    weakness = StringField('weakness', validators=[DataRequired()])
    resistance = StringField('resistance', validators=[DataRequired()])
    move1_name = StringField('first_move', validators=[DataRequired()])
    move1_type = StringField('first_move_type', validators=[DataRequired()])
    move2_name = StringField('second_move', validators=[DataRequired()])
    move2_type = StringField('second_move_type', validators=[DataRequired()])
    image = FileField('image', validators=[FileRequired(), FileAllowed(list(ALLOWED_IMAGE_EXTENSIONS))])
    submit = SubmitField('Submit')
