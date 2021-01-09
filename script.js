//prompt('how old are you', '');

function uniqueValues(){
    return (Date.now() + Math.random()).toString(10)
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

function addNote() {
    const title = document.getElementById("note-title").value;
    const note = document.getElementById("note-text").value;

    title.value = "";       /*введите тему новой заметки*/
    note.value = "";        /*введите текст новой заметки*/
}

function saveNote() {
                                            /*данные для заметки*/
    let ul = document.getElementById("notes-list");
    let title = document.getElementById("note-title").value;
    if (title === "") { title = prompt("заполните тему заметки", "Тема") };
    if (title === "") { alert("заполните тему заметки"); return };
    let note = document.getElementById("note-text").value;
    let date = dateTime();
    let uniqueValue = uniqueValues();
    let noteID = (title + uniqueValue);
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
    let newNote = document.createElement("li");
    newNote.className = "note-list-elem";
    newNote.id = noteID;
    newNote.innerHTML =
        `
        <div class="notes-title">${title}</div>               
        <div class="notes-text">
            <span class="date">${date}</span>

        </div>
        <button id="removeBtn-${noteID}">Remove</button>
        `
/*<span class="text">${note}</span>*/       /*в template в перечне была часть заметки, оставил темы*/    
     ul.prepend(newNote)
}

function displayNote() {
    
}


function editNote() {
    
}

function deleteNote() {
    
}





document.getElementById("add-btn").addEventListener("click", addNote);
document.getElementById("save-btn").addEventListener("click", saveNote);
document.getElementById("edit-btn").addEventListener("click", editNote);

// function testfoo() {
//     alert (1);
// }
// document.getElementById("test-btn").addEventListener("click", testfoo);

function testTimestamp2() {
    let date = new Date
    let unicID = date.getTime()
    return unicID
}

function testTimestamp1() {
    let unicID = (new Date).getTime()
    return unicID
}

function testTimestamp() {
    let unicID = (Date.now() + Math.random()).toString(10);
    return (A + unicID)
}
