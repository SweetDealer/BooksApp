'use strict';

class BooksList {
    static select = {
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
    static classNames = {
        favoriteBook: 'favorite',
        hiddenBook: 'hidden'
    }
    static templates = {
        menuBooks: Handlebars.compile(document.querySelector(BooksList.select.templateOf.menuBooks).innerHTML)
    };

    constructor() {
        this.favoriteBooks = [];
        this.filters = [];

        this.createBooksList();
        this.initActions();
    }

    createBooksList() {
        for (let book of dataSource.books) {
            this.makeRatingBook(book);
            const generatedHTML = BooksList.templates.menuBooks(book);
            const generatedDOM = utils.createDOMFromHTML(generatedHTML)
            document.querySelector(BooksList.select.containerOf.booksList).appendChild(generatedDOM)
        }
    }

    
    initActions() {
        document.querySelector(BooksList.select.elements.booksList).addEventListener('dblclick', (event) => {
            const bookImage = event.target.closest(BooksList.select.elements.booksImg);
            if (bookImage) {
                event.preventDefault();
                this.addToFavorite(event);
            }
        });
        document.querySelector(BooksList.select.elements.booksList).addEventListener('click', (event) => event.preventDefault())
        document.querySelector(BooksList.select.elements.adultsFilter).addEventListener('input', (event)=> this.filterBooks(event));
        document.querySelector(BooksList.select.elements.nonFictionFilter).addEventListener('input', (event) => this.filterBooks(event))
    }

    addToFavorite(event) {
        event.preventDefault();
        event.target.offsetParent.classList.toggle(BooksList.classNames.favoriteBook);
        const bookId = event.target.closest(BooksList.select.elements.booksImg).getAttribute(BooksList.select.elements.id);
        if (!this.favoriteBooks.includes(bookId)) {
            this.favoriteBooks.push(bookId)
        } else this.favoriteBooks.splice(this.favoriteBooks.indexOf(bookId), 1)
    }


    filterBooks(event) {
        if (event.target.checked && !this.filters.includes(event.target.value)) {
            this.filters.push(event.target.value);
            this.addClassHidden(this.filters);
        }
        if (!event.target.checked && this.filters.includes(event.target.value)) {
            this.filters.splice(this.filters.indexOf(event.target.value), 1);
            this.addClassHidden(this.filters);
        }
    }

    addClassHidden(filters) {
        for (let book of document.querySelectorAll(BooksList.select.elements.booksImg)) {
            book.classList.remove(BooksList.classNames.hiddenBook);
        }
        for (let book of dataSource.books) {
            for (let filter of filters) {
                if (!book.details[filter]) {
                    document.querySelector(`${BooksList.select.elements.booksImg}[data-id="${book.id}"]`).classList.add(BooksList.classNames.hiddenBook);
                }
            }
        }
    }

    makeRatingBook(book) {
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
}

const app = new BooksList();