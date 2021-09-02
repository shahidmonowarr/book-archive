const searchInput = document.getElementById("searchInput");
const bookContainer = document.getElementById("book-container");
const spinner = document.getElementById("spinner");
const totalResult = document.getElementById("total-result");
const errorDiv = document.getElementById("error");
let totalarr = 0;
const searchBook = () => {
  const searchText = searchInput.value;

  // clearing previous data
  bookContainer.innerHTML = '';
  totalResult.innerHTML = '';
  errorDiv.innerText = "";

  // showing spinner 
  spinner.classList.remove("d-none");
  fetch(`https://openlibrary.org/search.json?q=${searchText}`)
    .then((res) => res.json())
    .then((data) => {
      // Setting a timer of 1.5s, before removing the spinnner, and showing data
      setTimeout(() => {
        spinner.classList.add("d-none");
        showData(data.docs);
      }, 1500);
    });
  searchInput.value = '';
  ///
  fetch(`https://openlibrary.org/search.json?q=${searchText}`)
    .then(res => res.json())
    .then(items => countSearch(items.numFound))
}

searchBook();
const showData = (books) => {
  //console.log(books);

  // Error Handing
  if (books.length === 0) {
    errorDiv.innerText = "NO Result Found";
  } else {
    errorDiv.innerText = "";
  }

  /*
  let totalarr = 0;

  // calculating total result 
  books.forEach((book) => {
    totalarr++;
  })
  console.log("total: ", totalarr);
  totalResult.innerHTML = `
  <h3>Total results founds: ${totalarr} </h3>
  `;
  */

  //  loading particular book
  books.slice(0, 30).forEach((book) => {

    const div = document.createElement("div");
    div.classList.add("col-md-3");
    div.innerHTML = `
      <!-- Image -->
      <div class="rounded overflow-hidden bg-light p-2">
        <img
          src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg"
          class="w-100"
          alt=""
        />
      </div>
      <!-- Body -->
      <div
        class="
          py-2
          d-flex
          justify-content-between
          align-items-center
          d-md-block
          text-center bg-light 
        "
      >
        <h2>Book Name: ${book.title}</h2>
        <h3>Author Name: ${book.author_name}</h3>
        <h3>Publisher: ${book.publisher}</h3>
        <h4>First Publish: ${book.first_publish_year}</h4>
      `;
    bookContainer.appendChild(div);

  });

}

const countSearch = (items) => {

  console.log(items);
  totalResult.innerHTML = `
  <h3>Total results founds: ${items} </h3>
  `;

}