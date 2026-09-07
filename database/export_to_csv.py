
from cs50 import SQL
import csv

db = SQL("sqlite:///library.db")

rows = db.execute("SELECT title, author, category, status FROM books ORDER BY id")

with open("books.csv", "w", newline="") as file:
    writer = csv.DictWriter(file, fieldnames=["title", "author", "category", "status"])
    writer.writeheader()
    for row in rows:
        writer.writerow(row)

print(f"Exported {len(rows)} books to books.csv")
