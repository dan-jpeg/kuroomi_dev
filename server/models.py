from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from  werkzeug.security import generate_password_hash, check_password_hash
from flask import jsonify, Flask, request, make_response

from functools import wraps

metadata = MetaData(
    naming_convention={
    "ix": 'ix_%(column_0_label)s',
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
    }
)

app = Flask(__name__)

db = SQLAlchemy(metadata=metadata)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    username = db.Column(db.Integer, nullable=False, unique=True)
    password = db.Column(db.Integer, nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)

    budget = db.Column(db.Integer)
    reviews = db.relationship('Review', backref='user')



    # products = db.relationship('Product', backref='artist', cascade='all, delete-orphan')
    # categories = association_proxy('products', 'category',
    #     creator=lambda c: Product(category=c))
    
    validates('name')
    def validate_name(self, key, value):
        if not (4 <= len(value) <= 25):
            raise ValueError(f'not a valid {key}! Must be between 4 and 25 characters in length...')
        return value
    

    def __repr__(self):
        return f"user #{self.id} | name : {self.name} | budget : {self.budget}"

class Owner(db.Model, SerializerMixin):
    __tablename__ = 'owners'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    
    properties = db.relationship('Property', backref='properties', cascade='all, delete-orphan')
    

    validates('category_name')
    def validate_category_name(self, key, value):
        if not (3 <= len(value) <= 30):
            raise ValueError(f'{key} must be between 3 and 30 characters in length...')
        return value  

 
    def __repr__(self):
        return f"landlord # {self.id}: {self.name}"
    
class Property(db.Model, SerializerMixin):
    __tablename__ = 'properties'

    id = db.Column(db.Integer, primary_key=True)
    address = db.Column(db.String, nullable=False)
    neighborhood = db.Column(db.String)
    price = db.Column(db.Integer)
    number_of_bedrooms = db.Column(db.Integer)
    borough = db.Column(db.String)
    img_url = db.Column(db.String)

    owner_id = db.Column(db.Integer, db.ForeignKey('owners.id'))

    validates('address')
    def validates_address(self, key, value):
        if not (4 <= len(value) <= 30):
            raise ValueError('address field must be between 4 and 30 characters')
        return value

    validates('price')
    def validates_price(self, key, price):
        if not (100 <= price <= 30000):
            raise ValueError('price must be between 100 and 30000 la')
        return price

    def __repr__(self):
        return f"Property # {self.id}: {self.price} | {self.address} | in {self.neighborhood}"
    

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('owners.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    rating = db.Column(db.Integer)
    title = db.Column(db.String)
    description = db.Column(db.String)
    owner = db.relationship('Owner', backref='reviews')

    