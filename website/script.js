// JavaScript code for the library website
// I wrote my own search and sort functions instead of using
// built-in ones, since we learned linear search and selection
// sort in the Algorithms week

// list of books (same as database/books.csv)
let books = [
    { id: 1, title: "الأيام", author: "طه حسين", category: "Literature", status: "available", borrowedBy: "" },
    { id: 2, title: "مقدمة ابن خلدون", author: "ابن خلدون", category: "History", status: "available", borrowedBy: "" },
    { id: 3, title: "Refactoring", author: "Martin Fowler", category: "Programming", status: "borrowed", borrowedBy: "Ahmed Hassan" },
    { id: 4, title: "Python Crash Course", author: "Eric Matthes", category: "Programming", status: "available", borrowedBy: "" },
    { id: 5, title: "Atomic Habits", author: "James Clear", category: "Self-Help", status: "available", borrowedBy: "" },
    { id: 6, title: "رجال في الشمس", author: "غسان كنفاني", category: "Fiction", status: "borrowed", borrowedBy: "Mona Adel" },
    { id: 7, title: "The Selfish Gene", author: "Richard Dawkins", category: "Science", status: "available", borrowedBy: "" },
    { id: 8, title: "مدن الملح", author: "عبد الرحمن منيف", category: "Fiction", status: "available", borrowedBy: "" },
    { id: 9, title: "Deep Work", author: "Cal Newport", category: "Self-Help", status: "borrowed", borrowedBy: "Youssef Tarek" },
    { id: 10, title: "عزازيل", author: "يوسف زيدان", category: "Fiction", status: "available", borrowedBy: "" }
];

let nextId = 11;          // id to give the next new book
let currentView = books;  // the array currently shown on the page (all books or search results)
let titleAscending = true;
let authorAscending = true;
let statusAscending = true;

// this function searches the books one by one (linear search)
// it checks if the title or author has the word the user typed
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

// this function sorts the books using selection sort
// I made a copy of the array first so I don't mess up the original list
function selectionSort(array, key, ascending) {
    let copiedArray = [];
    for (let i = 0; i < array.length; i++) {
        copiedArray.push(array[i]);
    }

    for (let i = 0; i < copiedArray.length - 1; i++) {
        let targetIndex = i;

        for (let j = i + 1; j < copiedArray.length; j++) {
            let a = copiedArray[j][key].toLowerCase();
            let b = copiedArray[targetIndex][key].toLowerCase();

            if (ascending) {
                if (a < b) {
                    targetIndex = j;
                }
            } else {
                if (a > b) {
                    targetIndex = j;
                }
            }
        }

        if (targetIndex !== i) {
            let temp = copiedArray[i];
            copiedArray[i] = copiedArray[targetIndex];
            copiedArray[targetIndex] = temp;
        }
    }

    return copiedArray;
}

// this function shows the books on the page (builds the table)
function renderBooks(array) {
    let tbody = document.querySelector("#booksBody");
    let emptyMessage = document.querySelector("#emptyMessage");
    let html = "";

    for (let i = 0; i < array.length; i++) {
        let book = array[i];

        let statusClass = "";
        let statusText = "";
        if (book.status === "available") {
            statusClass = "status-available";
            statusText = "Available";
        } else {
            statusClass = "status-borrowed";
            statusText = "Borrowed by " + book.borrowedBy;
        }

        let actionButton = "";
        if (book.status === "available") {
            actionButton = "<button class='action-btn' onclick='checkoutBook(" + book.id + ")'>Checkout</button>";
        } else {
            actionButton = "<button class='action-btn' onclick='returnBook(" + book.id + ")'>Return</button>";
        }

        html = html + "<tr>"
            + "<td>" + book.title + "</td>"
            + "<td>" + book.author + "</td>"
            + "<td>" + book.category + "</td>"
            + "<td class='" + statusClass + "'>" + statusText + "</td>"
            + "<td>" + actionButton + "</td>"
            + "</tr>";
    }

    tbody.innerHTML = html;

    if (array.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }

    updateStats();
}

// updates the numbers at the top (total, available, borrowed)
function updateStats() {
    let total = books.length;
    let available = 0;

    for (let i = 0; i < books.length; i++) {
        if (books[i].status === "available") {
            available = available + 1;
        }
    }

    document.querySelector("#totalCount").textContent = total;
    document.querySelector("#availableCount").textContent = available;
    document.querySelector("#borrowedCount").textContent = total - available;
}

// adds a new book from the form inputs
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
        borrowedBy: ""
    };

    books.push(newBook);
    nextId = nextId + 1;

    titleInput.value = "";
    authorInput.value = "";
    categoryInput.value = "";

    currentView = books;
    renderBooks(currentView);
}

// marks a book as borrowed
function checkoutBook(id) {
    let name = prompt("Enter the borrower's name:");
    if (name === null || name.trim() === "") {
        return;
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

// marks a book as available again
function returnBook(id) {
    for (let i = 0; i < books.length; i++) {
        if (books[i].id === id) {
            books[i].status = "available";
            books[i].borrowedBy = "";
            break;
        }
    }

    renderBooks(currentView);
}

// this runs when you click the Title, Author, or Status button
function sortBooks(key) {
    let ascending = true;

    if (key === "title") {
        ascending = titleAscending;
        titleAscending = !titleAscending;
    } else if (key === "author") {
        ascending = authorAscending;
        authorAscending = !authorAscending;
    } else if (key === "status") {
        ascending = statusAscending;
        statusAscending = !statusAscending;
    }

    currentView = selectionSort(currentView, key, ascending);
    renderBooks(currentView);
}

// this runs when you click the Search button
function searchBooks() {
    let query = document.querySelector("#searchInput").value.trim();

    if (query === "") {
        currentView = books;
    } else {
        currentView = linearSearch(books, query);
    }

    renderBooks(currentView);
}

// clears the search box and shows all books again
function clearSearch() {
    document.querySelector("#searchInput").value = "";
    currentView = books;
    renderBooks(currentView);
}

// this runs once the page loads, and connects the buttons to their functions
document.addEventListener("DOMContentLoaded", function () {

    renderBooks(books);

    document.querySelector("#addBookBtn").addEventListener("click", addBook);
    document.querySelector("#searchBtn").addEventListener("click", searchBooks);
    document.querySelector("#clearSearchBtn").addEventListener("click", clearSearch);

    // lets the user press Enter in the search box instead of clicking Search
    document.querySelector("#searchInput").addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            searchBooks();
        }
    });

});

