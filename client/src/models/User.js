import Notebook from './Notebook';

class User {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;

    this.decks = []; //Placeholder data structure
    this.notebooks = [];
  }

  encryptPassword(){
    // Encrypt password
  }

  createDeck(deck){
    this.decks.push(deck);
    }

  createNotebook(notebook){
    this.notebooks.push(notebook);
  }

}

export default User;
