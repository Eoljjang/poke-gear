class Notebook {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;

        this.notes = new Map();
    }

    createNote(note){
        this.notes.set(note.id, note);
    }
}

export default Notebook;
