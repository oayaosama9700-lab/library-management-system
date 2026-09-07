# queries.py
# Demonstrates every SQL statement taught in Week 7 (SQL) against library.db
# Run this AFTER seed.py

from cs50 import SQL

db = SQL("sqlite:///library.db")

print("1) SELECT * — all books")
rows = db.execute("SELECT * FROM books")
for row in rows:
    print(row)

print("\n2) WHERE — books that are currently borrowed")
rows = db.execute("SELECT title, author FROM books WHERE status = ?", "borrowed")
for row in rows:
    print(row)

print("\n3) LIKE — search books whose title contains 'the'")
rows = db.execute("SELECT title FROM books WHERE title LIKE ?", "%the%")
for row in rows:
    print(row)

print("\n4) ORDER BY — books sorted alphabetically by title")
rows = db.execute("SELECT title FROM books ORDER BY title ASC")
for row in rows:
    print(row)

print("\n5) GROUP BY + COUNT — number of books per category")
rows = db.execute("SELECT category, COUNT(*) AS total FROM books GROUP BY category")
for row in rows:
    print(row)

print("\n6) Aggregate functions — total books, and how many are available")
total = db.execute("SELECT COUNT(*) AS total FROM books")[0]["total"]
available = db.execute("SELECT COUNT(*) AS total FROM books WHERE status = ?", "available")[0]["total"]
print(f"Total books: {total} | Available: {available} | Borrowed: {total - available}")

print("\n7) JOIN — books currently borrowed, with the borrower's name and date")
rows = db.execute("""
    SELECT books.title, borrowers.borrower_name, borrowers.borrow_date
    FROM books
    JOIN borrowers ON borrowers.book_id = books.id
""")
for row in rows:
    print(row)

print("\n8) UPDATE — mark 'The Alchemist' as borrowed")
db.execute("UPDATE books SET status = ? WHERE title = ?", "borrowed", "The Alchemist")
print("Done. New status:", db.execute("SELECT status FROM books WHERE title = ?", "The Alchemist"))

print("\n9) DELETE — remove a borrow record (example: id 1)")
db.execute("DELETE FROM borrowers WHERE id = ?", 1)
print("Remaining borrow records:", db.execute("SELECT * FROM borrowers"))
