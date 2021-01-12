//prompt('how old are you', '');

function uniqueValues(){
    return (Date.now()).toString(10)  /* + Math.random()*/
}

function dateTime() {
     let formatter = new Intl.DateTimeFormat("ru", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
    });
    return (formatter.format(new Date()))
}
                                            /*!!!!!!!!работает на add, но не работает на Save*/
function newNote() {
    let title = document.getElementById("note-title");
    let note = document.getElementById("note-text");

    title.value = "";       /*введите тему новой заметки*/
    note.value = "";        /*введите текст новой заметки*/
}

function saveNote() {
                                            /*данные для заметки*/
    let ul = document.getElementById("notes-list");
    let title = document.getElementById("note-title").value;
    if (title === "") { title = prompt("заполните тему заметки", "Тема") };
    if (title === "") { alert("тема заметки не заполнена"); return };
    let note = document.getElementById("note-text").value;
    let date = dateTime();
    let uniqueValue = uniqueValues();
    let noteID = (title +"-"+ uniqueValue);
                                            /*объектJSON для localStorage*/
        let noteObj = {
            title: title,
            note: note,
            date: date,
            noteID: noteID
        }
    let noteJSON = JSON.stringify(noteObj);

    localStorage.setItem(noteID, noteJSON);
/*window.localStorage.clear();     window.localStorage.getItem('user');  localStorage.length*/
/* проверить содержимое localStorage
for(let i=0; i<localStorage.length; i++) {
    let key = localStorage.key(i);
    alert(`${key}: ${localStorage.getItem(key)}`);}
*/

                                            /*отобразить заметки в перечне заметок*/
displayNotesList()
/*
    let newNote = document.createElement("li");
    newNote.className = "notes-list-elem";
    newNote.id = noteID;

    newNote.innerHTML =
        `
        <div class="notes-title">${title}</div>               
        <div class="notes-text">
            <span class="date">${date}</span>

        </div>
        <button class="removeBtn" id="${noteID}">Remove</button>
        `;
*/  
    
/*<span class="text">${note}</span>*/       /*в template в перечне была часть заметки, оставил темы*/    
    // ul.prepend(newNote);

    newNote()
}

function displayNote() {
    
}


function editNote() {
    
}

function removeNote(id) {
    // let note = getElementByID(id);
    localStorage.removeItem(id);
    // note.remove(id);

    newNote()
}
                                            /*отображение перечня заметок после перезагрузки страницы*/
function displayNotesList() {
    // let notes = [];
    
    //     for (let i = 0; i < localStorage.length; i++){
    //         notes.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
    //     }
    
    
    let ul = document.getElementById("notes-list");
    for (let i = 0; i < localStorage.length; i++) {
        // let noteForList = [];
        // noteForList.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    
        let noteForList = JSON.parse(localStorage.getItem(localStorage.key(i)))
        let newNote = document.createElement("li");
    
        newNote.className = "note-list-elem";
        newNote.id = noteForList.noteID;
        newNote.innerHTML =
            `
        <div class="notes-title">${noteForList.title}</div>               
        <div class="notes-text">
            <span class="date">${noteForList.date}</span>

        </div>
        <button class="removeBtn" id="${noteForList.noteID}">Remove</button>
        `
        ul.prepend(newNote)
    }
}


                                            /*подсветить выбранную заметку*/
// let selectedTd;
// div.onclick = function(event) {
//   let target = event.target; // где был клик?

//   if (target.class= 'notes-title') return; // не на TD? тогда не интересует

//   highlight(target); // подсветить TD
// };

// function highlight(td) {
//   if (selectedTd) { // убрать существующую подсветку, если есть
//     selectedTd.classList.remove('highlight');
//   }
//   selectedTd = td;
//   selectedTd.classList.add('highlight'); // подсветить новый td
// }



document.getElementById("new-btn").addEventListener("click", newNote);
document.getElementById("save-btn").addEventListener("click", saveNote);
// document.getElementById("edit-btn").addEventListener("click", editNote);
// document.getElementById("edit-btn").addEventListener("click", removeNote);
    
// newNote.querySelector("button").addEventListener('click', function () { removeNote(noteID); });
// newNote.addEventListener('click', function () { editNote(noteID); })

window.addEventListener('load', displayNotesList());