//enter key activation in searchbox
document.getElementById("search-feild").addEventListener("keypress",function(event){
    // event.preventDefault()
    if(event.key== "Enter"){
        document.getElementById("search-button").click()
    }
})


const searchSong = async () => {
    const searchText = document.getElementById("search-feild").value
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    toggleSpinner()
    //load data
    try {
        const res = await fetch(url)
        const data = await res.json()
        displaySong(data.data)
    }
    catch (error) {
        displayError("Something went wrong! Try again.")
    }
}

const displaySong = songs => {
    const songContainer = document.getElementById("songContainer")
    const errorTag = document.getElementById("error-message")
    errorTag.innerText=""
    songContainer.innerHTML = ""
    songs.forEach(song => {
        const songDiv = document.createElement("div")
        songDiv.className = "single-result row align-items-center my-3 p-3"
        songDiv.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
                <source src="${song.preview}" type="audio/mpeg">
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyrics('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        `
        songContainer.appendChild(songDiv)
        toggleSpinner()
    });
}

const getLyrics = async (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    try {
        const res = await fetch(url)
        const data = await res.json()
        displayLyrics(data.lyrics)
    }
    catch (error) {
        displayError("Sorry failedn to load lyrics! Try again.")
    }
}

const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById("songLyrics")
    lyricsDiv.innerText = lyrics
}

const displayError = error => {
    const errorTag = document.getElementById("error-message")
    const songContainer = document.getElementById("songContainer")
    songContainer.innerHTML = ""
    errorTag.innerText = error
}

const toggleSpinner = () =>{
    const spinner = document.getElementById("loadingSpinner")
    const songs = document.getElementById("songContainer")
    spinner.classList.toggle("d-none")
    songs.classList.toggle("d-none")
}