import psycopg2


db_endpoint = 'software-db.czv99scjwsbf.us-east-2.rds.amazonaws.com'
db_name = 'postgres'
db_user = 'postgres'
db_password = 'software123'
db_port = 5432  # Default PostgreSQL port

# Function to establish a database connection
def connect_to_database():
    try:
        conn = psycopg2.connect(
            dbname=db_name,
            user=db_user,
            password=db_password,
            host=db_endpoint,
            port=db_port
        )
        return conn
    except Exception as e:
        print(f"Error: Unable to connect to the database - {e}")
        return None

# Function to create a new user
def add_user(conn, id, username, pwd):
    try:
        cursor = conn.cursor()
        insert_query = "INSERT INTO user_table (uid, uname, pwd, projects) VALUES (%s, %s, %s, NULL);"
        cursor.execute(insert_query, (id, username, pwd))
        conn.commit()
        print(f"Entry added: id - {id} user - {username} pwd - {pwd}")
    except Exception as e:
        print(f"Error: Unable to add entry - {e}")

# Function to check entries in the table
def check_entries(conn):
    try:
        cursor = conn.cursor()
        select_query = "SELECT * FROM user_table;"
        cursor.execute(select_query)
        rows = cursor.fetchall()
        if rows:
            print("Entries in 'user_table':")
            for row in rows:
                print(f"ID: {row[0]}, Name: {row[1]}, Age: {row[2]}")
        else:
            print("No entries found in 'user_table'.")
    except Exception as e:
        print(f"Error: Unable to fetch entries - {e}")

if __name__ == "__main__":
    connection = connect_to_database()
    if connection:
        add_user(connection, "user1", "username1", "password1")
        check_entries(connection)
        # drop_table(connection)
        connection.close()
    else:
        print("connection failed")
