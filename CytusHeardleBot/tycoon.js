function toCard(a) {
    /*
    switch (a) {
        case "ah":
            return "<:aceofhearts:emojiid>";
        case "2h":
            return "<:2ofhearts:emojiid>";
        //yeah idk this is probalby the best way to do this
        //u need to just add all the emotes to a server the bot is in cuz it can send emotes from different servers
    }*/ return a;
}

function compareCards(str1, str2) {
    // Define the custom order in an array
    const order = ['w', '2', 'a', 'k', 'q', 'j', 't', '9', '8', '7', '6', '5', '4', '3'];
    
    // Get the first character of each string
    const char1 = str1.charAt(0);
    const char2 = str2.charAt(0);

    // Find the index of the characters in the custom order
    const index1 = order.indexOf(char1);
    const index2 = order.indexOf(char2);

    // Compare based on the custom order
    if (index1 < index2)
        return true;
    return false;
}

//new slash command mentions 3 users
// slash tycoon i guess idk
let messagesender, user1, user2, user3; //use user ids
const players = [messagesender, user1, user2, user3];
//const players = [1,2,3,4];
let a1 = Math.floor(Math.random() * 4);
let player1 = players[a1];
players.splice(a1, 1);
a1 = Math.floor(Math.random() * 3);
let player2 = players[a1];
players.splice(a1, 1);
a1 = Math.floor(Math.random() * 2);
let player3 = players[a1];
players.splice(a1, 1);
let player4 = players[0];
const reorderedPlayers = {player1, player2, player3, player4};
//maybe make playing the game give capso coins lol
// turn order this is really jank but im too lazy to think of a better way

//im pretty sure that show hand has to be its own function for it to work and then hands and reorderedplayers have to be global
//also this means u cant play multiple games of tycoon at once sob
let tycoon = 4;
let rich = 4;
let poor = 4;
let beggar = 4;
for (let round = 1; round != maxround; round++) {
    message.channel.send(`Round ${round} start!`)
    let cdeck = tycoonDeck;
    hands = [[],[],[],[]];
    let i = Math.floor(Math.random() * 4);
    while (cdeck.length) {
        let rand = Math.floor(Math.random() * cdeck.length);
        hands[i % 4].push(cdeck[rand]);
        cdeck.splice(rand, 1);
        i++;
    } //hand out cards
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < hands[i].length; j++) {
            for (let k = j + 1; k < hands[i].length; k++) {
                if (compareCards(hands[i][j], hands[i][k])) {
                    temp = hands[i][j];
                    hands[i][j] = hands[i][k];
                    hands[i][k] = temp;
                }
            }
        }
    } // rearrange the cards in the right order
    let firstPlayer = Math.floor(Math.random() * 4);
    if (round > 1) {
        firstPlayer = beggar;
        message.channel.send("<@!" + players[tycoon] + ">, you are the tycoon. " + message.channel.guild.getUser(beggar) + " is the beggar. Pick 2 cards to give to them.");
        message.channel.send("<@!" + players[rich] + ">, you are the rich. " + message.channel.guild.getUser(poor) + " is the poor. Pick 1 card to give to them.");
        message.channel.send("<@!" + players[beggar] + ">, you are the beggar. " + message.channel.guild.getUser(tycoon) + " is the tycoon. You dont get to pick what to give but respond to this message with \"ok\" to acknowledge it.");
        message.channel.send("<@!" + players[poor] + ">, you are the poor. " + message.channel.guild.getUser(rich) + " is the rich. You dont get to pick what to give but respond to this message with \"ok\" to acknowledge it.");
        const collector = message.channel.createMessageCollector({ filter, time: 120000 });
        let collectedResponses = {};
        let responseCount = 0;
        collector.on('collect', (msg) => {
            if (msg.content == "ok" && !collectedResponses[msg.author.id]) {
                if (msg.author.id == reorderedPlayers[poor]) {
                    collectedResponses[msg.author.id] = hands[poor].length - 1;
                    responseCount++;
                } else if (msg.author.id == reorderedPlayers[beggar]) {
                    collectedResponses[msg.author.id] = [hands[beggar].length - 1, hands[beggar].length - 2];
                    responseCount++;
                }
            } else {
                const numbers = msg.content.split(' ').map(Number);
                if (msg.author.id == reorderedPlayers[rich]) {
                    if (!collectedResponses[msg.author.id]) {
                        if (numbers.length == 1 && numbers.every(num => num >= 1 && num <= hands[rich].length && Number.isInteger(num))) {
                            collectedResponses[msg.author.id] = numbers[0] - 1;
                            responseCount++;
                        } else {
                            message.channel.send(`<@!${msg.author.id}>, submit exactly 1 number between 1 and ${hands[rich].length}.`);
                        }
                    } else {
                        if (numbers.length) {
                            message.channel.send(`<@!${msg.author.id}>, you've already submitted.`);
                        }
                    }
                }
                if (msg.author.id == reorderedPlayers[tycoon]) {
                    if (!collectedResponses[msg.author.id]) {
                        if (numbers.length == 2 && numbers.every(num => num >= 1 && num <= hands[tycoon].length && Number.isInteger(num)) && numbers[0] != numbers[1]) {
                            collectedResponses[msg.author.id] = [numbers[0] - 1, numbers[1] - 1];
                            responseCount++;
                        } else {
                            message.channel.send(`<@!${msg.author.id}>, submit exactly 2 different numbers between 1 and ${hands[tycoon].length}.`);
                        }
                    } else {
                        if (numbers.length) {
                            message.channel.send(`<@!${msg.author.id}>, you've already submitted.`);
                        }
                    }
                }
            }
            if (responseCount == 4) {
                collector.stop();
            }
        });
        if (responseCount != 4) {
            message.channel.send("ok i didnt get 4 responses so im deleting the game");
            break;
        } else {
            let r1 = collectedResponses[reorderedPlayers[rich]];
            let p1 = collectedResponses[reorderedPlayers[poor]];
            let b1 = collectedResponses[reorderedPlayers[beggar]][0];
            let b2 = collectedResponses[reorderedPlayers[beggar]][1];
            let t1 = collectedResponses[reorderedPlayers[tycoon]][0];
            let t2 = collectedResponses[reorderedPlayers[tycoon]][1];
            if (t1 < t2) {
                let temp = t1;
                t1 = t2;
                t2 = temp;
            }
            let r1c = hands[rich][r1];
            let p1c = hands[poor][p1];
            let b1c = hands[beggar][b1];
            let b2c = hands[beggar][b2];
            let t1c = hands[tycoon][t1];
            let t2c = hands[tycoon][t2];
            hands[rich].splice(r1, 1);
            hands[poor].splice(p1, 1);
            hands[beggar].splice(b2, 2);
            hands[tycoon].splice(t1, 1);
            hands[tycoon].splice(t2, 1);
            hands[rich].push(p1c);
            hands[poor].push(r1c);
            hands[beggar].push(t1c);
            hands[beggar].push(t2c);
            hands[tycoon].push(b1c);
            hands[tycoon].push(b2c);
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < hands[i].length; j++) {
                    for (let k = j + 1; k < hands[i].length; k++) {
                        if (compareCards(hands[i][j], hands[i][k])) {
                            temp = hands[i][j];
                            hands[i][j] = hands[i][k];
                            hands[i][k] = temp;
                        }
                    }
                }
            } // rearrange the cards in the right order
        } // give out the cards
    }
    let revolution = 0;
    let unfinished = true;
    let curPlayer = firstPlayer;
    let lastTycoon = tycoon;
    let rich = 4;
    let tycoon = 4;
    let beggar = 4;
    let poor = 4;
    while (unfinished) {
        while (curPlayer == rich || curPlayer == poor || curPlayer == tycoon || curPlayer == beggar) {
            curPlayer = (curPlayer + 1) % 4;
        }
        message.channel.send(`<@!${reorderedPlayers[curPlayer]}>, you are starting. Pick a play by sending 1-4 numbers in 1 message seperated by spaces.`);
        let play = [];
        let passCount = 0;
        let playersLeft = 4;
        collector.on('collect', (msg) => {
            if (msg.author.id == reorderedPlayers[curPlayer]) {
                const numbers = msg.content.split(' ').map(Number);
                let eightstop = false;
                if (numbers.length >= 1 && numbers.length <= 4 && numbers.every(num => num >= 1 && num <= hands[curPlayer].length && Number.isInteger(num))) {
                    let checker = {};
                    let c = 0;
                    let card = 0;
                    let skip = false;
                    for (let i = 0; i < numbers.length; i++) {
                        if (!checker[numbers[i]]) {
                            c++;
                        }
                        checker[numbers[i]] = true;
                    }
                    if (c != numbers.length) {
                        message.channel.send(`<@!${reorderedPlayers[curPlayer]}>, dont select the same card twice.`);
                    } else {
                        for (let i = 0; i < numbers.length; i++) {
                            if (!card && hands[curPlayer][numbers[i] - 1].charAt(0) != 'w') {
                                card = hands[curPlayer][numbers[i] - 1].charAt(0);
                                if (card == 8) {
                                    eightstop = true;
                                }
                            }
                            if (hands[curPlayer][numbers[i] - 1].charAt(0) != 'w' && hands[curPlayer][numbers[i] - 1].charAt(0) != card) {
                                message.channel.send(`<@!${reorderedPlayers[curPlayer]}>, please select the same value card (or joker) for all cards.`);
                                skip = true;
                                eightstop = false;
                                break;
                            }
                        }
                    }
                    if (!skip) {
                        numbers.sort((a, b) => b - a);
                        play = [];
                        for (let i = 0; i < numbers.length; i++) {
                            play.push(hands[curPlayer][numbers[i] - 1]);
                            hands[curPlayer].splice(numbers[i] - 1, 1);
                        }
                        let str = "";
                        if (numbers.length == 4) {
                            revolution++;
                            str = "Revolution!";
                            for (let i = 1; i < revolution; i++) {
                                str = "Counter-" + str;
                                str = str + "!";
                            }
                        }
                        const member = await message.guild.members.fetch(msg.author.id);
                        const nickname = member.nickname || member.user.username;
                        let playMsg = `${nickname} played `;
                        for (let i = 0; i < play.length; i++) {
                            playMsg = playMsg + toCard(play[i]);
                        }
                        message.channel.send(playMsg);
                        if (str)
                            message.channel.send(str);
                        if (eightstop) {
                            message.channel.send("An 8-stop!");
                            passCount = 4;
                        }
                        message.channel.send(`${nickname} has ${hands[curPlayer].length} cards left!`);
                        curPlayer = (curPlayer + 1) % 4;
                        collector.stop();
                    }
                }
            }
        });
        if (play.length == 0) {
            message.channel.send("ok i didnt get a response so im deleting the game");
            break;
        }
        while (passCount < playersLeft - 1) {
            let eightstop = false;
            let played = false;
            collector.on('collect', (msg) => {
                if (msg.author.id == reorderedPlayers[curPlayer]) {
                    if (msg == "pass") {
                        passCount++;
                        const member = await message.guild.members.fetch(msg.author.id);
                        const nickname = member.nickname || member.user.username;
                        message.channel.send(`${nickname} passed.`)
                        collector.stop();
                    } else {
                        const numbers = msg.content.split(' ').map(Number);
                        if (numbers.length == play.length && numbers.every(num => num >= 1 && num <= hands[curPlayer].length && Number.isInteger(num))) {
                            let checker = {};
                            let c = 0;
                            let card = 0;
                            let skip = false;
                            let threeofspadesbeatsjoker = false;
                            for (let i = 0; i < numbers.length; i++) {
                                if (!checker[numbers[i]]) {
                                    c++;
                                }
                                checker[numbers[i]] = true;
                            }
                            if (c != numbers.length) {
                                message.channel.send(`<@!${reorderedPlayers[curPlayer]}>, dont select the same card twice.`);
                                skip = true;
                            } //checks if selected same card multiple times
                            else {
                                if (play.length == 1 && play[0].charAt(0) == 'w' && hands[curPlayer][numbers[i] - 1] == "3s") {
                                    threeofspadesbeatsjoker = true;
                                } else {
                                    for (let i = 0; i < numbers.length; i++) {
                                        if (!card && hands[curPlayer][numbers[i] - 1].charAt(0) != 'w') {
                                            card = hands[curPlayer][numbers[i] - 1].charAt(0);
                                            if (card == 8) {
                                                eightstop = true;
                                            }
                                            if (revolution % 2 == 0) {
                                                if (!compareCards(card.toString(), play[0])) {
                                                    message.channel.send(`<@!${reorderedPlayers[curPlayer]}>, select a higher card than the previous play. or pass`);
                                                    skip = true;
                                                    eightstop = false;
                                                    break;
                                                }
                                            } else {
                                                if (!compareCards(play[0]), card.toString()) {
                                                    message.channel.send(`<@!${reorderedPlayers[curPlayer]}>, select a lower card than the previous play. or pass`);
                                                    skip = true;
                                                    eightstop = false;
                                                    break;
                                                }
                                            } //checks if the play is higher than the previous play
                                        }
                                        if (hands[curPlayer][numbers[i] - 1].charAt(0) != 'w' && hands[curPlayer][numbers[i] - 1].charAt(0) != card) {
                                            message.channel.send(`<@!${reorderedPlayers[curPlayer]}>, please select the same value card (or joker) for all cards.`);
                                            skip = true;
                                            eightstop = false;
                                            break;
                                        } //checks if the play is the same as the previous play
                                        if (card == 0) {
                                            if (play[0].charAt(0) == 'w') {
                                                message.channel.send(`<@!${reorderedPlayers[curPlayer]}>, select a higher card than the previous play. or pass`);
                                                skip = true;
                                                eightstop = false;
                                                break;
                                            }
                                        }//cant play joker on a joker, else always legal
                                    } //card = the thing that was played
                                }
                            }
                            if (!skip) {
                                let str = "";
                                if (threeofspadesbeatsjoker) {
                                    message.channel.send("3 of Spades Reversal: 3 of Spades beats Joker")
                                    passCount = 4;
                                } else {
                                    numbers.sort((a, b) => b - a);
                                    play = [];
                                    for (let i = 0; i < numbers.length; i++) {
                                        play.push(hands[curPlayer][numbers[i] - 1]);
                                        hands[curPlayer].splice(numbers[i] - 1, 1);
                                    }
                                    if (numbers.length == 4) {
                                        revolution++;
                                        str = "Revolution!";
                                        for (let i = 1; i < revolution; i++) {
                                            str = "Counter-" + str;
                                            str = str + "!";
                                        }
                                    }
                                }
                                const member = await message.guild.members.fetch(msg.author.id);
                                const nickname = member.nickname || member.user.username;
                                let playMsg = `${nickname} played `;
                                for (let i = 0; i < play.length; i++) {
                                    playMsg = playMsg + toCard(play[i]);
                                }
                                message.channel.send(playMsg);
                                if (str.length)
                                    message.channel.send(str);
                                if (eightstop) {
                                    message.channel.send("An 8-stop!");
                                    passCount = 4;
                                }
                                if (hands[curPlayer].length > 1) {
                                    message.channel.send(`${nickname} has ${hands[curPlayer].length} cards left!`);
                                } else if (hands[curPlayer.length] == 1) {
                                    message.channel.send(`**${nickname} has 1 card left!**`);
                                } else {
                                    if (tycoon == 4) {
                                        tycoon = curPlayer;
                                        message.channel.send(`${nickname} is the Tycoon!`);
                                        playersLeft--;
                                        if (curPlayer != lastTycoon) {
                                            beggar = lastTycoon;
                                            const member2 = await message.guild.members.fetch(reorderedPlayers[lastTycoon]);
                                            const nickname2 = member2.nickname || member2.user.username;
                                            message.channel.send(`${nickname2} has fallen from the Tycoon to the Beggar!`);
                                            playersLeft--;
                                        }
                                    } else if (rich == 4) {
                                        rich = curPlayer;
                                        message.channel.send(`${nickname} is Rich!`);
                                        playersLeft--;
                                        if (beggar != 4) {
                                            poor = 6 - tycoon - rich - beggar;
                                            const member2 = await message.guild.members.fetch(reorderedPlayers[poor]);
                                            const nickname2 = member2.nickname || member2.user.username;
                                            message.channel.send(`${nickname2} is Poor!`);
                                            unfinished = false;
                                            pass = 5;
                                        } // if beggar is 4 then game ends, otherwise continues
                                    } else if (poor == 4) {
                                        rich = curPlayer;
                                        message.channel.send(`${nickname} is Poor!`);
                                        beggar = 6 - tycoon - rich - poor;
                                        const member2 = await message.guild.members.fetch(reorderedPlayers[beggar]);
                                        const nickname2 = member2.nickname || member2.user.username;
                                        message.channel.send(`${nickname2} is the Beggar!`);
                                        unfinished = false;
                                        pass = 5;
                                    } // beggar should always be resolved either here or game already ended
                                }
                                played = true;
                                collector.stop();
                            }
                        }
                    }
                }
            }); // should check for a legal message/play
            if (!played) {
                passCount++;
                const member = await message.guild.members.fetch(msg.author.id);
                const nickname = member.nickname || member.user.username;
                message.channel.send(`${nickname} didnt respond, so they passed.`)
                collector.stop();
            } //if not played then assume pass
            curPlayer = (curPlayer + 1) % 4;
        }
        if (passCount == 4) {
            curPlayer--;
        } else if (passCount == 3) {
            message.channel.send("All players passed.");
        }
        curPlayer = curPlayer % 4;
    }
    if (tycoon != 4) {
        message.channel.send(`Results: <@!${reorderedPlayers[tycoon]}> is the Tycoon. <@!${reorderedPlayers[rich]}> is the Rich. <@!${reorderedPlayers[poor]}> is the Poor. <@!${reorderedPlayers[beggar]}> is the Beggar. `);
        scores[tycoon] += 15;
        scores[rich] += 10;
        scores[poor] += 5;
        const scoresEmbed = {
            color: 0x0099ff,
            title: 'Some title',
            fields: [
                {
                    name: `<@!${reorderedPlayers[0]}>`,
                    value: `${scores[0]}`,
                    inline: false,
                },
                {
                    name: `<@!${reorderedPlayers[1]}>`,
                    value: `${scores[1]}`,
                    inline: false,
                },
                {
                    name: `<@!${reorderedPlayers[2]}>`,
                    value: `${scores[2]}`,
                    inline: false,
                },
                {
                    name: `<@!${reorderedPlayers[3]}>`,
                    value: `${scores[3]}`,
                    inline: false,
                },
            ],
        };
        message.channel.send({embeds: [scoresEmbed]});
    }
    let cont = false;
    message.channel.send("Play again?").then((msg) => {
        msg.react('👍');
        msg.react('👎');

        // set up a filter to only collect reactions with the ❤ emoji
        let filter = (reaction, user) => (reaction.emoji.name == '👍' || reaction.emoji.name == '👎');
        let collector = msg.createReactionCollector(filter);

        collector.on('collect', (reaction, user) => {
            if (reaction.emoji.name == '👍') {
            cont = true;
            collector.stop();
            } else {
            cont = false;
            collector.stop();
            }
        });
    }); // wait for either react
    if (!cont) {
        message.channel.send("Game over.");
        //you can add capso coins or something here
        scores = [0,0,0,0];
        break;
    }
}

new SlashCommandBuilder() 
    .setName("viewHand")
    .setDescription("Shows you your hand in tycoon")
    
client.on('interactionCreate', interaction => {
    if (interaction.commandName == "viewHand") {
        let str = "";
        let pn = 4;
        if (reorderedPlayers[0] == interaction.user.id) {
            pn = 0;
        } else if (reorderedPlayers[1] == interaction.user.id) {
            pn = 1;
        } else if (reorderedPlayers[2] == interaction.user.id) {
            pn = 2;
        } else if (reorderedPlayers[3] == interaction.user.id) {
            pn = 3;
        } else {
            interaction.reply({content: "You aren't in the game.", ephemeral: true});
            return;
        }
        for (let i = 0; i < hands[pn].length; i++) {
            str = str + `${(i + 1)}:  + ${toCard(hands[pn][i])}, `;
        }
        interaction.reply({content: str, ephemeral: true});
    }
});