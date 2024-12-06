import NoteContent from './NoteContent.js';

class Note {
    constructor(notebook) {
        this.id = notebook.id;
        this.name = notebook.name;
        this.noteContent = new NoteContent();
    }

    editNote(note) {
        //Placeholder
    }


}
