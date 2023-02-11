'use strict';

const select = {
    templateOf: {
        menuBooks: '#template-book'
    },
    containerOf: {
        booksList: '.books-list'
    },
    elements: {
        booksList: '.books-list',
        booksImg: '.book__image',
        id: 'data-id',
        adultsFilter: '[value="adults"]',
        nonFictionFilter: '[value="nonFiction"]',
    }
};
const classNames = {
    favoriteBook: 'favorite',
    hiddenBook: 'hidden'
}
const templates = {
    menuBooks: Handlebars.compile(document.querySelector(select.templateOf.menuBooks).innerHTML)
};

function createBooksList() {

    for (let book of dataSource.books) {
        makeRatingBook(book);
        const generatedHTML = templates.menuBooks(book);
        const generatedDOM = utils.createDOMFromHTML(generatedHTML)
        document.querySelector(select.containerOf.booksList).appendChild(generatedDOM)
    }
}
createBooksList();

const favoriteBooks = [];

function initActions() {
    document.querySelector(select.elements.booksList).addEventListener('dblclick', (event) => {
        const bookImage = event.target.closest(select.elements.booksImg);
        if (bookImage) {
            event.preventDefault();
            addToFavorite(event);
        }
    });
    document.querySelector(select.elements.booksList).addEventListener('click', (event) => event.preventDefault())

    document.querySelector(select.elements.adultsFilter).addEventListener('input', filterBooks);
    document.querySelector(select.elements.nonFictionFilter).addEventListener('input', filterBooks)
}
initActions();

function addToFavorite(event) {
    event.preventDefault();
    event.target.offsetParent.classList.toggle(classNames.favoriteBook);
    const bookId = event.target.closest(select.elements.booksImg).getAttribute(select.elements.id);
    if (!favoriteBooks.includes(bookId)) {
        favoriteBooks.push(bookId)
    } else favoriteBooks.splice(favoriteBooks.indexOf(bookId), 1)
    console.log(favoriteBooks);
}

const filters = [];

function filterBooks(event) {
    console.log(event);
    if (event.target.checked && !filters.includes(event.target.value)) {
        filters.push(event.target.value);
        addClassHidden(filters);
    }
    if (!event.target.checked && filters.includes(event.target.value)) {
        filters.splice(filters.indexOf(event.target.value), 1);
        addClassHidden(filters);
    }
}

function addClassHidden(filters) {
    for (let book of document.querySelectorAll(select.elements.booksImg)) {
        book.classList.remove(classNames.hiddenBook);
    }
    for (let book of dataSource.books) {
        for (let filter of filters) {
            if (!book.details[filter]) {
                document.querySelector(`${select.elements.booksImg}[data-id="${book.id}"]`).classList.add(classNames.hiddenBook);
            }
        }
    }
}

function makeRatingBook(book) {
    let ratingWidth = book.rating;
    let ratingBgc = '';
    ratingWidth = ratingWidth / 10 * 100;
    if (book.rating <= 6) {
        ratingBgc = 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%)';
    } else if (book.rating <= 8) {
        ratingBgc = 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%)';
    } else if (book.rating <= 9) {
        ratingBgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else if (book.rating > 9) {
        ratingBgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
    book.ratingBgc = ratingBgc;
    book.ratingWidth = ratingWidth;
}


