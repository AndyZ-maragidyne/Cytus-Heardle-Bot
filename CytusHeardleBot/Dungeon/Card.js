class Card {
    /**
     * 
     * @param {*} id 
     * @param {*} name 
     * @param {*} description 
     * @param {*} level 
     * @param {*} tier tier 0 cards are ones you get during a run. They will be discarded.
     * @param {*} var1 
     * @param {*} var2 
     */
    constructor(id, name, description, level, tier, var1, var2){
        this.id = id
        this.name = name
        this.description = description
        //this.durability = durability
        this.level = level
        this.xp = 0;
        this.tier = tier
        this.var1 = var1
        this.var2 = var2
    }
    
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            level: this.level,
            xp: this.xp,
            tier: this.tier,
            var1: this.var1,
            var2: this.var2,
        };
    }

    static fromJSON(json) {
        // let var1;
        // if (json.var1.type === 'Enemy') {
        //     //var1 = Enemy.fromJSON(json.var1);
        // } else if (json.var1.type === 'integer') {
        //     var1 = json.var1.value;
        // } else {
        //     var1 = null;
        // }
        let coolCard = new Card(json.id, json.name, json.description, json.level, json.tier, json.var1, json.var2);
        coolCard.setXp(json.xp)
        return coolCard
    }

    copy() {
        let c = new Card(this.id, this.name, this.description, this.level, this.tier, this.var1, this.var2)
        c.setXp(this.xp)
        c.setId(this.id);
        return c;
    }

    getId(){
        return this.id
    }

    flipId(){
        if (this.id > 0) {
            this.id *= -1;
        }
    }

    setId(id) {
        this.id = id;
    }

    getName() {
        return this.name
            .replace('${var1}', this.var1)
            .replace('${var2}', this.var2);
    }

    setName(thing) {
        this.name = thing;
    }

    getDescription() {
        return this.description
            .replace('${var1}', this.var1)
            .replace('${var2}', this.var2);
    }

    setDescription(des) {
        this.description = des;
    }

    // getDurability() {
    //     return this.durability
    // }

    getXp() {
        return this.xp;
    }

    modifyXp(co) {
        this.xp += co;
    }

    setXp(x) {
        this.xp = x;
    } 

    getLevel() {
        return this.level
    }

    setLevel(level) {
        this.level = level
    }

    incLevel() {
        this.level++;
    }

    getTier() {
        return this.tier
    }

    getVar1(){
        return this.var1
    }

    getVar2(){
        return this.var2
    }

    setVar1(thing) {
        this.var1 = thing;
    }

    setVar2(thing) {
        this.var2 = thing;
    }

    incVar1(thing) {
       this.var1 += thing;
    }

    incVar2(thing) {
        this.var2 += thing;
    }

    toString() {
        let infoString = "Card: " + this.name + "\n"
        + this.getDescription() + "\n\n"
        return infoString
    }

}

module.exports = { Card };