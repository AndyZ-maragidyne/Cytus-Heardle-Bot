const { Enemy } = require('./Enemy.js')
const { Card } = require('./Card.js')

class DungeonRoom {
    /**
     * 
     * @param {*} type 0 - battle, 1-campfire
     * @param {*} var1 
     * @param {*} var2 
     */
    constructor(type, description, var1, var2){
        this.type = type;
        this.description = description;
        this.var1 = var1;
        this.var2 = var2;
    }

    getType() {
        return this.type;
    }

    getVar1(){
        return this.var1;
    }

    setVar1(v){
        this.var1 = v;
    }

    getVar2(){
        return this.var2;
    }

    setVar2(v) {
        this.var2 = v;
    }

    getDescription(){
        return this.description
    }

    toJSON() {
        var storeVar1 = null;
        var storeVar2 = null;
        if (this.type == 0) {
            storeVar1 = []
            for (let i = 0; i < this.var1.length; i++) {
                storeVar1.push(this.var1[i].toJSON())
            }
        } else if (this.type == 5) {
            storeVar1 = []
            for (let i = 0; i < this.var1.length; i++) {
                storeVar1.push([this.var1[i][0], this.var1[i][1].toJSON()])
            }
        } else {
            storeVar1 = this.var1
            storeVar2 = this.var2
        }
        return {
            type: this.type,
            description: this.description,
            var1: storeVar1,
            var2: storeVar2
        }
    }

    static fromJSON(json) {
        var storeVar1 = null;
        var storeVar2 = null;
        if (json.type == 0) {
            storeVar1 = []
            for (let i = 0; i < json.var1.length; i++) {
                let e = Enemy.fromJSON(json.var1[i])
                storeVar1.push(e)
            }
        } else if (json.type == 5 ) {
            storeVar1 = []
            for (let i = 0; i < json.var1.length; i++) {
                let c = Card.fromJSON(json.var1[i][1])
                storeVar1.push([json.var1[i][0], c])
            }
        } else {
            storeVar1 = json.var1;
            storeVar2 = json.var2;
        }
        return new DungeonRoom(json.type, json.description, storeVar1, storeVar2)
    }
}

module.exports = { DungeonRoom }