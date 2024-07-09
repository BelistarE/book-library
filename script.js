
const myLibrary = [];



function Book(title, author, pages, read, rating) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.rating = rating;
    this.info = function() {
        let readStatus = this.read ? "read" : "not read yet";
        return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`;
    };
  }


let bookContainer = document.querySelector(".books");

function addBookToLibrary(title, author, pages, read, rating) {
    let newBook = new Book(title, author, pages, read, rating);
    myLibrary.push(newBook);


  }


const books = document.querySelectorAll('.books .book:not(:first-child):not(:nth-child(2))');

books.forEach(book => {
    book.addEventListener('mouseenter', () => {
        // Check if the second child is not display: none
        const secondChild = book.parentElement.children[1];
        const secondChildDisplayStyle = window.getComputedStyle(secondChild).getPropertyValue('display');
        
        if (secondChildDisplayStyle !== 'none') {
            book.classList.add('hovered');
        }
    });

    book.addEventListener('mouseleave', () => {
        book.classList.remove('hovered');
    });
});


//gthe rest if the code is for the stars, cant seem to get is working correctly
const labels = document.querySelectorAll('.star-rating label');


let selectedIndex = -1;


labels.forEach((label, index) => {
    label.addEventListener('mouseenter', () => {
        if (selectedIndex === -1 || index <= selectedIndex) {
            darkenStars(index); 
        }
    });

    label.addEventListener('mouseleave', () => {
        if (selectedIndex === -1 || index > selectedIndex) {
            resetStars(); 
        } else {
            darkenStars(selectedIndex); 
        }
    });

    label.addEventListener('click', () => {
        
        selectedIndex = index;

        
        darkenStars(index);
    });
});


function darkenStars(index) {
    for (let i = 0; i <= index; i++) {
        labels[i].style.filter = 'brightness(80%)';
    }
}


function resetStars() {
    labels.forEach((label, index) => {
        label.style.filter = 'none'; 
    });
}


