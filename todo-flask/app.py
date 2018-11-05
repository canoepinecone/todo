from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
import json


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todos.db'
db = SQLAlchemy(app)

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(200), unique=True, nullable=False)

    def __init__(self, text):
        self.text = text

@app.route('/', methods=['GET', 'POST'])
def get_todos():
    if request.method == 'GET':
        state = {'todos': []}
        todos = Todo.query.all()
        for todo in todos:
            state['todos'] += todo.text
        return json.dumps(state)
    elif request.method == 'POST':
        todos = Todo.query.all()
        for todo in todos:
            db.session.delete(todo)
        db.session.commit()
        todos_json = request.form['todos']
        todos = json.loads(todos_json)
        
        for todo in todos:
            todo = Todo(todo)
            db.session.add(todo)
        db.session.commit()
        todos = Todo.query.all()
        state = {'todos': todos}
        return json.dumps(self.state)

if __name__ == '__main__':
    app.run()
