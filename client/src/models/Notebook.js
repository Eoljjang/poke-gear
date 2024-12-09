class Notebook {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;

        this.notes = [];
    }

    createNote(note){
        this.notes.push(note);
    }
}

export default Notebook;
