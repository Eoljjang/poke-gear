import Notebook from './Notebook';

class User {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;

    this.decks = new Map(); //Placeholder data structure
    this.notebooks = new Map();
  }

  encryptPassword(){
    // Encrypt password
  }

  createDeck(deck){
    this.decks.set(deck.id, deck);
    }

  createNotebook(notebook){
    this.notebooks.set(notebook.id, notebook);
  }

}

export default User;
