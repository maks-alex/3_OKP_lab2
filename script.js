
// function uniqueValues(date){
//     return date.toString(10)
// }

function dateTime(date) {
    // alert("date-" + date + " |type - " + typeof (date))
     let formatter = new Intl.DateTimeFormat("ru", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
    });
    return (formatter.format(date))
}
// alert(dateTime((Date.now()).toString(10)))

// alert(dateTime(Date.now()))
                                            /*провека по переменням времени*/
/*
let date1 = Date.now()
let date2 = (date1).toString(10)
let date3 = new Date(date1)
                                                                //так не работает
let date4 = new Date(date2)                                      
                                                                //так работает
let date5 = new Date( + date2)                                   
alert(
    "date1-" + date1 + " |type - " + typeof (date1) + '\n' +
    "date2-" + date2 + " |type - " + typeof (date2) + '\n' +
    "date3-" + date3 + " |type - " + typeof (date3) + '\n' +
                                                                //так не работает
    "date4-" + date4 + " |type - " + typeof (date4) + '\n' +
                                                                //так работает
    "date5-" + date5 + " |type - " + typeof (date5)
)
*/
function newNote() {
    let title = document.getElementById("note-title");
    let note = document.getElementById("note-text");

    title.value = "";
    note.value = "";
}

function saveNote() {
                                            /*данные для заметки*/
    let ul = document.getElementById("notes-list");
    let title = document.getElementById("note-title").value;
    if (title === "") { title = prompt("заполните тему заметки", "Тема") };
    if (title === "") { alert("тема заметки не заполнена"); return };
    let note = document.getElementById("note-text").value;
    let date = Date.now();                                      /*это уже таймстемп*/
    let uniqueValue = date.toString(10);                        /*это строка из таймстемпа*/
    // alert(uniqueValue)
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
updateNotesList()
displayNotesList()
newNote()
}
                                            /*отображение перечня заметок после перезагрузки страницы*/
function displayNotesList() {
    let notes = [];
    
        for (let i = 0; i < localStorage.length; i++){
            notes.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
        }
                                            /*отсортировать по дате*/
    function notesDateCompare(note1, note2) {      /*параметры -таймстемпы, преобразованные в строку*/
        // let dateNote1 = (new Date(+note1.date)).getTime();
        // let dateNote2 = (new Date(+note2.date)).getTime();
        // if (new Date(note1.date) > new Date(note2.date)) return 1;
        // if (new Date(note1.date) = new Date(note2.date)) return 0;
        // if (new Date(note1.date) < new Date(note2.date)) return -1;

                                                    /*теперь сортировка работает нормально*/  
                                                          
        // alert("date1-" + note1.date + " |type - " + typeof (note1.date) + "\n" +
        //     "date2-" + note2.date + " |type - " + typeof (note1.date));

        return ((+note1.date) - (+note2.date))      /*прпеобразование параметров в число*/
    }
    notes.sort(notesDateCompare)
    
    let ul = document.getElementById("notes-list");
    for (let i = 0; i < notes.length; i++) {
 
        let noteForList = notes[i]
        // alert(noteForList.date +":"+ typeof(noteForList.date))    /*проверка наличия данных в массиве*/

        let newNote = document.createElement("li");
        
        newNote.className = "note-list-elem";           /*attribut className*/
        newNote.id = noteForList.noteID;                /*attribut id*/
        let dateForListDisplay = dateTime(noteForList.date)
        newNote.innerHTML =
            `
        <div class="notes-title">${noteForList.title}</div>               
        <div class="notes-text">
            <span class="date">${dateForListDisplay}</span>

        </div>
        <button class="removeBtn" id="${noteForList.noteID}">Remove</button>
        `
        newNote.querySelector("button").addEventListener('click', function () { removeNote(noteForList.noteID); });
        newNote.addEventListener('click', function () { displayNote(noteForList.noteID); });

        ul.prepend(newNote)
    }
}

function removeNote(noteID) {
    localStorage.removeItem(noteID);
    updateNotesList()
    displayNotesList()
    newNote()
}

function updateNotesList() {
    let liToRemove = document.getElementById("notes-list");
        while (liToRemove.firstChild) {
            liToRemove.firstChild.remove()
        }
}

function displayNote(noteID) {
    
    let noteToDisplay = JSON.parse(localStorage.getItem(noteID));
        // for(let value of Object.values(noteToDisplay)) {alert(value)}  /*проверка передачи объекта*/
        
    let title = document.getElementById("note-title");
    let note = document.getElementById("note-text");

    title.value = noteToDisplay.title;
    note.value = noteToDisplay.note;
    lastDisplayedNote = noteToDisplay.noteID
/********************************************************************************************************/
    let ul = document.getElementById("notes-list");
    let selectedLi;
    ul.onclick = function(event) {
    let target = event.target; // где был клик?

    if (target.tagName != 'li') return; // не на TD? тогда не интересует
  
    highlight(target); // подсветить TD
    };
/********************************************************************************************************/    
}

    function highlight(li) {
    if (selectedLi) { // убрать существующую подсветку, если есть
      selectedLi.classList.remove('highlight');
    }
    selectedLi = li;
    selectedTd.classList.add('highlight'); // подсветить новый td
    };
/********************************************************************************************************/   
let lastDisplayedNote;

function editNote() {
    // alert(lastDisplayedNote)
    saveNote()
    removeNote(lastDisplayedNote)
    updateNotesList()
    displayNotesList()
}

    // let title = document.getElementById("note-title");
    // let note = document.getElementById("note-text");

    // title.value = "";
    // note.value = "";


                                                /*подсветить выбранную заметку*/



document.getElementById("new-btn").addEventListener("click", newNote);
document.getElementById("save-btn").addEventListener("click", saveNote);
document.getElementById("edit-btn").addEventListener("click", editNote);

window.addEventListener('load', displayNotesList());

// let ul = document.getElementById("notes-list");
// let selectedLi;
// ul.onclick = function(event) {
//     let target = event.target; // где был клик?

//     if (target.tagName != 'li') return; // не на TD? тогда не интересует
  
//     highlight(target); // подсветить TD
// };
// function highlight(li) {
//     if (selectedLi) { // убрать существующую подсветку, если есть
//       selectedLi.classList.remove('highlight');
//     }
//     selectedLi = li;
//     selectedTd.classList.add('highlight'); // подсветить новый td
//   }