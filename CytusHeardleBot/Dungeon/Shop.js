const { ShopItem } = require('./ShopItem.js')

class Shop{
    constructor(item1, item2, item3, item4, item5, item6, stock) {
        this.item1 = item1;
        this.item2 = item2
        this.item3 = item3
        this.item4 = item4
        this.item5 = item5
        this.item6 = item6
        this.stock = stock;
    }
    
    getStock(){
        return [this.item1, this.item2, this.item3, this.item4, this.item5, this.item6, this.stock]
    }

    addDailyStock(items){
        this.stock.unshift(this.item3);
        this.stock.unshift(this.item2);
        this.stock.unshift(this.item1);
        if (this.stock.length > 21) {
            this.stock.splice(21);
        }
        this.item1 = items[0];
        this.item2 = items[1];
        this.item3 = items[2];
    }

    addWeeklyStock(items) {
        this.item4 = items[0];
        this.item5 = items[1];
        this.item6 = items[2];
    }

    toJSON() {
        let stuff = []
        for (let i = 0; i < this.stock.length; i++) {
            if (this.stock[i] != null){
                stuff.push(this.stock[i].toJSON())
            }
        }
        return {
            item1: this.item1.toJSON(),
            item2: this.item2.toJSON(),
            item3: this.item3.toJSON(),
            item4: this.item4.toJSON(),
            item5: this.item5.toJSON(),
            item6: this.item6.toJSON(),
            stock: stuff
        }
    }

    static fromJSON(json) {
        let i1 = ShopItem.fromJSON(json.item1)
        let i2 = ShopItem.fromJSON(json.item2)
        let i3 = ShopItem.fromJSON(json.item3)
        let i4 = ShopItem.fromJSON(json.item4)
        let i5 = ShopItem.fromJSON(json.item5)
        let i6 = ShopItem.fromJSON(json.item6)
        let s = [];
        for (let i = 0; i < json.stock.length; i++) {
            s.push(ShopItem.fromJSON(json.stock[i]))
        }

        return new Shop(i1, i2, i3, i4, i5, i6, s)
    }
}


module.exports = { Shop };