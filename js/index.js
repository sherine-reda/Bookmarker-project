var bookNameInput = document.getElementById("bookName");
var bookUrlInput = document.getElementById("bookUrl");
var bookNameAlert = document.getElementById("bookNameAlert");
var bookUrlAlert = document.getElementById("bookUrlAlert");
var bookNameAlert2 = document.getElementById("bookNameAlert2");
var booksContainer = [];

if (localStorage.getItem("book") != null) {
  booksContainer = JSON.parse(localStorage.getItem("book"));
  displaybook(booksContainer);
}
function addbook() {
  if (validatebookName() & validatebookUrl() & validatebookNameRepetition()) {
    var book = {
      name: bookNameInput.value,
      url: bookUrlInput.value,
    };
    booksContainer.push(book);
    localStorage.setItem("book", JSON.stringify(booksContainer));
    displaybook(booksContainer);
    clearForm();
  } else {
    console.log("false");
  }
}
function clearForm() {
  bookNameInput.value = "";
  bookUrlInput.value = "";
}
function displaybook(arr) {
  var cartoona = "";
  for (var i = 0; i < arr.length; i++) {
    cartoona += `<div class="singlebook d-flex">
    <h2 class="column w-25">${arr[i].name}</h2>
   <a href="${arr[i].url}" target="_blank" class="text-white btn btn-primary me-2 p-2 ">visit</a>
    <button class="btn btn-danger" onclick="deletebook(${i})">Delete</button>
    </div>`;
  }
  document.getElementById("displayBook").innerHTML = cartoona;
}
function deletebook(i) {
  console.log(booksContainer[i]);
  var p = booksContainer.splice(i, 1);
  localStorage.setItem("book", JSON.stringify(booksContainer));
  displaybook(booksContainer);
}

function validatebookName() {
  var regx = /.+/;
  if (regx.test(bookNameInput.value)) {
    bookNameAlert.classList.replace("d-block", "d-none");
    return true;
  } else {
    bookNameAlert.classList.replace("d-none", "d-block");
    return false;
  }
}
function validatebookNameRepetition() {
  if (localStorage.getItem("book") != null) {
  books = JSON.parse(localStorage.getItem("book"));
  for (var i = 0; i < books.length; i++) {
    if (bookNameInput.value == books[i].name) {
      bookNameAlert2.classList.replace("d-none", "d-block");
      bookNameAlert2.innerHTML = " <span>this name already exist</span>";
      return false;
    } else {
      bookNameAlert2.classList.replace("d-block", "d-none");
    }
  }
}
  return true;
}
function validatebookUrl() {
  var regx = /.+/;
  if (regx.test(bookUrlInput.value)) {
    bookUrlAlert.classList.replace("d-block", "d-none");
    return true;
  } else {
    bookUrlAlert.classList.replace("d-none", "d-block");
    return false;
  }
}
