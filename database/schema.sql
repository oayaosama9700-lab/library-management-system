-- Table 1: books
-- Stores every book in the library and its current status
CREATE TABLE books (
    id INTEGER,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    category TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'available',
    PRIMARY KEY (id)
);

-- Table 2: borrowers
-- Stores every checkout record. Linked to "books" through book_id (FOREIGN KEY)
CREATE TABLE borrowers (
    id INTEGER,
    book_id INTEGER NOT NULL,
    borrower_name TEXT NOT NULL,
    borrow_date TEXT NOT NULL,
    return_date TEXT,
    PRIMARY KEY (id),
    FOREIGN KEY (book_id) REFERENCES books(id)
);
