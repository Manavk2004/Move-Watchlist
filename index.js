
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
let state = true
let count = 0
let movieCount = 0
document.getElementById("search-button").addEventListener("click", ()=>{
    movieCount = 0
    let searchableWord = searchBarWord.replace(/ /g, "+").toLowerCase()

    fetch(`http://www.omdbapi.com/?s=${searchableWord}&apikey=4c61f6fa`)
        .then(response => response.json())
        .then(data => {
            // console.log(data)
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
                // console.log(movie)
                if (movie.Poster !== "N/A" && movie.Type === "movie"){
                    const template = document.getElementById("template")
                    const clone = template.content.cloneNode(true)

                    const img = clone.querySelector("img")
                    img.src = movie.Poster

                    clone.querySelector(".watchlist-button").id = `watchlist-button-${movieCount}`
                    clone.querySelector(".movie-info-container").className = `movie-info-container${movieCount}`
                    movieCount += 1

                    const title = clone.querySelector("h1")
                    title.textContent = movie.Title

                    // Movie length, rating, desc, etc...
                    fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&plot=short&apikey=4c61f6fa`)
                        .then(response => response.json())
                        .then(data => {
                            //Movie rating
                            let rating = clone.querySelector("#the-rating")
                            rating.textContent = data.Ratings[0].Value

                            //Movie Length
                            let length = clone.querySelector("#length")
                            length.textContent = data.Runtime

                            //Movie Genre

                            let genre = clone.querySelector("#genre")
                            genre.textContent = data.Genre

                            //Movie Description

                            let desc = clone.querySelector("#movie-desc")
                            desc.textContent = data.Plot

                            document.getElementById("template-container").appendChild(clone)
                            document.querySelectorAll(".watchlist-button").forEach(button=> {
                                    button.addEventListener("click", (event)=>{
                                        if(state){
                                            let button = event.currentTarget
                                            let number = button.id.split("-").pop()
                                            containerCall(number)
                                            state = false
                                            console.log(state)

                                            setTimeout(()=>{
                                                state = true
                                                console.log(state)
                                            }, 100)
                                            
                                        }
                                        
                                    })
                                
                            })
                            
                            state = true
                            

                            function containerCall(containerNumber){
                                let container = document.querySelector(`.movie-info-container${containerNumber}`)
                                console.log(container)

                            }
                        })
                }
     
            }

        })

        searchBarWord = ""
        document.getElementById("search-bar").value = ""

    })



///WHAT WE NEED TO DO IS TO MAKE AN ONCLICK FUNCTION FOR THE WATCHLIST BUTTONS THAT IS GONG TO CHECK THE ID OF THE BUTTON. MORE SPECIFICALLY
//THE NUMBER AND COMPARE IT TO THE DIV CONTAINER NUMBER. IF IT MATCHES, THEN WE PUT THAT DIV CONTAINER INTO THE
//WATCHLIST HTML. 