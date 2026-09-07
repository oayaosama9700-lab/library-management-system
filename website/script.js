// script.js
// Library Management System — front-end logic.
// Uses only what was taught: variables (let/const), arrays, objects,
// for loops, if/else, functions, arrow functions, string methods,
// querySelector/querySelectorAll, addEventListener, innerHTML.
//
// The "books" array below mirrors database/books.csv, which is exported
// from the real SQL database in /database (see that folder's README for
// why the two are kept separate: SQL was taught only through Python in
// this course, with no technique taught to connect JavaScript directly
// to a live database).

// ---------------------------------------------------------------
// 1) DATA — same books as database/seed.py, one extra field (id)
//    so each row can be found and updated individually.
// ---------------------------------------------------------------
let books = [
    { id: 1, title: "Clean Code", author: "Robert C. Martin", category: "Programming", status: "available", borrowedBy: null },
    { id: 2, title: "1984", author: "George Orwell", category: "Fiction", status: "available", borrowedBy: null },
    { id: 3, title: "A Brief History of Time", author: "Stephen Hawking", category: "Science", status: "borrowed", borrowedBy: "Ahmed Hassan" },
    { id: 4, title: "The Alchemist", author: "Paulo Coelho", category: "Fiction", status: "available", borrowedBy: null },
    { id: 5, title: "Introduction to Algorithms", author: "Thomas H. Cormen", category: "Programming", status: "available", borrowedBy: null },
    { id: 6, title: "Sapiens", author: "Yuval Noah Harari", category: "History", status: "borrowed", borrowedBy: "Mona Adel" },
    { id: 7, title: "The Pragmatic Programmer", author: "David Thomas", category: "Programming", status: "available", borrowedBy: null },
    { id: 8, title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", category: "Fiction", status: "available", borrowedBy: null },
    { id: 9, title: "Cosmos", author: "Carl Sagan", category: "Science", status: "available", borrowedBy: null },
    { id: 10, title: "The Da Vinci Code", author: "Dan Brown", category: "Fiction", status: "borrowed", borrowedBy: "Youssef Tarek" }
];

let nextId = 11;           // used to give new books a unique id
let currentView = books;   // whatever is currently on screen (all books, or search results)
let sortDirection = {};    // remembers ascending/descending per column

// ---------------------------------------------------------------
// 2) ALGORITHMS — written by hand, as taught in the Algorithms week
// ---------------------------------------------------------------

// Linear Search: checks every book, one by one, for a match in
// title OR author (case-insensitive).
function linearSearch(array, query) {
    let results = [];
    query = query.toLowerCase();
    for (let i = 0; i < array.length; i++) {
        let title = array[i].title.toLowerCase();
        let author = array[i].author.toLowerCase();
        if (title.includes(query) || author.includes(query)) {
            results.push(array[i]);
        }
    }
    return results;
}

// Selection Sort: repeatedly finds the smallest remaining item
// and swaps it into place. Sorts a COPY of the array so the
// original data (and any active search) isn't lost.
function selectionSort(array, key, ascending) {
    let sorted = array.slice(); // copy, so we don't touch the original array
    let n = sorted.length;

    for (let i = 0; i < n - 1; i++) {
        let targetIndex = i;
        for (let j = i + 1; j < n; j++) {
            let a = sorted[j][key].toLowerCase();
            let b = sorted[targetIndex][key].toLowerCase();
            let shouldSwap = ascending ? (a < b) : (a > b);
            if (shouldSwap) {
                targetIndex = j;
            }
        }
        if (targetIndex !== i) {
            let temp = sorted[i];
            sorted[i] = sorted[targetIndex];
            sorted[targetIndex] = temp;
        }
    }
    return sorted;
}

// ---------------------------------------------------------------
// 3) RENDERING — builds the table rows from whatever array is passed in
// ---------------------------------------------------------------
function renderBooks(array) {
    let tbody = document.querySelector("#booksBody");
    let emptyMessage = document.querySelector("#emptyMessage");
    let html = "";

    for (let i = 0; i < array.length; i++) {
        let book = array[i];
        let statusClass = book.status === "available" ? "status-available" : "status-borrowed";
        let statusText = book.status === "available" ? "Available" : "Borrowed by " + book.borrowedBy;

        let actionButton = book.status === "available"
            ? `<button class="action-btn" onclick="checkoutBook(${book.id})">Checkout</button>`
            : `<button class="action-btn" onclick="returnBook(${book.id})">Return</button>`;

        html += `
            <tr>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.category}</td>
                <td class="${statusClass}">${statusText}</td>
                <td>${actionButton}</td>
            </tr>
        `;
    }

    tbody.innerHTML = html;
    emptyMessage.style.display = array.length === 0 ? "block" : "none";
    updateStats();
}

// Stats footer: reuses the same array logic as SQL's COUNT()/GROUP BY
function updateStats() {
    let total = books.length;
    let available = 0;
    for (let i = 0; i < books.length; i++) {
        if (books[i].status === "available") {
            available++;
        }
    }
    document.querySelector("#totalCount").textContent = total;
    document.querySelector("#availableCount").textContent = available;
    document.querySelector("#borrowedCount").textContent = total - available;
}

// ---------------------------------------------------------------
// 4) ACTIONS — add book, checkout, return
// ---------------------------------------------------------------
function addBook() {
    let titleInput = document.querySelector("#titleInput");
    let authorInput = document.querySelector("#authorInput");
    let categoryInput = document.querySelector("#categoryInput");

    let title = titleInput.value.trim();
    let author = authorInput.value.trim();
    let category = categoryInput.value.trim();

    if (title === "" || author === "" || category === "") {
        alert("Please fill in the title, author, and category.");
        return;
    }

    let newBook = {
        id: nextId,
        title: title,
        author: author,
        category: category,
        status: "available",
        borrowedBy: null
    };

    books.push(newBook);
    nextId++;

    titleInput.value = "";
    authorInput.value = "";
    categoryInput.value = "";

    currentView = books;
    renderBooks(currentView);
}

function checkoutBook(id) {
    let name = prompt("Enter the borrower's name:");
    if (name === null || name.trim() === "") {
        return; // user cancelled or left it empty
    }

    for (let i = 0; i < books.length; i++) {
        if (books[i].id === id) {
            books[i].status = "borrowed";
            books[i].borrowedBy = name.trim();
            break;
        }
    }

    renderBooks(currentView);
}

function returnBook(id) {
    for (let i = 0; i < books.length; i++) {
        if (books[i].id === id) {
            books[i].status = "available";
            books[i].borrowedBy = null;
            break;
        }
    }

    renderBooks(currentView);
}

// ---------------------------------------------------------------
// 5) EVENT LISTENERS — wire everything up once the page has loaded
// ---------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {

    renderBooks(books);

    document.querySelector("#addBookBtn").addEventListener("click", addBook);

    document.querySelector("#searchBtn").addEventListener("click", function () {
        let query = document.querySelector("#searchInput").value.trim();
        if (query === "") {
            currentView = books;
        } else {
            currentView = linearSearch(books, query);
        }
        renderBooks(currentView);
    });

    document.querySelector("#clearSearchBtn").addEventListener("click", function () {
        document.querySelector("#searchInput").value = "";
        currentView = books;
        renderBooks(currentView);
    });

    // Also allow pressing Enter inside the search box
    document.querySelector("#searchInput").addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            document.querySelector("#searchBtn").click();
        }
    });

    // Sort buttons (Title / Author / Status)
    let sortButtons = document.querySelectorAll(".sort-btn");
    sortButtons.forEach(function (btn) {
        btn.addEventListener("click", function () {
            let key = btn.dataset.key;
            let ascending = sortDirection[key] !== true; // flip each click
            sortDirection[key] = ascending;

            currentView = selectionSort(currentView, key, ascending);
            renderBooks(currentView);
        });
    });

});
