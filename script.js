
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
let newBookBoard = document.getElementById("new-book-board");
let newBookSubmitButton = document.getElementById("new-book-submit");
let newBookButton = document.querySelector(".add-new");

function addBookToLibrary(title, author, pages, read, rating) {
    let newBook = new Book(title, author, pages, read, rating);
    myLibrary.push(newBook);
    let latestBookAdded = document.querySelector(".books .book:nth-child(3)")
    newBookBoard.setAttribute("style", "dispay:none;");
    console.log(latestBookAdded);
    latestBookAdded.insertAdjacentHTML("beforebegin",
      `
        <div class = "book">
            <div class = "title">${title}</div>
            <div class = "author">${author}</div>
            <div class="rating">
                    &#x2B50;&#x2B50;&#x2B50;
            </div>
            <div class = "pages">${pages}</div>
            <p class="read">Read</p>
        </div>
    `);
    return newBook;

  }

  newBookButton.addEventListener("click", (e) => {
    newBookBoard.toggleAttribute("style");
});

newBookSubmitButton.addEventListener("click", (e) => {
  let name = document.getElementById("new-book-title").value;
  let author = document.getElementById("new-book-author").value;
  let pages = document.getElementById("new-book-pages").value;
  if (!name || !author || !pages) {
      return;
  }
  e.preventDefault();
  addBookToLibrary(name, author, pages, false);
  document.getElementById("new-book-form").reset();
});




  //below this is all styling
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


//the rest if the code is for the stars, cant seem to get is working correctly
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


