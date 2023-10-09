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

# Function to create a table
def create_table(conn):
    try:
        cursor = conn.cursor()
        create_table_query = '''
            CREATE TABLE IF NOT EXISTS example_table (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255),
                age INT
            );
        '''
        cursor.execute(create_table_query)
        conn.commit()
        print("Table 'example_table' created successfully.")
    except Exception as e:
        print(f"Error: Unable to create table - {e}")

# Function to drop a table
def drop_table(conn):
    try:
        cursor = conn.cursor()
        drop_table_query = "DROP TABLE IF EXISTS example_table;"
        cursor.execute(drop_table_query)
        conn.commit()
        print("Table 'example_table' dropped successfully.")
    except Exception as e:
        print(f"Error: Unable to drop table - {e}")

# Function to add an entry to the table
def add_entry(conn, name, age):
    try:
        cursor = conn.cursor()
        insert_query = "INSERT INTO example_table (name, age) VALUES (%s, %s);"
        cursor.execute(insert_query, (name, age))
        conn.commit()
        print(f"Entry added: Name - {name}, Age - {age}")
    except Exception as e:
        print(f"Error: Unable to add entry - {e}")

# Function to check entries in the table
def check_entries(conn):
    try:
        cursor = conn.cursor()
        select_query = "SELECT * FROM example_table;"
        cursor.execute(select_query)
        rows = cursor.fetchall()
        if rows:
            print("Entries in 'example_table':")
            for row in rows:
                print(f"ID: {row[0]}, Name: {row[1]}, Age: {row[2]}")
        else:
            print("No entries found in 'example_table'.")
    except Exception as e:
        print(f"Error: Unable to fetch entries - {e}")

if __name__ == "__main__":
    connection = connect_to_database()
    if connection:
        create_table(connection)
        add_entry(connection, "John", 30)
        add_entry(connection, "Alice", 25)
        check_entries(connection)
        # drop_table(connection)
        connection.close()
    else:
        print("connection failed")
