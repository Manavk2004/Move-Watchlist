
//Taking user input from the search bar and putting it into url format

let searchBarWord = ""
let alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
document.getElementById("search-bar").addEventListener("keydown", (event)=>{
    if (event.key === "Backspace"){
        searchBarWord = searchBarWord.slice(0, -1)

    }else if(alphabet.includes(event.key)){
        searchBarWord += event.key

    }else if (event.key === " "){
        searchBarWord += " "
  
    }else{
        ""
    }
})

// document.getElementById("search-bar").addEventListener("input", (event)=>{
//     console.log(event)
// })

//--------------------------------------------------------------------------------//

//Search and get information

let count = 0
document.getElementById("search-button").addEventListener("click", ()=>{
    let searchableWord = searchBarWord.replace(/ /g, "+").toLowerCase()

    fetch(`http://www.omdbapi.com/?s=${searchableWord}&apikey=4c61f6fa`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if(count === 0){
                const element = document.getElementById("empty-logo-container")
                element.remove()
            }else{
                document.getElementById("template-container").innerHTML = ""
            }
            count += 1
            document.getElementById("template-container").style.height = "80%"
            let arrayofMovies = data.Search
            for (const movie of arrayofMovies){
                console.log(movie)
                const template = document.getElementById("template")
                const clone = template.content.cloneNode(true)

                const img = clone.querySelector("img")
                img.src = movie.Poster


                const title = clone.querySelector("h1")
                title.textContent = movie.Title

                // Movie length, rating, desc, etc...
                fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&plot=full&apikey=4c61f6fa`)
                    .then(response => response.json())
                    .then(data => {
                        //Movie rating
                        let rating = clone.querySelector("#the-rating")
                        rating.textContent = data.Ratings[0].Value

                        //Movie Length
                        let length = clone.querySelector("#length")
                        length.textContent = data.Runtime


                        document.getElementById("template-container").appendChild(clone)
                    })



            



            }
        })
    searchBarWord = ""
    document.getElementById("search-bar").value = ""
})