import Deck from './Deck';

class User {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;

    this.decks = new Map(); //Placeholder data structure
  }

  encryptPassword(){
    // Encrypt password
  }

  createDeck(deck){
    this.decks.set(deck.id, deck);
    }

}

export default User;
