function Book(title, author, page, read) {
    this.title = title
    this.author = author
    this.page = page
    this.read = read
}

let myLibrary = [];

let exisitingBook = new Book("All About Love", "by bell hooks", "234", false)
myLibrary.push(exisitingBook)

displayCard();

//prototype
Book.prototype.toogleRead = function() { 
    this.read = !this.read;
}

//when user writes input and submits, system saves the input to the local storage and an array.
function saveInputToMyLibrary() {
    let title= document.getElementById('title').value;
    let author=  document.getElementById('author').value;
    let page= document.getElementById('page').value;
    let read= document.getElementById('read');
    let hasRead= false
        if(read.checked) {
            hasRead= true;
        } else {
            hasRead= false;
        }
    
    //prevent from sending empty input
    if ((title == "") || (author== "") || (page== "")) {
        alert("please fill out all fields")
        return
    }

    //reset the form    
    document.querySelector('form').reset();

    //creat new book object based on user inputs
    let createdBook= new Book(title, author, page, hasRead);

    //add new book object to the 'mylibrary' array
    myLibrary.push(createdBook);
    saveInStorage()
}

//save new book object to local storage
function saveInStorage() {
    localStorage.setItem("createdBook", JSON.stringify(myLibrary));
    displayCard();
}

function deleteFromStorage() {

}

//display new book objects in the DOM
function displayCard() {
    let card =``
    for (var i= 0; i < myLibrary.length; i++) {
        let newCard= `
            <div class="card col-sm-4 text-center rounded mr-2 mt-3 bg-info" data-index=${i}>
                <div class="card-body d-flex flex-column">
                    <h1 class="card-title">${myLibrary[i].title}</h1>
                    <svg class="bi bi-x-circle-fill" width="1em" height="1em" onclick="deleteCard(event)" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.146-3.146a.5.5 0 0 0-.708-.708L8 7.293 4.854 4.146a.5.5 0 1 0-.708.708L7.293 8l-3.147 3.146a.5.5 0 0 0 .708.708L8 8.707l3.146 3.147a.5.5 0 0 0 .708-.708L8.707 8l3.147-3.146z"/>
                        </svg>
                    <p class="card-text">by ${myLibrary[i].author}</p>
                    <p class="card-text mt-auto"><small class="text-muted">${myLibrary[i].page} pages</small></p>
                    <button class="btn btn-light" onclick="toggleReadbtn(event)">${myLibrary[i].read ? 'read' : 'unread'}</button>
                </div>
            </div>
            `;
        card += newCard
    }
        document.querySelector('.card-group').innerHTML = card
}

//when user clicks the toggle button, it changes it from unread to read.
function toggleReadbtn(event) {
    let toggleIndex = event.target.parentElement.parentElement.dataset.index;
    myLibrary[toggleIndex].toogleRead()
    displayCard();
}

//when user clicks delete button, it removes the book info in the local storage and displays it.
function deleteCard(event) {
    let cardIndex = event.target.parentElement.parentElement.dataset.index;
    myLibrary.splice(0, 1);
    displayCard();
}

//When user clicks the button, system shows/closes the form group
function openForm() {
    document.getElementById("myform").style.display ="block";    
}

function closeForm() {
    document.getElementById("myform").style.display = "none";
}








