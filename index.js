
let searchBarWord = ""
let alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
document.getElementById("search-bar").addEventListener("keydown", (event)=>{
    console.log(event)
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

document.getElementById("search-bar").addEventListener("input", (event)=>{
    console.log(event)
})

let count = 0
document.getElementById("search-button").addEventListener("click", ()=>{
    let searchableWord = searchBarWord.replace(/ /g, "+").toLowerCase()

    fetch(`http://www.omdbapi.com/?s=${searchableWord}&apikey=4c61f6fa`)
        .then(response => response.json())
        .then(data => {

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
                const template = document.getElementById("template")
                const clone = template.content.cloneNode(true)
                const img = clone.querySelector("img")
                img.src = movie.Poster
                document.getElementById("template-container").appendChild(clone)
            }
        })
    searchBarWord = ""
    document.getElementById("search-bar").value = ""
})