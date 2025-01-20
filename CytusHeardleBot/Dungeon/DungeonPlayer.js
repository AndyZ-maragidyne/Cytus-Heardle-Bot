class DungeonPlayer{
    constructor(id, deck, capsocoins, characters){
        this.id = id
        this.deck = deck
        this.capsocoins = capsocoins
        this.characters = characters
    }

    getId(){
        return this.id
    }

    getDeck(){
        return this.deck
    }

    getCapsoCoins(){
        return this.capsocoins
    }

    getCharacters(){
        return this.characters
    }

}