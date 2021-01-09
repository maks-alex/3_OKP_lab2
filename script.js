//prompt('how old are you', '');

function dateTime() {
    let currentDateTime = new Date();
    let year = currentDateTime.getFullYear();
    let month = currentDateTime.getMonth()+1;
    let day = currentDateTime.getDate();
    let hour = currentDateTime.getHours();
    let minuts = currentDateTime.getMinutes();
    let seconds = currentDateTime.getSeconds()

    return (year+"/"+month+"/"+day+"-"+hour+":"+minuts+":"+seconds)
}

function addNote() {
    let title = document.getElementById("note-title").value;
    let note = document.getElementById("note-text").value;

    title.value = "введите тему новой заметки";
    note.value = "введите текст новой заметки";
}

function saveNote() {
    let ul = document.getElementById("notes-list");
    let title = document.getElementById("note-title").value;
    let note = document.getElementById("note-text").value;
    let date = dateTime();
    // localStorage.setItem(title, note);

    let newNote = document.createElement("li");
    newNote.className = "note-list-elem";
    newNote.id = note;
    newNote.innerHTML =
        `
        <div class="notes-title">${title}</div>               
        <div class="notes-text">
            <span class="date">${date}</span>
            <span class="text">${note}</span>
        </div>`
    
      /*<div class="note-title">Note title</div>
        <div class="note-text">
            <span class="date">Сегодня, 17:20</span>
            <span class="text">text</span>
        </div>*/
    ul.prepend(newNote)


}

function editNote() {
    
}

function deleteNote() {
    
}

function displayNote() {
    
}

function testfoo() {
    alert (1);
}
document.getElementById("test-btn").addEventListener("click", testfoo);

document.getElementById("add-btn").addEventListener("click", addNote);
document.getElementById("save-btn").addEventListener("click", saveNote);
document.getElementById("edit-btn").addEventListener("click", editNote);


