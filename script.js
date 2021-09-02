const searchInput = document.getElementById("searchInput");
const bookContainer = document.getElementById("book-container");
const spinner = document.getElementById("spinner");
const totalResult = document.getElementById("total-result");
const errorDiv = document.getElementById("error");

//function for passing url for data fetching based on different input 
const searchBook = () => {
  const searchText = searchInput.value;

  // clearing previous data
  bookContainer.innerHTML = '';
  totalResult.innerHTML = '';
  errorDiv.innerText = "";

  // showing spinner 
  spinner.classList.remove("d-none");

  // data fatching
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

  ///releted searching data fatching
  fetch(`https://openlibrary.org/search.json?q=${searchText}`)
    .then(res => res.json())
    .then(items => countSearch(items.numFound))
}
searchBook();

//function for displaying all product by search after fetching data
const showData = (books) => {
  //console.log(books);

  // Error Handling
  if (books.length === 0) {
    errorDiv.innerText = "NO Result Found";
  } else {
    errorDiv.innerText = "";
  }

  //  loading particular book
  books.slice(0, 30).forEach((book) => {


    const bookDiv = document.createElement("div");
    bookDiv.className = "col m-auto";
    let bookCard = ` <div class="m-3" style="cursor: pointer">
          <div class="card h-100">
            <img
              src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg"
              class="card-img-top img-fluid" style=""
            />
            <div class="card-body text-center">
                    <h4>Book Name: ${book.title}</h4>
                    <h5>Author Name: ${book.author_name[0]}</h5>
                    <h6>Publisher: ${book.publisher[0]}</h6>
                    <h5> <small class="text-muted">First Published: ${book.first_publish_year}</small></h5>
        </div>`;
    bookDiv.innerHTML = bookCard;

    bookContainer.appendChild(bookDiv);

  });

}

// function for displaying related search data
const countSearch = (items) => {
  console.log(items);
  totalResult.innerHTML = `
  <h3>Total results founds: ${items} </h3>
  `;

}