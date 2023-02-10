'use strict';

const select = {
    templateOf: {
        menuBooks: '#template-book'
    },
    containerOf: {
        booksList: '.books-list'
    },
    all: {
        books: '.book__image',
        id: 'data-id'
    }
};
const classNames = {
    favoriteBook: 'favorite'
}
const templates = {
    menuBooks: Handlebars.compile(document.querySelector(select.templateOf.menuBooks).innerHTML)
};

function createBooksList() {
    for (let book of dataSource.books) {
        const generatedHTML = templates.menuBooks(book);
        const generatedDOM = utils.createDOMFromHTML(generatedHTML)
        document.querySelector(select.containerOf.booksList).appendChild(generatedDOM)
    }
}
createBooksList();

const favoriteBooks = [];

function initActions() {
    for (let book of document.querySelectorAll(select.all.books)) {
        book.addEventListener('dblclick', addToFavorite);
        book.addEventListener('click', (event) => event.preventDefault());
    }
}
initActions();

function addToFavorite(event) {
    event.preventDefault();
    this.classList.toggle(classNames.favoriteBook);
    const bookId = this.getAttribute(select.all.id);
    if (!favoriteBooks.includes(bookId)) {
        favoriteBooks.push(bookId)
    } else favoriteBooks.splice(favoriteBooks.indexOf(bookId), 1)
}



