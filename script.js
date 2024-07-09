
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

    let starHTML = '&#x2B50;';
    let counter = 1;
    for (let i = 0; i < 5; i++) {
        if (i < (5 - rating)) { // Adjust rating based on flipped value
            starHTML += '&#x2B50;'; // Filled star
            counter++;
        }
    }

    let readHTML = '';
    console.log(read);
    if (read === true){
        readHTML= '<p class="read">Read</p>'
    } else {
        readHTML = '';
    }
    console.log(readHTML);
    let latestBookAdded = document.querySelector(".books .book:nth-child(3)")
    newBookBoard.setAttribute("style", "display:none;");
    console.log(latestBookAdded);
    console.log(counter);
    latestBookAdded.insertAdjacentHTML("beforebegin",
      `
        <div class = "book">
            <div class = "title">${title}</div>
            <div class = "author">${author}</div>
            <div class="rating">${starHTML}</div>
            <div class = "pages">${pages} pages</div>
            ${readHTML}
        </div>
    `);
    starHTML= 0;
    counter = 0;
    return newBook;
  }

  newBookButton.addEventListener("click", (e) => {
    newBookBoard.toggleAttribute("style");
});

newBookSubmitButton.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent the form from submitting by default
    
    let nameField = document.getElementById("new-book-title");
    let authorField = document.getElementById("new-book-author");
    let pagesField = document.getElementById("new-book-pages");
    let read = document.getElementById("read").checked;
    let selectedRatingElement = document.querySelector('input[name="rating"]:checked');
    let selectedRating = selectedRatingElement ? selectedRatingElement.value : null;
    
    let isValid = true;
  
    // Check and highlight missing fields
    if (!nameField.value) {
      nameField.classList.add('input-error');
      isValid = false;
    } else {
      nameField.classList.remove('input-error');
    }
  
    if (!authorField.value) {
      authorField.classList.add('input-error');
      isValid = false;
    } else {
      authorField.classList.remove('input-error');
    }
  
    if (!pagesField.value) {
      pagesField.classList.add('input-error');
      isValid = false;
    } else {
      pagesField.classList.remove('input-error');
    }
  
    if (!selectedRating) {
      document.querySelectorAll('input[name="rating"]').forEach(radio => radio.classList.add('input-error'));
      isValid = false;
    } else {
      document.querySelectorAll('input[name="rating"]').forEach(radio => radio.classList.remove('input-error'));
    }
  
    // If any field is missing, do not proceed
    if (!isValid) {
      console.log("Please fill out all required fields.");
      return;
    }
  
    
    addBookToLibrary(nameField.value, authorField.value, pagesField.value, read, selectedRating);
    console.log(`rating ${selectedRating} read ${read}`)
    document.getElementById("new-book-form").reset();
  
    
    nameField.classList.remove('input-error');
    authorField.classList.remove('input-error');
    pagesField.classList.remove('input-error');
    document.querySelectorAll('input[name="rating"]').forEach(radio => radio.classList.remove('input-error'));
    clearStars()
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

let selectedIndex = 0;

labels.forEach((label, index) => {
    label.addEventListener('mouseenter', () => {
        lightenStars(index); 
    });

    label.addEventListener('mouseleave', () => {
        if (selectedIndex === -1 || index > selectedIndex) {
            resetStars(); 
        } else {
            lightenStars(selectedIndex); 
        }
    });

    label.addEventListener('click', () => {
        selectedIndex = index;
        lightenStars(index);
        console.log(`Star ${index + 1} clicked`);

    });
});

function lightenStars(index) {
    for (let i = 0; i < labels.length; i++) {
        if (i <= index) {
            labels[i].style.filter = 'brightness(100%)'; 
        } else {
            labels[i].style.filter = 'brightness(50%)'; 
        }
    }
}

function resetStars() {
    for (let i = 0; i < labels.length; i++) {
        if (i <= selectedIndex) {
            labels[i].style.filter = 'brightness(100%)'; 
        } else {
            labels[i].style.filter = 'brightness(50%)'; 
        }
    }
}
function clearStars(){
    for (let i = 1; i < labels.length; i++){
        labels[i].style.filter = 'brightness(50%)';
        selectedIndex= 0;
    }
}
