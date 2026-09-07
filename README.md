# Library Management System — ITI Final Project

A simple, genuinely useful library manager: add books, search, sort,
and track who has borrowed what.

## Structure

```
library-management-system/
├── database/           <- Real SQL database (Python + SQL, as taught)
│   ├── schema.sql
│   ├── seed.py
│   ├── queries.py
│   ├── export_to_csv.py
│   └── requirements.txt
└── website/             <- The interactive website (HTML/CSS/JS)
    ├── index.html
    ├── style.css
    └── script.js
```

## Why two parts?

In this course, SQL was taught entirely through Python (the CS50 `SQL`
library), separately from the HTML/CSS/JavaScript track. No technique
was taught for connecting JavaScript directly to a live database
(no fetch/AJAX, no Flask, no Node/Express). To stay strictly inside
what was actually taught:

- `/database` proves real, hands-on SQL knowledge: `CREATE TABLE` with
  `PRIMARY KEY`/`FOREIGN KEY`, `INSERT`, `SELECT`, `WHERE`, `LIKE`,
  `ORDER BY`, `GROUP BY`, aggregate functions, `JOIN`, `UPDATE`,
  `DELETE`, and exporting to CSV with Python's `csv` module.
- `/website` is the actual working product. It keeps its own copy of
  the book data as a JavaScript array (the same books as the database),
  and implements search and sorting with hand-written algorithms
  (Linear Search, Selection Sort) instead of built-in shortcuts, to
  show the Algorithms/DSA week directly in the code.

## How to run the database part

```bash
cd database
pip install -r requirements.txt
python3 seed.py
python3 queries.py
python3 export_to_csv.py
```

## How to run the website

Open `website/index.html` in a browser (or use the Live Server /
"Go Live" option in GitHub Codespace — see the setup steps provided
separately).
