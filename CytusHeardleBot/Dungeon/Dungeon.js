const { DungeonRoom } = require('./DungeonRoom.js')
const { Card } = require('./Card.js')

class Dungeon {
    constructor(rooms, loot){
        this.rooms = rooms;
        this.loot = loot;
        this.placeXp();
        this.currentPlayers = [];
        this.highestFloors = [];
    }

    placeXp() {
        let xpNum = 1;
        for (i = 0; i < this.rooms.length; i++) {
            for (let j = 0; j < this.rooms[i].length; j++) {
                if (this.rooms[i][j].getType() == 0) {
                    this.rooms[i][j].setVar2(xpNum);
                    if (xpNum < 10) {
                        xpNum++;
                    }
                }
            }
        }
    }

    getRoom(floor, room) {
        return this.rooms[floor - 1][room - 1];
    }

    getLoot(floor, room) {
        return this.loot[floor - 1][room - 1]
    }

    addPlayer(id) {
        this.currentPlayers.push(id);
    }

    setCurrentPlayers(a) {
        this.currentPlayers = a;
    }

    getCurrentPlayers() {
        return this.currentPlayers;
    }

    removePlayer(id) {
        return new Promise(async(resolve, reject) => {
            let index = this.currentPlayers.indexOf(id);
            if (index != -1) {
                this.currentPlayers.splice(index, 1)
            }
            resolve()
        })
    }

    containsPlayer(id) {
        return this.currentPlayers.includes(id)
    }

    overwriteHighestFloors(asd){
        this.highestFloors = asd;
    }

    setHighestFloor(id, floor) {
        let found = false;
        for (let i = 0; i < this.highestFloors.length; i++) {
            if (this.highestFloors[i][0] == id) {
                found = true
                if (this.highestFloors[i][1] < floor){
                    this.highestFloors[i][1] = floor;
                    return;
                }
            }
        }
        if (!found) {
        this.highestFloors.push([id, floor]);
        }
    }

    getHighestFloor(id) {
        for (let i = 0; i < this.highestFloors.length; i++) {
            if (this.highestFloors[i][0] == id) {
                return this.highestFloors[i][1];
            }
        }
        return 0;
    }

    toJSON() {
        
        let jsonLoot = []
        for (let i = 0; i < this.loot.length; i++) {
            let asdf = []
            for (let j = 0; j < this.loot[i].length; j++) {
                let hi = [];
                hi.push(this.loot[i][j][0]);
                hi.push(this.loot[i][j][1]);
                let bye = [];
                
                for (let k = 0; k < this.loot[i][j][2].length; k++) {
                    bye.push(this.loot[i][j][2][k].toJSON())
                }
                hi.push(bye);
                asdf.push(hi)
                
            }
            jsonLoot.push(asdf)
        }
        let r = [];
        for (let i = 0; i < this.rooms.length; i++) {
            let t = []
            for (let j = 0; j < this.rooms[i].length; j++) {
                t.push(this.rooms[i][j].toJSON())
            }
            r.push(t)
        }
        return {
            rooms: r,
            loot: jsonLoot,
            currentPlayers: this.currentPlayers,
            highestFloors: this.highestFloors
        }
    }

    static fromJSON(json) {
        let allRooms = []
        for (let i = 0; i < json.rooms.length; i++) {
            let a = []
            for (let j = 0; j < json.rooms[i].length; j++) {
                a.push(DungeonRoom.fromJSON(json.rooms[i][j]))
            }
            allRooms.push(a)
        }
        let allLoot = [];
        for (let i = 0; i < json.loot.length; i++) {
            let a = []
            for (let j = 0; j < json.loot[i].length; j++) {
                let hi = [];
                hi.push(json.loot[i][j][0]);
                hi.push(json.loot[i][j][1])
                let bye = [];
                for (let k = 0; k < json.loot[i][j][2].length; k++) {
                    let c = Card.fromJSON(json.loot[i][j][2][k])
                    bye.push(c);
                }
                hi.push(bye);
                a.push(hi)
            }
            allLoot.push(a)
        }
        let d = new Dungeon(allRooms, allLoot)
        d.setCurrentPlayers(json.currentPlayers);
        d.overwriteHighestFloors(json.highestFloors)
        return d
    }
}

module.exports = { Dungeon };