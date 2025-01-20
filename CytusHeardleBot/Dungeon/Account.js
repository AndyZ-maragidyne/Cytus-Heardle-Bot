const { Card } = require( './Card.js')
const { Character } = require('./Character.js')
const { Enemy } = require('./Enemy.js')

class Account {
    /**
     * 
     * @param {*} id 
     * @param {*} player 
     * @param {*} essence 
     * @param {*} keys 
     * @param {*} characters 
     * @param {*} cards 
     * @param {*} team 
     * @param {*} deck 
     * @param {*} wagonLvl 
     * @param {*} deckSize 
     * @param {*} shopLvl 
     * @param {*} boostLvl 
     * @param {*} dungeonInfo [isDungeon, isBattle, [floor, room], [players, enemies, type, hand, xp, wagonSpeed, characterChance], loot]
     */
    constructor(id, player, essence, keys, characters, cards, team, deck, wagonLvl, deckSize, shopLvl, boostLvl, dungeonInfo) {
        this.id = id;
        this.player = player;
        this.essence = essence
        this.keys = keys;
        this.wagonLvl = wagonLvl;
        this.wagonHp = 100 + (10 * (this.wagonLvl - 1)) 
        this.maxWagonHp = this.wagonHp;
        this.characters = characters;
        this.cards = cards;
        this.team = team;
        this.deck = deck;
        this.deckSize = deckSize;
        this.shopLvl = shopLvl;
        this.boostLvl = boostLvl;
        this.loot = [0, 0, []]
        this.discard = []
        this.convoyHp = 100;
        this.dungeonInfo = dungeonInfo
        this.currentClearRoom = 0;
        this.highestClearRoom = 0;
        this.newDungeon = false;
    }

    toJSON(){

        let jsonPlayersList = []
        for (i = 0; i < this.dungeonInfo[3][0].length; i++) {
            jsonPlayersList.push(this.dungeonInfo[3][0][i].toJSON())
        }
        let jsonEList = []
        for (i = 0; i < this.dungeonInfo[3][1].length; i++) {
            jsonEList.push(this.dungeonInfo[3][1][i].toJSON())
        }
        let jsonHList = []
        for (i = 0; i < this.dungeonInfo[3][3].length; i++) {
            jsonHList.push(this.dungeonInfo[3][3][i].toJSON())
        }
        let Llist = []
        for (i = 0; i < this.loot[2].length; i++) {
            Llist.push(this.loot[2][i].toJSON())
        }
        return{
            id: this.id,
            essence: this.essence,
            keys: this.keys,
            characters: this.characters.map(character => character.toJSON()),
            cards: this.cards.map(card => card.toJSON()),
            team: this.team.map(team => team.getName()),
            deck: this.deck.map(deck => deck.toJSON()),
            discard: this.discard.map(deck => deck.toJSON()),
            wagonLvl: this.wagonLvl,
            deckSize: this.deckSize,
            shopLvl: this.shopLvl,
            boostLvl: this.boostLvl,
            inDungeon: this.inDungeon,
            inBattle:this.inBattle,
            highestClearRoom: this.highestClearRoom,
            currentClearRoom: this.currentClearRoom,
            newDungeon: this.newDungeon,
            dungeonInfo:[this.dungeonInfo[0], this.dungeonInfo[1], this.dungeonInfo[2], [jsonPlayersList, jsonEList, this.dungeonInfo[3][2], jsonHList, this.dungeonInfo[3][4], this.dungeonInfo[3][5], this.dungeonInfo[3][6], this.dungeonInfo[3][7]], [this.loot[0], this.loot[1], Llist]]
            // dungeonInfo:this.dungeonInfo.map((element, index) => {
            //     if (index === 0 || index === 1) {
            //         return element; // Booleans
            //     } else if (index === 2) {
            //         return element; // Array of 2 integers
            //     } else if (index === 3) {
            //         
            //         return element.map((e, k) => {
            //             if (k === 0) {
            //                 return e.name
            //             } else if (k === 1) {
            //                 return e.name
            //             } else if (k === 3) {
            //                 return e.toJSON();
            //             } else {
            //                 return e;
            //             }
            //         })
            //     } else if (index == 4) {
            //         return element.map((subElement, subIndex) => {
            //             if (subIndex === 0 || subIndex === 1) {
            //                 return subElement; // Integers
            //             } else if (subElement === 2) {
            //                 return subElement.toJSON(); // Objects
            //             } else {
            //                 return subElement;
            //             }
            //         });
            //     } else {
            //         return element; // Handle any additional cases as needed
            //     }
            // })

        };
    }

    static fromJSON(json){

        let goodCards = [];
        for (let i = 0; i < json.cards.length; i++) {
            goodCards.push(Card.fromJSON(json.cards[i]))
        }
        const characters = json.characters.map(characterJson => Character.fromJSON(characterJson));
        const cards = goodCards
        //const cards = json.cards.map(cardJson => Card.fromJSON(cardJson));
        const team = json.team.map(teamName => characters.find(character => character.getName() === teamName));
        //const team = json.team.map(teamJson => Character.fromJSON(teamJson));
        const deck = json.deck.map(deckJson => Card.fromJSON(deckJson));
        let discardStuff = []
        if (json.discard) {
            discardStuff = json.discard.map(deckJson => Card.fromJSON(deckJson))
        } else {
            discardStuff = []
        }
        let dungeonInfoStuff = [];
        if (json.dungeonInfo) {
            let dTemp = json.dungeonInfo;
            dungeonInfoStuff.push(dTemp[0])
            dungeonInfoStuff.push(dTemp[1])
            dungeonInfoStuff.push(dTemp[2])
            let player = [];
            for (let i = 0; i < dTemp[3][0].length; i++) {
                
                if (dTemp[3][0][i].type == 0) {
                    player.push(Character.fromJSON(dTemp[3][0][i]));
                } else  if (dTemp[3][0][i].type == 1) {
                    player.push(Enemy.fromJSON(dTemp[3][0][i]));
                }
            }
            let enemy = []
            for (let i = 0; i < dTemp[3][1].length; i++) {
                if (dTemp[3][1][i].type == 0) {
                    enemy.push(Character.fromJSON(dTemp[3][1][i]));
                } else  if (dTemp[3][1][i].type == 1) {
                    enemy.push(Enemy.fromJSON(dTemp[3][1][i]));
                }
            }
            let hand = [];
            for (let i = 0; i < dTemp[3][3].length; i++) {
                hand.push(Card.fromJSON(dTemp[3][3][i]));
            }
            let battleStuff = [player, enemy, dTemp[3][2], hand, dTemp[3][4], dTemp[3][5], dTemp[3][6], dTemp[3][7]]
            dungeonInfoStuff.push(battleStuff);
            let c = [];
            for (let i = 0; i < dTemp[4][2].length; i++) {
                c.push(Card.fromJSON(dTemp[4][2][i]))
            }
            let loot = [dTemp[4][0], dTemp[4][1], c]
            dungeonInfoStuff.push(loot);
        } else {
            dungeonInfoStuff = [false, false, [0, 0], [[], [], 0, [], 0, -1], [0, 0, []]];
        }
        const dungeonInfo = dungeonInfoStuff
        // const dungeonInfo = json.dungeonInfo ? json.dungeonInfo.map((element, index) => {
        //     if (index === 0 || index === 1) {
        //         return element; // Booleans
        //     } else if (index === 2) {
        //         return element; // Array of 2 integers
        //     } else if (index === 3) {
        //         return element.map((subElement, subIndex) => {
        //             if (subIndex === 0 || subIndex === 1) {
                        
        //             } else if (subIndex === 3) {
        //                 return Card.fromJSON(subElement);
        //             } else {
        //                 return subElement; // Integers
        //             }
        //         });
        //     } else {
        //         return element; // Handle any additional cases as needed
        //     }
        // }) : [false, false, [0, 0], [[], [], 0, [], 0, -1], []];
        let a = new Account(json.id, null, json.essence, json.keys, characters, cards, team, deck, json.wagonLvl, json.deckSize, json.shopLvl, json.boostLvl, dungeonInfo )
        a.setDiscard(discardStuff)
        a.setCurrentClearRoom(json.currentClearRoom)
        a.setHighestClearRoom(json.highestClearRoom)
        a.setNewDungeon(json.newDungeon)
        return a
    }

    getId(){
        return this.id
    }

    setId(a) {
        this.id = a;
    }

    setPlayer(p){
        this.player = p;
    }

    getPlayer(){
        return this.player
    }

    getCapsocoins() {
        return this.player.getCapsocoins();
    }

    getEssence() {
        return this.essence
    }

    getCards(){
        return this.cards
    }

    getDeck(){
        return this.deck
    }

    setDiscard(a) {
        this.discard = a
    }

    getDiscard() {
        return this.discard;
    }

    discardCard(card) {
        this.discard.push(card)
    }

    discardTempCards() {
        for (let i = 0; i < this.deck.length; i++) {
            if (!this.deck[i] || this.deck[i].getId() < 0 || this.deck[i].getId() == 21) {
                this.deck.splice(i, 1)
                i--;
            }
        }
    }

    getCharacters(){
        return this.characters
    }

    getWagonLvl() {
        return this.wagonLvl;
    }

    getMaxWagonHp() {
        return this.maxWagonHp
    }

    setMaxWagonHp(hp) {
        this.maxWagonHp = hp;
    }

    incWagonLvl(inc) {
        this.wagonLvl += inc;
    }

    getWagonHp() {
        return this.wagonHp;
    }

    loseWagonHp(inc) {
        this.wagonHp -= inc;
        if (this.wagonHp < 0) {
            this.wagonHp = 0;
        }
        return inc;
    }

    reloadWagonHP(){
        this.wagonHp = 100 + (10 * (this.wagonLvl - 1)) 
        this.maxWagonHp = this.wagonHp;
    }

    setWagonHp(hp) {
        this.wagonHp = hp;
    }

    getDeckSize(){
        return this.deckSize;
    }

    incDeckSize(inc) {
        this.deckSize += inc;
    }

    getShopLvl(){
        return this.shopLvl;
    }

    incShopLvl(inc) {
        this.shopLvl += inc;
    }

    getBoostLvl(){
        return this.boostLvl;
    }

    incBoostLvl(inc) {
        this.boostLvl += inc;
    }

    getTeam(){
        return this.team;
    }

    incEssence(amount) {
        this.essence += amount;
    }

    setEssence(essence) {
        this.essence = essence
    }

    setTeam(team) {
        this.team = team;
    }

    setCards(card){
        this.cards = card;
    }

    setDeck(deck) {
        this.deck = deck;
    }

    copyDeck(){
        this.deckCopy = this.deck.slice()
    }

    restoreDeck(){
        this.deck = this.deckCopy.slice()
    }

    getLoot() {
        return this.loot;
    }

    setLoot(atuff) {
        this.loot = atuff;
    }

    resetLoot() {
        this.loot = [0, 0, []]
    }

    getDungeonInfo() {
        return this.dungeonInfo;
    }

    setDungeonInfo(stuff) {
        this.dungeonInfo = stuff;
    }

    setBattleInfo(s) {
        this.dungeonInfo[3] = s;
    }

    resetDungeonInfo(){
        this.dungeonInfo = [false, false, [0, 0], [[], [], 0, [], 0, -1], [0, 0, []]]
    }

    setCurrentClearRoom(a) {
        if (a == undefined) {
            this.currentClearRoom = 0
        } else {
            this.currentClearRoom = a;
        }
    }

    getCurrentClearRoom() {
        return this.currentClearRoom;
    }

    setHighestClearRoom(a) {
        if (a == undefined) {
            this.highestClearRoom = 0
        } else {
            this.highestClearRoom = a;
        }
    }

    getHighestClearRoom() {
        return this.highestClearRoom
    }

    incHighestClearRoom() {
        this.highestClearRoom++;
    }

    setNewDungeon(a) {
        this.newDungeon = a;
    }
}

module.exports = { Account };