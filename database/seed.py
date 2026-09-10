# building library and adding sample books

import sqlite3
import os

DB_FILE = "library.db"
SCHEMA_FILE = "schema.sql"

if os.path.exists(DB_FILE):
    os.remove(DB_FILE)

conn = sqlite3.connect(DB_FILE)
cursor = conn.cursor()

with open(SCHEMA_FILE, "r") as file:
    cursor.executescript(file.read())

books = [
    ("الأيام", "طه حسين", "Literature", "available"),
    ("مقدمة ابن خلدون", "ابن خلدون", "History", "available"),
    ("Refactoring", "Martin Fowler", "Programming", "borrowed"),
    ("Python Crash Course", "Eric Matthes", "Programming", "available"),
    ("Atomic Habits", "James Clear", "Self-Help", "available"),
    ("رجال في الشمس", "غسان كنفاني", "Fiction", "borrowed"),
    ("The Selfish Gene", "Richard Dawkins", "Science", "available"),
    ("مدن الملح", "عبد الرحمن منيف", "Fiction", "available"),
    ("Deep Work", "Cal Newport", "Self-Help", "borrowed"),
    ("عزازيل", "يوسف زيدان", "Fiction", "available"),
]

for title, author, category, status in books:
    cursor.execute(
        "INSERT INTO books (title, author, category, status) VALUES (?, ?, ?, ?)",
        (title, author, category, status)
    )

# add borrow records for the 3 books marked "borrowed" above
cursor.execute(
    "INSERT INTO borrowers (book_id, borrower_name, borrow_date) VALUES (?, ?, ?)",
    (3, "Ahmed Hassan", "2025-08-01")
)
cursor.execute(
    "INSERT INTO borrowers (book_id, borrower_name, borrow_date) VALUES (?, ?, ?)",
    (6, "Mona Adel", "2025-08-10")
)
cursor.execute(
    "INSERT INTO borrowers (book_id, borrower_name, borrow_date) VALUES (?, ?, ?)",
    (9, "Youssef Tarek", "2025-08-15")
)

conn.commit()
conn.close()

print("library.db created and seeded successfully.")

