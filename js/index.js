document.addEventListener("DOMContentLoaded", loadBooks());
function loadBooks() {
    fetch('http://localhost:3000/books')
    .then (response => response.json())
    .then (json => {
        let bookList = json;
        createBookElements(bookList);
    })
}
function createBookElements(bookList) {
    let list = document.getElementById('list');
    bookList.forEach(book => {
        let bookTitle = document.createElement('li');
        bookTitle.innerText = book.title;
        bookTitle.id = `book-${book.id}`;
        list.appendChild(bookTitle);
        bookTitle.addEventListener('click', event => bookDetails(event));
    });
}
function bookDetails(event) {
    let bookData = event.target.id.split('-');
    fetch(`http://localhost:3000/books/${bookData[1]}`)
    .then(response => response.json())
    .then(event => showBookDetails(event));

}
function showBookDetails(bookInfo) {
    let bookPanel = document.getElementById('show-panel');
    //Clear the old book data
    bookPanel.innerHTML = '';
    //Build and append the new book data
    bookPanel.innerHTML = `
        <img src='${bookInfo.img_url}' />
        <h2>${bookInfo.title}</h2>
        <h2>${bookInfo.subtitle}</h2>
        <h2>${bookInfo.author}</h2>
        <p>${bookInfo.description}</p>
        <ul id='user-list'></ul>`
    bookInfo.users.forEach(user => {
        let userLike = document.createElement('li');
        userLike.innerText = user.username;
        bookPanel.appendChild(userLike);
    });
    let likeBtn = document.createElement('button');
    likeBtn.innerText = 'Like';
    bookPanel.appendChild(likeBtn);
    let bookID = bookInfo.id;
    likeBtn.addEventListener('click', event => updateLikes(bookID));
}
function updateLikes(bookID) {
    console.log(`Got a like for book ${bookID}`);
}