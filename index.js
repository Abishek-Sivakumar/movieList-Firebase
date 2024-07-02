import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-6c8fb-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const moviesListInDB = ref(database,"movieList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const moviesListEl = document.getElementById("movies-list")

addButtonEl.addEventListener('click',function(){
    let inputValue = inputFieldEl.value
    push(moviesListInDB,inputValue)
    clearInputField()
})

onValue(moviesListInDB,function(snapshot){
    if (snapshot.exists()){
        let itemArray = Object.entries(snapshot.val())

        clearMoviesListEl()

        for (let i = 0 ; i<itemArray.length; i++){
            let currentItem = itemArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            appendItemToMoviesListEl(currentItem)
        }
    }
    else {
        moviesListEl.innerHTML="No Movies yet..."
    }
})



function clearInputField(){
    inputFieldEl.value=""
}

function clearMoviesListEl(){
    moviesListEl.innerHTML=""
}

function appendItemToMoviesListEl(item){
    let itemID = item[0]
    let itemValue = item[1]

    let newEL = document.createElement("li")

    newEL.textContent = itemValue
    
    newEL.addEventListener("click",function(){
        let exactLocationOfItemInDB = ref(database,`movieList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })
    moviesListEl.append(newEL)
}




