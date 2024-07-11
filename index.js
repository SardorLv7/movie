document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('.form'),
        input = document.querySelector(".form__input"),
        cardWrapper = document.querySelector(".card__wrapper")
        template = document.querySelector('#template').content;



        form.addEventListener('submit', async (e)=> {
            e.preventDefault();
            const searchQuery = input.value.trim()
            if (searchQuery == '') return;
            cardWrapper.innerHTML = ''
            const movies = await fetchmovies(searchQuery)
            if (movies.length > 0){
                displayMovies(movies)
            }else{
                displayNoResult()
            }
        })


    async function fetchmovies(query) {
        const url = `http://www.omdbapi.com/?s=${query}&apikey=decbd6f2`
        const response = await fetch(url)
        const data = await response.json()
        if (data.Response === "True"){
            return data.Search
        }else{
           return [] 
        }
    }


    function displayMovies(movies){
        movies.forEach(movie => {
            const card = template.cloneNode(true);
            card.querySelector('.films__img').src = movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/250";
            card.querySelector(".films__title").textContent = movie.Title
            card.querySelector(".films__date").textContent = `Year ${movie.Year}`
            cardWrapper.appendChild(card)
        })
    }


    function displayNoResult(){
        const noResultMessage = document.createElement('div')
        noResultMessage.textContent = 'Bunaqa kino mavjud emas'
        noResultMessage.style.color = 'red'
        noResultMessage.style.fontSize = '44px'
        noResultMessage.style.textAlign = 'center'
        cardWrapper.appendChild(noResultMessage)
    }
})
