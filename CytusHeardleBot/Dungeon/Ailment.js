class Ailment{
    /**
     * 0-burn
     * 1-poison
     * 2-silence
     * 3-damage boost
     * 4-weakness
     * 5-fragile
     * 6-shield
     * 7-decay
     * 8-fear
     * 9-healing over time
     * 10-damage over time
     * 11-summon
     * 12-freeze
     * 13 - haste
     * 14 - invisibility
     * 15 - healing boost
     * 16 - healing reduction
     * @param {*} type 
     * @param {*} damage 
     * @param {*} duration 
     */
    constructor(type, damage, duration){
        this.type = type;
        this.damage = damage;
        this.duration = duration;
    }

    toJSON(){
        return {
            type: this.type,
            damage: this.damage,
            duration:this.duration
        }
    }

    static fromJSON(json) {
        return new Ailment(json.type, json.damage, json.duration)
    }

    getType(){
        return this.type;
    }

    getDamage(){
        return this.damage;
    }

    getDuration(){
        return this.duration;
    }
}
module.exports = { Ailment };