

import sqlite3

conn = sqlite3.connect("library.db")
cursor = conn.cursor()

print("1) SELECT * - all books")
cursor.execute("SELECT * FROM books")
for row in cursor.fetchall():
    print(row)

print("\n2) WHERE - borrowed books")
cursor.execute("SELECT title, author FROM books WHERE status = ?", ("borrowed",))
for row in cursor.fetchall():
    print(row)

print("\n3) LIKE - titles containing 'The'")
cursor.execute("SELECT title FROM books WHERE title LIKE ?", ("%The%",))
for row in cursor.fetchall():
    print(row)

print("\n4) ORDER BY - books sorted by title")
cursor.execute("SELECT title FROM books ORDER BY title ASC")
for row in cursor.fetchall():
    print(row)

print("\n5) GROUP BY + COUNT - books per category")
cursor.execute("SELECT category, COUNT(*) FROM books GROUP BY category")
for row in cursor.fetchall():
    print(row)

print("\n6) Aggregate functions - totals")
cursor.execute("SELECT COUNT(*) FROM books")
total = cursor.fetchone()[0]
cursor.execute("SELECT COUNT(*) FROM books WHERE status = ?", ("available",))
available = cursor.fetchone()[0]
print(f"Total: {total} | Available: {available} | Borrowed: {total - available}")

print("\n7) JOIN - borrowed books with borrower name and date")
cursor.execute("""
    SELECT books.title, borrowers.borrower_name, borrowers.borrow_date
    FROM books
    JOIN borrowers ON borrowers.book_id = books.id
""")
for row in cursor.fetchall():
    print(row)

print("\n8) UPDATE - mark 'Atomic Habits' as borrowed")
cursor.execute("UPDATE books SET status = ? WHERE title = ?", ("borrowed", "Atomic Habits"))
conn.commit()
cursor.execute("SELECT status FROM books WHERE title = ?", ("Atomic Habits",))
print("New status:", cursor.fetchone())

print("\n9) DELETE - remove borrow record id 1")
cursor.execute("DELETE FROM borrowers WHERE id = ?", (1,))
conn.commit()
cursor.execute("SELECT * FROM borrowers")
print("Remaining borrow records:", cursor.fetchall())

conn.close()

