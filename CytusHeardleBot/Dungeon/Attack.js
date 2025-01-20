const { Ailment } = require('./Ailment.js')
class Attack{
    /**
     * 
     * @param {*} type damage(0) or healing(1) or damage to all(2) or healing to all(3) or damage to self(4) or healing to self(5), (-1) Archer queen boss, (-2) Royal Champion boss
     * @param {*} damage how much damage/healing
     * @param {*} ailments passed in as an array of ailment classes
     * @param {*} superCharge how many hits does it take to be able to use this attack once
     * @param {*} weight chance of this attack being chosen
     */
    constructor(type, damage, ailments, superCharge, weight){
        this.type = type;
        this.damage = damage;
        this.ailments = ailments;
        this.superCharge = superCharge
        this.weight = weight;
    }

    toJSON(){
        return{
            type: this.type,
            damage: this.damage,
            ailments: this.ailments.map(ail => ail.toJSON()),
            superCharge: this.superCharge,
            weight: this.weight
        }
    }

    static fromJSON(json) {
        const ailment = json.ailments.map(ail => Ailment.fromJSON(ail));
        return new Attack(json.type, json.damage, ailment, json.superCharge, json.weight)
    }

    getType(){
        return this.type;
    }

    getDamage(){
        return this.damage;
    }

    setDamage(o) {
        this.damage = o
    }

    getAilments(){
        return this.ailments;
    }

    getSuperCharge(){
        return this.superCharge;
    }

    setSuperCharge(a) {
        this.superCharge = a;
    }

    getWeight(){
        return this.weight;
    }
}

module.exports = { Attack };