const searchInput = document.getElementById("searchInput");
const bookContainer = document.getElementById("book-container");
const searchBook = () => {
    const searchText = searchInput.value;

    fetch(`http://openlibrary.org/search.json?q=${searchText}`)
        .then(res => res.json())
        .then(data => showData(data.docs))


}
searchBook();
const showData = (books) => {
    console.log(books);

    books.forEach((book) => {
        //console.log(book);
        const div = document.createElement("div");
        div.classList.add("col-md-3");
        div.innerHTML = `
      <!-- Image -->
      <div class="rounded overflow-hidden border p-2">
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
          text-md-center
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