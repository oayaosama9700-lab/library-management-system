# seed.py
# Creates library.db from schema.sql, then inserts sample books.
# Uses the CS50 SQL library, exactly as taught in the "Using SQL in Python" lesson:
#     db = SQL("sqlite:///favorites.db")
#     db.execute(...)

from cs50 import SQL
import sqlite3
import os

DB_FILE = "library.db"
SCHEMA_FILE = "schema.sql"

# Step 1: if a database already exists from a previous run, remove it
# so this script can be run again safely.
if os.path.exists(DB_FILE):
    os.remove(DB_FILE)

# Step 2: build the database structure from schema.sql
# (sqlite3 is used only here, to run the raw .sql file — the actual
# data operations below all go through CS50's db.execute, as taught)
connection = sqlite3.connect(DB_FILE)
with open(SCHEMA_FILE, "r") as file:
    connection.executescript(file.read())
connection.close()

# Step 3: connect with the CS50 SQL library, the way the course taught it
db = SQL(f"sqlite:///{DB_FILE}")

# Step 4: insert (CREATE, in CRUD terms) sample books
books = [
    ("Clean Code", "Robert C. Martin", "Programming", "available"),
    ("1984", "George Orwell", "Fiction", "available"),
    ("A Brief History of Time", "Stephen Hawking", "Science", "borrowed"),
    ("The Alchemist", "Paulo Coelho", "Fiction", "available"),
    ("Introduction to Algorithms", "Thomas H. Cormen", "Programming", "available"),
    ("Sapiens", "Yuval Noah Harari", "History", "borrowed"),
    ("The Pragmatic Programmer", "David Thomas", "Programming", "available"),
    ("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", "Fiction", "available"),
    ("Cosmos", "Carl Sagan", "Science", "available"),
    ("The Da Vinci Code", "Dan Brown", "Fiction", "borrowed"),
]

for title, author, category, status in books:
    db.execute(
        "INSERT INTO books (title, author, category, status) VALUES(?, ?, ?, ?)",
        title, author, category, status
    )

# Step 5: insert a couple of matching borrow records for the "borrowed" books
db.execute(
    "INSERT INTO borrowers (book_id, borrower_name, borrow_date) VALUES(?, ?, ?)",
    3, "Ahmed Hassan", "2025-08-01"
)
db.execute(
    "INSERT INTO borrowers (book_id, borrower_name, borrow_date) VALUES(?, ?, ?)",
    6, "Mona Adel", "2025-08-10"
)
db.execute(
    "INSERT INTO borrowers (book_id, borrower_name, borrow_date) VALUES(?, ?, ?)",
    10, "Youssef Tarek", "2025-08-15"
)

print("library.db created and seeded successfully.")
