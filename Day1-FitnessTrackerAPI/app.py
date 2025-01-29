from flask import Flask, jsonify, request
from dotenv import load_dotenv
import psycopg2
import os

app = Flask(__name__)

load_dotenv()

def get_db_connection():
    conn = psycopg2.connect(host='localhost',
                            database='flaskdb',
                            user=os.getenv('DB_USERNAME'),
                            password=os.getenv('DB_PASSWORD'))
    return conn

@app.route('/')
def home():
  return "<p>Home Route</p>"

@app.route('/exercises/', methods=(['GET']))
def view_all():
   conn = get_db_connection()
   cur = conn.cursor()
   cur.execute('SELECT * FROM exercises;')
   exercises = cur.fetchall()
   cur.close()
   conn.close()
   return({
      'exercises': exercises,
      'msg': f"Found {len(exercises)}"
   })

@app.route('/exercises/', methods=(['POST']))
def add():
   name = request.form['name']
   durationInSeconds = int(request.form['durationInSeconds'])
   caloriesBurnt = int(request.form['caloriesBurnt'])

   conn = get_db_connection()
   cur = conn.cursor()

   cur.execute('INSERT INTO exercises (name, durationInSeconds, caloriesBurnt)'
               'VALUES (%s, %s, %s)',
               (name, durationInSeconds, caloriesBurnt))
   
   conn.commit()
   cur.close()
   conn.close()

   return({
      'msg': f"Successfully added {name} exercise."
   })

@app.route('/exercises/progress/', methods=(['GET']))
def view_progress():
   conn = get_db_connection()
   cur = conn.cursor()

   cur.execute('SELECT date_added, SUM(caloriesBurnt) FROM exercises GROUP BY date_added;')

   progress = cur.fetchall()
   cur.close()
   conn.close()

   return({
      'progress': progress,
   })