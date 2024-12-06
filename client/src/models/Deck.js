class Deck {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.cards = data.cards;

        this.notes = new Map();
    }

    createNote(noteData){
        this.notes.set(noteData.id, new Note(noteData.note));
    }
}

export default Deck;
