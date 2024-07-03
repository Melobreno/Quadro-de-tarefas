const columns = document.querySelectorAll(".column__cards")
const cards = document.querySelectorAll(".card")

let draggedCard;

const dragStart = (event) => {
    draggedCard = event.target // salva o elemento que está sendo arrastado 
    event.dataTransfer.effectAllowed = "move"
}

const dragOver = (event) => {
    event.preventDefault()
}

const dragEnter = ({ target }) => {
    if (target.classList.contains("column__cards")) {
        target.classList.add("column__highlight")
    }
}
const dragLeave = ({ target }) => {
    target.classList.remove("column__highlight")
}

const drop = ({ target }) => {
    if (target.classList.contains("column__cards")){
        target.classList.remove("column__highlight")
        target.append(draggedCard)
    }    
}

const createCard = ({ target }) => {
    if (!target.classList.contains("column__cards")) return
    const card = document.createElement("section")

    card.className = "card"
    card.draggable = "true"
    card.contentEditable = "true"

    card.addEventListener("focusout", () =>{
        card.contentEditable = "false"

        if(!card.textContent) card.remove()
    })
    card.addEventListener("dragstart", dragStart)
    
    target.append(card)
    card.focus()
}

columns.forEach((column) => {
    column.addEventListener("dragover", dragOver)
    column.addEventListener("dragenter", dragEnter)
    column.addEventListener("dragleave", dragLeave)
    column.addEventListener("drop", drop)
    column.addEventListener("dblclick", createCard)

})
