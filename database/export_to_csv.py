# exporting the books table to books.csv using the csv module

import sqlite3
import csv

conn = sqlite3.connect("library.db")
cursor = conn.cursor()

cursor.execute("SELECT title, author, category, status FROM books ORDER BY id")
rows = cursor.fetchall()

with open("books.csv", "w", newline="", encoding="utf-8") as file:
    writer = csv.writer(file)
    writer.writerow(["title", "author", "category", "status"])
    for row in rows:
        writer.writerow(row)

conn.close()

print(f"Exported {len(rows)} books to books.csv")

