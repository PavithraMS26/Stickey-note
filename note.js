const addNoteButton = document.getElementById('addNote');
const noteContainer = document.getElementById('noteContainer');

function createNoteElement(content) {
    const noteDiv = document.createElement('div');
    noteDiv.className = 'note';

    const textarea = document.createElement('textarea');
    textarea.value = content;
    textarea.placeholder = 'Write your note here...';
    textarea.addEventListener('input', saveNotes);

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-btn';
    deleteButton.innerText = 'X';
    deleteButton.addEventListener('click', delbtn);

    function delbtn() {
        noteDiv.remove();
        saveNotes();
    }

    noteDiv.appendChild(textarea);
    noteDiv.appendChild(deleteButton);
    return noteDiv;
}

addNoteButton.addEventListener('click', () => {
    const note = createNoteElement('');
    noteContainer.appendChild(note);
    saveNotes();
});

function saveNotes() {
    const notes = [];
    document.querySelectorAll('.note textarea').forEach(textarea => {
        notes.push(textarea.value);
    });
    localStorage.setItem('stickyNotes', JSON.stringify(notes));
}

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('stickyNotes') || '[]');
    notes.forEach(content => {
        const note = createNoteElement(content);
        noteContainer.appendChild(note);
    });
}

document.addEventListener('DOMContentLoaded', loadNotes);