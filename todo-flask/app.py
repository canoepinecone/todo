from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
import json


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todos.db'
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    todos = db.relationship('Todo', backref='user', lazy=True)

    def __init__(self, username, password):
        self.username = username
        self.password = password


class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(200), unique=True, nullable=False)
    user = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __init__(self, text):
        self.text = text


@app.route('/', methods=['GET', 'POST'])
def get_todos():
    if request.method == 'GET':
        state = {'todos': []}
        todos = Todo.query.filter_by(user=request.args.get('user'))
        for todo in todos:
            state['todos'] += todo.text
        return json.dumps(state)
    elif request.method == 'POST':
        if request.form['login'] == 'nothing':
            state = {
                'todos': [],
                'login': 'nothing'
            }
            return json.dumps(state)
        else:
            login = request.form['login'].split(':')
            username = login[0]
            password = login[1]
            if User.query.filter_by(username=username).first() == None:
                user = User(username, password)
                db.session.add(user)
                db.session.commit()
                
                state = {
                    'todos': Todo.query.all(),
                    'login': username + ':' + password
                }

                return json.dumps(state)
            else:
                todos = Todo.query.all()

                state = {
                    'todos': todos,
                    login: request.form['login']
                }

                return json.dumps(state)

        todos = Todo.query.all()
        for todo in todos:
            db.session.delete(todo)
        db.session.commit()
        todos_json = request.form['todos']
        login_json = request.form['login']
        todos = json.loads(todos_json)
        login = json.loads(login_json)
        for todo in todos:
            todo = Todo(todo)
            db.session.add(todo)
        db.session.commit()
        todos = Todo.query.all()
        state = {'todos': todos, 'login': login}
        return json.dumps(state)

if __name__ == '__main__':
    app.run()
