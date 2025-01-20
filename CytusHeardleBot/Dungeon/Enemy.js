const { Attack } = require('./Attack.js')
class Enemy{
    constructor(name, hp, speed, onDeathNums, atk){
        this.name = name
        this.hp = hp
        this.maxHp = hp
        this.atk = atk
        this.speed = speed
        this.maxSpeed = speed;
        this.initialSpeed = -1;
        this.onDeath = false;
        this.onDeathNums = onDeathNums;
        if (Array.isArray(this.onDeathNums) && this.onDeathNums.length > 0) {
            this.onDeath = true;
        } else {
            this.OnDeath = false;
        }
        this.superCharge = 0;
        this.isBurn = false;
        this.burnDamage = 0;
        this.burnDuration = 0;
        this.isPoison = false;
        this.poisonDamage = 0;
        this.poisonDuration = 0;
        this.isSilenced = 0;
        this.silencedDuration = 0;
        this.isDamageBoost = false;
        this.damageBoost = 0
        this.damageBoostDuration = 0;
        this.isWeak = false;
        this.weakReduction = 0;
        this.weakDuration = 0;
        this.isFragile = false;
        this.fragileReduction = 0;
        this.fragileDuration = 0;
        this.isShield = false;
        this.shieldHp = 0;
        this.shieldDuration = 0;
        this.isDecay = false;
        this.decayDuration = 0;
        this.decayPercent = 0;
        this.isFear = false;
        this.fearChance = 0;
        this.fearDuration = 0;
        this.isHealingOverTime = false;
        this.healingOverTime = [];
        this.isDamageOverTime = false;
        this.damageOverTime = [];
        this.isFreeze = false;
        this.freezeDuration = 0;
        this.isHaste = false;
        this.hasteDuration = 0; 
        this.hasteIncrease = 0
        this.isInvisible = false;
        this.invisibleDuration = 0
        this.isHealingBoost = false;
        this.healingBoost = 0;
        this.healingBoostDuration = 0;
        this.isHealingReduction = false;
        this.healingReduction = 0;
        this.healingReductionDuration = 0;
    }

    copy(){
        return new Enemy(this.name, this.hp, this.speed, this.onDeathNums, this.atk)
    }

    toJSON() {
        let atkJSON = [];
        for (let i = 0; i < this.atk.length; i++) {
            let inner = []
            for (let j = 0; j < this.atk[i].length; j++) {
                inner.push(this.atk[i][j].toJSON());
            }
            atkJSON.push(inner);
        }
        return {
            type: 1,
            name: this.name,
            hp: this.hp,
            speed: this.speed,
            maxSpeed: this.maxSpeed,
            onDeathNums: this.onDeathNums,
            atk: atkJSON,
            superCharge: this.superCharge,
            isBurn: this.isBurn,
            burnDamage: this.burnDamage,
            burnDuration: this.burnDuration,
            isPoison: this.isPoison,
            poisonDamage: this.poisonDamage,
            poisonDuration: this.poisonDuration,
            isSilenced: this.isSilenced,
            silencedDuration: this.silencedDuration,
            isDamageBoost: this.isDamageBoost,
            damageBoost: this.damageBoost,
            damageBoostDuration: this.damageBoostDuration,
            isWeak: this.isWeak,
            weakReduction: this.weakReduction,
            weakDuration: this.weakDuration,
            isFragile: this.isFragile,
            fragileReduction: this.fragileReduction,
            fragileDuration: this.fragileDuration,
            isShield: this.isShield,
            shieldHp: this.shieldHp,
            shieldDuration: this.shieldDuration,
            isDecay: this.isDecay,
            decayDuration: this.decayDuration,
            decayPercent: this.decayPercent,
            isFear: this.isFear,
            fearChance: this.fearChance,
            fearDuration: this.fearDuration,
            isHealingOverTime: this.isHealingOverTime,
            healingOverTime: this.healingOverTime,
            isDamageOverTime: this.isDamageOverTime,
            damageOverTime: this.damageOverTime,
            isFreeze: this.isFreeze,
            freezeDuration: this.freezeDuration,
            isHaste: this.isHaste,
            hasteDuration: this.hasteDuration, 
            hasteIncrease: this.hasteIncrease,
            isInvisible: this.isInvisible,
            invisibleDuration: this.invisibleDuration,
            isHealingBoost: this.isHealingBoost,
            healingBoost: this.healingBoost,
            healingBoostDuration: this.healingBoostDuration,
            isHealingReduction: this.isHealingReduction,
            healingReduction: this.healingReduction,
            healingReductionDuration: this.healingReductionDuration,
        };
    }

    static fromJSON(json) {
        let pure = [];
        let a = json.atk;
        for (let i = 0; i < a.length; i++) {
            let cool = []
            for (let j = 0; j < a[i].length; j++) {
                cool.push(Attack.fromJSON(a[i][j]))
            }
            pure.push(cool);
        }
        const atk = pure;
        let character = new Enemy(json.name, json.hp, json.maxSpeed, json.onDeathNums, atk);
        character.setSpeed(json.speed);
        character.setOtherStats(json);
        return character
    }

    setOtherStats(json){
        this.superCharge = json.superCharge;
        this.isBurn = json.isBurn;
        this.burnDamage = json.burnDamage;
        this.burnDuration = json.burnDuration;
        this.isPoison = json.isPoison;
        this.poisonDamage = json.poisonDamage;
        this.poisonDuration = json.poisonDuration;
        this.isSilenced = json.isSilenced;
        this.silencedDuration = json.silencedDuration;
        this.isDamageBoost = json.isDamageBoost;
        this.damageBoost = json.damageBoost;
        this.damageBoostDuration = json.damageBoostDuration;
        this.isWeak = json.isWeak;
        this.weakReduction = json.weakReduction;
        this.weakDuration = json.weakDuration;
        this.isFragile = json.isFragile;
        this.fragileReduction = json.fragileReduction;
        this.fragileDuration = json.fragileDuration;
        this.isShield = json.isShield;
        this.shieldHp = json.shieldHp;
        this.shieldDuration = json.shieldDuration;
        this.isDecay = json.isDecay;
        this.decayDuration = json.decayDuration;
        this.decayPercent = json.decayPercent;
        this.isFear = json.isFear;
        this.fearChance = json.fearChance;
        this.fearDuration = json.fearDuration;
        this.isHealingOverTime = json.isHealingOverTime;
        this.healingOverTime = json.healingOverTime;
        this.isDamageOverTime = json.isDamageOverTime;
        this.damageOverTime = json.damageOverTime;
        this.isFreeze = json.isFreeze;
        this.freezeDuration = json.freezeDuration;
        this.hasteDuration = json.hasteDuration || false;
        this.hasteIncrease = json.hasteIncrease || 0;
        this.isInvisible = json.isInvisible || false;
        this.invisibleDuration = json.invisibleDuration || 0;
        this.isHealingBoost = json.isHealingBoost || false,
        this.healingBoost = json.healingBoost || 0,
        this.healingBoostDuration = json.healingBoostDuration || 0,
        this.isHealingReduction = json.isHealingReduction || false,
        this.healingReduction = json.healingReduction || 0,
        this.healingReductionDuration = json.healingReductionDuration || 0
    }

    isCharacter(){
        return false;
    }

    getName(){
        return this.name
    }
    getHp(){
        return this.hp
    }

    setHp(s) {
        this.hp = s;
    }

    getMaxHp(){
        return this.maxHp
    }

    getAtk(){
        return this.atk
    }

    setAtk(s) {
        this.atk = s;
    }

    chooseAtk(){
        if (this.atk.length == 1){
            return this.atk[0];
        }
        let totalWeight = 0;
        for( i = 0; i < this.atk.length; i++) {
            if (this.superCharge >= this.atk[i][0].getSuperCharge()) {
                totalWeight += this.atk[i][0].getWeight();
            }
        }

        let random = Math.floor(Math.random() * totalWeight) + 1;
        for ( i = 0; i < this.atk.length; i++) {
            if (this.superCharge >= this.atk[i][0].getSuperCharge()) {
                random -= this.atk[i][0].getWeight();
                if (random <= 0) {
                    this.superCharge -= this.atk[i][0].getSuperCharge();
                    this.superCharge ++;
                    return this.atk[i];
                }
            }
        }

    }

    getSpeed(){
        return this.speed
    }

    setSpeed(speed) {
        this.speed = speed;
    }

    incSpeed(inc) {
        this.speed += inc;
    }

    getMaxSpeed() {
        return this.maxSpeed;
    }

    loseHp(damage){
        if (this.isFragile) {
            damage = damage + (damage * (this.fragileReduction/100));
            this.guardReduction = 0;
        }
        //this is here so that I can change the damage value for the shield, but still return the original damage for game output
        let calculatedDamage = damage;
        if (this.isShield) {
            this.shieldHp -= Math.floor(damage);
            if (this.shieldHp <= 0) {
                damage = this.shieldHp * -1;
                this.removeShield();
            } else {
                damage = 0;
            }
        }
        this.hp = this.hp - Math.floor(damage);
        if(this.hp < 0){
            this.hp = 0
        }
        return Math.floor(calculatedDamage);
    }

    heal(health){
        if (this.isHealingBoost || this.isHealingReduction) {
            boost = 0;
            if (this.isHealingBoost) {
                boost = this.healingBoost;
            }
            if (this.isHealingReduction) {
                boost -= this.healingReduction
            }
            health = health * (1 + (boost/100))
        }
        this.hp = this.hp + health
        if (this.hp > this.maxHp){
            this.hp = this.maxHp
        }
        return health;
    }
    
    decreaseSpeed(){
        this.speed = this.speed - 1;
        if (this.isHaste) {
            this.speed -= this.hasteIncrease;
            if (this.speed < 0) {
                this.speed = 0;
            }
        }
    }

    setInitialSpeed() {
        if (this.initialSpeed == -1) {
            this.speed = Math.floor(Math.random() * this.maxSpeed);
        } else {
            this.speed = this.initialSpeed;
        }
    }

    hasOnDeath(){
        return this.onDeath
    }
    
    getOnDeathNums() {
        return this.onDeathNums
    }

    resetSpeed(){
        this.speed = this.maxSpeed
    }

    toString() {
        let infoString = "Enemy: " + this.name + "\n"
        + "Attack: " + this.atk + "\n"
        + "HP: " + this.hp + "\n"
        + "Speed: " + this.speed + "\n\n"
        return infoString;
    }

    doAilments(){
        let messages = "";
        messages += this.doBurn();
        messages += this.doPoison();
        this.doSilence();
        this.doDamageBoost();
        this.doWeak();
        this.doFragile();
        this.doShield();
        this.doDecay();
        this.doFear();
        messages += this.doHealingOverTime();
        messages += this.doDamageOverTime();
        this.doFreeze()
        this.doHaste()
        this.doInvisible()
        this.doHealingBoost()
        this.doHealingReduction()
        return messages;
    }

    cureAllAilments(turns) {
        this.curePosAilments(turns);
        this.cureNegAilments(turns);
    }

    curePosAilments(turns) {
        this.cureDamageBoost(turns)
        this.cureShield(turns)
        this.cureHaste(turns)
        this.cureInvisible(turns)
        this.cureHealingBoost(turns)
    }

    cureNegAilments(turns) {
        this.cureBurn(turns)
        this.curePoison(turns)
        this.cureSilence(turns)
        this.cureWeakness(turns)
        this.cureFragile(turns)
        this.cureDecay(turns)
        this.cureFear(turns)
        this.cureFreeze(turns) 
        this.cureHealingReduction(turns)
    }

    removeAilments() {
        this.removeBurn();
        this.removePoison();
        this.removeSilence()
        this.removeDamageBoost();
        this.removeWeakness();
        this.removeFragile()
        this.removeShield()
        this.removeDecay()
        this.removeFear()
        this.removeHealingOverTime()
        this.removeDamageOverTime()
        this.removeFreeze()
        this.removeHaste()
        this.removeInvisible()
        this.removeHealingBoost();
        this.removeHealingReduction()
    }

    setBurn(damage, duration) {
        if (this.isBurn) {
            if (damage > this.burnDamage) {
                this.burnDamage = damage;
                this.burnDuration = duration;
            }
        } else {
            this.isBurn = true;
            this.burnDamage = damage;
            this.burnDuration = duration;
        }
        return this.name + " was set on fire for " + this.burnDamage + " damage (" + this.burnDuration + " turns)\n";
    }

    doBurn() {
        if (this.isBurn) {
            let bDamage = this.loseHp(this.burnDamage);
            this.burnDuration -= 1;
            if (this.burnDuration <= 0) {
                this.removeBurn()
            }
            return this.name + " took " + bDamage + " damage from burn\n";
        }
        return "";
    }

    cureBurn(turns) {
        this.burnDuration -= turns;
        if (this.burnDuration <= 0) {
            this.removeBurn();
        }
    }

    removeBurn() {
        this.isBurn = false;
        this.burnDamage = 0;
        this.burnDuration = 0;
    }

    setPoison(damage, duration) {
        if (this.isPoison) {
            if (damage > this.poisonDamage) {
                this.poisonDamage = damage;
                this.poisonDuration += duration;
            }
        } else {
            this.isPoison = true;
            this.poisonDamage = damage;
            this.poisonDuration = duration;
        }
        return this.name + " was poisoned for " + this.poisonDamage + " damage (" + this.poisonDuration + " turns)\n";
        }

    doPoison() {
        if (this.isPoison) {
            let pdamage = this.loseHp(this.poisonDamage);
            this.poisonDuration -= 1;
            if (this.poisonDuration <= 0) {
                this.removePoison();
            }
            return this.name + " took " + pdamage + " damage from poison\n";
        }
        return "";
    }

    curePoison(turns) {
        this.poisonDuration -= turns
        if (this.burnDuration <= 0) {
            this.removePoison();
        }
    }

    removePoison() {
        this.isPoison = false;
        this.poisonDamage = 0;
        this.poisonDuration = 0;
    }

    setSilence(duration) {
        this.isSilenced = true;
        this.silencedDuration = this.silencedDuration + duration;
        return this.name + " was silenced for " + this.silencedDuration + " turns\n";
    }

    hasSilenced(){
        return this.isSilenced
    }

    doSilence() {
        if (this.isSilenced) {
            this.silencedDuration -= 1;
            if (this.silencedDuration <= 0) {
                this.removeSilence();
            }
        }
    }

    cureSilence(turns) {
        this.silenceDuration -= turns
        if (this.silenceDuration <= 0) {
            this.removeSilence();
        }
    }

    removeSilence() {
        this.isSilenced = false;
        this.silencedDuration = 0;
    }

    setDamageBoost(boost, duration) {
        this.isDamageBoost = true;
        this.damageBoost = boost;
        this.damageBoostDuration = this.damageBoostDuration + duration;
        return this.name + "'s damage is boosted by " + this.damageBoost + "% (" + this.damageBoostDuration + " turns)\n";
    }

    doDamageBoost() {
        console.log("checiing damage boost  ")
        if (this.isDamageBoost) {
            console.log("removing boost by 1")
            this.damageBoostDuration -= 1;
            if (this.damageBoostDuration <= 0) {
                console.log("Should not go into here")
                this.removeDamageBoost();
            }
        }
    }

    cureDamageBoost(turns) {
        this.damageBoostDuration -= turns
        if (this.damageBoostDuration <= 0) {
            this.removeDamageBoost();
        }
    }
    
    removeDamageBoost() {
        this.isDamageBoost = false;
        this.damageBoost = 0;
        this.damageBoostDuration = 0;
    }

    setWeakness(red, duration) {
        this.isWeak = true;
        this.weakReduction = red;
        this.weakDuration += duration;
        return this.name + "'s damage is weakened by " + this.weakReduction + "% (" + this.weakDuration + " turns)\n";
    }

    doWeak() {
        if (this.isWeak) {
            this.weakDuration -= 1;
            if (this.weakDuration <= 0) {
                this.removeWeakness();
            }
        }
    }

    cureWeakness(turns) {
        this.weakDuration -= turns
        if (this.weakDuration <= 0) {
            this.removeWeakness();
        }
    }

    removeWeakness(){
        this.isWeak = false;
        this.weakDuration = 0;
        this.weakReduction = 0;
    }

    setFragile(red, dur) {
        this.isFragile = true;
        this.fragileDuration += dur;
        this.fragileReduction = red;
        return this.name + " is fragile! They will take " +  this.fragileReduction + "% more damage (" + this.fragileDuration + " turns)\n";
    }

    doFragile() {
        if (this.isFragile) {
            this.fragileDuration -= 1;
            if (this.fragileDuration <= 0) {
                this.removeFragile();
            }
        }
    }

    cureFragile(turns) {
        this.fragileDuration -= turns
        if (this.fragileDuration <= 0) {
            this.removeFragile();
        }
    }

    removeFragile() {
        this.isFragile = false;
        this.fragileDuration = 0;
        this.fragileReduction = 0;
    }

    setShield(shield, duration) {
        this.isShield = true;
        this.shieldHp = this.shieldHp + shield;
        if (duration > this.shieldDuration) {
            this.shieldDuration = duration;
        }
       
        return this.name + " gained a " + this.shieldHp + "HP shield. (" + this.shieldDuration + " turns)\n"
    }

    hasShield(){
        return this.isShield;
    }

    getShield(){
        return this.shieldHp;
    }
    
    doShield() {
        if (this.isShield) {
            this.shieldDuration -= 1;
            if (this.shieldDuration <= 0) {
                this.removeShield();
            }
        }
    }

    cureShield(turns) {
        this.shieldDuration -= turns
        if (this.shieldDuration <= 0) {
            this.removeShield();
        }
    }

    removeShield() {
        this.isShield = false;
        this.shieldDuration = 0;
        this.shieldHp = 0;
    }

    setDecay(percentage, duration) {
        this.isDecay = true;
        this.decayPercent = percentage;
        this.decayDuration = duration;
        return this.name + " is decaying! They will take " +  this.decayPercent + "% of their max hp (" + this.decayDuration + " turns)\n";
    }

    hasDecay() {
        return this.isDecay;
    }

    doDecay() {
        if (this.isDecay) {
            damaged = this.loseHp(this.maxHp * (this.decayPercent/100))
            this.decayDuration -= 1;
            if (this.decayDuration <= 0) {
                this.removeDecay();
            }
            return this.name + " took " + damaged + " damage due to decay\n"
        }
    }

    cureDecay(turns) {
        this.decayDuration -= turns
        if (this.decayDuration <= 0) {
            this.removeDecay();
        }
    }

    removeDecay() {
        this.isDecay = false;
        this.decayDuration = 0;
        this.decayPercent = 0;
    }

    setFear(chance, duration){
        if (this.isFear) {
            this.fearChance += chance;
            if (duration > this.fearDuration) {
                this.fearDuration = duration;
            }
        } else {
            this.isFear = true;
            this.fearChance = chance;
            this.fearDuration = duration;
        }
        return this.name + " is shivering with fear! They have a " +  this.fearChance + "% to skip their turn (" + this.fearDuration + " turns)\n";
    }

    hasFear(){
        return this.isFear;
    }

    getFear() {
        return this.fearChance;
    }

    doFear() {
        if (this.isFear) {
            this.fearDuration -= 1;
            if (this.fearDuration <= 0) {
                this.removeFear()
            }
        }
    }

    cureFear(turns) {
        this.fearDuration -= turns
        if (this.fearDuration <= 0) {
            this.removeFear();
        }
    }

    removeFear() {
        this.isFear = false;
        this.fearChance = 0;
        this.fearDuration = 0;
    }

    setHealingOverTime(healing, duration) {
        this.isHealingOverTime = true;
        this.healingOverTime.push([duration, healing]);
        return this.name + " will heal " +  healing + "HP each turn (" + duration + " turns)\n";
    }

    doHealingOverTime() {
        if(this.isHealingOverTime) {
            let message = "";
            for (i = 0; i < this.healingOverTime.length; i++) {
                message += this.name + " healed " + this.heal(this.healingOverTime[i][1]) + "HP\n";
                this.healingOverTime[i][0] -= 1;
            }

            this.removeHealingOverTime();
            return message;
        } else {
            return ""
        }
    }


    removeHealingOverTime() {
        this.healingOverTime = this.healingOverTime.filter(row => row[0] > 0);
        if (this.healingOverTime.length == 0){
            this.isHealingOverTime = false;
        }
    }

    setDamageOverTime(damage, duration) {
        this.isDamageOverTime = true;
        this.damageOverTime.push([duration, damage])
        return this.name + " will take " +  damage + " damage each turn (" + duration + " turns)\n";
    }

    doDamageOverTime() {
        if(this.isDamageOverTime) {
            let message = "";
            for (i = 0; i < this.damageOverTime.length; i++) {
                message += this.name + " took " + this.loseHp(this.damageOverTime[i][1]) + "damage\n";
                this.damageOverTime[i][0] -= 1;
            }

            this.damageOverTime = this.damageOverTime.filter(row => row[0] > 0);
            if (this.damageOverTime.length == 0) {
                this.isDamageOverTime = false;
            }
            return message;
        } else {
            return "";
        }
    }

    removeDamageOverTime() {
        this.damageOverTime = this.damageOverTime.filer(row => row[0] > 0);
        if (this.damageOverTime.length == 0) {
            this.isDamageOverTime = false;
        }
    }

    setFreeze(duration) {
        if (this.isFreeze) {
            this.freezeDuration += duration;
        } else {
            this.isFreeze = true;
            this.freezeDuration = duration
        }
        return this.name + " is frozen for " +  duration + " turns\n";
    }

    doFreeze() {
        if (this.isFreeze) {
            this.freezeDuration -= 1;
            if (this.freezeDuration <= 0 ) {
                this.removeFreeze()
            }
        }
    }

    hasFreeze(){
        return this.isFreeze;
    }
    
    removeFreeze() {
        this.freezeDuration = 0;
        this.isFreeze = false;
    }

    cureFreeze(turns) {
        this.freezeDuration -= turns;
        if (this.freezeDuration <= 0) {
            this.removeFreeze();
        }
    }

    setHaste(damage, duration) {
        if (this.isHaste) {
            this.hasteIncrease += damage;
            if (duration > this.hasteDuration) {
                this.hasteDuration = duration;
            }
        } else {
            this.isHaste = true;
            this.hasteDuration = duration;
            this.hasteIncrease = damage;
        }
        return this.name + " has recieved haste. Their speed will decrease by an additional " + this.hasteIncrease + " each turn for " + this.hasteDuration + " turns\n"
    }

    hasHaste(){
        return this.isHaste;
    }

    doHaste() {
        if (this.isHaste) {
            this.hasteDuration -= 1;
            if (this.hasteDuration <= 0) {
                this.removeHaste()
            }
        }
    }

    removeHaste() {
        this.hasteDuration = 0;
        this.isHaste = false;
        this.hasteIncrease = 0;
    }

    cureHaste(turns) {
        if (this.isHaste) {
            this.hasteDuration -= turns;
            if (this.hasteDucation <= 0) {
                this.removeHaste()
            }
        }
    }

    setInvisible(duration) {
        if (this.isInvisible) {
            this.invisibleDuration += duration
        } else {
            this.isInvisible = true;
            this.invisibleDuration = duration;
        }
        return this.name + " is invisible. Any direct melee attacks for the next " + this.invisibleDuration + " turns will miss.\n"
    }

    hasInvisible() {
        return this.isInvisible;
    }

    doInvisible() {
        this.invisibleDuration -= 1;
    }

    cureInvisible(turns) {
        if (this.isInvisible) {
            this.invisibleDuration -= turns;
            if (this.invisibleDuration <= 0) {
                this.removeInvisible()
            }
        }

    }

    removeInvisible() {
        this.isInvisible = false;
        this.invisibleDuration = 0;
    }
    
    setHealingBoost(boost, duration) {
        if (this.isHealingBoost) {
            this.healingBoost += boost
            if (duration > this.healingBoostDuration) {
                this.healingBoostDuration = duration
            }
        } else {
            this.isHealingBoost = true;
            this.healingBoostDuration = duration;
            this.healingBoost = boost
        }
        return this.name + " recieved a healing boost. They will heal " + this.healingBoost + "% more HP for the next " + this.healingBoostDuration + " turns"
    }

    hasHealingBoost() {
        return this.isHealingBoost;
    }

    doHealingBoost() {
        if (this.isHealingBoost) {
            this.healingBoostDuration--;
            if (this.healingBoostDuration <= 0) {
                this.removeHealingBoost()
            }
        }
    }

    cureHealingBoost(turns) {
        this.healingBoostDuration -= turns;
        if (this.healingBoostDuration <= 0) {
            this.removeHealingBoost()
        }
    }

    removeHealingBoost(){
        this.isHealingBoost = 0;
        this.healingBoostDuration = 0
        this.healingBoost = 0
    }

    setHealingReduction(red, duration) {
        if (this.isHealingReduction) {
            this.healingReduction += red;
            if (duration > this.healingReductionDuration) {
                this.healingReductionDuration = duration;
            }
        } else {
            this.isHealingReduction = true;
            this.healingReductionDuration = duration;
            this.healingReduction = red;
        }
        return this.name + "'s healing will be reducted by " + this.healingBoost + "% for the next " + this.healingBoostDuration + " turns"
    }

    hasHealingReduction() {
        return this.isHealingReduction;
    }

    doHealingReduction() {
        if (this.isHealingReduction) {
            this.healingReductionDuration--;
            if(this.healingReductionDuration <= 0) {
                this.removeHealingReduction()
            }
        }
    }

    cureHealingReduction(turns) {
        this.healingBoostReduction -= turns;
        if (this.healingReductionDuration <= 0) {
            this.removeHealingReduction()
        }
    }

    removeHealingReduction() {
        this.isHealingReduction = false;
        this.healingReduction = 0
        this.healingReductionDuration = 0;
    }

}


module.exports = { Enemy };
