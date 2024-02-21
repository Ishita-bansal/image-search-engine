const accessKey = "ATbXq9auZYc6nTcRhdB5WjJv62TndcGM_12TaJB8dss";
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showmorebtn = document.getElementById("show-more-btn");
const popupmodal = document.getElementById("modal");
const closebtn = document.getElementById("close-btn")
const  modal = document.getElementById("modal-overlay");



let page = 1;

console.log(searchBox, searchBox.value, "searchBox");
async function searchImages(key) {
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${key}&client_id=${accessKey}&per_page=12`;
  const response = await fetch(url);
  const data = await response.json();
  if (page === 1) {
      searchResult.innerHTML = "";
    } 
  const results = data.results;
  results.map((result) => {
    const image = document.createElement("img");
    image.src = result.urls.small;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.appendChild(image);
    searchResult.appendChild(image);

image.addEventListener("click", (e) => {
    const largeImage = document.getElementById("large-images");
    largeImage.src = result.urls.small;
    largeImage.style.width="100%";
    largeImage.style.height="350px";
    // largeImage.style.marginLeft="20px";
    // largeImage.style.margin="20px";
    modal.style.display = "block";
  });
    searchResult.appendChild(image);
});
  showmorebtn.style.display = "block";
}

searchForm.addEventListener("submit", (e) => {
    let text = searchBox.value || ''
  e.preventDefault();
  page = 1;
  searchImages(text);
});

showmorebtn.addEventListener("click", (e) => {
    let text = searchBox.value || ''
  console.log(e.target, "222");
  page++;
  searchImages(text);
});

searchImages();

closebtn.addEventListener("click",()=>{
    modal.style.display="none";
});

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }