from datetime import timedelta, date, datetime
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import re
import operator
from functools import wraps
from werkzeug.security import generate_password_hash, check_password_hash
import jwt


app = Flask("todolist")
cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///todolist'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=30)


class Users(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String)
    password = db.Column(db.Integer)

@app.route('/register', methods=['POST'])
def register():
    name = request.json['name']
    email = request.json['email']
    password = request.json['password']
    user = Users(name=name, email=email,
                 password=generate_password_hash(password))
    user_exists = Users.query.filter_by(email=email).first()
    emailformat = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    if re.fullmatch(emailformat, email):
        email = email
    else:
        email = False
    if (user_exists):
        return jsonify({"message": "User is already exists"}), 409
    elif (len(name) < 3 or name == ''):
        return jsonify({"message": "invalid name"}),400
    elif (email == False):
        return jsonify({"message": "invalid Email"}),400
    elif (len(password) < 6 or password == ''):
        return jsonify({"message": "invalid password"}),400
    else:
        db.session.add(user)
        db.session.commit()
        return jsonify({"message": "Registration done Successfully"}), 200