from dotenv import load_dotenv
import os
import psycopg2

load_dotenv()

conn = psycopg2.connect(
        host="localhost",
        database=os.getenv('DB_NAME'),
        user=os.getenv('DB_USERNAME'),
        password=os.getenv('DB_PASSWORD')
      )

# Open a cursor to perform database operations
cur = conn.cursor()

cur.execute('DROP TABLE IF EXISTS exercises;')
cur.execute('CREATE TABLE exercises (id serial PRIMARY KEY,'
                                 'name varchar (200) NOT NULL,'
                                 'durationInSeconds integer NOT NULL,'
                                 'caloriesBurnt integer NOT NULL,'
                                 'date_added date DEFAULT CURRENT_TIMESTAMP);'
                                 )

conn.commit()

cur.close()
conn.close()
