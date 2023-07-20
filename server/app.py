from flask import Flask, make_response, jsonify, request, current_app
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS  # Import Flask-CORS
from flask_restful import Api, Resource
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
import jwt
import uuid
import os
from config import Config



from models import db, Owner, Property, User, Review


app = Flask(__name__)
app.config.from_object(Config)
CORS(app)  # Enable CORS for all routes

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///properties.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)
@app.route('/')
def index():
    return '<h1>properties database</h1>'

class PropertiesClass(Resource):
    
    def get(self):
        properties = Property.query.all()

        response_body = []

        for property in properties:
            response_body.append(property.to_dict(only=('id','address','neighborhood','borough','price','owner_id','img_url')))

        return make_response(jsonify(response_body), 200)
        
    def post(self):
        json_data = request.get_json()
        new_property = Property(owner_id=json_data.get('owner_id'), address=json_data.get('address'), price=json_data.get('price'), neighborhood=json_data.get('neighborhod'))
        db.session.add(new_property)
        db.session.commit()

        response_body = new_property.to_dict()

        return make_response(jsonify(response_body), 201)

api.add_resource(PropertiesClass, '/properties')

class PropertiesById(Resource):
    def get(self, id):
        property = Property.query.filter(Property.id == id).first()

        if not property:
            response_body = {
                "error": "Property not found"
            }
            status = 404
        else:
            response_body = property.to_dict(only=('id','address','neighborhood','borough','price','owner_id'))
            status = 200
        
        return make_response(jsonify(response_body), status)
    
    def patch(self, id):
        property = Property.query.filter(Property.id == id).first()

        if not property:
            response_body = {
                "error": "property not found"
            }
            status = 404
        else:
            json_data = request.get_json()

            for key in json_data:
                setattr(property, key, json_data.get(key))

                db.session.commit()

                response_body = property.to_dict()
                status = 200
            
            return make_response(jsonify(response_body), status)
        
    def delete(self, id):
        property = Property.query.filter(Property.id == id).first()

        if not property:

            response_body = {
                "error": "property not found"
            }
            status = 404

        else:

            db.session.delete(property)
            db.session.commit()

            response_body = {}

            status = 204

        return make_response(jsonify(response_body), status)

api.add_resource(PropertiesById, '/properties/<int:id>')

class UsersClass(Resource):
    
    def get(self):
        users = User.query.all()

        response_body = []

        for user in users:
            response_body.append(user.to_dict(only=('id','name', 'username', 'password', 'email', 'budget')))

        return make_response(jsonify(response_body), 200)
        
    def post(self):
        json_data = request.get_json()
        new_user = User(name=json_data.get('name'), email=json_data.get('email'), budget=json_data.get('budget'), username=json_data.get('username'), password=json_data.get('password'))
        db.session.add(new_user)
        db.session.commit()

        response_body = new_user.to_dict()

        return make_response(jsonify(response_body), 201)

api.add_resource(UsersClass, '/users')


class UsersById(Resource):
    def get(self, id):
        user = User.query.filter(User.id == id).first()

        if not user:
            response_body = {
                "error": "user not found"
            }
            status = 404
        else:
            response_body = user.to_dict(only=('id','name','budget'))
            status = 200
        
        return make_response(jsonify(response_body), status)
    
    def patch(self, id):
        user = User.query.filter(User.id == id).first()

        if not user:
            response_body = {
                "error": "user not found"
            }
            status = 404
        else:
            json_data = request.get_json()

            for key in json_data:
                setattr(user, key, json_data.get(key))

                db.session.commit()

                response_body = user.to_dict()
                status = 200
            
            return make_response(jsonify(response_body), status)
        
    def delete(self, id):
        user = User.query.filter(User.id == id).first()

        if not user:

            response_body = {
                "error": "user not found"
            }
            status = 404

        else:

            db.session.delete(user)
            db.session.commit()

            response_body = {}

            status = 204

        return make_response(jsonify(response_body), status)

api.add_resource(UsersById, '/users/<int:id>')


class OwnerClass(Resource):
    def get(self):
        owners = Owner.query.all()
        
        response_body = []
        for owner in owners:
            owner_data = {
                'id': owner.id,
                'name': owner.name,
                'properties': [],
                'average_rating': 0.0
            }

            properties = []
            for p in owner.properties:
                properties.append({
                    'neighborhood': p.neighborhood,
                    'price': p.price
                })
            owner_data['properties'] = properties
            
            reviews = Review.query.filter(Review.owner_id == owner.id).all()
            if reviews:
                average_rating = sum([r.rating for r in reviews]) / len(reviews)
                owner_data['average_rating'] = average_rating
                owner_data['number_of_reviews'] = len(reviews)

            response_body.append(owner_data)
    
        return make_response(jsonify(response_body), 200)
    def post(self):
        json_data = request.get_json()
        new_owner = Owner(name=json_data.get('name'))
        db.session.add(new_owner)
        db.session.commit()

        response_body = new_owner.to_dict()

        return make_response(jsonify(response_body), 201)

api.add_resource(OwnerClass, '/owners')



class OwnersById(Resource):
    def get(self, id):
        owner = Owner.query.filter(Owner.id == id).first()

        if not owner:
            response_body = {
                "error": "owner not found"
            }
            status = 404
        else:
            response_body = owner.to_dict(only=('id','name'))
            status = 200
        
        return make_response(jsonify(response_body), status)
    
    def patch(self, id):
        owner = Owner.query.filter(Owner.id == id).first()

        if not owner:
            response_body = {
                "error": "owner not found"
            }
            status = 404
        else:
            json_data = request.get_json()

            for key in json_data:
                setattr(owner, key, json_data.get(key))

                db.session.commit()

                response_body = owner.to_dict()
                status = 200
            
            return make_response(jsonify(response_body), status)
        
    def delete(self, id):
        owner = Owner.query.filter(Owner.id == id).first()

        if not owner:

            response_body = {
                "error": "owner not found"
            }
            status = 404

        else:

            db.session.delete(owner)
            db.session.commit()

            response_body = {}

            status = 204

        return make_response(jsonify(response_body), status)

api.add_resource(OwnersById, '/owners/<int:id>')

class ReviewClass(Resource):
    def get(self):
        reviews = Review.query.all()

        response_body = []
        for r in reviews:
            owner_name = r.owner.name
            review_data = r.to_dict(only=('id','owner_id','user_id','rating','title','description'))
            review_data['owner_name'] = owner_name
            response_body.append(review_data)
        return make_response(jsonify(response_body), 200)
        
    # def post(self):
    #     json_data = request.get_json()
    #     new_review = Review(name=json_data.get('name'))
    #     db.session.add(new_owner)
    #     db.session.commit()

    #     response_body = new_owner.to_dict()

    #     return make_response(jsonify(response_body), 201)

api.add_resource(ReviewClass, '/reviews')



# class LoginClass(Resource):
#     def post(self):
#         # Get the username and password from the request
#         username = request.json.get('username')
#         password = request.json.get('password')

#         # Perform the login logic and validation
#         user = User.query.filter_by(username=username).first()
#         if not user or not check_password_hash(user.password, password):
#             return {'message': 'Invalid credentials'}, 401

#         return {'message': 'Login successful'}, 200

# api.add_resource(LoginClass, '/login')

if __name__ == '__main__':
    app.run(port=7000, debug=True)