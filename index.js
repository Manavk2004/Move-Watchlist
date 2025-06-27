
let searchBarWord = ""
let alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
document.getElementById("search-bar").addEventListener("keydown", (event)=>{
    console.log(event)
    if (event.key === "Backspace"){
        searchBarWord = searchBarWord.slice(0, -1)
        console.log(searchBarWord)
    }else if(alphabet.includes(event.key)){
        searchBarWord += event.key
        console.log(searchBarWord)
    }else if (event.key === " "){
        searchBarWord += " "
        console.log(searchBarWord)
    }else{
        ""
    }
})

document.getElementById("search-bar").addEventListener("input", (event)=>{
    console.log(event)
})


document.getElementById("search-button").addEventListener("click", ()=>{
    let searchableWord = searchBarWord.replace(/ /g, "+").toLowerCase()
    console.log(searchableWord)
    fetch(`http://www.omdbapi.com/?t=${searchableWord}&apikey=4c61f6fa`)
        .then(response => response.json())
        .then(data => {
            img = data.Poster
            console.log(data)
            // document.getElementById("image-container").innerHTML = `<img src=${img}/>`
        })
    searchBarWord = ""
    document.getElementById("search-bar").value = ""
})