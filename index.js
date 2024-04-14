const myLibrary = [];

function Book(title, author, pages, read) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.info = function() {
    const readMsg = read ? 'read' : 'not read yet';
    return `${title} by ${author}, ${pages} pages, ${readMsg}`;
  }
}

function addBookToLibrary() {
  // do stuff here
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pages = document.querySelector('#pages').value;
  const read = document.querySelector('#read').checked;
  myLibrary.push(new Book(title, author, pages, read));
}

function createTag(tag, content = '') {
  const newData = document.createElement(tag)
  newData.textContent = content
  return newData
}

function bookToRow(book) {
  const row = createTag('tr')
  row.append(
    createTag('td', book.title),
    createTag('td', book.author),
    createTag('td', book.pages),
  )
  const read = createTag('td', book.read)

  const toggleButton = createTag('button', 'Toggle');
  toggleButton.addEventListener('click', () => {
    book.read = !book.read;
    displayBooks();
  });

  read.appendChild(toggleButton)
  row.appendChild(read)

  const deleteButton = createTag('button', 'X')
  deleteButton.addEventListener('click', () => {
    const index = myLibrary.indexOf(book)
    myLibrary.splice(index, 1)
    displayBooks()
  })
  buttonRow = createTag('td')
  buttonRow.appendChild(deleteButton)
  row.appendChild(buttonRow)
  return row
}

/*
* display all book info in myLibrary
*/
function displayBooks() {
  const table = document.querySelector('table')
  // remove all non-header rows
  while (table.rows.length > 1) {
    table.deleteRow(1)
  }
  
  myLibrary.forEach(book => table.appendChild(bookToRow(book)))
}


function displayAddBookButton() {
  const newBookButton = document.createElement('button')
  newBookButton.id = 'new-book'
  newBookButton.textContent = 'NEW BOOK'
  newBookButton.addEventListener('click', displayBookForm)
  document.querySelector('.new-book-container').appendChild(newBookButton)
}


function displayBookForm() {
  // if form already exists, do nothing
  if (document.querySelector('#newBookForm')) {
    return
  }
  // remove button 
  document.querySelector('#new-book').remove()

  const form = document.createElement('form')
  form.id = 'newBookForm'
  form.innerHTML = `
    <div>
    <label for="title">*Title:</label>
    <input type="text" id="title" name="title" required>
    </div>
    <div>
    <label for="author">*Author:</label>
    <input type="text" id="author" name="author" required>
    </div>
    <div>
    <label for="pages">*Pages:</label>
    <input type="number" id="pages" name="pages" required>
    </div>
    <div>
    <label for="read">Read:</label>
    <input type="checkbox" id="read" name="read">
    </div>
    <input type="submit" value="Submit">
  `

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    addBookToLibrary()
    displayBooks()
    //remove entire form on submit
    form.remove()
    // add button back
    displayAddBookButton()
  })
  document.querySelector('.new-book-container').appendChild(form)
  const titleInput = document.querySelector('#title');
  titleInput.focus();
}

displayAddBookButton()