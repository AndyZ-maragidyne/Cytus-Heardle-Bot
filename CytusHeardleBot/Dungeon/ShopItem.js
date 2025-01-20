const { Card } = require('./Card.js')

class ShopItem {
    /**
     * 
     * @param {*} type 1 - card
     * @param {*} item a reference to the item in question
     * @param {*} cost [CAPSO Coins, other stuff if I add it in the future]
     */
    constructor(type, item, cost) {
        this.type = type;
        this.item = item;
        this.cost = cost
        this.purchased = []
    }

    getType() {
        return this.type
    }

    getItem(){
        return this.item;
    }

    getCost(){
        return this.cost;
    }

    getPurchased(){
        return this.purchased
    }

    addPurchased(hi) {
        this.purchased.append(hi);
    }

    setPurchased(a) {
        this.purchased = a;
    }

    toJSON() {
        var i = null
        if (this.type == 1) {
            i = this.item.toJSON();
        }
        return {
            type: this.type,
            item: i,
            cost: this.cost,
            purchased: this.purchased
        }
    }

    static fromJSON(json) {
        let c = null;
        if (json.type == 1) {
            c = Card.fromJSON(json.item)
        }
        let a = new ShopItem(json.type, c,json.cost);
        a.setPurchased(json.purchased)
        return a
    }
}



module.exports = { ShopItem };