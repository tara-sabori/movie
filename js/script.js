let num = 1;
const search = new URLSearchParams(window.location.search);
if (search.get("page") != null)
    num = search.get("page");
axios(`https://moviesapi.ir/api/v1/movies?page=${num}`).then(res => {
    loadMovies(res.data.data);
    loadPagination(res.data.metadata);
}).catch(err => { console.log(err); });

function loadMovies(data) {
    const container = document.querySelector(".film-container");
    container.innerHTML = data.map(item =>
        ` <section class="film">
        <p class="film-score">${item.imdb_rating}</p>
        <img src="${item.poster}" alt="" class="film-poster">
        <section class="film-body">
        <a href="details.html?id=${item.id}"><p class="film-name">${item.title}</p></a>
            <span class="film-country">${item.country}</span>
            <span class="film-year">${item.year}</span>
        </section>
    </section>
    `
    ).join("");

}
function loadPagination(metadata) {
    const pagination = document.querySelector(".pagination");
    const btn=document.querySelector(".buttn");
    const count = metadata.page_count;
    const arr = [];
    for (var index = 1; index <= count; index++) {
        if (Math.abs(index - metadata.current_page) < 2)
            arr.push(index);
    }
    pagination.innerHTML = arr.map(item => `
    <li class=${metadata.current_page == item && "pagination-active"}><a href="?page=${item}">${item}</a></li>
    `).join("");
    if(metadata.current_page>=3)
    btn.style.display="block";
    else
    btn.style.display="none";
}

function searchResult(inp) {
    const list = document.querySelector(".search-list");
    const txt = inp.value.trim();
    if (txt.length > 0) {
        list.classList.remove("search-list-hide");
        axios.get(`https://moviesapi.ir/api/v1/movies?q=${txt}&page={page}`).then(res => {
            const result = res.data.data;
            list.innerHTML = result.map(item => `
                    <a href="details.html?id=${item.id}">
                        <section class="search-result">
                            <img src="${item.poster}" alt="" >
                            <h2>${item.title}</h2>
                        </section>
                    </a>
            `).join("");
        })
    }

    else {
        list.classList.add("search-list-hide");
    }

}