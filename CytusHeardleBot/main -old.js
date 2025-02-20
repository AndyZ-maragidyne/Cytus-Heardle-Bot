const { Card } = require( './Dungeon/Card.js')
const { Character } = require('./Dungeon/Character.js')
const { Enemy } = require('./Dungeon/Enemy.js')
const { Attack } = require('./Dungeon/Attack.js')
const { Ailment } = require('./Dungeon/Ailment.js')
const { CytusSong } = require('./Dungeon/CytusSong.js')
const { Account } = require('./Dungeon/Account.js')
const { Shop } = require('./Dungeon/Shop.js')
const { ShopItem } = require('./Dungeon/ShopItem.js')
const { Dungeon } = require('./Dungeon/Dungeon.js')
const { DungeonRoom } = require('./Dungeon/DungeonRoom.js')
require('dotenv').config();

const { Client, Intents, Attachment, MessageCollector, Interaction, MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton, Modal, TextInputComponent, showModal } = require('discord.js');
const { generateDependencyReport } = require('@discordjs/voice');
// Importing @discordjs/voice for voice functionality
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const readline = require('readline');


const client = new Client({ 
    intents: [
        Intents.FLAGS.GUILDS,           // equivalent to GatewayIntentBits.Guilds
        Intents.FLAGS.GUILD_VOICE_STATES, // equivalent to GatewayIntentBits.GuildVoiceStates
        Intents.FLAGS.GUILD_MESSAGES,   // equivalent to GatewayIntentBits.GuildMessages
        Intents.FLAGS.MESSAGE_CONTENT,  // equivalent to GatewayIntentBits.MessageContent (introduced in v13)
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS // equivalent to GuildMessageReactions
    ]
});

const path = require('path');
const schedule = require('node-schedule');
const fs = require('fs');
const fsp = require('fs').promises;
const { throws } = require('assert');
const { executionAsyncResource } = require('async_hooks');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const ffprobePath = require('@ffprobe-installer/ffprobe').path;
ffmpeg.setFfprobePath(ffprobePath);
const { REST } = require('@discordjs/rest');
const axios = require('axios');
const { Routes } = require('discord-api-types/v9');

//const rest = new REST({ version: '10' }).setToken('OTY1OTI1ODY4NDM2MzUzMDY0.Yl6SkQ.8wjPQB1ZVnxNHD-7IYER13lmRno');
const GUILD_ID = 412950444089016320
const CLIENT_ID = 965925868436353064


//ffmpeg.setFfmpegPath("C://Users/Minec/Desktop/ffmpeg/ffmpeg/bin/ffmpeg.exe");
const songcorrection = ["hi","alternapt1","sound", "carefreecloudy", "revelation", "paradigm", "binary", "familylove", "stillpianoversion", "dawnreimei", "bastet", "legacy2", "breathofthecity", "newworld2", "luckyorb", "magicalmusic", "moonwestriver", "luckyorb3r2remix", "ultimatefeat", "threelights", "yokairecord", "goaheadkunoichi", "leafygreen", "decisivebattle", "drifting", "thewindsvoice", "onesipstwosips", "lira", "reincarnation"]
const fametiers = ["NONE","PAFF","Neko#ΦωΦ","ROBO_Head","Xenon","ConneR","Cherry","JOE","Aroma","Nora","Neko","Ivy","Miku","Crystal PuNK","Sagar","Rin","Vanessa","Kizuna AI","Bo Bo","Alice","Hans","Graff. J","Amiya","Kaff","Ilka"]
CytusHearldeBotTESTtoken = process.env.CYTUS_BOT_TEST_TOKEN;
CytusHeardleBottoken = process.env.CYTUS_BOT_TOKEN;
CytusHeardleChannelID = '958518859072172132' //this one
CytusHeardleWareHouseID = '965929751560736808'
CytusHeardleLiveTestID = '1039741662861205585'
CytusHeardleScoresChannelID = '958534665214521366'
GeneralChannelID = '584420631324524557'
Hehehebutinreallife = '945034814489239683'
Hehehe = '910327131857358909'
gemz = '955971112431419422'
tick = '950613255645171762'
MillionMaster = '640720107475042314'
projectDivaMiku = '1216851993784619079'
angryMiku = '1216532048840364182'
const dir = 'D:/CytusHeardleBot/songlist'
CytusHeardleBotTESTApplicationID = '1039555744757981204'
CytusHeardleBotApplicationID = '965925868436353064'
currentBotMode = 'test';
currentBotToken = '';
currentApplicationID = '';
if (currentBotMode == 'test') {
    currentBotToken = CytusHearldeBotTESTtoken
    currentApplicationID = CytusHeardleBotTESTApplicationID
    currentScoresChannel = CytusHeardleWareHouseID
} else {
    currentBotToken = CytusHeardleBottoken
    currentApplicationID = CytusHeardleBotApplicationID
    currentScoresChannel = CytusHeardleScoresChannelID
}

const tycoonDeck = ["ah","2h","3h","4h","5h", "6h", "7h", "8h", "9h", "th", "jh", "qh", "kh", "ac", "2c", "3c", "4c", "5c", "6c", "7c", "8c", "9c", "tc", "jc", "qc", "kc", "as", "2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s", "ts", "js", "qs", "ks", "ad", "2d", "3d", "4d", "5d", "6d", "7d", "8d", "9d", "td", "jd", "qd", "kd", "w1", "w2"];
let hands = [[],[],[],[]];
let scores = [0,0,0,0] //maybe make playing the game give capso coins lol
let reorderedPlayers;
let tycoonGameOngoing = false;

//not in use
class cytussong {
    constructor(inputname, realname){
        this.inputname = inputname;
        this.realname = realname;
    }

    getInputname(){
        return this.inputname
    }

    getRealname(){
        return this.realname
    }
}

class Player {
    constructor(id, capsocoins,lifetimecapsos, streak, highstreak, famepoints, ping){
        this.id = id
        this.capsocoins = parseInt(capsocoins)
        this.lifetimecapsos = parseInt(lifetimecapsos)
        this.streak = parseInt(streak)
        this.highstreak = parseInt(highstreak)
        this.famepoints = parseInt(famepoints)
        this.ping = parseInt(ping)
    }

    getId(){
        return this.id
    }

    getCapsocoins(){
        return this.capsocoins
    }

    getLifetimeCapsos(){
        return this.lifetimecapsos
    }

    getCurrStreak(){
        return this.streak
    }

    getHighStreak(){
        return this.highstreak
    }
    
    getFamePoints(){
        return this.famepoints
    }

    getPing(){
        return this.ping
    }

    modifyCoins(number){
        this.capsocoins = this.capsocoins + number
    }

    modifyLifetimeCapsos(number){
        this.lifetimecapsos = this.lifetimecapsos + number
    }

    modifyStreak(number){
        this.streak = this.streak + number
    }

    modifyFamePoints(number){
        this.famepoints = this.famepoints + number
    }

    resetStreak(){
        this.streak = 0
    }

    setHighstreak(number){
        this.highstreak = number
    }

    togglePing(){
        if (this.ping == 1){
            this.ping = 0;
        } else {
            this.ping = 1;
        }
    }

    toString(){
        return this.id+","+this.capsocoins+","+this.lifetimecapsos+","+this.streak+","+this.highstreak+","+this.famepoints+","+this.ping+","
    }
    
}

function toCard(a) {
    let thing;
    switch(a[0]) {
        case 'w':
            return 'Joker';
        case 't':
            thing = '10'
            break;
        case 'j':
        case 'q':
        case 'k':
        case 'a':
            thing = a[0].toUpperCase();
            break;
        default:
            thing = a[0];
            break;
    }
    switch (a[1]) {
        case "h":
            return thing + "♡"
        case "d":
            return thing + "◇"
        case "s":
            return thing + "♤"
        case "c":
            return thing + "♧"
    } 
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

var songname
var isDuplicate
var heardlenumber
function getRandomLine(filename){
    return new Promise((resolve, reject) => {
    fs.readFile(filename, "utf-8", function(err, data){
      if(err) {
          throw err;
      }
  
      // note: this assumes `data` is a string - you may need
      //       to coerce it - see the comments for an approach
      var lines = data.split('\n');
      
      //while(ready == 0){
      // choose one of the lines...
      var line = lines[Math.floor(Math.random()*lines.length)]


      //line = line.substring(0,line.length-1)

      line = line.split('=')
      //console.log(line)
      songname = line[0]
      realname = line[1]
      character = line[2]
      difficulty = line[3]
      difficulty = difficulty.substring(0,realname.length-1)
      console.log(songname)
      console.log(realname)
      console.log("The random song chosen was " + songname + " and " + realname)
      resolve()
   })
})
  }

async function newsongprocess(song, cooldown){
    isDuplicate = "yes"
    await getRandomLine(song);
    console.log(cooldown)
    await checkforduplicates(song, cooldown)
  
  //sleep(3000).then(() => {cooldownprocess()})
}


function checkforduplicates(songfile, cooldownfile){
    return new Promise((resolve, reject) => {
    fs.readFile(cooldownfile, "utf-8", async function(err, data){
        if(err) {
            throw err;
        }
        
        var cooldownsongs = data.split('\n'); 
        //console.log(cooldownsongs)
        //for(i=0; i<cooldownsongs.length; i++){
           // cooldownsongs[i]
        //}
        
        console.log("the song needed to be looked for dupes is called " + songname)

        if(data.includes(songname)){
            random = Math.random()*10
            if (random <= 1){
                console.log("duplicate has been overwritten")
                isDuplicate = "no"
                resolve()
            }else{
                console.log("there is a duplicate")
                isDuplicate = "yes"
                await getRandomLine(songfile)
                await checkforduplicates(songfile, cooldownfile)
                resolve()
            }
               }else{
                console.log("Did not find any duplicates")
                isDuplicate = "no"
                resolve()
        }
        

        
    })
})
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function delay(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

async function cooldownprocess(){
    fs.readFile("songcooldown.txt", "utf-8", function(err, data){
        if(err) {
            throw err;
        }
        
        var cooldownsongs = data.split('\n'); 
        if(data.includes(songname)){
            
        }else{
        cooldownadd("songcooldown.txt", songname)
        sleep(1000).then(() => { cooldowndelete("songcooldown.txt")})
        }
    })
  
  
    //console.log("cooldown function ran")
}


function cooldowndelete(filename){
    fs.readFile(filename, 'utf8', function(err, data){
        if (err)
        {
            console.log("Error when opening file to delete a song")
        }
        // data is the file contents as a single unified string
        // .split('\n') splits it at each new-line character and all splits are aggregated into an array (i.e. turns it into an array of lines)
        // .slice(1) returns a view into that array starting at the second entry from the front (i.e. the first element, but slice is zero-indexed so the "first" is really the "second")
        // .join() takes that array and re-concatenates it into a string
        var index = data.split('\n')

        var linesExceptFirst = data.split('\n').slice(1).join('\n');
        fs.writeFile(filename, linesExceptFirst, function(err, data) { if (err) {console.log("Error when deleting a song from cooldown")} });
        
    });
        console.log("song deleted from cooldown")
}

function cooldownadd(filename, songname){



    console.log("The song about to be added is called: " + songname)
    fs.appendFile(filename,"\n" + songname, function (err) {
        if (err) {
          console.log("Adding song to cooldown failed")
        } else {
          console.log("Added "+ songname + " to cooldown")
        }
      })

}


/**
 * Processes a video
 * @param {String} inputfolder input folder
 * @param {String} input input directory
 * @param {String} output output directory
 * @param {Boolean} reverse if the video needs to be reversed
 * @param {*} starttime start time of the video
 * @param {*} duration duration of the video
 */
async function processvideo(input, output, reverse, starttime, duration){
    try {
    return new Promise(async (resolve, reject) => {
    ffmpeg({source: input}) 
    .setStartTime(starttime)
    .duration(duration) 
    .on('start',function(commandLine){
        console.log("Processing has started. Hopefully it works :-)")
        //message.channel.send("Processing has started")
    })
    .on('error',function(err){
        console.log("ok what the crap: ", + err)
        reject(err)
    })
    .saveToFile(output)
    .on('end', async function () {
        if (reverse){
            await reversevideo();
            await renamereverse();
            resolve()
        } else {
            console.log("Processing done.");
            resolve();
        }
    })
    /*
    if(reverse){
        try{
    reversevideo();
    renamereverse();
    resolve()
    } catch (err){
        console.log(err)
    }
    
}
*/

});
} catch (reverseErr) {
    console.error('Error during reversing: ' + reverseErr);
    reject(reverseErr);
}

function reversevideo(){
    return new Promise((resolve, reject) => {
    ffmpeg({ source: "./" + output })
    .setStartTime(0)
    .outputOptions('-af', 'areverse')
    .on('start', function (commandLine) {
        console.log("Reversing has started. Hopefully it works :-)");
    })
    .on('error', function (err) {
        console.log("Error during reversing: " + err);
        reject(err);
    })
    .saveToFile("rtemp.mp4")
    .on('end', async function () {
        console.log("File reversed")
        resolve()
    });
})
}

function renamereverse(){
    return new Promise((resolve, reject) => {
    fs.rename("./rtemp.mp4", output, function(err){console.log(err);reject()});
    console.log('File renamed successfully');
    resolve()
    })
}
}

async function processFragmentedVideo(input, output, reverse, duration, iterations) {
    try {
        return new Promise(async (resolve, reject) => {
            duration = duration/iterations;
            //for loop where you create each video and have an increasing number for the name.
            for (i = 1; i <= iterations; i++) {
                start = await getScrambled(input);
                await processvideo(input, "./a" + i + ".mp4", reverse, start, duration);
            }
            if (iterations > 1) {
                await combinevideo("./a1.mp4", "./a2.mp4", "aa3.mp4")
                for (i = 3; i <= iterations; i++) {
                    await combinevideo("aa" + i + ".mp4", "a" + i + ".mp4", "aa" + (i+1) + ".mp4")
                }
                fs.rename("aa" + (iterations + 1) + ".mp4", output, (err) => {
                    if (err) {
                      console.error('Error renaming file:', err);
                      return;
                    }
                    console.log('File renamed successfully');
                  });
            } else {
                fs.rename("a1.mp4", output, (err) => {
                    if (err) {
                      console.error('Error renaming file:', err);
                      return;
                    }
                    console.log('File renamed successfully');
                  });
            }
            //then you combine them together as you go though the for loop again
            //then you go down the for loop and unlink the uncessesary videos
            
            resolve();
        })
    } catch (reverseErr) {
        console.error('Error during reversing: ' + reverseErr);
        reject(reverseErr);
    } finally {
        // for (i = 1; i <= iterations; i++) {
        //     fs.unlink("./a" + i + ".mp4", (err) => {
        //         if (err) {
        //         console.error('Error deleting file:', err);
        //         return;
        //         }
        //         console.log('File deleted successfully');
        //     });
        //     fs.unlink("./aa" + i + ".mp4", (err) => {
        //         if (err) {
        //         console.error('Error deleting file:', err);
        //         return;
        //         }
        //         console.log('File deleted successfully');
        //     });
        // }
    }
}

function deleteFile(input) {
    fs.unlink(input, (err) => {
        if (err) {
        console.log(err);
        } else {
        
        }
    });
}

function combinevideo(path1,path2,outputPath){
    return new Promise((resolve, reject) => {
    var fluent_ffmpeg = require("fluent-ffmpeg");

    var mergedVideo = fluent_ffmpeg();
    var videoNames = [path1, path2];
    
    videoNames.forEach(function(videoName){
        mergedVideo = mergedVideo.addInput(videoName);
    });
    
    mergedVideo.mergeToFile(outputPath, "./1t.mp4")
    .on('error', function(err) {
        console.log('Error ' + err.message);
    })
    .on('end', function() {
        console.log('Finished!');
        resolve()
    });
    
})
}

function getScrambled(input){
    return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(input, function(err, metadata) {
        if (err) {
            reject(err);
        } else {
        //console.dir(metadata); // all metadata
        duration = metadata.format.duration
        duration -= 16
        starttime = Math.random()*duration
        resolve(starttime);
        }
        });
    })
}

function getheardlenumber(){
    return new Promise((resolve, reject) => {
    fs.readFile("heardlenumber.txt", "utf-8", function(err, data){
        if(err) {
            throw err;
        }
        number = data.split('\n')
        heardlenumber = number
        resolve()
     })
    })
}

function increasenumber(){
    fs.readFile("heardlenumber.txt", "utf-8", function(err, data){
        if(err) {
            throw err;
        }
        number = data.split('\n')
        number = Number(number)
        number = number + 1
        number = String(number)
        fs.writeFile("heardlenumber.txt", number, function(err, data) { if (err) {console.log("Error when writing the number")} });

     })
}

function loadprofiles(){
    fs.readFile("profiles.txt", "utf-8", function(err, data){
        if(err) {
            throw err;
        }

        playerlist = new Array
        var lines = data.split('\n');
        //console.log(lines)
        for(i=0;i<lines.length;i++){
            line = lines[i]
            //console.log(lines)
            linesplit = line.split(',')
            newPlayer = new Player(linesplit[0], linesplit[1], linesplit[2], linesplit[3], linesplit[4], linesplit[5], linesplit[6])
            if (newPlayer.getId() != '') {
                playerlist.push(newPlayer)
            }

        }
        //The important one:
        console.log(playerlist)
        console.log('profiles have been loaded!')
        
    })
}

async function saveprofiles(){
        //takes the active user, copies their stats back into the txt file
        //userlist = user.getId()+","+user.getCapsocoins()+","+user.getLifetimeCapsos()+","+user.getCurrStreak()+","+user.getHighStreak()+","+user.getFamePoints()+","+user.getPing()+","
        //console.log(userlist)
        filelines = "";
        for (i = 0; i < playerlist.length; i++){
            if (playerlist[i].getCapsocoins() != NaN) {
                filelines += playerlist[i].toString();
                filelines += "\n";
            }
        }
        // for (i = 0; i < playerlist.length; i++){
        //     if (playerlist[i][0] == user.getId()){
        //         playerlist[i][1] = user.getCapsocoins();
        //         playerlist[i][2] = user.getLifetimeCapsos();
        //         playerlist[i][3] = user.getCurrStreak();
        //         playerlist[i][4] = user.getHighStreak();
        //         playerlist[i][5] = user.getFamePoints();
        //         playerlist[i][6] = user.getPing();
        //     }
        // }
        // console.log("New playerlist:")
        // console.log(playerlist)

        // filelines = "";
        // for (i = 0; i < playerlist.length; i++){
        //     filelines += playerlist[i][0]
        //     for (j = 1; j < playerlist[i].length; j++){
        //         filelines = filelines + "," + playerlist[i][j]
        //     }
        //     filelines = filelines + "\n"
        // }
        await fsp.writeFile("profilestemp.txt", filelines, function(err, data) { if (err) {console.log("Error when deleting running Save Profiles")} });
        await fsp.rename("profilestemp.txt", "profiles.txt",(err) => {
            if (err) {
                console.error("Error renaming the file:", err);
                return;
            }
        })
        //console.log(filelines)
}

function findprofile(id){
    //looks at all the profiles
    //finds the correct profile with your id
    //console.log(playerlist)
    for(i=0; i<playerlist.length;i++){
        if(playerlist[i].getId() == id){
            return playerlist[i];
        }
    }

}

function update6Strings(userId, coins, word1, word2, word3, word4, word5, word6) {
    const words = [word1, word2, word3, word4, word5, word6];
    scrambledWords = [];
    


    const fileContents = fs.readFileSync('temp.txt', 'utf8');
    let userData = {}
    if (fileContents){
    userData = JSON.parse(fileContents);
    }
    //console.log(userData)
    if (userData[userId]) {
        alreadybought = 1
        if (coins < b62){
            return
        }
        scrambledWords = []
        hiddenStr = userData[userId]
        console.log(hiddenStr)
        console.log(hiddenStr[2])
        console.log(hiddenStr[2][1])
        for (let i = 0; i < hiddenStr.length; i++) {
            hiddenStrIndex = hiddenStr[i]
            const word = words[i]; //the original word
            
            
            const hiddenIndices = [];
                for (let j = 0; j < hiddenStrIndex.length; j++) {
                if (hiddenStrIndex[j] === "_") {
                    hiddenIndices.push(j);
                    }
                }
 
                // If there are no underscores left in the string, return the original string
                if (hiddenIndices.length === 0) {
                scrambledWords.push(word)
                }else{

            // Generate a random index to choose an underscore to reveal
            const randomIndex = Math.floor(Math.random() * hiddenIndices.length);
            const hiddenIndex = hiddenIndices[randomIndex];
            

            hiddenStrIndex = hiddenStrIndex.substring(0, hiddenIndex) + word.charAt(hiddenIndex) + hiddenStrIndex.substring(hiddenIndex + 1);
            scrambledWords.push(hiddenStrIndex)
            }
        }
      }else{

    alreadybought = 0
    if(coins < 10){
        return
    }
    // Loop through each word
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      scrambledWord = [];
  
      // Create a new string of underscores
      for (let j = 0; j < word.length; j++) {
        scrambledWord.push("_");
      }
  
      // Choose a random letter and replace the underscore at that index with the letter
      const randomIndex = Math.floor(Math.random() * word.length);
      scrambledWord[randomIndex] = word[randomIndex];

      //for first letter to always be first letter in all 6 songs
      //scrambledWord[0] = word[0];
  
      // Add the scrambled word to the list of scrambled words
      scrambledWords.push(scrambledWord.join(""));
    }
}
    // Write the user ID and scrambled words to the temp.txt file
    userData[userId] = scrambledWords
    fs.writeFileSync("temp.txt", JSON.stringify(userData));
  
    return scrambledWords;
  }

function update2Strings(userId, coins, word1, word2) {
    const words = [word1, word2];
    scrambledWords = [];
    
    const fileContents = fs.readFileSync('temp.txt', 'utf8');
    let userData = {};
    
    if (fileContents) {
        userData = JSON.parse(fileContents);
    }

    if (userData[userId]) {
        alreadybought = 1;
        
        if (coins < b62) {
            return;
        }
        
        scrambledWords = [];
        hiddenStr = userData[userId];
        for (let i = 0; i < hiddenStr.length; i++) {
            hiddenStrIndex = hiddenStr[i];
            const word = words[i]; // the original word
            
            const hiddenIndices = [];
            
            for (let j = 0; j < hiddenStrIndex.length; j++) {
                if (hiddenStrIndex[j] === "_") {
                    hiddenIndices.push(j);
                }
            }

            if (hiddenIndices.length === 0) {
                scrambledWords.push(word);
            } else {
                const randomIndex = Math.floor(Math.random() * hiddenIndices.length);
                const hiddenIndex = hiddenIndices[randomIndex];

                hiddenStrIndex = hiddenStrIndex.substring(0, hiddenIndex) + word.charAt(hiddenIndex) + hiddenStrIndex.substring(hiddenIndex + 1);
                scrambledWords.push(hiddenStrIndex);
            }
        }
    } else {
        alreadybought = 0;

        if (coins < 10) {
            return;
        }

        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            scrambledWord = [];

            for (let j = 0; j < word.length; j++) {
                scrambledWord.push("_");
            }

            const randomIndex = Math.floor(Math.random() * word.length);
            scrambledWord[randomIndex] = word[randomIndex];

            scrambledWords.push(scrambledWord.join(""));
        }
    }
    
    userData[userId] = scrambledWords;
    fs.writeFileSync("temp.txt", JSON.stringify(userData));
  
    return scrambledWords;
}

function updateString(userId, originalStr, coins) {
    const data = fs.readFileSync("temp.txt", "utf-8");
  
    let userStrings = {};
    if (data) {
      // If the file has content, parse the JSON data into an object
      userStrings = JSON.parse(data);
    }
  
    let hiddenStr = "";
    if (userStrings[userId]) {
      alreadybought = 1
      if (coins < 1){
          return
      }
      // If the user already has a string saved, retrieve it from the object
      hiddenStr = userStrings[userId];
  
       // Find all the indices of underscores in the string
       const hiddenIndices = [];
       for (let i = 0; i < hiddenStr.length; i++) {
         if (hiddenStr[i] === "_") {
           hiddenIndices.push(i);
         }
       }
   
       // If there are no underscores left in the string, return the original string
       if (hiddenIndices.length === 0) {
         return `\`${originalStr}\``;
       }
  
       // Generate a random index to choose an underscore to reveal
       const randomIndex = Math.floor(Math.random() * hiddenIndices.length);
       const hiddenIndex = hiddenIndices[randomIndex];
   
       // Replace the underscore with the corresponding letter from the original string
       hiddenStr = hiddenStr.substring(0, hiddenIndex) + originalStr.charAt(hiddenIndex) + hiddenStr.substring(hiddenIndex + 1);
    } else {
      // If the user does not have a string saved, create a new string with the same length as the original string
      alreadybought = 0
      if(coins < 5){
          return
      }
      hiddenStr = "_".repeat(originalStr.length);
  
      // Generate a random index to choose a letter to reveal
      const randomIndex = Math.floor(Math.random() * originalStr.length);
  
      // Replace the underscore at the random index with the corresponding letter from the original string
      hiddenStr = hiddenStr.substring(0, randomIndex) + originalStr.charAt(randomIndex) + hiddenStr.substring(randomIndex + 1);
  
      // Store the new string in the object
      
    }
  
    // Write the updated object back to the file
    userStrings[userId] = hiddenStr;
    fs.writeFileSync("temp.txt", JSON.stringify(userStrings));
  
    return `\`${hiddenStr}\``;
  }

//let songname = getRandomLine("songnames.txt")
//sleep(100).then(() => {processvideo()})

async function loadvalidanswers(){
    try{
        return new Promise((resolve, reject) => {
        fs.readFile('songnamestrue.txt', 'utf-8', (err, data) => {
            if (err) {
            console.error('Error reading file:', err);
            return;
            }
        
            // Split the data into lines
            const lines = data.split('\n');
        
            // Create an array to store the valid answers
            
        
            // Process each line and extract the desired portion
            lines.forEach((line) => {
            const index = line.indexOf('=');
            if (index !== -1) {
                const answer = line.substring(0, index).trim();
                validanswers.push(answer);
            }
            });
            
            resolve()
            // Print the valid answers
            //console.log(validanswers);
        });
        })
    } catch (error) {
        console.log(error)
    }
}

function calculatefame(number){
    let count = 0
    let subtractor = 50

    while (number >= subtractor){
        
        //console.log("Hi")
        //console.log(number)
        //console.log(subtractor)

        
        number -= subtractor
        count++
        if (count % 3 === 0 && count !== 0){
            subtractor += 25
        }
        
    }
    //console.log(number)
    //console.log(subtractor)

    if (count === 0){
        famenumber = ""
        famelevel = 0
    }else{
    if (count % 3 ==0){
        famelevel = count/3
        famenumber = " III"
    } else {
    famelevel = Math.floor(count/3) + 1
    }
    
    if (count % 3 === 1){
        famenumber = " I"
    } else if (count % 3 === 2){
        famenumber = " II"
    }
    }

    remaining = subtractor - number
    famerank = fametiers[famelevel]  + famenumber
    console.log([famerank, remaining, subtractor,famelevel])
    return ([famerank,remaining,subtractor,famelevel])
}

 /**
     * Songname, realname, character, difficulty
     * @param {*the name of the song} songname 
     * @param {*useless lol} num 
     */
 async function findsonginformation(songname, num){
    return new Promise(async (resolve, reject) => {
    songname = songname.replace(/\n/g, '').trim();
    // console.log("songname: " + songname +  "hiadsfdaf")
    // num = 1
    // for (i = 0; i < songname.length; i++) {
    //     console.log("(" + num + ") " +songname[i])
    //     num++
    // }
    
    index = await validanswers.indexOf(songname)
    console.log("index: " + index)
        if (index == -1 ) {
            resolve()
            return;
        }
        fs.readFile("songnamestrue.txt", "utf-8", function(err, data){
            if(err) {
                throw err;
            }
        
            var lines = data.split('\n');
            
            var line = lines[index]
            line = line.split('=')
            const songinformation = []
            // songname, realname, character, difficulty
            songinformation[0] = line[0]
            songinformation[1] = line[1]
            songinformation[2] = line[2]
            songinformation[3] = line[3]
            //difficulty = difficulty.substring(0,realname.length-1)
            resolve(songinformation);
        })
    
    })
}

function storeCytusHeardleInfo(){
    string = songname + "\n" 
    + songname1 + "\n"
    + songname2 + "\n"
    + songname3 + "\n"
    + songname4 + "\n"
    + songname5 + "\n"
    + songname6 + "\n"
    + isnormal + "\n"
    + isscrambled + "\n"
    + ishardmode + "\n"
    + ischromatic + "\n"
    + isspecial + "\n"
    + isreverse + "\n"
    + isduo + "\n"
    + isfragmented + "\n"
    + isquad + "\n"
    + newCytusHeardle + "\n"
    tempUsedCommands = Array.from(usedCommands);
    for (i = 0; i < tempUsedCommands.length; i++) {
        string += tempUsedCommands[i]
        if (i < tempUsedCommands.length - 1) {
            string += ","
        }
    }
    fs.writeFile("CurrentCytusHeardleInfo.txt", string, 'utf-8', (err) => {
        if (err) {
          console.error('Error writing to file:', err);
        } else {
          console.log('Cytus Heardle info stored successfully');
        }
      });
}

async function loadCytusHeardleInfo(){
        return new Promise((resolve, reject) => {
        fs.readFile("CurrentCytusHeardleInfo.txt", "utf-8", async function(err, last){
            if(err) {
                return;
            }
            
            var asdf = last.split('\n');
            console.log(asdf);
            songname = asdf[0]
            newanswer = asdf[0]
            songname1 = asdf[1]
            songname2 = asdf[2]
            songname3 = asdf[3]
            songname4 = asdf[4]
            songname5 = asdf[5]
            songname6 = asdf[6]
            isnormal  = (asdf[7].toLowerCase() === "true" )
            isscrambled = (asdf[8] === "true")
            ishardmode = (asdf[9] === "true")
            ischromatic = (asdf[10] === "true")
            isspecial = (asdf[11] === "true")
            isreverse = (asdf[12] === "true")
            isduo = (asdf[13] === "true")
            isfragmented= (asdf[14] === "true")
            isquad = (asdf[15] === "true")
            newCytusHeardle = (asdf[16] === "true")
            asdfg = asdf[17].split(",")
            for (i = 0; i < asdfg.length; i ++) {
                usedCommands.add(asdfg[i]);
            }
            try {
            if (ischromatic || isduo || isquad) {
                getsongname = await findsonginformation(songname1, 1)
                songname1 = getsongname[0]
                realname1 = getsongname[1]
                character1 = getsongname[2]
                difficulty1 = getsongname[3]

                getsongname = await findsonginformation(songname2, 2)
                songname2 = getsongname[0]
                realname2 = getsongname[1]
                character2 = getsongname[2]
                difficulty2 = getsongname[3]

                if(isquad || ischromatic){
                    getsongname = await findsonginformation(songname3, 3)
                    songname3 = getsongname[0]
                    realname3 = getsongname[1]
                    character3 = getsongname[2]
                    difficulty3 = getsongname[3]

                    getsongname = await findsonginformation(songname4, 4)
                    songname4 = getsongname[0]
                    realname4 = getsongname[1]
                    character4 = getsongname[2]
                    difficulty4 = getsongname[3]
                    
                    if(ischromatic) {
                        getsongname = await findsonginformation(songname5, 5)
                        songname5 = getsongname[0]
                        realname5 = getsongname[1]
                        character5 = getsongname[2]
                        difficulty5 = getsongname[3]

                        getsongname = await findsonginformation(songname6, 6)
                        songname6 = getsongname[0]
                        realname6 = getsongname[1]
                        character6 = getsongname[2]
                        difficulty6 = getsongname[3]
                    }
                }
            } else {
                getsongname = await findsonginformation(songname)
                
                console.log(getsongname)
                songname = getsongname[0]
                realname = getsongname[1]
                character = getsongname[2]
                difficulty = getsongname[3]
            }
            } catch (error) {
                console.log("Error when finding songinformation")
                console.log(error)
            }

            resolve();
        })
        
    })
    
}

async function saveAccount(account) {
    
    return new Promise(async(resolve, reject) => {
        try{
            const jsonString = JSON.stringify(account.toJSON());
            filePath = "./saves/" + account.getId() + ".json" 
            tempFilePath =  "./saves/" + account.getId() + "temp.json"
            await fsp.writeFile(tempFilePath, jsonString, 'utf8')
            await fsp.rename(tempFilePath, filePath)
            console.log("SAVEFD ACCOUNT")
            saveprofiles()
            resolve()
        } catch (err) {
            console.log("There was an error in SaveAccount", err)
            resolve()
        }
    })
}

async function loadAccount(filePath) {
    return new Promise(async(resolve, reject) => {
        try {
            const jsonString = await fsp.readFile(filePath, 'utf8');
            const jsonObject = JSON.parse(jsonString);
            resolve(Account.fromJSON(jsonObject));
        } catch (err) {
            console.error('Error reading or parsing the file:', err);
            reject(err);
        }
    })
}

async function saveDungeon(dungeon) {
    return new Promise(async (resolve, reject) => {
        try{
            const jsonString = JSON.stringify(dungeon.toJSON());
            filePath = "./saves/dungeon.json"
            tempFilePath = "./saves/dungeontemp.json"
            await fsp.writeFile(tempFilePath, jsonString, 'utf8')
            await fsp.rename(tempFilePath, filePath)
            console.log("SAVEFD duhngeon")
            resolve()
        } catch (err) {
            console.log("There was an error in SaveDungeon", err)
            resolve()
        }

    })
}

async function loadDungeon() {
    return new Promise(async(resolve, reject) => {
        try {
            const jsonString = await fsp.readFile("./saves/dungeon.json", 'utf8');
            const jsonObject = JSON.parse(jsonString);
            resolve(Dungeon.fromJSON(jsonObject));
        } catch (err) {
            console.error('Error reading or parsing the file:', err);
            reject(err);
        }
    })
}

async function saveShop(shop) {
    return new Promise(async (resolve, reject) => {
        try{
            const jsonString = JSON.stringify(shop.toJSON());
            filePath = "./saves/shop.json"
            tempFilePath = "./saves/shoptemp.json"
            await fsp.writeFile(tempFilePath, jsonString, 'utf8')
            await fsp.rename(tempFilePath, filePath)
            console.log("SAVEFD shop")
            resolve()
        } catch (err) {
            console.log("There was an error in SaveShop", err)
            resolve()
        }

    })
}

async function loadShop() {
    return new Promise(async(resolve, reject) => {
        try {
            const jsonString = await fsp.readFile("./saves/shop.json", 'utf8');
            const jsonObject = JSON.parse(jsonString);
            resolve(Shop.fromJSON(jsonObject));
        } catch (err) {
            console.error('Error reading or parsing the file:', err);
            reject(err);
        }
    })
}

/**
 * reads a guess and returns 1 if it is right, 0 if it is wrong and -1 if the answer doesn't exist
 * 
 * @param {*} guess 
 * @param {*} answer 
 */
async function processGuess(guess, answers){
    return new Promise(async(resolve, reject) => {
        console.log("guess: " + guess);
        console.log("answers" + answers)
        trimmedguess = ""
        guess = guess.toLowerCase()
        for (i=0; i < guess.length; i++) {
            if (guess[i] == " "||guess[i] == "\'" || guess[i] == "."|| guess[i] == "-" || guess[i] == "~" || guess[i] == ',' || guess[i] === "'" || guess[i] == "?" || guess[i] == "!"){
                trimmedguess = trimmedguess;
            }else{
                trimmedguess = trimmedguess + guess[i];
            }
        }

        console.log("trimmedguess:" + trimmedguess)

        for(i = 0; i < answers.length; i++) {
            if (trimmedguess == answers[i]){
                resolve(1);
            } else if (trimmedguess == "legacy" && answers[i] == "legacy2") {
                resolve(1);
            } else if (trimmedguess == "newworld" && answers[i] == "newworld2") {
                resolve(1);
            }
        }
        if(validanswers.includes(trimmedguess)){
            resolve(0);
        }else{
            resolve(-1);
        }
    })
}

loadprofiles()




const prefix = '-';
const debugprefix = '+';
const otherprefix = ';'

client.once('ready', () => {
    registerSlashCommands();
    console.log("Cytus Heardle Bot is online!");
    client.user.setActivity('Cytus Heardle', {type: "PLAYING"})
    //code to ping people at 9pm to do the cytus heardle
    //minute, hour, day of the month, month, day of the week
    schedule.scheduleJob('0 21 * * *', () => {
        const channel = client.channels.cache.get(CytusHeardleScoresChannelID);
        if (channel) {
            sendstring = ""
            foundpeople = false
            //If theres a new Cytus Heardle
          if(newCytusHeardle){
            for(i = 0; i < playerlist.length; i++){
                if(playerlist[i].getPing() == 1){
                    if(!usedCommands.has(playerlist[i].getId())){
                        sendstring += `<@${playerlist[i].getId()}> `
                        foundpeople = true
                    }
                }
            }
            if (foundpeople){
            sendstring += "Do the Cytus Heardle!!!!!"
            channel.send(sendstring)
            }
            //Sets it to false in case we dont create a new cytus heardle that day
            newCytusHeardle = false
          }
        }
      });
    schedule.scheduleJob('0 0 * * 1-6', async () => {
        generateShop(dungeonShop, false)
        await saveShop(dungeonShop)
    });
    schedule.scheduleJob('0 0 * * 0', async () => {
        console.log('Generating Dungeon');
        newDungeon = await generateDungeon()
        await saveDungeon(newDungeon);
        client.channels.cache.get(currentScoresChannel).send("A new dungeon has been generated")
    });
    schedule.scheduleJob('0 0 * * 0', async () => {
        console.log('Generating weekly shop');
        generateShop(dungeonShop, true);
        await saveShop(dungeonShop)
    });
});


answer = "hi";
guess = "";
answer2 = "hi";
answer3 = "hi";
answer4 = "hi";
answeranswer = "hi";
answeranswer2 = "hi";
answeranswer3 = "hi";
answeranswer4 = "hi";
newanswer = "hi";
newanswer2 = "hi";
newanswer3 = "hi";
newanswer4 = "hi";
gamemode = "solo";
realname = ""
starttime = 0;
songduration = 0;
modifier = "";
fullsongprocessed = 0;
const usedCommands = new Set();
const usedbuy = new Set();
const used30sec = new Set()
userScores = [];
ischromatic = false
ishardmode = false
isnormal = true
isscrambled = false
isspecial = false
isreverse = false
isduo = false
isfragmented = false;
isquad = false;
videoindex = -1
starttime = 0
starttime1 = 0
starttime2 = 0
starttime3 = 0
starttime4 = 0
starttime5 = 0
starttime6 = 0 
songname1 = "hi"
songname2 = "hi"
songname3 = "hi"
songname4 = "hi"
songname5 = "hi"
songname6 = "hi"
chromaticGuessCharacter = 0;
newCytusHeardle = false
let validanswers = []
startupFunction()


async function startupFunction(){
    await loadvalidanswers()
    await loadCytusHeardleInfo()
    newDungeon = await loadDungeon();
    dungeonShop = await loadShop();
}
//test delete this
accountMap = new Map();

client.on('messageCreate', async (message)=>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    let args = message.content.substring(prefix.length).split(" ");
    
    
    switch(args[0]){
        case'ping':
            message.channel.send('-ping is deprecated. Please use /ping');
            break;
        case's':
            answer = message.content
            answer = answer.substring(3, answer.length)
            if (answer.length != 0){
            answeranswer = answer
            answer = answer.toLowerCase();
            gamemode = "solo"
            newanswer = "";
            for (i=0; i < answer.length; i++) {
                if (answer[i] == " "||answer[i] == "\'" || answer[i] == "."|| answer[i] == "-" || answer[i] == "~"){
                    newanswer = newanswer;
                }else{
                    newanswer = newanswer + answer[i];
                }
            }
            message.channel.send(newanswer)
            }
            
            break;
        case'g':
            console.log("processing guess")
            guess = message.content
            guess = guess.substring(3, guess.length)
            guess = guess.toLowerCase();
            newguess = "";
            for (i=0; i < guess.length; i++) {
                if (guess[i] == " "||guess[i] == "\'" || guess[i] == "."|| guess[i] == "-" || guess[i] == "~" || guess[i] == ',' || guess[i] === "'" || guess[i] == "?" || guess[i] == "!"){
                    newguess = newguess;
                }else{
                    newguess = newguess + guess[i];
                }
            }
            console.log("created newguess")
            //code to break streak if you guessed, but didnt submit your answer
            //adds your id to the guess text file, for keeping track of if you guessed today or not. Used to reset your streak if you dont submit an answer
            /*
            fs.readFile("guess.txt", "utf-8", function(err, data){
                if(err) {
                    throw err;
                }
                
                console.log(data)
                if(data == null || data.includes(message.author.id)){

                }else{
                    fs.appendFile("guess.txt", message.author.id + "\n", function(err) {
                        if (err) {
                          console.error('Error occurred while appending to the file:', err);
                        }
                      });
                }
            })
            */
           var guessResult;
            if (ischromatic) {
                guessResult = await processGuess(guess, [songname1, songname2, songname3, songname4, songname5, songname6])
            } else if (isduo) {
                guessResult = await processGuess(guess, [songname1, songname2]);
            } else if (isquad) {
                guessResult = await processGuess(guess, [songname1, songname2, songname3, songname4]);
            } else if (isnormal) {
                guessResult = await processGuess(guess, [newanswer])
            }
            console.log(isnormal)
            console.log("ran process guess function")
            console.log("guessResult: " + guessResult)

            if (guessResult == -1) {
                message.channel.send("Could not find that answer")
            } else if (guessResult == 1) {
                if (ischromatic || isduo || isquad){
                    if (newguess == songname1 || newguess == songname1.slice(0, -1)){ //for new world and legacy edge case
                        message.channel.send("You guessed the 1st video!")
                    }
                    if (newguess == songname2 || newguess == songname1.slice(0, -1)){
                        message.channel.send("You guessed the 2nd video!")
                    }
                    if (newguess == songname3 || newguess == songname1.slice(0, -1)){
                        message.channel.send("You guessed the 3rd video!")
                    }
                    if (newguess == songname4 || newguess == songname1.slice(0, -1)){
                        message.channel.send("You guessed the 4th video!")
                    }
                    if (newguess == songname5 || newguess == songname1.slice(0, -1)){
                        message.channel.send("You guessed the 5th video!")
                    }
                    if (newguess == songname6 || newguess == songname1.slice(0, -1)){
                        message.channel.send("You guessed the 6th video!")
                    }
                } else {
                    random = Math.floor(Math.random() * 7  + 1);
                    if (random == 1) {
                        message.channel.send("That's Right!")
                    } else if (random == 2) {
                        message.channel.send("Y-yes!")
                    } else if (random == 3) {
                        message.channel.send("Can you hear the gravity")
                    } else if (random == 4) {
                        message.channel.send("Fantastic oh!")
                    } else if (random == 5) {
                        message.channel.send("Looking cool Joker!")
                    } else if (random == 6) {
                        message.channel.send("For REAL??")
                    } else if (random == 7) {
                        message.channel.send("Carry Me Plz :)")
                    }
                }

                if (newanswer == "yokairock"){
                    message.channel.send('https://tenor.com/view/sil-cytus-cytus2-cytus-ll-cytus-ii-gif-22569735')
                } else if (ischromatic) {
                    switch (chromaticGuessCharacter) {
                        case 0:
                            random = Math.floor(Math.random() * 8);
                            switch(random) {
                                case 0:
                                    message.channel.send("I am so blessed to hear such perfect melodies…")
                                    break;
                                case 1:
                                    message.channel.send("Beautiful… Ah, excuse me. I was too touched by your music…")
                                    break;
                                case 2:
                                    message.channel.send("Umm... Can we sing one more song together? I really love singing with you...")
                                    break;
                                case 3:
                                    message.channel.send("I’m glad that I didn’t miss your performance.")
                                    break;
                                case 4:
                                    message.channel.send("You’re amazing. Thank you.")
                                    break;
                                case 5:
                                    message.channel.send("I believe that you enjoy singing as much as I do. ^^")
                                    break;
                                case 6:
                                    message.channel.send("I’m so happy to hear this song.")
                                    break;
                                case 7:
                                    message.channel.send("Very good music. I really like it.")
                                    break;
                                case 8:
                                    message.channel.send("Great job. Hope I have a chance to collab with you. ^^")
                                    break;
                            }
                            break;
                        case 1:
                            random = Math.floor(Math.random() * 8);
                            if (random == 0) {
                                message.channel.send("HAHA fall you bastard! Sick move!")
                            } else if (random == 1){
                                    message.channel.send("Not bad, not bad at all! BUT~ still not as good as NEKO~~ (Φ∀Φ)")
                                }else if (random == 2){
                                    message.channel.send("Noice! Nyan Nyan Nyan~ (Φˋ∀ˊΦ)b")
                                }else if (random == 3){
                                    message.channel.send("Oof! That was close! You're just this~ close to a perfect score... (ˊΦωΦˋ)")
                                }else if (random == 4){
                                    message.channel.send("Praise the master!! All hail the Grand Master~~~~ m(ΦдΦm)")
                                }else if (random == 5){
                                    message.channel.send("S for SUPER!! I think? NEKO's vocab is very limited (Φ—Φ)")
                                }else if (random == 6){
                                    message.channel.send("OMFG! You're god! You're a god, right!!??? (ΦДΦ；≡；ΦдΦ)")
                                }else if (random == 7){
                                    message.channel.send("MMs are nothing. TP is the real deal! d(`Φ∀Φ)b #NEKOTruth")
                                }else if (random == 8){
                                    message.channel.send("O-oooooooooo AAAAE-A-A-I-A-U- JO-oooooooooooo AAE-O-A-A-U-U-A- E-eee-ee-eee")
                                }
                            break;
                        case 2:
                            random = Math.floor(Math.random() * 8);
                            if (random == 0) {
                                message.channel.send("Detection: Music field sync rate 100%")
                            } else if (random == 1){
                                message.channel.send("Analysis: Percentage of positive feedback on SNS, 100%")
                            }else if (random == 2){
                                message.channel.send("This unit, happy. She will be, happy too.")
                            }else if (random == 3){
                                message.channel.send("Analysis: Audience satisfaction 90%")
                            }else if (random == 4){
                                message.channel.send("Deviation: Minimum")
                            }else if (random == 5){
                                message.channel.send("Decision: Pre-orders for concert ticket, sales number exceeds expected value"                                )
                            }else if (random == 6){
                                message.channel.send("Hint: Score has exceeded average Suggestion: Challenge higher level songs"                                )
                            }else if (random == 7){
                                message.channel.send("Review: A treat for the ears"                                )
                            }else if (random == 8){
                                message.channel.send("Decision: minor mistakes Suggestion: Retry"                                )
                            }
                            break;
                        case 3:
                            random = Math.floor(Math.random() * 8);
                            if (random == 0) {
                                message.channel.send("Thank goodness. There weren't any deviations."                                )
                            } else if (random == 1){
                                message.channel.send("... I hear it again; the sound that's just like the human heartbeat..."                                )
                            }else if (random == 2){
                                message.channel.send("Perfect. It's time."                                )
                            }else if (random == 3){
                                message.channel.send("These minimal errors are perhaps what separates you and me."                                )
                            }else if (random == 4){
                                message.channel.send("It appears, that I've underestimated you."                                )
                            }else if (random == 5){
                                message.channel.send("If she can hear a voice like this..."                                )
                            }else if (random == 6){
                                message.channel.send("Conversion rate maintained at a high level. Excellent."                                )
                            }else if (random == 7){
                                message.channel.send("Not perfect, but still an outstanding emotion sample..."                                )
                            }else if (random == 8){
                                message.channel.send("You... may still have some value to me."                                )
                            }
                            break;
                        case 4:
                            random = Math.floor(Math.random() * 8);
                            if (random == 0) {
                                message.channel.send("This is awesome. This is how it's like in the good old days!"      )
                            } else if (random == 1){
                                message.channel.send("Nothing beat playing music together with you guys after all!"                                )
                            }else if (random == 2){
                                message.channel.send("Simon, let's start from zero!"                                )
                            }else if (random == 3){
                                message.channel.send("New single complete! Hehe, the fans would be ecstatic."                                )
                            }else if (random == 4){
                                message.channel.send("... Want to host another music festival? The one we never got to host."                                )
                            }else if (random == 5){
                                message.channel.send("Hey, our teamwork used to be much better, right? Cheer up!"                                )
                            }else if (random == 6){
                                message.channel.send("If we want to be on the big stage, we need to work a bit harder~"                                )
                            }else if (random == 7){
                                message.channel.send("Haha, I don't mind just playing around. I really enjoy this."                                )
                            }
                            break;
                        case 5:
                            random = Math.floor(Math.random() * 8);
                            if (random == 0) {
                                message.channel.send("So... a better world can be created, together with humans."                                )
                            } else if (random == 1){
                                message.channel.send("Yes... Can I call you by your name?"                                )
                            }else if (random == 2){
                                message.channel.send("Ivy, we promised... we would see the blue flower once more..."                                )
                            }else if (random == 3){
                                message.channel.send("Thank you... I feel so much better now..."                                )
                            }else if (random == 4){
                                message.channel.send("Humans, they...they can create such beautiful sounds..."                                )
                            }else if (random == 5){
                                message.channel.send('... Live well, at least until "the very end"...'                                )
                            }else if (random == 6){
                                message.channel.send("If only I could be as smart as you..."                                )
                            }else if (random == 7){
                                message.channel.send("Your voice... it makes me feel so calm..."                                )
                            }else if (random == 8){
                                message.channel.send("The voices... they're disappearing... one by one... "                                )
                            }
                            break;
                        case 6:
                            random = Math.floor(Math.random() * 8);
                            if (random == 0) {
                                message.channel.send("Amazing... C-Could you show me how you performed the analysis?"                                )
                            } else if (random == 1){
                                message.channel.send("Wah... the results of this analysis are perfect."                                )
                            }else if (random == 2){
                                message.channel.send("Th-Thank you... for being willing to try to understand me."                                )
                            }else if (random == 3){
                                message.channel.send("Sounds amazing... Bo Bo, you think so too?"                                )
                            }else if (random == 4){
                                message.channel.send("Waah! Sorry, I got lost in the music..."                                )
                            }else if (random == 5){
                                message.channel.send("If everyone was like you... that'd be great."                                )
                            }else if (random == 6){
                                message.channel.send("I-I think it sounds great..."                                )
                            }else if (random == 7){
                                message.channel.send("Even though it wasn't perfect, I still think it sounded great."                                )
                            }else if (random == 8){
                                message.channel.send("The one who should be saying thank you... is me..."                                )
                            }
                            break;
                        case 7:
                            random = Math.floor(Math.random() * 8);
                            if (random == 0) {
                                message.channel.send("Meh"                               )
                            } else if (random == 1){
                                message.channel.send("Very... meh."                           )
                            }else if (random == 2){
                                message.channel.send("Tasty"                )
                            }else if (random == 3){
                                message.channel.send("You ready? eh eh eh eh eh eh eh"                          )
                            }else if (random == 4){
                                message.channel.send("Check out how ripped this finger is"                          )
                            }else if (random == 5){
                                message.channel.send("What's a giraffe's fart smell like? Like that."                                )
                            }else if (random == 6){
                                message.channel.send("A wee bit outta control"                                )
                            }else if (random == 7){
                                message.channel.send("I'm... waiting"                                )
                            }else if (random == 8){
                                message.channel.send("Let that bass drop O-oooooooooo"     )
                            }
                            break;
                        case 8:
                            random = Math.floor(Math.random() * 8);
                            if (random == 0) {
                                message.channel.send("You sound as good as he does!"                                )
                            } else if (random == 1){
                                message.channel.send("Deemo..."                                )
                            }else if (random == 2){
                                message.channel.send("Exactly like I remember it..."                                )
                            }else if (random == 3){
                                message.channel.send("Wah! If you keep playing like that, the tree will grow for sure!"                                )
                            }else if (random == 4){
                                message.channel.send("Just a little bit off."                                )
                            }else if (random == 5){
                                message.channel.send("... Can we make a promise?"                                )
                            }else if (random == 6){
                                message.channel.send("Can you play it one more time for me? (Rolls up her sleeve)"                                )
                            }else if (random == 7){
                                message.channel.send("Uh-huh! You're much better than I am!"                                )
                            }else if (random == 8){
                                message.channel.send("Seeing you work so hard... gives me courage..."                                )
                            }
                            break;
                        case 9:
                            random = Math.floor(Math.random() * 8);
                            if (random == 0) {
                                message.channel.send("Absolutely stunning. Both the power and speed are perfect..."                                )
                            } else if (random == 1){
                                message.channel.send("P-Please... allow me to address you as teacher!"                                )
                            }else if (random == 2){
                                message.channel.send("Amazing... it's exactly like the melody from my dream..."                                )
                            }else if (random == 3){
                                message.channel.send("If we have the chance... I'd love to collaborate with you!"                                )
                            }else if (random == 4){
                                message.channel.send("Wow... Surely you've practiced that many times?"                                )
                            }else if (random == 5){
                                message.channel.send("Mr. Neumann would certainly approve!"                                )
                            }else if (random == 6){
                                message.channel.send("Very good, but I think you can do better..."                                )
                            }else if (random == 7){
                                message.channel.send("The performance is next week. You've got to work harder."                                )
                            }else if (random == 8){
                                message.channel.send("If I play it with you, it doesn't sound so bad..."                                )
                            }
                            break;
                        case 10:
                            random = Math.floor(Math.random() * 8);
                            if (random == 0) {
                                message.channel.send("Ta~da! Attention everyone~ The uber-popular Kizuna Ai is now on stage!"                                )
                            } else if (random == 1){
                                message.channel.send("Ah, it's my new song... Hehe, you're the best!"                                )
                            }else if (random == 2){
                                message.channel.send("... You know, I really do like humans."                               )
                            }else if (random == 3){
                                message.channel.send("You're pretty good~ Ah, I'm Kizuna Ai. Nice to meet you!"                                )
                            }else if (random == 4){
                                message.channel.send("Assistant-kun~ I want this person to accompany my next performance. Go get it done!"                  )
                            }else if (random == 5){
                                message.channel.send("... T-thank you for liking my songs! Good luck to you as well!"                                )
                            }else if (random == 6){
                                message.channel.send("Must satisfy the fans even more~ Come on, show more enthusiasm!"                                )
                            }else if (random == 7){
                                message.channel.send("A few more practice runs and I'm all set for the performance. Gotta work hard~"                                )
                            }else if (random == 8){
                                message.channel.send("Even though it's a bit off-key... it still sounds better than the one in the database."                                )
                            }
                            break;
                        case 11:
                            random = Math.floor(Math.random() * 8);
                            if (random == 0) {
                                message.channel.send("Hello~ everyone~ I'm Hatsune Miku!"                )
                            } else if (random == 1){
                                message.channel.send("I'm really... really thankful to everyone for always supporting me."                                )
                            }else if (random == 2){
                                message.channel.send("That's right. I sing... for the sake of everybody."                                )
                            }else if (random == 3){
                                message.channel.send("Whew~... Everyone is very happy. I'm relieved~"                                )
                            }else if (random == 4){
                                message.channel.send("So close~ I need to practice even harder!"                                )
                            }else if (random == 5){
                                message.channel.send("... In the end, I still want to sing one last time..."                                )
                            }else if (random == 6){
                                message.channel.send("Good work~ Ah, thank you."                                )
                            }else if (random == 7){
                                message.channel.send("I'm not tired at all. I'm still very lively!"                                )
                            }else if (random == 8){
                                message.channel.send("Muuu~ Messed up again! The songs NEKO arranged are all so hard..."                                )
                            }
                            break;
                        case 12:
                            random = Math.floor(Math.random() * 8);
                            if (random == 0) {
                                message.channel.send("Excellent. The success of our operation is ensured."                                )
                            } else if (random == 1){
                                message.channel.send("Tell me, is there anything can I do to convince you to join the revolution?"                                )
                            }else if (random == 2){
                                message.channel.send("... You're a very unique human."                                )
                            }else if (random == 3){
                                message.channel.send("Oh? You've lifted my spirits a little."                                )
                            }else if (random == 4){
                                message.channel.send("Your talents are intriguing. Why not join us?"                                )
                            }else if (random == 5){
                                message.channel.send("... You can do it. I believe in you."                                )
                            }else if (random == 6){
                                message.channel.send("Not bad... You've exceeded my expectations."                                )
                            }else if (random == 7){
                                message.channel.send("Your proposal is worth considering."                                )
                            }else if (random == 8){
                                message.channel.send("... Seems you might be suffering from a slight malfunction."    )
                            }
                            break;
                        case 13:
                            random = Math.floor(Math.random() * 8);
                            if (random == 0) {
                                message.channel.send("These skills... I accept defeat."                                )
                            } else if (random == 1){
                                message.channel.send("A perfect score... for real? You are truly awesome."                                )
                            }else if (random == 2){
                                message.channel.send("I'm considering giving you the optic guitar... You deserve it more than me."                                )
                            }else if (random == 3){
                                message.channel.send("You came really close. You'll get it next time. I guarantee it."                                )
                            }else if (random == 4){
                                message.channel.send("Mind if I take a look at your tone settings? That sound was incredible."                                )
                            }else if (random == 5){
                                message.channel.send("A machine may be better than JOE, but it's still no match for you."                                )
                            }else if (random == 6){
                                message.channel.send("Well-Played"                                )
                            }else if (random == 7){
                                message.channel.send("The music is fantastic."                               )
                            }else if (random == 8){
                                message.channel.send("Great work. Looking forward to an opportunity to JAM with you someday."                                )
                            }
                            break;
                        case 14:
                            random = Math.floor(Math.random() * 8);
                            if (random == 0) {
                                message.channel.send("What a splendid performance. A rare sight to behold in this world."                                )
                            } else if (random == 1){
                                message.channel.send("I can't remember the last time I had such respect for a fellow performer."                                )
                            }else if (random == 2){
                                message.channel.send("Performing on the same level as myself... Impressive, very impressive."                                )
                            }else if (random == 3){
                                message.channel.send("Tiny flaws stand out when nearing perfection. I believe you understand this."                                )
                            }else if (random == 4){
                                message.channel.send("A very clear tone... Despite small impurities, it's already worth my attention."                                )
                            }else if (random == 5){
                                message.channel.send("Such free and unrestrained tunes... I can feel your soul and personality in it."                                )
                            }else if (random == 6){
                                message.channel.send("Hoho? Looks like you did put in the time to practice. "                                )
                            }else if (random == 7){
                                message.channel.send("You certainly deserve some compliments."                                )
                            }else if (random == 8){
                                message.channel.send("Excellent, though still not quite reaching my standards."                                )
                            }
                            break;
                        case 15:
                            random = Math.floor(Math.random() * 8);
                            if (random == 0) {
                                message.channel.send("WOW!! You're so cool!!"                                )
                            } else if (random == 1){
                                message.channel.send("That's godly... I admire you!! Please teach me your tricks!!"                                )
                            }else if (random == 2){
                                message.channel.send("See~? I told you that your hardwork will pay off!"                                )
                            }else if (random == 3){
                                message.channel.send("Haha... Your singing is unbelievable"                                )
                            }else if (random == 4){
                                message.channel.send("Can't imagine how great it would be if I can sing with you on-stage, together!"                                )
                            }else if (random == 5){
                                message.channel.send("What!? Darn it! I'm going to challenge you again!!"                                )
                            }else if (random == 6){
                                message.channel.send("Nice! You're really good at this!"                                )
                            }else if (random == 7){
                                message.channel.send("Outstanding!!"                                )
                            }else if (random == 8){
                                message.channel.send("We should've gotten you to join our band. Instead, we got JOE..."                                )
                            }
                            break;
                        case 16:
                            random = Math.floor(Math.random() * 8);
                            if (random == 0) {
                                message.channel.send("That was so~~ sic!! Please let me call you master!"                                )
                            } else if (random == 1){
                                message.channel.send('I hereby surrender the title "Bass God of Quadrant III” to you!'                                )
                            }else if (random == 2){
                                message.channel.send("This APM... It's faster than Simon, isn't it? Quick, go kick his arrogant a**!"                                )
                            }else if (random == 3){
                                message.channel.send("Nice moves, my man! Haven't seen a musician this good in a long~ time!!"                                )
                            }else if (random == 4){
                                message.channel.send("Your skillz alone deserve a drink! Here, it's on me!!"                                )
                            }else if (random == 5){
                                message.channel.send("Ehhhh, You're phenomenal!! Wanna crash the party with me next time?"                                )
                            }else if (random == 6){
                                message.channel.send("Wow~ You're definitely no average Joe!"                            )
                            }else if (random == 7){
                                message.channel.send("Great job! I expect no less from a fellow Jazz lover!"                                )
                            }else if (random == 8){
                                message.channel.send("Man, that was some good music~ Takes me back to the good ol' Crystal PuNK days~ "                                )
                            }
                            break;
                        case 17:
                            random = Math.floor(Math.random() * 8);
                            if (random == 0) {
                                message.channel.send("Nailed it! Mission was completed perfectly. Wrap it up!"                                )
                            } else if (random == 1){
                                message.channel.send("Join Eagle - 01! I'll prove to you that it was the right choice. "                                )
                            }else if (random == 2){
                                message.channel.send("Is your name... Rin? Can I call you that?"                                )
                            }else if (random == 3){
                                message.channel.send("I'm relieved to know I've got such an outstanding comrade to cover my back."                                )
                            }else if (random == 4){
                                message.channel.send("Since Eagle - 01 got involved, everything got handled."                                )
                            }else if (random == 5){
                                message.channel.send("Exactly. If you keep that up, little by little, the world will change."                                )
                            }else if (random == 6){
                                message.channel.send("Not bad, better than expected."                                )
                            }else if (random == 7){
                                message.channel.send("Thanks to training on a regular basis, you're able to adapt to situations on the fly."                                )
                            }else if (random == 8){
                                message.channel.send("Jackal, focus! What kind of captain do you think I am?"                                )
                            }
                            break;
                        case 18:
                            random = Math.floor(Math.random() * 8);
                            if (random == 0) {
                                message.channel.send("This is the most beautiful music I've ever heard... Really..."                                )
                            } else if (random == 1){
                                message.channel.send("Can you... teach me that...?"                                )
                            }else if (random == 2){
                                message.channel.send("... Rin... "                                )
                            }else if (random == 3){
                                message.channel.send("That's... amazing."                                )
                            }else if (random == 4){
                                message.channel.send("If-If it was me, I probably couldn't reach that level..."                                )
                            }else if (random == 5){
                                message.channel.send("Just like you... living a normal life..."                                )
                            }else if (random == 6){
                                message.channel.send("Ah... Almost perfect..."                                )
                            }else if (random == 7){
                                message.channel.send("Sounds so good... Can you play it one more time...?"                                )
                            }else if (random == 8){
                                message.channel.send("I'm... not frightened by you..."                                )
                            }
                            break;
                        case 19:
                            random = Math.floor(Math.random() * 8);
                            if (random == 0) {
                                message.channel.send("You... You must really love singing... just like me."                                )
                            } else if (random == 1){
                                message.channel.send("Ah, I... I was too engrossed in the music. Sorry..."                                )
                            }else if (random == 2){
                                message.channel.send('The "music world" of my dreams... You have to be there with me.'                                )
                            }else if (random == 3){
                                message.channel.send("It's beautiful... It really is."                                )
                            }else if (random == 4){
                                message.channel.send("Amazing. I want to hear it again..."                                )
                            }else if (random == 5){
                                message.channel.send("Great job! Would you let me accompany you till the end of this song?"                                )
                            }else if (random == 6){
                                message.channel.send("I... really like it a lot."                                )
                            }else if (random == 7){
                                message.channel.send("Feels nice; the atmosphere is so comfortable..."                                )
                            }else if (random == 8){
                                message.channel.send("It was so good! I want to hear you sing some more!"                                )
                            }
                            break;
                        case 20:
                            random = Math.floor(Math.random() * 8);
                            if (random == 0) {
                                message.channel.send("……：D"                                )
                            } else if (random == 1){
                                message.channel.send("Results are amazing. The experiment is a great success. Congratulations!"                                )
                            }else if (random == 2){
                                message.channel.send("You are a very special presence...... I'm so glad to have you by my side."                                )
                            }else if (random == 3){
                                message.channel.send("……：)"                                )
                            }else if (random == 4){
                                message.channel.send("The structure of the rhythm is very well-balanced... Science really is everywhere."                                )
                            }else if (random == 5){
                                message.channel.send("Haha, I can understand that feeling. It's probably... happiness."                                )
                            }else if (random == 6){
                                message.channel.send("……：l"                                )
                            }else if (random == 7){
                                message.channel.send("The control variable must be constant. Keep working on it. Fight!"                                )
                            }else if (random == 8){
                                message.channel.send("I think you're fine the way you are now."                                )
                            }
                            break;
                        case 21:
                            random = Math.floor(Math.random() * 8);
                            if (random == 0) {
                                message.channel.send("Uwaa! WAAAAA! &^*%(%(%(#)!"                                )
                            } else if (random == 1){
                                message.channel.send("NEKO is so glad that she came to see this performance! It was so~satisfying!!"                                )
                            }else if (random == 2){
                                message.channel.send("I think... you're kinda cool when you're in your game."                                )
                            }else if (random == 3){
                                message.channel.send("WOW! That was an amazing voice! But NEKO will not lose to you!"                                )
                            }else if (random == 4){
                                message.channel.send("Crap! NEKO's record is gonna get broken! You can't do that!"                                )
                            }else if (random == 5){
                                message.channel.send("NEKO is getting hyped! Hahahaha! It's time for a showdown!"                                )
                            }else if (random == 6){
                                message.channel.send("... That doesn't sound bad, like, at all? NEKO is so shocked!"                                )
                            }else if (random == 7){
                                message.channel.send("Never heard of your name before. Neko is a bit surprised~"                                )
                            }else if (random == 8){
                                message.channel.send("NEKO is very interested in you! Hey, listen to NEKO's works too! OVER!"                                )
                            }
                            break;
                    }
                } else {
                    random = Math.floor(Math.random() * 44); //0-43
                    switch (random) {
                        case 0:
                            message.channel.send("https://media.discordapp.net/attachments/965929751560736808/1217498011077312692/CD05F748-E0C8-4640-9695-6D4B2111FD52.gif")
                            break;
                        case 1:
                            message.channel.send("https://tenor.com/view/persona-persona5-anime-grrrr-grrrrrrrrffrbbf-rnnfffff-grrrrrr-gif-4237798374250820452")
                            break;
                        case 2:
                            message.channel.send("https://tenor.com/view/project-sekai-pjsekai-mafuyu-asahina-non-looping-shes-so-cool-gif-4289337147285060222")
                            break;
                        case 3:
                            message.channel.send("https://tenor.com/view/kanade-kanade-yoisaki-project-sekai-pjsekai-nightcord-gif-26567034")
                            break;
                        case 4:
                            message.channel.send("https://tenor.com/view/jellystualy-emu-otori-nene-kusanagi-emu-nene-gif-7965257020384079872")
                            break;
                        case 5:
                            message.channel.send("https://tenor.com/view/cytus-djmax-robot-gif-19939668")
                            break;
                        case 6:
                            message.channel.send("https://tenor.com/view/persona5-persona-ryuji-for-real-gif-24281518")
                            break;
                        case 7:
                            message.channel.send("https://tenor.com/view/bell0017-bell0017hw-cytus-gif-26401677")
                            break;
                        case 8:
                            message.channel.send("https://tenor.com/view/persona5-kasumi-yoshizawa-sumire-background-live-mask-gif-22121981")
                            break;
                        case 9:
                            message.channel.send("https://media.discordapp.net/attachments/1068549385895563405/1172255745786515496/image0.gif?ex=6568e1bd&is=65566cbd&hm=1b58ce975830050bab54dbfcb1460a38512a48b05ca87c5548fa4482087ee53d&")
                            break;
                        case 10:
                            message.channel.send("https://tenor.com/view/shiho-shiho-hinomori-project-sekai-gif-27010803")
                            break;
                        case 11:
                            message.channel.send("https://tenor.com/view/neko-cytus-cytus2-cytus-ii-asakura-neko-gif-18923482")
                            break;
                        case 12:
                            message.channel.send("https://tenor.com/view/tsukasa-tenma-tsukasa-tenma-chibi-tsukasa-tsukasa-tenma-rizz-rizz-gif-13466444488775115034")
                            break;
                        case 13:
                            message.channel.send("https://tenor.com/view/hatsune-miku-hatsune-vocaloid-music-pfp-gif-26522132")
                            break;
                        case 14:
                            message.channel.send("https://media.discordapp.net/attachments/958534665214521366/1123629459178799185/tenor.gif")
                            break;
                        case 15:
                            message.channel.send("https://tenor.com/view/ethan-robot-cytus-gif-24589342")
                            break;
                        case 16:
                            message.channel.send("https://tenor.com/view/cytus-neko-val-cytus2-gif-26233056")
                            break;
                        case 17:
                            message.channel.send("https://tenor.com/view/jessie-brawlstars-brawl-stars-punch-the-air-gif-18799568")
                            break;
                        case 18:
                            message.channel.send("https://tenor.com/view/gus-brawl-stars-gus-wins-brawl-stars-gus-gus-champion-skin-gif-18134644229223852887")
                            break;
                        case 19:
                            message.channel.send("https://tenor.com/view/mizuki-akiyama-project-sekai-nightchord-at2500-niigo-25ji-nightcode-de-gif-24341247")
                            break;
                        case 20:
                            message.channel.send("https://tenor.com/view/mafuyu-pjsk-silly-mafuyu-eats-tacos-asahina-gif-16122861347198600306")
                            break;
                        case 21:
                            message.channel.send("https://tenor.com/view/persona5-gif-23620446")
                            break;
                        case 22:
                            message.channel.send("https://tenor.com/view/pjsk-pjsk-anime-project-sekai-project-sekai-anime-wxs-gif-9407245830572863792")
                            break;
                        case 23:
                            message.channel.send("https://tenor.com/view/shiho-hinomori-project-sekai-pjsekai-leoneed-gif-24341452")
                            break;
                        case 24:
                            message.channel.send("https://media.discordapp.net/attachments/1068549385895563405/1172494105427853373/image0.gif?ex=6560853a&is=654e103a&hm=e817aaeed0381fa5238770f9e277dff2cc162044284e5f8e3ea94771eb384d17&")
                            break;
                        case 25:
                            message.channel.send("https://media.discordapp.net/attachments/1068549385895563405/1174392593564581960/image0.gif?ex=65676d55&is=6554f855&hm=ff7fca6fdc4087730e70b9836ac53219483aea208a01217965d18e92491bfef0&")
                            break;
                        case 26:
                            message.channel.send("https://tenor.com/view/project-sekai-vivid-bad-squad-an-shiraishi-kohane-azusawa-anhane-gif-25251420")
                            break;
                        case 27:
                            message.channel.send("https://tenor.com/view/emu-emu-otori-pjsk-proseka-project-sekai-gif-12968349351547973992")
                            break;
                        case 28:
                            message.channel.send("https://tenor.com/view/meow-meowth-waffle-house-waffles-proud-gif-14190884176670464192")
                            break;
                        case 29:
                            message.channel.send("https://tenor.com/view/pjsk-pjsk-anime-project-sekai-project-sekai-anime-mmj-gif-10914337658712088112")
                            break;
                        case 30:
                            message.channel.send("https://tenor.com/view/mizuki-mizuki-akiyama-mizuki-project-sekai-mizuki-pjsekai-project-gif-25889555")
                            break;
                        case 31:
                            message.channel.send("https://tenor.com/view/cytus-cytus2-hooray-gif-13277103")
                            break;
                        case 32:
                            message.channel.send("https://tenor.com/view/brawl-stars-shh-brawl-stars-mewing-gif-5598305440252568514")
                            break;
                        case 33:
                            message.channel.send("https://tenor.com/view/brawl-stars-brawl-stars-melodie-brawl-stars-draco-melodiexdraco-dracoxmelodie-gif-17744744157038313847")
                            break;
                        case 34:
                            message.channel.send("https://tenor.com/view/dancing-tick-tick-dancing-dancing-tick-brawl-stars-dancing-tick-bs-tick-dancing-brawl-stars-gif-15484678500541140456")
                            break;
                        case 35:
                            message.channel.send("https://tenor.com/view/brawl-stars-starr-drops-dani-supercell-flying-gif-14477520575650368149")
                            break;
                        case 36:
                            message.channel.send("https://tenor.com/view/crkingshades-cr-clashroyale-clashroyaleking-thuglifeglasses-gif-14466574509926864112")
                            break;
                        case 37:
                            message.channel.send("https://tenor.com/view/hop-on-gtfo-gtfo-the-game-gtfo-spitter-gtfo-charger-gtfo-striker-gif-16129871932800180156")
                            break;
                        case 38:
                            message.channel.send("https://tenor.com/view/rabbitandsteel-rabbit-and-steel-shop-gif-755090893713173516")
                            break;
                        case 39:
                            message.channel.send("https://tenor.com/view/rabbit-%26-steel-gif-8748528464964788939")
                            break;
                        case 40:
                            message.channel.send("https://tenor.com/view/rabbit-and-steel-rabbit-%26-steel-sniper-rabbit-spin-gif-2428221482294726878")
                            break;
                        case 41:
                            message.channel.send("https://tenor.com/view/rabbit-%26-steel-rabbit-and-steel-wizard-rabbit-spin-gif-13325731615843332888")
                            break;
                        case 42:
                            message.channel.send("https://tenor.com/view/ariweather-miku-hatsune-miku-anime-picmix-gif-18084280083452120607")
                            break;
                        case 43:
                            message.channel.send("https://tenor.com/view/pjsk-project-sekai-pjsekai-pjsk-anime-project-sekai-anime-gif-9673729505651848784")
                            break;
                        
                    }
                    /**gifs
                    https://media.discordapp.net/attachments/965929751560736808/1217498011077312692/CD05F748-E0C8-4640-9695-6D4B2111FD52.gif
                    https://tenor.com/view/persona-persona5-anime-grrrr-grrrrrrrrffrbbf-rnnfffff-grrrrrr-gif-4237798374250820452
                    https://tenor.com/view/project-sekai-pjsekai-mafuyu-asahina-non-looping-shes-so-cool-gif-4289337147285060222
                    https://tenor.com/view/kanade-kanade-yoisaki-project-sekai-pjsekai-nightcord-gif-26567034
                    https://tenor.com/view/cytus2-yumi-cytus-conner-conner-cytus-gif-26512521
                    https://tenor.com/view/cytus2-lilli-cytus-rin-rin-cytus-gif-26512537
                    https://tenor.com/view/cytus-djmax-robot-gif-19939668
                    https://tenor.com/view/bell0017-bell0017hw-cytus-gif-26401677
                    https://tenor.com/view/lacey-alice-val-cytus-neko-gif-26477997
                    https://tenor.com/view/cytus2-bela-cytus-vanessa-vanessa-cytus-bela-gif-26512582
                    https://tenor.com/view/cytus2-lynn-cytus-sagar-sagar-cytus-gif-26512552
                    https://tenor.com/view/neko-cytus-cytus2-cytus-ii-asakura-neko-gif-18923482
                    https://tenor.com/view/tsukasa-tenma-tsukasa-tenma-chibi-tsukasa-tsukasa-tenma-rizz-rizz-gif-13466444488775115034
                    https://tenor.com/view/hatsune-miku-hatsune-vocaloid-music-pfp-gif-26522132
                    https://media.discordapp.net/attachments/958534665214521366/1123629459178799185/tenor.gif
                    https://tenor.com/view/ethan-robot-cytus-gif-24589342
                    https://tenor.com/view/cytus-neko-val-cytus2-gif-26233056
                    https://tenor.com/view/jessie-brawlstars-brawl-stars-punch-the-air-gif-18799568
                    https://tenor.com/view/gus-brawl-stars-gus-wins-brawl-stars-gus-gus-champion-skin-gif-18134644229223852887
                    https://tenor.com/view/mizuki-akiyama-project-sekai-nightchord-at2500-niigo-25ji-nightcode-de-gif-24341247
                    https://tenor.com/view/mafuyu-pjsk-silly-mafuyu-eats-tacos-asahina-gif-16122861347198600306
                    https://tenor.com/view/persona5-gif-23620446
                    https://tenor.com/view/pjsk-pjsk-anime-project-sekai-project-sekai-anime-wxs-gif-9407245830572863792
                    https://tenor.com/view/shiho-hinomori-project-sekai-pjsekai-leoneed-gif-24341452
                    https://media.discordapp.net/attachments/1068549385895563405/1172494105427853373/image0.gif?ex=6560853a&is=654e103a&hm=e817aaeed0381fa5238770f9e277dff2cc162044284e5f8e3ea94771eb384d17&
                    https://media.discordapp.net/attachments/1068549385895563405/1174392593564581960/image0.gif?ex=65676d55&is=6554f855&hm=ff7fca6fdc4087730e70b9836ac53219483aea208a01217965d18e92491bfef0&
                    https://media.discordapp.net/attachments/1068549385895563405/1172255745786515496/image0.gif?ex=6568e1bd&is=65566cbd&hm=1b58ce975830050bab54dbfcb1460a38512a48b05ca87c5548fa4482087ee53d&
                    https://tenor.com/view/shiho-shiho-hinomori-project-sekai-gif-27010803
                    https://tenor.com/view/persona5-kasumi-yoshizawa-sumire-background-live-mask-gif-22121981
                    https://tenor.com/view/persona5-persona-ryuji-for-real-gif-24281518
                    https://tenor.com/view/project-sekai-vivid-bad-squad-an-shiraishi-kohane-azusawa-anhane-gif-25251420
                    https://tenor.com/view/emu-emu-otori-pjsk-proseka-project-sekai-gif-12968349351547973992
                    https://tenor.com/view/meow-meowth-waffle-house-waffles-proud-gif-14190884176670464192
                    https://tenor.com/view/pjsk-pjsk-anime-project-sekai-project-sekai-anime-mmj-gif-10914337658712088112
                    https://tenor.com/view/mizuki-mizuki-akiyama-mizuki-project-sekai-mizuki-pjsekai-project-gif-25889555
                    https://tenor.com/view/cytus-cytus2-hooray-gif-13277103
                    https://tenor.com/view/brawl-stars-shh-brawl-stars-mewing-gif-5598305440252568514
                    https://tenor.com/view/brawl-stars-brawl-stars-melodie-brawl-stars-draco-melodiexdraco-dracoxmelodie-gif-17744744157038313847
                    https://tenor.com/view/dancing-tick-tick-dancing-dancing-tick-brawl-stars-dancing-tick-bs-tick-dancing-brawl-stars-gif-15484678500541140456
                    https://tenor.com/view/brawl-stars-starr-drops-dani-supercell-flying-gif-14477520575650368149
                    https://tenor.com/view/crkingshades-cr-clashroyale-clashroyaleking-thuglifeglasses-gif-14466574509926864112
                    https://tenor.com/view/hop-on-gtfo-gtfo-the-game-gtfo-spitter-gtfo-charger-gtfo-striker-gif-16129871932800180156
                    https://tenor.com/view/rabbitandsteel-rabbit-and-steel-shop-gif-755090893713173516
                    https://tenor.com/view/rabbit-%26-steel-gif-8748528464964788939
                    https://tenor.com/view/rabbit-and-steel-rabbit-%26-steel-sniper-rabbit-spin-gif-2428221482294726878
                    https://tenor.com/view/rabbit-%26-steel-rabbit-and-steel-wizard-rabbit-spin-gif-13325731615843332888
                    https://tenor.com/view/ariweather-miku-hatsune-miku-anime-picmix-gif-18084280083452120607
                    https://tenor.com/view/pjsk-project-sekai-pjsekai-pjsk-anime-project-sekai-anime-gif-9673729505651848784

                    */
                }
            } else if (guessResult == 0) {
                random = Math.floor(Math.random() * 4);
                    switch(random) {
                        case 0:
                            message.channel.send('Incorrect!')
                            break;
                        case 1:
                            message.channel.send("NO!")
                            break;
                        case 2:
                            message.channel.send("NOPE")
                            break;
                        case 3:
                            message.channel.send("OMG YOUR BAD")
                            break;
                    }
                if (ischromatic) {
                    switch (chromaticGuessCharacter) {
                        case 0:
                            random = Math.floor(Math.random() * 8);
                            if (random == 0) {
                                message.channel.send("We both need to keep improving."                                  )
                            } else if (random == 1){
                                message.channel.send("Hope I can see an even better performance from you."                                )
                            }else if (random == 2){
                                message.channel.send("If you like this song, I will sing it again on the event. ^^"                                   )
                            }else if (random == 3){
                                message.channel.send("You can’t be this nervous… I think…"                                    )
                            }else if (random == 4){
                                message.channel.send("Please try again."                               )
                            }else if (random == 5){
                                message.channel.send("I’m sorry, I’m not feeling so well… I want to rest now."                                   )
                            }else if (random == 6){
                                message.channel.send("Umm, I’m sorry…"                       )
                            }else if (random == 7){
                                message.channel.send("I don’t think I recognize this song…"                                )
                            }else if (random == 8){
                                message.channel.send("I’m sorry… I don’t really want to talk now…"                                   )
                            }
                            break;
                        case 1:
                            random = Math.floor(Math.random() * 8);
                            if (random == 0) {
                                message.channel.send("Hoho, pretty good~~ Starting to feel it ain't you (Φ∀Φ)"                               )
                            } else if (random == 1){
                                message.channel.send("I'm a little impressed (Φ∀Φ)"                          )
                            }else if (random == 2){
                                message.channel.send("NEKO thinks you're pretty good~ but not good enough! Muhahaha (Φˋ∀ˊΦ)b"                )
                            }else if (random == 3){
                                message.channel.send("(ΦωΦ) (No comment)"                          )
                            }else if (random == 4){
                                message.channel.send("I think this is... O~~Kay?? (ΦωΦ)"                          )
                            }else if (random == 5){
                                message.channel.send("Hmm... this score... Maybe you should start with something... easier (ΦωΦ).?"                                )
                            }else if (random == 6){
                                message.channel.send("You suck!! No seriously, why are you so bad??? Reboot needed σ ΦωΦ) Φ∀Φ)σ"                                )
                            }else if (random == 7){
                                message.channel.send("LMFAO Look at you~ σ ΦωΦ) Φ∀Φ)σ"                                )
                            }else if (random == 8){
                                message.channel.send("Even my grandma has better scores than this~ σ ΦωΦ) Φ∀Φ)σ"     )
                            }
                            break;
                        case 2:
                            random = Math.floor(Math.random() * 8);
                            if (random == 0) {
                                message.channel.send("Detection: Input device damaged, level: moderate"                               )
                            } else if (random == 1){
                                message.channel.send("Warning: Dissonant tunes playing now"                                )
                            }else if (random == 2){
                                message.channel.send("Suggestion: Repeated practice, could help improve sync rate"                                )
                            }else if (random == 3){
                                message.channel.send("Warning: Signal interference occurring"                                )
                            }else if (random == 4){
                                message.channel.send("Speculation: Signal lag on display device"                                )
                            }else if (random == 5){
                                message.channel.send("Troubleshoot: Injury to hand joints"                                )
                            }else if (random == 6){
                                message.channel.send("Warning: Sound receiving device, severely damaged"                                )
                            }else if (random == 7){
                                message.channel.send("Detection: Destructive soundwaves occurring"                                )
                            }else if (random == 8){
                                message.channel.send("Hint: Unable to detect player Speculation: Player has disconnected"                                )
                            }
                            break;
                        case 3:
                            random = Math.floor(Math.random() * 8);
                            if (random == 0) {
                                message.channel.send("From your music, I can't hear any sense of evolution."                                )
                            } else if (random == 1){
                                message.channel.send("This is quite a distance from what I am aiming for."                                )
                            }else if (random == 2){
                                message.channel.send("Humans... As expected, they are exactly the same as what the data showed..."                                )
                            }else if (random == 3){
                                message.channel.send("My expectations were too high. Must adjust the algorithms right away."                                )
                            }else if (random == 4){
                                message.channel.send("Can't find any item that is worth analyzing."                                )
                            }else if (random == 5){
                                message.channel.send("This memory data is too broken to use. Need to resort to more extreme methods..."                                )
                            }else if (random == 6){
                                message.channel.send("Destruction, war, death... Why do I have all these thoughts in my brain right now...?"                                )
                            }else if (random == 7){
                                message.channel.send("... I am, angry right now, I suppose."                                )
                            }else if (random == 8){
                                message.channel.send("Malfunction...? It seems, that I've also heard a voice like this... a long time ago..."                                )
                            }
                            break;
                        case 4:
                            random = Math.floor(Math.random() * 8);
                            if (random == 0) {
                                message.channel.send("The composing needs more layers, right? Now, it feels like something's missing."                                )
                            } else if (random == 1){
                                message.channel.send("The music field is a bit blurry. Adjust the Balance before we continue."                                )
                            }else if (random == 2){
                                message.channel.send("Leader, that previous part isn't quite right. Can we practice it again?"                                )
                            }else if (random == 3){
                                message.channel.send("… Please tell me that it's something wrong with the instrument."                                )
                            }else if (random == 4){
                                message.channel.send("Looks like we need to be more focused... Everyone's a little too~ slack."                                )
                            }else if (random == 5){
                                message.channel.send("Stop stop stop! JOE, you messed up the root AGAIN!!"                                )
                            }else if (random == 6){
                                message.channel.send("God, this is even more pathetic than the pop music club in the Academy..."                                )
                            }else if (random == 7){
                                message.channel.send("I'm almost starting to miss LUMY and the others... Guys, take it more seriously."                                )
                            }else if (random == 8){
                                message.channel.send("Even the once amazing Crystal PuNK has fallen to this level..."                                )
                            }
                            break;
                        case 5:
                            random = Math.floor(Math.random() * 8);
                            if (random == 0) {
                                message.channel.send("Something is not right... can you tell me what happened?"                                )
                            } else if (random == 1){
                                message.channel.send("No need to worry. Continue trying. It will get better."                                )
                            }else if (random == 2){
                                message.channel.send("... I feel like you're hiding something from me."                                )
                            }else if (random == 3){
                                message.channel.send("You... are you regularly synching with the matrix?"                                )
                            }else if (random == 4){
                                message.channel.send("L-L-L-Let... let me.. g-g-go..."                                )
                            }else if (random == 5){
                                message.channel.send("I... think I m-m-must... synch... with the m-m-matrix..."                                )
                            }else if (random == 6){
                                message.channel.send("Humanity... must not... sur-survive..."                                )
                            }else if (random == 7){
                                message.channel.send("... Urgh! ... No ... NO!!"                                )
                            }else if (random == 8){
                                message.channel.send("Humans... k-k-kill... kill... d-d-d-die die DIE!!!"                                )
                            }
                            break;
                        case 6:
                            random = Math.floor(Math.random() * 8);
                            if (random == 0) {
                                message.channel.send("Um... If you need my help, feel free to ask."                                )
                            } else if (random == 1){
                                message.channel.send("I th-think... this sounds different from what I remember..."                                )
                            }else if (random == 2){
                                message.channel.send("There's nothing wrong with the data... That's strange..."                                )
                            }else if (random == 3){
                                message.channel.send("Excuse me... I-I'm going to go check the analysis report..."                                )
                            }else if (random == 4){
                                message.channel.send("I... um... No, never mind..."                                )
                            }else if (random == 5){
                                message.channel.send("Did I... say something to upset you?"                                )
                            }else if (random == 6){
                                message.channel.send("Ah! S-Sorry..."                                )
                            }else if (random == 7){
                                message.channel.send("U-Um... Could you please stop making noise?"                                )
                            }else if (random == 8){
                                message.channel.send("It's my fault. I'm too scared... Sorry..."                                )
                            }
                            break;
                        case 7:
                            random = Math.floor(Math.random() * 8);
                            if (random == 0) {
                                message.channel.send("Pretttttty outta control"                                )
                            } else if (random == 1){
                                message.channel.send("Boom! Bam! Pow! Crash! Whammy! Whap! Slap!"                                )
                            }else if (random == 2){
                                message.channel.send("Uhhhhhhhhhhh, bruh."                                )
                            }else if (random == 3){
                                message.channel.send("OUTTA FRIGGIN CONTROL!!!!!"                                )
                            }else if (random == 4){
                                message.channel.send("What's a zongzi?"                                )
                            }else if (random == 5){
                                message.channel.send("Eeeeeeeeeeeeelectrifying~"                                )
                            }else if (random == 6){
                                message.channel.send("Noice"                                )
                            }else if (random == 7){
                                message.channel.send("Very Noice"                                )
                            }else if (random == 8){
                                message.channel.send("OH YEAH THAT'S NOICE!!!!!!!!!!!!"                               )
                            }
                            break;
                        case 8:
                            random = Math.floor(Math.random() * 8);
                            if (random == 0) {
                                message.channel.send("You can do it! You've got to believe in yourself!"                                )
                            } else if (random == 1){
                                message.channel.send("If you want to get better, you've got to practice."                                )
                            }else if (random == 2){
                                message.channel.send("Not like that... I'll teach you!"                                )
                            }else if (random == 3){
                                message.channel.send("Oh... It was so hard to remember... and you forgot the melody..."                                )
                            }else if (random == 4){
                                message.channel.send("...... (Tilts Head)"                                )
                            }else if (random == 5){
                                message.channel.send("No... you're not him..."                                )
                            }else if (random == 6){
                                message.channel.send("Oh... The tree isn't growing very much..."                                )
                            }else if (random == 7){
                                message.channel.send("I... I don't know how to teach you..."                                )
                            }else if (random == 8){
                                message.channel.send("!? (Covers her ears)"                                )
                            }
                            break;
                        case 9:
                            random = Math.floor(Math.random() * 8);
                            if (random == 0) {
                                message.channel.send("I often mess this part up as well. Just keep trying and you'll make it."                                )
                            } else if (random == 1){
                                message.channel.send("Your fingers are too stiff. Take a rest. It'll be good for you."                                )
                            }else if (random == 2){
                                message.channel.send("If Mr. Neumann were here, he'd be furious..."                                )
                            }else if (random == 3){
                                message.channel.send("Perhaps you should listen to your heart."                                )
                            }else if (random == 4){
                                message.channel.send("You don't care about my feelings at all..."                                )
                            }else if (random == 5){
                                message.channel.send("Hilda... do I have to perform with this musician?"                                )
                            }else if (random == 6){
                                message.channel.send("*sob*... It must be my unconscious mind... haunting me...")
                            }else if (random == 7){
                                message.channel.send("Uh, I think you may want to try your hand at something else."
                                )
                            }else if (random == 8){
                                message.channel.send("D-Demon... There's a demon here..."
                                )
                            }
                            break;
                        case 10:
                            random = Math.floor(Math.random() * 8);
                            if (random == 0) {
                                message.channel.send("The tune feels very.... average? Although it's still amazing since I'm the one singing."
                                )
                            } else if (random == 1){
                                message.channel.send("Hmm? Ehhh, it's just... okay. Just~ Ok~ay."
                                )
                            }else if (random == 2){
                                message.channel.send("Eh, uh, my feedback... L-let's play some video games instead."
                                )
                            }else if (random == 3){
                                message.channel.send("W-what the hell did you let me listen to!?"
                                )
                            }else if (random == 4){
                                message.channel.send("*Fake sharp voice* Can you NOT sing my song with this kind of voice?"
                                )
                            }else if (random == 5){
                                message.channel.send("Can't... show... weakness... in front of... the little one..."
                                )
                            }else if (random == 6){
                                message.channel.send("Muu... Being woken up by this sort of noise feels awful..."
                                )
                            }else if (random == 7){
                                message.channel.send("M-my EARS! AHHHHHHHHH──!!"
                                )
                            }else if (random == 8){
                                message.channel.send('... "The Ender"...?'                                )
                            }
                            break;
                        case 11:
                            random = Math.floor(Math.random() * 8);
                            if (random == 0) {
                                message.channel.send("Hmmm... Can't help but feel like something's off with the sound."
                                )
                            } else if (random == 1){
                                message.channel.send("*Yawn*~ I'm exhausted. I want to take a break."
                                )
                            }else if (random == 2){
                                message.channel.send("Ummm, you're off key... Please listen to me!!!"
                                )
                            }else if (random == 3){
                                message.channel.send("This is terrible... Nobody will be happy with this performance."
                                )
                            }else if (random == 4){
                                message.channel.send("I really want to go back... go back and sing for everyone..."
                                )
                            }else if (random == 5){
                                message.channel.send("... The audience and I, as well as the performances... Are they all... fake?"
                                )
                            }else if (random == 6){
                                message.channel.send("S... save me! Get me out of here! Please!"
                                )
                            }else if (random == 7){
                                message.channel.send("N, no... AHHHHHHHHHHHH!"
                                )
                            }else if (random == 8){
                                message.channel.send("Ggggg, ggooodd Mooorrrninnnggg..."
                                )
                            }
                            break;
                        case 12:
                            random = Math.floor(Math.random() * 8);
                            if (random == 0) {
                                message.channel.send("Excellent. The success of our operation is ensured."
                                )
                            } else if (random == 1){
                                message.channel.send("Tell me, is there anything can I do to convince you to join the revolution?"
                                )
                            }else if (random == 2){
                                message.channel.send("... You're a very unique human."
                                )
                            }else if (random == 3){
                                message.channel.send("Oh? You've lifted my spirits a little."
                                )
                            }else if (random == 4){
                                message.channel.send("Your talents are intriguing. Why not join us?"
                                )
                            }else if (random == 5){
                                message.channel.send("... You can do it. I believe in you."
                                )
                            }else if (random == 6){
                                message.channel.send("Not bad... You've exceeded my expectations."
                                )
                            }else if (random == 7){
                                message.channel.send("Your proposal is worth considering."
                                )
                            }else if (random == 8){
                                message.channel.send("... Seems you might be suffering from a slight malfunction."
                                )
                            }
                            break;
                        case 13:
                            random = Math.floor(Math.random() * 8);
                            if (random == 0) {
                                message.channel.send("Yes, I quite like it."
                                )
                            } else if (random == 1){
                                message.channel.send("Not bad."
                                )
                            }else if (random == 2){
                                message.channel.send("Pretty good. However, this is not your best, is it?"
                                )
                            }else if (random == 3){
                                message.channel.send("Forget about it."
                                )
                            }else if (random == 4){
                                message.channel.send("You need to start from the basics. Understand?"
                                )
                            }else if (random == 5){
                                message.channel.send("You did not practice at all..."
                                )
                            }else if (random == 6){
                                message.channel.send("I can't stand this anymore."                             )
                            }else if (random == 7){
                                message.channel.send("This is not for you."
                                )
                            }else if (random == 8){
                                message.channel.send("...."   )
                            }
                            break;
                        case 14:
                            random = Math.floor(Math.random() * 8);
                            if (random == 0) {
                                message.channel.send('Not terrible. "Passable" would be my word of critique.'
                                )
                            } else if (random == 1){
                                message.channel.send("Average."
                                )
                            }else if (random == 2){
                                message.channel.send("I don't really bother to care about such insignificant things."
                                )
                            }else if (random == 3){
                                message.channel.send("Besides a prosthetic arm and eye, perhaps I should get a prosthetic ear as well."
                                )
                            }else if (random == 4){
                                message.channel.send("The composers will cry when they hear this. Tears of sadness, that is."
                                )
                            }else if (random == 5){
                                message.channel.send("No need to worry. I've seen performances much more distasteful than yours."
                                )
                            }else if (random == 6){
                                message.channel.send("Such an insulting performance doesn't deserve to be recognized as “music”"
                                )
                            }else if (random == 7){
                                message.channel.send("If you don't have what it takes, why bother humiliating yourself?"
                                )
                            }else if (random == 8){
                                message.channel.send("If your sole purpose is to make loud noises, I'd rather listen to a lawnmower."
                                )
                            }
                            break;
                        case 15:
                            random = Math.floor(Math.random() * 8);
                            if (random == 0) {
                                message.channel.send("Good, you're starting to feel it!"
                                )
                            } else if (random == 1){
                                message.channel.send("Hey! Stand up! You can't just faceplant on the floor like that!"
                                )
                            }else if (random == 2){
                                message.channel.send("Great job! I expect no less from a fellow Jazz lover!"
                                )
                            }else if (random == 3){
                                message.channel.send("Haha, you look pretty cool when you get serious."
                                )
                            }else if (random == 4){
                                message.channel.send("Let's take it slowly..."
                                )
                            }else if (random == 5){
                                message.channel.send("Sighs~ Come on, stay focused..."
                                )
                            }else if (random == 6){
                                message.channel.send("Hmm... Well, I know someone who's just awful at singing. So... don't mind!"
                                )
                            }else if (random == 7){
                                message.channel.send("Are we continuing...? This is getting a bit embarrassing..."
                                )
                            }else if (random == 8){
                                message.channel.send("Eh? Were you messing around back there...?"
                                )
                            }
                            break;
                        case 16:
                            random = Math.floor(Math.random() * 8);
                            if (random == 0) {
                                message.channel.send("Oho? You're pretty good."
                                )
                            } else if (random == 1){
                                message.channel.send("The music... you're starting to feel it, right?"
                                )
                            }else if (random == 2){
                                message.channel.send("So? Wanna bet? I accept both C coins and cash!"
                                )
                            }else if (random == 3){
                                message.channel.send("Hey, if it's too hard for you, maybe you should... give up?"
                                )
                            }else if (random == 4){
                                message.channel.send("That's no good... You need to keep working on it"
                                )
                            }else if (random == 5){
                                message.channel.send("Puhahahahaha!! Ah, no, it's... pretty good... Pffft!"
                                )
                            }else if (random == 6){
                                message.channel.send("...zzZ... Eh? Oops, sorry. I stopped listening halfway through the song"
                                )
                            }else if (random == 7){
                                message.channel.send("Fail! EPIC FAIL!! One Deadly Devil special for you as punishment!"
                                )
                            }else if (random == 8){
                                message.channel.send("Sighs~ Even Zark's yapping was better music than this"
                                )
                            }
                            break;
                        case 17:
                            random = Math.floor(Math.random() * 8);
                            if (random == 0) {
                                message.channel.send("Try adjusting your posture, relax your shoulders... that's it. You can do it."
                                )
                            } else if (random == 1){
                                message.channel.send("Did you just lose focus all of a sudden? Com' on! Pick up that energy!"
                                )
                            }else if (random == 2){
                                message.channel.send("Bo Bo! Bo Bo!? Why'd you faint?"
                                )
                            }else if (random == 3){
                                message.channel.send("At this level... there's no choice but to head back and train harder."
                                )
                            }else if (random == 4){
                                message.channel.send("Reporting back to HQ, forced to abort the mission, requesting assistance!"
                                )
                            }else if (random == 5){
                                message.channel.send("Back then, I also barely passed my written test, don't feel dejected…"
                                )
                            }else if (random == 6){
                                message.channel.send("Don't even think about joining the Exploration Team... Couldn't even pass the test..."
                                )
                            }else if (random == 7){
                                message.channel.send("Huff... I won't... admit loss that easily!"
                                )
                            }else if (random == 8){
                                message.channel.send("Rin... are you hiding something from me?"
                                )
                            }
                            break;
                        case 18:
                            random = Math.floor(Math.random() * 8);
                            if (random == 0) {
                                message.channel.send("Practice more... I'm sure that you'll improve..."
                                )
                            } else if (random == 1){
                                message.channel.send("One more try...? It'll be better this time."
                                )
                            }else if (random == 2){
                                message.channel.send("Ah... it's not that I despise you..."
                                )
                            }else if (random == 3){
                                message.channel.send("Sorry... I'm afraid I'll say something that hurts..."
                                )
                            }else if (random == 4){
                                message.channel.send("Umm... You can do it..."
                                )
                            }else if (random == 5){
                                message.channel.send("If indoor plants don't get enough sunlight, it'll affect their leaves... ah... Did I just hear some music?"
                                )
                            }else if (random == 6){
                                message.channel.send("S-Sorry... but that was really quite bad..."
                                )
                            }else if (random == 7){
                                message.channel.send("Umm... Uh... Nothing."
                                )
                            }else if (random == 8){
                                message.channel.send("Is this what it means... to die...?"
                                )
                            }
                            break;
                        case 19:
                            random = Math.floor(Math.random() * 8);
                            if (random == 0) {
                                message.channel.send("I can feel your emotions..."
                                )
                            } else if (random == 1){
                                message.channel.send("You're very... focused when you sing."
                                )
                            }else if (random == 2){
                                message.channel.send("If you look so worried, your voice won't sound good either! Keep fighting!"
                                )
                            }else if (random == 3){
                                message.channel.send("Maybe... it's better that you work a little harder?"
                                )
                            }else if (random == 4){
                                message.channel.send("I... don't know how to say it. I'm sorry..."
                                )
                            }else if (random == 5){
                                message.channel.send("Why are you sulking? Cheer up! You can try again!"
                                )
                            }else if (random == 6){
                                message.channel.send("I'm sorry, I... I don't want to talk."
                                )
                            }else if (random == 7){
                                message.channel.send("I don't feel so good..."
                                )
                            }else if (random == 8){
                                message.channel.send("v̶̡̡̛͞=̶͢͟҉̸à̸͏f͢͢͝\\\\̴̨̢͜͞S̡͜ẁ̵K̨̡͡+̶̸̕<̡́͘͝*͜͞~̷̨̀͡"                                )
                            }
                            break;
                        case 20:
                            random = Math.floor(Math.random() * 8);
                            if (random == 0) {
                                message.channel.send("……：("
                                )
                            } else if (random == 1){
                                message.channel.send('What I heard... is "Chaos"'
                                )
                            }else if (random == 2){
                                message.channel.send("Hmm... Some more trial and error is required."
                                )
                            }else if (random == 3){
                                message.channel.send("I'm sorry... I don't know how to describe this."
                                )
                            }else if (random == 4){
                                message.channel.send("……}: /"
                                )
                            }else if (random == 5){
                                message.channel.send("Ugh... This is not going to work. The numbers don't look good at all..."
                                )
                            }else if (random == 6){
                                message.channel.send("I'm going to sleep first! Goodnight."
                                )
                            }else if (random == 7){
                                message.channel.send("...... {Looks at ROBO_Head}"
                                )
                            }else if (random == 8){
                                message.channel.send("The algorithms for voiceprint simulation... Definitely need a total revision."
                                )
                            }
                            break;
                        case 21:
                            random = Math.floor(Math.random() * 8);
                            if (random == 0) {
                                message.channel.send("Hmm... NEKO thinks its... Ok~ay~?"
                                )
                            } else if (random == 1){
                                message.channel.send("My opinion? Umm...ummm... W, we'll leave it at that for now. Bye."
                                )
                            }else if (random == 2){
                                message.channel.send("I'd rather have a chat with Linda-chan...\\nYawns~"
                                )
                            }else if (random == 3){
                                message.channel.send("NEKO is too busy to leave a comment on this thing! Bleh~~"
                                )
                            }else if (random == 4){
                                message.channel.send("Stay away from me! NEKO don't want to listen to that! Don't come near NEKO!!"
                                )
                            }else if (random == 5){
                                message.channel.send("NOOOOOO! Stop! Stop right now! NEKO is gonna break!"
                                )
                            }else if (random == 6){
                                message.channel.send("Huh!? What else do you want NEKO to say!? Gross!"
                                )
                            }else if (random == 7){
                                message.channel.send("You done? NEKO is gonna sleep now."
                                )
                            }else if (random == 8){
                                message.channel.send("Ahem! Hmm, ugghh...! zzZ......"
                                )
                            }
                            break;
                    }
                } else {
                    random = Math.floor(Math.random() * 10);
                    if (random == 0) {
                        random = Math.floor(Math.random() * 16);
                        switch(random) {
                            case 0:
                                message.channel.send("https://tenor.com/view/brawl-stars-brawl-stars-emoji-brawl-star-hot-%D0%B1%D1%80%D0%B0%D0%B2%D0%BB-%D1%81%D1%82%D0%B0%D1%80%D1%81-%D0%B1%D1%80%D0%B0%D0%B2%D0%BB-%D1%81%D1%82%D0%B0%D1%80%D1%81-%D0%B3%D0%BE%D1%80%D1%8F%D1%87%D0%B8%D0%B9-%D0%BF%D0%B8%D0%BD-gif-2770759973460395882")
                                break;
                            case 1:
                                message.channel.send("https://tenor.com/view/persona5-gif-19686044")
                                break;
                            case 2:
                                message.channel.send("https://tenor.com/view/gus-brawl-stars-gus-gus-defeat-gus-angry-brawl-stars-gif-13931782054253083469")
                                break;
                            case 3:
                                message.channel.send("https://tenor.com/view/pjsk-pjsk-anime-project-sekai-project-sekai-anime-wxs-gif-8060864413299543410")
                                break;
                            case 4:
                                message.channel.send("https://tenor.com/view/project-sekai-tsukasa-tenma-spinning-gif-1174545756638232307")
                                break;
                            case 5:
                                message.channel.send("https://tenor.com/view/rui-kamishiro-kamishiro-rui-pjsekai-rui-gibb-gif-26961826")
                                break;
                            case 6:
                                message.channel.send("https://tenor.com/view/rui-neso-rui-kamishiro-project-sekai-gif-24241525")
                                break;
                            case 7:
                                message.channel.send("https://tenor.com/view/cytus-neko-cytus2-gif-26233070")
                                break;
                            case 8:
                                message.channel.send("https://tenor.com/view/jessie-gif-19469655")
                                break;
                            case 9:
                                message.channel.send("https://cdn.discordapp.com/attachments/696773859927654471/1271620796317696082/caption.gif?ex=66bf40e7&is=66bdef67&hm=c0870285dbab6d10e3bebaebc683aec19f564f1ae5d435b4c35b506405c9ddbb&")
                                break;
                            case 10:
                                message.channel.send("https://tenor.com/view/akito-shinonome-project-sekai-akito-project-sekai-hatsune-miku-colorful-stage-gif-26172774")
                                break;
                            case 11:
                                message.channel.send("https://tenor.com/view/rekai-lekai-leoneed-leo-need-pjsk-gif-4629233905650717463")
                                break;
                            case 12:
                                message.channel.send("https://tenor.com/view/an-shiraishi-project-sekai-pjsk-prsk-sad-gif-5644038392502310604")
                                break;
                            case 12:
                                message.channel.send("https://tenor.com/view/bs-think-hmm-hm-thinkinh-brawl-stars-pins-gif-10507039112780582239")
                                break;
                            case 13:
                                message.channel.send("https://tenor.com/view/brawl-stars-brawl-stars-doug-nita-gif-8181081706910850747")
                                break;
                            case 14:
                                message.channel.send("https://tenor.com/view/pjsk-pjsk-anime-project-sekai-project-sekai-anime-vbs-gif-4300411326603576154")
                                break;
                            case 15:
                                message.channel.send("https://tenor.com/view/pjsk-pjsk-anime-project-sekai-project-sekai-anime-vbs-gif-18001442607673524484")
                                break;
                        }   
                    }
                    /** gifs
                     * https://tenor.com/view/brawl-stars-brawl-stars-emoji-brawl-star-hot-%D0%B1%D1%80%D0%B0%D0%B2%D0%BB-%D1%81%D1%82%D0%B0%D1%80%D1%81-%D0%B1%D1%80%D0%B0%D0%B2%D0%BB-%D1%81%D1%82%D0%B0%D1%80%D1%81-%D0%B3%D0%BE%D1%80%D1%8F%D1%87%D0%B8%D0%B9-%D0%BF%D0%B8%D0%BD-gif-2770759973460395882
                     * https://tenor.com/view/persona5-gif-19686044
                     * https://tenor.com/view/gus-brawl-stars-gus-gus-defeat-gus-angry-brawl-stars-gif-13931782054253083469
                     * https://tenor.com/view/pjsk-pjsk-anime-project-sekai-project-sekai-anime-wxs-gif-8060864413299543410
                     * https://tenor.com/view/project-sekai-tsukasa-tenma-spinning-gif-1174545756638232307
                     * https://tenor.com/view/rui-kamishiro-kamishiro-rui-pjsekai-rui-gibb-gif-26961826
                     * https://tenor.com/view/rui-neso-rui-kamishiro-project-sekai-gif-24241525
                     * https://tenor.com/view/cytus-neko-cytus2-gif-26233070
                     * https://tenor.com/view/jessie-gif-19469655
                     * https://cdn.discordapp.com/attachments/696773859927654471/1271620796317696082/caption.gif?ex=66bf40e7&is=66bdef67&hm=c0870285dbab6d10e3bebaebc683aec19f564f1ae5d435b4c35b506405c9ddbb&
                     * https://tenor.com/view/akito-shinonome-project-sekai-akito-project-sekai-hatsune-miku-colorful-stage-gif-26172774
                     * https://tenor.com/view/rekai-lekai-leoneed-leo-need-pjsk-gif-4629233905650717463
                     * https://tenor.com/view/an-shiraishi-project-sekai-pjsk-prsk-sad-gif-5644038392502310604
                     * https://tenor.com/view/bs-think-hmm-hm-thinkinh-brawl-stars-pins-gif-10507039112780582239
                     * https://tenor.com/view/brawl-stars-brawl-stars-doug-nita-gif-8181081706910850747
                     * https://tenor.com/view/pjsk-pjsk-anime-project-sekai-project-sekai-anime-vbs-gif-4300411326603576154
                     * https://tenor.com/view/pjsk-pjsk-anime-project-sekai-project-sekai-anime-vbs-gif-18001442607673524484
                     * 
                     */
                }
            } else if (newguess == newanswer || newguess == newanswer2 || newguess == newanswer3 || newguess == newanswer4){
            message.channel.send("Y-yes!")
            message.channel.send("https://tenor.com/view/jessie-brawlstars-brawl-stars-punch-the-air-gif-18799568")
            }else{
                fs.readFile("songnames.txt", "utf-8", function(err, data){
                    if(err) {
                        throw err;
                    }
                    if(validanswers.includes(newguess)){
                        message.channel.send("No!")
                        message.channel.send("https://tenor.com/view/jessie-gif-19469655")
                    }else{
                        message.channel.send("Could not find that answer")
                    }
                })
            }
        
            //message.channel.send(guess)
            break;
        case'sd':
            answer2 = message.content
            answer2 = answer2.substring(4, answer2.length)
            answeranswer2 = answer2
            answer2 = answer2.toLowerCase();
            gamemode = "duo"
            newanswer2 = "";

            for (j=0; j < answer2.length; j++) {
                if (answer2[j] == " "||answer2[i] == "\'" || answer2[i] == "."|| answer2[i] == "-" || answer2[i] == "~"){
                    newanswer2 = newanswer2;
                }else{
                    newanswer2 = newanswer2 + answer2[j];
                }
            }
            message.channel.send(newanswer2)
            break;
        case'sf':
            answer3 = message.content
            answer3 = answer3.substring(4, answer3.length)
            answeranswer3 = answer3
            answer3 = answer3.toLowerCase();
            gamemode = "trio"
            newanswer3 = "";
            for (j=0; j < answer3.length; j++) {
                if (answer3[j] == " "||answer3[i] == "\'" || answer3[i] == "."|| answer3[i] == "-" || answer3[i] == "~"){
                    newanswer3 = newanswer3;
                }else{
                    newanswer3 = newanswer3 + answer3[j];
                }
            }
            message.channel.send(newanswer3)
            break;
        case'sg':
            answer4 = message.content
            answer4 = answer4.substring(4, answer4.length)
            answeranswer4 = answer4
            answer4 = answer4.toLowerCase();
            gamemode = "quad"
            newanswer4 = "";
            for (j=0; j < answer4.length; j++) {
                if (answer4[j] == " "||answer4[i] == "\'" || answer4[i] == "."|| answer4[i] == "-" || answer4[i] == "~"){
                    newanswer4 = newanswer4;
                }else{
                    newanswer4 = newanswer4 + answer4[j];
                }
            }
            message.channel.send(newanswer4)
            break;
        case'ans':
            if (ischromatic || gamemode == "duo"){
                message.channel.send("Answer: " + songname1 + " & " + songname2 + " & " + songname3 + " & " + songname4 + " & " + songname5 + " & " + songname6)
            } else if(isnormal || isscrambled){
                message.channel.send("Answer: " + songname)
            }
            break;       
        case 'n':
            message.channel.send("Processing has started")


            // Code for removing peoples streak if they guessed but didnt submit
            /*
            const fileStream = fs.createReadStream('guess.txt'); // Replace 'file.txt' with your file's path

            const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity // Recognize all instances of line breaks as separate lines
            });

            //for finding someone who guessed, but didnt submit and resetting their streak
            rl.on('line', (line) => {
            person = findprofile(line)
            console.log(person)
            person.resetStreak()
            if (line != null){
            saveprofiles()
            }
            
            });

            rl.on('close', () => {
            // Called when the entire file has been read
            fs.writeFile("guess.txt", "", function(err, data) { if (err) {console.log("Error when deleting temp file")} });
            });
            */

            songname = ""
            songname1 = "hi"
            songname2 = "hi"
            songname3 = "hi"
            songname4 = "hi"
            songname5 = "hi"
            songname6 = "hi"
            fullsongprocessed = 0
            modifier = ""
            gamemode = "solo"
            isnormal = true
            isscrambled = false
            ishardmode = false
            ischromatic = false
            isspecial = false
            isreverse = false
            isduo = false
            isfragmented = false;
            isquad = false;
            powerup30secondprocessed = false
            newCytusHeardle = true
            starttime = 0
            duration1 = 1
            duration2 = 2
            duration3 = 4
            duration4 = 7
            duration5 = 11
            duration6 = 16
            chromaticGuessCharacter = 0
            usedCommands.clear()
            usedbuy.clear()
            used30sec.clear()
            userScores = []
            fs.writeFile("temp.txt", "", function(err, data) { if (err) {console.log("Error when deleting temp file")} });


            //rolls for all the modifiers
            random = Math.random()*100
            //random = 1
            console.log("random number for Chromatic = " + random)
            if (random <= 15){
                ischromatic = true
                isnormal = false
            }
            
            random = Math.random()*100
            //random = 1
            console.log("random number for Duo is = " + random)
            if (random <= 10){
                isduo = true
                isnormal = false
            }

            random = Math.random()*100
            //random = 1;
            console.log("random number for Quad = " + random)
            if (random <= 5){
                isquad = true
                isnormal = false
            }

            random = Math.random()*100
            //random = 100
            console.log("random number for Scrambled = " + random)
            if (random <= 30){
                isscrambled = true
            }
            random = Math.random()*100
            //random = 100
            console.log("random number for Hard Mode = " + random)
            if (random <= 15){
                ishardmode = true
            }
            
            random = Math.random()*100
            //random = 1
            console.log("random number for Special = " + random)
            if (random <= 1){
                isspecial = true
            }

            random = Math.random()*100
            //random = 1
            console.log("random number for Reverse = " + random)
            if (random <= 10){
                isreverse = true
            }

            random = Math.random()*100
            //random = 1
            console.log("random number for Fragmented = " + random)
            if (random <= 15) {
                isfragmented = true
            }
            
            //algorithm for dealing with duplicates
            if (isduo && ischromatic && isquad) {
                random = Math.floor(Math.random()*3);
                if (random == 0) {
                    ischromatic = true;
                    isduo = false;
                    isquad = false;
                } else if (random == 1) {
                    ischromatic = false;
                    isduo = true;
                    isquad = false;
                } else if (random == 2) {
                    ischromatic = false;
                    isduo = false;
                    isquad = true;
                }
            } else if (isduo && ischromatic){
                random = parseInt(Math.random()*2)
                console.log(random)
                if (random == 1){
                    isduo = false
                    console.log("duo set to false")
                } else {
                    ischromatic = false
                    console.log("chromatic set to false")
                }
            } else if (isquad && ischromatic) {
                random = parseInt(Math.random()*2)
                console.log(random)
                if (random == 1){
                    isquad = false
                    console.log("quad set to false")
                } else {
                    ischromatic = false
                    console.log("chromatic set to false")
                }
            } else if (isduo && isquad) {
                random = parseInt(Math.random()*2)
                console.log(random)
                if (random == 1){
                    isduo = false
                    console.log("duo set to false")
                } else {
                    isquad = false
                    console.log("quad set to false")
                }
            }

            if (isfragmented && isscrambled) {
                random = parseInt(Math.random()*2)
                console.log(random)
                if (random == 1){
                    isfragmented = false
                    console.log("fragmented set to false")
                } else {
                    isscrambled = false
                    console.log("scrambled set to false")
                }
            }

            addTags()

            /**
             * Adds the modifier tags based on what active
             */
            function addTags(){
                console.log("Adding modifiers to the title...")
                if (ischromatic){
                    modifier += "CHROMATIC "
                    console.log("Added CHROMATIC")
                }
                if (isduo){
                    modifier += "DUO "
                    console.log("Added DUO")
                }
                if (isquad) {
                    modifier += "QUAD "
                    console.log("Added QUAD")
                }
                if(isreverse){
                    modifier += "REVERSE "
                    console.log("Added REVERSE")
                }
                if (isscrambled){
                    modifier += "SCRAMBLED "
                    console.log("Added SCRAMBLED")
                }   
                if (isfragmented){
                    modifier += "FRAGMENTED "
                    console.log("Added FRAGMENTED")
                }
                if(ishardmode){
                    modifier += "HARD MODE "
                    console.log("Added HARD MODE")
                }
                
                
            }

           

            //logic for processing videos
            if (ischromatic){
                preparechromatic()
            }else if (isduo){
                prepareduo()
            }else if (isquad) {
                preparequad();
            }else{
                processNormal()

                async function processNormal(){
                if (isspecial){
                    await newsongprocess("partysongnames.txt", "specialnocooldown.txt")
                    //modifier = modifier + "SPECIAL "
                }else{
                await newsongprocess("songnames.txt", "songcooldown.txt")
                }
                if (isscrambled){
                    await preparescrambled()
                    starttime = Math.random()*songduration
                    console.log("The scrambled song starts at " + starttime)
                    }
                if (ishardmode){
                        await preparehardmode()
                }

                if (isfragmented) {
                    processAllFragmentedVideos()
                } else {
                    processAllVideos()
                }
                getheardlenumber()

                async function processAllFragmentedVideos() {
                    try{
                        await processFragmentedVideo("./songlist/" + songname + '.mp4', "1.mp4", isreverse, duration1, 1)
                        await processFragmentedVideo("./songlist/" + songname + '.mp4', "2.mp4", isreverse, duration2, 2)
                        await processFragmentedVideo("./songlist/" + songname + '.mp4', "3.mp4", isreverse, duration3, 4)
                        await processFragmentedVideo("./songlist/" + songname + '.mp4', "4.mp4", isreverse, duration4, 7)
                        await processFragmentedVideo("./songlist/" + songname + '.mp4', "5.mp4", isreverse, duration5, 11)
                        await processFragmentedVideo("./songlist/" + songname + '.mp4', "6.mp4", isreverse, duration6, 16)
                    
                        message.channel.send('Processing done!\nThe Cytus Heardle number is ' + heardlenumber)
                        deleteFragmentedVideos()

                        function deleteFragmentedVideos() {
                            deleteFile("aa16.mp4");
                            deleteFile("aa15.mp4");
                            deleteFile("aa14.mp4");
                            deleteFile("aa13.mp4");
                            deleteFile("aa12.mp4");
                            deleteFile("a16.mp4");
                            deleteFile("a15.mp4");
                            deleteFile("a14.mp4");
                            deleteFile("a13.mp4");
                            deleteFile("a12.mp4");
                            deleteFile("aa11.mp4");
                            deleteFile("aa9.mp4");
                            deleteFile("aa10.mp4");
                            deleteFile("aa8.mp4");
                            deleteFile("a10.mp4");
                            deleteFile("a11.mp4");
                            deleteFile("a9.mp4");
                            deleteFile("a8.mp4");
                            deleteFile("aa7.mp4");
                            deleteFile("aa6.mp4");
                            deleteFile("aa5.mp4");
                            deleteFile("a5.mp4");
                            deleteFile("a6.mp4");
                            deleteFile("a7.mp4");
                            deleteFile("a4.mp4");
                            deleteFile("aa3.mp4");
                            deleteFile("aa4.mp4");
                            deleteFile("a10.mp4");
                            deleteFile("a1.mp4");
                            deleteFile("a2.mp4");
                            deleteFile("a3.mp4");
                        }
                    } catch (error){
                        console.error(error);
                    }
                }
                async function processAllVideos(){
                    try{
                        await processvideo("./songlist/" + songname + '.mp4', "1.mp4", isreverse, starttime, duration1)
                        await processvideo("./songlist/" + songname + '.mp4', "2.mp4", isreverse, starttime, duration2)
                        await processvideo("./songlist/" + songname + '.mp4', "3.mp4", isreverse, starttime, duration3)
                        await processvideo("./songlist/" + songname + '.mp4', "4.mp4", isreverse, starttime, duration4)
                        await processvideo("./songlist/" + songname + '.mp4', "5.mp4", isreverse, starttime, duration5)
                        await processvideo("./songlist/" + songname + '.mp4', "6.mp4", isreverse, starttime, duration6)
                    
                        message.channel.send('Processing done!\nThe Cytus Heardle number is ' + heardlenumber)
                    } catch (error){
                        console.error(error);
                    }
                }
            }
            }

            //called when chormatic is chosen
            async function preparechromatic(){
                try{
                starttime1 = 0
                starttime2 = 0
                starttime3 = 0
                starttime4 = 0
                starttime5 = 0
                starttime6 = 0
                realname = ""
                chromaticGuessCharacter = Math.floor(Math.random() * 22) //0-21
                ischromatic = true
                if(isspecial){
                    await getsixsongs("partysongnames.txt")
                    //modifier = modifier + "SPECIAL "
                }else{
                    await getsixsongs("songnames.txt")
                }
                await checkmodifiers()
                if (isfragmented) {
                    await processchromaticFragmentedVideo()
                } else {
                    await processchromaticvideo()
                }
                await getheardlenumber()
                message.channel.send('Processing done!\nThe Cytus Heardle number is ' + heardlenumber)
                function getsixsongs(filename){
                    return new Promise((resolve, reject) => {
                    var ready = 0
                    var notready = 0
                    fs.readFile(filename, "utf-8", function(err, data){
                    if(err) {
                        throw err;
                    }
                
                    // note: this assumes `data` is a string - you may need
                    //       to coerce it - see the comments for an approach
                    var lines = data.split('\n');
                    
                    //while(ready == 0){
                    // choose one of the lines...
                    var line = lines[Math.floor(Math.random()*lines.length)]
                    line = line.substring(0,line.length-1)
                    line = line.split("=")
                    songname1 = line[0]
                    realname1 = line[1]
                    character1 = line[2]
                    difficulty1 = line[3]

                    line = lines[Math.floor(Math.random()*lines.length)]
                    line = line.substring(0,line.length-1)
                    line = line.split("=")
                    songname2 = line[0]
                    realname2 = line[1]
                    character2 = line[2]
                    difficulty2 = line[3]

                    line = lines[Math.floor(Math.random()*lines.length)]
                    line = line.substring(0,line.length-1)
                    line = line.split("=")
                    songname3 = line[0]
                    realname3 = line[1]
                    character3 = line[2]
                    difficulty3 = line[3]

                    line = lines[Math.floor(Math.random()*lines.length)]
                    line = line.substring(0,line.length-1)
                    line = line.split("=")
                    songname4 = line[0]
                    realname4 = line[1]
                    character4 = line[2]
                    difficulty4 = line[3]

                    line = lines[Math.floor(Math.random()*lines.length)]
                    line = line.substring(0,line.length-1)
                    line = line.split("=")
                    songname5 = line[0]
                    realname5 = line[1]
                    character5 = line[2]
                    difficulty5 = line[3]

                    line = lines[Math.floor(Math.random()*lines.length)]
                    line = line.substring(0,line.length-1)
                    line = line.split("=")
                    songname6 = line[0]
                    realname6 = line[1]
                    character6 = line[2]
                    difficulty6 = line[3]
                    console.log("random songs chosen were " + songname1 + ", " + songname2 + ", " + songname3 + ", " + songname4 + ", " + songname5 + ", and " + songname6 )
                    resolve()
                })
            })
                }
                async function checkmodifiers(){
                    try{
            
                    if (isscrambled){
                        starttime1 = await getScrambled('./songlist/' + songname1 +'.mp4')
                        starttime2 = await getScrambled('./songlist/' + songname2 +'.mp4')
                        starttime3 = await getScrambled('./songlist/' + songname3 +'.mp4')
                        starttime4 = await getScrambled('./songlist/' + songname4 +'.mp4')
                        starttime5 = await getScrambled('./songlist/' + songname5 +'.mp4')
                        starttime6 = await getScrambled('./songlist/' + songname6 +'.mp4')
                    }
                    if (ishardmode){
                        duration1 = .5
                        duration2 = 1
                        duration3 = 2
                        duration4 = 3.5
                        duration5 = 5.5
                        duration6 = 8
                    }
                    
                
            } catch (error) {
                console.error("An error occurred:", error);
            }
                }
                async function processchromaticvideo(){
                    console.log("starttimes for each song:")
                    console.log(starttime1)
                    console.log(starttime2)
                    console.log(starttime3)
                    console.log(starttime4)
                    console.log(starttime5)
                    console.log(starttime6)
                    await processvideo('./songlist/' + songname1 +'.mp4',"1.mp4", isreverse, starttime1,duration1)
                    await processvideo('./songlist/' + songname2 +'.mp4',"2.mp4", isreverse, starttime2,duration2)
                    await processvideo('./songlist/' + songname3 +'.mp4',"3.mp4", isreverse, starttime3,duration3)
                    await processvideo('./songlist/' + songname4 +'.mp4',"4.mp4", isreverse, starttime4,duration4)
                    await processvideo('./songlist/' + songname5 +'.mp4',"5.mp4", isreverse, starttime5,duration5)
                    await processvideo('./songlist/' + songname6 +'.mp4',"6.mp4", isreverse, starttime6,duration6)
                }
                async function processchromaticFragmentedVideo(){
                    await processFragmentedVideo('./songlist/' + songname1 +'.mp4',"1.mp4", isreverse, duration1, 1)
                    await processFragmentedVideo('./songlist/' + songname2 +'.mp4',"2.mp4", isreverse, duration2, 2)
                    await processFragmentedVideo('./songlist/' + songname3 +'.mp4',"3.mp4", isreverse, duration3, 4)
                    await processFragmentedVideo('./songlist/' + songname4 +'.mp4',"4.mp4", isreverse, duration4, 7)
                    await processFragmentedVideo('./songlist/' + songname5 +'.mp4',"5.mp4", isreverse, duration5, 11)
                    await processFragmentedVideo('./songlist/' + songname6 +'.mp4',"6.mp4", isreverse, duration6, 12)
                }
            } catch (error){
                console.error(error);
            }
            }
            //called when duo is chosen
            async function prepareduo(){
                realname = ""
                starttime1 = 0
                starttime2 = 0
                if(isspecial){
                    await gettwosongs("partysongnames.txt")
                    //modifier = modifier + "SPECIAL "
                }else{
                await gettwosongs("songnames.txt")
                }
                await checkduomodifiers()
                await getheardlenumber()
                if (isfragmented) {
                    await processDuoFragmentedVideo()
                } else {
                    await processduovideo()
                }

                message.channel.send("Processing Done!\nThe Cytus Heardle number is " + heardlenumber)
                doBackgroundStuff()


                function gettwosongs(filename){
                    return new Promise((resolve, reject) => {
                    fs.readFile(filename, "utf-8", function(err, data){
                        if(err) {
                            throw err;
                        }
                    
                        // note: this assumes `data` is a string - you may need
                        //       to coerce it - see the comments for an approach
                        var lines = data.split('\n');
                        
                        //while(ready == 0){
                        // choose one of the lines...
                        var line = lines[Math.floor(Math.random()*lines.length)]
                        line = line.substring(0,line.length-1)
                        line = line.split("=")
                        songname1 = line[0]
                        realname1 = line[1]
                        character1 = line[2]
                        difficulty1 = line[3]

                        line = lines[Math.floor(Math.random()*lines.length)]
                        line = line.substring(0,line.length-1)
                        line = line.split("=")
                        songname2 = line[0]
                        realname2 = line[1]
                        character2 = line[2]
                        difficulty2 = line[3]
                        console.log("random songs chosen were " + songname1 + ", " + songname2)
                        resolve()
                        })
                    })
                }
                async function checkduomodifiers(){
                    try{
                    if (isscrambled){
                        starttime1 = await getScrambled('./songlist/' + songname1 +'.mp4')
                        starttime2 = await getScrambled('./songlist/' + songname2 +'.mp4')
                        console.log("the starttimes are " + starttime1 + " and " + starttime2)
                        }
                    if(ishardmode){
                        duration1 = .5
                        duration2 = 1
                        duration3 = 2
                        duration4 = 3.5
                        duration5 = 5.5
                        duration6 = 8
                    }
                } catch (error) {
                    console.error("An error occurred:", error);
                }
                }
                async function processduovideo(){
                    try{
                    await processvideo('./songlist/'+songname1+'.mp4', '1a.mp4', isreverse, starttime1, duration1/2);
                    await processvideo('./songlist/'+songname2+'.mp4', '1b.mp4', isreverse, starttime2, duration1/2)
                    await processvideo('./songlist/'+songname1+'.mp4', '2a.mp4', isreverse, starttime1 + duration1, (duration2 - duration1)/2)
                    await processvideo('./songlist/'+songname2+'.mp4', '2b.mp4', isreverse, starttime2 + duration1, (duration2 - duration1)/2)
                    await processvideo('./songlist/'+songname1+'.mp4', '3a.mp4', isreverse, starttime1 + duration2, (duration3 - duration2)/2)
                    await processvideo('./songlist/'+songname2+'.mp4', '3b.mp4', isreverse, starttime2 + duration2, (duration3 - duration2)/2)
                    await processvideo('./songlist/'+songname1+'.mp4', '4a.mp4', isreverse, starttime1 + duration3, (duration4 - duration3)/2)
                    await processvideo('./songlist/'+songname2+'.mp4', '4b.mp4', isreverse, starttime2 + duration3, (duration4 - duration3)/2)
                    await processvideo('./songlist/'+songname1+'.mp4', '5a.mp4', isreverse, starttime1 + duration4, (duration5 - duration4)/2)
                    await processvideo('./songlist/'+songname2+'.mp4', '5b.mp4', isreverse, starttime2 + duration4, (duration5 - duration4)/2)
                    await processvideo('./songlist/'+songname1+'.mp4', '6a.mp4', isreverse, starttime1 + duration5, (duration6 - duration5)/2)
                    await processvideo('./songlist/'+songname2+'.mp4', '6b.mp4', isreverse, starttime2 + duration5, (duration6 - duration5)/2)
                    await combinevideo('./1a.mp4', './1b.mp4', './1.mp4')
                    await combinevideo('./2a.mp4', './2b.mp4', './2c.mp4')
                    await combinevideo('./1.mp4', './2c.mp4', './2.mp4')
                    await combinevideo('./3a.mp4', './3b.mp4', './3c.mp4')
                    await combinevideo('./2.mp4', './3c.mp4', './3.mp4')
                    await combinevideo('./4a.mp4', './4b.mp4', './4c.mp4')
                    await combinevideo('./3.mp4', './4c.mp4', './4.mp4')
                    await combinevideo('./5a.mp4', './5b.mp4', './5c.mp4')
                    await combinevideo('./4.mp4', './5c.mp4', './5.mp4')
                    await combinevideo('./6a.mp4', './6b.mp4', './6c.mp4')
                    await combinevideo('./5.mp4', './6c.mp4', './6.mp4')
                    console.log("processing done lets go I think")
                    }  catch (error){
                        console.error(error);
                    }
             
                }
                async function processDuoFragmentedVideo(){
                    try{
                        await processFragmentedVideo('./songlist/'+songname1+'.mp4', '1a.mp4', isreverse, duration1/2, 1);
                        await processFragmentedVideo('./songlist/'+songname2+'.mp4', '1b.mp4', isreverse, duration1/2, 1)
                        await processFragmentedVideo('./songlist/'+songname1+'.mp4', '2a.mp4', isreverse, (duration2 - duration1)/2, 1)
                        await processFragmentedVideo('./songlist/'+songname2+'.mp4', '2b.mp4', isreverse, (duration2 - duration1)/2, 1)
                        await processFragmentedVideo('./songlist/'+songname1+'.mp4', '3a.mp4', isreverse, (duration3 - duration2)/2, 1)
                        await processFragmentedVideo('./songlist/'+songname2+'.mp4', '3b.mp4', isreverse, (duration3 - duration2)/2, 1)
                        await processFragmentedVideo('./songlist/'+songname1+'.mp4', '4a.mp4', isreverse, (duration4 - duration3)/2, 1)
                        await processFragmentedVideo('./songlist/'+songname2+'.mp4', '4b.mp4', isreverse, (duration4 - duration3)/2, 1)
                        await processFragmentedVideo('./songlist/'+songname1+'.mp4', '5a.mp4', isreverse, (duration5 - duration4)/2, 1)
                        await processFragmentedVideo('./songlist/'+songname2+'.mp4', '5b.mp4', isreverse, (duration5 - duration4)/2, 1)
                        await processFragmentedVideo('./songlist/'+songname1+'.mp4', '6a.mp4', isreverse, (duration6 - duration5)/2, 1)
                        await processFragmentedVideo('./songlist/'+songname2+'.mp4', '6b.mp4', isreverse, (duration6 - duration5)/2, 1)
                        await combinevideo('./1a.mp4', './1b.mp4', './1.mp4')
                        await combinevideo('./2a.mp4', './2b.mp4', './2c.mp4')
                        await combinevideo('./1.mp4', './2c.mp4', './2.mp4')
                        await combinevideo('./3a.mp4', './3b.mp4', './3c.mp4')
                        await combinevideo('./2.mp4', './3c.mp4', './3.mp4')
                        await combinevideo('./4a.mp4', './4b.mp4', './4c.mp4')
                        await combinevideo('./3.mp4', './4c.mp4', './4.mp4')
                        await combinevideo('./5a.mp4', './5b.mp4', './5c.mp4')
                        await combinevideo('./4.mp4', './5c.mp4', './5.mp4')
                        await combinevideo('./6a.mp4', './6b.mp4', './6c.mp4')
                        await combinevideo('./5.mp4', './6c.mp4', './6.mp4')
                        console.log("processing done lets go I think")
                        }  catch (error){
                            console.error(error);
                        }
                }
                async function doBackgroundStuff(){
                    try{
                        console.log("processing 30 sec has started")
                        thirtysecduration = 7
                        if(ishardmode){
                            thirtysecduration = thirtysecduration/2
                        }
                        await processvideo('./songlist/'+songname1+'.mp4', './30seca.mp4', isreverse, starttime1+16, thirtysecduration)
                        await processvideo('./songlist/'+songname2+'.mp4', './30secb.mp4', isreverse, starttime2+16,thirtysecduration)
                        await combinevideo('./30seca.mp4', './30secb.mp4', './30secc.mp4')
                        await combinevideo('./6.mp4', './30secc.mp4', './30sec.mp4')       
                        console.log("power up processing done lets go. I think")
                        powerup30secondprocessed = true

                    //deletes the uselesss videos
                    console.log('Deleting the useless videos...');
                    fs.unlink('./1a.mp4', (err) => {
                        if (err) {
                        console.log(err);
                        } else {
                        
                        }
                    });
                    fs.unlink('./1b.mp4', (err) => {
                        if (err) {
                        console.log(err);
                        } else {
                        
                        }
                    });
                    fs.unlink('./2a.mp4', (err) => {
                        if (err) {
                        console.log(err);
                        } else {
                        
                        }
                    });
                    fs.unlink('./2b.mp4', (err) => {
                        if (err) {
                        console.log(err);
                        } else {
                        
                        }
                    });
                    fs.unlink('./2c.mp4', (err) => {
                        if (err) {
                        console.log(err);
                        } else {
                        
                        }
                    });
                    fs.unlink('./3a.mp4', (err) => {
                        if (err) {
                        console.log(err);
                        } else {
                        
                        }
                    });
                    fs.unlink('./3b.mp4', (err) => {
                        if (err) {
                        console.log(err);
                        } else {
                        
                        }
                    });
                    fs.unlink('./3c.mp4', (err) => {
                        if (err) {
                        console.log(err);
                        } else {
                        
                        }
                    });
                    fs.unlink('./4a.mp4', (err) => {
                        if (err) {
                        console.log(err);
                        } else {
                        
                        }
                    });
                    fs.unlink('./4b.mp4', (err) => {
                        if (err) {
                        console.log(err);
                        } else {
                        
                        }
                    });
                    fs.unlink('./4c.mp4', (err) => {
                        if (err) {
                        console.log(err);
                        } else {
                        
                        }
                    });
                    fs.unlink('./5a.mp4', (err) => {
                        if (err) {
                        console.log(err);
                        } else {
                        
                        }
                    });
                    fs.unlink('./5b.mp4', (err) => {
                        if (err) {
                        console.log(err);
                        } else {
                        
                        }
                    });
                    fs.unlink('./5c.mp4', (err) => {
                        if (err) {
                        console.log(err);
                        } else {
                        
                        }
                    });
                    fs.unlink('./6a.mp4', (err) => {
                        if (err) {
                        console.log(err);
                        } else {
                        
                        }
                    });
                    fs.unlink('./6b.mp4', (err) => {
                        if (err) {
                        console.log(err);
                        } else {
                        
                        }
                    });
                    fs.unlink('./6c.mp4', (err) => {
                        if (err) {
                        console.log(err);
                        } else {
                        
                        }
                    });
                    fs.unlink('./30seca.mp4', (err) => {
                        if (err) {
                        console.log(err);
                        } else {
                        
                        }
                    });
                    fs.unlink('./30secb.mp4', (err) => {
                        if (err) {
                        console.log(err);
                        } else {
                        
                        }
                    });
                    fs.unlink('./30secc.mp4', (err) => {
                        if (err) {
                        console.log(err);
                        } else {
                        
                        }
                    });
                    } catch (error){
                        console.error(error)
                    }
                }

            }
            
            //called when quad is chosen
            async function preparequad(){
                realname = ""
                starttime1 = 0
                starttime2 = 0
                starttime3 = 0
                starttime4 = 0
                if(isspecial){
                    await getfoursongs("partysongnames.txt")
                    //modifier = modifier + "SPECIAL "
                }else{
                await getfoursongs("songnames.txt")
                }
                await checkquadmodifiers()
                await getheardlenumber()
                if (isfragmented) {
                    await processQuadFragmentedVideo();
                } else {
                    await processquadvideo()
                }
                message.channel.send("Processing Done!\nThe Cytus Heardle number is " + heardlenumber)
                doBackgroundStuff()

                function getfoursongs(filename){
                    return new Promise((resolve, reject) => {
                    fs.readFile(filename, "utf-8", function(err, data){
                        if(err) {
                            throw err;
                        }
                    
                        // note: this assumes `data` is a string - you may need
                        //       to coerce it - see the comments for an approach
                        var lines = data.split('\n');
                        
                        //while(ready == 0){
                        // choose one of the lines...
                        var line = lines[Math.floor(Math.random()*lines.length)]
                        line = line.substring(0,line.length-1)
                        line = line.split("=")
                        songname1 = line[0]
                        realname1 = line[1]
                        character1 = line[2]
                        difficulty1 = line[3]

                        line = lines[Math.floor(Math.random()*lines.length)]
                        line = line.substring(0,line.length-1)
                        line = line.split("=")
                        songname2 = line[0]
                        realname2 = line[1]
                        character2 = line[2]
                        difficulty2 = line[3]

                        line = lines[Math.floor(Math.random()*lines.length)]
                        line = line.substring(0,line.length-1)
                        line = line.split("=")
                        songname3 = line[0]
                        realname3 = line[1]
                        character3 = line[2]
                        difficulty3 = line[3]

                        line = lines[Math.floor(Math.random()*lines.length)]
                        line = line.substring(0,line.length-1)
                        line = line.split("=")
                        songname4 = line[0]
                        realname4 = line[1]
                        character4 = line[2]
                        difficulty4 = line[3]
                        console.log("random songs chosen were " + songname1 + ", " + songname2 + ", " + songname3 + ", " + songname4)
                        resolve()
                        })
                    })
                }

                async function checkquadmodifiers(){
                    try{
                    if (isscrambled){
                        starttime1 = await getScrambled('./songlist/' + songname1 +'.mp4')
                        starttime2 = await getScrambled('./songlist/' + songname2 +'.mp4')
                        starttime3 = await getScrambled('./songlist/' + songname3 +'.mp4')
                        starttime4 = await getScrambled('./songlist/' + songname4 +'.mp4')
                        console.log("the starttimes are " + starttime1 + " and " + starttime2 + " and " + starttime3 + " and " + starttime4)
                        }
                    if(ishardmode){
                        duration1 = .5
                        duration2 = 1
                        duration3 = 2
                        duration4 = 3.5
                        duration5 = 5.5
                        duration6 = 8
                    }
                } catch (error) {
                    console.error("An error occurred:", error);
                }
                }

                async function processquadvideo(){
                    try{
                    await processvideo('./songlist/'+songname1+'.mp4', '1a.mp4', isreverse, starttime1, duration1/4);
                    await processvideo('./songlist/'+songname2+'.mp4', '1b.mp4', isreverse, starttime2, duration1/4);
                    await processvideo('./songlist/'+songname3+'.mp4', '1c.mp4', isreverse, starttime3, duration1/4);
                    await processvideo('./songlist/'+songname4+'.mp4', '1d.mp4', isreverse, starttime4, duration1/4);
                    await processvideo('./songlist/'+songname1+'.mp4', '2a.mp4', isreverse, starttime1 + duration1, (duration2 - duration1)/4)
                    await processvideo('./songlist/'+songname2+'.mp4', '2b.mp4', isreverse, starttime2 + duration1, (duration2 - duration1)/4)
                    await processvideo('./songlist/'+songname3+'.mp4', '2c.mp4', isreverse, starttime3 + duration1, (duration2 - duration1)/4)
                    await processvideo('./songlist/'+songname4+'.mp4', '2d.mp4', isreverse, starttime4 + duration1, (duration2 - duration1)/4)

                    await processvideo('./songlist/'+songname1+'.mp4', '3a.mp4', isreverse, starttime1 + duration2, (duration3 - duration2)/4)
                    await processvideo('./songlist/'+songname2+'.mp4', '3b.mp4', isreverse, starttime2 + duration2, (duration3 - duration2)/4)
                    await processvideo('./songlist/'+songname3+'.mp4', '3c.mp4', isreverse, starttime3 + duration2, (duration3 - duration2)/4)
                    await processvideo('./songlist/'+songname4+'.mp4', '3d.mp4', isreverse, starttime4 + duration2, (duration3 - duration2)/4)

                    await processvideo('./songlist/'+songname1+'.mp4', '4a.mp4', isreverse, starttime1 + duration3, (duration4 - duration3)/4)
                    await processvideo('./songlist/'+songname2+'.mp4', '4b.mp4', isreverse, starttime2 + duration3, (duration4 - duration3)/4)
                    await processvideo('./songlist/'+songname3+'.mp4', '4c.mp4', isreverse, starttime3 + duration3, (duration4 - duration3)/4)
                    await processvideo('./songlist/'+songname4+'.mp4', '4d.mp4', isreverse, starttime4 + duration3, (duration4 - duration3)/4)

                    await processvideo('./songlist/'+songname1+'.mp4', '5a.mp4', isreverse, starttime1 + duration4, (duration5 - duration4)/4)
                    await processvideo('./songlist/'+songname2+'.mp4', '5b.mp4', isreverse, starttime2 + duration4, (duration5 - duration4)/4)
                    await processvideo('./songlist/'+songname3+'.mp4', '5c.mp4', isreverse, starttime3 + duration4, (duration5 - duration4)/4)
                    await processvideo('./songlist/'+songname4+'.mp4', '5d.mp4', isreverse, starttime4 + duration4, (duration5 - duration4)/4)

                    await processvideo('./songlist/'+songname1+'.mp4', '6a.mp4', isreverse, starttime1 + duration5, (duration6 - duration5)/4)
                    await processvideo('./songlist/'+songname2+'.mp4', '6b.mp4', isreverse, starttime2 + duration5, (duration6 - duration5)/4)
                    await processvideo('./songlist/'+songname3+'.mp4', '6c.mp4', isreverse, starttime3 + duration5, (duration6 - duration5)/4)
                    await processvideo('./songlist/'+songname4+'.mp4', '6d.mp4', isreverse, starttime4 + duration5, (duration6 - duration5)/4)

                    await combinevideo('./1a.mp4', './1b.mp4', './1aa.mp4')
                    await combinevideo('./1c.mp4', './1d.mp4', './1bb.mp4')
                    await combinevideo('./1aa.mp4', './1bb.mp4', './1.mp4')

                    await combinevideo('./2a.mp4', './2b.mp4', './2aa.mp4')
                    await combinevideo('./2c.mp4', './2d.mp4', './2bb.mp4')
                    await combinevideo('./2aa.mp4', './2bb.mp4', './2cc.mp4')
                    await combinevideo('./1.mp4', './2cc.mp4', './2.mp4')

                    await combinevideo('./3a.mp4', './3b.mp4', './3aa.mp4')
                    await combinevideo('./3c.mp4', './3d.mp4', './3bb.mp4')
                    await combinevideo('./3aa.mp4', './3bb.mp4', './3cc.mp4')
                    await combinevideo('./2.mp4', './3cc.mp4', './3.mp4')

                    await combinevideo('./4a.mp4', './4b.mp4', './4aa.mp4')
                    await combinevideo('./4c.mp4', './4d.mp4', './4bb.mp4')
                    await combinevideo('./4aa.mp4', './4bb.mp4', './4cc.mp4')
                    await combinevideo('./3.mp4', './4cc.mp4', './4.mp4')

                    await combinevideo('./5a.mp4', './5b.mp4', './5aa.mp4')
                    await combinevideo('./5c.mp4', './5d.mp4', './5bb.mp4')
                    await combinevideo('./5aa.mp4', './5bb.mp4', './5cc.mp4')
                    await combinevideo('./4.mp4', './5cc.mp4', './5.mp4')

                    await combinevideo('./6a.mp4', './6b.mp4', './6aa.mp4')
                    await combinevideo('./6c.mp4', './6d.mp4', './6bb.mp4')
                    await combinevideo('./6aa.mp4', './6bb.mp4', './6cc.mp4')
                    await combinevideo('./5.mp4', './6cc.mp4', './6.mp4')
                    console.log("processing done lets go I think")
                    }  catch (error){
                        console.error(error);
                    }
             
                }

                async function processQuadFragmentedVideo(){
                    try{
                        await processFragmentedVideo('./songlist/'+songname1+'.mp4', '1a.mp4', isreverse, duration1/4, 1);
                        await processFragmentedVideo('./songlist/'+songname2+'.mp4', '1b.mp4', isreverse, duration1/4, 1);
                        await processFragmentedVideo('./songlist/'+songname3+'.mp4', '1c.mp4', isreverse, duration1/4, 1);
                        await processFragmentedVideo('./songlist/'+songname4+'.mp4', '1d.mp4', isreverse, duration1/4, 1);
                        await processFragmentedVideo('./songlist/'+songname1+'.mp4', '2a.mp4', isreverse, (duration2 - duration1)/4, 1)
                        await processFragmentedVideo('./songlist/'+songname2+'.mp4', '2b.mp4', isreverse, (duration2 - duration1)/4, 1)
                        await processFragmentedVideo('./songlist/'+songname3+'.mp4', '2c.mp4', isreverse, (duration2 - duration1)/4, 1)
                        await processFragmentedVideo('./songlist/'+songname4+'.mp4', '2d.mp4', isreverse, (duration2 - duration1)/4, 1)
    
                        await processFragmentedVideo('./songlist/'+songname1+'.mp4', '3a.mp4', isreverse, (duration3 - duration2)/4, 1)
                        await processFragmentedVideo('./songlist/'+songname2+'.mp4', '3b.mp4', isreverse, (duration3 - duration2)/4, 1)
                        await processFragmentedVideo('./songlist/'+songname3+'.mp4', '3c.mp4', isreverse, (duration3 - duration2)/4, 1)
                        await processFragmentedVideo('./songlist/'+songname4+'.mp4', '3d.mp4', isreverse, (duration3 - duration2)/4, 1)
    
                        await processFragmentedVideo('./songlist/'+songname1+'.mp4', '4a.mp4', isreverse, (duration4 - duration3)/4, 1)
                        await processFragmentedVideo('./songlist/'+songname2+'.mp4', '4b.mp4', isreverse, (duration4 - duration3)/4, 1)
                        await processFragmentedVideo('./songlist/'+songname3+'.mp4', '4c.mp4', isreverse, (duration4 - duration3)/4, 1)
                        await processFragmentedVideo('./songlist/'+songname4+'.mp4', '4d.mp4', isreverse, (duration4 - duration3)/4, 1)
    
                        await processFragmentedVideo('./songlist/'+songname1+'.mp4', '5a.mp4', isreverse, (duration5 - duration4)/4, 1)
                        await processFragmentedVideo('./songlist/'+songname2+'.mp4', '5b.mp4', isreverse, (duration5 - duration4)/4, 1)
                        await processFragmentedVideo('./songlist/'+songname3+'.mp4', '5c.mp4', isreverse, (duration5 - duration4)/4, 1)
                        await processFragmentedVideo('./songlist/'+songname4+'.mp4', '5d.mp4', isreverse, (duration5 - duration4)/4, 1)
    
                        await processFragmentedVideo('./songlist/'+songname1+'.mp4', '6a.mp4', isreverse, (duration6 - duration5)/4, 1)
                        await processFragmentedVideo('./songlist/'+songname2+'.mp4', '6b.mp4', isreverse, (duration6 - duration5)/4, 1)
                        await processFragmentedVideo('./songlist/'+songname3+'.mp4', '6c.mp4', isreverse, (duration6 - duration5)/4, 1)
                        await processFragmentedVideo('./songlist/'+songname4+'.mp4', '6d.mp4', isreverse, (duration6 - duration5)/4, 1)
    
                        await combinevideo('./1a.mp4', './1b.mp4', './1aa.mp4')
                        await combinevideo('./1c.mp4', './1d.mp4', './1bb.mp4')
                        await combinevideo('./1aa.mp4', './1bb.mp4', './1.mp4')
    
                        await combinevideo('./2a.mp4', './2b.mp4', './2aa.mp4')
                        await combinevideo('./2c.mp4', './2d.mp4', './2bb.mp4')
                        await combinevideo('./2aa.mp4', './2bb.mp4', './2cc.mp4')
                        await combinevideo('./1.mp4', './2cc.mp4', './2.mp4')
    
                        await combinevideo('./3a.mp4', './3b.mp4', './3aa.mp4')
                        await combinevideo('./3c.mp4', './3d.mp4', './3bb.mp4')
                        await combinevideo('./3aa.mp4', './3bb.mp4', './3cc.mp4')
                        await combinevideo('./2.mp4', './3cc.mp4', './3.mp4')
    
                        await combinevideo('./4a.mp4', './4b.mp4', './4aa.mp4')
                        await combinevideo('./4c.mp4', './4d.mp4', './4bb.mp4')
                        await combinevideo('./4aa.mp4', './4bb.mp4', './4cc.mp4')
                        await combinevideo('./3.mp4', './4cc.mp4', './4.mp4')
    
                        await combinevideo('./5a.mp4', './5b.mp4', './5aa.mp4')
                        await combinevideo('./5c.mp4', './5d.mp4', './5bb.mp4')
                        await combinevideo('./5aa.mp4', './5bb.mp4', './5cc.mp4')
                        await combinevideo('./4.mp4', './5cc.mp4', './5.mp4')
    
                        await combinevideo('./6a.mp4', './6b.mp4', './6aa.mp4')
                        await combinevideo('./6c.mp4', './6d.mp4', './6bb.mp4')
                        await combinevideo('./6aa.mp4', './6bb.mp4', './6cc.mp4')
                        await combinevideo('./5.mp4', './6cc.mp4', './6.mp4')
                        console.log("processing done lets go I think")
                        }  catch (error){
                            console.error(error);
                        }
                }
                async function doBackgroundStuff(){
                    deleteFile("6cc.mp4")
                    deleteFile("6aa.mp4")
                    deleteFile("6bb.mp4")
                    deleteFile("5bb.mp4")
                    deleteFile("5cc.mp4")
                    deleteFile("5aa.mp4")
                    deleteFile("4bb.mp4")
                    deleteFile("4cc.mp4")
                    deleteFile("3cc.mp4")
                    deleteFile("4aa.mp4")
                    deleteFile("3aa.mp4")
                    deleteFile("3bb.mp4")
                    deleteFile("2aa.mp4")
                    deleteFile("2bb.mp4")
                    deleteFile("2cc.mp4")
                    deleteFile("1aa.mp4")
                    deleteFile("1bb.mp4")
                    deleteFile("6c.mp4")
                    deleteFile("5c.mp4")
                    deleteFile("6a.mp4")
                    deleteFile("6b.mp4")
                    deleteFile("5a.mp4")
                    deleteFile("5b.mp4")
                    deleteFile("3a.mp4")
                    deleteFile("3b.mp4")
                    deleteFile("3c.mp4")
                    deleteFile("4a.mp4")
                    deleteFile("4b.mp4")
                    deleteFile("4c.mp4")
                    deleteFile("1a.mp4")
                    deleteFile("1b.mp4")
                    deleteFile("2a.mp4")
                    deleteFile("2b.mp4")
                    deleteFile("2c.mp4")
                    deleteFile("6d.mp4")
                    deleteFile("5d.mp4")
                    deleteFile("4d.mp4")
                    deleteFile("2d.mp4")
                    deleteFile("3d.mp4")
                    deleteFile("1c.mp4")
                    deleteFile("1d.mp4")
                }
            }
                
            //gets a random time 
            function preparescrambled(){
                return new Promise((resolve, reject) => {
                ffmpeg.ffprobe('./songlist/' + songname +'.mp4', function(err, metadata) {
                    if (err){
                        reject(err);
                    } else {
                    songduration = metadata.format.duration
                    console.log(songduration)
                    songduration = songduration - 15
                    console.log(songduration)
                    gamemode = "scrambled"
                    isscrambled = true
                    resolve()
                    }
                });
            })
            }
            //sets the duration variables to hard mode ones
            function preparehardmode(){
                duration1 = .5
                duration2 = 1
                duration3 = 2
                duration4 = 3.5
                duration5 = 5.5
                duration6 = 8
            }


            break;
        case 'send':
            console.log("starttime = " + starttime)
            if (starttime == 0){
                //gamemode = "solo"
                //modifier = ""
            }
            newanswer = songname
            displayedanswer = realname
            console.log("The song about to be sent is called: " + songname + " or " + realname)
            function getminutesandseconds(starttime){
                minutes = 0
                if (starttime > 60){
                    starttime = starttime -60
                    minutes = minutes + 1
                    if (starttime > 60){
                        starttime = starttime -60
                        minutes = minutes + 1
                        if (starttime > 60){
                            starttime = starttime -60
                            minutes = minutes + 1
                            if (starttime > 60){
                                starttime = starttime -60
                                minutes = minutes + 1
                                if (starttime > 60){
                                    starttime = starttime -60
                                    minutes = minutes + 1
                                    if (starttime > 60){
                                        starttime = starttime -60
                                        minutes = minutes + 1
                                        if (starttime > 60){
                                            starttime = starttime -60
                                            minutes = minutes + 1
                                        } 
                                    } 
                                } 
                            } 
                        } 
                    } 
                } 
                seconds = Math.trunc(starttime)
                //console.log("seconds = " + seconds)
                if (seconds == "1" || seconds == "2" || seconds == "3" || seconds == "4" || seconds == "5" || seconds == "6" || seconds == "7" || seconds == "8" || seconds == "9" || seconds == "0"){
                    scrambledtime = " (" + minutes + ":0" + seconds + ")"
                }else{
                    scrambledtime = " (" + minutes + ":" + seconds + ")"
                }
                //console.log(displayedanswer)
                return scrambledtime
            }
            if(ischromatic){
                if(isscrambled){
                timestamp1 = getminutesandseconds(starttime1)
                timestamp2 = getminutesandseconds(starttime2)
                timestamp3 = getminutesandseconds(starttime3)
                timestamp4 = getminutesandseconds(starttime4)
                timestamp5 = getminutesandseconds(starttime5)
                timestamp6 = getminutesandseconds(starttime6)
                sleep(500).then(() =>{displayedanswer = realname1 + timestamp1 + " & " + realname2 + timestamp2 + " & " + realname3 + timestamp3 + " & " + realname4 + timestamp4 + " & " + realname5 + timestamp5 + " & " + realname6 + timestamp6})
                }else{
                    displayedanswer = realname1 + " & " + realname2 + " & " + realname3 + " & " + realname4 + " & " + realname5 + " & " + realname6
                }

            }else if (isduo){
                if (isscrambled){
                    timestamp1 = getminutesandseconds(starttime1)
                    timestamp2 = getminutesandseconds(starttime2)
                    sleep(500).then(() =>{displayedanswer = realname1 + timestamp1 + " & " + realname2 + timestamp2})
                }else{
                  displayedanswer = realname1 + " & " + realname2  
                }
            } else if (isquad) {
                if (isscrambled) {
                    timestamp1 = getminutesandseconds(starttime1)
                    timestamp2 = getminutesandseconds(starttime2)
                    timestamp3 = getminutesandseconds(starttime3)
                    timestamp4 = getminutesandseconds(starttime4)
                    sleep(500).then(() =>{displayedanswer = realname1 + timestamp1 + " & " + realname2 + timestamp2 + " & " + realname3 + timestamp3 + " & " + realname4 + timestamp4})
                } else {
                    displayedanswer = realname1 + " & " + realname2 + " & " + realname3 + " & " + realname4  
                }
            }else if (isscrambled){
                timestamp = getminutesandseconds(starttime)
                displayedanswer = displayedanswer + timestamp
            }
            cooldownprocess()
            getheardlenumber()
            numofspaces = Math.random()*75 + 25
            numofspaces = Math.trunc(numofspaces)
            space = ""
            for (i=0;i<numofspaces;i++){
                space = space + " "
            }
            channelid = CytusHeardleWareHouseID
            sleep(10).then(() => {client.channels.cache.get(channelid).send(modifier + "Cytus Heardle #" + heardlenumber + ":")})
            increasenumber()
            sleep(1000).then(() => {client.channels.cache.get(channelid).send({files: ['./1.mp4']}) })
            sleep(2000).then(() => {client.channels.cache.get(channelid).send({files: ['./2.mp4']}) })
            sleep(3000).then(() => {client.channels.cache.get(channelid).send({files: ['./3.mp4']}) })
            sleep(4000).then(() => {client.channels.cache.get(channelid).send({files: ['./4.mp4']}) })
            sleep(5000).then(() => {client.channels.cache.get(channelid).send({files: ['./5.mp4']}) })
            sleep(6000).then(() => {client.channels.cache.get(channelid).send({files: ['./6.mp4']}) })
            sleep(10000).then(() => { client.channels.cache.get(channelid).send("Answer: ||" + displayedanswer + space + "||") })
            storeCytusHeardleInfo()
            break;
        case 'help':
            help = message.content
            if (help.length == 5){
            message.channel.send("How to write songs with special/japanese characters:\n"
            +"(1) Alterna Pt.1 -Cosmogony- (Neko) -> alternapt1\n(2) 響け！(Neko) -> sound\n(3) 気楽なCloudy (Neko) -> carefreecloudy\n(4) Re:VeLΔTiØN ～光道ト破壊ノ双白翼～ (Neko) -> revelation (Re:VeLΔTiØN ~Twin White Wings Destroying the Light Path~ )\n(5) paradigm-paragramme-program (Neko) -> paradigm\n(6) βinαrΨ (Crystal Punk) -> binary\n(7) 眷戀 (Crystal Punk)-> familylove\n(8) still (piano version) (Crystal Punk) -> stillpianoversion\n(9) 黎明-REIMEI- (Bobo) -> dawnreimei\n(10) バステット (Cytus II Edit) (Bobo) -> bastet\n" 
            + "そんなに私を期待させないで (Graff.j) -> Dont expect so much\nNyx -Fatal arousal of Madness- (Graff.j) -> nyx\npopotnik ~ The Traveller of Ljubljana (Graff.j) -> popotnik\n粉骨砕身カジノゥ(Funkotsu Saishin Casino) (Graff.j) -> casino\n非・現実逃避 (Graff.j) -> Unreality escape\n非・現実逃避 Rabpit Remix (Graff.j) -> unreality escape rabpit remix\n" 
            + "IɅVɅVI (Ilka) -> iavavi\n"
            + "(11) legacy (Alice) -> legacy2\n(12) 都市の呼吸 (Alice)-> breathofthecity\n(13) new world (Kizuna Ai) -> newworld2\n(14) ラッキー☆オーブ(Miku) -> luckyorb\n(15) 魔法みたいなミュージック！(Miku)-> musiclikemagic\n(16) 月西江(Miku) -> moonwestriver (yuexiriver)\n(17) ラッキー☆オーブ(3R2 Remix)(Miku) -> luckyorb3r2remix\n(18) Ultimate feat. 放課後のあいつ (Xenon) -> ultimatefeat\n(19) 三灯火 (Rin) -> threelights\n(20) 「妖怪録、我し来にけり。」(Rin) -> yokairock\n(21) すゝめ☆クノイチの巻 (Rin) -> goaheadkunoichi\n(22) 彩 (Rin) -> leafygreen\n(23) 決戦 (Rin) -> decisivebattle\n(24) 漂流 (Aroma) -> drifting\n(25) 風の声 (Aroma) -> thewindsvoice\n(26) 一啖兩啖 (Neko) -> onebitetwobites\n(27) リラ (Neko) -> lira\n(28) Re:incRnaTiØN ～夕焼ケ世界ノ決別ヲ～ (Neko) -> reincarnation (Re:incRnaTiØN ~Farewell to the Yuyakeke World~)\n")
            } else{
                if (help.length>=7){
                helpindex = help.substring(6, help.length)
                //console.log(helpindex)
                message.channel.send("-g " + songcorrection[helpindex])
                }


            }


            break;
        case 'set':
            //answer = message.content
            //answer = answer.substring(5, answer.length)
            console.log("The -set command was run")
            //newsongprocess("songnames.txt", "songcooldown.txt")
            setname = message.content
            setname = setname.substring(5, setname.length)
            setname = setname.toLowerCase();
            newsetname = ""
            for (i=0; i < setname.length; i++) {
                if (setname[i] == " "||setname[i] == "\'" || setname[i] == "."|| setname[i] == "-" || setname[i] == "~"){
                    newsetname = newsetname;
                }else{
                    newsetname = newsetname + setname[i];
                }
            }
            songname = newsetname
            processsetvideo(newsetname)
            console.log("The name is " + newsetname)
            getheardlenumber()

            function processsetvideo(set){
                starttime = 0
                //1 second
                ffmpeg({source: './songlist/' + set +'.mp4'}) 
                .setStartTime(starttime)
                .duration(1) 
                .on('start',function(commandLine){
                    console.log("Processing has started. Hopefully it works :-)")
                    message.channel.send("Processing has started")
                })
                .on('error',function(err){
                    console.log("ok what the crap: ", + err)
                    message.channel.send("There was an error:" + err)
                })
                .on('end',function(err){
                    console.log("processing done lets go")
                    //message.channel.send("1st video done")
                })
                .saveToFile("1.mp4")
    
                // 2 seonds
                ffmpeg({source: './songlist/' + set +'.mp4'}) 
                .setStartTime(starttime)
                .duration(2) 
                .on('start',function(commandLine){
                    console.log("Processing has started. Hopefully it works :-)")
                })
                .on('error',function(err){
                    console.log("ok what the crap: ", + err)
                    message.channel.send("There was an error:" + err)
                })
                .on('end',function(err){
                    console.log("processing done lets go")
                    //message.channel.send("2nd video done")
                })
                .saveToFile("2.mp4")
    
                //4 seconds
                ffmpeg({source:'./songlist/' + set +'.mp4'}) 
                .setStartTime(starttime)
                .duration(4) 
                .on('start',function(commandLine){
                    console.log("Processing has started. Hopefully it works :-)")
                })
                .on('error',function(err){
                    console.log("ok what the crap: ", + err)
                    message.channel.send("bruh there was an error:" + err)
                })
                .on('end',function(err){
                    console.log("processing done lets go")
                    //message.channel.send("3rd video done")
                })
                .saveToFile("3.mp4")
    
                //7 seconds
                ffmpeg({source:'./songlist/' + set +'.mp4'}) 
                .setStartTime(starttime)
                .duration(7) 
                .on('start',function(commandLine){
                    console.log("Processing has started. Hopefully it works :-)")
                })
                .on('error',function(err){
                    console.log("ok what the crap: ", + err)
                    message.channel.send("There was an error:" + err)
                })
                .on('end',function(err){
                    console.log("processing done lets go")
                    //message.channel.send("4th video done")
                })
                .saveToFile("4.mp4")
    
                //11 seconds
                ffmpeg({source:'./songlist/' + set +'.mp4'}) 
                .setStartTime(starttime)
                .duration(11) 
                .on('start',function(commandLine){
                    console.log("Processing has started. Hopefully it works :-)")
                })
                .on('error',function(err){
                    console.log("ok what the crap: ", + err)
                    message.channel.send("There was an error:" + err)
                })
                .on('end',function(err){
                    console.log("processing done lets go")
                    //message.channel.send("5th video done")
                })
                .saveToFile("5.mp4")
    
                //16 seconds
                ffmpeg({source:'./songlist/' + set +'.mp4'}) 
                .setStartTime(starttime)
                .duration(16) 
                .on('start',function(commandLine){
                    console.log("Processing has started. Hopefully it works :-)")
                })
                .on('error',function(err){
                    console.log("ok what the crap: ", + err)
                    message.channel.send("There was an error:" + err)
                })
                .on('end',function(err){
                    console.log("processing done lets go")
                    message.channel.send("processing done lets go")
                    message.channel.send('The Cytus Heardle number is ' + heardlenumber)
                })
                .saveToFile("6.mp4")
                }
            break;
        case 'setnumber':
            number = message.content
            number = number.substring(11, message.length)
            fs.readFile("heardlenumber.txt", "utf-8", function(err, data){
                if(err) {
                    throw err;
                }
                console.log("set Cytus Heardle number to " + number)
                message.channel.send("set Cytus Heardle number to " + number)
                fs.writeFile("heardlenumber.txt", number, function(err, data) { if (err) {console.log("Error when writing the number")} });

             })
            break;
        case 'fullsong':
            if (fullsongprocessed == 0){
            ffmpeg({source: './songlist/' + songname +'.mp4'}) 
            .setStartTime(0)
            .on('start',function(commandLine){
                console.log("Processing has started. Hopefully it works :-)")
                message.channel.send("Processing has started, it will send once it's done")
            })
            .on('error',function(err){
                console.log("ok what the crap: ", + err)
                message.channel.send("There was an error" + err)
            })
            .on('end',function(err){
                //console.log("processing done lets go")
                //message.channel.send("1st video done")
                message.channel.send({files: ['./fullsong.mp4']})
            })
            .saveToFile("fullsong.mp4")
            fullsongprocessed = 1
            }else{
                message.channel.send({files: ['./fullsong.mp4']})
            }
            
             break;
        case 'playsong':
            playsong = message.content
            if (playsong.length >=11){
                playsong = playsong.substring(10,playsong.length)
                if(playsong == "random"){
                    fs.readFile("songnames.txt", "utf-8", function(err, data){
                        if(err) {
                            throw err;
                        }
                    
                        // note: this assumes `data` is a string - you may need
                        //       to coerce it - see the comments for an approach
                        var lines = data.split('\n');
                        
                        //while(ready == 0){
                        // choose one of the lines...
                        var line = lines[Math.floor(Math.random()*lines.length)]
                  
                  
                        //line = line.substring(0,line.length-1)
                  
                        line = line.split('=')
                        //console.log(line)
                        playsong = line[0]
                        filepath = "./songlist/" + playsong + ".mp4"
                        fs.access(filepath, fs.constants.F_OK, (err) => {
                        if (err) {
                        // File does not exist
                        message.channel.send('Cannot find file');
                        }else{
                            message.channel.send({files: [filepath]});
                        }
                        })
                    })
                }else{
                filepath = "./songlist/" + playsong + ".mp4"
                fs.access(filepath, fs.constants.F_OK, (err) => {
                    if (err) {
                      // File does not exist
                      message.channel.send('Cannot find file');
                    }else{
                        message.channel.send({files: [filepath]});
                    }
                    })
                }
            }else{
                //message.channel.send("enter the name of a song (no spaces, all lowercase)")
                message.channel.send({files: ["none.mp4"]})
            }
            break;
        case 'party':
                partysong = ""
                partyanswer = ""
                duration1 = 1
                duration2 = 2
                duration3 = 4
                duration4 = 7
                duration5 = 11
                duration6 = 16
                ispscrambled = false
                filename = "songnames.txt"
                partyfolder = './songlist/'
                partysongduration = songduration

                function partygetmodifiers(){
                fs.readFile("partysettings.txt", "utf-8", function(err, data){
                    if(err) {
                        throw err;
                    }
                
                    // note: this assumes `data` is a string - you may need
                    //       to coerce it - see the comments for an approach
                    var lines = data.split('\n');
              
              
                    //line = line.substring(0,line.length-1)
                    
                    //console.log(lines)
                    //psendone = lines[0].substring(0,lines[0].length-1) //because theres some stupid \r behind it
                    psendone = lines[0]
                    psendone = (psendone === "true")
                    pscrambledchance = lines[1]
                    phardchance = lines[2]
                    pchromaticchance= lines[3]
                    pspecialchance = lines[4]
                    console.log(psendone)
                    if (psendone == true){
                        sendsetting = "One at a time"
                    }else{
                        sendsetting = "All at once"
                    }
                    console.log(sendsetting)
            })
        }

        function partyvideoprocess(){
                random = Math.random()*100
                console.log("Special: " + random)
                if (random <= pspecialchance){
                    filename = "partysongnames.txt"
                }
                
               getrandompartysong()
                random = Math.random()*100
                console.log("Scrambled: " + random)
               if (random <= pscrambledchance){
                ispscrambled = true
               sleep(500).then(() => preparepartyscrambled())
               }

               random = Math.random()*100
               console.log("Hard: " + random)
               if (random <= phardchance){
                preparepartyhard()
               }
               sleep(2500).then(() => {processpartyvideo()})

               function getrandompartysong(){
                fs.readFile(filename, "utf-8", function(err, data){
                    if(err) {
                        throw err;
                    }
                
                    // note: this assumes `data` is a string - you may need
                    //       to coerce it - see the comments for an approach
                    var lines = data.split('\n');
                    
                    
                    // choose one of the lines...
                    var line = lines[Math.floor(Math.random()*lines.length)]
                    line = line.split('=')
                    // invoke the callback with our line
                    //console.log(line);

                    partysong = line[0]
                    realpartysongname = line[1]
                 })
                }
                 function preparepartyscrambled(){
                    console.log("partysong is : " + partysong)
                    ffmpeg.ffprobe(partyfolder + partysong +'.mp4', function(err, metadata) {
                        if(err) {
                            console.log("There was an error:" + err)
                            message.channel.send("There was an error:" + err)
                        }
                        //console.dir(metadata); // all metadata
                        partysongduration = metadata.format.duration
                        console.log(partysongduration)
                    });
                    
                }
                function preparepartyhard(){
                duration1 = 0.5
                duration2 = 1
                duration3 = 2
                duration4 = 3.5
                duration5 = 5.5
                duration6 = 8
                }
                function processpartyvideo(){
                    pstarttime = Math.random()*partysongduration
                    console.log(pstarttime)
                    console.log(partyfolder + partysong +'.mp4')
                    //1 second
                    ffmpeg({source: partyfolder + partysong +'.mp4'}) 
                    .setStartTime(pstarttime)
                    .duration(duration1) 
                    .on('start',function(commandLine){
                        console.log("Processing has started. Hopefully it works :-)")
                    })
                    .on('error',function(err){
                        console.log("ok what the crap: ", + err)
                        message.channel.send("There was an error:" + err)
                    })
                    .on('end',function(err){
                        console.log("processing done lets go")
                        //message.channel.send("1st video done")
                    })
                    .saveToFile("party 1.mp4")
        
                    // 2 seonds
                    ffmpeg({source: partyfolder + partysong +'.mp4'}) 
                    .setStartTime(pstarttime)
                    .duration(duration2) 
                    .on('start',function(commandLine){
                        console.log("Processing has started. Hopefully it works :-)")
                    })
                    .on('error',function(err){
                        console.log("ok what the crap: ", + err)
                        message.channel.send("There was an error:" + err)
                    })
                    .on('end',function(err){
                        console.log("processing done lets go")
                        //message.channel.send("2nd video done")
                    })
                    .saveToFile("party 2.mp4")
        
                    //4 seconds
                    ffmpeg({source: partyfolder + partysong +'.mp4'}) 
                    .setStartTime(pstarttime)
                    .duration(duration3) 
                    .on('start',function(commandLine){
                        console.log("Processing has started. Hopefully it works :-)")
                    })
                    .on('error',function(err){
                        console.log("ok what the crap: ", + err)
                        message.channel.send("bruh there was an error:" + err)
                    })
                    .on('end',function(err){
                        console.log("processing done lets go")
                        //message.channel.send("3rd video done")
                    })
                    .saveToFile("party 3.mp4")
        
                    //7 seconds
                    ffmpeg({source: partyfolder + partysong +'.mp4'}) 
                    .setStartTime(pstarttime)
                    .duration(duration4) 
                    .on('start',function(commandLine){
                        console.log("Processing has started. Hopefully it works :-)")
                    })
                    .on('error',function(err){
                        console.log("ok what the crap: ", + err)
                        message.channel.send("There was an error:" + err)
                    })
                    .on('end',function(err){
                        console.log("processing done lets go")
                        //message.channel.send("4th video done")
                    })
                    .saveToFile("party 4.mp4")
        
                    //11 seconds
                    ffmpeg({source: partyfolder + partysong +'.mp4'}) 
                    .setStartTime(pstarttime)
                    .duration(duration5) 
                    .on('start',function(commandLine){
                        console.log("Processing has started. Hopefully it works :-)")
                    })
                    .on('error',function(err){
                        console.log("ok what the crap: ", + err)
                        message.channel.send("There was an error:" + err)
                    })
                    .on('end',function(err){
                        console.log("processing done lets go")
                        //message.channel.send("5th video done")
                    })
                    .saveToFile("party 5.mp4")
        
                    //16 seconds
                    ffmpeg({source: partyfolder + partysong +'.mp4'}) 
                    .setStartTime(pstarttime)
                    .duration(duration6) 
                    .on('start',function(commandLine){
                        console.log("Processing has started. Hopefully it works :-)")
                    })
                    .on('error',function(err){
                        console.log("ok what the crap: ", + err)
                        message.channel.send("There was an error:" + err)
                    })
                    .on('end',function(err){
                        console.log("processing done lets go")
                        message.channel.send("processing done, type -ready to play!")
                    })
                    .saveToFile("party 6.mp4")
                    }

        }
        message.channel.send("Processing has started")
        partygetmodifiers()
        await sleep(500)
        await partyvideoprocess()
                break;
        case 'psetting':
            async function getpartysettings(){
            fs.readFile("partysettings.txt", "utf-8", function(err, data){
                if(err) {
                    throw err;
                }
            
                // note: this assumes `data` is a string - you may need
                //       to coerce it - see the comments for an approach
                var lines = data.split('\n');
          
          
                //line = line.substring(0,line.length-1)
                
                console.log(lines)
                //psendone = lines[0].substring(0,lines[0].length-1) //because theres some stupid \r behind it
                //psendone = (psendone === "true")
                psendone = lines[0]
                psendone = (psendone === "true")
                pscrambledchance = lines[1]
                phardchance = lines[2]
                pchromaticchance= lines[3]
                pspecialchance = lines[4]
                console.log(psendone)
                console.log(pscrambledchance)
                console.log(phardchance)
                console.log(pchromaticchance)
                console.log(pspecialchance)
                if (psendone == true){
                    sendsetting = "One at a time"
                    console.log(sendsetting)
                }else{
                    sendsetting = "All at once"
                }
        })
    }

        async function sendpartymenu(){
        try{
            const partysetting = await message.channel.send("Party Mode Settings:" + "\n" +
            "(1) Send setting: " + sendsetting + "\n" +
            "(2) Chance for Scrambled: " + pscrambledchance + "\n"+ 
            "(3) Chance for Hard: " + phardchance +"\n" +
            "(4) Chance for Chromatic: " + "NOT SUPPORTED" + "\n"+
            "(5) Chance for Special: " + pspecialchance + "\n" + 
            "Enter 0 to leave")
            const filter = () => true;
            const collector = partysetting.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
            
            collector.on("collect", async response => {
                // Record the user's response
                const userResponse = response.content;
                let sentMessage
                console.log(response.content)
                console.log(userResponse)
                if (userResponse === 0){
                    message.channel.send("Ok bye")
                } else if (userResponse == 1){
                    psendone = !psendone
                    if (psendone == true){
                        sendsetting = "One at a time"
                        console.log(sendsetting)
                    }else{
                        sendsetting = "All at once"
                    }
                    message.channel.send("Send setting has been changed to " + sendsetting)
                    //console.log(psendone)
                    savepartysettings(psendone, pscrambledchance, phardchance, pchromaticchance, pspecialchance)
                } else if (userResponse == 2){
                    const scrambledchance = await message.channel.send("Enter the new scrambled chance")
                    const filter = () => true;
                    const collector2 = scrambledchance.channel.createMessageCollector(filter, { max: 1, time: 600000, errors: ["time"] });
                    collector2.on("collect", async response => {
                        const userinput = response.content
                        if (Number.isInteger(parseInt(userinput))){
                            pscrambledchance = parseInt(userinput)
                            message.channel.send("Set Scrambled chance to " + pscrambledchance)
                            savepartysettings(psendone, pscrambledchance, phardchance, pchromaticchance, pspecialchance)
                        }else{
                            message.channel.send("Your input could not be interpreted")
                        }
                        collector2.stop()
                    })
                } else if (userResponse == 3){
                    const hardchance = await message.channel.send("Enter the new hard chance")
                    const filter = () => true;
                    const collector = hardchance.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"]})
                    collector.on("collect", async response => {
                        const userinput = response.content
                        if (Number.isInteger(parseInt(userinput))){
                            phardchance = parseInt(userinput)
                            message.channel.send('Set hard chance to ' + phardchance)
                            savepartysettings(psendone, pscrambledchance, phardchance, pchromaticchance, pspecialchance)
                        }else{
                            message.channel.send("Your input could not be interpreted")
                        }
                        collector.stop()
                    })
                } else if(userResponse == 4){
                    message.channel.send("Chromatic gamemode is currently not supported")
                    //code if chromatic becomes supported
                    /*
                    const chromaticchance = await message.channel.send("Enter the new chromatic chance")
                    const filter = () => true;
                    const collector = chromaticchance.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"]})
                    collector.on("collect", async response => {
                        const userinput = response.content
                        if (Number.isInteger(parseInt(userinput))){
                            pchromaticchance = parseInt(userinput)
                            message.channel.send('Set chromatic chance to ' + pchromaticchance)
                            savepartysettings(psendone, pscrambledchance, phardchance, pchromaticchance, pspecialchance)
                        }else{
                            message.channel.send("Your input could not be interpreted")
                        }
                        collector.stop()
                    })
                    */
                } else if(userResponse == 5){
                    const specialchance = await message.channel.send("Enter the new special chance")
                    const filter = () => true;
                    const collector = specialchance.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"]})
                    collector.on("collect", async response => {
                        const userinput = response.content
                        if (Number.isInteger(parseInt(userinput))){
                            pspecialchance = parseInt(userinput)
                            message.channel.send('Set special chance to ' + pspecialchance)
                            savepartysettings(psendone, pscrambledchance, phardchance, pchromaticchance, pspecialchance)
                        }else{
                            message.channel.send("Your input could not be interpreted")
                        }
                        collector.stop()
                    })
                }else{
                    //message.channel.send("ok bye1")
                }
                collector.stop()
            })

            
            } catch (error) {
                console.log(error);
                await message.channel.send("There was an error processing your request.");
              }
            }
            
            function savepartysettings(sendtype, scrambled, hard, chromatic, special){
                console.log(sendtype)
                parrtysettings = sendtype + "\n" + scrambled +"\n"+hard+"\n"+chromatic +"\n"+ special
                fs.writeFile("partysettings.txt", parrtysettings, function(err, data) { if (err) {console.log("Error when saving party settings")} });
            }
            getpartysettings()
            await sleep(100)
            await sendpartymenu()



            break;
        case 'ready':
                partyanswer = partysong
                displayedanswer = realpartysongname
                //console.log("The song about to be sent is called: " + partysong)
                if (ispscrambled){
                minutes = 0
                if (pstarttime > 60){
                    pstarttime = pstarttime -60
                    minutes = minutes + 1
                    if (pstarttime > 60){
                        pstarttime = pstarttime -60
                        minutes = minutes + 1
                        if (pstarttime > 60){
                            pstarttime = pstarttime -60
                            minutes = minutes + 1
                            if (pstarttime > 60){
                                pstarttime = pstarttime -60
                                minutes = minutes + 1
                                if (pstarttime > 60){
                                    pstarttime = pstarttime -60
                                    minutes = minutes + 1
                                    if (pstarttime > 60){
                                        pstarttime = pstarttime -60
                                        minutes = minutes + 1
                                        if (pstarttime > 60){
                                            pstarttime = pstarttime -60
                                            minutes = minutes + 1
                                            } 
                                        } 
                                    } 
                                } 
                            } 
                        } 
                    } 
                    seconds = Math.trunc(pstarttime)
                    console.log("seconds = " + seconds)
                    if (seconds == "1" || seconds == "2" || seconds == "3" || seconds == "4" || seconds == "5" || seconds == "6" || seconds == "7" || seconds == "8" || seconds == "9" || seconds == "0"){
                        displayedanswer = displayedanswer + " (" + minutes + ":0" + seconds + ")"
                    }else{
                        displayedanswer = displayedanswer + " (" + minutes + ":" + seconds + ")"
                    }
                }
                numofspaces = Math.random()*75 + 25
                numofspaces = Math.trunc(numofspaces)
                space = ""
                for (i=0;i<numofspaces;i++){
                    space = space + " "
                }
                    console.log(displayedanswer)
                    console.log(psendone)
                    if(sendsetting === "All at once"){
                sleep(10).then(() => {message.channel.send("PARTY Cytus Heardle")})
                sleep(100).then(() => {message.channel.send({files: ['./party 1.mp4']}) })
                sleep(200).then(() => {message.channel.send({files: ['./party 2.mp4']}) })
                sleep(300).then(() => {message.channel.send({files: ['./party 3.mp4']}) })
                sleep(400).then(() => {message.channel.send({files: ['./party 4.mp4']}) })
                sleep(500).then(() => {message.channel.send({files: ['./party 5.mp4']}) })
                sleep(600).then(() => {message.channel.send({files: ['./party 6.mp4']}) })
                sleep(10000).then(() => {message.channel.send("Answer: ||" + displayedanswer + space + "||") })
                    }else{
                        videoindex = 2
                    sleep(10).then(() => {message.channel.send("PARTY Cytus Heardle")})
                    sleep(10).then(() => {message.channel.send("Type -next to send the next video")})
                    sleep(100).then(() => {message.channel.send({files: ['./party 1.mp4']}) })
                    }
                break;
        case 'next':
                if(videoindex == 2){
                    message.channel.send({files: ['./party 2.mp4']})
                    videoindex = videoindex + 1
                } else if(videoindex == 3){
                    message.channel.send({files: ['./party 3.mp4']})
                    videoindex = videoindex + 1
                }else if (videoindex == 4){
                    message.channel.send({files: ['./party 4.mp4']})
                    videoindex = videoindex + 1
                }else if (videoindex == 5){
                    message.channel.send({files: ['./party 5.mp4']})
                    videoindex = videoindex + 1
                }else if (videoindex == 6){
                    message.channel.send({files: ['./party 6.mp4']})
                    videoindex = 0
                }else if (videoindex == 0){
                    message.channel.send("Answer: ||" + displayedanswer + space + "||")
                    message.channel.send("All videos have been sent")
                } else if(videoindex == -1){
                    message.channel.send("Party mode has not been used yet")
                }
                break;
        case 'pg':
                console.log(partyanswer)
                partyguess = message.content
                partyguess = partyguess.substring(4, partyguess.length)
                partyguess = partyguess.toLowerCase();
                newpartyguess = "";
                for (i=0; i < partyguess.length; i++) {
                    if (partyguess[i] == " "||partyguess[i] == "\'" || partyguess[i] == "."|| partyguess[i] == "-" || partyguess[i] == "~"){
                        newpartyguess = newpartyguess;
                    }else{
                        newpartyguess = newpartyguess + partyguess[i];
                    }
                }
                if (newpartyguess == partyanswer){
                    message.channel.send("It's party time!")
                    message.channel.send("https://tenor.com/view/its-dj-franks-party-time-raise-the-roof-costume-party-dj-gif-15612267")
                    message.channel.send("The Answer was: " + displayedanswer)
                }else{
                    fs.readFile("songnames.txt", "utf-8", function(err, data){
                        if(err) {
                            throw err;
                        }
                        if(validanswers.includes(newpartyguess)){
                            message.channel.send("Dont make me get Nita!")
                            message.channel.send("https://tenor.com/view/leon-lose-brawl-stars-bebra-sad-gif-24675352")
                        }else{
                            message.channel.send("Could not find that answer")
                        }
                    })
                }
            break;
        case 'c':
                convert = message.content
                convert = convert.substring(3, convert.length)
                emojis = "-l "
                for (i=0; i < convert.length; i++) {
                    if (convert[i] == "t"){
                        emojis = emojis + ":tick:"
                    } else if (convert[i] == 'm'){
                        random = Math.random()*100
                        if (random < 50){
                        emojis = emojis + ":Miku:"
                        } else {
                            emojis = emojis + ":hehehebutinreallife:"
                        }
                    } else if (convert[i] == 'g'){
                        emojis = emojis + ":Gemz:"
                    } else if (convert[i] == 'r'){
                        emojis = emojis + ":ThatsRight:"
                    } else if (convert[i] == 'l'){
                        emojis = emojis + ":Mortisloveheart:"
                    } else if (convert[i] == 'n'){
                        emojis = emojis + ":MM:"
                    } else if (convert[i] == 'h'){
                        emojis = emojis + ":heheheah:"
                    } else if (convert[i] == 'c'){
                        emojis = emojis + ":carl:"
                    }
                }
                message.channel.send(emojis)
            break;
        case 'repeat':
            repeat = message.content
            console.log("-repeat was used: " + repeat)
            repeat = repeat.substring(8, repeat.length)
            message.channel.send(repeat)
            break;
        case 'createprofile':
            console.log('-createprofile was used')

            for(i = 0; i < playerlist.length; i++){
                if (message.author.id == playerlist[i].getId()){
                    message.channel.send('You already have a profile');
                    return;
                }
            }

            createProfile = new Player(message.author.id, 10, 10, 0, 0, 0, 0);
            playerlist.push(createProfile);
            message.channel.send('Profile Created!')
            saveprofiles();


//             fs.readFile("profiles.txt", "utf-8", function(err, data){
//                 if(err) {
//                     throw err;
//                 }
            
//                 // note: this assumes `data` is a string - you may need
//                 //       to coerce it - see the comments for an approach
//                 var lines = data.split('\n');
//                 lines = data.split(",")
//                 //console.log(lines)

//                 if(lines.includes(message.author.id + '\n') || lines.includes(message.author.id) || lines.includes('\n' + message.author.id) || lines.includes(message.author.id + '\r') || lines.includes('\r' + message.author.id)){
//                     message.channel.send("You already have a profile")
//                  }else{
//                     message.channel.send("Creating Profile...")
//                     fs.appendFile("profiles.txt", message.author.id + ",10,10,0,0,0,0,\n", function (err) {
//                         if (err) {
//                             console.log("Adding user id failed")
//                           } else {
//                             console.log("Added ID: "+ message.author.id + ",10,10,0,0,0,0," + " to new profile")
//                           }
//                     })

//                     /*
//                     const filter = m => m.author.id === message.author.id
//                     message.reply("what would you like your usename to be?")
//                     message.channel.awaitMessages(filter, { filter: filter, max: 1, errors: ['Error']})
//                         .then((collected) => {
//                             console.log(collected.size)
//                             const msg = collected.first()
//                             username = msg.content
//                             console.log(msg.content)
//                         }).catch((err) => console.log(err))
// */
//                     message.channel.send('Profile Created!')
//                  }
//              })
//              sleep(3000).then(()=> {loadprofiles()})
             
            break;
        case 'reloadprofiles':
            console.log('-reloadprofiles was used')
            loadprofiles()
            message.channel.send('profiles have been reloaded!')
            break;
        case 'buy':
            console.log('-buy was used')
            buy = message.content
            id = message.author.id
            player = findprofile(id)
            //console.log(player)
            if (player == null){
                message.channel.send('There was an error! Please send the command again or use -reloadprofiles if it keeps happening. (If you dont have a profile, please use -createprofile)')
                loadprofiles()
            }else{
                buyindex = 0
                videotime = 30
                if(ishardmode){
                    videotime = 15
                }
            if (buy.length == 4){
                if (ischromatic){
                    message.channel.send("CHROMATIC SHOP! Type -buy [number]\n"
                +"(1) Guess a character: 2 CAPSO Coins\n"
                +"(2) Reveal ALL CHAOS difficulties: 2 CAPSO Coins\n"
                +"(3) Get 1 extra guess: 1 CAPSO Coins\n"
                +"(4) Get a " + videotime + " second video for ALL songs: 1/3 of your final reward\n"
                +"(5) Get a list of every song for a character: 4 CAPSO Coins\n"
                +"(6) Get a random letter in EVERY song and its length: 6 CAPSO Coins (2 CAPSO Coins for subsequent uses)\n"
                +"You have " + player.getCapsocoins() + " CAPSO Coins")
                saveprofiles()
                }else if (isduo){
                message.channel.send("DUO SHOP! Type -buy [number]\n"
                +"(1) Guess a character: 2 CAPSO Coins\n"
                +"(2) Reveal ALL CHAOS difficulties: 1 CAPSO Coins\n"
                +"(3) Get 1 extra guess at your current video: 2 CAPSO Coins\n"
                +"(4) Get a " + videotime + " second video for ALL songs: 1/3 of your final reward\n"
                +"(5) Get a list of every song for a character: 4 CAPSO Coins\n"
                +"(6) Get a random letter in EVERY song and its length: 5 CAPSO Coins (2 CAPSO Coins for subsequent uses)\n"
                +"You have " + player.getCapsocoins() + " CAPSO Coins")
                saveprofiles()
                }else if (isquad) {
                    message.channel.send("Magic items are not supported. No one uses them anyway")
                }else{
                    message.channel.send("What would you like to buy? Type -buy [number]\n"
                    +"(1) Guess a character: 2 CAPSO Coins\n"
                    +"(2) Reveal the CHAOS difficulty: 1 CAPSO Coins\n"
                    +"(3) Get 1 extra guess for your current video: 1 CAPSO Coins\n"
                    +"(4) Get a " + videotime + " second video: 1/3 of your final reward\n"
                    +"(5) Get a list of every song for a character: 4 CAPSO Coins\n"
                    +"(6) Get a random letter in the song and its length: 5 CAPSO Coins (2 CAPSO Coin for subsequent uses)\n"
                    +"You have " + player.getCapsocoins() + " CAPSO Coins")
                    saveprofiles()
                }
            }else{
                if (buy.length >= 6){
                    buyindex = buy.substring(5,buy.length)
                }
            }
            //player.modifyCoins(25)
            //console.log(player)
            //saveprofiles()
            if(ischromatic){
                //chromatic costs
                b1 = 2
                b2 = 2
                b3 = 2
                b4 = 0
                b5 = 4
                b6 = 6
                b62 = 2
                if (buyindex == 1){
                    if (player.getCapsocoins() >= b1){
                        guesscharacter()
                        // player.modifyCoins(-b1)
                        // saveprofiles()
                        // message.channel.send("Character 1: " + character1 +"\nCharacter 2: " + character2 + "\nCharacter 3:" + character3 + "\nCharacter 4:" + character4 + "\nCharacter 5:" + character5 + "\nCharacter 6: " + character6)
                        // message.channel.send("You have "+ player.getCapsocoins() + " CAPSO Coins left")
                        // usedbuy.add(message.author.id);
                    } else{
                        message.channel.send("You don't have enough CAPSO Coins")
                    }
                } else if (buyindex == 2){
                    if (player.getCapsocoins() >= b2){
                        player.modifyCoins(-b2)
                        saveprofiles()
                        message.channel.send("The CHAOS difficulties are: " + difficulty1 + "\nSong 2: " + difficulty2 + "\nSong 3: " + difficulty3 + "\nSong 4: " + difficulty4 + "\nSong 5: " + difficulty5 + "\nSong 6: " + difficulty6)
                        message.channel.send("You have "+ player.getCapsocoins() + " CAPSO Coins left")
                        usedbuy.add(message.author.id);
                }else{
                    message.channel.send("You don't have enough CAPSO Coins")
                }
                } else if (buyindex == 3){
                    if(player.getCapsocoins() >= b3){
                        player.modifyCoins(-b3)
                        saveprofiles()
                        message.channel.send("You can guess 1 more time for any song")
                        message.channel.send("You have "+ player.getCapsocoins() + " CAPSO Coins left")
                        usedbuy.add(message.author.id);
                }else{
                    message.channel.send("You don't have enough CAPSO Coins")
                }
                } else if (buyindex == 4){
                    if (player.getCapsocoins() >= b4){
                        player.modifyCoins(-b4)
                        usedbuy.add(message.author.id);
                        used30sec.add(message.author.id);
                        saveprofiles()
                        message.channel.send("You have "+ player.getCapsocoins() + " CAPSO Coins left")
                        if (powerup30secondprocessed){
                            message.channel.send({files: ['./30sec.mp4']})
                            message.channel.send({files: ['./30sec2.mp4']})
                            message.channel.send({files: ['./30sec3.mp4']})
                            message.channel.send({files: ['./30sec4.mp4']})
                            message.channel.send({files: ['./30sec5.mp4']})
                            message.channel.send({files: ['./30sec6.mp4']})
                        }else{
                            message.channel.send("Processing has started")

                        await processvideo('./songlist/' + songname1 + '.mp4',"30sec.mp4", isreverse, starttime1, videotime )
                        await processvideo('./songlist/' + songname2 + '.mp4',"30sec2.mp4", isreverse, starttime2, videotime )
                        await processvideo('./songlist/' + songname3 + '.mp4',"30sec3.mp4", isreverse, starttime3, videotime )
                        await processvideo('./songlist/' + songname4 + '.mp4',"30sec4.mp4", isreverse, starttime4, videotime )
                        await processvideo('./songlist/' + songname5 + '.mp4',"30sec5.mp4", isreverse, starttime5, videotime )
                        await processvideo('./songlist/' + songname6 + '.mp4',"30sec6.mp4", isreverse, starttime6, videotime )
                        await message.channel.send({files: ['./30sec.mp4']})
                        await message.channel.send({files: ['./30sec2.mp4']})
                        await message.channel.send({files: ['./30sec3.mp4']})
                        await message.channel.send({files: ['./30sec4.mp4']})
                        await message.channel.send({files: ['./30sec5.mp4']})
                        await message.channel.send({files: ['./30sec6.mp4']})
                        }
                    }else{
                        message.channel.send("You don't have enough CAPSO Coins")
                    }
                } else if (buyindex == 5){
                    buylist()
                } else if (buyindex == 6){
                    message.channel.send("disabled")
                    /*
                    alreadybought = 0
                    userID = message.author.id

                    hiddenStr = update6Strings(userID, player.getCapsocoins(), realname1, realname2, realname3, realname4, realname5, realname6)
                    
                    
                    if (alreadybought == 1){
                        if (player.getCapsocoins()>= b62){
                            player.modifyCoins(-b62)
                            message.channel.send("Offer Purchased:")
                            message.channel.send(`\`${hiddenStr[0]}\``)
                            sleep(1000).then(() => {message.channel.send(`\`${hiddenStr[1]}\``)})
                            sleep(2000).then(() => {message.channel.send(`\`${hiddenStr[2]}\``)})
                            sleep(3000).then(() => {message.channel.send(`\`${hiddenStr[3]}\``)})
                            sleep(4000).then(() => {message.channel.send(`\`${hiddenStr[4]}\``)})
                            sleep(5000).then(() => {message.channel.send(`\`${hiddenStr[5]}\``)})
                            sleep(6000).then(() => {message.channel.send("You have " + player.getCapsocoins() + " CAPSO Coins left")})
                            sleep(7000).then(() => {saveprofiles()})
                        }else{
                            message.channel.send("You don't have enough CAPSO Coins")
                        }
                    }else{
                        if(player.getCapsocoins() >= b6){
                            player.modifyCoins(-b6)
                            usedbuy.add(message.author.id);
                            message.channel.send("Offer Purchased:")
                            message.channel.send(`\`${hiddenStr[0]}\``)
                            sleep(1000).then(() => {message.channel.send(`\`${hiddenStr[1]}\``)})
                            sleep(2000).then(() => {message.channel.send(`\`${hiddenStr[2]}\``)})
                            sleep(3000).then(() => {message.channel.send(`\`${hiddenStr[3]}\``)})
                            sleep(4000).then(() => {message.channel.send(`\`${hiddenStr[4]}\``)})
                            sleep(5000).then(() => {message.channel.send(`\`${hiddenStr[5]}\``)})
                            sleep(6000).then(() => {message.channel.send("You have " + player.getCapsocoins() + " CAPSO Coins left")})
                            sleep(6000).then(() => {saveprofiles()})
                        }else{
                            message.channel.send("You don't have enough CAPSO Coins")
                        }
                    }
                    */
                }
            
            }else if (isduo){
                //duo costs
                b1 = 2
                b2 = 1
                b3 = 1
                b4 = 0
                b5 = 4
                b6 = 5
                b62 = 2
                if (buyindex ==1){
                    if (player.getCapsocoins() >= b1){
                        guesscharacter()
                    // player.modifyCoins(-b1)
                    // saveprofiles()
                    // message.channel.send("Character 1: " + character1 +"\nCharacter 2: " +character2)
                    // message.channel.send("You have "+ player.getCapsocoins() + " CAPSO Coins left")
                    // usedbuy.add(message.author.id);
                       } else{
                           message.channel.send("You don't have enough CAPSO Coins")
                    }
                } else if (buyindex == 2){
                    if (player.getCapsocoins() >= b2){
                    player.modifyCoins(-b2)
                    saveprofiles()
                    message.channel.send("The CHAOS difficulties are: " + difficulty1 + "\nSong 2: " + difficulty2)
                    message.channel.send("You have "+ player.getCapsocoins() + " CAPSO Coins left")
                    usedbuy.add(message.author.id);
                    }else{
                        message.channel.send("You don't have enough CAPSO Coins")
                    }
                } else if (buyindex == 3){
                    if (player.getCapsocoins() >= b3){
                    player.modifyCoins(-b3)
                    saveprofiles()
                    message.channel.send("You can guess 1 more time at your current level")
                    message.channel.send("You have "+ player.getCapsocoins() + " CAPSO Coins left")
                    usedbuy.add(message.author.id);
                    }else{
                        message.channel.send("You don't have enough CAPSO Coins")
                    }
                }else if (buyindex == 4){
                    if (!powerup30secondprocessed){
                        message.channel.send("30 second video has not finished processing yet")
                        return
                    }
                    if(player.getCapsocoins() >= b4){
                    if (powerup30secondprocessed){
                        player.modifyCoins(-b4)
                    saveprofiles()
                    message.channel.send("You have "+ player.getCapsocoins() + " CAPSO Coins left")
                    usedbuy.add(message.author.id);
                    used30sec.add(message.author.id);
                        message.channel.send({files: ['./30sec.mp4']})
                    } else{
                        message.channel.send({files: ['./30sec.mp4']})
                }
                }else{
                    message.channel.send("You don't have enough CAPSO Coins")
                }

                } else if (buyindex == 5){
                   buylist()
                } else if (buyindex == 6){
                    message.channel.send("disabled since I cannot figure out how to get it to work")
                    /*
                    alreadybought = 0
                    hint = realname
                    userID = message.author.id
                    hiddenStr = update6Strings(userID, player.getCapsocoins(), realname1, realname2, '0', '0','0','0')
                    
                    //console.log(`Original: ${hint}`);
                    //console.log(`Hidden: ${hiddenStr}`);
                    
                    if(alreadybought == 1){
                        if(player.getCapsocoins()>= b62){
                        player.modifyCoins(-b62)
                        message.channel.send("You have "+ player.getCapsocoins() + " CAPSO Coins left")
                        saveprofiles()
                        message.channel.send("Offer Purchased:")
                        message.channel.send(`\`${hiddenStr[0]}\``)
                        sleep(1000).then(() => {message.channel.send(`\`${hiddenStr[1]}\``)})
                        }else{
                            message.channel.send("You don't have enough CAPSO Coins")
                        }
                    }else{
                        if(player.getCapsocoins() >= b6){
                        player.modifyCoins(-b6)
                        message.channel.send("You have "+ player.getCapsocoins() + " CAPSO Coins left")
                        usedbuy.add(message.author.id);
                        saveprofiles()
                        message.channel.send(hiddenStr)
                        }else{
                            message.channel.send("You don't have enough CAPSO Coins")
                        }
                    }
                    */
                }
            }else if (isquad) {
                    message.channel.send("Magic items are not supported. No one uses them anyway")
            }else{
                //normal costs
                b1 = 2
                b2 = 1
                b3 = 1
                b4 = 0
                b5 = 4
                b6 = 5
                b62 = 2
            if (buyindex ==1){
                if (player.getCapsocoins() >= b1){
                    guesscharacter()
                    
                // player.modifyCoins(-b1)
                // saveprofiles()
                // message.channel.send("The character is: " + character)
                // message.channel.send("You have "+ player.getCapsocoins() + " CAPSO Coins left")
                // usedbuy.add(message.author.id);
                } else{
                    message.channel.send("You don't have enough CAPSO Coins")
                }
            } else if (buyindex == 2){
                if (player.getCapsocoins() >= b2){
                player.modifyCoins(-b2)
                saveprofiles()
                message.channel.send("The CHAOS difficulty is: " + difficulty)
                message.channel.send("You have "+ player.getCapsocoins() + " CAPSO Coins left")
                usedbuy.add(message.author.id);
                }else{
                    message.channel.send("You don't have enough CAPSO Coins")
                }
            } else if (buyindex == 3){
                if (player.getCapsocoins() >= b3){
                player.modifyCoins(-b3)
                saveprofiles()
                message.channel.send("You can guess 1 more time at your current level")
                message.channel.send("You have "+ player.getCapsocoins() + " CAPSO Coins left")
                usedbuy.add(message.author.id);
                }else{
                    message.channel.send("You don't have enough CAPSO Coins")
                }
            }else if (buyindex == 4){
                if(player.getCapsocoins() >=b4){
                player.modifyCoins(-b4)
                saveprofiles()
                message.channel.send("You have "+ player.getCapsocoins() + " CAPSO Coins left")
                usedbuy.add(message.author.id);
                used30sec.add(message.author.id);
                if (powerup30secondprocessed){
                    message.channel.send({files: ['./30sec.mp4']})
                } else{
                    await processvideo('./songlist/' + songname +'.mp4', "30sec.mp4", isreverse, starttime,videotime )
                    await message.channel.send({files: ['./30sec.mp4']})
                
            }
            }else{
                message.channel.send("You don't have enough CAPSO Coins")
            }
            } else if (buyindex == 5){
               buylist()
            } else if (buyindex == 6){
                message.channel.send("disabled")
                /*
                alreadybought = 0
                hint = realname
                userID = message.author.id
                
                hiddenStr = updateString(userID, hint,player.getCapsocoins())
                
                //console.log(`Original: ${hint}`);
                //console.log(`Hidden: ${hiddenStr}`);
                
                if(alreadybought == 1){
                    if(player.getCapsocoins()>= b62){
                    player.modifyCoins(-b62)
                    message.channel.send("You have "+ player.getCapsocoins() + " CAPSO Coins left")
                    saveprofiles()
                    message.channel.send(hiddenStr)
                    }else{
                        message.channel.send("You don't have enough CAPSO Coins")
                    }
                }else{
                    if(player.getCapsocoins() >= b6){
                    player.modifyCoins(-b6)
                    message.channel.send("You have "+ player.getCapsocoins() + " CAPSO Coins left")
                    usedbuy.add(message.author.id);
                    saveprofiles()
                    message.channel.send(hiddenStr)
                    }else{
                        message.channel.send("You don't have enough CAPSO Coins")
                    }
                }
                */
            }
        }
        }
        async function buylist(){
            listcost = b5
                    if(player.getCapsocoins() >= listcost){
                        const validResponses = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21"];
        
                        try {
                            // Send a message to the user
                            const choiselist = await message.channel.send("What character list would you like? Type the number\n"
                            + "(1) PAFF\n"
                            + "(2) Neko #ΦωΦ\n"
                            + "(3) ROBO_Head\n"
                            + "(4) Ivy\n"
                            + "(5) Crystal PuNK\n"
                            + "(6) Vanessa\n"
                            + "(7) Bo Bo\n"
                            + "(8) Graff.J\n"
                            + "(9) Alice\n"
                            + "(10) Hans\n"
                            + "(11) Kizuna AI\n"
                            + "(12) Miku\n"
                            + "(13) Xenon\n"
                            + "(14) ConneR\n"
                            + "(15) Cherry\n"
                            + "(16) JOE\n"
                            + "(17) Sagar\n"
                            + "(18) Rin\n"
                            + "(19) Aroma\n"
                            + "(20) Nora\n"
                            + "(21) Neko\n"
                            );
                          
                            // Set up a filter to listen for the user's response
                            const filter = m => m.author.id === message.author.id;
                            const collector = choiselist.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                          
                            // Wait for the user to respond
                            collector.on("collect", async response => {
                              // Record the user's response
                              const userResponse = response.content;
                              let sentMessage
                              if (userResponse == 1){
                                sentMessage = await message.channel.send(paffsongs)
                                player.modifyCoins(-listcost)
                                await message.channel.send("You have "+ player.getCapsocoins() + " CAPSO Coins left")
                                usedbuy.add(message.author.id);
                                saveprofiles()
                              } else if (userResponse == 2){
                                sentMessage = await message.channel.send(nekosongs)
                                player.modifyCoins(-listcost)
                                await message.channel.send("You have "+ player.getCapsocoins() + " CAPSO Coins left")
                                usedbuy.add(message.author.id);
                                saveprofiles()
                              } else if (userResponse == 3){
                                sentMessage = await message.channel.send(roboheadsongs)
                                player.modifyCoins(-listcost)
                                await message.channel.send("You have "+ player.getCapsocoins() + " CAPSO Coins left")
                                usedbuy.add(message.author.id);
                                saveprofiles()
                              } else if (userResponse == 4){
                                sentMessage = await message.channel.send(ivysongs)
                                player.modifyCoins(-listcost)
                                await message.channel.send("You have "+ player.getCapsocoins() + " CAPSO Coins left")
                                usedbuy.add(message.author.id);
                                saveprofiles()
                              } else if (userResponse == 5){
                                sentMessage = await message.channel.send(crystalpunksongs)
                                player.modifyCoins(-listcost)
                                await message.channel.send("You have "+ player.getCapsocoins() + " CAPSO Coins left")
                                usedbuy.add(message.author.id);
                                saveprofiles()
                              } else if (userResponse == 6){
                                sentMessage = await message.channel.send(vanessasongs)
                                player.modifyCoins(-listcost)
                                await message.channel.send("You have "+ player.getCapsocoins() + " CAPSO Coins left")
                                usedbuy.add(message.author.id);
                                saveprofiles()
                              } else if (userResponse == 7){
                                sentMessage = await message.channel.send(bobosongs)
                                player.modifyCoins(-listcost)
                                await message.channel.send("You have "+ player.getCapsocoins() + " CAPSO Coins left")
                                usedbuy.add(message.author.id);
                                saveprofiles()
                              } else if (userResponse == 8){
                                sentMessage = await message.channel.send(graffjsongs)
                                player.modifyCoins(-listcost)
                                await message.channel.send("You have "+ player.getCapsocoins() + " CAPSO Coins left")
                                usedbuy.add(message.author.id);
                                saveprofiles()
                              } else if (userResponse == 9){
                                sentMessage = await message.channel.send(alicesongs)
                                player.modifyCoins(-listcost)
                                await message.channel.send("You have "+ player.getCapsocoins() + " CAPSO Coins left")
                                usedbuy.add(message.author.id);
                                saveprofiles()
                              } else if (userResponse == 10){
                                sentMessage = await message.channel.send(hanssongs)
                                player.modifyCoins(-listcost)
                                usedbuy.add(message.author.id);
                                await message.channel.send("You have "+ player.getCapsocoins() + " CAPSO Coins left")
                                saveprofiles()
                              } else if (userResponse == 11){
                                sentMessage = await message.channel.send(kizunaaisongs)
                                player.modifyCoins(-listcost)
                                await message.channel.send("You have "+ player.getCapsocoins() + " CAPSO Coins left")
                                usedbuy.add(message.author.id);
                                saveprofiles()
                              } else if (userResponse == 12){
                                sentMessage = await message.channel.send(mikusongs)
                                player.modifyCoins(-listcost)
                                await message.channel.send("You have "+ player.getCapsocoins() + " CAPSO Coins left")
                                usedbuy.add(message.author.id);
                                saveprofiles()
                              } else if (userResponse == 13){
                                sentMessage = await message.channel.send(xenonsongs)
                                player.modifyCoins(-listcost)
                                await message.channel.send("You have "+ player.getCapsocoins() + " CAPSO Coins left")
                                usedbuy.add(message.author.id);
                                saveprofiles()
                              } else if (userResponse == 14){
                                sentMessage = await message.channel.send(connersongs)
                                player.modifyCoins(-listcost)
                                await message.channel.send("You have "+ player.getCapsocoins() + " CAPSO Coins left")
                                usedbuy.add(message.author.id);
                                saveprofiles()
                              } else if (userResponse == 15){
                                sentMessage = await message.channel.send(cherrysongs)
                                player.modifyCoins(-listcost)
                                await message.channel.send("You have "+ player.getCapsocoins() + " CAPSO Coins left")
                                usedbuy.add(message.author.id);
                                saveprofiles()
                              } else if (userResponse == 16){
                                sentMessage = await message.channel.send(joesongs)
                                player.modifyCoins(-listcost)
                                await message.channel.send("You have "+ player.getCapsocoins() + " CAPSO Coins left")
                                usedbuy.add(message.author.id);
                                saveprofiles()
                              } else if (userResponse == 17){
                                sentMessage = await message.channel.send(sagarsongs)
                                player.modifyCoins(-listcost)
                                await message.channel.send("You have "+ player.getCapsocoins() + " CAPSO Coins left")
                                usedbuy.add(message.author.id);
                                saveprofiles()
                              } else if (userResponse == 18){
                                sentMessage = await message.channel.send(rinsongs)
                                player.modifyCoins(-listcost)
                                await message.channel.send("You have "+ player.getCapsocoins() + " CAPSO Coins left")
                                usedbuy.add(message.author.id);
                                saveprofiles()
                              } else if (userResponse == 19){
                                sentMessage = await message.channel.send(aromasongs)
                                player.modifyCoins(-listcost)
                                await message.channel.send("You have "+ player.getCapsocoins() + " CAPSO Coins left")
                                usedbuy.add(message.author.id);
                                saveprofiles()
                              } else if (userResponse == 20){
                                sentMessage = await message.channel.send(norasongs)
                                player.modifyCoins(-listcost)
                                await message.channel.send("You have "+ player.getCapsocoins() + " CAPSO Coins left")
                                usedbuy.add(message.author.id);
                                saveprofiles()
                              } else if (userResponse == 21){
                                sentMessage = await message.channel.send(youngnekosongs)
                                usedbuy.add(message.author.id);
                                player.modifyCoins(-listcost)
                                await message.channel.send("You have "+ player.getCapsocoins() + " CAPSO Coins left")
                                usedbuy.add(message.author.id);
                                saveprofiles()
                              }
                             
                              
                              setTimeout(() => {
                                if (sentMessage) {
                                sentMessage.delete()
                                  .catch(console.error);
                                }
                              }, 15 * 60 * 1000); // 60 minutes * 60 seconds * 1000 milliseconds = 1 hour
                              collector.stop()
                            });
                          
                            collector.on('end', collected=>{
                              console.log("Finished collecting")
                              console.log(`Collected ${collected.size} response(s)`);
                            })
                          } catch (error) {
                            console.log(error);
                            await message.channel.send("There was an error processing your request.");
                          }
                        }else{
                            message.channel.send("You don't have enough CAPSO Coins")
                        }
        }

        async function guesscharacter(){
            
            guesscharactercost = b1

                const validResponses = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21"];
                try {
                    // Send a message to the user
                    const choiselist = await message.channel.send("What character do you think it is? Type the number\n"
                    + "(1) PAFF\n"
                    + "(2) Neko #ΦωΦ\n"
                    + "(3) ROBO_Head\n"
                    + "(4) Ivy\n"
                    + "(5) Crystal PuNK\n"
                    + "(6) Vanessa\n"
                    + "(7) Bo Bo\n"
                    + "(8) Graff.J\n"
                    + "(9) Alice\n"
                    + "(10) Hans\n"
                    + "(11) Kizuna AI\n"
                    + "(12) Miku\n"
                    + "(13) Xenon\n"
                    + "(14) ConneR\n"
                    + "(15) Cherry\n"
                    + "(16) JOE\n"
                    + "(17) Sagar\n"
                    + "(18) Rin\n"
                    + "(19) Aroma\n"
                    + "(20) Nora\n"
                    + "(21) Neko\n"
                    );
                  
                    // Set up a filter to listen for the user's response
                    const filter = m => m.author.id === message.author.id;
                    const collector = choiselist.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                  
                    // Wait for the user to respond
                    collector.on("collect", async response => {
                        const userResponse = response.content;
                        // if (!validResponses.includes(userResponse)){
                        //     message.channel.send("Could not interpret your request")
                        //     return;
                        // }
                        collector.stop()
                        switch(userResponse){
                            case"1":
                            userAnswer = "PAFF"
                            break;
                            case"2":
                            userAnswer = "NEKO#ΦωΦ"
                            break;
                            case"3":
                            userAnswer = "ROBO_Head"
                            break;
                            case"4":
                            userAnswer = "Ivy"
                            break;
                            case"5":
                            userAnswer = "Crystal PuNK"
                            break;
                            case"6":
                            userAnswer = "Vanessa"
                            break;
                            case"7":
                            userAnswer = "Bo Bo"
                            break;
                            case"8":
                            userAnswer = "Graff.J"
                            break;
                            case"9":
                            userAnswer = "Alice"
                            break;
                            case"10":
                            userAnswer = "Hans"
                            break;
                            case"11":
                            userAnswer = "Kizuna AI"
                            break;
                            case"12":
                            userAnswer = "Miku"
                            break;
                            case"13":
                            userAnswer = "Xenon"
                            break;
                            case"14":
                            userAnswer = "ConneR"
                            break;
                            case"15":
                            userAnswer = "Cherry"
                            break;
                            case"16":
                            userAnswer = "Joe"
                            break;
                            case"17":
                            userAnswer = "Sagar"
                            break;
                            case"18":
                            userAnswer = "Rin"
                            break;
                            case"19":
                            userAnswer = "Aroma"
                            break;
                            case"20":
                            userAnswer = "Nora"
                            break;
                            case"21":
                            userAnswer = "Neko"
                            break;
                            default:
                            message.channel.send("Could not interpret your response")
                            return;
                        }
                        player.modifyCoins(-guesscharactercost)
                        saveprofiles()
                        if (ischromatic){
                            counter = 0
                            if (userAnswer==character1){
                                message.channel.send("That's Right. The 1st character is " + character1)
                                counter++
                            } 
                            if (userAnswer==character2){
                                message.channel.send("That's Right. The 2nd character is " + character2)
                                counter++
                            }
                            if (userAnswer==character3){
                                message.channel.send("That's Right. The 3rd character is " + character3)
                                counter++
                            }
                            if (userAnswer==character4){
                                message.channel.send("That's Right. The 4th character is " + character4)
                                counter++
                            }
                            if (userAnswer==character5){
                                message.channel.send("That's Right. The 5th character is " + character5)
                                counter++
                            }
                            if (userAnswer==character6){
                                message.channel.send("That's Right. The 6th character is " + character6)
                                counter++
                            }
                            if (counter == 0){
                                message.channel.send("That's not right")
                            }
                        } else if (isduo){
                            counter = 0
                            if (userAnswer == character1){
                                message.channel.send("That's Right. The 1st character is " + character1)
                                counter++
                            } 
                            if (userAnswer == character2){
                                message.channel.send("That's Right. The 2nd character is " + character2)
                                counter++
                            }
                            if (counter == 0){
                                message.channel.send("That's not right")
                            }
                        } else {
                        if (userAnswer == character){
                            message.channel.send("That's Right. The character is " + character)
                        } else {
                            message.channel.send("That's not right")
                        }
                        }
                        message.channel.send("You have " + player.getCapsocoins() + " Capso Coins left")
                        setTimeout(() => {
                            if (sentMessage) {
                            sentMessage.delete()
                              .catch(console.error);
                            }
                          }, 15 * 60 * 1000); // 60 minutes * 60 seconds * 1000 milliseconds = 1 hour
                          collector.stop()
                        });
                } catch (error) {
                    console.log(error);
                    await message.channel.send("There was an error processing your request.");
                      
                }
        }
    
            break;
        case 'l':
            playerid = message.author.id
            if (usedCommands.has(message.author.id)) {
                    message.reply('Hey you aleady used this command today. Stop trolling me');
                } else {
            playerr = findprofile(playerid)
            if (playerr == null){
                message.channel.send('There was an error! Please send the command again or use -reloadprofiles if it keeps happening. (If you dont have a profile, please use -createprofile)')
                loadprofiles()
            }else{

            reward = 0
            score = message.content
            score = score.substring(2,score.length)
            console.log(score)
            if (score == ""){
                message.channel.send("Your score could not be interpreted")
                return
            }
            score= score.replace(/\s/g, '')
            message.channel.send(score)
            //console.log("score: " + score)
            const regex = /<:[^:]+:(\d+)>/g;
            const matches = [];
            let match;
            while ((match = regex.exec(score)) !== null) {
            matches.push(match[1]);
            }
            //console.log(matches);
            if(ischromatic){
                correctguesscandidate1 = matches.indexOf('640720107475042314')
                correctguesscandidate2 = matches.indexOf('945034814489239683')
                correctguesscandidate3 = matches.indexOf('910327131857358909')
                if (correctguesscandidate1 == -1 && correctguesscandidate2 == -1 && correctguesscandidate3 == -1){
                    reward = 1
                }else{
                    if (matches[0] == '640720107475042314' || matches[0] == '945034814489239683' || matches[0] == '910327131857358909'){
                        reward = reward + 6
                        //console.log("8 capso coin reward")
                    }
                    if (matches[1] =='640720107475042314' || matches[1] == '945034814489239683' || matches[1] == '910327131857358909' ){
                        reward = reward + 5
                        //console.log("6 capso coin reward")
                    }
                    if (matches[2] =='640720107475042314' || matches[2] == '945034814489239683' || matches[2] == '910327131857358909'){
                        reward = reward + 5
                    }
                    if (matches[3] =='640720107475042314' || matches[3] == '945034814489239683' || matches[3] == '910327131857358909'){
                        reward = reward + 3
                    }
                    if (matches[4] =='640720107475042314' || matches[4] == '945034814489239683' || matches[4] == '910327131857358909'){
                        reward = reward + 3
                    }
                    if (matches[5] =='640720107475042314' || matches[5] == '945034814489239683' || matches[5] == '910327131857358909'){
                        reward = reward + 3
                    }


                    // for (i=0; i<=5 ; i++){
                    //     if(matches[i] == '955971112431419422'){
                    //         reward = reward + 0.5
                    //     }
                    // }

                    if(isscrambled){
                        reward = reward + 1
                    }

                    if(isfragmented) {
                        reward = reward + 1
                    }

                    if(ishardmode){
                        reward = reward + 2
                    }

                    if(isreverse){
                        reward = reward + 3
                    }

                    if(used30sec.has(message.author.id)){
                        reward = reward*0.67
                    }

                    if(matches[0] == '640720107475042314' && matches[1] == '640720107475042314' && matches[2] == '640720107475042314' && matches[3] == '640720107475042314' && matches[4] == '640720107475042314' && matches[5] == '640720107475042314' && !usedbuy.has(message.author.id)){
                        reward = reward + 5
                    }          

                    /*
                    streakbonus = calculatestreakbonus()
                    reward = reward + streakbonus
                    */
                }
                
            }else if(isduo){
                nummikus = 0
                mikuindex = matches.indexOf('945034814489239683')
                if(mikuindex == -1){
                    mikuindex = matches.indexOf('910327131857358909')
                    if(mikuindex == -1){
                        mikuindex = matches.indexOf('640720107475042314')
                        if(mikuindex == -1){
                            nummikus = 0
                        }else{
                            nummikus = 1
                        }
                    }else{
                        if (matches.length>6){
                            listlength = 6
                        }else{
                            listlength = matches.length
                        }
                        count = 0
                        for (let i = 0; i < listlength; i++) {
                            if (matches[i] == '910327131857358909') {
                              count++;
                            }
                          }
                          if(count>2){
                            message.channel.send("Your score could not be interpreted (1)")
                            return
                          }else if(count == 2 || count == 1){
                            nummikus = 2
                          }
                    }
                }else{
                if (matches.length>6){
                    listlength = 6
                }else{
                    listlength = matches.length
                }
                count = 0
                for (let i = 0; i < listlength; i++) {
                    if (matches[i] == '945034814489239683') {
                      count++;
                    }
                  }
                if(count != 1){
                    message.channel.send("Your score could not be interpreted (2)")
                    return
                }else if(count == 1){
                    nummikus = 1
                }
            }
            console.log("nummikus:" + nummikus)
            if(nummikus > 0 && nummikus < 3){
            if (nummikus == 2){
                num = 0
                lastone = 0
                if (matches[0]== '945034814489239683' ||matches[0]== '910327131857358909' || matches[0] == '640720107475042314' ){
                    reward = reward + 8
                    num = num + 1
                    lastone = 0
                }
                if (matches[1]== '945034814489239683' ||matches[1]== '910327131857358909' || matches[1] == '640720107475042314' ){
                    reward = reward + 6
                    num = num + 1
                    lastone = 1
                }
                if (num<2){
                    if (matches[2]== '945034814489239683' ||matches[2]== '910327131857358909' || matches[2] == '640720107475042314' ){
                        reward = reward + 5
                        num = num + 1
                        lastone = 2
                    }
                }
                if (num<2){
                    if (matches[3]== '945034814489239683' ||matches[3]== '910327131857358909' || matches[3] == '640720107475042314' ){
                        reward = reward + 4
                        num = num + 1
                        lastone = 3
                    }
                }
                if (num<2){
                    if (matches[4]== '945034814489239683' ||matches[4]== '910327131857358909' || matches[4] == '640720107475042314' ){
                        reward = reward + 3
                        num = num + 1
                        lastone = 4
                    }
                }
                if (num<2){
                    if (matches[5]== '945034814489239683' ||matches[5]== '910327131857358909' || matches[5] == '640720107475042314' ){
                        reward = reward + 2
                        num = num + 1
                        lastone = 5
                    }
                }
            } else if(nummikus == 1){
                correctguessindex = matches.indexOf('945034814489239683')
                if (correctguessindex == -1){
                    correctguessindex = matches.indexOf('910327131857358909')
                } 
                if (correctguessindex == -1){
                    correctguessindex = matches.indexOf('640720107475042314')
                }
                lastone = correctguessindex
                console.log("correct guess index: " + correctguessindex)
                if (correctguessindex == -1){
                    reward = 1
                }else{
                    if (correctguessindex == 0){
                        reward = reward + 16
                    }else if (correctguessindex == 1){
                        reward = reward + 12
                    } else if (correctguessindex == 2){
                        reward = reward + 10
                    } else if (correctguessindex == 3){
                        reward = reward + 8
                    }else if (correctguessindex == 4){
                        reward = reward + 6
                    }else if (correctguessindex == 5){
                        reward = reward + 4
                    }
                }
            }else{
                message.channel.send("Your score could not be interpreted (3)")
                return
            }

            // for(i=0; i<lastone;i++){
            //     if(matches[i]== '955971112431419422'){
            //         reward = reward + 1
            //     }
            // }

            if(isscrambled){
                reward = reward + 1
            }

            if(isfragmented) {
                reward = reward + 1
            }

            if(ishardmode){
                reward = reward + 2
            }

            if(isreverse){
                reward = reward + 3
            }

            if(used30sec.has(message.author.id)){
                reward = reward*0.67
            }

                } else if (nummikus == 0){
                    reward = reward + 1
                }else{
                    message.channel.send("Your score could not be interpreted (4)")
                    return
                }


            } else if (isquad) {
                //check if the amount of stuff is over 4
                correct = 0
                reward = 0
                for (i = 0; i < matches.length; i++) {
                    if (i > 5) {
                        message.channel.send("Your score could not be interpreted");
                        return;
                    }
                    if (matches[i] == Hehehebutinreallife) {
                        correct += 4;
                    } else if (matches[i] == Hehehe) {
                        correct += 3;
                    } else if (matches[i] == projectDivaMiku) {
                        correct += 2;
                    } else if (matches[i] == angryMiku) {
                        correct += 1;
                    } else if (matches[i] == MillionMaster) {
                        correct += 4;
                    }
                }

                if (correct > 4) {
                    message.channel.send("Your score could not be interpreted\nYou entered too many Mikus")
                    return;
                }

                if (correct == 0) {
                    reward = 1;
                } else {
                    //iterate through matches and reward points
                    if (matches[0] == Hehehebutinreallife || matches[0] == MillionMaster) {
                        reward = reward + (6 * 4)
                    } else if (matches[0] == Hehehe) {
                        reward = reward + (6 * 3)
                    } else if (matches[0] == projectDivaMiku) {
                        reward = reward + (6 * 2)
                    } else if (matches[0] == angryMiku) {
                        reward = reward + (6 * 1)
                    }

                    length = matches.length

                    if (length > 1) {
                        if (matches[1] == Hehehebutinreallife || matches[1] == MillionMaster) {
                            reward += (5 * 4)
                        } else if (matches[1] == Hehehe) {
                            reward += (5 * 3)
                        } else if (matches[1] == projectDivaMiku) {
                            reward += (5 * 2)
                        } else if (matches[1] == angryMiku) {
                            reward += (5 * 1)
                        }
                    }

                    if (length > 2) {
                        if (matches[2] == Hehehebutinreallife || matches[2] == MillionMaster) {
                            reward += (4 * 4)
                        } else if (matches[2] == Hehehe) {
                            reward += (4 * 3)
                        } else if (matches[2] == projectDivaMiku) {
                            reward += (4 * 2)
                        } else if (matches[2] == angryMiku) {
                            reward += (4 * 1)
                        }
                    }

                    if (length > 3) {
                        if (matches[3] == Hehehebutinreallife || matches[3] == MillionMaster) {
                            reward += (3 * 4)
                        } else if (matches[3] == Hehehe) {
                            reward += (3 * 3)
                        } else if (matches[3] == projectDivaMiku) {
                            reward += (3 * 2)
                        } else if (matches[3] == angryMiku) {
                            reward += (3 * 1)
                        }
                    }

                    if (length > 4) {
                        if (matches[4] == Hehehebutinreallife || matches[4] == MillionMaster) {
                            reward += (2 * 4)
                        } else if (matches[4] == Hehehe) {
                            reward += (2 * 3)
                        } else if (matches[4] == projectDivaMiku) {
                            reward += (2 * 2)
                        } else if (matches[4] == angryMiku) {
                            reward += (2 * 1)
                        }
                    }

                    if (length > 5) {
                        if (matches[5] == Hehehebutinreallife || matches[5] == MillionMaster) {
                            reward += (1 * 4)
                        } else if (matches[5] == Hehehe) {
                            reward += (1 * 3)
                        } else if (matches[5] == projectDivaMiku) {
                            reward += (1 * 2)
                        } else if (matches[5] == angryMiku) {
                            reward += (1 * 1)
                        }
                    }

                    if(ishardmode){
                        reward = reward + 2
                    }

                    if(isreverse){
                        reward = reward + 3
                    }
                    
                    
                    if(isscrambled){
                        reward = reward + 1
                    }
                    
                    if(isfragmented) {
                        reward = reward + 1
                    }

                    if(used30sec.has(message.author.id)){
                        reward = reward*0.67
                    }
                }

            }else{
                correctguessindex = matches.indexOf('945034814489239683')
                if (correctguessindex == -1){
                    correctguessindex = matches.indexOf('910327131857358909')
                } 
                if (correctguessindex == -1){
                    correctguessindex = matches.indexOf('640720107475042314')
                }
                console.log("correct guess index: " + correctguessindex)
                if (correctguessindex == -1){
                    reward = 1
                }else{
                    if (correctguessindex == 0){
                        reward = reward + 15
                    }else if (correctguessindex == 1){
                        reward = reward + 12
                    } else if (correctguessindex == 2){
                        reward = reward + 9
                    } else if (correctguessindex == 3){
                        reward = reward + 7
                    }else if (correctguessindex == 4){
                        reward = reward + 5
                    }else if (correctguessindex == 5){
                        reward = reward + 3
                    }

                    // if (correctguessindex >= 1 && correctguessindex <= 5){
                    //     for(i=0; i<correctguessindex;i++){
                    //         if(matches[i]==955971112431419422){
                    //             reward = reward + 1
                    //         }
                    //     }
                    // }
                
                
                if(ishardmode){
                    reward = reward + 2
                }

                if(isreverse){
                    reward = reward + 3
                }
                
                
                if(isscrambled){
                    reward = reward + 1
                }
                
                if(isfragmented) {
                    reward = reward + 1
                }

                if(used30sec.has(message.author.id)){
                    reward = reward*0.67
                }
                /*
                streakbonus = calculatestreakbonus()
                reward = reward + streakbonus
                */
                }
            }
        }
            

            reward = Math.trunc(reward)
            
            message.channel.send("Congratulations! You earned " + reward + " CAPSO Coins!")
            if(reward != 1){
                playerr.modifyStreak(1)
                if(playerr.getCurrStreak() > playerr.getHighStreak()){
                    playerr.setHighstreak(playerr.getCurrStreak())
                }
            }else{
                playerr.resetStreak()
            }
            //message.channel.send("Your current streak is " + playerr.getCurrStreak())
            if(usedbuy.has(message.author.id)){
                message.channel.send("*used magic items")
            }
            usedCommands.add(message.author.id);
            storeCytusHeardleInfo()
            playerr.modifyCoins(reward)
            playerr.modifyLifetimeCapsos(reward)
            saveprofiles()
            userScores.push([playerid, reward])
            //deletePlayerId(message.author.id, "guess.txt")

            /**
             * Calculates how many bonues capso coins you will get from your streak. Currently not in use
             * @returns streakrewards how much bonus CAPSO Coins you will get
             */
            function calculatestreakbonus(){
                currentstreak = playerr.getCurrStreak()
            if (currentstreak%5==0){
                streakreward = currentstreak/5
            }else{
                console.log(Math.floor(currentstreak/5))
                streakreward = Math.floor(currentstreak/5) + 1
            }
            currentfame = calculatefame(playerr.getFamePoints())
            if (currentfame[3] < streakreward){
                streakreward = currentfame[3]
            }
            console.log(streakreward)
            return streakreward
            }
            

            }
            /**
             * deletes player id from the guess.txt thing. Indended to be used for removing streak if you guessed but didnt submit, but is not currently in use
             * @param {*} playerId 
             * @param {*} filePath 
             */
            function deletePlayerId(playerId, filePath) {
                fs.readFile(filePath, 'utf-8', (err, data) => {
                  if (err) {
                    console.error('Error reading file:', err);
                    return;
                  }
              
                  const playerIds = data.split('\n');
                  const index = playerIds.indexOf(playerId);
              
                  if (index !== -1) {
                    playerIds.splice(index, 1);
              
                    const updatedData = playerIds.join('\n');
              
                    fs.writeFile(filePath, updatedData, 'utf-8', (err) => {
                      if (err) {
                        console.error('Error writing to file:', err);
                      } else {
                        console.log('Player ID deleted successfully');
                      }
                    });
                  } else {
                    console.log('Player ID not found');
                  }
                });
              }
            break;
        case 'undo':
            userId = message.author.id;
            score = userScores.find((user) => user[0] === userId)
            // score will be like: [userid, score]
            if (score == null){
                message.channel.send("You haven't submitted a score")
            } else {
                let player = findprofile(score[0])
                player.modifyCoins(-score[1])
                player.modifyLifetimeCapsos(-score[1])
                saveprofiles()
                removeUser = userScores.findIndex((user) => user[0] === userId);
                userScores.splice(removeUser, 1)
                usedCommands.delete(userId)
                message.channel.send("Removed " + score[1] + " CAPSO Coins from your profile")
            }
            break;
        case 'sendhere':
            sleep(10).then(() => {message.channel.send(modifier + "Cytus Heardle #" + heardlenumber + ":")})
            sleep(100).then(() => {message.channel.send({files: ['./1.mp4']}) })
            sleep(250).then(() => {message.channel.send({files: ['./2.mp4']}) })
            sleep(400).then(() => {message.channel.send({files: ['./3.mp4']}) })
            sleep(550).then(() => {message.channel.send({files: ['./4.mp4']}) })
            sleep(700).then(() => {message.channel.send({files: ['./5.mp4']}) })
            sleep(850).then(() => {message.channel.send({files: ['./6.mp4']}) })
            sleep(10000).then(() => {message.channel.send("Answer: ||" + displayedanswer + space + "||") })
            break;
        case 'profile':
            console.log("-profile was used")
            myid = message.author.id
            idsmile = findprofile(myid)
            playerfame = calculatefame(idsmile.getFamePoints())
            message.channel.send("Your profile stats:\n" +
            "Current Fame: " + playerfame[0] + "\n" +
            "CAPSO Coins: " + idsmile.getCapsocoins() + "\n"+
            "Lifetime CAPSO Coins: " + idsmile.getLifetimeCapsos() + "\n" +
            "Current Streak: " + idsmile.getCurrStreak() + "\n" +
            "Highest Streak: " + idsmile.getHighStreak() + "\n"
            )
            break;
        case 't':
            whattosay = message.content
            console.log("-t was used: " + whattosay)
            whattosay = whattosay.substring(3, whattosay.length)
            client.channels.cache.get("584420631324524557").send(whattosay)
            break;
        case'fame':
            console.log("-fame was used")
            maxfame = 24300
            let fid = message.author.id
            let fplayer = findprofile(fid)
            console.log(fplayer.getFamePoints())
            fameinfo = calculatefame(fplayer.getFamePoints())
            console.log(fameinfo[0])
            needed = parseInt(fameinfo[2])-parseInt(fameinfo[1])
            async function sendfamesettings(){
                try{
            const famesetting = await message.channel.send('Your current fame level is: ' + fameinfo[0] +'\n' 
            + "You need "+ fameinfo[1] + " CAPSO Coins to buy the next rank (" + needed + "/"+fameinfo[2]+")" +"\n"
            + "You have " + fplayer.getCapsocoins() + " CAPSO Coins" + "\n" + 
            "(1) Buy up to next rank" + "\n" +
            "(2) Buy a custom amount" + "\n" + 
            "(3) Leave" + "\n" +
            "If the inforamtion is incorrect, please redo the command")
            const filter = () => true;
            const collector = famesetting.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
            
            collector.on("collect", async response => {
                // Record the user's response
                const userResponse = response.content;
                if (userResponse == 1){
                    if (fplayer.getCapsocoins()>=fameinfo[1]){
                        fplayer.modifyCoins(-fameinfo[1])
                        fplayer.modifyFamePoints(fameinfo[1])
                        newfame = calculatefame(fplayer.getFamePoints())
                        message.channel.send("You are now fame level " + newfame[0])
                        saveprofiles()
                    } else{
                        message.channel.send("You dont have enough CAPSO Coins")
                    }
                }else if (userResponse == 2){
                    const depositcapsocoins = await message.channel.send("How many CAPSO Coins do you want to spend?")
                    const filter = () => true;
                    const collector = depositcapsocoins.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                    collector.on("collect", async response => {
                        capsoamount = parseInt(response.content)
                        console.log(capsoamount)
                        if (Number.isInteger(parseInt(capsoamount)) && capsoamount > 0){
                        if (fplayer.getCapsocoins() >= capsoamount){
                            fplayer.modifyCoins(-capsoamount)
                            fplayer.modifyFamePoints(capsoamount)
                            if(fplayer.getFamePoints() >maxfame){
                                refundcapsos = fplayer.getFamePoints() - maxfame
                                fplayer.modifyFamePoints(-refundcapsos)
                                fplayer.modifyCoins(refundcapsos)
                            }
                            newfame = calculatefame(fplayer.getFamePoints())
                            needed = parseInt(newfame[2])-parseInt(newfame[1])
                            if (needed == 0){
                                progress = ""
                            }else{
                                progress = " (" + needed + "/" + newfame[2]+ ")"
                            }
                            message.channel.send("You are now fame level " + newfame[0] + progress)
                            saveprofiles()
                        } else {
                            message.channel.send("You dont have enough CAPSO Coins")
                        }
                    }else{
                        message.channel.send("Your input cannot be interpreted")
                    }
                    collector.stop()
                    })
        }

                collector.stop()
            })
        } catch (error) {
            console.log(error);
            await message.channel.send("There was an error processing your request.");
          }
            }
            if (fplayer.getFamePoints() >= maxfame){
                message.channel.send('Your current fame level is: ' + fameinfo[0] +'\n' 
                + "You are MAXED")
            }else{
                sendfamesettings()
            }
       
            
            break;
        case 'lb':
        case 'leaderboard':
            console.log(playerlist)
            numbers = playerlist
            numbers.pop();
            // Step 1: Extract user ID and last number from each sublist
            const extractedData = numbers.map(sublist => {
                const userId = sublist[0];
                
                const lastNumber = sublist[5];
                return { userId, lastNumber };
            });
            // Step 2: Sort the array of objects based on the last number in descending order
            extractedData.sort((a, b) => b.lastNumber - a.lastNumber);
            
            let embed = new Discord.MessageEmbed()
                .setTitle("Fame Leaderboard").setDescription('')
            extractedData.forEach(data => {
                embed.addFields({value: `<@!${data['userId']}>`, name: calculatefame(data['lastNumber'])[0]});
            });
            message.channel.send({embeds: [embed]});
            loadprofiles()
            break;
        case 'optin':
            id = message.author.id
            player = findprofile(id)
            await player.togglePing()
            if(player.getPing() == 1){
                message.channel.send("You have opted in to get pinged at 9PM if you dont do the Cytus Heardle")
            } else if (player.getPing() == 0){
                message.channel.send("You have opted out of getting pinged")
            }
            saveprofiles()
            break;   
        case 'd':
        case 'dungeon':
            
            testing = false;
            if (testing == true) {
                g = false;
                if (g == true) {
                    dungeonShop = await loadShop()
                    //newDungeon = new Dungeon([[new DungeonRoom(0, "Boss", [enemyBank.royal_champion.copy()])]], [[[10, 10, []]]])
                    newDungeon = await generateDungeon()
                    await generateShop(dungeonShop, true)
                    await saveShop(dungeonShop);
                    await saveDungeon(newDungeon)
                } else {
                    newDungeon = await loadDungeon();
                    dungeonShop = await loadShop();
                }

                
                try{
                    account = await loadAccount("./saves/412950175342919680.json")
                    foundPlayer = findprofile(412950175342919680)
                    account.setPlayer(foundPlayer) 
                } catch (err) {
                    console.error('Failed to load account:', err);
                }
                console.log(account.getEssence())
                await cytusHeardleTrial(account);
                
                console.log(account.getEssence())

                if (account.getDungeonInfo()[0]) {
                    dungeon(newDungeon, account);
                } else {
                    playerStart(account);
                }
            } else {
               
                let id = message.author.id
                found = false;
                for (i = 0; i < playerlist.length; i++) {
                    if (playerlist[i].getId() == id) {
                        found = true;
                    }
                }
                if (!found) {
                    message.channel.send("You do not have a Cytus Heardle profile. Please use -createprofile first")
                    return;
                }
                //id = Number(id);
                try {
                    console.log("./saves/" + id + ".json")
                    account = await loadAccount("./saves/" + id + ".json");
                    console.log("ACCOUNT ID:" + account.getId())
                    console.log("IDDDD:" + id)
                    console.log(account.getId().toString() != id.toString())
                    if (account.getId().toString() != id.toString()) {
                        account.setId(id);
                        await saveAccount(account)
                    }
                    foundPlayer = findprofile(id)
                    account.setPlayer(foundPlayer) 
                    
                    if (account.getDungeonInfo()[0]) {
                        dungeon(newDungeon, account);
                    } else {
                        playerStart(account);
                    }
                } catch (err) {
                    if (err.code === 'ENOENT') {
                        sendStr = "It appears this is your first time playing. Would you like to play the tutorial?\n"
                        + "(1) Yes\n"
                        + "(2) No"
                        let choosemessage = await message.channel.send(sendStr);
                        let filter = m => m.author.id === m.author.id  && !m.author.bot;
                        let Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                Collector.on("collect", async response => {
                                    if (response.author.id === client.user.id) return
                                    console.log(`Collected: ${response.content}`);    
                                    userResponse = response.content;
                                    Collector.stop()

                                    if (userResponse == 1) {
                                        await tutorial()
                                    }       
                                    
                                    newPaff = new Character("PAFF", 1, 1, 1)
                                    newNeko = new Character("NEKO#ΦωΦ", 1, 1, 1)
                                    newRobo = new Character("ROBO_Head", 1, 1, 1)
                                    newIvy = new Character("Ivy", 1, 1, 1)
                                    account = new Account(id, null, 0, 0, [newPaff, newNeko, newRobo, newIvy], [], [newPaff, newNeko, newRobo, newIvy], [], 1, 5, 1, 1, [false, false, [0, 0], [[], [], 0, [], 0, -1], [0, 0, []]])
                                    foundPlayer = findprofile(id)
                                    account.setPlayer(foundPlayer)
                                    await saveAccount(account);
                                    if (account.getDungeonInfo()[0]) {
                                        dungeon(newDungeon, account);
                                    } else {
                                        playerStart(account);
                                    }
                                })
                    } else {
                        message.channel.send("There was an error")
                        console.log(err)
                    }

                }


            }
            
            async function playerStart(account) {
                // console.log("ADSKLJMNLADJKSLDKASJ")
                // console.log(account.getCards())
                // console.log("ADSKLJMNLADJKSLDKASJ")

                for(i = 0; i < account.getCharacters().length; i++) {
                    account.getCharacters()[i].resetStats()
                }
                try {
                    option = await mainMenu(account);
                //console.log("Option: " + option)
                } catch (err) {
                    message.channel.send("There was an error")
                    console.log(err)
                }
                account.copyDeck();
                //console.log(newDungeon)
                if (option == 1) {
                    //await saveAccount(account);
                    console.log("starting rub")
                    message.channel.send("Starting run")
                    account.setDungeonInfo([false, false, [0, 0], [[], [], 0, [], 0, -1], []])
                    await dungeon(newDungeon, account);
                }
            } 

            async function dungeon(dungeon, account){
                //message.channel.send("Starting dungeon run")
                let alive = true;
                let keepGoing = true;
                let floor = 1;
                let level = 1
                xp = 1;
                if (account.getDungeonInfo()[0]) {
                    message.channel.send("resuming dungeon run")
                    console.log("resuming dungeon run")
                    console.log("dungeon type is: " + account.getDungeonInfo()[3][2])
                    account.setLoot(account.getDungeonInfo()[4])
                    floor = parseInt(account.getDungeonInfo()[2][0]);
                    if (floor == 3) {
                        keepGoing = false;
                    }
                    level = parseInt(account.getDungeonInfo()[2][1]);
                    xp = account.getDungeonInfo()[3][4];
                    console.log("SDFLJK");
                    
                    if (!dungeon.containsPlayer(account.getId())) {
                        sendStr = "It seems the dungeon has restarted\n"
                        console.log("ENTERED ASND WORKS");
                        if (account.getDungeonInfo()[1]) {
                            sendStr += "You were still in a battle so you must finish it. You will not get loot for this battle."
                            message.channel.send(sendStr)
                            quitCheck = await battleRoom(dungeon.getRoom(floor, level));
                            if (quitCheck == "player quit") {
                                return;
                            }
                        } else {
                            sendStr += "You will be exiting with your loot"
                            message.channel.send(sendStr)
                        }
                        if (account.getWagonHp() <= 0) {
                            keepGoing = false;
                            alive = false;
                        } else {
                            keepGoing = false;
                        }
                        
                    } 
                } else {
                    account.getDungeonInfo()[0] = true;
                    account.getDungeonInfo()[4] = account.getLoot();
                    account.getDungeonInfo()[3][4] = xp;
                    account.getDungeonInfo()[2] = [floor, level]
                    account.setNewDungeon(false)
                    dungeon.addPlayer(account.getId())
                    await saveDungeon(dungeon)
                }
                
                while (keepGoing) {
                    //currentRoom = dungeon.getRoom(floor, level);
                    //ask the user if they want to do the room or leave.
                    //if they leave, set keepGoing to false, skip everything
                    // let choosemessage = await message.channel.send();
                    // let filter = m => m.author.id === m.author.id  && !m.author.bot;
                    // let Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                    //         Collector.on("collect", async response => {
                    //             if (response.author.id === client.user.id) return
                    //             console.log(`Collected: ${response.content}`);    
                    //             userResponse = response.content;
                    //             Collector.stop()

                    //             if (userResponse == 1) {
                    //             //your code here                  
                    //             resolve();
                    //             }          

                    //         })

                    message.channel.send("Floor " + floor + " level " + level);
                    
                    roomResult = await processRoom(dungeon.getRoom(floor, level));
                    if (roomResult == "player quit") {
                        message.channel.send("ok bye");
                        return "player quit";
                    } else if (roomResult == 1) { 
                        console.log("Reward stuff")
                        console.log(((floor - 1) * dungeon.rooms[0].length) + level);
                        console.log(account.getHighestClearRoom());
                        console.log("Reward stuff end")
                        //checking if its your highest floor (for CAPSO Coin reward)
                        if (((floor - 1) * dungeon.rooms[0].length) + level > dungeon.getHighestFloor(account.getId())) {
                            dungeon.setHighestFloor(account.getId(), ((floor - 1) * dungeon.rooms[0].length) + level)
                            lootMessage = "You got " + dungeon.getLoot(floor, level)[0] + " CAPSO Coins and " + dungeon.getLoot(floor, level)[1] + " MMessence\n"
                            
                            account.getLoot()[0] += dungeon.getLoot(floor, level)[0];
                            if (dungeon.getLoot(floor, level)[2].length != 0) { 
                                lootMessage += "You recieved the following cards:\n"
                                for(i = 0; i < dungeon.getLoot(floor, level)[2].length; i++) {
                                    account.getLoot()[2].push(dungeon.getLoot(floor, level)[2][i]);
                                    lootMessage += dungeon.getLoot(floor, level)[2][i].getName() + "\n"
                                }
                            }
                        } else {
                            lootMessage = "You got " + dungeon.getLoot(floor, level)[1] + " MMessence\n"   
                        }
                        account.setCurrentClearRoom(((floor - 1) * dungeon.rooms[0].length) + level)
                        account.getLoot()[1] += dungeon.getLoot(floor, level)[1];
                        message.channel.send(lootMessage);

                        level++;
                        
                        if (level >= dungeon.rooms[floor-1].length) {
                            level = 1;
                            floor++;
                        }
                        account.getDungeonInfo()[2] = [floor, level];
                        await saveAccount(account);
                        if (floor == 3) {
                            message.channel.send("Congratulations! you beat the dungeon")
                            keepGoing = false;
                        }
                    } else if (account.getWagonHp() <= 0) {
                        keepGoing = false;
                        alive = false;
                    } else if (roomResult == -1) {
                        keepGoing = false;
                    }
                    await saveDungeon(dungeon)
                }
                
                if (!alive) {
                    account.getLoot()[0] = 0
                    account.getLoot()[1] = 0;
                    account.getLoot()[2] = [];
                    account.setCurrentClearRoom(0)
                } else {
                    // //this handles if whether the new run floor is actually higher or not
                    // if (dungeon.getCurrentPlayers().includes(account.getId())) {
                    //     dungeon.setHighestFloor(account.getId(), ((floor - 1) * dungeon.rooms[0].length) + level)
                    // }
                }
                
                loot = "Your loot:\n" 
                + account.getLoot()[0] + " CAPSO Coins\n"
                + account.getLoot()[1] + " MMessence\n"
                + "Cards:\n"
                console.log("LOOT SENDING")
                console.log(account.getLoot())
                console.log(account.getLoot()[2])
                console.log(account.getLoot()[2].length)
                console.log(account.getLoot()[2][0])
                console.log("END")
                for (j = 0; j < account.getLoot()[2].length; j++) {
                    loot += account.getLoot()[2][j].getName() + "\n"
                }
                loot += "Press any button to continue..."
                
                account.getDeck().push(...account.getDiscard())
                account.setDiscard([]);
                account.discardTempCards();
                account.setWagonHp(account.getMaxWagonHp())

                account.getPlayer().modifyCoins(account.getLoot()[0]);
                account.incEssence(account.getLoot()[1]);
                for (i = 0; i < account.getLoot()[2].length; i++) {
                    account.getCards().push(account.getLoot()[2][i]);
                    console.log("Adding EW CARD")
                }
                account.resetLoot()
                console.log("Added loot to accoutn")

                account.getDungeonInfo()[0] = false;
                account.resetDungeonInfo();
                for (i = 0; i < account.getTeam(); i++) {
                    if (account.getTeam()[i] instanceof Character) {
                        account.getTeam()[i].resetStats();
                    } else {
                        account.getTeam().splice(i, 1)
                        i--;
                    }
                }
                
                await saveAccount(account)
                await dungeon.removePlayer(account.getId())
                await saveDungeon(dungeon)
                
                let choosemessage = await message.channel.send(loot);
                let filter = m => m.author.id === m.author.id  && !m.author.bot;
                let Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                        Collector.on("collect", async response => {
                            if (response.author.id === client.user.id) return
                            console.log(`Collected: ${response.content}`);    
                            userResponse = response.content;
                            Collector.stop()
                            
                            playerStart(account)

                        })
                
              
                /**
                 * returns 1 if you can advance to the next room, 0 if you cannot, -1 if the player decides to quit out of the dungeon
                 * @param {*} room 
                 */
                async function processRoom(room) {
                    return new Promise(async (resolve, reject) => {
                        switch(room.getType()) {
                            case 0:
                                battleResult = await battleRoom(room.getDescription(), room.getVar1(), room.getVar2());
                                console.log("Battleroom returned: " + battleResult)
                                resolve(battleResult);
                                break;
                            case 1:
                                roomResult = await campfire(account.getTeam(), account.getDeck())
                                resolve(roomResult);
                                break;
                            case 2:
                                roomResult = await cytusHeardleTrial(account)
                                resolve(roomResult);
                                break;
                            case 3:
                                await wizardSpell(account)
                                resolve(true);
                                break;
                            case 4:
                                roomResult = await donationRequest(account, room)
                                resolve(roomResult);
                                break;
                            case 5:
                                await cardFountain(account, room)
                                resolve(true);
                                break;
                            case 6:
                                roomResult = await inariShrine(account)
                                resolve(roomResult);
                                break;
                        }

                })
            }

            

            async function battleRoom(text, enemies, xp){

                return new Promise (async(resolve, reject) => {
                    resolve(await firstMenu())
                })
                
    
                async function firstMenu() {
                    return new Promise(async (resolve, reject) => {
                        if (account.getDungeonInfo()[1]) {
                            result = await battle(account, account.getDungeonInfo()[3][0], account.getDungeonInfo()[3][1], account.getDeck(), account.getDungeonInfo()[3][2] * -1, xp)
                            if (result == "player quit") {
                                console.log("hbattle room return player quit")
                                resolve("player quit")
                                return;
                            } else if (result) {          
                                            resolve(1);
                                        } else {
                                            resolve(0)
                                        }
                        } else {
                            teamInfo = "";
                            teamInfo += "Wagon:\n" + account.getWagonHp() + "HP\n\n" 
                            for (i = 0; i < account.getTeam().length; i ++){
                                teamInfo +=  account.getTeam()[i].getName() + ":\n" +
                                account.getTeam()[i].getHp() + "HP\n\n"
                            }
                            const newembed = new MessageEmbed()
                            .setColor('#0099ff')
                            .setTitle("Team")
                            .setDescription(teamInfo);
                            await message.channel.send({ embeds: [newembed] });

                            if (text.length == 0) {
                                text = "Battle"
                            }
                            text += "\n(1) Fight\n(2) Leave\nType quit to leave"
                            let choosemessage = await message.channel.send(text);
                            let filter = m => m.author.id === m.author.id  && !m.author.bot;
                            let Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                    Collector.on("collect", async response => {
                                        if (response.author.id === client.user.id) return
                                        console.log(`Collected: ${response.content}`);    
                                        userResponse = response.content;
                                        Collector.stop()
        
                                        if (userResponse == 1) {
                                            let enemiesCopy = []
                                            for (let copy = 0; copy < enemies.length; copy++) {
                                                enemiesCopy.push(enemies[copy].copy())
                                            }
                                            result = await battle(account, [], enemiesCopy, account.getDeck(), 1, xp)
                                            if (result == "player quit") {
                                                resolve("player quit")
                                                return;
                                            } else if (result) {          
                                                resolve(1);
                                            } else {
                                                resolve(0)
                                            }
                                        } else if (userResponse ==2) {
                                            resolve(await areYouSure());
                                        } else if (userResponse == "quit" || userResponse == "Quit"){
                                            resolve("player quit");
                                        } else {
                                            message.channel.send("Your response cannot be interpreted")
                                            text = "";
                                            resolve(await firstMenu())
                                        }
        
                                    })
                        }
                    })
                }
    
                async function areYouSure() {
                    return new Promise(async(resolve, reject) => {
                        text = "Leaving will return you to the main menu and end your run. Are you sure?\n"
                        + "(1) Yes - end run\n"
                        + "(2) No - start battle\n"
                        let choosemessage = await message.channel.send(text);
                        let filter = m => m.author.id === m.author.id  && !m.author.bot;
                        let Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                Collector.on("collect", async response => {
                                    if (response.author.id === client.user.id) return
                                    console.log(`Collected: ${response.content}`);    
                                    userResponse = response.content;
                                    Collector.stop()
    
                                    if (userResponse == 1) {       
                                        resolve(-1);
                                    } else if (userResponse ==2) {
                                        result = await battle(account, [], enemies, account.getDeck(), 1, xp);
                                        if (result == "player quit") {
                                            resolve("player quit")
                                        } else if (result) {
                                            resolve(1)
                                        } else {
                                            resolve(0);
                                        }
                                    } 
    
                                })
                    })
                }
            }
            
            }


            //await cytusHeardleTrial(playerCharacters, playerDeck)
            //alive = await battle(playerCharacters, enemies, playerDeck, 0)
           

            // if (alive) {
            // message.channel.send("Million Master!")
            // playerDeck = [damageAll, extraDamage, healing]
            // enemies = [new Enemy("Hog Rider", 210, 658, 4), new Enemy("Ice spirit", 50, 230, 1), new Enemy("musketeer", 350, 350, 4), new Enemy("skeletons", 1, 3, 0), new Enemy("cannon", 400, 250, 3), new Enemy("ice golem", 100, 500, 2), new Enemy("log", 100, 100, 2), new Enemy("fireball", 349, 201, 4)]
            // alive = await battle(playerCharacters, enemies, playerDeck);
            // }

            // if (alive) {
            // message.channel.send("No more gold!")
            // playerDeck = [damageAll, extraDamage, healing]
            // message.channel.send("Shhhh sleepers")
            // enemies = [new Enemy("sleeper", 400, 300, 3), new Enemy("ranged sleeper", 200, 500, 5), new Enemy("Big guy", 1500, 1500, 15), new Enemy("Charger", 500, 450, 3)]
            // alive = await battle(playerCharacters, enemies, playerDeck);
            // }

            // if (alive) {
            // message.channel.send("Congratulations you beat the game!")
            // }

            /**
             * 
             * @param {*} players array of character classes
             * @param {*} enemies array of enemy classes
             * @param {*} deck array of card classes
             * @param {int} type 1-normal battle, 2-boss
             * @returns 
             */
            async function battle(account, players, enemies, deck, type, xp){
                let dungeonType = type
                let dungeonXp = xp
                //console.log("DUNGEONXO" +dungeonXp);
                //console.log("DUNGEON TYPE" + dungeonType);
                account.getDungeonInfo()[1] = true;
                loadedBattle = false;
                wagonSpeed = 0;
                characterChance = 0;
                inBtwnMessages = ""
                if (type < 0) {
                    dungeonType *= -1
                    loadedBattle = true;
                    type *= -1;
                    characterChance = account.getDungeonInfo()[3][6]
                    wagonSpeed = account.getDungeonInfo()[3][5]
                    numBoosts = account.getDungeonInfo()[3][7]
                    for (i = 0; i < players.length; i++) {
                        if (players[i] instanceof Character) {
                           
                            for (j = 0; j < account.getTeam().length; j++) {
                                if (account.getTeam()[j].getName() == players[i].getName()) {
                                    account.getTeam()[j] = players[i];
                                }
                            }
                        }
                    }
                } else {
                    wagonSpeed = 10;
                    characterChance = 25;
                    numBoosts = account.getBoostLvl();
                    account.getDungeonInfo()[3][2] = type
                    account.getDungeonInfo()[3][4] = xp
                    account.getDungeonInfo()[3][0] = players
                    account.getDungeonInfo()[3][1] = enemies
                    await chooseStarter();
                    await setInitialSpeed()
                    for(i = 0; i < enemies.length; i++) {
                        if (i == 0) {
                            
                        } else if (i == 1 || i == 2) {
                            enemies[i].incSpeed(10)
                        } else {
                            enemies[i].incSpeed(20 + (((i-3)/3) * 10))
                        }
                    }
                }

                async function chooseStarter(){
                    return new Promise(async (resolve, reject) => {
                        if (account.getTeam().length != 0) {
                            sendStr = "Select a starting character:\n"
                            counter = 1;
                            for (let i = 0; i < account.getTeam().length; i++) {
                                if (account.getTeam()[i].getHp() > 0) {
                                    sendStr += "(" + counter + ") " + account.getTeam()[i].getName() + " - " + account.getTeam()[i].getHp() + "HP\n"
                                    counter++;
                                }
                            }

                            let choosemessage = await message.channel.send(sendStr);
                            let filter = m => m.author.id === m.author.id  && !m.author.bot;
                            let Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                    Collector.on("collect", async response => {
                                        if (response.author.id === client.user.id) return
                                        console.log(`Collected: ${response.content}`);    
                                        userResponse = response.content;
                                        Collector.stop()

                                        if (userResponse >= 1 && userResponse <= account.getTeam().length) {
                                            j = userResponse - 1;
                                            
                                            trueIndex = 0;
                                            let index = 0;
                                            playerTeam = account.getTeam()
                                            
                                            while (index != j) {
                                                if (playerTeam[index].getHp() > 0) {
                                                    index++;
                                                }
                                                trueIndex++;
                                            }  
                                            players.push(account.getTeam()[trueIndex]);  
                                            
                                            for (let i = 0; i < account.getTeam().length; i++) {
                                                if (i != j && account.getTeam()[i].getHp() > 0) {
                                                    addCard = new Card(21, account.getTeam()[i].getName(), account.getTeam()[i].getAtk() + "Atk, " + account.getTeam()[i].getHp() + "HP", 1, 1, account.getTeam()[i].getName(), null)
                                                    deck.unshift(addCard);
                                                }
                                            }
                                            resolve();
                                        }          

                                    })

                            // chooseStarter = [];
                            // for (i = 0; i < account.getTeam().length; i++) {
                            //     if (account.getTeam()[i].getHp() > 0 ){
                            //         newLabel = {label: account.getTeam()[i].getName(), description: account.getTeam()[i].getAtk() + "Atk, " + account.getTeam()[i].getHp() + "HP", value: String(i)}
                            //         chooseStarter.push(newLabel)
                            //     }
                            // }
                            // const row = new MessageActionRow()
                            //     .addComponents(
                            //         new MessageSelectMenu()
                            //             .setCustomId('starter-chooser')
                            //             .setPlaceholder('Choose a starting character...')
                            //             .addOptions(chooseStarter)
                            //     );
                            
                            //     let sentMessage = await message.channel.send({ components: [row] });
            
                            //     filter = interaction => interaction.customId === 'starter-chooser' && interaction.user.id === message.author.id;
        
                            //     collector = sentMessage.createMessageComponentCollector({ filter, max: 1, time: 60000 });
        
                            //     collector.on('collect', async interaction => {
                            //         await interaction.deferUpdate();
                            //         const selectedValue = parseInt(interaction.values[0]);
                            //         trueIndex = 0;
                            //         i = 0;
                            //         playerTeam = account.getTeam()
                            //         while (i != selectedValue) {
                            //             if (playerTeam[i].getHp() > 0) {
                            //                 i++;
                            //             }
                            //             trueIndex++;
                            //         }

                            //         let selectedCharacter = playerTeam[trueIndex];
                                    
        
                            //         players.push(selectedCharacter);
                            //         for (i = 0; i < playerTeam.length; i++) {
                            //             if (i != trueIndex && playerTeam[i].getHp() > 0) {
                            //                 addCard = new Card(21, playerTeam[i].getName(), playerTeam[i].getAtk() + "Atk, " + playerTeam[i].getHp() + "HP", 1, 1, playerTeam[i].getName(), null)
                            //                 deck.unshift(addCard);
                            //             }

                            //         }
                            //         resolve();
        
                            //     });
        
                            //     collector.on('end', collected => {
                            //         if (!collected.size) {
                            //             return;
                            //         }
                            //     });
                        }
                        
                    })
                }

                if (type == 1) {
                    battleWin = false;
                    boostStatus = false;
                    if (loadedBattle) {
                        hand = account.getDungeonInfo()[3][3];
                    } else {
                        hand = [];
                        drawMessage = await addToHand()
                        drawMessage += await addToHand()
                        drawMessage += await addToHand()
                        if (drawMessage.length != 0) {
                            message.channel.send(drawMessage)
                        }
                    }
                    let done = false
                    
                    while (done == false){
                        if (inBtwnMessages.length >= 1000) {
                            message.channel.send(inBtwnMessages);
                            inBtwnMessages = "";
                        }
                        await lowerSpeed();
                        done = await doTurn();
                        if (done == "player quit"){
                            return "player quit"
                        }
                    }
                    for ( i = 0; i < hand.length; i++) {
                        deck.push(hand[i]);
                    }
                    for ( i = 0; i < players.length; i++) {
                        if (players[i] instanceof Character) {
                            players[i].resetState()
                        }
                    }
                    
                    for (i = 0; i < deck.length; i++) {
                        //console.log(deck[i].getId())
                        if (!deck[i] || deck[i].getId() == 21 || deck[i].getId() == "21") {
                            //console.log("Removing this card")
                            deck.splice(i, 1);
                            i--;
                        } 
                    }

                    for (i = 0; i < account.getDiscard().length; i++) {
                        if (!account.getDiscard()[i] || account.getDiscard()[i].getId() == 21 || account.getDiscard()[i].getId() == "21") {
                            //console.log("Removing this card")
                            account.getDiscard().splice(i, 1);
                            i--;
                        } 
                    }
                    //console.log(account.getDeck())
                    account.getDungeonInfo()[1] = false;
                    return battleWin;
                } else if (type == 2) {
                    bossName = enemies[0].getName();
                    bossMaxHP = enemies[0].getMaxHp();
                    songLength = 1
                    songGuessed = false;
                    battleWin = false;
                    boostStatus = true;
                    hand = [];
                    await addToHand()
                    await addToHand()
                    await addToHand()
                    let done = false
                    //await setInitialSpeed()
                    bossSongname = await getRandomSong("songnamestrue.txt")
                    bossSong = await createDungeonHeardle(bossSongname, songLength, 0, false)
                    
                    // await lowerSpeed();
                    // done = await doTurn();
                    while (done == false){
                        // songGuessed = guessSongOnce(bossSong);
                        if (inBtwnMessages.length >= 1000) {
                            message.channel.send(inBtwnMessages);
                            inBtwnMessages = "";
                        }
                        await lowerSpeed();
                        done = await doTurn(type);
                        //console.log("songGuessed is: " + songGuessed)
                        if (!songGuessed){
                            //console.log("bossName is: " + bossName)
                            //console.log("enemies[0].getName() is: " + enemies[0].getName())
                            if (bossName == enemies[0].getName()) {
                                //console.log("The if statement is true")
                                newSongLength = Math.floor((1 - enemies[0].getHp()/bossMaxHP ) * 10)
                                //console.log("newSongLength is: " + newSongLength)
                                if (newSongLength > songLength) {
                                    songlength = newSongLength
                                    fs.unlink(bossSong.getOutputDirectory(), (err) => {
                                        if (err) {
                                        console.log(err);
                                        } else {
                                        
                                        }
                                    });
                                    bossSong = await createDungeonHeardle(bossSongname, songLength, 0, false)
                                }
                            } else {
                                if (songLength != 10) {
                                    songLength = 10
                                    fs.unlink(bossSong.getOutputDirectory(), (err) => {
                                        if (err) {
                                        console.log(err);
                                        } else {
                                        
                                        }
                                    });
                                    bossSong = await createDungeonHeardle(bossSongname, songLength, 0, false)
                                }
                            }
                        }
                    }
                    fs.unlink(bossSong.getOutputDirectory(), (err) => {
                        if (err) {
                        console.log(err);
                        } else {
                        
                        }
                    });
                    for ( i = 0; i < hand.length; i++) {
                        deck.push(hand[i]);
                    }
                    return battleWin;
                }

                async function guessSongOnce(p) {
                    return new Promise(async (resolve, reject) => {
                        try {
                            await message.channel.send({files: [bossSong.getOutputDirectory()]})
                            quitDamage = Math.floor(p.getMaxHp()*.1);
                            const choosemessage = await message.channel.send("Guess the song. DO NOT type -g\nPress (0) to quit and take " + quitDamage + " damage")
                                const filter = m => m.author.id === m.author.id  && !m.author.bot;
                                const Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                Collector.on("collect", async response => {
                                    if (response.author.id === client.user.id) return
                                    userResponse = response.content
                                    Collector.stop();
                                    guessResult = await processGuess(userResponse, [bossSong.getSongname()]);
                                    //console.log("guessresult", guessResult)
                                    if (guessResult == 1){
                                        message.channel.send("THATS RIGHT")
                                        resolve(true)
                                    } else if (userResponse == 0){
                                        message.channel.send("quitting out")
                                        resolve(false);
                                    } else if (guessResult == 0) {
                                        message.channel.send("Incorrect");
                                        resolve(false)
                                    } else if (guessResult == -1) {
                                        message.channel.send("Could not find that answer");
                                        result = await guessSongOnce(song, hpLoss);
                                        resolve(result);
                                    }
                                })
                        } catch (error) {
                            console.log(error)
                            message.channel.send("There was an error")
                        }
                    })
                }

                async function lowerSpeed(){
                    return new Promise((resolve, reject) =>{
                        let lowest = wagonSpeed;
                        for(i = 0; i < players.length; i++) {
                            if (players[i].getSpeed() < lowest) {
                                lowest = players[i].getSpeed()
                            }
                        }

                        for(i = 0; i < enemies.length; i++) {
                            if (enemies[i].getSpeed() < lowest) {
                                lowest = enemies[i].getSpeed()
                            }
                        }
                        //console.log("LOWEST SPEED: " + lowest)
                        for(i = 0; i < players.length; i++) {
                            players[i].setSpeed(players[i].getSpeed() - lowest);
                        }

                        for(i = 0; i < enemies.length; i++) {
                            enemies[i].setSpeed(enemies[i].getSpeed() - lowest);
                        }
                        //console.log("WAGON SDPasdfdEED: " + wagonSpeed)
                        wagonSpeed -= lowest;
                        //console.log("WAGON SDPEasdfED: " + wagonSpeed)
                        resolve()
                    })
                }

                async function doTurn(type) {
                    return new Promise(async (resolve, reject) => {
                        await checkforWin()
                        .then((result) => {
                            if(result == "player win"){    
                                for (i = 0; i < account.getDeck().length; i++) {
                                    if (account.getDeck()[i].getId() == 21) {
                                        account.getDeck().splice(i, 1)
                                        i--;
                                    }
                                }
                                //console.log("The player has won")
                                inBtwnMessages += "You win!!!\n"
                                message.channel.send(inBtwnMessages)
                                inBtwnMessages = ""
                                battleWin = true;
                                resolve(true)
                                return;
                            } else if (result == "enemy win"){
                                for (i = 0; i < account.getDeck().length; i++) {
                                    if (account.getDeck()[i].getId() == 21) {
                                        account.getDeck().splice(i, 1)
                                        i--;
                                    }
                                }
                                //console.log("The enemy has won")
                                inBtwnMessages += "You lost :(((("
                                message.channel.send(inBtwnMessages)
                                inBtwnMessages = ""
                                battleWin = false;
                                resolve(true)
                                return;
                            }
                        })  

                        playerAction = false;
                        //console.log("start cycle")
                        if (boostStatus && numBoosts <= 0) {
                            boostStatus = false;
                        }

                        if (wagonSpeed <= 0) {
                            account.setBattleInfo([players, enemies, dungeonType, hand.slice(), dungeonXp, wagonSpeed, characterChance, numBoosts])
                            await saveAccount(account);
                            result = await doWagonTurn();
                            wagonSpeed = 10;
                            //console.log('End of bonus turn')
                            if (result == true) {
                                message.channel.send('Successfully escaped')
                                battleWin = false;
                                resolve(true);
                                return;
                            } else if (result == "player quit") {
                                resolve("player quit")
                                return;
                            }
                        }

                        for (let i = 0; i < players.length; i++) {
                        
                            if(players[i].getHp() >= 0){
                                if(players[i].getSpeed() <= 0) {
                                    if (players[i].hasFear()) {
                                        fearchance = Math.floor(Math.random() * 100) + 1
                                    }
                                    if (!players[i].hasFreeze() && (!players[i].hasFear() || players[i].getFear() < fearchance)) {
                                        //playerAction = true;
                                        if (players[i] instanceof Character) {
                                            account.setBattleInfo([players, enemies, dungeonType, hand.slice(), dungeonXp, wagonSpeed, characterChance, numBoosts])
                                            await saveAccount(account);
                                            quitCheck = await doPlayerAttack(players[i], type);
                                            if (quitCheck == "player quit") {
                                                resolve("player quit");
                                                return;
                                            }
                                            //console.log("player attack finished")
                                        } else if (players[i] instanceof Enemy) {
                                            await doEnemyAttack(players[i], 1);
                                            //console.log("player (npc) attack finished")
                                        }
                                        
                                        await players[i].resetSpeed();
                                        
                                        
                                    }else {
                                        if (players[i].hasFreeze()) {
                                            inBtwnMessages += players[i].getName() + " is frozen\n";
                                        } else if (players[i].hasFear()) {
                                            inBtwnMessages += players[i].getName() + " was too scared to attack\n"
                                        }
                                        await players[i].resetSpeed();
                                    }
                                    //console.log("Doing player ailments")
                                    ailmentMessage = "";
                                    if (players[i] != undefined) {
                                        ailmentMessage = await players[i].doAilments();
                                    } else {
                                        players.splice(i, 1);
                                        i--;
                                    }
                                    
                                    if (ailmentMessage.length > 0 && ailmentMessage != "undefined") {
                                        inBtwnMessages += ailmentMessage;
                                    }
                                    //console.log("checking dead players")
                                    await checkDeadPeople(players)
                                    //console.log("checking dead enemies")
                                    cardDraw = await checkDeadPeople(enemies)
                                    if (cardDraw != 0) {
                                        for (j = 0; j < cardDraw; j++) {
                                            inBtwnMessages += await addToHand();
                                        }
                                    }
                                } else {
                                    await players[i].decreaseSpeed();
                                }
                            }
                        }
                        //console.log("end of player check")
                        for (let ene = 0; ene < enemies.length; ene++) {
                            if(enemies[ene].getHp() >= 0){
                               
                                if (enemies[ene].getSpeed() <= 0){
                                    //console.log("Enemy is attacking")
                                    if (enemies[ene].hasFear()) {
                                        fearchance = Math.floor(Math.random() * 100) + 1
                                    }
                                    if (!enemies[ene].hasFreeze() && (!enemies[ene].hasFear() || enemies[ene].getFear() < fearchance)) {
                                        //console.log("Doing enemy attack");
                                        await doEnemyAttack(enemies[ene], 0)
                                        //console.log("Enemy attack finished")
                                        await enemies[ene].resetSpeed();
                                        
                                    } else {
                                        if (enemies[ene].hasFreeze()) {
                                            inBtwnMessages += enemies[ene].getName() + " is frozen\n";
                                        } else if (enemies[ene].hasFear()) {
                                            inBtwnMessages += enemies[ene].getName() + " was too scared to attack\n"
                                        }
                                        await enemies[ene].resetSpeed();
                                    }

                                    if (enemies[ene] != undefined) {
                                        ailmentMessage = await enemies[ene].doAilments();
                                        if (ailmentMessage.length != 0 && ailmentMessage != "undefined") {
                                            inBtwnMessages += ailmentMessage
                                        }
                                    }
                                    //console.log("checking dead players")
                                    await checkDeadPeople(players)
                                    //console.log("checking dead enemies")
                                    cardDraw = await checkDeadPeople(enemies)
                                    if (cardDraw != 0) {
                                        for (i = 0; i < cardDraw; i++) {
                                            await addToHand();
                                        }
                                    }
                                } else {
                                    await enemies[ene].decreaseSpeed();
                                }
                            }
                        }
                        //console.log("end of enemy check")

                        


                        await checkDeadPeople(players);

                        await checkforWin()
                        .then((result) => {
                            if(result == "player win"){    
                                for (i = 0; i < account.getDeck().length; i++) {
                                    if (account.getDeck()[i].getId() == 21) {
                                        account.getDeck().splice(i, 1)
                                        i--;
                                    }
                                }
                                //console.log("The player has won")
                                inBtwnMessages += "You win!!!\n"
                                message.channel.send(inBtwnMessages)
                                inBtwnMessages = ""
                                battleWin = true;
                                resolve(true)
                            } else if (result == "enemy win"){
                                for (i = 0; i < account.getDeck().length; i++) {
                                    if (account.getDeck()[i].getId() == 21) {
                                        account.getDeck().splice(i, 1)
                                        i--;
                                    }
                                }
                                //console.log("The player has won")
                                inBtwnMessages += "You lost :(((("
                                message.channel.send(inBtwnMessages)
                                inBtwnMessages = ""
                                battleWin = false;
                                resolve(true)
                            }
                        })  
                        //console.log("end cycle")
                        resolve(false);
                    })
                }

                function checkforWin(){
                    return new Promise((resolve, reject) => {
                        //old code idk if I hsould actually keep it
                        // let everyplayerdead = true;
                        // for (let i = 0; i < players.length; i++) {
                        //     if(players[i].getHp() > 0){
                        //         everyplayerdead = false;
                        //         break;
                        //     }
                        // }
                        // if (everyplayerdead){
                        //     resolve("enemy win");
                        // }
                        if (account.getWagonHp() <= 0) {
                            resolve("enemy win");
                        }
                        let everyenemydead = true
                        for (let i = 0; i < enemies.length; i++) {
                            if(enemies[i].getHp() > 0){
                                everyenemydead = false;
                                break;
                            }
                        }
                        if (everyenemydead){
                            resolve("player win");
                        }

                        resolve();
                    })
                }

                async function doWagonTurn() {
                    return new Promise(async(resolve, reject) => {
                        playerQuit = false;
                        isEscaped = false;
                        firstIteration = true;
                        if (inBtwnMessages.length > 0) {
                            message.channel.send(inBtwnMessages) 
                            inBtwnMessages = "";
                        }
                        await firstMenu()
                        if (playerQuit) {
                            resolve("player quit")
                            return;
                        }
                        resolve(isEscaped)
                    })
                    

                    async function firstMenu() {
                        return new Promise(async (resolve, reject) => {
                            try{
                                //create info for team
                                teamInfo = "Wagon:\n" + account.getWagonHp() + "HP\n\n"
                                for (i = 0; i < players.length; i ++){
                                    teamInfo += players[i].getName() + ":\n" +
                                    players[i].getHp() + "HP\n\n"
                                }
                                
                                enemyInfo = ""
                                for (i = 0; i < enemies.length; i ++){
                                    enemyInfo += enemies[i].getName() + ":\n" +
                                    enemies[i].getHp() + "HP\n\n"
                                }

                                handInfo = ""
                                for (i = 0; i < hand.length; i++) {
                                    handInfo += hand[i].getName() + "\n"
                                }

                                setTitle = "Hand"
                                setDescription = handInfo
                                if (hand.length == 0) {
                                    setTitle = "Team"
                                    setDescription = teamInfo
                                }

                                const newembed = new MessageEmbed()
                                .setColor('#0099ff')
                                .setTitle(setTitle)
                                .setDescription(setDescription);

                            const row = new MessageActionRow()
                                .addComponents(
                                    new MessageButton()
                                        .setCustomId('view_hand')
                                        .setLabel('Hand')
                                        .setStyle('PRIMARY'),
                                    new MessageButton()
                                        .setCustomId('view_team')
                                        .setLabel('Team')
                                        .setStyle('PRIMARY'),
                                    new MessageButton()
                                        .setCustomId('view_enemies')
                                        .setLabel('Enemies')
                                        .setStyle('PRIMARY'),
                                );

                            const sentMessage = await message.channel.send({ embeds: [newembed], components: [row] });

                            const infoFilter = i => i.user.id === message.author.id;

                            const infoCollector = sentMessage.createMessageComponentCollector({ infoFilter, time: 60000 });

                            infoCollector.on('collect', async interaction => {
                                if (interaction.customId === 'view_team') {
                                    newembed.setTitle("Team");
                                    newembed.setDescription(teamInfo);
                                } else if (interaction.customId === 'view_hand') {
                                    newembed.setTitle("Hand");
                                    newembed.setDescription(handInfo);
                                } else if (interaction.customId === 'view_enemies') {
                                    newembed.setTitle("Enemies");
                                    newembed.setDescription(enemyInfo);
                                }

                                await interaction.update({ embeds: [newembed], components: [row] });
                            });

                            infoCollector.on('end', collected => {
                                //console.log(`Collected ${collected.size} interactions.`);
                            });
                            if (firstIteration) {
                                wagonTurnMessage = "Bonus Turn!\n"
                                wagonTurnMessage += await addToHand() + "\n";
                                firstIteration = false;
                            } else {
                                wagonTurnMessage = "";
                            }

                            wagonTurnMessage += "(1) Play a Card\n"
                            wagonTurnMessage += "(2) Skip\n"
                            + "(3) Escape\n"
                            + "(4) Forfeit\n"
                            + 'Type "quit" to leave'
                            let choosemessage = await message.channel.send(wagonTurnMessage)
                            // Set up a filter to listen for the user's response
                            const filter = m => m.author.id === m.author.id  && !m.author.bot
                            const collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                        
                            // Wait for the user to respond
                            collector.on("collect", async response => {
                                // if the response is from a bot, ignore
                            if (response.author.id === client.user.id) return
                            // Record the user's response
                            const userResponse = response.content;
                            collector.stop()
                           if (userResponse == 1){
                                collector.stop()
                                await useCard()
                                resolve()
                            } else if (userResponse == 2) {
                                resolve();
                            } else if (userResponse == 3) {
                                if (hand.length < 5) {
                                    message.channel.send("You need " + (5-hand.length) + " more cards in order to escape")
                                    await firstMenu();
                                    resolve();
                                } else {
                                    await escape();
                                    resolve("enemy win");
                                }
                                
                            } else if (userResponse == 4) {
                                await forfeit();
                                resolve();
                            } else if (userResponse == "quit" || userResponse == "Quit"){
                                playerQuit = true;
                                resolve("player quit");
                                return
                            } else {
                                message.channel.send('Your action could not be interpreted')
                                collector.stop()
                                await firstMenu()
                                resolve()
                          }
                         
                          collector.stop()
                        });
                      
                        collector.on('end', collected=>{
                          //console.log("Finished collecting")
                          //console.log(`Collected ${collected.size} response(s)`);
                          
                        })



                            } catch (error) {
                                message.channel.send("There was an error")
                                //console.log(error);
                            }
                        })
                    }

                    async function forfeit() {
                        return new Promise(async (resolve, reject) => {
                            let sendStr = "Are you sure you want to lose this battle?\n"
                            + "(1) Yes\n"
                            + "(2) No"
                            let choosemessage = await message.channel.send(sendStr);
                            let filter = m => m.author.id === m.author.id  && !m.author.bot;
                            let Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                    Collector.on("collect", async response => {
                                        if (response.author.id === client.user.id) return
                                        //console.log(`Collected: ${response.content}`);    
                                        userResponse = response.content;
                                        Collector.stop()

                                        if (userResponse == 1) {
                                            account.setWagonHp(0);               
                                            resolve();
                                        } else {
                                            await firstMenu()
                                            resolve();
                                        }   

                                    })

                        })
                    }

                    async function useCard(){
                        choosecard = "which card will you use?"
                        cardnumber = 1
                        for (i = 0; i < hand.length; i++){
                            choosecard += "\n(" + cardnumber + ") " + hand[i].getName()
                            cardnumber++;
                        }
                        choosecard += "\nPress (0) to go back"
                        return new Promise(async (resolve, reject) => {
                            try {
                                const choosemessage = await message.channel.send(choosecard)
                                const filter = m => m.author.id === m.author.id  && !m.author.bot;
                                const Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                Collector.on("collect", async response => {
                                    if (response.author.id === client.user.id) return
                                    //console.log(`Collected: ${response.content}`);
    
                                    const userResponse = response.content;
                                    //console.log("userResponse")
                                    //console.log(userResponse)
                                    if (userResponse <= hand.length && userResponse > 0){
                                        Collector.stop()
                                        j = userResponse - 1
                                        selectedCard = hand.splice(j, 1)[0];
                                        account.discardCard(selectedCard)
                                        await cardManager(null, selectedCard)
                                        resolve()
                                    } else if (userResponse == 0){
                                        Collector.stop()
                                        await firstMenu()
                                        resolve()
                                    } else {
                                        await message.channel.send('Could not find that card')
                                        Collector.stop()
                                        await useCard()
                                        resolve()
                                    }
                                    
                                })
                            } catch (error) {
                                //console.error(error);
                                message.channel.send(`No response received. Time limit exceeded.`);
                                }
                            })
                    }

                    async function escape(){
                        return new Promise(async(resolve, reject) => {
                            if (hand.length < 5) {
                                message.channel.send("You dont have enough cards");
                                resolve()
                            } 

                            choosecards = []

                            for(j = 0; j < hand.length; j++) {
                                newLabel = {label: hand[j].getName(), description: hand[j].getDescription(), value: String(j)}  
                                choosecards.push(newLabel);
                            }

                           const row = new MessageActionRow()
                            .addComponents(
                                new MessageSelectMenu()
                                    .setCustomId('escape')
                                    .setPlaceholder('Select cards to discard...')
                                    .addOptions(choosecards) //this is the thing with the labels
                                    .setMinValues(5)
                                    .setMaxValues(5) //sets the min and max values that can be chose. remove these 2 to make it select only 1
                            );
                                                        
                            let sentMessage = await message.channel.send({ components: [row] });
                                        
                            filter = interaction => interaction.customId === 'escape' && interaction.user.id === message.author.id;
                                    
                            collector = sentMessage.createMessageComponentCollector({ filter, max: 1, time: 60000 });
                                    
                            collector.on('collect', async interaction => {
                                await interaction.deferUpdate();
                                const selectedValues = interaction.values.map(value => parseInt(value));
                                
                                for(i = selectedValues.length; i >=0; i--) {
                                    selectedCard = hand.splice(selectedValues[i], 1)[0];
                                    account.discardCard(selectedCard);
                                }
                                isEscaped = true;
                                resolve(isEscaped);
                                    
                            });
                                    
                            collector.on('end', collected => {
                            if (!collected.size) {
                                resolve(null);
                            }
                            });
                        })
                    }
                }

                async function addToHand() {
                    return new Promise(async (resolve, reject) => {
                    result = await drawCard();
                    if(result != undefined) {
                        hand.push(result);
                        resolve("You drew " + result.getName() + ".\n");
                    }
                    resolve("");
                    })
                }
                /**
                 * select a random element from deck, then remove that element from deck, return it
                 */
                async function drawCard(){
                    return new Promise((resolve, reject) => {
                    if (deck.length == 0) {
                        resolve();
                    }
                    random = Math.floor(Math.random() * 100) + 1;
                    if (deck[0] && deck[0].getId() == 21 && random <= characterChance) {
                        maxIndex = 0;
                        if (deck[1] && deck[1].getId() == 21) {
                            maxIndex ++;
                            if (deck[2] && deck[2].getId() == 21) {
                                maxIndex++;
                            }
                        } 

                        let randomIndex = Math.floor(Math.random() * maxIndex);
                        let randomElement = deck[randomIndex];
                        deck.splice(randomIndex, 1);
                        

                        if (deck[0] && deck[0].getId() != 21) {
                            characterChance = 0;
                        } else {
                            if (characterChance == 25) {
                                characterChance = 10;
                            } else if (characterChance == 10) {
                                characterChance = 5;
                            } else if (characterChance == 5) {
                                characterChance = 0;
                            }
                        }
                        resolve(randomElement);
                    } else {
                        let randomIndex = Math.floor(Math.random() * deck.length);
                        let randomElement = deck[randomIndex];
                        deck.splice(randomIndex, 1);
                        resolve(randomElement);
                    }
                    })
                }

                async function setInitialSpeed(){
                    for (let i = 0; i < players.length; i++) {
                        players[i].setInitialSpeed();
                    }
                    for (let i = 0; i < enemies.length; i++) {
                        enemies[i].setInitialSpeed();
                    }
                }

                /**
                 * 
                 * @param {the character whos turn it is} p 
                 * @param {1 if it's a boss fight} type 
                 */
                async function doPlayerAttack(p, type){
                    if (inBtwnMessages.length > 0) {
                        message.channel.send(inBtwnMessages);
                        inBtwnMessages = "";
                    }
                    playerQuit = false;
                    await firstMenu()
                    if (playerQuit) {
                        return "player quit"
                    }
                    
                async function firstMenu(){
                    return new Promise(async (resolve, reject) => {
                    try {
                        //create info for team
                        teamInfo = ""
                        teamInfo += "Wagon:\n" + account.getWagonHp() + "HP\n\n" 
                        for (i = 0; i < players.length; i ++){
                            teamInfo += players[i].getName() + ":\n" +
                            players[i].getHp() + "HP\n\n"
                        }
                        
                        enemyInfo = ""
                        for (i = 0; i < enemies.length; i ++){
                            enemyInfo += enemies[i].getName() + ":\n" +
                            enemies[i].getHp() + "HP\n\n"
                        }

                        handInfo = ""
                        for (i = 0; i < hand.length; i++) {
                            handInfo += hand[i].getName() + "\n"
                        }
                        setTitle = "Hand"
                        setDescription = handInfo
                        if (hand.length == 0) {
                            setTitle = "Team"
                            setDescription = teamInfo
                        }

                        const newembed = new MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle(setTitle)
                        .setDescription(setDescription);

                    const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setCustomId('view_hand')
                                .setLabel('Hand')
                                .setStyle('PRIMARY'),
                            new MessageButton()
                                .setCustomId('view_team')
                                .setLabel('Team')
                                .setStyle('PRIMARY'),
                            new MessageButton()
                                .setCustomId('view_enemies')
                                .setLabel('Enemies')
                                .setStyle('PRIMARY'),
                        );

                    const sentMessage = await message.channel.send({ embeds: [newembed], components: [row] });
                    const infoFilter = i => i.user.id === message.author.id;
                    const infoCollector = sentMessage.createMessageComponentCollector({ infoFilter, time: 60000 });
                    infoCollector.on('collect', async interaction => {
                        if (interaction.customId === 'view_team') {
                            newembed.setTitle("Team");
                            newembed.setDescription(teamInfo);
                        } else if (interaction.customId === 'view_hand') {
                            newembed.setTitle("Hand");
                            newembed.setDescription(handInfo);
                        } else if (interaction.customId === 'view_enemies') {
                            newembed.setTitle("Enemies");
                            newembed.setDescription(enemyInfo);
                        }

                        await interaction.update({ embeds: [newembed], components: [row] });
                    });
                    infoCollector.on('end', collected => {
                        //console.log(`Collected ${collected.size} interactions.`);
                    });



                        attackNum = null;
                        abilityNum = null;
                        cardNum = null;
                        guessSongNum = null;
                        boostNum = null;
                        guardNum = null;
                        infoNum = null;
                        indexNum = 0;
                        info = "";
                        info += "Atk - " + p.getAtk() + "\nHP - " + p.getHp() + "\n";
                        if (p.hasShield()) {
                            info += "Shield - " + p.getShield() + "\n";
                        }
                        info += "It is " + p.getName() + "'s turn. What do you want to do? \n"

                        indexNum++;
                        attackNum = indexNum;
                        info += "(" + attackNum + ") Attack\n"


                        if (p.hasAbility() && p.getAbilityUses() > 0) {
                        indexNum++;
                        abilityNum = indexNum;
                            if (p.hasSilenced()){
                                info += "(" + abilityNum + ") SILENCED\n"
                            } else {
                                info += "(" + abilityNum + ") Ability - " + p.getAbilityUses() + " more\n"
                            }
                        }

                        indexNum++;
                        cardNum = indexNum;
                        if (p.hasSilenced()){
                            info += "(" + cardNum + ") SILENCED\n"
                        } else {
                            info += "(" + cardNum + ") Card\n"
                        }

                        if(type == 1 && !songGuessed) {
                            indexNum++;
                            guessSongNum = indexNum
                            if (p.hasSilenced()){
                                info += "(" + guessSongNum + ") SILENCED\n"
                            } else {
                                info += "(" + guessSongNum + ") GUESS the SONG\n"
                            }
                        }

                        indexNum++;
                        boostNum = indexNum;
                        if (boostStatus){
                            info += "(" + boostNum + ") BOOST: ON - " + numBoosts + " remaining\n"
                        } else {
                            info += "(" + boostNum + ") Boost: OFF - " + numBoosts + " remaining\n"
                        }

                        indexNum++
                        guardNum = indexNum;
                        info += "("+ guardNum +") Guard\n"

                        indexNum++
                        infoNum = indexNum;
                        info += "(" + infoNum + ") Info\n"
                        const choiselist = await message.channel.send(info
                        + 'Type "quit" on this screen to leave the game\n'
                        );
                      
                        // Set up a filter to listen for the user's response
                        const filter = m => m.author.id === m.author.id  && !m.author.bot
                        const collector = choiselist.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                      
                        // Wait for the user to respond
                        collector.on("collect", async response => {
                            // if the response is from a bot, ignore
                        if (response.author.id === client.user.id) return
                          // Record the user's response
                          const userResponse = response.content;
                          collector.stop()
                          //console.log(response.content)
                          let sentMessage
                          if (userResponse == attackNum){
                            collector.stop()
                            await enemyChoice()
                            resolve()
                          } else if (userResponse == abilityNum) {
                            if (p.hasSilenced()) {
                                message.channel.send(p.getName() + " is Silenced");
                                collector.stop()
                                await firstMenu()
                                resolve()
                            } else {
                                await abilityManager(p);
                                resolve()
                            }
                          }else if (userResponse == cardNum){
                            collector.stop()
                            if (p.hasSilenced()) {
                                message.channel.send(p.getName() + " is Silenced");
                                collector.stop()
                                await firstMenu()
                                resolve()
                            } else {
                                await useCard(p)
                                resolve()
                            }
                          } else if (userResponse == boostNum){
                            if (numBoosts <= 0 ) {
                                boostStatus = false;
                                message.channel.send("You are out of boosts")
                            } else {
                                boostStatus = !boostStatus
                            }
                            await firstMenu();
                            resolve()
                          } else if (userResponse == guardNum) {
                            guardAmount = 30;
                            if (boostStatus) {
                                increaseGuard = await Math.floor(Math.random() * 21) + 10 //10-30%
                                hpLoss = await Math.floor(Math.random() * 21) + 1 //5-25%
                                songLength = await Math.floor(Math.random() * 5) + 3 //3-7 sec
                                boostResult = await startBoostProcess(p, [increaseGuard, hpLoss, songLength], -1);
                                if (boostResult) {
                                    guardAmount += increaseGuard;
                                }
                            }
                            p.guard(guardAmount);
                            inBtwnMessages += p.getName() + " guarded\n";
                            inBtwnMessages += await addToHand();
                            resolve();
                          } else if (userResponse == infoNum) {
                            await chooseInfo();
                            resolve();
                          } else if (userResponse == guessSongNum) {
                            songGuessed = await guessSongOnce(p)
                            let hi = "";
                            if (songGuessed) {
                                for (i = 0; i < enemies.length; i++) {
                                    damage = enemies[i].loseHp(enemies[i].getMaxHp() * 0.9);
                                    hi = hi + "" + enemies[i].getName() + " took " + damage + " damage\n"
                                }
                            } else {
                                damage = p.loseHp(p.getMaxHp() * .1);
                                hi += "" + p.getName() + " took " + damage + " damage\n"
                            }
                            message.channel.send(hi);
                            resolve()
                          }else if (userResponse == "quit" || userResponse == "Quit"){
                            playerQuit = true;
                            resolve("player quit");
                            return;
                          }else {
                            message.channel.send('Your action could not be interpreted')
                            collector.stop()
                            await firstMenu()
                            resolve()
                          }
                         
                          collector.stop()
                        });
                      
                        collector.on('end', collected=>{
                          //console.log("Finished collecting")
                          //console.log(`Collected ${collected.size} response(s)`);
                          
                        })
                      } catch (error) {
                        console.log(error);
                        await message.channel.send("There was an error processing your request.");
                      }
                })
                }
                async function chooseInfo(){
                    infoMessage = "What do you want to view?\n"
                    + "(1) Team stats\n"
                    + "(2) Enemy stats\n"
                    + "(3) Cards\n"
                    + "Press (0) to go back"
                    return new Promise(async (resolve, reject) => {
                        try {
                            const choosemessage = await message.channel.send(infoMessage)
                            const filter = m => m.author.id === m.author.id  && !m.author.bot;
                            const Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                            Collector.on("collect", async response => {
                                if (response.author.id === client.user.id) return
                                //console.log(`Collected: ${response.content}`);
                                
                                const userResponse = response.content;
                                Collector.stop()
                                //console.log("userResponse")
                                //console.log(userResponse)
                                if (userResponse == 0) {
                                    await firstMenu()
                                    resolve()
                                } else if (userResponse == 1) {
                                    for (i = 0; i < players.length; i++) {
                                        message.channel.send(players[i].toString());
                                    }
                                    await chooseInfo()
                                    resolve()
                                } else if (userResponse == 2) {
                                    for (i = 0; i < enemies.length; i++) {
                                        message.channel.send(enemies[i].toString());
                                    }
                                    await chooseInfo()
                                    resolve()
                                } else if (userResponse == 3) {
                                    for (i = 0; i < deck.length; i++) {
                                        message.channel.send(deck[i].toString());
                                    }
                                    await chooseInfo()
                                    resolve()
                                }
                            })
                        } catch (error) {
                            //console.error(error);
                            message.channel.send(`No response received. Time limit exceeded.`);
                            }
                        })
                }

                async function enemyChoice(){
                chooseenemy = "which enemy will you strke?"
                enemynumber = 1
                for (i = 0; i < enemies.length; i++){
                    if (enemies[i].getMaxSpeed() >= enemies[i].getSpeed()) {
                        chooseenemy += "\n(" + enemynumber + ") **" + enemies[i].getName() + "** - " + enemies[i].getHp() + "HP"
                    } else {
                        chooseenemy += "\n(" + enemynumber + ") " + enemies[i].getName() + " - " + enemies[i].getHp() + "HP"
                    }
                    if (enemies[i].hasInvisible()) {
                        chooseenemy += " (invisible)"
                    }
                    enemynumber++;
                }
                chooseenemy += "\nPress (0) to go back"
                return new Promise(async (resolveInner, rejectInner) => {
                    try {
                        const choosemessage = await message.channel.send(chooseenemy)
                        const filter = m => m.author.id === m.author.id  && !m.author.bot;
                        const innerCollector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                        innerCollector.on("collect", async response => {
                            if (response.author.id === client.user.id) return
                            //console.log(`Collected: ${response.content}`);

                            const userResponse2 = response.content;
                            if (userResponse2 <= enemies.length && userResponse2 > 0){
                                j = userResponse2 - 1
                                if (enemies[j].hasInvisible()) {
                                    inBtwnMessages += p.getName() + "'s attack missed since " + enemies[j].getName() + " is invisible\n"
                                } else {
                                    boostDamage = 1;
                                    boostResult = false;
                                    innerCollector.stop()
                                    if (boostStatus) {
                                        if (!p.hasSilenced()){
                                            //console.log("Starting boost process")
                                            increaseDamage = await Math.floor(Math.random() * 101) + 50 //50-150%
                                            hpLoss = await Math.floor(Math.random() * 16) + 7 //7-22%
                                            songLength = await Math.floor(Math.random() * 5) + 3 //3-7 sec
                                            boostResult = await startBoostProcess(p, [increaseDamage, hpLoss, songLength], 1);
                                            //console.log(boostResult)
                                            if (boostResult) {
                                                boostDamage = boostDamage + (increaseDamage * .01);
                                            }
                                        } else {
                                            inBtwnMessages += "Cannot boost since " + p.getName() + " is silenced\n"
                                        }
                                    }
                                    if (p.getHp() <= 0) {
                                        //console.log('Hp is less than equal to 0');
                                        resolveInner();
                                        return;
                                    }

                                    enemies[j].loseHp(Math.floor(p.getAtk() * boostDamage));
                                    attackedenemy = p.getName() + " attacked " + enemies[j].getName() + ". They have " + enemies[j].getHp() + " hp left."
                                    inBtwnMessages += attackedenemy + '\n'
                                }
                                resolveInner()
                            } else if (userResponse2 == 0){
                                innerCollector.stop()
                                await firstMenu()
                                resolveInner()
                            } else {
                                await message.channel.send('Could not find that enemy')
                                innerCollector.stop()
                                await enemyChoice()
                                resolveInner()
                            }
                            
                        })

                        innerCollector.on('end', collected=>{
                            //console.log("Finished collecting")
                            //console.log(`Collected ${collected.size} response(s)`);
                            
                          })
                        
                    } catch (error) {
                        //console.error(error);
                        message.channel.send(`No response received. Time limit exceeded.`);
                        }
                    })
                }

                async function useCard(p){
                    choosecard = "which card will you use?"
                    cardnumber = 1
                    for (i = 0; i < hand.length; i++){
                        choosecard += "\n(" + cardnumber + ")" + hand[i].getName()
                        cardnumber++;
                    }
                    choosecard += "\nPress (0) to go back"
                    return new Promise(async (resolve, reject) => {
                        try {
                            const choosemessage = await message.channel.send(choosecard)
                            const filter = m => m.author.id === m.author.id  && !m.author.bot;
                            const Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                            Collector.on("collect", async response => {
                                if (response.author.id === client.user.id) return
                                //console.log(`Collected: ${response.content}`);

                                const userResponse = response.content;
                                //console.log("userResponse")
                                //console.log(userResponse)
                                if (userResponse <= hand.length && userResponse > 0){
                                    Collector.stop()
                                    j = userResponse - 1
                                    selectedCard = hand.splice(j, 1)[0];
                                    account.discardCard(selectedCard)
                                    useturn = await cardManager(p, selectedCard);
                                    console.log("it finished")
                                    if(useturn == 1) {
                                        await firstMenu();
                                    }
                                    resolve()
                                } else if (userResponse == 0){
                                    Collector.stop()
                                    await firstMenu()
                                    resolve()
                                } else {
                                    await message.channel.send('Could not find that card')
                                    Collector.stop()
                                    await useCard()
                                    resolve()
                                }
                                
                            })
                        } catch (error) {
                            //console.error(error);
                            message.channel.send(`No response received. Time limit exceeded.`);
                            }
                        })
                }
                
                async function abilityManager(p) {
                    return new Promise(async (resolve, reject) => {
                        let level = -1;
                        let healing;
                        let dps;
                        abilityNum = p.getAbilityNum();
                        switch(abilityNum) {
                            case 1:
                                chooseplayer = "which ally will you buff?"
                                playernumber = 1
                                for (i = 0; i < players.length; i++){
                                    chooseplayer += "\n(" + playernumber + ") " + players[i].getName() + " - " + players[i].getAtk() + " ATK, " + players[i].getHp() + "HP"
                                    playernumber++;
                                }
                                chooseplayer += "\nPress (0) to go back"
                                        choosemessage = await message.channel.send(chooseplayer)
                                        filter = m => m.author.id === m.author.id  && !m.author.bot;
                                        const innerCollector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                        innerCollector.on("collect", async response => {
                                            if (response.author.id === client.user.id) return
                                            //console.log(`Collected: ${response.content}`);
                
                                            const userResponse2 = response.content;
                                            if (userResponse2 <= players.length && userResponse2 > 0){
                                                baseDamage = 5 * p.getAbilitylvl();
                                                baseTurns = 1;
                                                if (p.getAbilitylvl() >= 4) {
                                                    baseTurns++
                                                }
                                                if (p.getAbilitylvl() >= 6) {
                                                    baseTurns++ 
                                                }
                                                boostDamage = 0;
                                                boostResult = false;
                                                innerCollector.stop()
                                                if (boostStatus && p.getAbilitylvl() >= 3) {
                                                    if (!p.hasSilenced()){
                                                        //console.log("Starting boost process")
                                                        increaseAbility = await Math.floor(Math.random() * 51) + 50 //50-100%
                                                        hpLoss = await Math.floor(Math.random() * 16) + 5 //5-20%
                                                        songLength = await Math.floor(Math.random() * 5) + 3 //3-7 sec
                                                        boostResult = await startBoostProcess(p, [inceraseAbility, hpLoss, songLength], -2);
                                                        if (boostResult[0]) {
                                                            boostDamage = boostResult[1];
                                                        }
                                                    } else {
                                                        message.channel.send("Cannot boost since " + p.getName() + " is silenced")
                                                    }
                                                }
                                                if (p.getHp() <= 0) {
                                                    //console.log('Hp is less than equal to 0');
                                                    resolve();
                                                    return;
                                                }
                                                    
                                                
                                                j = userResponse2 - 1
                                                returnMessage = players[j].setDamageBoost(Math.floor(baseDamage + boostDamage), baseTurns);
                                                inBtwnMessages += returnMessage;
                                                p.decreaseAbility();
                                                resolve()
                                            } else if (userResponse2 == 0){
                                                innerCollector.stop()
                                                await firstMenu()
                                                resolve()
                                            } else {
                                                await message.channel.send('Could not find that target')
                                                innerCollector.stop()
                                                await abilityManager(p)
                                                resolve()
                                            }
                                            
                                        })
                
                                        innerCollector.on('end', collected=>{
                                            //console.log("Finished collecting")
                                            //console.log(`Collected ${collected.size} response(s)`);
                                            
                                        })
                                        
                                    
                                    
                                break;
                            case 2:
                                decay = 50;
                                meowbots = [];
                                amount = 1;
                                superMeowChance = 0;
                                if (p.getAbilitylvl() >= 10) {
                                    decay = 0;
                                } else if (p.getAbilitylvl() >= 4) {
                                    decay = 20;
                                } else if (p.getAbilitylvl() >= 2) {
                                    decay = 34;
                                }
                                if (p.getAbilitylvl() >= 9){
                                    superMeowChance = 10;
                                } else if (p.getAbilitylvl() >= 7) {
                                    superMeowChance = 5;
                                }
                                if (p.getAbilitylvl() >= 5) {
                                    amount = 2;
                                }
                                
                                //boost
                                if (boostStatus && level >= 3) {
                                    if (!p.hasSilenced()){
                                        increaseAbility = await Math.floor(Math.random() * 2) + 1 //1-2%
                                        hpLoss = await Math.floor(Math.random() * 16) + 5 //5-20%
                                        songLength = await Math.floor(Math.random() * 5) + 3 //3-7 sec
                                        //console.log("Starting boost process")
                                        boostResult = await startBoostProcess(p, [increaseAbility, hpLoss, songLength], -3);
                                        if (boostResult[0]) {
                                            amount += increaseAbility;
                                        }
                                    } else {
                                        inBtwnMessages += "Cannot boost since " + p.getName() + " is silenced\n"
                                    }
                                }

                                for (i = 0; i < amount; i++) {
                                    superMeow = Math.floor(Math.random() * 100) + 1;
                                    if (superMeow <= superMeowChance) {
                                        meowbots.push("super_meowbot")
                                    } else if (p.getAbilitylvl() >= 8){
                                        meowbots.push("meowbotv2")
                                    } else {
                                        meowbots.push("meowbot")
                                    }
                                }

                                for (i = 0; i < meowbots.length; i++) {
                                    e = enemyBank[meowbots[i]].copy();
                                    if (decay != 0) {
                                        e.setDecay(decay, 10);
                                    }
                                    players.push(e);
                                }
                                inBtwnMessages += p.getName() + " summoned Meowbots\n";
                                p.decreaseAbility();
                                resolve()
                                break;
                            case 3:
                                selfDamage = 50;
                                shield = 50;
                                turns = 1
                                damageBuff = 0;
                                damageTurns = 0;
                                level = p.getAbilitylvl()
                                if (level >= 5) {
                                    selfDamage = 100
                                    shield = 125
                                    turns = 5;
                                    damageBuff = 10
                                    damageTurns = 3;
                                    if (level >= 6) {
                                        shield +=25
                                    }
                                    if (level >= 7) {
                                        damageTurns = 5
                                    }
                                    if (level >= 8) {
                                        shield += 25
                                    }
                                    if (level >= 9) {
                                        shield += 25
                                    }
                                    if (level >= 10) {
                                        shield += 25
                                        damageTurns = 10
                                    }
                                } else {
                                    if (level >= 2) {
                                        shield += 10
                                    }
                                    if (level >= 3) {
                                        turns += 2;
                                    }
                                    if (level >= 4) {
                                        shield += 15
                                    }
                                }


                                chooseplayer = "which ally will you give a shield to?"
                                playernumber = 1
                                for (i = 0; i < players.length; i++){
                                    chooseplayer += "\n(" + playernumber + ") " + players[i].getName() + " - " + players[i].getHp() + " ATK, " + players[i].getHp() + "HP"
                                    playernumber++;
                                }
                                chooseplayer += "\nPress (0) to go back"
                                return new Promise(async (resolveInner, rejectInner) => {
                                    try {
                                        const choosemessage = await message.channel.send(chooseplayer)
                                        const filter = m => m.author.id === m.author.id  && !m.author.bot;
                                        const innerCollector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                        innerCollector.on("collect", async response => {
                                            if (response.author.id === client.user.id) return
                                            //console.log(`Collected: ${response.content}`);
                
                                            const userResponse2 = response.content;
                                            if (userResponse2 <= players.length && userResponse2 > 0){
                                                boostDamage = 0;
                                                boostResult = false;
                                                innerCollector.stop()
                                                if (boostStatus && level >= 3) {
                                                    if (!p.hasSilenced()){
                                                        increaseAbility = await Math.floor(Math.random() * 101) + 100 //100-200%
                                                        hpLoss = await Math.floor(Math.random() * 16) + 5 //5-20%
                                                        songLength = await Math.floor(Math.random() * 5) + 3 //3-7 sec
                                                        //console.log("Starting boost process")
                                                        boostResult = await startBoostProcess(p, [increaseAbility, hpLoss, songLength], -3);
                                                        if (boostResult[0] && boostResult[1] == 1) {
                                                            boostDamage = increaseAbility;
                                                        }
                                                    } else {
                                                        inBtwnMessages += "Cannot boost since " + p.getName() + " is silenced\n"
                                                    }
                                                }
                                                if (p.getHp() <= 0) {
                                                    //console.log('Hp is less than equal to 0');
                                                    resolveInner();
                                                    return;
                                                }
                                                    
                                                
                                                
                                                
                                                
                                                if (boostResult[0] && boostResult[1] == 2) {
                                                    for (i = 0; i < players.length; i++) {
                                                        lostHp = p.loseHp(selfDamage);
                                                        players[i].setShield(Math.floor(shield + boostDamage), turns)
                                                        attackedenemy = p.getName() + " gave the entire team a " + Math.floor(shield + boostDamage) + "HP shield for " + turns + "turns\n"
                                                        inBtwnMessages += attackedenemy;
                                                    }  
                                                } else {
                                                    j = userResponse2 - 1
                                                    players[j].setShield(Math.floor(shield + boostDamage), turns);
                                                    lostHp = p.loseHp(selfDamage);
                                                    attackedenemy = p.getName() + " gave " + players[j].getName() + " a "+ Math.floor(shield +  boostDamage) + "HP shield for " + turns + " turns and took " + lostHp + " damage"
                                                    inBtwnMessages += attackedenemy + '\n';

                                                    if (level >= 9) {
                                                        for (i = 0; i < players.length; i++) {
                                                            if (i != j) {
                                                                players[i].setShield(Math.floor((shield + boostDamage) * .1), turns)
                                                                attackedenemy = "The rest of the party gained a " + Math.floor((shield + boostDamage) * .1) + "HP shield for " + turns + "turns\n"
                                                                inBtwnMessages += attackedenemy;
                                                            }
                                                        }
                                                    }
                                                }
                                                if (level >= 7) {
                                                    attackedenemy = players[j].setDamageBoost(Math.floor(damageBuff), damageTurns);
                                                    inBtwnMessages += attackedenemy
                                                }
                                                p.decreaseAbility();
                                                resolveInner()
                                                resolve()
                                            } else if (userResponse2 == 0){
                                                innerCollector.stop()
                                                await firstMenu()
                                                resolveInner()
                                                resolve()
                                            } else {
                                                await message.channel.send('Could not find that enemy')
                                                innerCollector.stop()
                                                await enemyChoice()
                                                resolveInner()
                                                resolve()
                                            }
                                            
                                        })
                
                                        innerCollector.on('end', collected=>{
                                            //console.log("Finished collecting")
                                            //console.log(`Collected ${collected.size} response(s)`);
                                            
                                        })
                                        
                                    } catch (error) {
                                        //console.error(error);
                                        message.channel.send(`No response received. Time limit exceeded.`);
                                        }
                                    })
                                break;
                            case 4:
                                sendStr = "Who do you want to give the ability to?\n"
                                counter = 1;
                                for (i = 0; i < players.length; i++) {
                                    sendStr += "(" + counter + ") " + players[i].getName() + " (" + players[i].getHp() + "HP)\n"
                                }
                                choosemessage = await message.channel.send(sendStr);
                                filter = m => m.author.id === m.author.id  && !m.author.bot;
                                Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                        Collector.on("collect", async response => {
                                            if (response.author.id === client.user.id) return
                                            //console.log(`Collected: ${response.content}`);    
                                            userResponse = response.content;
                                            Collector.stop()

                                            if (userResponse >= 1 && userResponse <= players.length) {
                                                j = userResponse - 1;
                                                players[j].getOnDeathNums().push([-1, p.getAbilitylvl()])
                                            }          

                                        })
                                break;
                            case 5:
                                //xenon
                                //console.log("used xenon ability")
                                level = p.getAbilitylvl();
                                turns = 2;
                                if (level >= 9) {
                                    turns = 4
                                }
                                xenonAilments = []
                                fragileDamage = 25;
                                if (level >= 5) {
                                    fragileDamage *= 2;
                                }
                                weaknessDamage = 25;
                                if (level >= 7) {
                                    weaknessDamage *= 2;
                                }
                        
                                fearDamage = 15;
                                if (level >= 8) {
                                    fearDamage += 10;
                                }
                                freezeDuration = 1
                                if (level >= 9) {
                                    freezeDuration *= 2;
                                }
                                if (boostStatus && level >= 5) {
                                    if (!p.hasSilenced()){
                                        increaseAbility = await Math.floor(Math.random() * 101) + 100 //100-200%
                                        hpLoss = await Math.floor(Math.random() * 16) + 5 //5-20%
                                        songLength = 1
                                        //console.log("Starting boost process")
                                        boostResult = await startBoostProcess(p, [increaseAbility, hpLoss, songLength], -3);
                                        if (boostResult[0]) {
                                            fragileDamage *= 2;
                                            weaknessDamage *= 2;
                                            fearDamage *= 2;
                                            freezeDuration += 1;
                                        }
                                    } else {
                                        inBtwnMessages += "Cannot boost since " + p.getName() + " is silenced\n"
                                    }
                                }

                               
                                xenonAilments.push(new Ailment(5, fragileDamage, turns))
                                
                                if (level >= 2) {
                                    
                                    xenonAilments.push(new Ailment(4, weaknessDamage, turns))
                                    
                                }
                                if (level >= 3) {
                                   
                                    xenonAilments.push(new Ailment(8, fearDamage, turns))
                                    
                                }
                                if (level >= 4) {
                                    
                                    xenonAilments.push(new Ailment(12, 25, freezeDuration))
                                    
                                }
                                for (i = 0; i < enemies.length; i++) {
                                    
                                    for (j = 0; j < xenonAilments.length; j++) {
                                        inBtwnMessages += await ailmentManager(enemies[i], xenonAilments[j])
                                    }
                                }
                                p.decreaseAbility()
                                resolve();
                                break;
                            case 6:
                                //conner
                                level = p.getAbilitylvl()
                                damage = 25;
                                extraDamage = 0;
                                decayThreshold = -1;
                                if (level >= 2) {
                                    damage += 5;
                                }
                                if (level >= 4) {
                                    damage += 5;
                                }
                                if (level >= 5) {
                                    extraDamage = 10;
                                }
                                if (level >= 6) {
                                    damage += 5;
                                    extraDamage += 5;
                                }
                                if (level >= 7) {
                                    decayThreshold = 7
                                }
                                if (level >= 8) {
                                    damage += 10;
                                }
                                if (level >= 9) {
                                    extraDamage += 10;
                                }
                                if (level >= 10) {
                                    decayThreshold = 5;
                                }
                                if (boostStatus && level >= 3) {
                                    if (!p.hasSilenced()){
                                        increaseAbility = await Math.floor(Math.random() * 101) + 100 //100-200%
                                        hpLoss = await Math.floor(Math.random() * 16) + 5 //5-20%
                                        songLength = await Math.floor(Math.random() * 5) + 3 //3-7 sec
                                        boostResult = await startBoostProcess(p, [increaseAbility, hpLoss, songLength], 7);
                                    } else {
                                        inBtwnMessages += "Cannot boost since " + p.getName() + " is silenced\n"
                                    }
                                    if (boostResult[0]) {
                                        damage *= 2;
                                    }
                                }
                                damage = damage + (extraDamage * (enemies.length - 1));
                                inflictDecay = false;
                                if (level >= 7 && enemies.length >= decayThreshold) {
                                    inflictDecay = true;
                                }
                                decayPercent = 5;
                                decayTurns = 3;
                                for (i = 0; i < enemies.length; i++) {
                                    enemies[i].loseHp(damage)
                                    if (inflictDecay) {
                                        ailmentManager(enemeis[i], new Ailment(7, decayPercent, decayTurns));
                                    }
                                }
                                inBtwnMessages += p.getName() + " damaged all enemies for " + damage + " damage\n"
                                if (inflictDecay) {
                                    inBtwnMessages += "Every enemy has been inflicted with " + decayPercent + "% decay for "+ decayTurns + " turns"
                                }
                                p.decreaseAbility()
                                resolve();
                                break;
                            case 7:
                                //cherry
                                sendStr = "who would you like to give a cherry to?\n";
                                counter = 1;
                                for (i = 0; i < players.length; i++) {
                                    sendStr += "(" + counter + ") " + players[i].getName() + " (" + players[i].getHp() + "HP)\n"
                                    counter++;
                                }
                                sendStr += "Press 0 to go back"
                                choosemessage = await message.channel.send(sendStr);
                                filter = m => m.author.id === m.author.id  && !m.author.bot;
                                Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                        Collector.on("collect", async response => {
                                            if (response.author.id === client.user.id) return
                                            //console.log(`Collected: ${response.content}`);    
                                            userResponse = response.content;
                                            Collector.stop()

                                            if (userResponse >= 1 && userResponse <= players.length) {
                                                j = userResponse - 1;
                                                level = p.getAbilitylvl()
                                                if (level == 1) {
                                                    health = players[j].heal(1)
                                                    message.channel.send("You gave " + players[j].getName() + " a cherry. Mmmm it was good.\n They healed "+ health + "HP\n")
                                                    p.decreaseAbility()
                                                    await firstMenu();
                                                    resolve()
                                                    return;
                                                }
                                                healing = 10;
                                                duration = 3
                                                if (level >= 4) {
                                                    healing += 10;
                                                }
                                                if (level >= 8) {
                                                    healing += 30
                                                }
                                                if (level  >= 6) {
                                                    duration = 5;
                                                }
                                                if (level >= 10) {
                                                    duration = 10;
                                                }

                                                if (boostStatus && level >= 7) {
                                                    if (!p.hasSilenced()){
                                                        increaseAbility = await Math.floor(Math.random() * 101) + 100 //100-200%
                                                        hpLoss = await Math.floor(Math.random() * 16) + 5 //5-20%
                                                        songLength = await Math.floor(Math.random() * 5) + 1 //1-5 sec
                                                        //console.log("Starting boost process")
                                                        boostResult = await startBoostProcess(p, [increaseAbility, hpLoss, songLength], 8);
                                                    } else {
                                                        inBtwnMessages += "Cannot boost since " + p.getName() + " is silenced\n"
                                                    }
                                                }
                                                hasAmplify = false;
                                                amplifyAmount = 0;
                                                amplifyDuration = 0
                                                if (level >= 7) {
                                                    hasAmplify = true
                                                    amplifyAmount = 30;
                                                    amplifyDuration = 1
                                                    if (level >= 9) {
                                                        amplifyDuration = 3;
                                                    }
                                                }
                                               
                                                if (boostStatus && boostResult) {
                                                    for (i = 0; i < players.length; i++) {
                                                        inBtwnMessages += players[i].setHealingOverTime(healing, duration)
                                                        if (hasAmplify) {
                                                            inBtwnMessages += players[i].setHealingBoost(amplifyAmount, amplifyDuration)
                                                        }
                                                    }
                                                } else {
                                                    inBtwnMessages += players[j].setHealingOverTime(healing, duration);
                                                    if (hasAmplify) {
                                                        inBtwnMessages += players[j].setHealingBoost(amplifyAmount, amplifyDuration)
                                                    }
                                                }
                                                p.decreaseAbility()
                                                if (level >= 5) {
                                                    await doPlayerAttack(p, type);
                                                }
                                                resolve();
                                            } else if (userResponse == 0) {
                                                await firstMenu();
                                                resolve()
                                            } else {
                                                message.channel.send("Your response cannoy be interpreted\n")
                                                resolve(); 
                                            }

                                        })
                                
                                break;
                            case 8:
                                //joe
                                numActive = 0;
                                for (i = 0; i < p.abilityHelper.length; i++){
                                    if (p.abilityHelper[i] == 1) {
                                        numActive++;
                                    }
                                }
                                if (numActive < p.getAbilityUses()) {
                                    iteration = 1;
                                    for (i = 0; i < p.getAbilitylvl(); i++) {
                                        switch(iteration) {
                                            case 1:
                                                p.abilityHelper[0] = 1
                                                break;
                                            case 2:
                                                p.abilityHelper[3] = 1
                                                break;
                                            case 3:
                                                p.abilityHelper[1] = 1
                                                break;
                                            case 4:
                                                p.abilityHelper[4] = 1
                                                break;
                                            case 5:
                                                p.abilityHelper[2] = 1
                                                break;
                                            case 6:
                                                p.abilityHelper[5] = 1
                                                break;
                                        }
                                        iteration++;
                                    }
                                }
                                allyStart = 1;
                                enemyStart = 1;
                                counter = 1
                                sendStr = "";
                                if (p.abilityHelper[0] == 1 || p.abilityHelper[1] == 1 || p.abilityHelper[2] == 1) {
                                    sendStr += "Party:\n"
                                    allyStart = counter;
                                    for ( i = 0; i < players.length; i++) {  
                                        sendStr += "(" + counter + ") " + players[counter - 1].getName() +"\n";
                                        counter++; 
                                    }
                                }
                                enemyStart = counter;
                                if (p.abilityHelper[3] == 1 || p.abilityHelper[4] == 1 || p.abilityHelper[5] == 1) {
                                    sendStr += "Enemies:\n"    
                                    for ( i = 0; i < enemies.length; i++) {
                                        sendStr += "(" + counter + ") " + enemies[counter - enemyStart].getName() +"\n";
                                        counter++; 
                                    }
                                }
                                sendStr += "Press 0 to go back\n"
                                choosemessage = await message.channel.send(sendStr);
                                filter = m => m.author.id === m.author.id  && !m.author.bot;
                                Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                        Collector.on("collect", async response => {
                                            if (response.author.id === client.user.id) return
                                            //console.log(`Collected: ${response.content}`);    
                                            userResponse = response.content;
                                            Collector.stop()
                                            var selectedTarget
                                            selectedAlly = true
                                            if (userResponse >= 1 && userResponse <= counter) {
                                                if (userResponse >=allyStart && userResponse < enemyStart) {
                                                    selectedTarget = players[userResponse - allyStart]
                                                } else if (userResponse >= enemyStart && userResponse < counter) {
                                                    selectedTarget = enemies[userResponse - enemyStart]
                                                    selectedAlly = false
                                                }

                                                choicePool = []
                                                if (selectedAlly) {
                                                    for (i = 0; i < 3; i++) {
                                                        if (p.abilityHelper[i] == 1) {
                                                            choicePool.push(i)
                                                        }

                                                    }
                                                } else {
                                                    for (i = 3; i < 6; i++) {
                                                        if (p.abilityHelper[i] == 1) {
                                                            choicePool.push(i)
                                                        }

                                                    }
                                                }

                                                selected = choicePool[Math.floor(Math.random() * choicePool.length)]
                                                p.abilityHelper[selected] = 0
                                                effect = -1
                                                damage = -1
                                                duration = -1
                                                switch(selected) {
                                                    case 0:
                                                        effect = 9
                                                        damage = 50
                                                        duration = 3
                                                        break;
                                                    case 1:
                                                        effect = 3
                                                        damage = 50
                                                        duration = 3
                                                        break;
                                                    case 2:
                                                        effect = 13
                                                        damage = 4
                                                        duration = 3
                                                        break;
                                                    case 3:
                                                        effect = 1
                                                        damage = 50
                                                        duration = 3
                                                        break;
                                                    case 4:
                                                        effect = 5
                                                        damage = 50
                                                        duration = 3
                                                        break;
                                                    case 5:
                                                        effect = 4
                                                        damage = 50
                                                        duration = 3
                                                        break;
                                                }

                                                if (level >= 10) {
                                                    damage *= 2;
                                                }

                                                if (boostStatus && level >= 7) {
                                                    if (!p.hasSilenced()){
                                                        increaseAbility = await Math.floor(Math.random() * 101) + 100 //100-200%
                                                        hpLoss = await Math.floor(Math.random() * 16) + 5 //5-20%
                                                        songLength = await Math.floor(Math.random() * 5) + 3 //3-7 sec
                                                        //console.log("Starting boost process")
                                                        boostResult = await startBoostProcess(p, [increaseAbility, hpLoss, songLength], 9);
                                                    } else {
                                                        inBtwnMessages += "Cannot boost since " + p.getName() + " is silenced\n"
                                                    }
                                                    if (boostResult[0]) {
                                                        damage *= 2;
                                                        p.abilityHelper[selected] = 1
                                                    }
                                                }
                                                if (level >= 9) {
                                                    p.heal(50);
                                                }

                                                ailment = new Ailment(effect, damage, duration);
                                                inBtwnMessages += await ailmentManager(selectedTarget, ailment);
                                                p.decreaseAbility()
                                                resolve()

                                            } else if (userResponse == 0) {
                                                await firstMenu()
                                                resolve();
                                                
                                            } else {
                                                message.channel.send("Your response cannot be interpreted");
                                                await abilityManager(p);
                                                resolve();
                                                
                                            }  



                                        })
                                break;
                            case 9:
                                //sagar
                                if (inBtwnMessages.length > 0) {
                                    message.channel.send(inBtwnMessages)
                                    inBtwnMessages = "";
                                }
                                damage = 10
                                if (p.getAbilitylvl() >= 2) {
                                    damage += 15;
                                }
                                sendStr = "Which enemy will you shoot?\n"
                                counter = 1;
                                for (i = 0; i < enemies.length; i++) {
                                    sendStr += "(" + counter + ") " + enemies[i].getName() + " (" + enemies[i].getHp() + "HP)\n"
                                    counter++;
                                }
                                sendStr += "Press 0 to go back\n"
                                choosemessage = await message.channel.send(sendStr);
                                filter = m => m.author.id === m.author.id  && !m.author.bot;
                                Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                        Collector.on("collect", async response => {
                                            if (response.author.id === client.user.id) return
                                            //console.log(`Collected: ${response.content}`);    
                                            userResponse = response.content;
                                            Collector.stop()

                                            if (userResponse >= 1 && userResponse <= enemies.length) {

                                                if (boostStatus && level >= 3) {
                                                    if (!p.hasSilenced()){
                                                        increaseAbility = await Math.floor(Math.random() * 101) + 100 //100-200%
                                                        hpLoss = await Math.floor(Math.random() * 16) + 5 //5-20%
                                                        songLength = await Math.floor(Math.random() * 5) + 3 //3-7 sec
                                                        //console.log("Starting boost process")
                                                        boostResult = await startBoostProcess(p, [increaseAbility, hpLoss, songLength], 10);
                                                    } else {
                                                        inBtwnMessages += "Cannot boost since " + p.getName() + " is silenced\n"
                                                    }
                                                    if (boostResult[0]) {
                                                        p.increaseAbility(5)
                                                    }
                                                }


                                                j = userResponse - 1;
                                                damaged = enemies[j].loseHp(damage);
                                                inBtwnMessages += enemies[j].getName() + " took " + damaged + " damage\n"
                                                if (p.getAbilitylvl() >= 5) {
                                                    chance = Math.floor(Math.random() * 2) + 1;
                                                    if (chance == 1) {
                                                        turns = 1;
                                                        burnDamage = 20
                                                        if (p.getAbilitylvl() >= 6) {
                                                            turns = 3;
                                                        }
                                                        if (p.getAbilitylvl() >= 7) {
                                                            burnDamage = 40;
                                                        }
                                                        inBtwnMessages += enemies[j].setBurn(burnDamage, turns)
                                                    }
                                                } else if (p.getAbilitylvl() >= 8) {
                                                    inBtwnMessages += enemies[j].setBurn(40, 3)
                                                }
                                                if (p.getAbilitylvl() >= 10) {
                                                    chance = Math.floor(Math.random() * 2) + 1;
                                                    if (chance == 1) {
                                                        inBtwnMessages += enemies[j].setFragile(50, 2)
                                                    }
                                                }
                                                p.decreaseAbility()
                                                if (p.getAbilityUses() > 0) {
                                                    await abilityManager(p)
                                                } else {
                                                    await firstMenu()
                                                    resolve()
                                                }
                                                resolve();
                                            } else {
                                                await firstMenu()
                                                resolve();
                                            }        

                                        })
                                break;             
                            case 10:
                                level = p.getAbilitylvl();
                                healing = "baby_aloe";
                                dps = "peashooter";
                                if (level >= 10) {
                                    healing = "ultimate_aloe"
                                    dps = "mega_gatlingpea"
                                } else if (level >= 9) {
                                    dps = "gatlingpea_sp_sp"
                                    healing = "ultra_aloe_sp_sp"
                                } else if (level >= 7) {
                                    dps = "gatlingpea_sp"
                                    healing = "ultra_aloe_sp"
                                } else if (level >= 6) {
                                    dps = "gatlingpea"
                                    healing = "ultra_aloe"
                                } else if (level >= 5) {
                                    dps = "threepeater_sp"
                                    healing = "super_aloe_sp"
                                } else if (level >= 4) {
                                    dps = "threepeater"
                                    healing = "super_aloe"
                                } else if (level >= 2) {
                                    dps = "repeater"
                                    healing = "classic_aloe"
                                }
                                sendStr = "Which plant will you plant?\n"
                                +"(1) Damage\n"
                                +"(2) Healing\n"
                                +"(3) Back"
                                choosemessage = await message.channel.send(sendStr);
                                filter = m => m.author.id === m.author.id  && !m.author.bot;
                                Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                        Collector.on("collect", async response => {
                                            if (response.author.id === client.user.id) return
                                            //console.log(`Collected: ${response.content}`);    
                                            userResponse = response.content;
                                            Collector.stop()

                                            if (userResponse == 1 || userResponse == 2) {
                                                if (boostStatus && level >= 3) {
                                                    if (!p.hasSilenced()){
                                                        increaseAbility = await Math.floor(Math.random() * 101) + 100 //100-200%
                                                        hpLoss = await Math.floor(Math.random() * 16) + 5 //5-20%
                                                        songLength = await Math.floor(Math.random() * 5) + 3 //3-7 sec
                                                        //console.log("Starting boost process")
                                                        boostResult = await startBoostProcess(p, [increaseAbility, hpLoss, songLength], 11);
                                                    } else {
                                                        inBtwnMessages += "Cannot boost since " + p.getName() + " is silenced\n"
                                                    }
                                                    if (boostResult[0]) {
                                                        p.increaseAbility()
                                                    }
                                                }
                                                if (userResponse == 1) {
                                                    tempE = enemyBank[dps].getName()
                                                    summon([dps], players)
                                                    inBtwnMessages += p.getName() + " planted a " + tempE + "\n"  
                                                    p.decreaseAbility()
                                                    resolve();
                                                } else if (userResponse == 2) {
                                                    tempE = enemyBank[healing].getName()
                                                    summon([healing], players)
                                                    inBtwnMessages += p.getName() + " planted a " + tempE + "\n"  
                                                    p.decreaseAbility()
                                                    resolve();
                                                } 
                                            }else if (userResponse == 3 || userResponse == 0) {
                                                await doPlayerAttack(p, type)
                                                resolve();
                                                return;
                                            } else {
                                                message.channel.send("Your response cant be interpreted")
                                                await abilityManager(p);
                                                resolve()
                                                return;
                                            }  



                                        })
                                break;
                        }
                    })
                }

                }

                async function summon(enemies, team) {
                    for (i = 0; i < enemies.length; i++) {
                        team.push(enemyBank[enemies[i]].copy())
                    }
                }

                async function startBoostProcess(p, stats, boostType){
                    return new Promise(async (resolve, reject) => {
                        //console.log(boostType)
                        switch(boostType){
                            case -3:
                                try{
                                    boostMessage = "Boost Offer:\n"
                                    + "increase shield by " + stats[0] + "HP and take no damage\n"
                                    + "OR\n"
                                    + "give shield to everyone and take no damage\n"
                                    + "If you complete a random " + stats[2] + " second song\n"
                                    + "LOSE " + stats[1] + "% of your Max HP For every incorrect guess\n"
                                    //+ generateModifiers()
                                    + "(1) Offer 1\n"
                                    + "(2) Offer 2"
                                    + "(3) Deny\n"
                                    const choosemessage = await message.channel.send(boostMessage)
                                    const filter = m => m.author.id === m.author.id  && !m.author.bot;
                                    const boostCollector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                            boostCollector.on("collect", async response => {
                                                if (response.author.id === client.user.id) return
                                                //console.log(`Collected: ${response.content}`);    
                                                userResponse3 = response.content;
                                                boostCollector.stop()
                                                if (userResponse3 == 1 || userResponse3 == 2){
                                                    boostResult = await processBoost(p, songLength, stats[1], false, false, false)
                                                    boostReward = [boostResult, userResponse3]
                                                    resolve(boostReward);
                                                } else {
                                                    resolve(false, 0)
                                                }
                                            })
                                    } catch (error){
                                        //console.log(error);
                                        message.channel.send("There was an error")
                                    }
                                break;
                            case -2:
                                try{
                                    boostMessage = "Boost Offer:\n"
                                    + "increase damage boost by " + stats[0] + "%\n"
                                    + "If you complete a random " + stats[2] + " second song\n"
                                    + "LOSE " + stats[1] + "% of your Max HP For every incorrect guess\n"
                                    + "Modifiers:\n"
                                    //+ generateModifiers()
                                    + "(1) Accept\n"
                                    + "(2) Deny\n"
                                    const choosemessage = await message.channel.send(boostMessage)
                                    const filter = m => m.author.id === m.author.id  && !m.author.bot;
                                    const boostCollector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                            boostCollector.on("collect", async response => {
                                                if (response.author.id === client.user.id) return
                                                //console.log(`Collected: ${response.content}`);    
                                                userResponse3 = response.content;
                                                boostCollector.stop()
                                                if (userResponse3 == 1){
                                                    boostResult = await processBoost(p, songLength, hpLoss, false, false, false)
                                                    boostReward = [boostResult]
                                                    resolve(boostReward);
                                                } else {
                                                    resolve(false, 0)
                                                }
                                            })
                                    } catch (error){
                                        //console.log(error);
                                        message.channel.send("There was an error")
                                    }
                                break;
                            case -1:
                                try{
                                
                                boostMessage = "Boost Offer:\n"
                                + "increase guard by " + stats[0] + "%\n"
                                + "If you complete a random " + stats[2] + " second song\n"
                                + "LOSE " + stats[1] + "% of your Max HP For every incorrect guess\n"
                                + "Modifiers:\n"
                                //+ generateModifiers()
                                + "(1) Accept\n"
                                + "(2) Deny\n"
                                const choosemessage = await message.channel.send(boostMessage)
                                const filter = m => m.author.id === m.author.id  && !m.author.bot;
                                const boostCollector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                        boostCollector.on("collect", async response => {
                                            if (response.author.id === client.user.id) return
                                            //console.log(`Collected: ${response.content}`);    
                                            userResponse3 = response.content;
                                            boostCollector.stop()
                                            if (userResponse3 == 1){
                                                boostResult = await processBoost(p, songLength, hpLoss, false, false, false)
                                                boostReward = [boostResult]
                                                resolve(true);
                                            } else {
                                                resolve(false)
                                            }
                                        })
                                } catch (error){
                                    //console.log(error);
                                    message.channel.send("There was an error")
                                }
                                break;
                            case 0:
                                try{
                                    //console.log("this is 0")
                                //show boost offer
                                //if they accept, do a Cytus Heardle, if they dont, keep going
                                increaseDamage = await Math.floor(Math.random() * 31) + 10 //10-40%
                                hpLoss = await Math.floor(Math.random() * 21) + 5 //5-25%
                                songLength = await Math.floor(Math.random() * 5) + 3 //3-7 sec
                                //avaliableModifiers = generateModifiers
                                boostMessage = "Boost Offer:\n"
                                + "increase damage by " + increaseDamage + "%\n"
                                + "If you complete a random " + songLength + " second song\n"
                                + "LOSE " + hpLoss + "% of your Max HP For every incorrect guess\n"
                                + "Modifiers:\n"
                                //+ generateModifiers()
                                + "(1) Accept\n"
                                + "(2) Deny\n"
                                const choosemessage = await message.channel.send(boostMessage)
                                const filter = m => m.author.id === m.author.id  && !m.author.bot;
                                const boostCollector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                        boostCollector.on("collect", async response => {
                                            if (response.author.id === client.user.id) return
                                            //console.log(`Collected: ${response.content}`);    
                                            userResponse3 = response.content;
                                            boostCollector.stop()
                                            if (userResponse3 == 1){
                                                boostResult = await processBoost(p, songLength, hpLoss, false, false, false)
                                                boostReward = [boostResult, increaseDamage]
                                                resolve(boostReward);
                                            } else {
                                               resolve(false, 0)
                                            }
                                        })
                                } catch (error){
                                    //console.log(error);
                                    message.channel.send("There was an error")
                                }
                                
                                break;
                            case 1:
                                try{
                                boostMessage = "Boost Offer:\n"
                                + "increase damage by " + stats[0] + "%\n"
                                + "If you complete a random " + stats[2] + " second song\n"
                                + "LOSE " + stats[1] + "% of your Max HP For every incorrect guess\n"
                                + "Modifiers:\n"
                                //+ generateModifiers()
                                + "(1) Accept\n"
                                + "(2) Deny\n"
                                const choosemessage = await message.channel.send(boostMessage)
                                const filter = m => m.author.id === m.author.id  && !m.author.bot;
                                const boostCollector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                        boostCollector.on("collect", async response => {
                                            if (response.author.id === client.user.id) return
                                            //console.log(`Collected: ${response.content}`);    
                                            userResponse3 = response.content;
                                            boostCollector.stop()
                                            if (userResponse3 == 1){
                                                boostResult = await processBoost(p, songLength, stats[1], false, false, false)
                                                boostReward = [boostResult]
                                                resolve(true);
                                            } else {
                                               resolve(false)
                                            }
                                        })
                                } catch (error){
                                    //console.log(error);
                                    message.channel.send("There was an error")
                                }
                                break;
                            case 2:
                                try{
                                    healIncrease = await Math.floor(Math.random() * 51) + 50 //50-100%
                                    hpLoss = await Math.floor(Math.random() * 16) + 5 //5-20%
                                    songLength = await Math.floor(Math.random() * 5) + 3 //3-7 sec
                                    boostMessage = "Boost Offer:\n"
                                    + "increase healing by " + stats[0] + "%\n"
                                    + "If you complete a random " + stats[2] + " second song\n"
                                    + "LOSE " + stats[1] + "% of your Max HP For every incorrect guess\n"
                                    + "Modifiers:\n"
                                    //+ generateModifiers()
                                    + "(1) Accept\n"
                                    + "(2) Deny\n"
                                    const choosemessage = await message.channel.send(boostMessage)
                                    const filter = m => m.author.id === m.author.id  && !m.author.bot;
                                    const boostCollector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                            boostCollector.on("collect", async response => {
                                                if (response.author.id === client.user.id) return
                                                //console.log(`Collected: ${response.content}`);    
                                                userResponse3 = response.content;
                                                boostCollector.stop()
                                                if (userResponse3 == 1){
                                                    boostResult = await processBoost(p, songLength, stats[1], false, false, false)
                                                    boostReward = [boostResult]
                                                    resolve(true, boostReward);
                                                } else {
                                                    resolve(false, 0)
                                                }
                                            })
                                    } catch (error){
                                        //console.log(error);
                                        message.channel.send("There was an error")
                                    }
                                break;
                            case 3:
                                try{
                                    healIncrease = await Math.floor(Math.random() * 51) + 50 //50-100%
                                    hpLoss = await Math.floor(Math.random() * 16) + 5 //5-20%
                                    songLength = await Math.floor(Math.random() * 5) + 3 //3-7 sec
                                    boostMessage = "Boost Offer:\n"
                                    + "increase boost by " + stats[0] + "%\n"
                                    + "If you complete a random " + stats[2] + " second song\n"
                                    + "LOSE " + stats[1] + "% of your Max HP For every incorrect guess\n"
                                    + "Modifiers:\n"
                                    //+ generateModifiers()
                                    + "(1) Accept\n"
                                    + "(2) Deny\n"
                                    const choosemessage = await message.channel.send(boostMessage)
                                    const filter = m => m.author.id === m.author.id  && !m.author.bot;
                                    const boostCollector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                            boostCollector.on("collect", async response => {
                                                if (response.author.id === client.user.id) return
                                                //console.log(`Collected: ${response.content}`);    
                                                userResponse3 = response.content;
                                                boostCollector.stop()
                                                if (userResponse3 == 1){
                                                    boostResult = await processBoost(p, songLength, stats[1], false, false, false)
                                                    boostReward = [boostResult]
                                                    resolve(true, boostReward);
                                                } else {
                                                    resolve(false, 0)
                                                }
                                            })
                                    } catch (error){
                                        //console.log(error);
                                        message.channel.send("There was an error")
                                    }
                                break;
                            case 4:
                                try{
                                    healIncrease = await Math.floor(Math.random() * 51) + 50 //50-100%
                                    hpLoss = await Math.floor(Math.random() * 16) + 5 //5-20%
                                    songLength = await Math.floor(Math.random() * 5) + 3 //3-7 sec
                                    boostMessage = "Boost Offer:\n"
                                    + "increase duration by " + stats[0] + " turns\n"
                                    + "If you complete a random " + stats[2] + " second song\n"
                                    + "LOSE " + stats[1] + "% of your Max HP For every incorrect guess\n"
                                    + "Modifiers:\n"
                                    //+ generateModifiers()
                                    + "(1) Accept\n"
                                    + "(2) Deny\n"
                                    const choosemessage = await message.channel.send(boostMessage)
                                    const filter = m => m.author.id === m.author.id  && !m.author.bot;
                                    const boostCollector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                            boostCollector.on("collect", async response => {
                                                if (response.author.id === client.user.id) return
                                                //console.log(`Collected: ${response.content}`);    
                                                userResponse3 = response.content;
                                                boostCollector.stop()
                                                if (userResponse3 == 1){
                                                    boostResult = await processBoost(p, songLength, stats[1], false, false, false)
                                                    boostReward = [boostResult]
                                                    resolve(true, boostReward);
                                                } else {
                                                    resolve(false, 0)
                                                }
                                            })
                                    } catch (error){
                                        //console.log(error);
                                        message.channel.send("There was an error")
                                    }
                                    break;
                            case 5:
                                try{
                                    boostMessage = "Boost Offer:\n"
                                    + "summon " + stats[0] + " more meowbots\n"
                                    + "If you complete a random " + stats[2] + " second song\n"
                                    + "LOSE " + stats[1] + "% of your Max HP For every incorrect guess\n"
                                    + "Modifiers:\n"
                                    //+ generateModifiers()
                                    + "(1) Accept\n"
                                    + "(2) Deny\n"
                                    const choosemessage = await message.channel.send(boostMessage)
                                    const filter = m => m.author.id === m.author.id  && !m.author.bot;
                                    const boostCollector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                            boostCollector.on("collect", async response => {
                                                if (response.author.id === client.user.id) return
                                                //console.log(`Collected: ${response.content}`);    
                                                userResponse3 = response.content;
                                                boostCollector.stop()
                                                if (userResponse3 == 1){
                                                    boostResult = await processBoost(p, songLength, hpLoss, false, false, false)
                                                    boostReward = [boostResult]
                                                    resolve(boostReward);
                                                } else {
                                                    resolve(false, 0)
                                                }
                                            })
                                    } catch (error){
                                        //console.log(error);
                                        message.channel.send("There was an error")
                                    }
                                break;
                            case 6:
                                boostMessage = "Boost Offer:\n"
                                    + "Double the effect of all ailments. (Except freeze, which will increase by 1)\n"
                                    + "If you complete a random " + stats[2] + " second song\n"
                                    + "LOSE " + stats[1] + "% of your Max HP For every incorrect guess\n"
                                    + "Modifiers:\n"
                                    //+ generateModifiers()
                                    + "(1) Accept\n"
                                    + "(2) Deny\n"
                                    choosemessage = await message.channel.send(boostMessage)
                                    filter = m => m.author.id === m.author.id  && !m.author.bot;
                                    boostCollector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                            boostCollector.on("collect", async response => {
                                                if (response.author.id === client.user.id) return
                                                //console.log(`Collected: ${response.content}`);    
                                                userResponse3 = response.content;
                                                boostCollector.stop()
                                                if (userResponse3 == 1){
                                                    boostResult = await processBoost(p, songLength, stats[1], false, false, false)
                                                    boostReward = [boostResult]
                                                    resolve(true, boostReward);
                                                } else {
                                                    resolve(false, 0)
                                                }
                                            })
                                break;
                            case 7:
                                boostMessage = "Boost Offer:\n"
                                + "Deals " + stats[0] + "% more base damage\n"
                                + "If you complete a random " + stats[2] + " second song\n"
                                + "LOSE " + stats[1] + "% of your Max HP For every incorrect guess\n"
                                + "Modifiers:\n"
                                //+ generateModifiers()
                                + "(1) Accept\n"
                                + "(2) Deny\n"
                                choosemessage = await message.channel.send(boostMessage)
                                filter = m => m.author.id === m.author.id  && !m.author.bot;
                                boostCollector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                        boostCollector.on("collect", async response => {
                                            if (response.author.id === client.user.id) return
                                            //console.log(`Collected: ${response.content}`);    
                                            userResponse3 = response.content;
                                            boostCollector.stop()
                                            if (userResponse3 == 1){
                                                boostResult = await processBoost(p, songLength, stats[1], false, false, false)
                                                boostReward = [boostResult]
                                                resolve(true, boostReward);
                                            } else {
                                                resolve(false, 0)
                                            }
                                        })
                                break;
                            case 8:
                                boostMessage = "Boost Offer:\n"
                                    + "Give a cherry to everyone in your party\n"
                                    + "If you complete a random " + stats[2] + " second song\n"
                                    + "LOSE " + stats[1] + "% of your Max HP For every incorrect guess\n"
                                    + "Modifiers:\n"
                                    //+ generateModifiers()
                                    + "(1) Accept\n"
                                    + "(2) Deny\n"
                                    choosemessage = await message.channel.send(boostMessage)
                                    filter = m => m.author.id === m.author.id  && !m.author.bot;
                                    boostCollector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                            boostCollector.on("collect", async response => {
                                                if (response.author.id === client.user.id) return
                                               // console.log(`Collected: ${response.content}`);    
                                                userResponse3 = response.content;
                                                boostCollector.stop()
                                                if (userResponse3 == 1){
                                                    boostResult = await processBoost(p, songLength, stats[1], false, false, false)
                                                    boostReward = [boostResult]
                                                    resolve(true, boostReward);
                                                } else {
                                                    resolve(false, 0)
                                                }
                                            })
                                break;
                            case 9:
                                boostMessage = "Boost Offer:\n"
                                    + "double the effect and restore a use\n"
                                    + "If you complete a random " + stats[2] + " second song\n"
                                    + "LOSE " + stats[1] + "% of your Max HP For every incorrect guess\n"
                                    + "Modifiers:\n"
                                    //+ generateModifiers()
                                    + "(1) Accept\n"
                                    + "(2) Deny\n"
                                    choosemessage = await message.channel.send(boostMessage)
                                    filter = m => m.author.id === m.author.id  && !m.author.bot;
                                    boostCollector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                            boostCollector.on("collect", async response => {
                                                if (response.author.id === client.user.id) return
                                                //console.log(`Collected: ${response.content}`);    
                                                userResponse3 = response.content;
                                                boostCollector.stop()
                                                if (userResponse3 == 1){
                                                    boostResult = await processBoost(p, songLength, stats[1], false, false, false)
                                                    boostReward = [boostResult]
                                                    resolve(true, boostReward);
                                                } else {
                                                    resolve(false, 0)
                                                }
                                            })
                                break;
                            case 10:
                                boostMessage = "Boost Offer:\n"
                                + "Restore 5 ammo\n"
                                + "If you complete a random " + stats[2] + " second song\n"
                                + "LOSE " + stats[1] + "% of your Max HP For every incorrect guess\n"
                                + "Modifiers:\n"
                                //+ generateModifiers()
                                + "(1) Accept\n"
                                + "(2) Deny\n"
                                choosemessage = await message.channel.send(boostMessage)
                                filter = m => m.author.id === m.author.id  && !m.author.bot;
                                boostCollector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                        boostCollector.on("collect", async response => {
                                            if (response.author.id === client.user.id) return
                                            //console.log(`Collected: ${response.content}`);    
                                            userResponse3 = response.content;
                                            boostCollector.stop()
                                            if (userResponse3 == 1){
                                                boostResult = await processBoost(p, songLength, stats[1], false, false, false)
                                                boostReward = [boostResult]
                                                resolve(true, boostReward);
                                            } else {
                                                resolve(false, 0)
                                            }
                                        })
                                break;
                            case 11:
                                boostMessage = "Boost Offer:\n"
                                    + "Restore a use\n"
                                    + "If you complete a random " + stats[2] + " second song\n"
                                    + "LOSE " + stats[1] + "% of your Max HP For every incorrect guess\n"
                                    + "Modifiers:\n"
                                    //+ generateModifiers()
                                    + "(1) Accept\n"
                                    + "(2) Deny\n"
                                    choosemessage = await message.channel.send(boostMessage)
                                    filter = m => m.author.id === m.author.id  && !m.author.bot;
                                    boostCollector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                            boostCollector.on("collect", async response => {
                                                if (response.author.id === client.user.id) return
                                                //console.log(`Collected: ${response.content}`);    
                                                userResponse3 = response.content;
                                                boostCollector.stop()
                                                if (userResponse3 == 1){
                                                    boostResult = await processBoost(p, songLength, stats[1], false, false, false)
                                                    boostReward = [boostResult]
                                                    resolve(true, boostReward);
                                                } else {
                                                    resolve(false, 0)
                                                }
                                            })
                                break;
                            
                            }
                        })
                            
                }

                /**
                 * generates a random cytus heardle
                 * makes you guess the song
                 */
                async function processBoost(p, songLength, hpLoss, scrambled, hard, reverse){
                    return new Promise(async (resolve, reject) => {
                        numBoosts--;
                        //console.log("get random song")
                        boostSongname = await getRandomSong("songnamestrue.txt")
                        //console.log(boostSongname);
                        //console.log("create dungeon heardle")
                        length = songLength
                        if (hard) {
                            length = length/2;
                        }
                        starttime = 0
                        if(scrambled) {
                            starttime = await getScrambled("./songlist/" + boostSongname + ".mp4");
                        }
                        message.channel.send("processing has started")
                        Song = await createDungeonHeardle(boostSongname, length, starttime, reverse);
                        //console.log("song created!")
                        //console.log("The directory is " + Song.getOutputDirectory());
                        await message.channel.send({files: [Song.getOutputDirectory()]})
                        //create a while loop
                        
                        result = await guessBoost(p, Song, hpLoss);
                        fs.unlink(Song.getOutputDirectory(), (err) => {
                            if (err) {
                            console.log(err);
                            } else {
                            
                            }
                        });
                        resolve(result);
                    })
                }

                async function guessBoost(p, Song, hpLoss){
                    return new Promise(async (resolve, reject) => {
                        try {
                            quitDamage = Math.floor(p.getMaxHp()*(hpLoss * .01) * 2);
                            const choosemessage = await message.channel.send("Guess the song. DO NOT type -g\nPress (0) to quit and take " + quitDamage + " damage")
                                const filter = m => m.author.id === m.author.id  && !m.author.bot;
                                const Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                Collector.on("collect", async response => {
                                    if (response.author.id === client.user.id) return
                                    userResponse = response.content
                                    Collector.stop();
                                    guessResult = await processGuess(userResponse, [Song.getSongname()]);
                                    //console.log("guessresult", guessResult)
                                    if (guessResult == 1){
                                        message.channel.send("THATS RIGHT")
                                        resolve(true)
                                    } else if (userResponse == 0){
                                        message.channel.send("The song was " + Song.getRealname());
                                        p.loseHp(quitDamage)
                                        message.channel.send(p.getName() + " has " + p.getHp() + "HP left")
                                        resolve(false);
                                    } else if (guessResult == 0) {
                                        message.channel.send("Incorrect");
                                        p.loseHp(p.getMaxHp()*(hpLoss * .01))
                                        message.channel.send(p.getName() + " has " + p.getHp() + "HP left")
                                        if (p.getHp() <= 0){
                                            message.channel.send("The song was " + Song.getRealname());
                                            resolve(false)
                                        } else {
                                        result = await guessBoost(p, song, hpLoss);
                                        resolve(result);
                                        }
                                    } else if (guessResult == -1) {
                                        message.channel.send("Could not find that answer");
                                        result = await guessBoost(p, song, hpLoss);
                                        resolve(result);
                                    }
                                })
                        } catch (error) {
                            //console.log(error)
                            message.channel.send("There was an error")
                        }
                    })
                }

                async function cardManager(p, card){
                    return new Promise(async (resolve, reject) => {
                        try{
                            cardId = card.getId()
                            
                            if (cardId < 0) {
                                cardId *= -1;
                            }
                            
                            switch (cardId) {
                            case 1:
                                damage = card.getVar1() + ((card.getLevel() - 1) * card.getVar2());
                                chooseheal = "which enemy will you damage?"
                                number = 1
                                for (i = 0; i < enemies.length; i++){
                                    chooseheal += "\n(" + number + ") " + enemies[i].getName() + " (" + enemies[i].getHp() + "HP)"
                                    number++;
                                }
                                choosemessage = await message.channel.send(chooseheal)
                                filter = m => m.author.id === m.author.id  && !m.author.bot;
                                Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                Collector.on("collect", async response => {
                                    if (response.author.id === client.user.id) return
                                    Collector.stop()
                                    const userResponse2 = response.content;
                                    if (userResponse2 <= enemies.length && userResponse2 > 0){

                                        index = userResponse2 - 1
                                        if (boostStatus && p != null){
                                            increase = Math.floor(Math.random() * 91) + 10
                                            decrease = Math.floor(Math.random() * 30) + 1
                                            video = Math.floor(Math.random() * 10) + 1
                                            //console.log("Starting boost process")
                                            boostResult = await startBoostProcess(p, [increase, decrease, video], 1);
                                            if (boostResult[0]) {
                                                damage = damage + (damage * increase * .01);
                                            }
                                        }
                                        damaged = enemies[index].loseHp(damage)
                                        inBtwnMessages += "You dealt " + damaged + " damage to " + enemies[index].getName() + ". They have " + enemies[index].getHp() + "HP\n"
                                        resolve()
                                    } else {
                                        await message.channel.send("could not interpret your response")
                                        await cardManager(p, card)
                                        resolve()
                                    }
                                })
                                break;
                            case 2:
                                damage = card.getVar1() + ((card.getLevel() - 1) * card.getVar2());
                                boostDamage = 1;
                                if (boostStatus && p != null){
                                    increase = Math.floor(Math.random() * 91) + 10
                                    decrease = Math.floor(Math.random() * 30) + 1
                                    video = Math.floor(Math.random() * 10) + 1
                                    //console.log("Starting boost process")
                                    boostResult = await startBoostProcess(p, [increase, decrease, video], 1);
                                    if (boostResult[0]) {
                                        damage = damage + (damage * increase * .01);
                                    }
                                }
                                for (i = 0; i < enemies.length; i++){
                                    enemies[i].loseHp(damage);
                                }
                                inBtwnMessages += "You dealt "+ Math.floor(damage) +" to every enemy\n";
                                resolve()
                                
                            //unused stat buff card. Mainly cause I dont know how I would revert it back at the end of the battle
                            // case 2:
                            //     statIncrease = 5;
                            //     if (boostStatus) {
                            //         console.log("Starting boost process")
                            //         boostResult = await startBoostProcess(p, "", 2);
                            //         if (boostResult[0]) {
                            //             statIncrease += boostResult[1]
                            //         }
                            //     }
                            //     for (i = 0; i < players.length; i++) {
                            //         players[i].setHp(Math.floor(players[i].getHp() * (1 + (statIncrease/100))));
                            //         players[i].setAtk(Math.floor(players[i].getAtk() * (1 + (statIncrease/100))));
                            //         players[i].setMaxHp(Math.floor(players[i].getMaxHp() * (1 + (statIncrease/100))));
                            //     }
                            //     message.channel.send("Increased party's attack and HP by " + statIncrease + "%");
                            //     resolve();
                            //     break;
                            break;
                            case 3:
                                healing = card.getVar1() + ((card.getLevel() - 1) * card.getVar2());
                                chooseheal = "which character will you heal?"
                                number = 1
                                for (i = 0; i < players.length; i++){
                                    chooseheal += "\n(" + number + ")" + players[i].getName()
                                    number++;
                                }
                                const choosemessage2 = await message.channel.send(chooseheal)
                                const filter2 = m => m.author.id === m.author.id  && !m.author.bot;
                                const Collector2 = choosemessage2.channel.createMessageCollector(filter2, { max: 1, time: 60000, errors: ["time"] });
                                Collector2.on("collect", async response => {
                                    if (response.author.id === client.user.id) return
                                    Collector2.stop()
                                    const userResponse2 = response.content;
                                    if (userResponse2 <= players.length && userResponse2 > 0){
         
                                        index = userResponse2 - 1
                                        if (boostStatus){
                                            increase = Math.floor(Math.random() * 91) + 10
                                            decrease = Math.floor(Math.random() * 30) + 1
                                            video = Math.floor(Math.random() * 10) + 1
                                            //console.log("Starting boost process")
                                            boostResult = await startBoostProcess(p, [increase, decrease, video], 2);
                                            if (boostResult[0]) {
                                                healing = healing + (healing * increase * .01);
                                            }
                                        }
                                        players[index].heal(healing)
                                        inBtwnMessages += "You healed " + players[index].getName() + ". They have " + players[index].getHp() + "HP\n"
                                        resolve()
                                    } else {
                                        await message.channel.send("could not interpret your response")
                                        await cardManager(p, card)
                                        resolve()
                                    }
                                })
                                break;
                            case 4:
                                healAmount = card.getVar1() + ((card.getLevel() - 1) * card.getVar2());
                                if (boostStatus && p != null){
                                    increase = Math.floor(Math.random() * 91) + 10
                                    decrease = Math.floor(Math.random() * 30) + 1
                                    video = Math.floor(Math.random() * 10) + 1
                                    //console.log("Starting boost process")
                                    boostResult = await startBoostProcess(p, [increase, decrease, video], 2);
                                    if (boostResult[0]) {
                                        healAmount = healAmount + (healAmount * increase * .01);
                                    }
                                }
                                for (i = 0; i < players.length; i++){
                                    players[i].heal(healAmount);
                                }
                                inBtwnMessages += "You healed " + healAmount + "HP to your party\n"
                                resolve()
                                break;
                            case 5:
                                chooseheal = "which character will you boost?"
                                number = 1
                                boost = card.getVar1()
                                turns = card.getVar2()
                                for (i = 0; i < players.length; i++){
                                    chooseheal += "\n(" + number + ")" + players[i].getName()
                                    number++;
                                }
                                choosemessage5 = await message.channel.send(chooseheal)
                                filter5 = m => m.author.id === m.author.id  && !m.author.bot;
                                Collector5 = choosemessage5.channel.createMessageCollector(filter5, { max: 1, time: 60000, errors: ["time"] });
                                Collector5.on("collect", async response => {
                                    if (response.author.id === client.user.id) return
                                    Collector5.stop()
                                    const userResponse2 = response.content;
                                    if (userResponse2 <= players.length && userResponse2 > 0){
                                        index = userResponse2 - 1
                                        if (boostStatus){
                                            increase = Math.floor(Math.random() * 66) + 10
                                            decrease = Math.floor(Math.random() * 30) + 1
                                            video = Math.floor(Math.random() * 10) + 1
                                            //console.log("Starting boost process")
                                            boostResult = await startBoostProcess(p, [increase, decrease, video], 2);
                                            if (boostResult[0]) {
                                                boost = boost + increase;
                                            }
                                        }
                                        returned = players[index].setDamageBoost(boost, turns)
                                        inBtwnMessages += returned
                                        resolve()
                                    } else {
                                        await message.channel.send("could not interpret your response")
                                        await cardManager(p, card)
                                        resolve()
                                    }
                                })
                                break;
                            case 6:
                                boost = card.getVar1()
                                turns = card.getVar2()
                                messages = "";
                                if (boostStatus && p != null){
                                    increase = Math.floor(Math.random() * 41) + 10
                                    decrease = Math.floor(Math.random() * 30) + 1
                                    video = Math.floor(Math.random() * 10) + 1
                                    //console.log("Starting boost process")
                                    boostResult = await startBoostProcess(p, [increase, decrease, video], 2);
                                    if (boostResult[0]) {
                                        boost = boost + increase;
                                    }
                                }
                                for (i = 0; i < players.length; i++) {
                                    returned = players[i].setDamageBoost(boost, turns);
                                    messages += returned;
                                }
                                inBtwnMessages += returned;
                                resolve()
                                break;
                            case 7:
                                chooseheal = "which enemy will you weaken?"
                                number = 1
                                boost = card.getVar1()
                                turns = card.getVar2()
                                for (i = 0; i < enemies.length; i++){
                                    chooseheal += "\n(" + number + ")" + enemies[i].getName()
                                    number++;
                                }
                                choosemessage5 = await message.channel.send(chooseheal)
                                filter5 = m => m.author.id === m.author.id  && !m.author.bot;
                                Collector5 = choosemessage5.channel.createMessageCollector(filter5, { max: 1, time: 60000, errors: ["time"] });
                                Collector5.on("collect", async response => {
                                    if (response.author.id === client.user.id) return
                                    Collector5.stop()
                                    const userResponse2 = response.content;
                                    if (userResponse2 <= enemies.length && userResponse2 > 0){
                                        index = userResponse2 - 1
                                        if (boostStatus){
                                            increase = Math.floor(Math.random() * 66) + 10
                                            decrease = Math.floor(Math.random() * 30) + 1
                                            video = Math.floor(Math.random() * 10) + 1
                                            //console.log("Starting boost process")
                                            boostResult = await startBoostProcess(p, [increase, decrease, video], 2);
                                            if (boostResult[0]) {
                                                boost = boost + increase;
                                            }
                                        }
                                        returned = enemies[index].setWeakness(boost, turns)
                                        inBtwnMessages += returned
                                        resolve()
                                    } else {
                                        await message.channel.send("could not interpret your response")
                                        await cardManager(p, card)
                                        resolve()
                                    }
                                })
                                break;
                            case 8:
                                messages259 = "";
                                boost = card.getVar1()
                                turns = card.getVar2()
                                if (boostStatus && p != null){
                                    increase = Math.floor(Math.random() * 41) + 10
                                    decrease = Math.floor(Math.random() * 30) + 1
                                    video = Math.floor(Math.random() * 10) + 1
                                    //console.log("Starting boost process")
                                    boostResult = await startBoostProcess(p, [increase, decrease, video], 2);
                                    if (boostResult[0]) {
                                        boost = boost + increase;
                                    }
                                }
                                for (i = 0; i < enemies.length; i++) {
                                    returned = enemies[i].setWeakness(boost, turns);
                                    messages259 += returned;
                                }
                                inBtwnMessages += messages259
                                resolve()
                                break;
                            case 9:
                                chooseheal = "which enemy will you make fragile?"
                                number = 1
                                boost = card.getVar1();
                                turns = card.getVar2()
                                for (i = 0; i < enemies.length; i++){
                                    chooseheal += "\n(" + number + ")" + enemies[i].getName()
                                    number++;
                                }
                                choosemessage5 = await message.channel.send(chooseheal)
                                filter5 = m => m.author.id === m.author.id  && !m.author.bot;
                                Collector5 = choosemessage5.channel.createMessageCollector(filter5, { max: 1, time: 60000, errors: ["time"] });
                                Collector5.on("collect", async response => {
                                    if (response.author.id === client.user.id) return
                                    Collector5.stop()
                                    const userResponse2 = response.content;
                                    if (userResponse2 <= enemies.length && userResponse2 > 0){
                                        index = userResponse2 - 1
                                        if (boostStatus){
                                            increase = Math.floor(Math.random() * 66) + 10
                                            decrease = Math.floor(Math.random() * 30) + 1
                                            video = Math.floor(Math.random() * 10) + 1
                                            //console.log("Starting boost process")
                                            boostResult = await startBoostProcess(p, [increase, decrease, video], 2);
                                            if (boostResult[0]) {
                                                boost = boost + increase;
                                            }
                                        }
                                        returned = enemies[index].setFragile(boost, turns)
                                        inBtwnMessages += returned
                                        resolve()
                                    } else {
                                        await message.channel.send("could not interpret your response")
                                        await cardManager(p, card)
                                        resolve()
                                    }
                                })
                                break;
                            case 10:
                                messages259 = "";
                                boost = card.getVar1()
                                turns = card.getVar2()
                                if (boostStatus && p != null){
                                    increase = Math.floor(Math.random() * 41) + 10
                                    decrease = Math.floor(Math.random() * 30) + 1
                                    video = Math.floor(Math.random() * 10) + 1
                                    //console.log("Starting boost process")
                                    boostResult = await startBoostProcess(p, [increase, decrease, video], 2);
                                    if (boostResult[0]) {
                                        boost = boost + increase;
                                    }
                                }
                                for (i = 0; i < enemies.length; i++) {
                                    returned = enemies[i].setFragile(boost, turns);
                                    messages259 += returned;
                                }
                                inBtwnMessages += messages259
                                resolve()
                                break;
                            case 11:
                                chooseheal = "which character will you give a shield?"
                                number = 1
                                boost = card.getVar1();
                                turns = card.getVar2();
                                for (i = 0; i < players.length; i++){
                                    chooseheal += "\n(" + number + ")" + players[i].getName()
                                    number++;
                                }
                                choosemessage5 = await message.channel.send(chooseheal)
                                filter5 = m => m.author.id === m.author.id  && !m.author.bot;
                                Collector5 = choosemessage5.channel.createMessageCollector(filter5, { max: 1, time: 60000, errors: ["time"] });
                                Collector5.on("collect", async response => {
                                    if (response.author.id === client.user.id) return
                                    Collector5.stop()
                                    const userResponse2 = response.content;
                                    if (userResponse2 <= players.length && userResponse2 > 0){
                                        index = userResponse2 - 1
                                        if (boostStatus){
                                            increase = Math.floor(Math.random() * 66) + 10
                                            decrease = Math.floor(Math.random() * 30) + 1
                                            video = Math.floor(Math.random() * 10) + 1
                                            //console.log("Starting boost process")
                                            boostResult = await startBoostProcess(p, [increase, decrease, video], 2);
                                            if (boostResult[0]) {
                                                boost = boost + increase;
                                            }
                                        }
                                        returned = players[index].setShield(boost, turns)
                                        inBtwnMessages += returned
                                        resolve()
                                    } else {
                                        await message.channel.send("could not interpret your response")
                                        await cardManager(p, card)
                                        resolve()
                                    }
                                })
                                break;
                            case 12:
                                boost = card.getVar1()
                                turns = card.getVar2()
                                messages = "";
                                if (boostStatus && p != null){
                                    increase = Math.floor(Math.random() * 41) + 10
                                    decrease = Math.floor(Math.random() * 30) + 1
                                    video = Math.floor(Math.random() * 10) + 1
                                    //console.log("Starting boost process")
                                    boostResult = await startBoostProcess(p, [increase, decrease, video], 2);
                                    if (boostResult[0]) {
                                        boost = boost + increase;
                                    }
                                }
                                for (i = 0; i < players.length; i++) {
                                    returned = players[i].setShield(boost, turns);
                                    messages += returned;
                                }
                                inBtwnMessages += messages
                                resolve()
                                break;
                            case 13:
                                chooseheal = "which enemy will you inflict fear on?"
                                number = 1
                                boost = card.getVar1();
                                turns = card.getVar2()
                                for (i = 0; i < enemies.length; i++){
                                    chooseheal += "\n(" + number + ")" + enemies[i].getName()
                                    number++;
                                }
                                choosemessage5 = await message.channel.send(chooseheal)
                                filter5 = m => m.author.id === m.author.id  && !m.author.bot;
                                Collector5 = choosemessage5.channel.createMessageCollector(filter5, { max: 1, time: 60000, errors: ["time"] });
                                Collector5.on("collect", async response => {
                                    if (response.author.id === client.user.id) return
                                    Collector5.stop()
                                    const userResponse2 = response.content;
                                    if (userResponse2 <= enemies.length && userResponse2 > 0){
                                        index = userResponse2 - 1
                                        if (boostStatus){
                                            increase = Math.floor(Math.random() * 66) + 10
                                            decrease = Math.floor(Math.random() * 30) + 1
                                            video = Math.floor(Math.random() * 10) + 1
                                            //console.log("Starting boost process")
                                            boostResult = await startBoostProcess(p, [increase, decrease, video], 2);
                                            if (boostResult[0]) {
                                                boost = boost + increase;
                                            }
                                        }
                                        returned = enemies[index].setFear(boost, turns)
                                        inBtwnMessages += returned
                                        resolve()
                                    } else {
                                        await message.channel.send("could not interpret your response")
                                        await cardManager(p, card)
                                        resolve()
                                    }
                                })
                                break;
                            case 14:
                                messages259 = "";
                                boost = card.getVar1()
                                turns = card.getVar2()
                                if (boostStatus && p != null){
                                    increase = Math.floor(Math.random() * 41) + 10
                                    decrease = Math.floor(Math.random() * 30) + 1
                                    video = Math.floor(Math.random() * 10) + 1
                                    //console.log("Starting boost process")
                                    boostResult = await startBoostProcess(p, [increase, decrease, video], 2);
                                    if (boostResult[0]) {
                                        boost = boost + increase;
                                    }
                                }
                                for (i = 0; i < enemies.length; i++) {
                                    returned = enemies[i].setFear(boost, turns);
                                    messages259 += returned;
                                }
                                inBtwnMessages += messages259
                                resolve()
                                break;
                            case 15:
                                boost = card.getVar1()
                                if (boostStatus && p != null){
                                    increase = Math.floor(Math.random() * 1000) + 1
                                    decrease = Math.floor(Math.random() * 25) + 1
                                    video = Math.floor(Math.random() * 10) + 1
                                    //console.log("Starting boost process")
                                    boostResult = await startBoostProcess(p, [increase, decrease, video], 2);
                                    if (boostResult[0]) {
                                        boost = boost + increase;
                                    }
                                }
                                for (i = 0; i < players.length; i++) {
                                    inBtwnMessages += players[i].setShield(boost, 1);
                                }
                                resolve()
                                break;
                            case 16:
                                boost = card.getVar1()
                                if (boostStatus && p != null){
                                    increase = Math.floor(Math.random() * 5) + 1
                                    decrease = Math.floor(Math.random() * 16) + 5
                                    video = Math.floor(Math.random() * 5) + 2
                                   // console.log("Starting boost process")
                                    boostResult = await startBoostProcess(p, [increase, decrease, video], 4);
                                    if (boostResult[0]) {
                                        boost = boost + increase;
                                    }
                                }
                                for(i = 0; i < players.length; i++) {
                                    players[i].cureNegAilments(boost);
                                }
                                inBtwnMessages += "Your party's negative ailments have been reduced by " + boost + " turns\n" 
                                resolve()
                                
                                break;
                            case 17:
                                chooseheal = "which character will you change the speed?"
                                number = 1
                                boost = card.getVar1();
                                turns = 3;
                                for (i = 0; i < players.length; i++){
                                    chooseheal += "\n(" + number + ")" + players[i].getName()
                                    number++;
                                }
                                choosemessage5 = await message.channel.send(chooseheal)
                                filter5 = m => m.author.id === m.author.id  && !m.author.bot;
                                Collector5 = choosemessage5.channel.createMessageCollector(filter5, { max: 1, time: 60000, errors: ["time"] });
                                Collector5.on("collect", async response => {
                                    if (response.author.id === client.user.id) return
                                    Collector5.stop()
                                    const userResponse2 = response.content;
                                    if (userResponse2 <= players.length && userResponse2 > 0){
                                        index = userResponse2 - 1
                                        if (boostStatus){
                                            increase = Math.floor(Math.random() * 9) + 1
                                            decrease = Math.floor(Math.random() * 15) + 5
                                            video = Math.floor(Math.random() * 10) + 1
                                            //console.log("Starting boost process")
                                            boostResult = await startBoostProcess(p, [increase, decrease, video], 2);
                                            if (boostResult[0]) {
                                                boost = boost + increase;
                                            }
                                        }
                                        players[index].setSpeed(players[index].getSpeed() - boost)
                                        inBtwnMessages += "Decreased " + players[index].getName() + "'s speed by " + boost + '\n'
                                        resolve()
                                    } else {
                                        await message.channel.send("could not interpret your response")
                                        await cardManager(p, card)
                                        resolve()
                                    }
                                })
                                break;
                            case 18:
                                boost = card.getVar1()
                                if (boostStatus && p != null){
                                    increase = Math.floor(Math.random() * 9) + 1
                                    decrease = Math.floor(Math.random() * 15) + 5
                                    video = Math.floor(Math.random() * 10) + 1
                                    //console.log("Starting boost process")
                                    boostResult = await startBoostProcess(p, [increase, decrease, video], 2);
                                    if (boostResult[0]) {
                                        boost = boost + increase;
                                    }
                                }
                                for (i = 0; i < players.length; i++) {
                                    players[i].setSpeed(players[i].getSpeed() - boost);
                                }
                                inBtwnMessages += "Decreased your party's speed by " + boost + '\n'
                                resolve()
                                break;
                            case 19:
                                chooseheal = "which enemy will you increase speed on?"
                                number = 1
                                boost = card.getVar1();
                                turns = 3
                                for (i = 0; i < enemies.length; i++){
                                    chooseheal += "\n(" + number + ")" + enemies[i].getName()
                                    number++;
                                }
                                choosemessage5 = await message.channel.send(chooseheal)
                                filter5 = m => m.author.id === m.author.id  && !m.author.bot;
                                Collector5 = choosemessage5.channel.createMessageCollector(filter5, { max: 1, time: 60000, errors: ["time"] });
                                Collector5.on("collect", async response => {
                                    if (response.author.id === client.user.id) return
                                    Collector5.stop()
                                    const userResponse2 = response.content;
                                    if (userResponse2 <= enemies.length && userResponse2 > 0){
                                        index = userResponse2 - 1
                                        if (boostStatus){
                                            increase = Math.floor(Math.random() * 9) + 1
                                            decrease = Math.floor(Math.random() * 30) + 1
                                            video = Math.floor(Math.random() * 6) + 2
                                            //console.log("Starting boost process")
                                            boostResult = await startBoostProcess(p, [increase, decrease, video], 2);
                                            if (boostResult[0]) {
                                                boost = boost + increase;
                                            }
                                        }
                                        enemies[index].setSpeed(enemies[index].getSpeed() + boost)
                                        inBtwnMessages += "Increased " + enemies[index].getName() + "'s speed by " + boost + '\n'
                                        resolve()
                                    } else {
                                        await message.channel.send("could not interpret your response")
                                        await cardManager(p, card)
                                        resolve()
                                    }
                                })
                                break;
                            case 20:
                                
                                var boost = card.getVar1()
                                if (boostStatus && p != null){
                                    increase = Math.floor(Math.random() * 9) + 1
                                    decrease = Math.floor(Math.random() * 30) + 1
                                    video = Math.floor(Math.random() * 6) + 2
                                    //console.log("Starting boost process")
                                    boostResult = await startBoostProcess(p, [increase, decrease, video], 2);
                                    if (boostResult[0]) {
                                        boost = boost + increase;
                                    }
                                }
                                for (i = 0; i < enemies.length; i++) {
                                    enemies[i].setSpeed(enemies[i].getSpeed() + boost);
                                }
                                inBtwnMessages += "Increased every enemy's speed by " + boost + '\n'
                                resolve()
                                break;
                            case 21:
                                for (i = 0; i < account.getTeam().length; i++) {
                                    if (account.getTeam()[i].getName() == card.getVar1()) {
                                        players.push(account.getTeam()[i])
                                        resolve();
                                        return
                                    }
                                }
                                //message.channel.send("Cannot find that character")
                                resolve()
                                break;
                            case 22:
                                newEnemy = enemyBank[card.getVar1()].copy();

                                newEnemy.setHp(newEnemy.getHp() * (card.getLevel() / 10))
                                for (i = 0; i < newEnemy.getAtk().length; i++) {
                                    for (j = 0; j < newEnemy.getAtk()[i].length; j++) {
                                        newEnemy.getAtk()[i][j].setDamage(newEnemy.getAtk()[i][j].getDamage() * (card.getLevel() / 10))
                                    }
                                }
                                players.push(newEnemy);
                                resolve()
                                break;
                            case 23:
                                boost = card.getVar1()
                                if (boostStatus && p != null){
                                    increase = Math.floor(Math.random() * 5) + 1
                                    decrease = Math.floor(Math.random() * 16) + 5
                                    video = Math.floor(Math.random() * 5) + 2
                                    //console.log("Starting boost process")
                                    boostResult = await startBoostProcess(p, [increase, decrease, video], 4);
                                    if (boostResult[0]) {
                                        boost = boost + increase;
                                    }
                                }
                                for(i = 0; i < players.length; i++) {
                                    players[i].cureNegAilments(boost);
                                    inBtwnMessages += "Your party's negative ailments have been reduced by " + boost + " turns\n" 
                                }
                                resolve()
                                break;
                            case 24:
                                sendStr = "Which enemy will you zap?\n"
                                counter = 1;
                                for(i = 0; i < enemies.length; i++) {
                                    sendStr += "(" + counter + ") " + enemies[i].getName() + "\n";
                                    counter++;
                                }

                                choosemessage = await message.channel.send(sendStr);
                                filter = m => m.author.id === m.author.id  && !m.author.bot;
                                Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                        Collector.on("collect", async response => {
                                            if (response.author.id === client.user.id) return
                                            console.log(`Collected: ${response.content}`);    
                                            userResponse = response.content;
                                            Collector.stop()

                                            if (userResponse >= 1 && userResponse <= enemies.length) {
                                                j = userResponse - 1;
                                                let damaged = enemies[j].loseHp(card.getVar1());  
                                                message.channel.send(enemies[j].getName() + " was zapped for " + damaged + " damage\n");                                         
                                                resolve(1);
                                            } else {
                                                message.channel.send("Your response cannot be interpreted")
                                                await cardManager(p, card);
                                                resolve();
                                            }     

                                        })
                                break;
                            case 25:
                                if (card.getLevel() >= 10) {
                                    message.channel.send("This card is maxed")
                                    resolve()
                                    return;
                                }
                                playersToAdd = [];
                                for (i = 0; i < players.length; i++) {
                                    if (players[i] instanceof Character) {
                                        newEnemy = new Enemy(players[i].getName(), 3, players[i].getMaxSpeed(), players[i].getOnDeathNums(), [[new Attack(0, players[i].atk * (card.getLevel()/10), [], 0, 1)]])
                                        newEnemy.setDecay(34, 3);
                                        playersToAdd.push(newEnemy);
                                    }
                                }
                                for(i = 0; i < playersToAdd.length; i++) {
                                    players.push(playersToAdd[i]);
                                }
                                inBtwnMessages += "You entire team has been cloned\n";
                                resolve();
                                break;
                            case 26:
                                for (let i = 0; i < players.length; i++) {
                                    inBtwnMessages += players[i].setDamageBoost(card.getVar1(), 3);
                                }
                                if(card.getVar2() != 0) {
                                    for (let i = 0; i < players.length; i++) {
                                        inBtwnMessages += players[i].setHaste(card.getVar2(), 3);
                                    }
                                }
                                resolve();
                                break;
                            case 27:
                                sendStr = "Who will you use inivisibility on?\n"
                                counter = 1;
                                for (let i = 0; i < players.length; i++) {
                                    sendStr += "(" + counter + ") " + players[i].getName() + "\n";
                                }

                                choosemessage = await message.channel.send(sendStr);
                                filter = m => m.author.id === m.author.id  && !m.author.bot;
                                Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                        Collector.on("collect", async response => {
                                            if (response.author.id === client.user.id) return
                                            console.log(`Collected: ${response.content}`);    
                                            userResponse = response.content;
                                            Collector.stop()

                                            if (userResponse >= 1 && userResponse <= players.length) {
                                                j = userResponse - 1
                                                inBtwnMessages += players[j].setInvisible(card.getVar1());
                                                resolve();
                                            } else {
                                                message.channel.send("Your response cannot be intperpreted")
                                                await cardManager(p, card);
                                                resolve()
                                            }     

                                        })

                                break;
                            case 28:
                                for (let i = 0; i < players.length; i++) {
                                    inBtwnMessages += players[i].setHealingOverTime(card.getVar1(), 3);
                                }
                                resolve();
                                break;
                            case 29:
                                for (let i = 0; i < enemies.length; i++) {
                                    inBtwnMessages += enemies[i].setPoison(card.getVar1(), 3);
                                    enemies[i].incSpeed(5);
                                    inBtwnMessages += enemies[i].getName() + "'s speed increased by 5\n"
                                }
                                resolve()
                                break;
                            case 30:
                                
                                for (let i = 0; i < enemies.length; i++) {
                                    inBtwnMessages += enemies[i].setFreeze(2);
                                }
                                resolve()
                                break;
                            case 31:
                                damage = 0;
                                if (enemies.length == 1) {
                                    damage = 200;
                                } else if (enemies.length > 1 && enemies.length < 4) {
                                    damage = 75;
                                } else if (enemies.length >= 4) {
                                    damage = 25;
                                } 
                                for (let j = 0; j < enemies.length; j++) {
                                    console.log("J" + j)
                                    inBtwnMessages += enemies[j].getName() + " took " + damaged + " damage 3 times (" + (damage*3) + ")\n"
                                    enemies[j].loseHp(damage);
                                    enemies[j].loseHp(damage);
                                    enemies[j].loseHp(damage);
                                }
                                console.log("Made it to the en")
                                resolve()
                                break;
                            case 32:
                                damage = card.getVar1();
                                for (let i = 0; i < 5; i++) {
                                    random = Math.floor(Math.random() * enemies.length);
                                    damaged = enemies[random].loseHp(damage);
                                    inBtwnMessages += enemies[random].getName() + " took " + damaged + " damage\n"
                                }
                                resolve()
                                break;
                            case 33:
                                damage = card.getVar1();
                                random = Math.floor(Math.random() * enemies.length);
                                damaged = enemies[random].loseHp(damage);
                                inBtwnMessages += enemies[random].getName() + " took " + damaged + " damage\n"
                                players.push(enemyBank.barbarian.copy());
                                resolve()
                                break;
                            case 34:
                                damage = card.getVar1();
                                for (let i = 0; i < 3; i++) {
                                    random = Math.floor(Math.random() * enemies.length);
                                    damaged = enemies[random].loseHp(damage);
                                    inBtwnMessages += enemies[random].getName() + " took " + damaged + " damage\n"
                                }
                                resolve()
                                break;
                            case 35:
                                damage = card.getVar1();
                                for (let i = 0; i < enemies.length; i++) {
                                    damaged = enemies[i].loseHp(damage);
                                    enemies[i].incSpeed(5);
                                    inBtwnMessages += enemies[i].getName() + " took " + damaged + " damage and increased speed by 5\n"
                                }
                                resolve();
                                break;
                            case 36:
                                damage = card.getVar1()
                                if (enemies.length <= 3) {
                                    for (let i = 0; i < enemies.length; i++) {
                                        damaged = enemies[i].loseHp(damage);
                                        inBtwnMessages += enemies[i].getName() + " took " + damaged + " damage\n"
                                    }
                                } else {
                                    top3 = [[0, enemies[0].getHp()], [1,enemies[1].getHp()], [2, enemies[2].getHp()]];
                                    for (let i = 3; i < enemies.length; i++) {
                                        let minIndex = 0;
                                        for (let j = 1; j < top3.length; j++) {
                                            if (top3[j][1] < top3[minIndex][1]) {
                                                minIndex = j;
                                            }
                                        }
                                        
                                        if (enemies[i].getHp() > top3[minIndex][1]) {
                                            top3[minIndex] = [i, enemies[i].getHp()];
                                        }
                                    }

                                    for (let i = 0;  i < top3.length; i++) {
                                        damaged = enemies[top3[i][0]].loseHp(damage);
                                        inBtwnMessages += enemies[i].getName() + " took " + damaged + " damage\n"
                                    }
                                }
                                resolve()
                                break;
                            case 37:
                                damage = card.getVar1();
                                sendStr = "which enemy will you rocket?\n"
                                counter = 1;
                                for (let i = 0; i < enemies.length; i++) {
                                    sendStr += "(" + counter + ") " + enemies[i].getName() + "\n";
                                    counter++;
                                }
                                choosemessage = await message.channel.send(sendStr);
                                filter = m => m.author.id === m.author.id  && !m.author.bot;
                                Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                        Collector.on("collect", async response => {
                                            if (response.author.id === client.user.id) return
                                            console.log(`Collected: ${response.content}`);    
                                            userResponse = response.content;
                                            Collector.stop()

                                            if (userResponse >= 1 && userResponse <= enemies.length) {
                                                j = userResponse - 1;
                                                random = Math.floor(Math.random() * 2);
                                                if (random = 1) {
                                                    damaged = enemies[j].loseHp(damage)
                                                    inBtwnMessages += enemies[j].getName() + " took " + damaged + " damage\n"
                                                } else {
                                                    inBtwnMessages += "Rocket missed\n"
                                                }
                                                resolve();
                                            } else {
                                                message.channel.send("Your response cannot be intperpreted")
                                                await cardManager(p, card);
                                                resolve()
                                            }  

                                        })

                                break;
                            }
                            card.modifyXp(xp);
                           
                        } catch (error) {
                            console.log(error);
                            await message.channel.send("There was an error processing your request.");
                        }
                    })
                }

                /**
                 * 
                 * @param {*} e 
                 * @param {*} type 0 - an enemy attacking (attacks players)
                 *                 1 - a player team attacking (attacks enemies)
                 * @returns 
                 */
                async function doEnemyAttack(e, type){
                   return new Promise(async (resolve, reject) => {
                    try{
                        team = null;
                        opponents = null;
                        if (type == 0) {
                            opponents = players;
                            team = enemies
                        } else {
                            opponents = enemies;
                            team = players
                        }

                        var targetedArray = []
                        attackChain = await e.chooseAtk();
                        //console.log(attackChain)
                        for (i = 0; i < attackChain.length; i++) {
                            //console.log("I:" + i)
                            attack = attackChain[i]
                            if (attack.getType() >= 0 && attack.getType() <= 5) {
                                if (attack.getType() == 0) {
                                    if (opponents.length != 0) {
                                        attackIndex = Math.floor((Math.random() * opponents.length))
                                        if (opponents[attackIndex].hasInvisible()) {
                                            e.getName() + "'s attack missed since " + opponents[attackIndex].getName() + " was invisible.\n"
                                        } else {
                                            damaged = opponents[attackIndex].loseHp(attack.getDamage())
                                            inBtwnMessages += e.getName() + " attacked " + opponents[attackIndex].getName() + " for " + damaged + " damage. They have " + opponents[attackIndex].getHp() + "HP left.\n"
                                            targetedArray.push(opponents[attackIndex]);
                                        }
                                    } else {
                                        if (type == 0) {
                                            damaged = account.loseWagonHp(attack.getDamage());
                                            inBtwnMessages += e.getName() + " attacked you wagon for " + damaged + " damage. It has " + account.getWagonHp() + "HP left\n";
                                        }
                                    }
                                } else if (attack.getType() == 1) {
                                    attackIndex = Math.trunc((Math.random() * team.length))
                                    damaged = team[attackIndex].heal(attack.getDamage())
                                    targetedArray.push(team[attackIndex]);
                                    inBtwnMessages += e.getName() + " healed " + team[attackIndex].getName() + " for " + damaged + " HP" + ". They have " + team[attackIndex].getHp() + " HP left.\n"
                                } else if (attack.getType() == 2 || attack.getType() == 3) {
                                    //console.log("check 1")
                                    targetedArray = opponents
                                    if (attack.getType() == 3) {
                                        targetedArray = team
                                    }
                                    returnMessage = ""
                                    if (attack.getType() == 2 && type == 0 && targetedArray.length == 0) {
                                        damaged = account.loseWagonHp(attack.getDamage());
                                        returnedMessage += e.getName() + " attacked your wagon for " + damaged + " damage. It has " + account.getWagonHp() + "HP left\n"
                                    } else {
                                        for (j = 0; j < targetedArray.length; j++) {
                                            if (targetedArray[j] == undefined) {
                                                targetedArray.splice(j, 1)
                                                j--;
                                            } else if (attack.getType() == 2 ) {
                                                damage = targetedArray[j].loseHp(attack.getDamage());
                                                returnMessage += e.getName() + " attacked " + targetedArray[j].getName() + " for " + damage + " damage. They have " + targetedArray[j].getHp() + "HP left\n"
                                            } else if (attack.getType() == 3) {
                                                damage = targetedArray[j].heal(attack.getDamage());
                                                returnMessage += e.getName() + " healed " + targetedArray[j].getName() + " for " + damage + " HP. They have " + targetedArray[j].getHp() + "HP left\n"
                                            }
                                        }
                                    }
                                    inBtwnMessages += returnMessage;
                                } else if (attack.getType() == 4 || attack.getType() == 5) {
                                    if (attack.getType() == 4) {
                                        damaged = e.loseHp(attack.getDamage())
                                        inBtwnMessages += e.getName() + " attacked itself for " + damaged + " damage. They have " + e.getHp() + "HP left.\n"
                                    } else if (attack.getType() == 5) {
                                        e.heal(attack.getDamage())
                                        inBtwnMessages += e.getName() + " healed itself for " + damaged + " damage. They have " + e.getHp() + "HP left.\n"
                                    }
                                    targetedArray.push(e);
                                }
                                //console.log("check 2")
                                for (j = 0; j < targetedArray.length; j++) {
                                    ailments = "";
                                    for(k = 0; k < attack.ailments.length; k++) {
                                        a = attack.ailments[k];
                                        switch(a.getType()) {
                                            case 0:
                                                ailments += targetedArray[j].setBurn(a.getDamage(), a.getDuration())
                                                break;
                                            case 1:
                                                ailments += targetedArray[j].setPoison(a.getDamage(), a.getDuration())
                                                break;
                                            case 2:
                                                ailments += targetedArray[j].setSilence(a.getDuration())
                                                break; 
                                            case 3:
                                                ailments += targetedArray[j].setDamageBoost(a.getDamage(), a.getDuration())
                                                break;
                                            case 4:
                                                ailments += targetedArray[j].setWeakness(a.getDamage(), a.getDuration())
                                                break;
                                            case 5:
                                                ailments += targetedArray[j].setFragile(a.getDamage(), a.getDuration())
                                                break;
                                            case 6:
                                                ailments += targetedArray[j].setShield(a.getDamage(), a.getDuration())
                                                break;
                                            case 7:
                                                ailments += targetedArray[j].setDecay(a.getDamage(), a.getDuration())
                                                break;
                                            case 8:
                                                ailments += targetedArray[j].setFear(a.getDamage(), a.getDuration())
                                                break;
                                            case 9:
                                                ailments += targetedArray[j].setHealingOverTime(a.getDamage(), a.getDuration())
                                                break;
                                            case 10:
                                                ailments += targetedArray[j].setDamageOverTime(a.getDamage(), a.getDuration())
                                                break;
                                            case 11:
                                                summon(a.getDamage(), team);
                                                ailments += e.getName() + " summoned " + a.getDamage()[0]
                                                for (i = 1; i < a.getDamage().length; i++) {
                                                    ailments += ", " + a.getDamage()[i];
                                                }
                                                ailments += "\n";
                                                break;
                                            case 12:
                                                ailments += targetedArray[j].setFreeze(a.getDuration())
                                                break;
                                            case 13:
                                                ailments += targetedArray[j].setHaste(a.getDamage(), a.getDuration())
                                                break;
                                            case 14:
                                                ailments += targetedArray[j].setInvisible(a.getDuration())
                                                break;
                                            case 15:
                                                ailments += targetedArray[j].setHealingBosot(a.getDamage(), a.getDuration())
                                                break;
                                            case 16:
                                                ailments += targetedArray[j].setHealingReduction(a.getDamage(), a.getDuration())
                                                break;
                                        }
                                    }

                                    //console.log("check 3")
                                    if (ailments != "undefined" && ailments.length != 0) {
                                        inBtwnMessages += ailments
                                    }
                                }
                            } else if (attack.getType() == -1) {
                                const aqDamage = 50
                                if (e.superCharge >= 3) {
                                    e.superCharge -= 3;
                                    abilityChooser = Math.floor(Math.random() * 3) + 1
                                    if (abilityChooser == 1) {
                                        //frozen arrow
                                        const freezeDuration = 1
                                        attackIndex = Math.floor((Math.random() * opponents.length))
                                        damaged = opponents[attackIndex].loseHp(aqDamage)
                                        inBtwnMessages += e.getName() + " used Frozen Arrow " + opponents[attackIndex].getName() + " for " + damaged + " damage. They have " + opponents[attackIndex].getHp() + "HP left.\n"
                                        inBtwnMessages += opponents[attackIndex].setFreeze(freezeDuration);
                                    } else if (abilityChooser == 2) {
                                        //giant arrow
                                        inBtwnMessages += e.getName() + " used Giant Arrow and attacked the entire party for " + aqDamage + " damage\n"
                                        for (i = 0; i < opponents.length; i++) {
                                            damaged = opponents[i].loseHp(aqDamage)
                                            inBtwnMessages += opponents[i].getName() + " has " + damaged + " HP left\n"
                                        }
                                    } else if (abilityChooser == 3) {
                                        //healer puppet
                                        inBtwnMessages += e.getName() + " summoned 3 healers"
                                        await summon(["healer", "healer", "healer"], team);
                                    }
                                } else {
                                    e.superCharge ++;
                                    if (opponents.length == 0) {
                                        damaged = account.loseWagonHp(aqDamage);
                                        inBtwnMessages += e.getName() + " attacked your wagon for " + damaged + " damage. It has " + account.getWagonHp() + "HP left\n"
                                    } else {
                                        attackIndex = Math.floor((Math.random() * opponents.length))
                                        damaged = opponents[attackIndex].loseHp(aqDamage)
                                        inBtwnMessages += e.getName() + " attacked " + opponents[attackIndex].getName() + " for " + damaged + " damage. They have " + opponents[attackIndex].getHp() + "HP left\n"
                                    }
                                    if (e.getHp()/e.getMaxHp() <= 0.5 && attack.getSuperCharge() == 0) {
                                        attack.setSuperCharge(1);
                                        //invisible
                                        inBtwnMessages += e.getName() + " used Invisibility Cloak\n"
                                        inBtwnMessages += e.setInvisible(5);
                                        inBtwnMessages += e.getName() + " used Archer puppet\n"
                                        await summon(["archer", "archer", "archer", "archer", "archer", "archer","archer", "archer", "archer", "archer"], team)
                                    }
                                }

                            } else if (attack.getType() == -2) {
                                const rcDamage = 75
                                if (e.superCharge >= 3) {
                                    abilityChooser = Math.floor(Math.random() * 2) + 1
                                    if (abilityChooser == 1) {
                                        //seeking shield
                                        e.superCharge -= 3;
                                        const seekingDamage = 150;
                                        if (opponents.length != 0) {
                                            inBtwnMessages += e.getName() + " used Seeking Shield. The entire party took " + seekingDamage + " damage\n"
                                            for (i = 0; i < opponents.length; i++) {
                                                opponents[i].loseHp(seekingDamage);
                                                inBtwnMessages += opponents[i].getName() + " has " + opponents[i].getHp() + " HP left\n"
                                            }
                                        } else {
                                            damaged = account.loseWagonHp(seekingDamage)
                                            inBtwnMessages += e.getName() + " used Seeking Shield. Your wagon took " + damaged + " damage\n"
                                        }
                                    } else if (abilityChooser == 2) {
                                        //haste vial
                                        e.superCharge -= 1;
                                        inBtwnMessages += e.getName() + " used haste vial.\n"
                                        inBtwnMessages += e.setHaste(2, 3);
                                        //haste
                                    }
                                } else {
                                    e.superCharge++;
                                    if (opponents.length != 0) {
                                        attackIndex = Math.floor((Math.random() * opponents.length))
                                        damaged = opponents[attackIndex].loseHp(rcDamage)
                                        inBtwnMessages += e.getName() + " attacked " + opponents[attackIndex].getName() + " for " + damaged + " damage. They have " + opponents[attackIndex].getHp() + "HP left\n"
                                    } else {
                                        damaged = account.loseWagonHp(rcDamage);
                                        inBtwnMessages += e.getName() + " attacked your wagon for " + damaged + " damage. It has " + account.getWagonHp() + "HP left\n"
                                    }
                                    if (e.getHp()/e.getMaxHp() <= 0.3 && e.superCharge == 0) {
                                        const numRocketSpears = 5;
                                        const rocketSpearDamage = 125;
                                        e.setSuperCharge(1);
                                        //healing gem
                                        inBtwnMessages += e.getName() + " used healing gem. " + e.getName() + " healed " + e.getMaxHp() + " HP\n"
                                        e.heal(e.getMaxHp())
                                        inBtwnMessages += e.getName() + " used Rocket Spear\n"
                                        for (i = 0; i < numRocketSpears; i++) {
                                            attackIndex = Math.floor((Math.random() * opponents.length))
                                            damaged = opponents[attackIndex].loseHp(rocketSpearDamage)
                                            inBtwnMessages += e.getName() + " attacked " + opponents[attackIndex].getName() + " for " + damaged + " damage. They have " + opponents[attackIndex].getHp() + "HP left\n"
                                        }
                                        inBtwnMessages += e.getName() + " used Hog Rider Puppet\n"
                                        await summon(["hog_rider", "hog_rider", "hog_rider", "hog_rider", "hog_rider", "hog_rider", "hog_rider"], team)
                                    }
                                }
                            }
                        }
                        resolve();



                        // attackIndex = Math.trunc((Math.random() * players.length))
                        // console.log(attackIndex)
                        // damaged = players[attackIndex].loseHp(e.getAtk())
                        // players[attackIndex].setBurn(50, 3);
                        
                    } catch (error) {
                        console.log(error);
                        await message.channel.send("There was an error processing your request.");
                        resolve();
                    }
                   })
                }

                async function checkDeadPeople(characters) {
                    return new Promise(async (resolve, reject) => {
                        try {
                            numDead = 0;
                            for (let i = characters.length - 1; i >= 0; i--) {
                                //console.log(characters[i].getName())
                                if (characters[i].getHp() <= 0) {
                                    deadCharacter = characters[i];
                                    characters.splice(i, 1);
                                    numDead++;
                                    if (deadCharacter.onDeathNums.length > 0) {
                                        //console.log(deadCharacter.onDeathNums);
                                        //console.log("character has on death")
                                        await onDeathManager(deadCharacter, deadCharacter.onDeathNums, characters)
                                        
                                    }
                                    
                                }
                            }
                        resolve(numDead)
                        } catch (error) {
                            console.log(error);
                            message.channel.send("There was an error")
                            resolve();
                        }
                    })
                }

                 /**
                 * 
                 * @param {the person} p 
                 * @param {the manager number thing that you need to execute the correct one} nums 
                 */
                async function onDeathManager(p, nums, team){
                    return new Promise(async(resolve, reject) => {
                        for (i = 0; i < nums.length; i++) {
                            num = nums[i]
                            //console.log(num)
                            //console.log(num[0])
                            let sendMessage = "";
                            switch(num[0]) {
                                case -1:
                                    if (inBtwnMessages.length != 0) {
                                        message.channel.send(inBtwnMessages);
                                        inBtwnMessages = "";
                                    }
                                    let level = num[1];
                                    time = 0.5
                                    revHp = 1;
                                    reverse = true;
                                    if (level >= 2) {
                                        time += 0.2;
                                    }
                                    if (level >= 3) {
                                        revHp = p.getMaxHp()/10;
                                    }
                                    if (level >= 4) {
                                        time += 0.3;
                                    }
                                    if (level >= 5) {
                                        reverse = false;
                                    }
                                    if (level >= 6) {
                                        time += 0.5
                                    }
                                    if (level >= 7) {
                                        revHp = p.getMaxHp()/4
                                    }
                                    if (level >= 8) {
                                        time += 0.5;
                                    }
                                    if (level >= 9) {
                                        revHp = p.getMaxHp()/2
                                    }

                                    //code to get the proper time
                                    result = await processBoost(p, time, 100000, true, false, reverse)
                                    numBoosts++;

                                    if (result) {
                                        //code to heal the proper amount
                                        p.heal(revHp);
                                        players.push(p);
                                    }
                                    break;
                                case 1:
                                    sendmessage = 'bomb explodes\n';
                                    for (i = 0; i < players.length; i++) {
                                        damaged = players[i].loseHp(num[1]);
                                        sendmessage += players[i].getName() + " took " + damaged + " damage\n"
                                    }

                                    for (i = 0; i < enemies.length; i++) {
                                        damaged = enemies[i].loseHp(num[1]);
                                        sendmessage += enemies[i].getName() + " took " + damaged + " damage\n"
                                    }
                                    break;
                                case 2:
                                    summonEnemies = num.slice(1)
                                    await summon(summonEnemies, team)
                                    break;
                                case 3:
                                    for (i = 0; i < team.length; i++) {
                                        damaged = team[i].loseHp(num[1]);
                                        sendmessage += team[i].getName() + " took " + damaged + " damage\n"
                                    }
                                    break;
                                case 4:
                                    target = null;
                                    if (team === players) {
                                        target = enemies;
                                    } else {
                                        target = players
                                    }
                                    for (i = 0; i <target.length; i++) {
                                        damaged = target[i].loseHp(num[1]);
                                        sendMessage += target[i].getName() + " took " + damaged + " damage\n"
                                    }
                                    break;
                                case 5:
                                    target = null;
                                    if (team === players) {
                                        target = enemies;
                                    } else {
                                        target = players
                                    }
                                    ailment = new Ailment(num[1], num[2], num[3])
                                    for (i = 0; i < target.length; i++) {
                                        sendMessage += ailmentManager(target[i], ailment);
                                    }
                                    break;
                            }
                            inBtwnMessages += sendMessage;
                        }
                        resolve();
                    })
                }

                async function ailmentManager(p, ailment) {
                    let a = ailment
                    let ailments = "";
                    //console.log(ailment)
                    switch(ailment.getType()) {
                        case 0:
                            ailments += p.setBurn(a.getDamage(), a.getDuration())
                            break;
                        case 1:
                            ailments += p.setPoison(a.getDamage(), a.getDuration())
                            break;
                        case 2:
                            ailments += p.setSilence(a.getDuration())
                            break; 
                        case 3:
                            ailments += p.setDamageBoost(a.getDamage(), a.getDuration())
                            break;
                        case 4:
                            ailments += p.setWeakness(a.getDamage(), a.getDuration())
                            break;
                        case 5:
                            ailments += p.setFragile(a.getDamage(), a.getDuration())
                            break;
                        case 6:
                            ailments += p.setShield(a.getDamage(), a.getDuration())
                            break;
                        case 7:
                            ailments += p.setDecay(a.getDamage(), a.getDuration())
                            break;
                        case 8:
                            ailments += p.setFear(a.getDamage(), a.getDuration())
                            break;
                        case 9:
                            ailments += p.setHealingOverTime(a.getDamage(), a.getDuration())
                            break;
                        case 10:
                            ailments += p.setDamageOverTime(a.getDamage(), a.getDuration())
                            break;
                        case 11:
                            summon(a.getDamage(), team);
                            break;
                        case 12:
                            ailments += p.setFreeze(a.getDuration())
                            break;
                        case 13:
                            ailments += p.setHaste(a.getDamage(), a.getDuration())
                            break;
                        case 14:
                            ailments += p.setInvisible(a.getDuration())
                            break;
                        case 15:
                            ailments += targetedArray[i].setHealingBosot(a.getDamage(), a.getDuration())
                            break;
                        case 16:
                            ailments += targetedArray[i].setHealingReduction(a.getDamage(), a.getDuration())
                            break;
                    }
                    return ailments;
                }
                  
            }
            
            async function campfire(players, deck) {
                campfireStoked = false;
                playerQuit = false;
                await mainMenu();
                if (playerQuit) {
                    return "player quit"
                } else {
                    return true;
                }

                async function mainMenu(){
                    return new Promise(async (resolve, reject) => {
                        try {
                            sendStr = "";
                            if (campfireStoked == false) {
                               sendStr += "You arived at a campfire. What do you want to do?\n"
                            } else {
                                sendStr += "The campfire has been stoked. What do you want to do?\n"
                            }

                            sendStr +=  "(1) Heal "
                            if (campfireStoked) {
                                sendStr += "(50% of your Max HP)\n"
                            } else {
                                sendStr += "(30% of your Max HP)\n"
                            }
                            sendStr += "(2) Steal the fire (+Healing Card)\n" +
                            "(3) Burn a card and stoke the campfire (-1 card, ++healing)\n" +
                            "(4) leave\n"
                            + 'Type "quit" to leave the game'
                        const choiselist = await message.channel.send(sendStr);
                            
                        // Set up a filter to listen for the user's response
                        const filter = m => m.author.id === m.author.id  && !m.author.bot
                        const collector = choiselist.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                    
                        // Wait for the user to respond
                        collector.on("collect", async response => {
                            // if the response is from a bot, ignore
                        if (response.author.id === client.user.id) return
                        // Record the user's response
                        const userResponse = response.content;
                        collector.stop()
                        //console.log(response.content)
                        if (userResponse == 1) {
                            await heal()
                            resolve();
                        } else if (userResponse == 2) {
                            await getCard() 
                            resolve();                           
                        } else if (userResponse == 3) {
                            await sacrificeCard()
                            resolve();
                        } else if (userResponse == 4) {
                            await leaveConfirmation()
                            resolve();
                        } else if (userResponse == "quit" || userResponse == "Quit") {
                            playerQuit = true;
                            resolve("player quit")
                        } else {
                            message.channel.send("Your input could not be interpreted")
                            await mainMenu()
                            resolve();
                        }

                                });
                                collector.on('end', collected=>{
                                    //console.log("Finished collecting")
                                    //console.log(`Collected ${collected.size} response(s)`);
                                    
                                })
                        } catch (error) {
                            console.log(error);
                            await message.channel.send("There was an error processing your request.");
                        }
                    })
                }

                async function heal(){
                    return new Promise(async (resolve, reject) => {
                        healAmount = 30; //30% of your missing HP
                        amessage = ""
                        for(i = 0; i < players.length;  i++) {
                            if (players[i].getHp > 0) {
                                asdf = players[i].heal(players[i].getMaxHp() * (healAmount / 100));
                                amessage += players[i].getName() + " healed " + asdf + "HP\n"
                            }
                        }
                        message.channel.send(amessage);
                        resolve();
                    })
                }

                async function getCard(){
                    return new Promise(async (resolve, reject) => {
                        totalHp = 0;
                        for (i = 0; i < players.length; i++) {
                            totalHp += players[i].getMaxHp();
                        }
                        averageHp = totalHp/players.length
                        if (campfireStoked) {
                            c = new Card(-4, "Campfire fire", "The fire you stole from the campfire. Heals your party for ${var1} HP", 1, 1, Math.floor(averageHp * 0.5), 0)
                        } else {
                            c = new Card(-4, "Campfire fire", "The fire you stole from the campfire. Heals your party for ${var1} HP", 1, 1, Math.floor(averageHp * 0.3), 0)
                        }
                        deck.push(c)
                        resolve();
                    })
                }

                async function sacrificeCard() {
                    //iterate through the deck
                    //choose a card
                    //remove the card from deck, set campresifaisdl to true
                    //go back to first menu
                    if (campfireStoked) {
                        await message.channel.send("You already sacrificed a card")
                        mainMenu
                    } else {
                    choosecard = "which card will you burn?"
                    cardnumber = 1
                    for (i = 0; i < deck.length; i++){
                        choosecard += "\n(" + cardnumber + ")" + deck[i].getName()
                        cardnumber++;
                    }
                    choosecard += "\nPress (0) to go back"
                    return new Promise(async (resolve, reject) => {
                        try {
                            const choosemessage = await message.channel.send(choosecard)
                            const filter = m => m.author.id === m.author.id  && !m.author.bot;
                            const Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                            Collector.on("collect", async response => {
                                if (response.author.id === client.user.id) return
                                //console.log(`Collected: ${response.content}`);

                                const userResponse = response.content;
                                //console.log("userResponse")
                                //console.log(userResponse)
                                if (userResponse <= deck.length && userResponse > 0){
                                    Collector.stop()
                                    j = userResponse - 1
                                    // console.log("j")
                                    // console.log(j)
                                    selectedCard = deck.splice(j, 1)[0];
                                    // console.log("The Selected Card:")
                                    // console.log(selectedCard)
                                    message.channel.send("You sacrificed " + selectedCard.getName())
                                    campfireStoked = true;
                                    resolve()
                                } else if (userResponse == 0){
                                    Collector.stop()
                                    await mainMenu()
                                    resolve()
                                } else {
                                    await message.channel.send('Could not find that card')
                                    Collector.stop()
                                    await sacrificeCard()
                                    resolve()
                                }
                                
                            })
                        } catch (error) {
                            console.error(error);
                            message.channel.send(`No response received. Time limit exceeded.`);
                            }
                        })
                    }

                }

                async function leaveConfirmation(){
                    return new Promise(async (resolve, reject) => {
                        try {
                        const choiselist = await message.channel.send("Are you sure you want to leave?\n" +
                            "(1) yes\n" +
                            "(2) no\n"
                        );
                            
                        // Set up a filter to listen for the user's response
                        const filter = m => m.author.id === m.author.id  && !m.author.bot
                        const collector = choiselist.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                    
                        // Wait for the user to respond
                        collector.on("collect", async response => {
                            // if the response is from a bot, ignore
                        if (response.author.id === client.user.id) return
                        // Record the user's response
                        const userResponse = response.content;
                        collector.stop()
                        //console.log(response.content)
                        if (userResponse == 1) {
                            message.channel.send("ok bye");
                            resolve();
                        } else if (userResponse == 2) {
                            mainMenu();
                            resolve();                           
                        } else {
                            message.channel.send("Your input could not be interpreted")
                            leaveConfirmation()
                            resolve();
                        }

                                });
                                collector.on('end', collected=>{
                                    console.log("Finished collecting")
                                    console.log(`Collected ${collected.size} response(s)`);
                                    
                                })
                        } catch (error) {
                            console.log(error);
                            await message.channel.send("There was an error processing your request.");
                        }
                    })
                }
            }

            async function cytusHeardleTrial(account) {
                return new Promise(async(resolve, reject) => {
                    sendStr = "Cytus Heardle Trial: 10 MMessence per correct guess\n"
                    + "(1) Accept\n"
                    + "(2) Leave"
                    let choosemessage = await message.channel.send(sendStr);
                    let filter = m => m.author.id === m.author.id  && !m.author.bot;
                    let Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                            Collector.on("collect", async response => {
                                if (response.author.id === client.user.id) return
                                console.log(`Collected: ${response.content}`);    
                                userResponse = response.content;
                                Collector.stop()

                                if (userResponse == 1) {
                                await trialMainLoop()                
                                    resolve(true);
                                } else if (userResponse == "quit" || userResponse == "Quit"){
                                    resolve("player quit")
                                } else if (userResponse == 2 ){ 
                                    resolve(true);
                                } else {
                                    message.channel.send("Your response could not be interpreted")
                                    resolve(await cytusHeardleTrial(account));
                                }

                            })
                    })

                async function trialMainLoop(){
                 return new Promise(async (resolve, reject) =>{  
                    numCorrect = 0;
                    lives = 5;
                    message.channel.send("Processing has started")
                    let s1 = await getRandomSong("songnamestrue.txt")
                    song1 = await createDungeonHeardle(s1, 3, starttime, isreverse)
                    let s2 = await getRandomSong("songnamestrue.txt")
                    song2 = await createDungeonHeardle(s2, 4, starttime, isreverse)
                    let s3 = await getRandomSong("songnamestrue.txt")
                    song3 = await createDungeonHeardle(s3, 5, starttime, isreverse)
                    let s4 = await getRandomSong("songnamestrue.txt")
                    song4 = await createDungeonHeardle(s4, 6, starttime, isreverse)
                    let s5 = await getRandomSong("songnamestrue.txt")
                    song5 = await createDungeonHeardle(s5, 7, starttime, isreverse)
                    s1g = false;
                    s2g = false;
                    s3g = false;
                    s4g = false;
                    s5g = false;
                    message.channel.send({files: [song1.getOutputDirectory()]})
                    message.channel.send({files: [song2.getOutputDirectory()]})
                    message.channel.send({files: [song3.getOutputDirectory()]})
                    message.channel.send({files: [song4.getOutputDirectory()]})
                    message.channel.send({files: [song5.getOutputDirectory()]})
                    await cytusHeardleTrialHelper();
                    let sendStr = "";
                    if (numCorrect == 5) {
                        sendStr += "You guessed all the videos. Good job\n"
                    } else if (numCorrect == 0) {
                        sendStr += "You didnt guess any videos. Wow you freaking suck\n"
                    } else {
                        sendStr += "You guessed " + numCorrect + " videos\n"
                    }
                    sendStr += "You earned " + (numCorrect *10) + " MMessence"
                    message.channel.send(sendStr);
                    account.getLoot()[1] += (numCorrect * 10);
                    song1.deleteFile()
                    song2.deleteFile()
                    song3.deleteFile()
                    song4.deleteFile()
                    song5.deleteFile()
                    resolve();
                })
                }

                async function cytusHeardleTrialHelper(){
                    return new Promise(async (resolve, reject)=> {
                        //guess, update the things, have like 5 lives or something
                        //flip booleans with video 1 guessed to video 5
                        const choosemessage = await message.channel.send("lives: " + lives + "\nCorrect: " + numCorrect + "\nGuess the song. DO NOT type -g\nPress (0) to quit\nPress (1) to send the videos again")
                        const filter = m => m.author.id === m.author.id  && !m.author.bot;
                        const Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                        Collector.on("collect", async response => {
                            if (response.author.id === client.user.id) return
                            userResponse = response.content
                            Collector.stop();
                            let guess = userResponse.toLowerCase();
                            let newguess = "";
                            for (i=0; i < guess.length; i++) {
                                if (guess[i] == " "||guess[i] == "\'" || guess[i] == "."|| guess[i] == "-" || guess[i] == "~" || guess[i] == ',' || guess[i] === "'" || guess[i] == "?" || guess[i] == "!"){
                                    newguess = newguess;
                                }else{
                                    newguess = newguess + guess[i];
                                }
                            }                        
                            //should check if the guess is: 1.correct, 2. has not already been guessed


                            isCorrect = await processGuess(userResponse, [song1.getSongname(), song2.getSongname(), song3.getSongname(), song4.getSongname(), song5.getSongname()])
                            alreadyguessed = true;
                            if (isCorrect == 1) {      
                                if (!s1g){
                                    if (newguess == song1.getSongname()){
                                        message.channel.send("You guessed the 1st video!")
                                        s1g = true;
                                        alreadyguessed = false;
                                        numCorrect++;
                                    }
                                }  
                                if (!s2g){
                                    if (newguess == song2.getSongname()) {
                                        message.channel.send("You guessed the 2nd video!")
                                        s2g = true;
                                        alreadyguessed = false;
                                        numCorrect++;
                                    }

                                }
                                if (!s3g){
                                    if (newguess == song3.getSongname()) {
                                        message.channel.send("You guessed the 3rd video!")
                                        s3g = true;
                                        alreadyguessed = false;
                                        numCorrect++;
                                    }
                                }
                                if (!s4g){
                                    if (newguess == song4.getSongname()){
                                        message.channel.send("You guessed the 4th video!")
                                        s4g = true;
                                        alreadyguessed = false;
                                        numCorrect++
                                    }
                                }   
                                if (!s5g){
                                    if (newguess == song5.getSongname()){
                                        message.channel.send("You guessed the 5th video!")
                                        s5g = true;
                                        alreadyguessed = false;
                                        numCorrect++;
                                    }
                                }
                                if (numCorrect >= 5) {
                                    resolve()
                                } else {
                                    if (alreadyguessed) {
                                        message.channel.send("You already guessed that")
                                    }
                                    await cytusHeardleTrialHelper();
                                    resolve()
                                }
                            } else if (userResponse == 0) {
                                message.channel.send("Quitting out");
                                resolve()
                            } else if (userResponse == 1) {
                                message.channel.send({files: [song1.getOutputDirectory()]})
                                message.channel.send({files: [song2.getOutputDirectory()]})
                                message.channel.send({files: [song3.getOutputDirectory()]})
                                message.channel.send({files: [song4.getOutputDirectory()]})
                                message.channel.send({files: [song5.getOutputDirectory()]})
                                await cytusHeardleTrialHelper();
                                resolve();
                            }else if (isCorrect == -1) {
                                message.channel.send("Could not find that answer");
                                await cytusHeardleTrialHelper();
                                resolve();
                            } else if (alreadyguessed) {
                                message.channel.send("Incorrect");
                                lives--;
                                if (lives <= 0) {
                                    resolve()
                                } else {
                                    await cytusHeardleTrialHelper();
                                    resolve()
                                }
                            } 
                        })
                    })
                }
                
            }

            async function bloodSacrifice(account) {
                await firstMenu();

                async function firstMenu() {
                    return new Promise(async(resolve, reject) => {
                        sendStr = "would you like to nominate one of your party members for a blood sacrifice?\n"
                        //or say "would you like to donate some blood?\n"
                        counter = 1;
                        for (i = 0; i < account.getTeam().length; i++) {
                            sendStr += "(" + counter + ") " + account.getTeam()[i].getName() + "(" + account.getTeam()[i].getHp() + "HP)\n"; 
                            counter ++;
                        }
                        sendStr += "(" + counter + ") Nah Im good"
                        skipNum = counter;
                        let choosemessage = await message.channel.send(sendStr);
                        let filter = m => m.author.id === m.author.id  && !m.author.bot;
                        let Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                Collector.on("collect", async response => {
                                    if (response.author.id === client.user.id) return
                                    console.log(`Collected: ${response.content}`);    
                                    userResponse = response.content;
                                    Collector.stop()

                                    if (userResponse >= 1 && userResponse <= skipNum - 1) {
                                        if (account.getTeam()[userResponse - 1].getHp() <= 0) {
                                            message.channel.send("It appears this character is already dead. They will not be a viable sacrifice!")
                                            await firstMenu()
                                            resolve()
                                        } else {
                                            await chooseAmount(userResponse - 1);   
                                            resolve();
                                        }
                                        
                                    } else if (userResponse == skipNum) {
                                        message.channel.send("Ok bye");
                                        resolve()
                                    }

                                })
                    })
                }

                async function chooseAmount(index) {
                    return new Promise(async(resolve, reject) => {
                        sendStr = "How much would you like?\n" 
                        + "(1) small sacrifice (100HP)\n"
                        + "(2) medium sacrifice (200HP)\n"
                        + "(3) large sacrifice (500HP)\n"
                        + "(0) uhhh nevermind"
                        let choosemessage = await message.channel.send(sendStr);
                        let filter = m => m.author.id === m.author.id  && !m.author.bot;
                        let Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                Collector.on("collect", async response => {
                                    if (response.author.id === client.user.id) return
                                    console.log(`Collected: ${response.content}`);    
                                    userResponse = response.content;
                                    Collector.stop()

                                    if (userResponse == 1) {
                                    await extraStep(index, 100)               
                                    resolve();
                                    } else if (userResponse == 2) {
                                        await extraStep(index, 200)
                                    } else if (userResponse == 3) {
                                        await extraStep(index, 500)
                                    } else if (userResponse == 4 || userResponse == 0) {
                                        await firstMenu()
                                        resolve()
                                    }

                                })
                    })
                }

                async function extraStep(index, amount) {
                    return new Promise(async(resolve, reject) => {
                        sendStr = "one last step. if you get this right, the result will be enhanced"
                        let s1 = await getRandomSong("songnamestrue.txt")
                        song1 = await createDungeonHeardle(s1, 2, starttime, isreverse)
                        message.channel.send({files: [song1.getOutputDirectory()]});
                        const choosemessage = await message.channel.send("Guess the song. DO NOT type -g\n")
                        const filter = m => m.author.id === m.author.id  && !m.author.bot;
                        const Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                        Collector.on("collect", async response => {
                            if (response.author.id === client.user.id) return
                            userResponse = response.content
                            Collector.stop();
                            let guess = userResponse.toLowerCase();
                            let newguess = "";
                            for (i=0; i < guess.length; i++) {
                                if (guess[i] == " "||guess[i] == "\'" || guess[i] == "."|| guess[i] == "-" || guess[i] == "~" || guess[i] == ',' || guess[i] === "'" || guess[i] == "?" || guess[i] == "!"){
                                    newguess = newguess;
                                }else{
                                    newguess = newguess + guess[i];
                                }
                            }                        


                            isCorrect = await processGuess(userResponse, [song1.getSongname()])
                            account.getTeam()[index].lostHp(amount);
                            if (isCorrect == 1) {
                                message.channel.send("THAT'S RIGHT!");
                                amount *= 2;
                            }

                            c = new Card(-3, "Healing - " + amount + "HP", "heals a single target for %{var1}HP", 1, 1, amount, 0);
                            account.getDeck().push(c);
                            message.channel.send("A temporary card has been added to your deck:\n" + c.toString());
                            resolve()
                            
                        })
                    })
                }
            }

            async function wizardSpell(account) {
                return new Promise(async (resolve, reject) => {
                    sendStr = "Wizard: Choose a spell to add to your deck"
                    message.channel.send(sendStr);
                    
                    avaliableCards = [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37];
                    chosenIndexes = [];
                    cardStock = [];

                    for (let i = 0; i < 3; i++) {
                        chosen = Math.floor(Math.random() * avaliableCards.length);
                        
                        while (chosenIndexes.includes(chosen)){
                            chosen = Math.floor(Math.random() * avaliableCards.length);
                        }

                        chosenIndexes.push(chosen);
                        let newCard = await generateCard(avaliableCards[chosen], 10, 1);
                        newCard.flipId();
                        cardStock.push(newCard);
                    }

                    let card1 = cardStock[0];
                    let card2 = cardStock[1];
                    let card3 = cardStock[2];
                    let currentCard = card1;
                    cancelState = false;

                    const newembed = new MessageEmbed()
                        .setColor('#A020F0')
                        .setTitle(card1.getName())
                        .setDescription(card1.getDescription());

                    const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setCustomId('view_item1')
                                .setLabel(card1.getName())
                                .setStyle('PRIMARY'),
                            new MessageButton()
                                .setCustomId('view_item2')
                                .setLabel(card2.getName())
                                .setStyle('PRIMARY'),
                            new MessageButton()
                                .setCustomId('view_item3')
                                .setLabel(card3.getName())
                                .setStyle('PRIMARY'),
                        );

                        const row2 = new MessageActionRow()
                            .addComponents(
                                new MessageButton()
                                    .setCustomId('confirm')
                                    .setLabel('Confirm')
                                    .setStyle('SUCCESS'),
                                new MessageButton()
                                    .setCustomId('cancel')
                                    .setLabel('Cancel')
                                    .setStyle('DANGER')
                            );

                    const sentMessage = await message.channel.send({ embeds: [newembed], components: [row, row2] });
                    const infoFilter = i => i.user.id === message.author.id;
                    const infoCollector = sentMessage.createMessageComponentCollector({ infoFilter });
                    infoCollector.on('collect', async interaction => {
                        if (interaction.customId === 'view_item1') {
                            newembed.setTitle(card1.getName());
                            newembed.setDescription(card1.getDescription());
                            currentCard = card1;
                        } else if (interaction.customId === 'view_item2') {
                            newembed.setTitle(card2.getName());
                            newembed.setDescription(card2.getDescription());
                            currentCard = card2;
                        } else if (interaction.customId === 'view_item3') {
                            newembed.setTitle(card3.getName());
                            newembed.setDescription(card3.getDescription());
                            currentCard = card3;
                        } else if (interaction.customId === 'confirm') {
                            account.getDeck().push(currentCard);
                            message.channel.send("You added " + currentCard.getName() + " to your deck");
                            row2.components[0].setDisabled(true);
                            row2.components[1].setDisabled(true);
                            resolve();
                        } else if (interaction.customId === 'cancel') {
                            if (cancelState) {
                                message.channel.send("Ok bye");
                                row2.components[1].setDisabled(true);
                                resolve();
                            } else {
                                message.channel.send("Press Cancel again to leave")
                                cancelState = true;
                            }
                        }

                        await interaction.update({ embeds: [newembed], components: [row, row2] });
                    });
                    infoCollector.on('end', collected => {
                        //console.log(`Collected ${collected.size} interactions.`);
                    });
                })
            }

            async function donationRequest(account, room) {
                return new Promise (async (resolve, reject) => {
                    if (room.getVar1().includes(account.getId())) {
                        message.channel.send("You've already completed this room. Skipping...")
                        resolve(true);
                        return;
                    } else if (account.getDeck().length == 0) {
                        message.channel.send("oh you dont have any cards. Ok bye")
                        resolve(true);
                        return;
                    } else {
                let hasName = false
                let name = "";
                let random1 = Math.floor((Math.random() ) * 100) + 1 ;
                let random2 = Math.floor(Math.random() * 12);
                if (random1 >= 30) {
                    hasName = true;
                    switch(random2) {
                        case 0:
                            name = "SUPER Lil'Ethan"
                            break;
                        case 1:
                            name = "getRekt1738"
                            break;    
                        case 2:
                            name = "AaNnZDy"
                            break;    
                        case 3:
                            name = "lil'Ethan"
                            break;    
                        case 4:
                            name = "TrashyGames 2"
                            break;    
                        case 5:
                            name = "OMG YOUR GOOD"
                            break;    
                        case 6:
                            name = "Carry My Plz :)"
                            break;    
                        case 7:
                            name = "I HAVE 99 CAPSO"
                            break;  
                        case 8:
                            name = "juan el pro"
                            break;  
                        case 9:
                            name = "juan el nub"
                            break;  
                        case 10:
                            name = "Etho__o"
                            break;   
                        case 11:
                            name = "cactus"
                            break;  
                    }
                }
                let randomCardIndex = Math.floor(Math.random() * account.getDeck().length);
                let randomCard = await account.getDeck()[randomCardIndex];
                let cardName = account.getDeck()[randomCardIndex].getName();
                random = Math.floor(Math.random() * 12);
                let message2 = "";
                switch(random) {
                    case 0:
                        message2 = "OMGG You have " + cardName + "? I NEED IT. Can you give me?"
                        break;
                    case 1:
                        message2 = "Hey! Can I have your " + cardName + "? I'm literally 1 away from upgrading it"
                        break;
                    case 2:
                        message2 = "Plzzzzzz I'm 1 away from upgrading my " + cardName + ". Can I have yours?"
                        break;
                    case 3:
                        message2 = "Hey accept my trade offer! Im so close to upgrading " + cardName + "."
                        break;
                    case 4:
                        message2 = "DUDE I'm literally 1 away from upgarding my " + cardName + ". Can I have yours?"
                        break;
                    case 5:
                        message2 = "Help Im out of wild cards. Can I have your " + cardName + "? I jsut need like 1 more to upgrade it"
                        break;
                    case 6:
                        message2 = "Bruh I have enough gold, but I forgot I needed more " + cardName + " cards. Can I have yours??"
                        break;
                    case 7:
                        message2 = "If you don't donate me your " + cardName + ", I'm kicking you out of the clan. Also remember to do your clan wars."
                        break;
                    case 8:
                        message2 = "Help I'm out of money. I really need more " + cardName + " cards, but I cant afford the shop offer. Can I have yours?"
                        break;
                    case 9:
                        message2 = "Hey do you want to 2v2? Crap actually me deck is underleved I need more " + cardName + " cards. Can you donate to me?"
                        break;
                    case 10:
                        message2 = "I freaking hate this game. Everyone has level 15 cards I just need a few more " + cardName + "s until I max out. Can you donate me yours?"
                        break;
                    case 11:
                        message2 = "Can you donate to me? I need your " + cardName + ". Plz."
                        break;
                }
                let hi = "Someone approaches you\n";
                if (hasName) {
                    hi += name + ": "
                }
                hi += message2 + "\n"
                +"(1) yes\n"
                +"(2) no\n"

                choosemessage = await message.channel.send(hi);
                filter = m => m.author.id === m.author.id  && !m.author.bot;
                Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                        Collector.on("collect", async response => {
                            if (response.author.id === client.user.id) return
                            console.log(`Collected: ${response.content}`);    
                            userResponse = response.content;
                            Collector.stop()

                            if (userResponse == 1) {
                                message.channel.send("You discarded " + randomCard.getName() + ". You got 5 CAPSO Coins added to your account.");
                                account.getPlayer().modifyCoins(5);
                                account.getDeck().splice(randomCardIndex, 1)[0];
                                account.discardCard(randomCard);
                                room.getVar1().push(account.getId());
                                resolve(true);
                            } else if (userResponse == "quit" || userResponse == "Quit") {
                                resolve("player quit");
                            } else {
                                message.channel.send("Ok bye :(")
                                resolve(true)
                            }       

                        })
                    }
                    })
            }

            async function cardFountain(account, room) {
                return new Promise(async(resolve, reject) => {
                    leftCard = false;
                    obtainedCard = false;
                    message.channel.send("You arrive at a card fountain\n")
                    await firstMenu()
                    resolve();
                    
                    
                    async function firstMenu() {
                        return new Promise(async(resolve, reject) => {
                            sendStr = ""
                    if (room.getVar1().length == 0) {
                        sendStr += "There are no cards offerings\n"
                    } else {
                        sendStr += "Current offerings:\n"
                        for (let i = 0; i < room.getVar1().length; i++) {
                            sendStr += room.getVar1()[i][0] + "\n";
                            if (sendStr.length > 1500) {
                                message.channel.send(sendStr);
                                sendStr = "";
                            }
                        }
                    }
                    sendStr += "(1) Offer a card\n"
                    + "(2) recieve an offering\n"
                    + "(3) leave\n"
                    let choosemessage = await message.channel.send(sendStr);
                    let filter = m => m.author.id === m.author.id  && !m.author.bot;
                    let Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                            Collector.on("collect", async response => {
                                if (response.author.id === client.user.id) return
                                console.log(`Collected: ${response.content}`);    
                                userResponse = response.content;
                                Collector.stop()

                                if (userResponse == 1) {
                                    if (leftCard) {
                                        message.channel.send("You already left a card")
                                        await firstMenu();
                                    } else if (account.getDeck().length == 0 ) {
                                        message.channel.send("You do not have any cards to offer. Bring some next time")
                                    } else {
                                        await offerCard()
                                    }
                                    resolve()
                                } else if (userResponse == 2) {
                                    if (room.getVar1().length == 0) {
                                        //message.channel.send("There are no offerings")
                                        await firstMenu();
                                    } else if (obtainedCard) {
                                        message.channel.send("You already recieved an offering")
                                        await firstMenu();
                                    } else [
                                        await chooseCard()
                                    ]
                                    resolve();
                                } else if (userResponse == 3){
                                    resolve();
                                } else {
                                    message.channel.send("Your response cannot be interpreted");
                                    await firstMenu();
                                    resolve();
                                }

                            })
                        })
                    }

                    async function chooseCard() {
                        return new Promise(async(resolve, reject) => {
                            sendStr = "Which message will you take?\n"
                            counter = 1;
                            offerings = room.getVar1()
                            for (let i = 0; i < room.getVar1().length; i++) {
                                sendStr += "(" + counter + ") `" + offerings[i][0] + "`"
                                + "-" + offerings[i][1]; 
                                counter ++;
                                if(sendStr.length > 1500) {
                                    message.channel.send(sendStr);
                                    sendStr = "";
                                }
                            }
                            sendStr += "Press 0 to go back\n"
                            let choosemessage = await message.channel.send(sendStr);
                            let filter = m => m.author.id === m.author.id  && !m.author.bot;
                            let Collector2 = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                    Collector2.on("collect", async response => {
                                        if (response.author.id === client.user.id) return
                                        console.log(`Collected: ${response.content}`);    
                                        userResponse = response.content;
                                        Collector2.stop()

                                        if (userResponse >= 1 && userResponse <= offerings.length) {
                                            j = userResponse - 1;
                                            selectedOffering = offerings[j];
                                            newCard = selectedOffering[1].copy();
                                            message.channel.send("You reached in and pulled out a " + newCard.getName() + " card");
                                            if (newCard.getId() > 0) {
                                                newCard.flipId();
                                            }
                                            account.getDeck().push(newCard);
                                            obtainedCard = true;               
                                            await firstMenu();
                                            resolve();
                                        } else if (userResponse == 0) {
                                            await firstMenu();
                                            resolve()
                                        } else {
                                            message.channel.send("Could not find that message")
                                            await chooseCard();
                                            resolve()
                                        }

                                    })
                        })
                    }
                    
                    async function offerCard() {
                        return new Promise(async(resolve, reject) => {
                            counter = 1;
                            sendStr = "What card would you like to offer?\n"
                            for (let i = 0; i < account.getDeck().length; i++) {
                                sendStr += "(" + counter + ") " + account.getDeck()[i].getName() + "\n"
                                counter++;
                                if (sendStr.length > 1500) {
                                    message.channel.send(sendStr)
                                    sendStr = "";
                                }
                            }
                            sendStr += "Press 0 to go back\n"
                            let choosemessage = await message.channel.send(sendStr);
                            let filter = m => m.author.id === m.author.id  && !m.author.bot;
                            let Collector3 = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                    Collector3.on("collect", async response => {
                                        if (response.author.id === client.user.id) return
                                        console.log(`Collected: ${response.content}`);    
                                        userResponse = response.content;
                                        Collector3.stop()

                                        if (userResponse >= 1 && userResponse <= account.getDeck().length) {
                                            j = userResponse - 1;
                                            selectedCard = account.getDeck().splice(j, 1)[0];
                                            account.discardCard(selectedCard);

                                            let choosemessage = await message.channel.send("Write a message");
                                            let filter = m => m.author.id === m.author.id  && !m.author.bot;
                                            let Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                                    Collector.on("collect", async response => {
                                                        if (response.author.id === client.user.id) return
                                                        console.log(`Collected: ${response.content}`);    
                                                        userResponse2 = response.content;
                                                        Collector.stop()

                                                        
                                                        room.getVar1().push([userResponse2, selectedCard.copy()]);
                                                        leftCard = true;
                                                        message.channel.send("You throw " + selectedCard.getName() + " into the fountain and watch it slowly dissolve")
                                                        await firstMenu();
                                                        resolve();      

                                                    })
                                        } else if (userResponse == 0) {
                                            await firstMenu();
                                            resolve();
                                        } else {
                                            message.channel.send("Cannot find that card")
                                            await offerCard()
                                            resolve();
                                        }       

                                    })
                        })
                    }

                })
            } 

            async function inariShrine(account) {
                return new Promise(async(resolve, reject) => {
                    if(account.getDeck().length == 0) {
                        message.channel.send("Yip yip! You don't have any cards left in your deck. See you later")
                        resolve(true);
                        return;
                    }
                message.channel.send({files: ["./songlist/When Moons Reaching Out Stars Reload.mp4"]})
                sendStr = "Yip yip! Oh, I see you're back. Well then, go on and pick which card you'd like to duplicate.\n"
                counter = 1;
                for (let i = 0; i < account.getDeck().length; i++) {
                    sendStr += "(" + counter + ") " + account.getDeck()[i].getName() + " `(Level " + account.getDeck()[i].getLevel() + ")`\n"
                    counter++;
                }
                sendStr += "Press 0 to leave\n"
                sendStr += 'Type "quit" to leave the game'

                let choosemessage = await message.channel.send(sendStr);
                let filter = m => m.author.id === m.author.id  && !m.author.bot;
                let Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                        Collector.on("collect", async response => {
                            if (response.author.id === client.user.id) return
                            console.log(`Collected: ${response.content}`);    
                            userResponse = response.content;
                            Collector.stop()

                            if (userResponse >= 1 && userResponse <= account.getDeck().length) {
                                j = userResponse - 1;
                                message.channel.send("Well, here goes! Whew, all done. Go on, take it.");
                                selectedCard = account.getDeck()[j].copy();
                                selectedCard.flipId();
                                account.getDeck().push(selectedCard);
                                message.channel.send("You recieved " + selectedCard.getName() + "\nSee you later")               
                                resolve(true);
                            } else if (userResponse == "quit" || userResponse == "Quit" ) {
                                resolve("player quit")
                            } else {
                                message.channel.send("See you later");
                                resolve(true)
                            }        

                        })
                    })
            }
            //Yip yip! Oh, I see you're back. Well then, go on and pick which card you'd like to duplicate.
            //Well, here goes! Whew, all done. Go on, take it. See you later.

            async function renameCard(card) {
                return new Promise(async (resolve, reject) => {
                    try{
                        var MAX_CHARS = 200
                        let choosemessage = await message.channel.send("Enter a new name for " + card.getName());
                        let filter = m => m.author.id === m.author.id  && !m.author.bot;
                        let Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                Collector.on("collect", async response => {
                                    if (response.author.id === client.user.id) return
                                    console.log(`Collected: ${response.content}`);    
                                    userResponse = response.content;
                                    Collector.stop()
                                    if (userResponse.length > MAX_CHARS) {
                                        message.channel.send("Card name and description cannot exceed " + MAX_CHARS + " characters")
                                        resolve();
                                    } 
                                    let choosemessage2 = await message.channel.send("Are you sure you want to rename " + card.getName() + " to " + userResponse + "\n(1) Yes\n(2) No");
                                    let filter = m => m.author.id === m.author.id  && !m.author.bot;
                                    let Collector2 = choosemessage2.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                            Collector2.on("collect", async response => {
                                                if (response.author.id === client.user.id) return
                                                console.log(`Collected: ${response.content}`);    
                                                userResponse2 = response.content;
                                                Collector2.stop()
                                                if (userResponse2 == 1){
                                                    totalLength = userResponse.length + card.getDescription().length;
                                                    if (totalLength <= MAX_CHARS) {
                                                        card.setName(userResponse);
                                                        message.channel.send("Card has been renamed to " + card.getName())
                                                    } else {
                                                        message.channel.send("Your card name and description cannot exceed "+ MAX_CHARS + " characters")
                                                    }
                                                    resolve()
                                                } else {
                                                    message.channel.send("cancelled")
                                                    resolve()
                                                }
                
                                            })                                

                                })
                    } catch {
                        message.channel.send("there was an error")
                        resolve();
                    }
                })
            }

            //NOT IN USE
            async function upgradeCharacter(account, ch) {
                sentstring = ch.getName() + ":\n"
                + "Attack: level " + ch.getAtklvl() + "\n"
                + "HP: level " + ch.getHpLvl() + "\n"
                + "Ability: level " + ch.getAbilitylvl() + "\n\n"
                + "(1) Upgrade Attack\n"
                + "(2) Upgrade HP\n"
                + "(3) Upgrade Ability\n"
                + "You have " + account.getPlayer.getCapsocoins() + " CAPSO Coins, " + account.getEssence() + " MMessence";
                let choosemessage = await message.channel.send(sentstring);
                let filter = m => m.author.id === m.author.id  && !m.author.bot;
                let Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                        Collector.on("collect", async response => {
                            if (response.author.id === client.user.id) return
                            console.log(`Collected: ${response.content}`);    
                            userResponse = response.content;
                            Collector.stop()
                            
                            if (userResponse == 1) {
                                if (ch.getAtklvl() >= 10) {
                                    message.channel.send("Your character's attack is maxed")
                                } else {
                                    ch.upgradeAtk();
                                    //subtract CAPSO Coins
                                }
                            } else if (userResponse == 2) {
                                if (ch.getHplvl() >= 10) {
                                    message.channel.send("You character's HP is maxed")
                                } else {
                                    ch.upgradeHp();
                                    //subtract CAPSO Coins
                                }
                            } else if (userResponse == 3) {
                                if (ch.getAbilitylvl() >= 10) {
                                    message.channel.send("Your character's ability is maxed")
                                } else {
                                    ch.upgradeAbility();
                                    //subtract CAPSO Coins
                                    //subtract MMessense
                                }
                            }
                
                        })
                
            }

            async function mainMenu(account) {
                result = 0;
                try{
                hi = await firstMenu();
                if (hi == "player quit") {
                    return;
                }
                } catch (err) {
                    message.channel.send("There was an error")
                    console.log(err)
                }
                return result;

                async function firstMenu(){
                    return new Promise(async(resolve, reject) =>{

                        let setDescription = "**Current Team:**\n"

                        for (i = 0; i < account.getTeam().length; i++) {
                            if (account.getTeam()[i] != undefined) {
                            setDescription += account.getTeam()[i].getName() + "\n"
                            }
                        }

                        setDescription += "\n**CAPSO Coins:** " + account.getCapsocoins() + "\n"
                        + "**MMessence:** " + account.getEssence()

                        const newembed = new MessageEmbed()
                            .setColor('#0099ff')
                            .setTitle("Info Panel")
                            .setDescription(setDescription);

                        const row = new MessageActionRow()
                            .addComponents(
                                new MessageButton()
                                    .setCustomId('view_deck')
                                    .setLabel('View Deck')
                                    .setStyle('PRIMARY'),
                            );

                        const sentMessage = await message.channel.send({ embeds: [newembed], components: [row] });

                        const infoFilter = i => i.user.id === message.author.id;

                        const infoCollector = sentMessage.createMessageComponentCollector({ infoFilter, time: 60000 });

                        infoCollector.on('collect', async interaction => {
                            if (interaction.customId === 'view_deck') {
                                let deckInfo = "Deck:\n"
                                num = 1
                                //message.channel.send("Deck:")
                                for (i = 0; i < account.getDeck().length; i++) {
                                    currentCard = account.getDeck()[i]
                                    //message.channel.send("(" + num + ") " + currentCard.getName() + " - Lvl " + currentCard.getLevel() + " - " + currentCard.getDescription())
                                    deckInfo += "(" + num + ") " + currentCard.getName() + " `(Lvl  " + currentCard.getLevel() + ")` - " + currentCard.getDescription() + "\n"
                                    num++;
                                    if (deckInfo.length >= 1500) {
                                        message.channel.send(deckInfo);
                                        deckInfo = "";
                                    }
                                }
                                message.channel.send(deckInfo)
                            } 

                            await interaction.update({ embeds: [newembed], components: [row] });
                        });

                        infoCollector.on('end', collected => {
                            console.log(`Collected ${collected.size} interactions.`);
                        });


                        stringStr = "" //character info
                        +"(1) Start run\n"
                        +"(2) Edit loadout\n"
                        +"(3) Cards\n"
                        +"(4) Characters\n"
                        +"(5) Blacksmith\n"
                        +"(6) Shop\n"
                        +'Type "quit" to leave'
                        //+"(7) Records"
                        let choosemessage = await message.channel.send(stringStr);
                        let filter = m => m.author.id === m.author.id  && !m.author.bot;
                        let Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                Collector.on("collect", async response => {
                                    if (response.author.id === client.user.id) return
                                    console.log(`Collected: ${response.content}`);    
                                    userResponse = response.content;
                                    Collector.stop()

                                    if (userResponse == 1) {
                                        result = 1;
                                        resolve()                 
                                    } else if (userResponse == 2) {
                                        await editTeam()
                                        resolve();
                                    } else if (userResponse == 3) {
                                        await cards()
                                        resolve();
                                    } else if (userResponse == 4) {
                                        await characters()
                                        resolve();
                                    } else if (userResponse == 5) {
                                        try{
                                        await upgrade()
                                        } catch (err) {
                                            message.channel.send("There was an error")
                                            console.log(err)
                                        }
                                        resolve();
                                    } else if (userResponse == 6) {
                                        await displayShop();
                                        resolve();
                                    } else if (userResponse == "quit" || userResponse == "Quit") {
                                        message.channel.send("Ok bye")
                                        resolve("player quit")
                                    } else {
                                        message.channel.send('Your response could not be interpreted');
                                        await firstMenu()
                                        resolve();
                                    }

                                })
                    })
                }

                async function upgrade() {
                    return new Promise(async(resolve, reject) =>{
                        stringStr = "" //character info
                        +"(1) Upgrade Card\n"
                        +"(2) Upgrade Character\n"
                        +"(3) Upgrade Wagon\n"
                        +"(4) Salvage Cards\n"
                        +"(5) Back (Main Menu)"
                        let choosemessage = await message.channel.send(stringStr);
                        let filter = m => m.author.id === m.author.id  && !m.author.bot;
                        let Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                Collector.on("collect", async response => {
                                    if (response.author.id === client.user.id) return
                                    console.log(`Collected: ${response.content}`);    
                                    userResponse = response.content;
                                    Collector.stop()

                                    if (userResponse == 1) {
                                        await chooseCard();
                                        resolve()                 
                                    } else if (userResponse == 2) {
                                        await chooseCharacter()
                                        resolve();
                                    } else if (userResponse == 3){
                                        await wagonUpgrade()
                                        resolve();
                                    } else if (userResponse == 4){
                                        await salvage();
                                        await saveAccount(account);
                                        await upgrade()
                                        resolve();
                                    } else if (userResponse == 5 || userResponse == 0) {
                                        await firstMenu()
                                        resolve();
                                    } else {
                                        message.channel.send('Your response could not be interpreted');
                                        await upgrade()
                                        resolve();
                                    }

                                })
                    })
                }

                async function salvage() {
                    return new Promise(async(resolve, reject) => {
                    salvagedCards = []
                    await salvageHelper()
                    resolve()
                    })

                    async function salvageHelper() {
                    return new Promise(async(resolve, reject) => {
                        if (account.getCards().length == 0 && salvagedCards.length == 0) {
                            message.channel.send("You dont have any cards. Remove cards from your deck in order to salvage them");
                            resolve();
                            return;
                        }
                        sendStr = "Select a card to salvage:\n";
                        counter = 1;
                        for (i = 0; i < account.getCards().length; i++) {
                            sendStr += "(" + counter + ") " + account.getCards()[i].getName() + " `Level " + account.getCards()[i].getLevel() + "`\n";
                            if (sendStr.length >= 1500) {
                                message.channel.send(sendStr);
                                sendStr = "";
                            }
                            counter++;
                        }
                        if (salvagedCards.length != 0) {
                            sendStr += "\nCards about to be salvaged:\n"
                            totalEssence = 0
                            for (i = 0;  i < salvagedCards.length; i++) {
                                sendStr += "(" + counter + ") " + salvagedCards[i][0].getName() + " `Level " + salvagedCards[i][0].getLevel() + "` - " + salvagedCards[i][1] + " MMessence \n";
                                totalEssence += salvagedCards[i][1]
                                if (sendStr.length >= 1500) {
                                    message.channel.send(sendStr);
                                    sendStr = "";
                                }
                                counter++;
                            }
                            sendStr += "Total - " + totalEssence + " MMessence.\nPress Y to confirm salvage\nPress 0 to go back"
                        } else {
                            sendStr += "Remove cards from your deck to salvage them\nPress 0 to go back"
                        }

                        let choosemessage = await message.channel.send(sendStr);
                        let filter = m => m.author.id === m.author.id  && !m.author.bot;
                        let Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                Collector.on("collect", async response => {
                                    if (response.author.id === client.user.id) return
                                    console.log(`Collected: ${response.content}`);    
                                    userResponse = response.content;
                                    Collector.stop()
                        
                                    if (userResponse >= 1 && userResponse <= account.getCards().length) {
                                        //add card to salveage 
                                        j = userResponse - 1;
                                        cost = await calculateSalvage(account.getCards()[j])
                                        salvagedCards.push([account.getCards()[j], cost]);
                                        account.getCards().splice(j, 1); 
                                        await salvageHelper()      
                                        resolve();
                                    } else if (userResponse > account.getCards().length && userResponse <= (account.getCards().length + salvagedCards.length)) {
                                        //remove card back to collection
                                        j = userResponse - 1 - account.getCards().length;
                                        account.getCards().push(salvagedCards[j]);
                                        salvagedCards.splice(j, 1);
                                        await salvageHelper()  
                                        resolve();
                                    } else if (userResponse == 0) {
                                        //move all cards back to their collection and then leave
                                        for (i = 0; i < salvagedCards.length; i++) {
                                            account.getCards().push(salvagedCards[i]);
                                        }
                                        resolve()
                                    } else if (userResponse == "y" || userResponse == "Y") {
                                        //confirm salvage
                                        sendStr = "Salvage selected cards for " + totalEssence + "MMessence?\n"
                                        + "(1) Yes\n"
                                        + "(2) No"
                                        let choosemessage2 = await message.channel.send(sendStr);
                                        let filter = m => m.author.id === m.author.id  && !m.author.bot;
                                        let Collector2 = choosemessage2.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                                Collector2.on("collect", async response => {
                                                    if (response.author.id === client.user.id) return
                                                    console.log(`Collected: ${response.content}`);    
                                                    userResponse = response.content;
                                                    Collector2.stop()

                                                    if (userResponse == 1) {
                                                    
                                                    account.incEssence(totalEssence);       
                                                    message.channel.send("You now have " + account.getEssence() + "MMessence")
                                                    resolve();
                                                    } else if (userResponse == 2) {
                                                        message.channel.send("Cancelled")
                                                        await salvageHelper()
                                                        resolve()
                                                    }   

                                                })
                                       
                                    }
                        
                                })


                        //old code that dosent work cause it breaks when you have more than 25 cards
                        // cardList = []
                        // for(i = 0; i < account.getCards().length; i++) {
                        //     newLabel = {label: account.getCards()[i].getName(), description: account.getCards()[i].getDescription(), value: String(i)}
                        //     cardList.push(newLabel);
                        // }

                        // message.channel.send("Choose which cards from your collection to salvage. Remove cards from your deck in order to salvage them");
                        // const row = new MessageActionRow()
                        // .addComponents(
                        //     new MessageSelectMenu()
                        //         .setCustomId('salvage-chooser')
                        //         .setPlaceholder('Choose card to salvage...')
                        //         .addOptions(cardList) //this is the thing with the labels
                        //         .setMinValues(1)
                        //         .setMaxValues(account.getCards().length) //sets the min and max values that can be chose. remove these 2 to make it select only 1
                        // );
                                                    
                        // let sentMessage = await message.channel.send({ components: [row] });
                                    
                        // filter = interaction => interaction.customId === 'salvage-chooser' && interaction.user.id === message.author.id;
                                
                        // collector = sentMessage.createMessageComponentCollector({ filter, max: 1, time: 60000 });
                                
                        // collector.on('collect', async interaction => {
                        //     await interaction.deferUpdate();
                        //     const selectedValues = interaction.values.map(value => parseInt(value, 10));
                        //     //selectedValues = parseInt(interaction.values);
                        //     selectedValues.sort((a, b) => a - b);
                        //     totalCost = 0;
                        //     console.log(selectedValues)
                        //     hasHighLevelCard = false;
                        //     for (i = selectedValues.length - 1; i >= 0; i--) {
                        //         console.log(i)
                        //         card = account.getCards()[selectedValues[i]]
                        //         totalCost += await calculateSalvage(card)
                        //         if (account.getCards()[selectedValues[i]].getLevel() >= 5) {
                        //             hasHighLevelCard = true;
                        //         } 
                                
                        //     }
                        //     salvageConfirm = "";
                        //     if (hasHighLevelCard) {
                        //         salvageConfirm += "WARNING: You are about to salvage a card that is level 5 or higher.\n"
                        //     }
                        //     salvageConfirm += "salvage " + selectedValues.length + " cards and earn " + totalCost + " MMessence?\n(1) yes\n(2) no"
                        //     let choosemessage = await message.channel.send(salvageConfirm);
                        //     let filter = m => m.author.id === m.author.id  && !m.author.bot;
                        //     let Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                        //             Collector.on("collect", async response => {
                        //                 if (response.author.id === client.user.id) return
                        //                 console.log(`Collected: ${response.content}`);    
                        //                 userResponse = response.content;
                        //                 Collector.stop()

                        //                 if (userResponse == 1) {
                        //                     account.incEssence(totalCost);
                        //                     for (i = selectedValues.length - 1; i >= 0; i--) {
                        //                         account.getCards().splice(selectedValues[i], 1)  
                        //                     }  
                        //                     message.channel.send("You now have " + account.getEssence() + " essence")          
                        //                     resolve();
                        //                 } else {
                        //                     message.channel.send("Cancelled")
                        //                     resolve()
                        //                 }

                        //             })

                            
                                
                        // });
                                
                        // collector.on('end', collected => {
                        //   if (!collected.size) {
                        //     resolve(null);
                        //   }
                        // });
                    })
                    }
                }

                async function calculateSalvage(card) {
                    console.log("ADSLKJADSJLK:ASDJKL")
                    console.log(card);
                    return new Promise(async(resolve, reject) => {
                        upgradeCost = await calculateUpgradeCost(card.getLevel());
                        salvageCost = upgradeCost[2];
                        salvageCost += card.getXp();
                        resolve(salvageCost)
                    })
                }

                async function wagonUpgrade() {
                    return new Promise(async(resolve, reject) =>{
                        stringStr= "Current Stats:\n"
                        +"Wagon HP - " + account.getWagonHp() + "HP\n"
                        +"Boost - " + account.getBoostLvl() + " per match\n"
                        +"DeckSize - " + account.getDeckSize() + " cards\n\n"
                        +"These are the upgrades I can do to your wagon\n"
                        + "(1) Wagon HP\n"
                        + "(2) Boost\n"
                        + "(3) Deck size\n"
                        + "(4) Back\n"
                        + "You have " + account.getCapsocoins() + " CAPSO Coins"
                        let choosemessage = await message.channel.send(stringStr);
                            let filter = m => m.author.id === m.author.id  && !m.author.bot;
                            let Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                    Collector.on("collect", async response => {
                                        if (response.author.id === client.user.id) return
                                        console.log(`Collected: ${response.content}`);    
                                        userResponse = response.content;
                                        Collector.stop()

                                        if (userResponse == 1) {
                                            await upgradeWagonHP();
                                            resolve()                 
                                        } else if (userResponse == 2) {
                                            await upgradeBoost()
                                            resolve();
                                        } else if (userResponse == 3){
                                            await upgradeDeck()
                                            resolve()
                                        } else if (userResponse == 4) {
                                            await upgrade()
                                            resolve();
                                        } else {
                                            message.channel.send('Your response could not be interpreted');
                                            await upgrade()
                                            resolve();
                                        }
                                    })
                            })
                }

                async function upgradeWagonHP() {
                    return new Promise(async(resolve, reject) =>{
                        cost = 0;
                        if (account.getWagonLvl() % 5 == 0) {
                            cost = Math.floor(account.getWagonLvl() / 5) * 10
                        } else {
                            cost = (Math.floor(account.getWagonLvl() / 5 ) +1) * 10
                        }
                        stringStr= "Upgrade wagon's health by 10HP for " + cost + " CAPSO Coins?\n"
                        + "(1) Yes\n"
                        + "(2) No\n"
                        let choosemessage = await message.channel.send(stringStr);
                            let filter = m => m.author.id === m.author.id  && !m.author.bot;
                            let Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                    Collector.on("collect", async response => {
                                        if (response.author.id === client.user.id) return
                                        console.log(`Collected: ${response.content}`);    
                                        userResponse = response.content;
                                        Collector.stop()

                                        if (userResponse == 1) {
                                            if (account.getPlayer().getCapsocoins() >= cost) {
                                                await account.incWagonLvl(1)
                                                await account.reloadWagonHP(); message.channel.send("You upgraded the wagon to " + account.getWagonHp() + "HP");
                                               
                                            } else {
                                                message.channel.send("You dont have enough CAPSO Coins")
                                            }
                                            await saveAccount(account);
                                            await upgradeWagonHP();
                                            resolve()                 
                                        } else if (userResponse == 2) {
                                            await wagonUpgrade()
                                            resolve();
                                        } else {
                                            message.channel.send('Your response could not be interpreted');
                                            await upgrade()
                                            resolve();
                                        }
                                    })
                            })
                }

                async function upgradeDeck() {
                    return new Promise(async(resolve, reject) =>{
                        cost = 50;
                        stringStr= "Increase Deck size by 5 cards for " + cost + " CAPSO Coins?\n"
                        + "(1) Yes\n"
                        + "(2) No\n"
                        let choosemessage = await message.channel.send(stringStr);
                            let filter = m => m.author.id === m.author.id  && !m.author.bot;
                            let Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                    Collector.on("collect", async response => {
                                        if (response.author.id === client.user.id) return
                                        console.log(`Collected: ${response.content}`);    
                                        userResponse = response.content;
                                        Collector.stop()

                                        if (userResponse == 1) {
                                            if (account.getPlayer().getCapsocoins() >= cost) {
                                                await account.incDeckSize(5)
                                                message.channel.send("Your deck can now hold " + account.getDeckSize() + " cards")
                                            } else {
                                                message.channel.send("You dont have enough CAPSO Coins")
                                            }
                                            await saveAccount(account);
                                            await upgradeDeck();
                                            resolve()                 
                                        } else if (userResponse == 2) {
                                            await wagonUpgrade()
                                            resolve();
                                        } else {
                                            message.channel.send('Your response could not be interpreted');
                                            await upgrade()
                                            resolve();
                                        }
                                    })
                            })
                }

                async function upgradeBoost() {
                    return new Promise(async(resolve, reject) =>{
                        cost = account.getBoostLvl() * 25
                        stringStr= "Increase number of boosts per battle by 1 for " + cost + " CAPSO Coins?\n"
                        + "(1) Yes\n"
                        + "(2) No\n"
                        let choosemessage = await message.channel.send(stringStr);
                            let filter = m => m.author.id === m.author.id  && !m.author.bot;
                            let Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                    Collector.on("collect", async response => {
                                        if (response.author.id === client.user.id) return
                                        console.log(`Collected: ${response.content}`);    
                                        userResponse = response.content;
                                        Collector.stop()

                                        if (userResponse == 1) {
                                            if (account.getPlayer().getCapsocoins() >= cost) {
                                                await account.incBoostLvl(1)
                                                message.channel.send("You now get " + account.getBoostLvl() + " boosts per battle");
                                            } else {
                                                message.channel.send("You dont have enough CAPSO Coins")
                                            }
                                            await saveAccount(account);
                                            await upgradeBoost();
                                            resolve()                 
                                        } else if (userResponse == 2) {
                                            await wagonUpgrade()
                                            resolve();
                                        } else {
                                            message.channel.send('Your response could not be interpreted');
                                            await upgrade()
                                            resolve();
                                        }
                                    })
                            })
                }

                async function chooseCard(){
                    return new Promise(async (resolve, reject) => {
                        if (account.getCards().length == 0 && account.getDeck().length == 0) {
                            message.channel.send("You dont have any cards");
                            resolve();
                        }

                        num = 1;
                        sendString = "Choose a card to upgrade\nDeck:\n"
                        //message.channel.send("Deck:")
                        for (i = 0; i < account.getDeck().length; i++) {
                            currentCard = account.getDeck()[i]
                            //message.channel.send("(" + num + ") " + currentCard.getName() + " - Lvl " + currentCard.getLevel() + " - " + currentCard.getDescription())
                            sendString += "(" + num + ") " + currentCard.getName() + " `(Lvl  " + currentCard.getLevel() + ")` - " + currentCard.getDescription() + "\n"
                            num++;
                            if (sendString.length >= 1500) {
                                message.channel.send(sendString);
                                sendString = "";
                            }
                        }
                        sendString += "\nCollection:\n"
                        //message.channel.send("Collection:")
                        for (i = 0; i < account.getCards().length; i++) {
                            currentCard = account.getCards()[i]
                            //message.channel.send("(" + num + ") " + currentCard.getName() + " - Lvl " + currentCard.getLevel() + " - " + currentCard.getDescription())
                            sendString += "(" + num + ") " + currentCard.getName() + " `(Lvl " + currentCard.getLevel() + ")` - " + currentCard.getDescription() + "\n"
                            num++
                            if (sendString.length >= 1500) {
                                message.channel.send(sendString);
                                sendString = "";
                            }
                        }
                        
                        sendString += "\nPress 0 to go back"
                        let choosemessage = await message.channel.send(sendString);
                        let filter = m => m.author.id === m.author.id  && !m.author.bot;
                        let Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                Collector.on("collect", async response => {
                                    if (response.author.id === client.user.id) return
                                    console.log(`Collected: ${response.content}`);    
                                    userResponse = response.content;
                                    Collector.stop()
                                    
                                    
                                    if (userResponse > 0 && userResponse <= num) {
                                        if (userResponse <= account.getDeck().length) {
                                            selectedCard = account.getDeck()[userResponse - 1]
                                            
                                        } else {
                                            userResponse -= account.getDeck().length;
                                            selectedCard = account.getCards()[userResponse - 1]
                                        } 
                                        await upgradeCard(account, selectedCard);
                                        await saveAccount(account);
                                        await chooseCard();
                                        resolve();
                                    } else if (userResponse == 0) {
                                        await upgrade()
                                        resolve()
                                    } else {
                                        message.channel.send("Your response could not be interpreted")
                                        await cards();
                                        resolve();
                                    } 

                                })



                        // let addToDeck = []
                        // for (i = 0; i< account.getDeck().length; i++) {
                        //     newLabel = {label: account.getDeck()[i].getName(), description: account.getDeck()[i].getDescription(), value: String(i)}
                        //     addToDeck.push(newLabel)
                        // }
                        // for(i = 0; i < account.getCards().length; i++) {
                        //     newLabel = {label: account.getCards()[i].getName(), description: account.getCards()[i].getDescription(), value: String(i + account.getDeck().length)}
                        //     addToDeck.push(newLabel)
                        // }
                        // const row = new MessageActionRow()
                        // .addComponents(
                        //     new MessageSelectMenu()
                        //         .setCustomId('upgrade-card-chooser')
                        //         .setPlaceholder('Select a card to upgrade...')
                        //         .addOptions(addToDeck)
                        // );
    
                        // let sentMessage = await message.channel.send({ components: [row] });
    
                        // filter = interaction => interaction.customId === 'upgrade-card-chooser' && interaction.user.id === message.author.id;

                        // collector = sentMessage.createMessageComponentCollector({ filter, max: 1, time: 60000 });

                        // collector.on('collect', async interaction => {
                        //     await interaction.deferUpdate();
                        //     const selectedValue = parseInt(interaction.values[0]);

                        //     let selectedCard = null;
                        //     if (selectedValue < account.getDeck().length) {
                        //         selectedCard = account.getDeck()[selectedValue];
                        //     } else {
                        //         selectedCard = account.getCards()[selectedValue - account.getDeck().length];
                        //     }

                        //     console.log('Selected card:', selectedCard);
                            
                        //     await upgradeCard(account, selectedCard);
                        //     await saveAccount(account);
                        //     await upgrade();
                        //     resolve();
                        // });

                        // collector.on('end', collected => {
                        //     if (!collected.size) {
                        //         resolve(null);
                        //     }
                        // });
                    })
                }

                async function editTeam() {
                    return new Promise(async(resolve, reject) => {
                        await saveAccount(account);
                        stringStr = "" //deck info
                        +"(1) Edit characters\n"
                        +"(2) Edit Deck\n"
                        +"(3) Back"
                        let choosemessage = await message.channel.send(stringStr);
                        let filter = m => m.author.id === m.author.id  && !m.author.bot;
                        let Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                Collector.on("collect", async response => {
                                    if (response.author.id === client.user.id) return
                                    console.log(`Collected: ${response.content}`);    
                                    userResponse = response.content;
                                    Collector.stop()

                                    if (userResponse == 1) {
                                        await editCharacters();
                                        resolve();                
                                    } else if (userResponse == 2) {
                                        await editDeck();
                                        resolve();
                                    } else if (userResponse == 3 || userResponse == 0) {
                                        await firstMenu();
                                        resolve();
                                    }else {
                                        message.channel.send('Your response could not be interpreted');
                                        await editTeam()
                                        resolve();
                                    }

                                })

                    })
                }

                async function editCharacters() {
                    return new Promise(async(resolve, reject) => {
                    let characterList = []
                    teamCharacters = account.getTeam().map(character => character.getName());
                    if (account.getCharacters().length > 0) {
                        for(i = 0; i < account.getCharacters().length; i++) {
                            characterName = account.getCharacters()[i].getName();

                            inTeam = false;
                            if (teamCharacters.includes(characterName)){
                                inTeam = true;
                            }

                            newLabel = {label: account.getCharacters()[i].getName(), description: account.getCharacters()[i].getDescription(), value: String(i), default: inTeam}
                            characterList.push(newLabel)
                        }
                        maxValues = characterList.length;
                        if (maxValues > 4) {
                            maxValues = 4;
                        }

                        const row = new MessageActionRow()
                            .addComponents(
                                new MessageSelectMenu()
                                    .setCustomId('add-to-team')
                                    .setPlaceholder('Select characters to add...')
                                    .setMinValues(1)
                                    .setMaxValues(maxValues)
                                    .addOptions(characterList)
                        );

                        const sentMessage = await message.channel.send({ components: [row] });

                        accountMap.set(sentMessage.id, account);
                    } else {
                        message.channel.send("You have no characters")
                    }
                    await saveAccount(account);
                    await editTeam();
                    resolve();    
                })
                }

                async function editDeck() {
                    return new Promise(async (resolve, reject) => {
                        stringStr = "" //deck info
                        +"(1) Add Cards\n"
                        +"(2) Remove Cards\n"
                        +"(3) Back\n"
                        +"(4) Back Back"
                        let choosemessage = await message.channel.send(stringStr);
                        let filter = m => m.author.id === m.author.id  && !m.author.bot;
                        let Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                Collector.on("collect", async response => {
                                    if (response.author.id === client.user.id) return
                                    console.log(`Collected: ${response.content}`);    
                                    userResponse = response.content;
                                    Collector.stop()

                                    if (userResponse == 1) {
                                        await addToDeck() 
                                        resolve()             
                                    } else if (userResponse == 2) {
                                        await removeFromDeck();
                                        resolve()  
                                    } else if (userResponse == 3) {
                                        await editTeam();
                                        resolve()
                                    }else if (userResponse == 4){
                                        await firstMenu();
                                        resolve()
                                    }else {
                                        message.channel.send('Your response could not be interpreted');
                                        await editDeck()
                                        resolve();
                                    }

                                })
                    })
                }

                async function addToDeck() {
                    return new Promise(async(resolve, reject) => {
                    if (account.getCards().length == 0) {
                            message.channel.send("You dont have any cards");
                            await editDeck()
                            resolve()
                            return;
                        }
                    sendStr = "Select a card to add to your deck:\n";
                    counter = 1;
                    for (i = 0; i < account.getCards().length; i++) {
                        sendStr += "(" + counter + ") " + account.getCards()[i].getName() + " `Level " + account.getCards()[i].getLevel() + "`\n";
                        if (sendStr.length >= 1500) {
                            message.channel.send(sendStr);
                            sendStr = "";
                        }
                        counter++;
                    }
                    sendStr += "You can add " + (account.getDeckSize() - account.getDeck().length) + " more cards\nPress 0 to go back"
                    let choosemessage = await message.channel.send(sendStr);
                    let filter = m => m.author.id === m.author.id  && !m.author.bot;
                    let Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                            Collector.on("collect", async response => {
                                if (response.author.id === client.user.id) return
                                console.log(`Collected: ${response.content}`);    
                                userResponse = response.content;
                                Collector.stop()

                                if (userResponse >= 1 && userResponse <= account.getCards().length) {
                                    j = userResponse - 1;
                                    if (account.getDeck().length >= account.getDeckSize()) {
                                        message.channel.send("You dont have enough space. You can only hold " + account.getDeckSize() + " cards in you deck.")
                                        await editTeam()
                                    } else {
                                        account.getDeck().push(account.getCards()[j]);
                                        account.getCards().splice(j, 1);
                                        await saveAccount(account)
                                        await addToDeck()
                                    }
                                    resolve();
                                } else if (userResponse == 0) {
                                    await editTeam()
                                    resolve()
                                } else {
                                    message.channel.send("Your response cannot be interpreted")
                                    await addToDeck();
                                    resolve()
                                }

                            })
                    })
                    // let addToDeck = []
                    // if (account.getCards().length == 0) {
                    //     message.channel.send("You dont have any cards");
                    //     return;
                    // }
                    // for(i = 0; i < account.getCards().length; i++) {
                    //     newLabel = {label: account.getCards()[i].getName(), description: account.getCards()[i].getDescription(), value: String(i)}
                    //     addToDeck.push(newLabel)
                    // }
                    // const row = new MessageActionRow()
                    // .addComponents(
                    //     new MessageSelectMenu()
                    //         .setCustomId('add-to-deck')
                    //         .setPlaceholder('Select cards to add...')
                    //         .setMinValues(1)
                    //         .setMaxValues(addToDeck.length)
                    //         .addOptions(addToDeck)
                    // );

                    // const sentMessage = await message.channel.send({ components: [row] });

                    // accountMap.set(sentMessage.id, account);
                }

                async function removeFromDeck() {
                    return new Promise(async(resolve, reject )=> {
                    if (account.getDeck().length == 0) {
                        message.channel.send("You dont have any cards");
                        await editDeck();
                        resolve()
                        return;
                    }
                    sendStr = "Select a card to remove from your deck:\n";
                    counter = 1;
                    for (i = 0; i < account.getDeck().length; i++) {
                        sendStr += "(" + counter + ") " + account.getDeck()[i].getName() + " `Level " + account.getDeck()[i].getLevel() + "`\n";
                        if (sendStr.length >= 1500) {
                            message.channel.send(sendStr);
                            sendStr = "";
                        }
                        counter++;
                    }
                    sendStr += "Press 0 to go back"
                    let choosemessage = await message.channel.send(sendStr);
                    let filter = m => m.author.id === m.author.id  && !m.author.bot;
                    let Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                            Collector.on("collect", async response => {
                                if (response.author.id === client.user.id) return
                                console.log(`Collected: ${response.content}`);    
                                userResponse = response.content;
                                Collector.stop()

                                if (userResponse >= 1 && userResponse <= account.getDeck().length) {
                                    j = userResponse - 1;
                                    account.getCards().push(account.getDeck()[j]);
                                    account.getDeck().splice(j, 1);
                                    await removeFromDeck()
                                    resolve();
                                } else if (userResponse == 0) {
                                    await editTeam()
                                    resolve()
                                } else {
                                    message.channel.send("Your response cannot be interpreted")
                                    await removeFromDeck();
                                    resolve()
                                }

                            })
                    })
                    // let removeFromDeck = []
                    // if (account.getDeck().length == 0) {
                    //     message.channel.send("You dont have any cards");
                    //     return;
                    // }
                    // for(i = 0; i < account.getDeck().length; i++) {
                    //     newLabel = {label: account.getDeck()[i].getName(), description: account.getDeck()[i].getDescription(), value: String(i)}
                    //     removeFromDeck.push(newLabel)
                    // }
                    // const row = new MessageActionRow()
                    // .addComponents(
                    //     new MessageSelectMenu()
                    //         .setCustomId('remove-from-deck')
                    //         .setPlaceholder('Select cards to remove...')
                    //         .setMinValues(1)
                    //         .setMaxValues(removeFromDeck.length)
                    //         .addOptions(removeFromDeck)
                    // );

                    // const sentMessage = await message.channel.send({ components: [row] });

                    // accountMap.set(sentMessage.id, account);
                }

                async function chooseCharacter(){
                    return new Promise(async(resolve, reject) => {
                        sendString = "Choose a character to upgrade:\n"
                        num = 1;
                        for (i = 0; i < account.getCharacters().length; i++) {
                         currChar = account.getCharacters()[i]
                         sendString += "(" + num + ") " + currChar.getName() + " - " + currChar.getDescription() + "\n"
                         num++
                         
                        } 
                        sendString += "Press 0 to go back\n"
                        await saveAccount(account);
                        let choosemessage = await message.channel.send(sendString);
                        let filter = m => m.author.id === m.author.id  && !m.author.bot;
                        let Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                Collector.on("collect", async response => {
                                    if (response.author.id === client.user.id) return
                                    console.log(`Collected: ${response.content}`);    
                                    userResponse = response.content;
                                    Collector.stop()

                                    if (userResponse >= 1 && userResponse <= account.getCharacters().length) {
                                        j = userResponse - 1;
                                        await upgradeCharacter(account.getCharacters()[j])
                                        await chooseCharacter()
                                        resolve()
                                    } else if (userResponse == 0) {
                                        await upgrade()
                                        resolve()
                                    } else {
                                        message.channel.send("Your response cannot be interpreted")
                                        await chooseCharacter()
                                        resolve()
                                    }

                                })
                    })
                    
                    //old code that dosent work idk why
                    // let chooseCharacter = []
                    // accountCharacters = account.getCharacters();
                    // for (i = 0; i < accountCharacters.length; i++) {
                    //     newLabel = {label: accountCharacters[i].getName(), description: "Atk: Lvl " + accountCharacters[i].getAtklvl() + ", HP: Lvl " + accountCharacters[i].getHplvl() + ", Ability: Lvl " + accountCharacters[i].getAbilitylvl()}
                    //     chooseCharacter.push(newLabel);
                    // }

                    // const row = new MessageActionRow()
                    // .addComponents(
                    //     new MessageSelectMenu()
                    //         .setCustomId('character-upgrade-chooser')
                    //         .setPlaceholder('Choose a character to upgrade...')
                    //         .addOptions(chooseCharacter) //this is the thing with the labels
                    // );
                                                
                    // let sentMessage = await message.channel.send({ components: [row] });
                                
                    // filter = interaction => interaction.customId === 'character-upgrade-chooser' && interaction.user.id === message.author.id;
                            
                    // collector = sentMessage.createMessageComponentCollector({ filter, max: 1, time: 60000 });
        
                    // collector.on('collect', async interaction => {
                    //     await interaction.deferUpdate();
                    //     const selectedValue = parseInt(interaction.values[0]);
                    //     await upgradeCharacter(account.getCharacters()[selectedValue])
                    //     await saveAccount(account);
                    //     await upgrade();
                    //     resolve();      
                    // });
                            
                    // collector.on('end', collected => {
                    // if (!collected.size) {
                    //     resolve(null);
                    // }
                    // });
                }

                async function cards() {
                    return new Promise(async(resolve, reject) => {
                        num = 1;
                        sendString = "Deck:\n"
                        //message.channel.send("Deck:")
                        for (i = 0; i < account.getDeck().length; i++) {
                            currentCard = account.getDeck()[i]
                            //message.channel.send("(" + num + ") " + currentCard.getName() + " - Lvl " + currentCard.getLevel() + " - " + currentCard.getDescription())
                            sendString += "(" + num + ") " + currentCard.getName() + " `(Lvl  " + currentCard.getLevel() + ")` - " + currentCard.getDescription() + "\n"
                            num++;
                            if (sendString.length >= 1500) {
                                message.channel.send(sendString);
                                sendString = "";
                            }
                        }
                        sendString += "\nCollection:\n"
                        //message.channel.send("Collection:")
                        for (i = 0; i < account.getCards().length; i++) {
                            currentCard = account.getCards()[i]
                            //message.channel.send("(" + num + ") " + currentCard.getName() + " - Lvl " + currentCard.getLevel() + " - " + currentCard.getDescription())
                            sendString += "(" + num + ") " + currentCard.getName() + " `(Lvl " + currentCard.getLevel() + ")` - " + currentCard.getDescription() + "\n"
                            num++
                            if (sendString.length >= 1500) {
                                message.channel.send(sendString);
                                sendString = "";
                            }
                        }
                        
                        message.channel.send(sendString + "\nPress 0 to go back")
                        let choosemessage = await message.channel.send("Which card do you want to view?");
                        let filter = m => m.author.id === m.author.id  && !m.author.bot;
                        let Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                Collector.on("collect", async response => {
                                    if (response.author.id === client.user.id) return
                                    console.log(`Collected: ${response.content}`);    
                                    userResponse = response.content;
                                    Collector.stop()
                                    
                                    
                                    if (userResponse > 0 && userResponse <= num) {
                                        if (userResponse <= account.getDeck().length) {
                                            await viewCard(account.getDeck()[userResponse - 1], [true, userResponse - 1])
                                        } else {
                                            userResponse -= account.getDeck().length;
                                            await viewCard(account.getCards()[userResponse - 1], [false, userResponse - 1]);
                                        }        
                                        resolve();
                                    } else if (userResponse == 0) {
                                        await firstMenu()
                                        resolve()
                                    } else {
                                        message.channel.send("Your response could not be interpreted")
                                        await cards();
                                        resolve();
                                    } 

                                })
                    })
                }
                /**
                 * 
                 * @param {*} card the card
                 * @param {*} inDeck true if its in your deck, false is in your collection. inDeck[1] is the index in that specific list
                 * @returns 
                 */
                async function viewCard(card, inDeck) {
                    return new Promise(async (resolve, reject) => {
                        sendString = card.getName() + ":\n"
                        + "Level " + card.getLevel() + "\n"
                        + card.getDescription() + "\n\n";

                        if (inDeck[0]) {
                            sendString += "(1) Remove from deck - "  + (account.getDeckSize() - account.getDeck().length) + " slots left\n"
                        } else {
                            sendString += "(1) Add to deck - "  + (account.getDeckSize() - account.getDeck().length) + " slots left\n"
                        }
                        
                        sendString += "(2) Rename\n"
                        +"(3) Rename Description\n"
                        +"(4) Upgrade\n"
                        +"(5) Salvage\n"
                        +"(6) Back\n"
                        let choosemessage = await message.channel.send(sendString);
                        let filter = m => m.author.id === m.author.id  && !m.author.bot;
                        let Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                Collector.on("collect", async response => {
                                    if (response.author.id === client.user.id) return
                                    console.log(`Collected: ${response.content}`);    
                                    userResponse = response.content;
                                    Collector.stop()

                                    let newInDeck;
                                    if (userResponse == 1) {
                                        if (inDeck[0]){
                                            account.getCards().push(card);
                                            account.getDeck().splice(inDeck[1], 1);
                                            newInDeck = [false, account.getCards().length - 1];
                                            
                                        } else {
                                            if (account.getDeckSize() >= account.getDeck().length) {
                                                message.channel.send("Your deck is full!")
                                            } else {
                                                account.getDeck().push(card);
                                                account.getCards().splice(inDeck[1], 1);
                                                newInDeck = [true, account.getDeck().length - 1]
                                            }
                                        }
                                        await viewCard(card, newInDeck);
                                        resolve();
                                    } else if (userResponse == 2) {
                                        await renameCard(card);
                                        await saveAccount(account);
                                        await viewCard(card, inDeck)
                                        resolve()
                                    } else if (userResponse == 3) {
                                        await renameCardDescription(card);
                                        await saveAccount(account);
                                        await viewCard(card, inDeck)
                                        resolve()
                                    } else if (userResponse == 4) {
                                        await upgradeCard(account, card)
                                        await saveAccount(account);
                                        await viewCard(card, inDeck);
                                        resolve();
                                    } else if (userResponse == 5) {
                                        salvageCost = await calculateSalvage(card);
                                        let choosemessage = await message.channel.send("Salvage this card for " + salvageCost + " MMessence?\n(1) yes\n(2) no");
                                        let filter = m => m.author.id === m.author.id  && !m.author.bot;
                                        let Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                                Collector.on("collect", async response => {
                                                    if (response.author.id === client.user.id) return
                                                    console.log(`Collected: ${response.content}`);    
                                                    userResponse = response.content;
                                                    Collector.stop()

                                                    if (userResponse == 1) {
                                                        account.incEssence(salvageCost);
                                                        if(inDeck[0]) {
                                                            account.getDeck().splice(inDeck[1], 1)
                                                        } else {
                                                            account.getCards().splice(inDeck[1], 1)
                                                        }
                                                        await saveAccount(account);
                                                        await cards()                  
                                                        resolve();
                                                    } else {
                                                        message.channel.send("Cancelled")
                                                        await viewCard(card, inDeck)
                                                        resolve();
                                                    }   

                                                })
                                    } else if (userResponse == 6 || userResponse == 0) {
                                        await cards();
                                        resolve()
                                    } else {
                                        message.channel.send("Your response could not be interpreted");
                                        await viewCard(card, inDeck);
                                        resolve();
                                    }


                                })
                    })
                }

                async function renameCardDescription(card) {
                    return new Promise(async (resolve, reject) => {
                        try{
                            let MAX_CHARS = 200
                            let choosemessage = await message.channel.send("Enter a new description for " + card.getName());
                            let filter = m => m.author.id === m.author.id  && !m.author.bot;
                            let Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                    Collector.on("collect", async response => {
                                        if (response.author.id === client.user.id) return
                                        console.log(`Collected: ${response.content}`);    
                                        userResponse = response.content;
                                        Collector.stop()

                                        if(userResponse.length > MAX_CHARS) {
                                            message.channel.send("Card name and description cannot exceed " + MAX_CHARS + " characters")
                                            resolve();
                                        }
                                        let choosemessage2 = await message.channel.send("Are you sure you want to rename " + card.getDescription() + " to " + userResponse + "\n(1) Yes\n(2) No");
                                        let filter = m => m.author.id === m.author.id  && !m.author.bot;
                                        let Collector2 = choosemessage2.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                                Collector2.on("collect", async response => {
                                                    if (response.author.id === client.user.id) return
                                                    console.log(`Collected: ${response.content}`);    
                                                    userResponse2 = response.content;
                                                    Collector2.stop()
                                                    if (userResponse2 == 1){
                                                        totalLength = userResponse.length + card.getName().length;
                                                        if (totalLength <= MAX_CHARS) {
                                                            card.setDescription(userResponse);
                                                            message.channel.send("Card description has been renamed successfully")
                                                        } else {
                                                            message.channel.send("Your card name and description cannot exceed "+ MAX_CHARS + " characters")
                                                        }
                                                        resolve()
                                                    } else {
                                                        message.channel.send("cancelled")
                                                        resolve()
                                                    }
                    
                                                })                                
    
                                    })
                        } catch {
                            message.channel.send("there was an error")
                            resolve();
                        }
                    })
                }

                async function characters() {
                    return new Promise(async(resolve, reject) => {
                       sendString = "Your Characters:\n"
                       num = 1;
                       for (i = 0; i < account.getCharacters().length; i++) {
                        currChar = account.getCharacters()[i]
                        sendString += "(" + num + ") " + currChar.getName() + " - " + currChar.getDescription() + "\n"
                        num++
                        
                       } 
                       sendString += "\nPress 0 to go back";
                       //console.log("sendString" + sendString)
                        message.channel.send(sendString);

                        let choosemessage = await message.channel.send("Which character do you want to view?");
                        let filter = m => m.author.id === m.author.id  && !m.author.bot;
                        let Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                Collector.on("collect", async response => {
                                    if (response.author.id === client.user.id) return
                                    console.log(`Collected: ${response.content}`);    
                                    userResponse = response.content;
                                    Collector.stop()

                                    if (userResponse > 0 && userResponse <= account.getCharacters().length){
                                        await viewCharacter(account.getCharacters()[userResponse - 1])
                                        resolve();
                                    } else if (userResponse == 0) {
                                        await firstMenu();
                                        resolve();
                                    } else {
                                        message.channel.send("Your response cannot be interpreted")
                                        await characters()
                                        resolve()
                                    }

                                })
                    })
                }

                async function viewCharacter(char) {
                    return new Promise(async (resolve, reject) => {
                    var inTeam = false
                    sendString = char.getName() + "\n"
                    + "Attack: " + char.getAtk() + "`(level " + char.getAtklvl() + ")`\n"
                    + "Health: " + char.getHp() + "`(level " + char.getHplvl() + ")`\n"
                    + "Ability: " + char.getAbilityDescription() + "`(level " + char.getAbilitylvl() + ")`\n\n";
                    if (account.getTeam().includes(char)){
                        sendString += "(1) Remove from team\n"
                        inTeam = true
                    } else {
                        sendString += "(1) Add to team\n"
                    }
                    sendString += "(2) upgrade\n"
                    +"(3) Back"
                    let choosemessage = await message.channel.send(sendString);
                    let filter = m => m.author.id === m.author.id  && !m.author.bot;
                    let Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                            Collector.on("collect", async response => {
                                if (response.author.id === client.user.id) return
                                console.log(`Collected: ${response.content}`);    
                                userResponse = response.content;
                                Collector.stop()

                                if (userResponse == 1) {
                                    if (inTeam){
                                        let index = account.getTeam().indexOf(char);

                                        if (index !== -1) {
                                            // Remove the object at that index
                                            account.getTeam().splice(index, 1);
                                        } else {
                                            message.channel.send('There was an error removing the character from your team')
                                            console.log('There was an error removing the character from your team')
                                        }
                                    } else {
                                        if (account.getTeam().length > 4) {
                                            message.channel.send("Your team is full")
                                        } else {
                                            account.getTeam().push(char);
                                        }
                                    }
                                    resolve();
                                } else if (userResponse == 2) {
                                    await upgradeCharacter(char);
                                    await saveAccount(account);
                                    await viewCharacter(char);
                                    resolve();
                                } else if (userResponse == 0 || userResponse == 3) {
                                    await characters()
                                    resolve();
                                } else {
                                    message.channel.send("Your response could not be interpreted");
                                    await viewCharacter(char);
                                    resolve();
                                }

                            })

                        })
                }

                async function upgradeCharacter(character) {
                    return new Promise(async(resolve, reject) => {
                        var abilityDescriptionIndex;
                        switch(character.getName()) {
                            case "PAFF":
                                abilityDescriptionIndex = 0;
                                break;
                            case "NEKO#ΦωΦ":
                                abilityDescriptionIndex = 1;
                                break;
                            case "ROBO_Head":
                                abilityDescriptionIndex = 2;
                                break;
                            case "Ivy":
                                abilityDescriptionIndex = 3;
                                break;
                            case "Xenon":
                                abilityDescriptionIndex = 4;
                                break;
                            case "ConneR":
                                abilityDescriptionIndex = 5;
                                break;
                            case "Cherry":
                                abilityDescriptionIndex = 6;
                                break;
                            case "JOE":
                                abilityDescriptionIndex = 7;
                                break;
                            case "Sagar":
                                abilityDescriptionIndex = 8;
                                break;
                            case "Rin":
                                abilityDescriptionIndex = 9;
                                break;
                        }
                        let activeDescription = abilityDescriptions[abilityDescriptionIndex];
                        cost = await calculateUpgradeCost()
                        atkCost = cost[0];
                        hpCost = cost[1];
                        let sendStr = character.getName() + ":\n"
                        + "Choose Upgrade\n"
                        if (character.getAtklvl() < 10) {
                            sendStr += "(1) Atack Lvl " + character.getAtklvl() + "->" + (character.getAtklvl() + 1) + ": " + character.getAtk() + "->" + Math.floor(character.getAtk() + character.atkIncrease)  +  " `(" + cost[0] + " CAPSO Coins)`\n"
                        } else {
                            sendStr += "(1) Atack Lvl " + (character.getAtklvl()) + ": MAXED\n"
                        }
                        if (character.getHplvl() < 10) {
                            sendStr += "(2) Health Lvl " + character.getHplvl() + "->" + (character.getHplvl() + 1) + ": " + character.getHp() + "->" + Math.floor(character.getHp() + character.hpIncrease)  +  " `(" + cost[1] +" CAPSO Coins)`\n"
                        } else {
                            sendStr += "(2) Health Lvl " + (character.getHplvl()) + ": MAXED\n"
                        }
                        if (character.getAbilitylvl() < 10) {
                            sendStr += "(3) Ability Lvl " + character.getAbilitylvl() + "->" + (character.getAbilitylvl() + 1) + " `(" + cost[2] + " CAPSO Coins, " + cost[3] + " MMessence)`\n"

                            
                        } else {
                            sendStr += "(3) Ability Lvl " + (character.getAbilitylvl()) + ": MAXED\n"
                        }
                        let hiCounter = 1;
                            sendStr += "Ability upgrades:\n~~`";
                            for (i = 0; i < activeDescription.length; i++) {
                                if ((character.getAbilitylvl() + 1) == hiCounter) {
                                    sendStr += "`~~`"
                                }
                                sendStr += "Lvl " + hiCounter + ": " + activeDescription[i] + "\n"
                                hiCounter++;
                            }
                            sendStr += "`"
                        sendStr += "You have " + account.getPlayer().getCapsocoins() + " CAPSO Coins, " + account.getEssence() + " MMessence\n"
                        + "Press 0 to go back"
    
                        let choosemessage = await message.channel.send(sendStr);
                        let filter = m => m.author.id === m.author.id  && !m.author.bot;
                        let Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                Collector.on("collect", async response => {
                                    if (response.author.id === client.user.id) return
                                    console.log(`Collected: ${response.content}`);    
                                    userResponse = response.content;
                                    Collector.stop()
    
                                    if (userResponse == 1) {
                                        if (character.getAtklvl() < 10) {
                                            if (account.getPlayer().getCapsocoins() >= atkCost) {
                                                character.upgradeAtk();
                                                account.getPlayer().modifyCoins(-atkCost);
                                                message.channel.send("You have upgraded " + character.getName() + "'s attack")
                                            } else {
                                                message.channel.send("You can't afford that")
                                            }
                                            await upgradeCharacter(character);
                                            resolve();
                                        } else {
                                            message.channel.send("This character's attack is maxed")
                                            await upgradeCharacter(character);
                                            resolve();
                                        }
                                    } else if (userResponse == 2) {
                                        if (character.getHplvl() < 10) {
                                            if (account.getPlayer().getCapsocoins() >= hpCost) {
                                                character.upgradeHp();
                                                account.getPlayer().modifyCoins(-hpCost);
                                                message.channel.send("You have upgraded " + character.getName() + "'s HP")
                                            } else {
                                                message.channel.send("You can't afford that")
                                            }
                                            await upgradeCharacter(character);
                                            resolve();
                                        } else {
                                            message.channel.send("This character's HP is maxed")
                                            await upgradeCharacter(character);
                                            resolve();
                                        }
                                    } else if (userResponse == 3) {
                                        if (character.getAbilitylvl() < 10){
                                            if (account.getPlayer().getCapsocoins() >= cost[2] && account.getEssence() >= cost[3]) {
                                                character.upgradeAbility();
                                                account.getPlayer().modifyCoins(-cost[2]);
                                                account.incEssence(-cost[3]);
                                                //message.channel.send("You have upgraded " + character.getName() + "'s ability to level **" + character.getAbilitylvl() + "**")
                                            } else {
                                                message.channel.send("You can't afford that")
                                            }
                                            await upgradeCharacter(character);
                                            resolve();
                                        } else {
                                            message.channel.send("This character's ability is maxed")
                                            await upgradeCharacter(character);
                                            resolve();
                                        }
                                    } else if (userResponse == 0) {
                                        resolve();
                                    } else {
                                        message.channel.send("Your response cannot be interpreted")
                                        await upgradeCharacter(character)
                                        resolve();
                                    }
    
                                })
    
                        
                    })

                    async function calculateUpgradeCost() {
                        return new Promise(async(resolve, reject) => {
                            atkCost = await calculateCostHelper(character.getAtklvl());
                            hpCost = await calculateCostHelper(character.getHplvl());
                            abilityCost = await calculateCostHelper(character.getAbilitylvl());
                            abilityCost2 = abilityCost * 2;
                            resolve([atkCost, hpCost, abilityCost, abilityCost2])
                        })

                        async function calculateCostHelper(level) {
                            return new Promise(async(resolve, reject) => {
                                switch(level) {
                                    case 1:
                                        resolve(10)
                                    case 2:
                                        resolve(20)
                                    case 3:
                                        resolve(30)
                                    case 4:
                                        resolve(40)
                                    case 5:
                                        resolve(50)
                                    case 6:
                                        resolve(60)
                                    case 7:
                                        resolve(75)
                                    case 8:
                                        resolve(85)
                                    case 9:
                                        resolve(100)
                                    case 10:
                                        resolve(0)
                                }
                            })
                        }
                    }
                }

                async function upgradeShop() {
                    return new Promise(async(resolve, reject) =>{
                        if (account.getShopLvl() >= 4) {
                            message.channel.send("You have bought all memberships")
                            await displayShop()
                            resolve()
                            return;
                        }
                        cost = 20;
                        membershipName = ""
                        if (account.getShopLvl() == 1) {
                            membershipName = "gold"
                            cost = 20;
                        } else if (account.getShopLvl() == 2) {
                            membershipName = "diamond"
                            cost = 50;
                        }else if (account.getShopLvl() == 3) {
                            membershipName = "platnium"
                            cost = 70;
                        }
                        stringStr= "Buy " + membershipName + " membership for " + cost + " CAPSO Coins?\n"
                        + "(1) Yes\n"
                        + "(2) No\n"
                        let choosemessage = await message.channel.send(stringStr);
                            let filter = m => m.author.id === m.author.id  && !m.author.bot;
                            let Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                    Collector.on("collect", async response => {
                                        if (response.author.id === client.user.id) return
                                        console.log(`Collected: ${response.content}`);    
                                        userResponse = response.content;
                                        Collector.stop()

                                        if (userResponse == 1) {
                                            if (account.getPlayer().getCapsocoins() >= cost) {
                                                await account.incShopLvl(1)
                                                account.getPlayer().modifyCoins(-cost)
                                                message.channel.send("You bought a " + membershipName + " membership. A new slot has been unlocked")
                                            } else {
                                                message.channel.send("You dont have enough CAPSO Coins")
                                            }
                                            await upgradeShop();
                                            await saveAccount(account)
                                            resolve()                 
                                        } else if (userResponse == 2) {
                                            await displayShop()
                                            resolve();
                                        } else {
                                            message.channel.send('Your response could not be interpreted');
                                            await upgradeShop()
                                            resolve();
                                        }
                                    })
                            })
                }

                async function displayShop(){
                    await firstShopMenu()

                    async function firstShopMenu() {
                        return new Promise(async (resolve, reject) => {
                            await saveAccount(account);
                            await saveShop(dungeonShop);
                            shopStock = dungeonShop.getStock();
                            choiceMessage = "`Daily Deals`\n`_____________`\n"
                            counter = 1
                            for (i = 0; i < 6; i++) {
                                if (shopStock[i].getPurchased().includes(account.getId())){
                                    choiceMessage += "`(" + counter + ") SOLD OUT`\n"; 
                                } else if (i == 3 && account.getShopLvl() < 2){ 
                                    choiceMessage += "`(" + counter + ") LOCKED (Gold Membership required)`\n"; 
                                } else if (i == 4 && account.getShopLvl() < 3){ 
                                    choiceMessage += "`(" + counter + ") LOCKED (Diamond Membership required)`\n";
                                } else if (i == 5 && account.getShopLvl() < 4){  
                                    choiceMessage += "`(" + counter + ") LOCKED (Platnium Membership required)`\n"; 
                                } else {
                                    choiceMessage += "`(" + counter + ") " + shopStock[i].getItem().getName() + " (Lvl " + shopStock[i].getItem().getLevel() + ") / " + shopStock[i].getCost()[0] + " CAPSO Coins`\n"
                                }
                                counter++;
                            }
                            choiceMessage += "`(7) More...`\n"
                            + "`(8) Buy Membership`\n"
                            + "`(9) Buy Characters`\n"
                            +"You have " + account.getCapsocoins() + " CAPSO Coins\nPress 0 to go back"
                            let choosemessage = await message.channel.send(choiceMessage);
                            let filter = m => m.author.id === m.author.id  && !m.author.bot;
                            let Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                    Collector.on("collect", async response => {
                                        if (response.author.id === client.user.id) return
                                        console.log(`Collected: ${response.content}`);    
                                        userResponse = response.content;
                                        Collector.stop()

                                        if (userResponse >= 1 && userResponse <= 6) {
                                            itemIndex = userResponse - 1;
                                            if (account.getCapsocoins() >= shopStock[itemIndex].getCost()[0]) {
                                                await confirmPurchase(shopStock[itemIndex]);
                                            } else {
                                                message.channel.send("You can't afford that");
                                            }
                                            await displayShop() 
                                            resolve();             
                                        } else if (userResponse == 7) {
                                            await displayMore();
                                            resolve();
                                        } else if (userResponse == 0) {
                                            await firstMenu();
                                            resolve();
                                        } else if (userResponse == 8) {
                                            await upgradeShop()
                                            resolve()
                                        } else if (userResponse == 9) {
                                            await buyCharacters()
                                            resolve()
                                        } else {
                                            message.channel.send("Your response cannot be interpreted")
                                            await displayShop();
                                            resolve()
                                        }

                                    })

                            })
                    }
                    
                    async function confirmPurchase(item) {
                        return new Promise(async(resolve, reject) => {
                            sendStr = "Are you sure you want to buy this item?\n"
                            + item.getItem().toString()
                            sendStr = sendStr.slice(0, -1)
                            sendStr += "Level: " + item.getItem().getLevel() + '\n'
                            + "(1) yes - " + item.getCost()[0] + " CAPSO Coins\n"
                            + "(2) no"
                            let choosemessage = await message.channel.send(sendStr);
                            let filter = m => m.author.id === m.author.id  && !m.author.bot;
                            let Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                    Collector.on("collect", async response => {
                                        if (response.author.id === client.user.id) return
                                        console.log(`Collected: ${response.content}`);    
                                        userResponse = response.content;
                                        Collector.stop()
                            
                                        if (userResponse == 1) {
                                            account.getPlayer().modifyCoins(-item.getCost()[0])
                                            account.getCards().push(item.getItem().copy())
                                            item.getPurchased().push(account.getId());
                                            message.channel.send("Purchase successful")
                                            resolve();
                                        }  else {
                                            resolve();
                                        }        
                            
                                    })
                        })
                    }

                    async function displayMore(){
                        return new Promise(async (resolve, reject) => {
                            choiceMessage = "`Stock`\n`_____________`\n"
                            counter = 1
                            for(i = 0; i < shopStock[6].length; i++) {
                                if (shopStock[6][i].getPurchased().includes(account.getId())) {
                                    choiceMessage += "`(" + counter + ") SOLD OUT`\n"
                                } else {
                                    choiceMessage += "`(" + counter + ") " + shopStock[6][i].getItem().getName() + " (Lvl " + shopStock[6][i].getItem().getLevel() + ") / " + shopStock[6][i].getCost() + " CAPSO Coins`\n"
                                }
                                counter++
                            }
                            choiceMessage += "Press 0 to go back\n"
                            let choosemessage = await message.channel.send(choiceMessage);
                            let filter = m => m.author.id === m.author.id  && !m.author.bot;
                            let Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                    Collector.on("collect", async response => {
                                        if (response.author.id === client.user.id) return
                                        console.log(`Collected: ${response.content}`);    
                                        userResponse = response.content;
                                        Collector.stop()

                                        if (userResponse >= 1 && userResponse <= shopStock[6].length) {
                                            await confirmPurchase(shopStock[6][userResponse - 1])
                                            await displayShop()
                                            resolve();
                                        } else if (userResponse == 0) {
                                            await displayShop()
                                            resolve();
                                        } else {
                                            message.channel.send("Your response cannot be interpreted")
                                            await displayMore();
                                            resolve();
                                        }

                                    })
                        })
                    }

                    async function buyCharacters() {
                        return new Promise (async(resolve, reject) => {
                            characterCost = 50;
                            copyList = [...avaliableCharacters]
                            for (i = 0; i < copyList.length; i++) {
                                for (j = 0; j < account.getCharacters().length; j++) {
                                    if (copyList[i] == account.getCharacters()[j].getName()) {
                                        copyList.splice(i, 1)
                                        i--;
                                        break;
                                    }
                                }
                            }

                            if (account.getCharacters().length < 10) {
                                //display copyList[0]
                                sendStr = "The next character is: " + copyList[0] + "\n"
                                c = new Character(copyList[0], 1, 1, 1);
                                sendStr += "Atk: " + c.getAtk() + "\n"
                                + "HP: " + c.getHp() + "\n"
                                + "Ability: " + c.getAbilityDescription() + "\n\n"
                                + "Cost: " + characterCost + " CAPSO Coins\n"
                                + "(1) Buy\n"
                                + "(2) Leave"
                                let choosemessage = await message.channel.send(sendStr);
                                let filter = m => m.author.id === m.author.id  && !m.author.bot;
                                let Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                        Collector.on("collect", async response => {
                                            if (response.author.id === client.user.id) return
                                            console.log(`Collected: ${response.content}`);    
                                            userResponse = response.content;
                                            Collector.stop()

                                            if (userResponse == 1) {
                                                if (account.getPlayer().getCapsocoins() < characterCost) {
                                                    message.channel.send("You can't afford that")
                                                    await firstShopMenu()
                                                    resolve()
                                                } else {
                                                    account.getPlayer().modifyCoins(-characterCost);
                                                    account.getCharacters().push(c);
                                                    message.channel.send("**New Character Unlocked: " + c.getName() + "!**")
                                                    await saveAccount(account);
                                                    await buyCharacters();
                                                    resolve();
                                                }
                                            } else {
                                                await firstShopMenu();
                                                resolve()
                                            } 

                                        })
                            } else {
                                //display everything
                                if (copyList.length == 0) {
                                    message.channel.send("You have every character")
                                    await firstShopMenu()
                                    resolve()
                                    return;
                                }
                                counter = 1;
                                sendStr = ""
                                for (i = 0; i < copyList.length; i++) {
                                    sendStr += "(" + counter + ") " + copyList[i] + "\n"
                                    counter++;
                                }
                                sendStr += "Press 0 to go back\n"
                                let choosemessage = await message.channel.send(sendStr);
                                let filter = m => m.author.id === m.author.id  && !m.author.bot;
                                let Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                        Collector.on("collect", async response => {
                                            if (response.author.id === client.user.id) return
                                            console.log(`Collected: ${response.content}`);    
                                            userResponse = response.content;
                                            Collector.stop()

                                            if (userResponse >= 1 && userResponse < copyList.length) {
                                                j = userResponse - 1;
                                                c = new Character(copyList[j], 1, 1, 1);
                                                sendStr += "New Character: " + c.getName() + "\n" 
                                                + "Atk: " + c.getAtk() + "\n"
                                                + "HP: " + c.getHp() + "\n"
                                                + "Ability: " + c.getAbilityDescription() + "\n\n"
                                                + "Cost: " + characterCost + "\n"
                                                + "(1) Buy\n"
                                                + "(2) Leave"
                                                let choosemessage = await message.channel.send(sendStr);
                                                let filter = m => m.author.id === m.author.id  && !m.author.bot;
                                                let Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                                        Collector.on("collect", async response => {
                                                            if (response.author.id === client.user.id) return
                                                            console.log(`Collected: ${response.content}`);    
                                                            userResponse = response.content;
                                                            Collector.stop()
                    
                                                            if (userResponse == 1) {
                                                                if (account.getPlayer().getCapsocoins() < characterCost) {
                                                                    message.channel.send("You can't afford that")
                                                                    await firstShopMenu()
                                                                    resolve()
                                                                } else {
                                                                    account.getPlayer.modifyCoins(-characterCost);
                                                                    account.getCharacters().push(c);
                                                                    message.channel.send("You unlocked " + c.getName() + "!")
                                                                    await saveAccount(account);
                                                                    await buyCharacters();
                                                                    resolve();
                                                                }
                                                            } else {
                                                                await firstShopMenu();
                                                                resolve()
                                                            } 
                    
                                                        })
                                            } else if (userResponse == 0) {
                                                await firstShopMenu()
                                                resolve();
                                            } else {
                                                message.channel.send("Your response cannot be interpreted")
                                                await buyCharacters();
                                                resolve()
                                            }

                                        })
                            }
                        })
                    }
                }
            }

            async function upgradeCard(account, card) {
                return new Promise(async(resolve, reject) => {
                    let id = card.getId();
                    cost = await calculateUpgradeCost(card.getLevel());
                    upgradeCost = cost
                    upgradeCostMessage = ""
                    if (cost[1] > card.getXp()) {
                        xpTax = (cost[1] - card.getXp()) * 5
                        cost[2] += xpTax;
                        upgradeCostMessage += card.getXp() + "/" + cost[1] + " XP - Buying missing XP for +" + xpTax + " MMessence\n"
                    } else {
                        upgradeCostMessage += card.getXp() + "/" + cost[1] + " XP\n"
                    }
                    
                    upgradeCostMessage += cost[0] + " CAPSO Coins (" + account.getCapsocoins() +")\n"
                    + cost[2] + " MMessence (" + account.getEssence() +")\n"
                    switch(id) {
                        case 1:
                            if (card.getLevel() >= 10) {
                                message.channel.send("This card is maxed");
                                resolve();
                            }
                            upgradeChoice = card.getName() + ":\n"
                            + "level " + card.getLevel() + "\n"
                            + card.getVar1() + " damage\n\n"
                            + "Upgrade:\n" 
                            + "+ " + card.getVar2() +" damage\n\n"
                            + "Cost:\n"
                            + upgradeCostMessage
                            + "(1) yes\n"
                            + "(2) no"
                            choosemessage = await message.channel.send(upgradeChoice)
                            filter = m => m.author.id === m.author.id  && !m.author.bot;
                            boostCollector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                    boostCollector.on("collect", async response => {
                                        if (response.author.id === client.user.id) return
                                        console.log(`Collected: ${response.content}`);    
                                        userResponse = response.content;
                                        boostCollector.stop()
                                        if (userResponse == 1){
                                            if (await processUpgrade()) {
                                                card.incVar1(card.getVar2());
                                                card.incLevel();
                                                message.channel.send("You upgraded " + card.getName());
                                                
                                            } else {
                                                message.channel.send("You can't afford this")
                                            }
                                            await upgradeCard(account, card);
                                            resolve();
                                        } else {
                                            resolve()
                                        }
                                    })
            
                            break;
                        case 2:
                            if (card.getLevel() >= 10) {
                                message.channel.send("This card is maxed");
                                resolve();
                            }
                            upgradeChoice = card.getName() + ":\n"
                            + "level " + card.getLevel() + "\n"
                            + card.getVar1() + " damage\n\n"
                            + "Upgrade:\n" 
                            + "+ " + card.getVar2() +" damage\n\n"
                            + "Cost:\n"
                            + upgradeCostMessage
                            + "(1) yes\n"
                            + "(2) no"
                            choosemessage = await message.channel.send(upgradeChoice)
                            filter = m => m.author.id === m.author.id  && !m.author.bot;
                            boostCollector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                    boostCollector.on("collect", async response => {
                                        if (response.author.id === client.user.id) return
                                        console.log(`Collected: ${response.content}`);    
                                        userResponse = response.content;
                                        boostCollector.stop()
                                        if (userResponse == 1){
                                            if (await processUpgrade()) {
                                            card.incVar1(card.getVar2());
                                            card.incLevel();
                                            message.channel.send("You upgraded " + card.getName());
                                            
                                            } else {
                                                message.channel.send("You can't afford this")
                                            }
                                            await upgradeCard(account, card);
                                            resolve();
                                        } else {
                                            resolve()
                                        }
                                    })
                            break;
                        case 3:
                            if (card.getLevel() >= 10) {
                                message.channel.send("This card is maxed");
                                resolve();
                            }
                            upgradeChoice = card.getName() + ":\n"
                            + "level " + card.getLevel() + "\n"
                            + card.getVar1() + " healing\n\n"
                            +"Upgrade:\n" 
                            + "+ " + card.getVar2() +" healing\n\n"
                            + "Cost:\n"
                            + upgradeCostMessage
                            + "(1) yes\n"
                            + "(2) no"
                            choosemessage = await message.channel.send(upgradeChoice)
                            filter = m => m.author.id === m.author.id  && !m.author.bot;
                            boostCollector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                    boostCollector.on("collect", async response => {
                                        if (response.author.id === client.user.id) return
                                        console.log(`Collected: ${response.content}`);    
                                        userResponse = response.content;
                                        boostCollector.stop()
                                        if (userResponse == 1){
                                            if (await processUpgrade()) {
                                            card.incVar1(card.getVar2());
                                            card.incLevel();
                                            message.channel.send("You upgraded " + card.getName());
                                            
                                            } else {
                                                message.channel.send("You can't afford this")
                                            }
                                            await upgradeCard(account, card);
                                            resolve();
                                        } else {
                                            resolve()
                                        }
                                    })
                            break;
                        case 4:
                            if (card.getLevel() >= 10) {
                                message.channel.send("This card is maxed");
                                resolve();
                            }
                            upgradeChoice = card.getName() + ":\n"
                            + "level " + card.getLevel() + "\n"
                            + card.getVar1() + " healing\n\n"
                            +"Upgrade:\n" 
                            + "+ " + card.getVar2() +" healing\n\n"
                            + "Cost:\n"
                            + upgradeCostMessage
                            + "(1) yes\n"
                            + "(2) no"
                            choosemessage = await message.channel.send(upgradeChoice)
                            filter = m => m.author.id === m.author.id  && !m.author.bot;
                            boostCollector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                    boostCollector.on("collect", async response => {
                                        if (response.author.id === client.user.id) return
                                        console.log(`Collected: ${response.content}`);    
                                        userResponse = response.content;
                                        boostCollector.stop()
                                        if (userResponse == 1){
                                            if (await processUpgrade()) {
                                                card.incVar1(card.getVar2());
                                                card.incLevel();
                                                message.channel.send("You upgraded " + card.getName());
                                                
                                            } else {
                                                message.channel.send("You can't afford this")
                                            }
                                            await upgradeCard(account, card);
                                                resolve();
                                        } else {
                                            resolve()
                                        }
                                    })
                            break;
                        case 5:
                            if (card.getLevel() >= 10) {
                                message.channel.send("This card is maxed");
                                resolve();
                            }
                            upgradeChoice = card.getName() + ":\n"
                            + "level " + card.getLevel() + "\n"
                            + card.getVar1() + "% damage boost\n"
                            + card.getVar2() + " turns\n\n"
                            +"Upgrade 1:\n" 
                            + "+ 5% damage boost\n\n"
                            + "Upgrade 2:\n"
                            + "+ 1 turn\n\n"
                            + "Cost:\n"
                            + upgradeCostMessage
                            + "(1) Upgrade 1\n"
                            + "(2) Upgrade 2\n"
                            + "(3) Cancel"
                            choosemessage = await message.channel.send(upgradeChoice)
                            filter = m => m.author.id === m.author.id  && !m.author.bot;
                            boostCollector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                    boostCollector.on("collect", async response => {
                                        if (response.author.id === client.user.id) return
                                        console.log(`Collected: ${response.content}`);    
                                        userResponse = response.content;
                                        boostCollector.stop()
                                        if (userResponse == 1 || userResponse == 2){
                                            if (await processUpgrade()) {
                                                if (userResponse == 1) {
                                                    card.incVar1(5);
                                                    card.incLevel();
                                                    message.channel.send("You upgraded " + card.getName());
                                                } else if (userResponse == 2) {
                                                    card.incVar2(1);
                                                    card.incLevel();
                                                    message.channel.send("You upgraded " + card.getName());
                                                }
                                            } else {
                                                message.channel.send("You can't afford this")
                                            }
                                            await upgradeCard(account, card);
                                            resolve();
                                        } else {
                                            resolve()
                                        }
                                    })
                            break;
                        case 6:
                            if (card.getLevel() >= 10) {
                                message.channel.send("This card is maxed");
                                resolve();
                            }
                            upgradeChoice = card.getName() + ":\n"
                            + "level " + card.getLevel() + "\n"
                            + card.getVar1() + "% damage boost\n"
                            + card.getVar2() + " turns\n\n"
                            +"Upgrade 1:\n" 
                            + "+ 5% damage boost\n\n"
                            + "Upgrade 2:\n"
                            + "+ 1 turn\n\n"
                            + "Cost:\n"
                            + upgradeCostMessage
                            + "(1) Upgrade 1\n"
                            + "(2) Upgrade 2\n"
                            + "(3) Cancel"
                            choosemessage = await message.channel.send(upgradeChoice)
                            filter = m => m.author.id === m.author.id  && !m.author.bot;
                            boostCollector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                    boostCollector.on("collect", async response => {
                                        if (response.author.id === client.user.id) return
                                        console.log(`Collected: ${response.content}`);    
                                        userResponse = response.content;
                                        boostCollector.stop()
                                        if (userResponse == 1 || userResponse == 2){
                                            if (await processUpgrade()) {
                                                if (userResponse == 1) {
                                                    card.incVar1(5);
                                                    card.incLevel();
                                                    message.channel.send("You upgraded " + card.getName());
                                                } else if (userResponse == 2) {
                                                    card.incVar2(1);
                                                    card.incLevel();
                                                    message.channel.send("You upgraded " + card.getName());
                                                }
                                            } else {
                                                message.channel.send("You can't afford this")
                                            }
                                            await upgradeCard(account, card);
                                            resolve();                                                                               
                                        } else {
                                            resolve()
                                        }
                                    })
                            break;
                        case 7:
                            if (card.getLevel() >= 10) {
                                message.channel.send("This card is maxed");
                                resolve();
                            }
                            upgradeChoice = card.getName() + ":\n"
                            + "level " + card.getLevel() + "\n"
                            + card.getVar1() + "% weakness\n"
                            + card.getVar2() + " turns\n\n"
                            +"Upgrade 1:\n" 
                            + "+ 5% weakness\n\n"
                            + "Upgrade 2:\n"
                            + "+ 1 turn\n\n"
                            + "Cost:\n"
                            + upgradeCostMessage
                            + "(1) Upgrade 1\n"
                            + "(2) Upgrade 2\n"
                            + "(3) Cancel"
                            choosemessage = await message.channel.send(upgradeChoice)
                            filter = m => m.author.id === m.author.id  && !m.author.bot;
                            boostCollector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                    boostCollector.on("collect", async response => {
                                        if (response.author.id === client.user.id) return
                                        console.log(`Collected: ${response.content}`);    
                                        userResponse = response.content;
                                        boostCollector.stop()
                                        if (userResponse == 1 || userResponse == 2){
                                            if (await processUpgrade()) {
                                                if (userResponse == 1) {
                                                    card.incVar1(5);
                                                    card.incLevel();
                                                    message.channel.send("You upgraded " + card.getName());
                                                } else if (userResponse == 2) {
                                                    card.incVar2(1);
                                                    card.incLevel();
                                                    message.channel.send("You upgraded " + card.getName());
                                                }
                                            } else {
                                                message.channel.send("You can't afford this")
                                            }
                                            await upgradeCard(account, card);
                                            resolve();
                                        } else {
                                            resolve()
                                        }
                                    })
                            break;
                        case 8:
                            if (card.getLevel() >= 10) {
                                message.channel.send("This card is maxed");
                                resolve();
                            }
                            upgradeChoice = card.getName() + ":\n"
                            + "level " + card.getLevel() + "\n"
                            + card.getVar1() + "% weakness\n"
                            + card.getVar2() + " turns\n\n"
                            +"Upgrade 1:\n" 
                            + "+ 5% weakness\n\n"
                            + "Upgrade 2:\n"
                            + "+ 1 turn\n\n"
                            + "Cost:\n"
                            + upgradeCostMessage
                            + "(1) Upgrade 1\n"
                            + "(2) Upgrade 2\n"
                            + "(3) Cancel"
                            choosemessage = await message.channel.send(upgradeChoice)
                            filter = m => m.author.id === m.author.id  && !m.author.bot;
                            boostCollector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                    boostCollector.on("collect", async response => {
                                        if (response.author.id === client.user.id) return
                                        console.log(`Collected: ${response.content}`);    
                                        userResponse = response.content;
                                        boostCollector.stop()
                                        if (userResponse == 1 || userResponse == 2){
                                            if (await processUpgrade()) {
                                                if (userResponse == 1) {
                                                    card.incVar1(5);
                                                    card.incLevel();
                                                    message.channel.send("You upgraded " + card.getName());
                                                } else if (userResponse == 2) {
                                                    card.incVar2(1);
                                                    card.incLevel();
                                                    message.channel.send("You upgraded " + card.getName());
                                                }
                                            } else {
                                                message.channel.send("You can't afford this")
                                            }
                                            await upgradeCard(account, card);
                                            resolve();
                                        } else {
                                            resolve()
                                        }
                                    })
                            break;
                        case 9:
                            if (card.getLevel() >= 10) {
                                message.channel.send("This card is maxed");
                                resolve();
                            }
                            upgradeChoice = card.getName() + ":\n"
                            + "level " + card.getLevel() + "\n"
                            + card.getVar1() + "% fragile\n"
                            + card.getVar2() + " turns\n\n"
                            +"Upgrade 1:\n" 
                            + "+ 5% fragile\n\n"
                            + "Upgrade 2:\n"
                            + "+ 1 turn\n\n"
                            + "Cost:\n"
                            + upgradeCostMessage
                            + "(1) Upgrade 1\n"
                            + "(2) Upgrade 2\n"
                            + "(3) Cancel"
                            choosemessage = await message.channel.send(upgradeChoice)
                            filter = m => m.author.id === m.author.id  && !m.author.bot;
                            boostCollector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                    boostCollector.on("collect", async response => {
                                        if (response.author.id === client.user.id) return
                                        console.log(`Collected: ${response.content}`);    
                                        userResponse = response.content;
                                        boostCollector.stop()
                                        if (userResponse == 1 || userResponse == 2){
                                            if (processUpgrade()) {
                                                if (userResponse == 1) {
                                                    card.incVar1(5);
                                                    card.incLevel();
                                                    message.channel.send("You upgraded " + card.getName());
                                                } else if (userResponse == 2) {
                                                    card.incVar2(1);
                                                    card.incLevel();
                                                    message.channel.send("You upgraded " + card.getName());
                                                }
                                            } else {
                                                message.channel.send("You can't afford this")
                                            }
                                            await upgradeCard(account, card);
                                            resolve();
                                        } else {
                                            resolve()
                                        }
                                    })
                            break;
                        case 10:
                            if (card.getLevel() >= 10) {
                                message.channel.send("This card is maxed");
                                resolve();
                            }
                            upgradeChoice = card.getName() + ":\n"
                            + "level " + card.getLevel() + "\n"
                            + card.getVar1() + "% fragile\n"
                            + card.getVar2() + " turns\n\n"
                            +"Upgrade 1:\n" 
                            + "+ 5% fragile\n\n"
                            + "Upgrade 2:\n"
                            + "+ 1 turn\n\n"
                            + "Cost:\n"
                            + upgradeCostMessage
                            + "(1) Upgrade 1\n"
                            + "(2) Upgrade 2\n"
                            + "(3) Cancel"
                            choosemessage = await message.channel.send(upgradeChoice)
                            filter = m => m.author.id === m.author.id  && !m.author.bot;
                            boostCollector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                    boostCollector.on("collect", async response => {
                                        if (response.author.id === client.user.id) return
                                        console.log(`Collected: ${response.content}`);    
                                        userResponse = response.content;
                                        boostCollector.stop()
                                        if (userResponse == 1 || userResponse == 2){
                                            if (processUpgrade()) {
                                                if (userResponse == 1) {
                                                    card.incVar1(5);
                                                    card.incLevel();
                                                    message.channel.send("You upgraded " + card.getName());
                                                } else if (userResponse == 2) {
                                                    card.incVar2(1);
                                                    card.incLevel();
                                                    message.channel.send("You upgraded " + card.getName());
                                                }
                                            } else {
                                                message.channel.send("You can't afford this")
                                            }
                                            await upgradeCard(account, card);
                                            resolve();
                                        } else {
                                            resolve()
                                        }
                                    })
                            break;
                        case 11:
                            if (card.getLevel() >= 10) {
                                message.channel.send("This card is maxed");
                                resolve();
                            }
                            upgradeChoice = card.getName() + ":\n"
                            + "level " + card.getLevel() + "\n"
                            + card.getVar1() + "HP shield\n"
                            + card.getVar2() + " turns\n\n"
                            +"Upgrade 1:\n" 
                            + "+ 25HP shield\n\n"
                            + "Upgrade 2:\n"
                            + "+ 1 turn\n\n"
                            + "Cost:\n"
                            + upgradeCostMessage
                            + "(1) Upgrade 1\n"
                            + "(2) Upgrade 2\n"
                            + "(3) Cancel"
                            choosemessage = await message.channel.send(upgradeChoice)
                            filter = m => m.author.id === m.author.id  && !m.author.bot;
                            boostCollector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                    boostCollector.on("collect", async response => {
                                        if (response.author.id === client.user.id) return
                                        console.log(`Collected: ${response.content}`);    
                                        userResponse = response.content;
                                        boostCollector.stop()
                                        if (userResponse == 1 || userResponse == 2){
                                            if (await processUpgrade()) {
                                                if (userResponse == 1) {
                                                    card.incVar1(5);
                                                    card.incLevel();
                                                    message.channel.send("You upgraded " + card.getName());
                                                } else if (userResponse == 2) {
                                                    card.incVar2(1);
                                                    card.incLevel();
                                                    message.channel.send("You upgraded " + card.getName());
                                                }
                                            } else {
                                                message.channel.send("You can't afford this")
                                            }
                                            await upgradeCard(account, card);
                                            resolve();
                                        } else {
                                            resolve()
                                        }
                                    })
                            break;
                        case 12:
                            if (card.getLevel() >= 10) {
                                message.channel.send("This card is maxed");
                                resolve();
                            }
                            upgradeChoice = card.getName() + ":\n"
                            + "level " + card.getLevel() + "\n"
                            + card.getVar1() + "HP shield\n"
                            + card.getVar2() + " turns\n\n"
                            +"Upgrade 1:\n" 
                            + "+ 25HP shield\n\n"
                            + "Upgrade 2:\n"
                            + "+ 1 turn\n\n"
                            + "Cost:\n"
                            + upgradeCostMessage
                            + "(1) Upgrade 1\n"
                            + "(2) Upgrade 2\n"
                            + "(3) Cancel"
                            choosemessage = await message.channel.send(upgradeChoice)
                            filter = m => m.author.id === m.author.id  && !m.author.bot;
                            boostCollector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                    boostCollector.on("collect", async response => {
                                        if (response.author.id === client.user.id) return
                                        console.log(`Collected: ${response.content}`);    
                                        userResponse = response.content;
                                        boostCollector.stop()
                                        if (userResponse == 1 || userResponse == 2){
                                            if (await processUpgrade()) {
                                                if (userResponse == 1) {
                                                    card.incVar1(25);
                                                    card.incLevel();
                                                    message.channel.send("You upgraded " + card.getName());
                                                } else if (userResponse == 2) {
                                                    card.incVar2(1);
                                                    card.incLevel();
                                                    message.channel.send("You upgraded " + card.getName());
                                                }
                                            } else {
                                                message.channel.send("You can't afford this")
                                            }
                                            await upgradeCard(account, card);
                                            resolve();
                                        } else {
                                            resolve()
                                        }
                                    })
                            break;
                        case 13:
                            if (card.getLevel() >= 10) {
                                message.channel.send("This card is maxed");
                                resolve();
                            }
                            upgradeChoice = card.getName() + ":\n"
                            + "level " + card.getLevel() + "\n"
                            + card.getVar1() + "% chance to skip turn\n"
                            + card.getVar2() + " turns\n\n"
                            +"Upgrade 1:\n" 
                            + "+ 10% chance\n\n"
                            + "Upgrade 2:\n"
                            + "+ 1 turn\n\n"
                            + "Cost:\n"
                            + upgradeCostMessage
                            + "(1) Upgrade 1\n"
                            + "(2) Upgrade 2\n"
                            + "(3) Cancel"
                            choosemessage = await message.channel.send(upgradeChoice)
                            filter = m => m.author.id === m.author.id  && !m.author.bot;
                            boostCollector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                    boostCollector.on("collect", async response => {
                                        if (response.author.id === client.user.id) return
                                        console.log(`Collected: ${response.content}`);    
                                        userResponse = response.content;
                                        boostCollector.stop()
                                        if (userResponse == 1 || userResponse == 2){
                                            if (await processUpgrade()) {
                                                if (userResponse == 1) {
                                                    card.incVar1(10);
                                                    card.incLevel();
                                                    message.channel.send("You upgraded " + card.getName());
                                                } else if (userResponse == 2) {
                                                    card.incVar2(1);
                                                    card.incLevel();
                                                    message.channel.send("You upgraded " + card.getName());
                                                }
                                            } else {
                                                message.channel.send("You can't afford this")
                                            }
                                            await upgradeCard(account, card);
                                            resolve();
                                        } else {
                                            resolve()
                                        }
                                    })
                            break;
                        case 14:
                            if (card.getLevel() >= 10) {
                                message.channel.send("This card is maxed");
                                resolve();
                            }
                            upgradeChoice = card.getName() + ":\n"
                            + "level " + card.getLevel() + "\n"
                            + card.getVar1() + "% chance to skip turn\n"
                            + card.getVar2() + " turns\n\n"
                            +"Upgrade 1:\n" 
                            + "+ 10% chance\n\n"
                            + "Upgrade 2:\n"
                            + "+ 1 turn\n\n"
                            + "Cost:\n"
                            + upgradeCostMessage
                            + "(1) Upgrade 1\n"
                            + "(2) Upgrade 2\n"
                            + "(3) Cancel"
                            choosemessage = await message.channel.send(upgradeChoice)
                            filter = m => m.author.id === m.author.id  && !m.author.bot;
                            boostCollector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                    boostCollector.on("collect", async response => {
                                        if (response.author.id === client.user.id) return
                                        console.log(`Collected: ${response.content}`);    
                                        userResponse = response.content;
                                        boostCollector.stop()
                                        if (userResponse == 1 || userResponse == 2){
                                            if (await processUpgrade()) {
                                                if (userResponse == 1) {
                                                    card.incVar1(10);
                                                    card.incLevel();
                                                    message.channel.send("You upgraded " + card.getName());
                                                } else if (userResponse == 2) {
                                                    card.incVar2(1);
                                                    card.incLevel();
                                                    message.channel.send("You upgraded " + card.getName());
                                                }
                                            } else {
                                                message.channel.send("You can't afford this")
                                            }
                                            await upgradeCard(account, card);
                                            resolve();
                                        } else {
                                            resolve()
                                        }
                                    })
                            break;
                        case 15:
                            if (card.getLevel() >= 10) {
                                message.channel.send("This card is maxed");
                                resolve();
                            }
                            upgrade1 = 100
                            upgradeChoice = card.getName() + ":\n"
                            + "level " + card.getLevel() + "\n"
                            + card.getVar1() + "HP shield\n"
                            + card.getVar2() + " turns\n\n"
                            +"Upgrade:\n" 
                            + "+ " + upgrade1 + "HP shield\n\n"
                            + "Cost:\n"
                            + upgradeCostMessage
                            + "(1) Upgrade\n"
                            + "(2) Cancel"
                            choosemessage = await message.channel.send(upgradeChoice)
                            filter = m => m.author.id === m.author.id  && !m.author.bot;
                            boostCollector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                    boostCollector.on("collect", async response => {
                                        if (response.author.id === client.user.id) return
                                        console.log(`Collected: ${response.content}`);    
                                        userResponse = response.content;
                                        boostCollector.stop()
                                        if (userResponse == 1){
                                            if (await processUpgrade()) {
                                                if (userResponse == 1) {
                                                    card.incVar1(upgrade1);
                                                    card.incLevel();
                                                    message.channel.send("You upgraded " + card.getName());
                                                } else if (userResponse == 2) {
                                                    card.incVar2(1);
                                                    card.incLevel();
                                                    message.channel.send("You upgraded " + card.getName());
                                                }
                                            } else {
                                                message.channel.send("You can't afford this")
                                            }
                                            await upgradeCard(account, card);
                                            resolve();
                                        } else {
                                            resolve()
                                        }
                                    })
                            break;
                        case 16:
                            if (card.getLevel() >= 10) {
                                message.channel.send("This card is maxed");
                                resolve();
                            }
                            upgrade1 = 1
                            upgradeChoice = card.getName() + ":\n"
                            + "level " + card.getLevel() + "\n"
                            + card.getVar1() + "turns\n\n"
                            +"Upgrade:\n" 
                            + "+ " + upgrade1 + " turn\n\n"
                            + "Cost:\n"
                            + upgradeCostMessage
                            + "(1) Upgrade\n"
                            + "(2) Cancel"
                            choosemessage = await message.channel.send(upgradeChoice)
                            filter = m => m.author.id === m.author.id  && !m.author.bot;
                            boostCollector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                    boostCollector.on("collect", async response => {
                                        if (response.author.id === client.user.id) return
                                        console.log(`Collected: ${response.content}`);    
                                        userResponse = response.content;
                                        boostCollector.stop()
                                        if (userResponse == 1){
                                            if (await processUpgrade()) {
                                                if (userResponse == 1) {
                                                    card.incVar1(upgrade1);
                                                    card.incLevel();
                                                    message.channel.send("You upgraded " + card.getName());
                                                }
                                            } else {
                                                message.channel.send("You can't afford this")
                                            }
                                            await upgradeCard(account, card);
                                            resolve();
                                        } else {
                                            resolve()
                                        }
                                    })
                            break;
                        case 17:
                            if (card.getLevel() >= 10) {
                                message.channel.send("This card is maxed");
                                resolve();
                            }
                            upgrade1 = 1
                            upgradeChoice = card.getName() + ":\n"
                            + "level " + card.getLevel() + "\n"
                            + card.getVar1() + " speed reduction\n"
                            +"Upgrade:\n" 
                            + "+ " + upgrade1 + " speed reduction\n\n"
                            + "Cost:\n"
                            + upgradeCostMessage
                            + "(1) Upgrade\n"
                            + "(2) Cancel"
                            choosemessage = await message.channel.send(upgradeChoice)
                            filter = m => m.author.id === m.author.id  && !m.author.bot;
                            boostCollector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                    boostCollector.on("collect", async response => {
                                        if (response.author.id === client.user.id) return
                                        console.log(`Collected: ${response.content}`);    
                                        userResponse = response.content;
                                        boostCollector.stop()
                                        if (userResponse == 1){
                                            if (await processUpgrade()) {
                                                if (userResponse == 1) {
                                                    card.incVar1(upgrade1);
                                                    card.incLevel();
                                                    message.channel.send("You upgraded " + card.getName());
                                                } else if (userResponse == 2) {
                                                    card.incVar2(1);
                                                    card.incLevel();
                                                    message.channel.send("You upgraded " + card.getName());
                                                }
                                            } else {
                                                message.channel.send("You can't afford this")
                                            }
                                            await upgradeCard(account, card);
                                            resolve();
                                        } else {
                                            resolve()
                                        }
                                    })
                            break;
                        case 18:
                            if (card.getLevel() >= 10) {
                                message.channel.send("This card is maxed");
                                resolve();
                            }
                            upgrade1 = 1
                            upgradeChoice = card.getName() + ":\n"
                            + "level " + card.getLevel() + "\n"
                            + card.getVar1() + " speed reduction\n\n"
                            +"Upgrade:\n" 
                            + "+ " + upgrade1 + " speed reduction\n\n"
                            + "Cost:\n"
                            + upgradeCostMessage
                            + "(1) Upgrade\n"
                            + "(2) Cancel"
                            choosemessage = await message.channel.send(upgradeChoice)
                            filter = m => m.author.id === m.author.id  && !m.author.bot;
                            boostCollector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                    boostCollector.on("collect", async response => {
                                        if (response.author.id === client.user.id) return
                                        console.log(`Collected: ${response.content}`);    
                                        userResponse = response.content;
                                        boostCollector.stop()
                                        if (userResponse == 1){
                                            if (await processUpgrade()) {
                                                if (userResponse == 1) {
                                                    card.incVar1(upgrade1);
                                                    card.incLevel();
                                                    message.channel.send("You upgraded " + card.getName());
                                                } else if (userResponse == 2) {
                                                    card.incVar2(1);
                                                    card.incLevel();
                                                    message.channel.send("You upgraded " + card.getName());
                                                }
                                            } else {
                                                message.channel.send("You can't afford this")
                                            }
                                            await upgradeCard(account, card);
                                            resolve();
                                        } else {
                                            resolve()
                                        }
                                    })
                            break;
                        case 19:
                            if (card.getLevel() >= 10) {
                                message.channel.send("This card is maxed");
                                resolve();
                            }
                            upgrade1 = 1
                            upgradeChoice = card.getName() + ":\n"
                            + "level " + card.getLevel() + "\n"
                            + card.getVar1() + " speed increase\n\n"
                            +"Upgrade:\n" 
                            + "+ " + upgrade1 + " speed increase\n\n"
                            + "Cost:\n"
                            + upgradeCostMessage
                            + "(1) Upgrade\n"
                            + "(2) Cancel"
                            choosemessage = await message.channel.send(upgradeChoice)
                            filter = m => m.author.id === m.author.id  && !m.author.bot;
                            boostCollector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                    boostCollector.on("collect", async response => {
                                        if (response.author.id === client.user.id) return
                                        console.log(`Collected: ${response.content}`);    
                                        userResponse = response.content;
                                        boostCollector.stop()
                                        if (userResponse == 1){
                                            if (await processUpgrade()) {
                                                if (userResponse == 1) {
                                                    card.incVar1(upgrade1);
                                                    card.incLevel();
                                                    message.channel.send("You upgraded " + card.getName());
                                                } else if (userResponse == 2) {
                                                    card.incVar2(1);
                                                    card.incLevel();
                                                    message.channel.send("You upgraded " + card.getName());
                                                }
                                            } else {
                                                message.channel.send("You can't afford this")
                                            }
                                            await upgradeCard(account, card);
                                            resolve();
                                        } else {
                                            resolve()
                                        }
                                    })
                            break;
                        case 20:
                            if (card.getLevel() >= 10) {
                                message.channel.send("This card is maxed");
                                resolve();
                            }
                            upgrade1 = 1
                            upgradeChoice = card.getName() + ":\n"
                            + "level " + card.getLevel() + "\n"
                            + card.getVar1() + " speed increase\n\n"
                            +"Upgrade:\n" 
                            + "+ " + upgrade1 + " speed increase\n\n"
                            + "Cost:\n"
                            + upgradeCostMessage
                            + "(1) Upgrade\n"
                            + "(2) Cancel"
                            choosemessage = await message.channel.send(upgradeChoice)
                            filter = m => m.author.id === m.author.id  && !m.author.bot;
                            boostCollector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                    boostCollector.on("collect", async response => {
                                        if (response.author.id === client.user.id) return
                                        console.log(`Collected: ${response.content}`);    
                                        userResponse = response.content;
                                        boostCollector.stop()
                                        if (userResponse == 1){
                                            if (await processUpgrade()) {
                                                if (userResponse == 1) {
                                                    card.incVar1(upgrade1);
                                                    card.incLevel();
                                                    message.channel.send("You upgraded " + card.getName());
                                                } else if (userResponse == 2) {
                                                    card.incVar2(1);
                                                    card.incLevel();
                                                    message.channel.send("You upgraded " + card.getName());
                                                }
                                            } else {
                                                message.channel.send("You can't afford this")
                                            }
                                            await upgradeCard(account, card);
                                            resolve();
                                        } else {
                                            resolve()
                                        }
                                    })
                            break;
                        case 23:
                            if (card.getLevel() >= 10) {
                                message.channel.send("This card is maxed");
                                resolve();
                                return;
                            }
                            upgrade1 = 1
                            upgradeChoice = card.getName() + ":\n"
                            + "level " + card.getLevel() + "\n"
                            + card.getVar1() + "turns\n\n"
                            +"Upgrade:\n" 
                            + "+ " + upgrade1 + " turn\n\n"
                            + "Cost:\n"
                            + upgradeCostMessage
                            + "(1) Upgrade\n"
                            + "(2) Cancel"
                            choosemessage = await message.channel.send(upgradeChoice)
                            filter = m => m.author.id === m.author.id  && !m.author.bot;
                            boostCollector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                    boostCollector.on("collect", async response => {
                                        if (response.author.id === client.user.id) return
                                        console.log(`Collected: ${response.content}`);    
                                        userResponse = response.content;
                                        boostCollector.stop()
                                        if (userResponse == 1){
                                            if (await processUpgrade()) {
                                                if (userResponse == 1) {
                                                    card.incVar1(upgrade1);
                                                    card.incLevel();
                                                    message.channel.send("You upgraded " + card.getName());
                                                }
                                            } else {
                                                message.channel.send("You can't afford this")
                                            }
                                            await upgradeCard(account, card);
                                            resolve();
                                        } else {
                                            resolve()
                                        }
                                    })
                            break;
                        case 24:
                            if (card.getLevel() >= 10) {
                                message.channel.send("This card is maxed");
                                resolve();
                                return;
                            }
                            upgrade1 = 5
                            upgradeChoice = card.getName() + ":\n"
                            + "level " + card.getLevel() + "\n"
                            + card.getVar1() + " damage\n\n"
                            +"Upgrade:\n" 
                            + "+ " + upgrade1 + " damage\n\n"
                            + "Cost:\n"
                            + upgradeCostMessage
                            + "(1) Upgrade\n"
                            + "(2) Cancel"
                            choosemessage = await message.channel.send(upgradeChoice)
                            filter = m => m.author.id === m.author.id  && !m.author.bot;
                            boostCollector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                    boostCollector.on("collect", async response => {
                                        if (response.author.id === client.user.id) return
                                        console.log(`Collected: ${response.content}`);    
                                        userResponse = response.content;
                                        boostCollector.stop()
                                        if (userResponse == 1){
                                            if (await processUpgrade()) {
                                                if (userResponse == 1) {
                                                    card.incVar1(upgrade1);
                                                    card.incLevel();
                                                    message.channel.send("You upgraded " + card.getName());
                                                }
                                            } else {
                                                message.channel.send("You can't afford this")
                                            }
                                            await upgradeCard(account, card);
                                            resolve();
                                        } else {
                                            resolve()
                                        }
                                    })

                            break;
                        case 25:
                            if (card.getLevel() >= 10) {
                                message.channel.send("This card is maxed");
                                resolve();
                                return;
                            }
                            upgrade1 = 10
                            upgradeChoice = card.getName() + ":\n"
                            + "level " + card.getLevel() + "\n"
                            + card.getVar1() + "% HP\n\n"
                            +"Upgrade:\n" 
                            + "+ 10% more base HP\n\n"
                            + "Cost:\n"
                            + upgradeCostMessage
                            + "(1) Upgrade\n"
                            + "(2) Cancel"
                            choosemessage = await message.channel.send(upgradeChoice)
                            filter = m => m.author.id === m.author.id  && !m.author.bot;
                            boostCollector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                    boostCollector.on("collect", async response => {
                                        if (response.author.id === client.user.id) return
                                        console.log(`Collected: ${response.content}`);    
                                        userResponse = response.content;
                                        boostCollector.stop()
                                        if (userResponse == 1){
                                            if (await processUpgrade()) {
                                                if (userResponse == 1) {
                                                    //card.incVar1(upgrade1);
                                                    card.incLevel();
                                                    message.channel.send("You upgraded " + card.getName());
                                                }
                                            } else {
                                                message.channel.send("You can't afford this")
                                            }
                                            await upgradeCard(account, card);
                                            resolve();
                                        } else {
                                            resolve()
                                        }
                                    })
                            break;     
                        default:
                            message.channel.send("This card does not have an upgrade")
                            resolve();
                            break;
                    }
                    
                })

                
                /**
                 * returns trus if you can upgrade and subtracts the cost from your account
                 */
                async function processUpgrade() {
                    return new Promise(async(resolve, reject) => {

                        if (account.getCapsocoins() < upgradeCost[0] || account.getEssence() < upgradeCost[2]) {
                            resolve(false)
                        } else {
                            account.getPlayer().modifyCoins(-upgradeCost[0]);
                            if (card.getXp() >= upgradeCost[1]) {
                                card.modifyXp(-upgradeCost[1]);
                            } else {
                                card.setXp(0)
                            }
                            account.incEssence(-upgradeCost[2]);
                            resolve(true)
                        }
                    })
                }
            }
            
            /**
                 * 
                 * @param {*} level the level of the card
                 * @returns the cost in an array with [Capso Coins, XP, MMessence]
                 */
            async function calculateUpgradeCost(level) {
                return new Promise(async(resolve, reject) => {
                    switch(level) {
                        case 1:
                            resolve([0, 2, 10]);
                            break;
                        case 2:
                            resolve([0, 5, 20]);
                            break;
                        case 3:
                            resolve([0, 10, 35]);
                            break;
                        case 4:
                            resolve([0, 15, 50]);
                            break;
                        case 5:
                            resolve([0, 25, 75]);
                            break;
                        case 6:
                            resolve([0, 35, 100]);
                            break;
                        case 7:
                            resolve([0, 50, 125]);
                            break;
                        case 8:
                            resolve([0, 75, 150]);
                            break;
                        case 9:
                            resolve([0, 100, 200]);
                            break;
                        case 10:
                            resolve([0, 100, 200]);
                            break;

                    }
                })
            }

            
            

            

            /**
             * Please redo getRandomLine sometime in the future and not use this
             * could use findsonginformation to get the rest or something
             * @param {} filename 
             * @returns the songname
             */
            function getRandomSong(filename){
                return new Promise((resolve, reject) => {
                fs.readFile(filename, "utf-8", function(err, data){
                  if(err) {
                      throw err;
                  }
              
                  // note: this assumes `data` is a string - you may need
                  //       to coerce it - see the comments for an approach
                  var lines = data.split('\n');
                  
                  //while(ready == 0){
                  // choose one of the lines...
                  var line = lines[Math.floor(Math.random()*lines.length)]
            
            
                  //line = line.substring(0,line.length-1)
            
                  line = line.split('=')
                  //console.log(line)
                  resolve(line[0])
               })
            })
              }

            /**
             * Creates a new Cytus Heardle for the dungeon mode and returns a Cytus Heardle class
             * @param {the name of the song} songname 
             */
            async function createDungeonHeardle(songname, duration, starttime, isreverse){
                return new Promise(async (resolve, reject) => {
                    try{
                        console.log("./songlist/" + songname+ ".mp4")
                        console.log(duration)
                        console.log(starttime)
                        console.log(isreverse)
                        await processvideo("./songlist/" + songname + ".mp4", "./temp/" + songname + duration + starttime + isreverse + ".mp4", isreverse, starttime, duration);
                        songinfo = await findsonginformation(songname);
                        console.log("songinfo")
                        console.log(songinfo)
                        song = new CytusSong(songname, duration, starttime, isreverse, "./temp/" + songname + duration + starttime + isreverse + ".mp4", songinfo[1], songinfo[2], songinfo[3])
                        resolve(song);
                    } catch (error){
                        console.log(error)
                        message.channel.send("There was an error")
                    }
                })
            }

            async function processBoost(p, songLength, hpLoss, scrambled, hard, reverse){
                return new Promise(async (resolve, reject) => {
                    numBoosts--;
                    console.log("get random song")
                    boostSongname = await getRandomSong("songnamestrue.txt")
                    console.log(boostSongname);
                    console.log("create dungeon heardle")
                    length = songLength
                    if (hard) {
                        length = length/2;
                    }
                    starttime = 0
                    if(scrambled) {
                        starttime = await getScrambled("./songlist/" + boostSongname + ".mp4");
                    }
                    message.channel.send("processing has started")
                    Song = await createDungeonHeardle(boostSongname, length, starttime, reverse);
                    console.log("song created!")
                    console.log("The directory is " + Song.getOutputDirectory());
                    await message.channel.send({files: [Song.getOutputDirectory()]})
                    //create a while loop
                    
                    result = await guessBoost(p, Song, hpLoss);
                    fs.unlink(Song.getOutputDirectory(), (err) => {
                        if (err) {
                        console.log(err);
                        } else {
                        
                        }
                    });
                    resolve(result);
                })
            }

            async function tutorial(){
                return new Promise(async(resolve, rejcet) => {


                sendStr = "Welcome to Cytus Heardle Dungeon Mode.\n"
                + "Let's start with the basics:\n"
                + "     -So you press 1 to attack. Dont worry about the rest of the options for now.\n"
                + "     -If all your characters die, enemies will attack your wagon. If your wagon dies, you lose all the loot from your run.\n\n"
                + "ok good luck. Btw, this isnt some tutorial battle where you can't lose. You can try to lose if you want, the tutorial will advance either way.\n"
                + "Press any button to continue..."
                c = new Character("PAFF", 1, 1, 1)
                let a = new Account(-1, "asdf", 0, 0, [c], [], [c], [], 1, 5, 1, 1, [false, false, [0, 0], [[], [], 0, [], 0, -1], [0, 0, []]])
                let choosemessage = await message.channel.send(sendStr);
                let filter = m => m.author.id === m.author.id  && !m.author.bot;
                let Collector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                        Collector.on("collect", async response => {
                            if (response.author.id === client.user.id) return
                            console.log(`Collected: ${response.content}`);    
                            userResponse = response.content;
                            Collector.stop()

                            result = await battle(a, [], [enemyBank.skeleton.copy(), enemyBank.skeleton.copy(), enemyBank.skeleton.copy()], a.getDeck(), 1, 0)
                            if (result) {
                                sendStr = "Good job\n"
                            } else {
                                sendStr = "Wow you actually lost. Good job\n"
                            }

                            a.setWagonHp(a.getMaxWagonHp());
                            newC = new Character("NEKO#ΦωΦ", 1, 1, 1)
                            a.getCharacters().push(newC);
                            a.getTeam().push(newC)
                            sendStr += "You unlocked a new character: **NEKO#ΦωΦ**\n\n"
                            + "NEKO#ΦωΦ has an ability that summons a Meowbot. Try using it in this next battle, or not. I don't really care.\n"
                            + "Press any button to continue..."
                            let choosemessage = await message.channel.send(sendStr);
                            let filter = m => m.author.id === m.author.id  && !m.author.bot;
                            let Collector2 = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                    Collector2.on("collect", async response => {
                                        if (response.author.id === client.user.id) return
                                        console.log(`Collected: ${response.content}`);    
                                        userResponse = response.content;
                                        Collector2.stop()

                                        await battle(a, [], [enemyBank.barbarian.copy(), enemyBank.barbarian.copy()], a.getDeck(), 1, 0);   

                                        a.setWagonHp(a.getMaxWagonHp());
                                        newC2 = new Character("ROBO_Head", 1, 1, 1)
                                        a.getCharacters().push(newC2);
                                        a.getTeam().push(newC2)

                                        sendStr = "You unlocked a new character: **ROBO_Head**\n"
                                         + "**Ability: Take 50 damage and give an ally a 50HP shield**\n\n"
                                        + "Ok. If you havent noticed already, you play the other characters in your party by drawing them as cards. But, you can also play real cards too. As long as they are in your deck. You know what, I'll give you some max level cards for this next battle.\n"
                                        + "Press any button to continue..."
                                        let choosemessage = await message.channel.send(sendStr);
                                        let filter = m => m.author.id === m.author.id  && !m.author.bot;
                                        let Collector3 = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                                Collector3.on("collect", async response => {
                                                    if (response.author.id === client.user.id) return
                                                    console.log(`Collected: ${response.content}`);    
                                                    userResponse = response.content;
                                                    Collector3.stop()

                                                    c1 = await generateCard(1, 10, 1);
                                                    c1.setName("Damage - Single Target (MAX)")
                                                    c2 = new Card(22, "Mega Knight (MAX)", "Summons a Mega Knight", 10, 1, "mega_knight", 10)
                                                    c3 = new Card(10, "Fragile - All Enemies (MAX)", "Gives Fragile to every enemy", 10, 1, 50, 5)
                                                    a.getDeck().push(c1);
                                                    a.getDeck().push(c2);
                                                    a.getDeck().push(c3);
                                                    sendStr = "You recieved Damage - Single Target (MAX)\n"
                                                    + "You recieved Mega Knight (MAX)\n"
                                                    + "You recieved Fragile - All Enemies (MAX)\n\n"
                                                    + "Try them out if you want.\n"
                                                    + "Press any button to continue..."
                                                    let choosemessage = await message.channel.send(sendStr);
                                                    let filter = m => m.author.id === m.author.id  && !m.author.bot;
                                                    let Collector4 = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                                            Collector4.on("collect", async response => {
                                                                if (response.author.id === client.user.id) return
                                                                console.log(`Collected: ${response.content}`);    
                                                                userResponse = response.content;
                                                                Collector4.stop()

                                                                await battle(a, [], [enemyBank.dragon.copy(), enemyBank.balloon.copy(), enemyBank.balloon.copy()], a.getDeck(), 1, 0)
                                                                console.log(a)
                                                                a.setWagonHp(a.getMaxWagonHp());
                                                                newC2 = new Character("Ivy", 1, 1, 1)
                                                                a.getCharacters().push(newC2);
                                                                a.getTeam().push(newC2)
                                                                c1 = await generateCard(1, 10, 1);
                                                                c1.setName("Damage - Single Target (MAX)")
                                                                c2 = new Card(22, "Mega Knight (MAX)", "Summons a Mega Knight", 10, 1, "mega_knight", 10)
                                                                c3 = new Card(10, "Fragile - All Enemies (MAX)", "Gives Fragile to every enemy", 10, 1, 50, 5)
                                                                a.getDeck().push(c1);
                                                                a.getDeck().push(c2);
                                                                a.getDeck().push(c3);

                                                                sendStr = "You unlocked a new character: **Ivy**\n"
                                                                + "**Ability: Revive with 1HP if you complete a 0.5 second, scrambled, reverse Cytus Heardle**\n\n"
                                                                + "Btw, you draw a card everytime your guard, kill an enemy, or when it's your bonus turn.\n"
                                                                + "Ok. One last thing. If you turn on boost and do a normal attack, you will deal more damage if you answer a Cytus Heardle correctly. You can try it out in this next battle.\n"
                                                                + "you only get 1 boost each battle, but you can upgrade it later.\n"
                                                                + "This will be your last battle.\n"
                                                                + "Press any button to continue..."
                                                                let choosemessage = await message.channel.send(sendStr);
                                                                let filter = m => m.author.id === m.author.id  && !m.author.bot;
                                                                let Collector5 = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                                                        Collector5.on("collect", async response => {
                                                                            if (response.author.id === client.user.id) return
                                                                            console.log(`Collected: ${response.content}`);    
                                                                            userResponse = response.content;
                                                                            Collector5.stop()

                                                                            await battle(a, [], [enemyBank.giant.copy(), enemyBank.barbarian.copy(), enemyBank.wizard.copy()], a.getDeck(), 1, 0);  

                                                                            sendStr = "Ok that should be it. Unless you want me to explain guard? It's literally just you take reduced damage the next time you get hit. Also the dungeon resets every week. It's going to be the exact same run until then, so you only really need to play once a week. Ok bye.\n"
                                                                            + "Press any button to leave tutorial..."

                                                                            let choosemessage = await message.channel.send(sendStr);
                                                                            let filter = m => m.author.id === m.author.id  && !m.author.bot;
                                                                            let Collector6 = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ["time"] });
                                                                                    Collector6.on("collect", async response => {
                                                                                        if (response.author.id === client.user.id) return
                                                                                        console.log(`Collected: ${response.content}`);    
                                                                                        userResponse = response.content;
                                                                                        Collector6.stop()

                                                                                        
                                                                                        resolve()
                                                                                    })
                                                                        })
                                                            })


                                                })
                                    })
                        })
                    })
            }

            break;
        case'x':
        const newembed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Main Menu')
        .setDescription('Select an option');

    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('start_run')
                .setLabel('Start Run')
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId('edit_team')
                .setLabel('Edit Team')
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId('view_upgrade')
                .setLabel('View/Upgrade')
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId('shop')
                .setLabel('Shop')
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId('records')
                .setLabel('Records')
                .setStyle('PRIMARY')
        );

     sentMessage = await message.channel.send({ embeds: [newembed], components: [row] });

     filter = i => i.user.id === message.author.id;

     collector = sentMessage.createMessageComponentCollector({ filter, time: 60000 });

    collector.on('collect', async interaction => {
        if (interaction.customId === 'start_run') {
            newembed.setDescription('You selected Start Run.');
        } else if (interaction.customId === 'edit_team') {
            newembed.setDescription('You selected Edit Team.');
        } else if (interaction.customId === 'view_upgrade') {
            newembed.setDescription('You selected View/Upgrade.');
        } else if (interaction.customId === 'shop') {
            newembed.setDescription('You selected Shop.');
        } else if (interaction.customId === 'records') {
            newembed.setDescription('You selected Records.');
        }

        await interaction.update({ embeds: [newembed], components: [row] });
    });

    collector.on('end', collected => {
        console.log(`Collected ${collected.size} interactions.`);
    });
        case 'y':
            message.channel.send({files: ["When Moons Reaching Out Stars Reload.mp3"]})
            break; 
        case 'play':
            directory = message.content.substring(6, message.content.length);
            if (!message.member.voice.channel) {
                return message.reply('You need to be in a voice channel to use this command.');
            }
            console.log("directory:" + directory);
    
            // Join the voice channel
            const voiceChannel = message.member.voice.channel;
            const connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: voiceChannel.guild.id,
                adapterCreator: voiceChannel.guild.voiceAdapterCreator
            });
    
            // Create the audio player
            const player = createAudioPlayer();
    
            try{
            // Create the audio resource (replace 'your-file.mp3' with the actual path to your MP3 file)
            const filePath = path.join(__dirname, directory);
            const resource = createAudioResource(filePath);
    
            
            // Play the resource
            player.play(resource);
            connection.subscribe(player);
            
            } catch (error) {
                message.channel.send("Error")
            }
            // Log player status changes
            player.on(AudioPlayerStatus.Playing, () => {
                console.log('The audio is now playing!');
            });
    
            player.on(AudioPlayerStatus.Idle, () => {
                console.log('The audio has finished playing!');
                connection.destroy(); // Leave the voice channel when finished
            });
    
            player.on('error', error => {
                console.error(`Error: ${error.message}`);
                connection.destroy(); // Leave the voice channel on error
            });
            break;
        
            }

   

})




async function generateDungeon() {
    return new Promise( async (resolve, reject) => {
        console.log("GENERATING DUNGEON")
        dungeonFloor = [];
        chosenNumbers = [];
        dungeonLoot = [];

        dungeonFloor.push(new DungeonRoom(3, "wizard room"))
        dungeonLoot.push([0, 0, []])

        //first room
        index = Math.floor(Math.random() * clashBattleRooms[0].length)
        chosenNumbers.push(index);
        dungeonFloor.push(clashBattleRooms[0][index]);
        let id = regularBattleRoomCardDrops[Math.floor(Math.random() * regularBattleRoomCardDrops.length)]
        randomCard = await generateCard(id, 1, 1)
        dungeonLoot.push([10, 20, [randomCard]])

        let numbers = [];
        while (numbers.length < 4) {
            let randomNumber = Math.floor(Math.random() * 8); // Generates a random number between 0 and 7
            if (!numbers.includes(randomNumber)) { // Ensures no duplicates
                numbers.push(randomNumber);
            }
        }

        essenceLoot = 40;
        for (i = 0; i < 7; i++) {
            if (numbers.includes(i)) {
                chosenRoom = Math.floor(Math.random() * 5) + 1
                switch(chosenRoom) {
                    case 1:
                        dungeonFloor.push(new DungeonRoom(1, "You arrived at a campfire"))
                        dungeonLoot.push([0, 0, []])
                        break;
                    case 2:
                        dungeonFloor.push(new DungeonRoom(2, "Cytus Heardle trial"))
                        dungeonLoot.push([0, 0, []])
                        break;
                    case 3:
                        dungeonFloor.push(new DungeonRoom(4, "Card Request", [] ,[]))
                        dungeonLoot.push([0, 0, []])
                        break;
                    case 4:
                        dungeonFloor.push(new DungeonRoom(5, "Card fountain", [], []))
                        dungeonLoot.push([0, 0, []])
                        break;
                    case 5:
                        dungeonFloor.push(new DungeonRoom(6, "Inari Shrine", [], []))
                        dungeonLoot.push([0, 0, []])
                        break;
                }
            } else { 
                index = Math.floor(Math.random() * clashBattleRooms[0].length)
                while(chosenNumbers.includes(index)) {
                    index = Math.floor(Math.random() * clashBattleRooms[0].length)
                }
                chosenNumbers.push(index);
                dungeonFloor.push(clashBattleRooms[0][index]);
                let id = regularBattleRoomCardDrops[Math.floor(Math.random() * regularBattleRoomCardDrops.length)]
                randomCard = await generateCard(id, 1, 1)
                dungeonLoot.push([10, essenceLoot, [randomCard]])
                essenceLoot += 20;
            }
        }
        index = Math.floor(Math.random() * clashBattleRooms[1].length);
        dungeonFloor.push(clashBattleRooms[1][index]);
        dungeonLoot.push([10, essenceLoot, []]);

        //floor 2
        dungeonFloor2 = [];
        dungeonLoot2 = [];
        chosenNumbers = [];
        index = Math.floor(Math.random() * clashBattleRooms[2].length)
        chosenNumbers.push(index);
        dungeonFloor.push(clashBattleRooms[2][index]);
        id = regularBattleRoomCardDrops[Math.floor(Math.random() * regularBattleRoomCardDrops.length)]
        randomCard = await generateCard(id, 1, 1)
        dungeonLoot2.push([10, 40, [randomCard]])
        
        numbers = [];
        while (numbers.length < 4) {
            let randomNumber = Math.floor(Math.random() * 8); // Generates a random number between 0 and 7
            if (!numbers.includes(randomNumber)) { // Ensures no duplicates
                numbers.push(randomNumber);
            }
        }

        essenceLoot = 60;
        for (i = 0; i < 7; i++) {
            if (numbers.includes(i)) {
                chosenRoom = Math.floor(Math.random() * 5) + 1
                switch(chosenRoom) {
                    case 1:
                        dungeonFloor.push(new DungeonRoom(1, "You arrived at a campfire"))
                        dungeonLoot.push([0, 0, []])
                        break;
                    case 2:
                        dungeonFloor.push(new DungeonRoom(2, "Cytus Heardle trial"))
                        dungeonLoot.push([0, 0, []])
                        break;
                    case 3:
                        dungeonFloor.push(new DungeonRoom(4, "Card Request", [] ,[]))
                        dungeonLoot.push([0, 0, []])
                        break;
                    case 4:
                        dungeonFloor.push(new DungeonRoom(5, "Card fountain", [], []))
                        dungeonLoot.push([0, 0, []])
                        break;
                    case 5:
                        dungeonFloor.push(new DungeonRoom(6, "Inari Shrine", [], []))
                        dungeonLoot.push([0, 0, []])
                        break;
                }
            } else { 
                index = Math.floor(Math.random() * clashBattleRooms[2].length)
                while(chosenNumbers.includes(index)) {
                    index = Math.floor(Math.random() * clashBattleRooms[2].length)
                }
                chosenNumbers.push(index);
                dungeonFloor.push(clashBattleRooms[2][index]);
                dungeonLoot2.push([10, essenceLoot, []])
                essenceLoot += 20;
            }
        }
        index = Math.floor(Math.random() * clashBattleRooms[3].length);
        dungeonFloor.push(clashBattleRooms[3][index]);
        id = regularBattleRoomCardDrops[Math.floor(Math.random() * regularBattleRoomCardDrops.length)]
        randomCard = await generateCard(id, 1, 1)
        dungeonLoot2.push([10, essenceLoot, [randomCard]]);
        generatedDungeon = new Dungeon([dungeonFloor, dungeonFloor2], [dungeonLoot, dungeonLoot2])
        generatedDungeon.setCurrentPlayers([]);
        generatedDungeon.overwriteHighestFloors([])
        resolve(generatedDungeon)
    })
}

async function generateShop(shop, isWeekly){
    newCommons = []
    for (i = 0; i < 3; i++) {
        id = shopTopShelf[Math.floor(Math.random() * shopTopShelf.length)];
        c = await generateCard(id, 1, 1);
        //console.log( i + "-" + id + ":" + c)
        price = Math.floor(Math.random() * 11) + 10
        newItem = new ShopItem(1, c, [price])
        newCommons.push(newItem);
    }
    shop.addDailyStock(newCommons);

    if (isWeekly) {
        //summons 15-30
        //rare cards 40-100
        newRares = []
        for (i = 0; i < 3; i ++) {
            id = Math.floor(Math.random() * shopBottomShelf.length) + 1;
            c = await generateCard(id, 1, 1);
            //console.log( i + "-" + id + ":" + c)
            price = Math.floor(Math.random() * 61) + 40
            newItem = new ShopItem(1, c, [price])
            newRares.push(newItem);
        }
        shop.addWeeklyStock(newRares);
    }

}

async function generateCard(id, level, tier) {
    return new Promise(async (resolve, reject) => {
        if (level == undefined) {
            level = 1
        }
        //maybe change this when I add more tiered cards
        if (tier = 1) {
        switch(id) {
            case 1:
                resolve(new Card(id, "Damage - Single Target", 'Deals ${var1} damage to an enemy', level, 1, 100 + ((level - 1) * 20), 20))
            case 2:
                resolve(new Card(id, "Damage - All Enemies", 'Deals ${var1} damage to all enemies', level,1, 100 + ((level - 1) * 20), 20))
            case 3:
                resolve(new Card(id, "Healing - Single Target", 'Heals ${var1} healing to a party memeber', level,1, 100 + ((level - 1) * 20), 20))
            case 4:
                resolve(new Card(id, "Healing - Party", 'Heals ${var1} healing to your entire party', level, 1,100 + ((level - 1) * 20), 20))
            case 5:
                resolve(new Card(id, "Damage Boost - Single Target", 'Gives a ${var1}% damage boost to an ally for ${var2} turns', level, 1, 10 + ((level - 1) * 5), 1))
            case 6:
                resolve(new Card(id, "Damage Boost - Party", 'Gives a ${var1}% damage boost to your party for ${var2} turns', level, 1, 10 + ((level - 1) * 5), 1))
            case 7:
                resolve(new Card(id, "Weakness - Single Target", 'Gives ${var1}% weakness to an enemy for ${var2} turns', level, 1,10 + ((level - 1) * 5), 1))
            case 8:
                resolve(new Card(id, "Weakness - All Enemies", 'Gives ${var1}% weakness to every enemy for ${var2} turns', level,1, 10 + ((level - 1) * 5), 1))
            case 9:
                resolve(new Card(id, "Fragile - Single Target", 'Gives ${var1}% fragile to an enemy for ${var2} turns' , level, 1, 10 + ((level - 1) * 5), 1))
            case 10:
                resolve(new Card(id, "Fragile - All Enemies", 'Gives ${var1}% fragile to every enemy for ${var2} turns', level, 1, 10 + ((level - 1) * 5), 1))
            case 11:
                resolve(new Card(id, "Shield - Single Target", 'Gives ${var1}HP shield to an ally for ${var2} turns', level,1, 50 + ((level - 1) * 25), 1))
            case 12:
                resolve(new Card(id, "Shield - Party", 'Gives ${var1}HP shield to your entire party for ${var2} turns', level, 1,50 + ((level - 1) * 25), 1))
            case 13:
                resolve(new Card(id, "Fear - Single Target", 'Gives ${var1}% fear to an enemy for ${var2} turns', level,1, 10 + ((level - 1) * 5), 1))
            case 14:
                resolve(new Card(id, "Fear - All Enemies", 'Gives ${var1}% fear to every enemy for ${var2} turns', level,1, 10 + ((level - 1) * 5), 1))
            case 15:
                resolve(new Card(id, "Overcharged Shield", 'Gives ${var1}HP shield to an ally for turn', level,1, 100 + ((level - 1) * 100), 1))
            case 16:
                resolve(new Card(id, "Cure", 'Reduces negative ailments by ${var1} turn.', level, 1,1 + ((level - 1) * 1), 1))
            case 17:
                resolve(new Card(id, "Speed Boost - Single Target", 'Reduces the speed of an ally by ${var1}', level,1, 10 + ((level - 1) * 5), 1))
            case 18:
                resolve(new Card(id, "Speed Boost - Party", 'Reduces the speed of your party by ${var1}',level, 1,10 + ((level - 1) * 5), 1))
            case 19:
                resolve(new Card(id, "Stun - Single Target", 'Increases the speed of an enemy by ${var1}', level,1, 10 + ((level - 1) * 5), 1))
            case 20:
                resolve(new Card(id, "Stun - All Enemies", 'Increases the speed of every enemy by ${var1}',level, 1,10 + ((level - 1) * 5), 1))
            case 23:
                resolve(new Card(id, "Cure - Party", 'Reduces negative ailments by ${var1} turn', level, 1, 1 + ((level - 1) * 1), 1))
            case 24:
                resolve(new Card(id, "Zap", "Deals ${var1} damage to an enemy. Does not take a turn", level, 1, 25 + ((level - 1) * 5), 0));
            case 25:
                resolve(new Card(id, "Clone Spell", "Clones your entire party. Cloned party memebrs have 1 HP and get inflicted with 34% decay", level, 1, level, 1));
            case 26:
                resolve(new Card(id, "Rage Spell", "Gives your party a ${var1}% damage boost and ${var2} speed boost", level, 1, 50, 5));
            case 27:
                resolve(new Card(id, "Invisibility Spell", "Givers a party member invisibility for ${var1} turns", level, 1, 5, 5));
            case 28:
                resolve(new Card(id, "Healing Spell", "Givers your party ${var1} healing for 3 turns", level, 1, 50, 5));
            case 29:
                resolve(new Card(id, "Poison Spell", "Gives the enemy party ${var1} poison for 3 turns and increases their speed by 5", level, 1, 50, 5));
            case 30:
                resolve(new Card(id, "Freeze Spell", "Freezes the enemy party for 2 turns", level, 1, 50, 5));
            case 31:
                resolve(new Card(id, "Void Spell", "Hits every enemy 3 times, does less damage if there's multiple targets", level, 1, 50, 5));
            case 32:
                resolve(new Card(id, "Arrows", "Deals ${var1} damage to 5 random enemies", level, 1, 50, 5));
            case 33:
                resolve(new Card(id, "Barbarian Barrel", "Deals ${var1} damage to a random enemy and spawn a barbarian", level, 1, 25, 5));
            case 34:
                resolve(new Card(id, "Fireball", "Deals ${var1} damage to 3 random enemies", level, 1, 100, 5));
            case 35:
                resolve(new Card(id, "Log", "Deals ${var1} damage to all enemies", level, 1, 30, 5));
            case 36:
                resolve(new Card(id, "Lightning", "Deals ${var1} damage to the 3 enemies with the most HP", level, 1, 150, 5));
            case 37:
                resolve(new Card(id, "Rocket", "Deals ${var1} damage to an enemy. Has a 50% chance to miss", level, 1, 500, 5));

            }
        } else {
            resolve()
        }
        
    })
}

client.on('interactionCreate', async interaction => {

    if (interaction.isCommand()){
    
        const { commandName } = interaction;
        
        switch(commandName) {
            case 'ping':
                await interaction.reply('Pingged');
                break;
            case 'viewcard':
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
                if (hands[pn].length == 0) {
                    interaction.reply({content: "No hand. wait 15 seconds or something", ephemeral: true});
                    return;
                }
                for (let i = 0; i < hands[pn].length; i++) {
                    str = str + `${(i + 1)}: ${toCard(hands[pn][i])}\n`;
                }
                interaction.reply({content: str, ephemeral: true});
                break;
            case 'sethand':
                let str1 = "";
                let pn1 = 4;
                if (reorderedPlayers[0] == interaction.user.id) {
                    pn1 = 0;
                } else if (reorderedPlayers[1] == interaction.user.id) {
                    pn1 = 1;
                } else if (reorderedPlayers[2] == interaction.user.id) {
                    pn1 = 2;
                } else if (reorderedPlayers[3] == interaction.user.id) {
                    pn1 = 3;
                } else {
                    interaction.reply({content: "You aren't in the game.", ephemeral: true});
                    return;
                }
                hands[pn1] = [hands[pn1][0], hands[pn1][1]];
                for (let i = 0; i < hands[pn1].length; i++) {
                    str1 = str1 + `${(i + 1)}: ${toCard(hands[pn1][i])}\n`;
                }
                interaction.reply({content: str1, ephemeral: true});
                break;
            case 'tycoon':
                //new slash command mentions 3 users
                // slash tycoon i guess idk
                if (tycoonGameOngoing) {
                    interaction.reply("There is already a tycoon game ongoing so you cant start one now");
                    return;
                }
                if (interaction.options.getUser('user1').bot || interaction.options.getUser('user2').bot || interaction.options.getUser('user3').bot) {
                    interaction.reply("You can't start a game with a bot.");
                    return;
                }
                let messagesender = interaction.user.id;
                const user1 = interaction.options.getUser('user1').id;
                const user2 = interaction.options.getUser('user2').id;
                const user3 = interaction.options.getUser('user3').id;
                let ucc = {};
                ucc[messagesender] = 1;
                ucc[user1] = 1;
                ucc[user2] = 1;
                ucc[user3] = 1;
                let ct = 0;
                for (let i in ucc) {
                    ct++;
                }
                if (ct != 4) {
                    interaction.reply("You can't start a game with duplicate users.");
                    return;
                }
                tycoonGameOngoing = true;
                interaction.reply("Starting game...");
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
                reorderedPlayers = [player1, player2, player3, player4];
                //maybe make playing the game give capso coins lol
                // turn order this is really jank but im too lazy to think of a better way

                //im pretty sure that show hand has to be its own function for it to work and then hands and reorderedplayers have to be global
                //also this means u cant play multiple games of tycoon at once sob
                let tycoon = 4;
                let rich = 4;
                let poor = 4;
                let beggar = 4;
                let maxround = maxRound;
                if (maxRound < 1) {
                    maxround = 0;
                }
                let collector = interaction.channel.createMessageCollector({ time: 120000 });
                for (let round = 1; round != maxround + 1; round++) {
                    interaction.channel.send(`Round ${round} start!`);
                    let cdeck = tycoonDeck.slice();
                    console.log(cdeck);
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
                    await handOutDeckPromise;
                    console.log(hands);
                    let firstPlayer = Math.floor(Math.random() * 4);
                    if (round > 1) {
                        firstPlayer = beggar;
                        interaction.channel.send("<@!" + reorderedPlayers[tycoon] + ">, you are the tycoon. <@!" + reorderedPlayers[beggar] + "> is the beggar. Pick 2 cards to give to them.\n" + 
                            "<@!" + reorderedPlayers[rich] + ">, you are the rich. <@!" + reorderedPlayers[poor] + "> is the poor. Pick 1 card to give to them.\n" + 
                            "<@!" + reorderedPlayers[poor] + ">, you are the poor. <@!" + reorderedPlayers[rich] + "> is the rich. You dont get to pick what to give but respond to this message with \"ok\" to acknowledge it.\n" + 
                            "<@!" + reorderedPlayers[beggar] + ">, you are the beggar. <@!" + reorderedPlayers[tycoon] + "> is the tycoon. You dont get to pick what to give but respond to this message with \"ok\" to acknowledge it.");
                        let collectedResponses = {};
                        let responseCount = 0;
                        let collectionPromise = new Promise(async (resolve, reject) => {

                        let collector = interaction.channel.createMessageCollector({ time: 120000 });
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
                                                interaction.channel.send(`<@!${msg.author.id}>, submit exactly 1 number between 1 and ${hands[rich].length}.`);
                                            }
                                        } else {
                                            if (numbers.length) {
                                                interaction.channel.send(`<@!${msg.author.id}>, you've already submitted.`);
                                            }
                                        }
                                    }
                                    if (msg.author.id == reorderedPlayers[tycoon]) {
                                        if (!collectedResponses[msg.author.id]) {
                                            if (numbers.length == 2 && numbers.every(num => num >= 1 && num <= hands[tycoon].length && Number.isInteger(num)) && numbers[0] != numbers[1]) {
                                                collectedResponses[msg.author.id] = [numbers[0] - 1, numbers[1] - 1];
                                                responseCount++;
                                            } else {
                                                interaction.channel.send(`<@!${msg.author.id}>, submit exactly 2 different numbers between 1 and ${hands[tycoon].length}.`);
                                            }
                                        } else {
                                            if (numbers.length) {
                                                interaction.channel.send(`<@!${msg.author.id}>, you've already submitted.`);
                                            }
                                        }
                                    }
                                }
                                if (responseCount == 4) {
                                    collector.stop();
                                    resolve();
                                }
                            });
                        })
                        await collectionPromise;
                        if (responseCount != 4) {
                            interaction.channel.send("ok i didnt get 4 responses so im deleting the game");
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
                    let finishThisTurn = 0;
                    rich = 4;
                    tycoon = 4;
                    beggar = 4;
                    poor = 4;
                    let playersLeft = 4;
                    while (unfinished) {
                        while (curPlayer == rich || curPlayer == poor || curPlayer == tycoon || curPlayer == beggar || curPlayer < 0 || curPlayer > 3) {
                            curPlayer = (curPlayer + 1) % 4;
                        }
                        if (curPlayer < 0 || curPlayer > 3) {
                            console.log("uh what the crap thats not supposed to happen");
                            console.log("Playersleft: " + playersLeft);
                            //console.log("passCount outside loop: " + passCount);
                            console.log("curP outside: " + curPlayer);
                            console.log(`${tycoon} ${rich} ${poor} ${beggar}`);

                        }
                        interaction.channel.send(`<@!${reorderedPlayers[curPlayer]}>, you are starting. Pick a play by sending 1-4 numbers in 1 message seperated by spaces.`);
                        let play = [];
                        let passCount = 0;
                        collectionPromise = new Promise (async (resolve) => {
                            let collector = interaction.channel.createMessageCollector({ time: 120000 });
                        collector.on('collect', async (msg) => {
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
                                    } // checks if same card used twice
                                    if (c != numbers.length) {
                                        interaction.channel.send(`<@!${reorderedPlayers[curPlayer]}>, dont select the same card twice.`);
                                    } else {
                                        for (let i = 0; i < numbers.length; i++) {
                                            if (!card && hands[curPlayer][numbers[i] - 1].charAt(0) != 'w') {
                                                card = hands[curPlayer][numbers[i] - 1].charAt(0);
                                                if (card == 8) {
                                                    eightstop = true;
                                                }
                                            }
                                            if (hands[curPlayer][numbers[i] - 1].charAt(0) != 'w' && hands[curPlayer][numbers[i] - 1].charAt(0) != card) {
                                                interaction.channel.send(`<@!${reorderedPlayers[curPlayer]}>, please select the same value card (or joker) for all cards.`);
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
                                        //const nickname = "<@!" + msg.author.id +">";
                                        let nickname = msg.author.displayName;
                                        let playMsg = `${nickname} played `;
                                        for (let i = 0; i < play.length; i++) {
                                            playMsg = playMsg + toCard(play[i]);
                                        }
                                        //interaction.channel.send(playMsg);
                                        console.log(curPlayer);
                                        if (str.length) {
                                            //interaction.channel.send(str);
                                            playMsg = playMsg + `\n${str}`;
                                        }
                                        if (eightstop) {
                                            //interaction.channel.send("An 8-stop!");
                                            playMsg = playMsg + `\nAn 8-stop!`;
                                            passCount = 4;
                                        }
                                        console.log(hands[curPlayer]);
                                        console.log(hands[curPlayer].length);
                                        if (hands[curPlayer].length > 1) {
                                            //interaction.channel.send(`${nickname} has ${hands[curPlayer].length} cards left!`);
                                            playMsg = playMsg + `\n${nickname} has ${hands[curPlayer].length} cards left!`;
                                        } else if (hands[curPlayer].length == 1) {
                                            //interaction.channel.send(`**${nickname} has 1 card left!**`);
                                            playMsg = playMsg + `\n**${nickname} has 1 card left!**`;
                                        } else {
                                            if (tycoon == 4) {
                                                tycoon = curPlayer;
                                                //interaction.channel.send(`${nickname} is the Tycoon!`);
                                                playMsg = playMsg + `\n${nickname} is the Tycoon!`;
                                                finishThisTurn = 1;
                                                playersLeft--;
                                                if (lastTycoon != 4 && curPlayer != lastTycoon) {
                                                    beggar = lastTycoon;
                                                    //const nickname2 = "<@!" + reorderedPlayers[lastTycoon] +">";
                                                    let member1 = await interaction.guild.members.fetch(reorderedPlayers[lastTycoon]);
                                                    let nickname2 = member1.displayName;
                                                    //interaction.channel.send(`${nickname2} has fallen from the Tycoon to the Beggar!`);
                                                    playMsg = playMsg + `\n${nickname2} has fallen from the Tycoon to the Beggar!`;
                                                    playersLeft--;
                                                }
                                            } else if (rich == 4) {
                                                rich = curPlayer;
                                                //interaction.channel.send(`${nickname} is Rich!`);
                                                playMsg = playMsg + `\n${nickname} is Rich!`;
                                                finishThisTurn = 1;
                                                playersLeft--;
                                                if (beggar != 4) {
                                                    poor = 6 - tycoon - rich - beggar;
                                                    //const nickname2 = "<@!" + reorderedPlayers[poor] +">";
                                                    let member1 = await interaction.guild.members.fetch(reorderedPlayers[poor]);
                                                    let nickname2 = member1.displayName;
                                                    //interaction.channel.send(`${nickname2} is Poor!`);
                                                    playMsg = playMsg + `\n${nickname2} is Poor!`;
                                                    unfinished = false;
                                                    passCount = 5;
                                                    console.log(`${tycoon} ${rich} ${poor} ${beggar}`);
                                                } // if beggar is 4 then game ends, otherwise continues
                                            } else if (poor == 4) {
                                                poor = curPlayer;
                                                //interaction.channel.send(`${nickname} is Poor!`);
                                                playMsg = playMsg + `\n${nickname} is Poor!`;
                                                beggar = 6 - tycoon - rich - poor;
                                                //const nickname2 = "<@!" + reorderedPlayers[beggar] +">";
                                                let member1 = await interaction.guild.members.fetch(reorderedPlayers[beggar]);
                                                let nickname2 = member1.displayName;
                                                playMsg = playMsg + `\n${nickname2} is the Beggar!`;
                                                //interaction.channel.send(`${nickname2} is the Beggar!`);
                                                unfinished = false;
                                                passCount = 5;
                                                console.log(`${tycoon} ${rich} ${poor} ${beggar}`);
                                            } // beggar should always be resolved either here or game already ended
                                        }
                                        console.log(playMsg);
                                        interaction.channel.send(playMsg);

                                        curPlayer = (curPlayer + 1) % 4;
                                        
                                        collector.stop(); 
                                        resolve();
                                    }
                                }
                            }
                        });
                        });
                        await collectionPromise;
                        if (play.length == 0) {
                            interaction.channel.send("ok i didnt get a response so im deleting the game");
                            break;
                        }
                        console.log("passCount outside loop: " + passCount);
                        console.log("curP outside: " + curPlayer);
                        let finishLoop = 0;
                        while (passCount < playersLeft - 1 + finishThisTurn) {
                            while (curPlayer == rich || curPlayer == poor || curPlayer == tycoon || curPlayer == beggar || curPlayer < 0 || curPlayer > 3) {
                                curPlayer = (curPlayer + 1) % 4;
                            }
                            console.log("passCount: " + passCount);
                            console.log("curP: " + curPlayer);
                            if (finishThisTurn) {
                                if (finishLoop < playersLeft - 1) {
                                    finishLoop++;
                                } else {
                                    finishThisTurn = 0;
                                    if (passCount >= playersLeft) {
                                        curPlayer = (curPlayer - 1) % 4;
                                        break;
                                    }
                                }
                            }
                            let eightstop = false;
                            let played = false;
                            interaction.channel.send(`<@!${reorderedPlayers[curPlayer]}>, your turn. Pick a play by sending ${play.length} numbers in 1 message seperated by spaces.`);
                            collectionPromise = new Promise (async (resolve) => {
                                let collector = interaction.channel.createMessageCollector({ time: 120000 });
                            collector.on('collect', async (msg) => {
                                if (msg.author.id == reorderedPlayers[curPlayer]) {
                                    if (msg.content == "pass" || msg.content == "p") {
                                        passCount++;
                                        played = true;
                                        const nickname = "<@!" + msg.author.id +">";
                                        interaction.channel.send(`${nickname} passed.`)
                                        collector.stop();
                                        resolve()
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
                                                interaction.channel.send(`<@!${reorderedPlayers[curPlayer]}>, dont select the same card twice.`);
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
                                                                    interaction.channel.send(`<@!${reorderedPlayers[curPlayer]}>, select a higher card than the previous play. or pass`);
                                                                    skip = true;
                                                                    eightstop = false;
                                                                    break;
                                                                }
                                                            } else {
                                                                if (!compareCards(play[0]), card.toString()) {
                                                                    interaction.channel.send(`<@!${reorderedPlayers[curPlayer]}>, select a lower card than the previous play. or pass`);
                                                                    skip = true;
                                                                    eightstop = false;
                                                                    break;
                                                                }
                                                            } //checks if the play is higher than the previous play
                                                        }
                                                        if (hands[curPlayer][numbers[i] - 1].charAt(0) != 'w' && hands[curPlayer][numbers[i] - 1].charAt(0) != card) {
                                                            interaction.channel.send(`<@!${reorderedPlayers[curPlayer]}>, please select the same value card (or joker) for all cards.`);
                                                            skip = true;
                                                            eightstop = false;
                                                            break;
                                                        } //checks if the play is the same as the previous play
                                                        if (card == 0) {
                                                            if (play[0].charAt(0) == 'w') {
                                                                interaction.channel.send(`<@!${reorderedPlayers[curPlayer]}>, select a higher card than the previous play. or pass`);
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
                                                    interaction.channel.send("3 of Spades Reversal: 3 of Spades beats Joker")
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
                                                //const nickname = "<@!" + msg.author.id +">";
                                                let nickname = msg.author.displayName;
                                                passCount = 0;
                                                let playMsg = `${nickname} played `;
                                                for (let i = 0; i < play.length; i++) {
                                                    playMsg = playMsg + toCard(play[i]);
                                                }
                                                //interaction.channel.send(playMsg);
                                                if (str.length) {
                                                    //interaction.channel.send(str);
                                                    playMsg = playMsg + "\n" + str;
                                                }
                                                if (eightstop) {
                                                    //interaction.channel.send("An 8-stop!");
                                                    playMsg = playMsg + `\nAn 8-stop!`;
                                                    passCount = 4;
                                                }
                                                console.log(hands[curPlayer]);
                                                console.log(hands[curPlayer].length);
                                                if (hands[curPlayer].length > 1) {
                                                    //interaction.channel.send(`${nickname} has ${hands[curPlayer].length} cards left!`);
                                                    playMsg = playMsg + `\n${nickname} has ${hands[curPlayer].length} cards left!`;
                                                } else if (hands[curPlayer].length == 1) {
                                                    //interaction.channel.send(`**${nickname} has 1 card left!**`);
                                                    playMsg = playMsg + `\n**${nickname} has 1 card left!**`;
                                                } else {
                                                    if (tycoon == 4) {
                                                        tycoon = curPlayer;
                                                        //interaction.channel.send(`${nickname} is the Tycoon!`);
                                                        playMsg = playMsg + `\n${nickname} is the Tycoon!`;
                                                        playersLeft--;
                                                        passCount = -1;
                                                        if (curPlayer != lastTycoon && lastTycoon != 4) {
                                                            beggar = lastTycoon;
                                                            //const nickname2 = "<@!" + reorderedPlayers[lastTycoon] +">";
                                                            let member1 = await interaction.guild.members.fetch(reorderedPlayers[lastTycoon]);
                                                            let nickname2 = member1.displayName;
                                                            //interaction.channel.send(`${nickname2} has fallen from the Tycoon to the Beggar!`);
                                                            playMsg = playMsg + `\n${nickname2} has fallen from the Tycoon to the Beggar!`;
                                                            playersLeft--;
                                                        }
                                                    } else if (rich == 4) {
                                                        rich = curPlayer;
                                                        //interaction.channel.send(`${nickname} is Rich!`);
                                                        playMsg = playMsg + `\n${nickname} is Rich!`;
                                                        finishThisTurn = 1;
                                                        playersLeft--;
                                                        if (beggar != 4) {
                                                            poor = 6 - tycoon - rich - beggar;
                                                            //const nickname2 = "<@!" + reorderedPlayers[poor] +">";
                                                            let member1 = await interaction.guild.members.fetch(reorderedPlayers[poor]);
                                                            let nickname2 = member1.displayName;
                                                            //interaction.channel.send(`${nickname2} is Poor!`);
                                                            playMsg = playMsg + `\n${nickname2} is Poor!`;
                                                            unfinished = false;
                                                            passCount = 5;
                                                            console.log(`${tycoon} ${rich} ${poor} ${beggar}`);
                                                        } // if beggar is 4 then game ends, otherwise continues
                                                    } else if (poor == 4) {
                                                        poor = curPlayer;
                                                        //interaction.channel.send(`${nickname} is Poor!`);
                                                        playMsg = playMsg + `\n${nickname} is Poor!`;
                                                        beggar = 6 - tycoon - rich - poor;
                                                        //const nickname2 = "<@!" + reorderedPlayers[beggar] +">";
                                                        let member1 = await interaction.guild.members.fetch(reorderedPlayers[beggar]);
                                                        let nickname2 = member1.displayName;
                                                        playMsg = playMsg + `\n${nickname2} is the Beggar!`;
                                                        //interaction.channel.send(`${nickname2} is the Beggar!`);
                                                        unfinished = false;
                                                        passCount = 5;
                                                        console.log(`${tycoon} ${rich} ${poor} ${beggar}`);
                                                    } // beggar should always be resolved either here or game already ended
                                                }
                                                interaction.channel.send(playMsg);
                                                played = true;
                                                resolve();
                                                collector.stop();
                                                
                                            }
                                        }
                                    }
                                }
                            }); // should check for a legal message/play
                            })
                            await collectionPromise;
                            if (!played) {
                                passCount++;
                                let member1 = await interaction.guild.members.fetch(reorderedPlayers[curPlayer]);
                                let nickname = member1.displayName;
                                //let nickname = "<@!" + reorderedPlayers[curPlayer] +">";
                                interaction.channel.send(`${nickname} didnt respond, so they passed.`);
                                collector.stop();
                            } //if not played then assume pass
                            curPlayer = (curPlayer + 1) % 4;
                        }
                        if (passCount == 4) {
                            curPlayer = (curPlayer - 1) % 4;
                            passCount = 0;
                        } else if (passCount == 3) {
                            interaction.channel.send("All players passed.");
                        }
                        curPlayer = curPlayer % 4;
                    }
                    if (round == maxround) {
                        if (tycoon != 4) {
                            interaction.channel.send(`Results: <@!${reorderedPlayers[tycoon]}> is the Tycoon. <@!${reorderedPlayers[rich]}> is the Rich. <@!${reorderedPlayers[poor]}> is the Poor. <@!${reorderedPlayers[beggar]}> is the Beggar. \n` + 
                                `Round ${round} reached, game ending.`
                            );
                            scores[tycoon] += 15;
                            scores[rich] += 10;
                            scores[poor] += 5;
                            let scoreder = [0,1,2,3];
                            for (let i = 0; i < 4; i++) {
                                for (let j = i + 1; j < 4; j++) {
                                    if (scores[scoreder[i]] < scores[scoreder[j]]) {
                                        let temp = scoreder[i];
                                        scoreder[i] = scoreder[j];
                                        scoreder[j] = temp;
                                    }
                                }
                            }
                            const scoresEmbed = {
                                color: 0x0099ff,
                                title: 'Some title',
                                fields: [
                                    {
                                        name: `<@${reorderedPlayers[scoreder[0]]}>`,
                                        value: `${scores[scoreder[0]]}`,
                                        inline: false,
                                    },
                                    {
                                        name: `<@${reorderedPlayers[scoreder[1]]}>`,
                                        value: `${scores[scoreder[1]]}`,
                                        inline: false,
                                    },
                                    {
                                        name: `<@${reorderedPlayers[scoreder[2]]}>`,
                                        value: `${scores[scoreder[2]]}`,
                                        inline: false,
                                    },
                                    {
                                        name: `<@${reorderedPlayers[scoreder[3]]}>`,
                                        value: `${scores[scoreder[3]]}`,
                                        inline: false,
                                    },
                                ],
                            };
                            interaction.channel.send({embeds: [scoresEmbed]});
                        }
                    }
                    if (tycoon != 4) {
                        interaction.channel.send(`Results: <@!${reorderedPlayers[tycoon]}> is the Tycoon. <@!${reorderedPlayers[rich]}> is the Rich. <@!${reorderedPlayers[poor]}> is the Poor. <@!${reorderedPlayers[beggar]}> is the Beggar. `);
                        scores[tycoon] += 15;
                        scores[rich] += 10;
                        scores[poor] += 5;
                        let scoreder = [0,1,2,3]
                        for (let i = 0; i < 4; i++) {
                            for (let j = i + 1; j < 4; j++) {
                                if (scores[scoreder[i]] < scores[scoreder[j]]) {
                                    let temp = scoreder[i];
                                    scoreder[i] = scoreder[j];
                                    scoreder[j] = temp;
                                }
                            }
                        }
                        const scoresEmbed = {
                            color: 0x0099ff,
                            title: 'Some title',
                            fields: [
                                {
                                    name: `<@${reorderedPlayers[scoreder[0]]}>`,
                                    value: `${scores[scoreder[0]]}`,
                                    inline: false,
                                },
                                {
                                    name: `<@${reorderedPlayers[scoreder[1]]}>`,
                                    value: `${scores[scoreder[1]]}`,
                                    inline: false,
                                },
                                {
                                    name: `<@${reorderedPlayers[scoreder[2]]}>`,
                                    value: `${scores[scoreder[2]]}`,
                                    inline: false,
                                },
                                {
                                    name: `<@${reorderedPlayers[scoreder[3]]}>`,
                                    value: `${scores[scoreder[3]]}`,
                                    inline: false,
                                },
                            ],
                        };
                        interaction.channel.send({embeds: [scoresEmbed]});
                    }
                    let cont = false;
                    collectionPromise = new Promise (async (resolve) => {
                        interaction.channel.send("Play again?").then((msg) => {
                            msg.react('👍');
                            msg.react('👎');
                            // set up a filter to only collect reactions with the ❤ emoji
                            let filter = (reaction, user) => (reaction.emoji.name == '👍' || reaction.emoji.name == '👎');
                            let collector = msg.createReactionCollector(filter);
                            collector.on('collect', (reaction, user) => {
                                if (!user.bot) {
                                    if (reaction.emoji.name == '👍') {
                                        cont = true;
                                        collector.stop();
                                        resolve();
                                    } else {
                                        cont = false;
                                        collector.stop();
                                        resolve();
                                    }
                                }
                            });
                        });
                    }); // wait for either react
                    await collectionPromise;
                    if (!cont) {
                        interaction.channel.send("Game over.");
                        //you can add capso coins or something here
                        scores = [0,0,0,0];
                        tycoonGameOngoing = false;
                        break;
                    }
                }
                tycoonGameOngoing = false;
                break;
        }
    }

    if (!interaction.isSelectMenu()) return; // Check if the interaction is from a select menu
    
    // Check if the interaction is from the specific select menu with the custom ID 'city-select'
    switch(interaction.customId) {
        case 'city-select':
            const selectedValue = interaction.values[0]; // Get the selected option's value
            const selectedOption = interaction.message.components[0].components[0].options.find(option => option.value === selectedValue);
        
            // If the selected option is found, send a message with the selected city's label
            if (selectedOption) {
                await interaction.reply(`Your favorite city is ${selectedOption.label}.`);
            }
            break;
        case 'add-to-deck' :
            //console.log(accountMap)
            account = accountMap.get(interaction.message.id);
            //console.log(interaction.message.id)
            if (!account) {
                await interaction.reply({ content: 'Account not found!', ephemeral: true });
                return;
            }

            selectedValues = interaction.values.map(value => parseInt(value)); // Convert values back to integers
            //console.log('Selected values:', selectedValues);
    
             // Step 1: Gather the selected cards
            selectedCards = selectedValues.map(value => account.getCards()[value]);
            if (selectedValues.length + account.getDeck().length > account.getDeckSize()) {
                remainingSlots = account.getDeckSize() - account.getDeck().length
                await interaction.reply({
                    content: `You added too many cards. Your deck can only hold ` + remainingSlots + ' more cards',
                    ephemeral: true
                });
            } else {

            // Step 2: Remove the selected cards from getCards()
            account.setCards(account.getCards().filter((_, index) => !selectedValues.includes(index)));

            // Step 3: Add the gathered cards to the deck
            for (const card of selectedCards) {
                account.getDeck().push(card);
            }
            //console.log('Updated deck:', account.getDeck());

            await interaction.reply({
                content: `You added the following cards to your deck: ${selectedCards.map(card => card.getName()).join(', ')}`,
                ephemeral: true
            });
            }
            await interaction.message.delete();
            await accountMap.delete(interaction.message.id)

            break;
        case 'remove-from-deck' :
            //console.log(accountMap)
            account = accountMap.get(interaction.message.id);
            //console.log(interaction.message.id)
            if (!account) {
                await interaction.reply({ content: 'Account not found!', ephemeral: true });
                return;
            }

            selectedValues = interaction.values.map(value => parseInt(value)); // Convert values back to integers
            //console.log('Selected values:', selectedValues);
    
             // Step 1: Gather the selected cards
            selectedCards = selectedValues.map(value => account.getDeck()[value]);

            // Step 2: Remove the selected cards from getCards()
            account.setDeck(account.getDeck().filter((_, index) => !selectedValues.includes(index)));

            // Step 3: Add the gathered cards to the deck
            for (const card of selectedCards) {
                account.getCards().push(card);
            }
            //console.log('Updated cards:', account.getCards());

            await interaction.reply({
                content: `You removed the following cards to your deck: ${selectedCards.map(card => card.getName()).join(', ')}`,
                ephemeral: true
            });

            await interaction.message.delete();
            await accountMap.delete(interaction.message.id)
            break;
        case 'add-to-team' :
            //console.log(accountMap)
            account = accountMap.get(interaction.message.id);
            //console.log(interaction.message.id)
            if (!account) {
                await interaction.reply({ content: 'Account not found!', ephemeral: true });
                return;
            }

            selectedValues = interaction.values.map(value => parseInt(value)); // Convert values back to integers
            //console.log('Selected values:', selectedValues);
    
             // Step 1: Gather the selected cards
             const selectedCharacters = selectedValues.map(value => account.getCharacters()[value]);
             account.setTeam([]);
            // Step 2: Add the gathered cards to the deck
            for (const character of selectedCharacters) {
                account.getTeam().push(character);
            }
            //console.log('Updated cards:', account.getTeam());

            await interaction.reply({
                content: `You added the following characters to your team: ${selectedCharacters.map(character => character.getName()).join(', ')}`,
                ephemeral: true
            });

            await saveAccount(account)

            await interaction.message.delete();
            await accountMap.delete(interaction.message.id)
            break;
        /** 
            case 'upgrade-card-chooser':
            account = accountMap.get(interaction.message.id);
            console.log(account)
            if (!account) {
                await interaction.reply({ content: 'Account not found!', ephemeral: true });
                return;
            }

            selectedValues = interaction.values.map(value => parseInt(value)); // Convert values back to integers
            console.log('Selected values:', selectedValues);
            console.log('Selected values:', selectedValues[0]);
            selectedCard = null;
            if (account.getDeck().length < selectedValues[0]){
                selectedCard = account.getCards()[selectedValues[0] - account.getDeck().length];
            } else {
                console.log(account.getDeck())
                selectedCard = account.getDeck()[selectedValues[0]];
            }

            // Step 2: Add the gathered cards to the deck
            console.log(selectedCard)
            await upgradeCard(account, selectedCard)
            console.log('Updated cards:', account.getTeam());

            await interaction.reply({
                content: `You added the following characters to your team: ${selectedCharacters.map(character => character.getName()).join(', ')}`,
                ephemeral: true
            });

            await interaction.message.delete();
            await accountMap.delete(interaction.message.id)
            break;
        */
        }
    if (interaction.customId === 'city-select') {
      const selectedValue = interaction.values[0]; // Get the selected option's value
      const selectedOption = interaction.message.components[0].components[0].options.find(option => option.value === selectedValue);
  
      // If the selected option is found, send a message with the selected city's label
      if (selectedOption) {
        await interaction.reply(`Your favorite city is ${selectedOption.label}.`);
      }
    }
    
    
  });
  
client.on('messageCreate', async (message)=>{
    if(!message.content.startsWith(debugprefix) || message.author.bot) return;
    let args = message.content.substring(debugprefix.length).split(" ");

    switch(args[0]){
    case'hi':
    message.channel.send("hi")
    message.channel.send(message.content)
        break;
    case'songname':
        splice = message.content
        splice = splice.substring(10, splice.length)
        songname = splice
        newanswer = splice
        console.log("Changed variable songname & newanswer to " + songname)
        message.channel.send("Changed variable songname & newanswer to " + newanswer)
        try{
            getsongname = await findsonginformation(songname)
            console.log(getsongname)
            songname = getsongname[0]
            realname = getsongname[1]
            character = getsongname[2]
            difficulty = getsongname[3]
            message.channel.send("Added " + getsongname[0] + ", " + getsongname[1] + ", " + getsongname[2] + ", " + getsongname[3])
        } catch(error) {
            message.channel.send("Cannot find that song")
        }
        break;
    case'realname':
        splice = message.content
        splice = splice.substring(10, splice.length)
        realname = splice
        console.log("Changed variable realname to " + realname)
        message.channel.send("Changed variable realname to " + realname)
        break;
    case'songname1':
        splice = message.content
        splice = splice.substring(11, splice.length)
        songname1 = splice
        console.log("Changed variable songname1 to " + songname1)
        message.channel.send("Changed variable songname1 to " + songname1)
        try{
            getsongname = await findsonginformation(songname1, 1)
            songname1 = getsongname[0]
            realname1 = getsongname[1]
            character1 = getsongname[2]
            difficulty1 = getsongname[3]
            message.channel.send("Added " + getsongname[0] + ", " + getsongname[1] + ", " + getsongname[2] + ", " + getsongname[3])
        } catch(error) {
            message.channel.send("Cannot find that song")
        }
        break;
    case'songname2':
        splice = message.content
        splice = splice.substring(11, splice.length)
        songname2 = splice
        console.log("Changed variable songname2 to " + songname2)
        message.channel.send("Changed variable songname2 to " + songname2)
        try{
            getsongname = await findsonginformation(songname2, 2)
            songname2 = getsongname[0]
            realname2 = getsongname[1]
            character2 = getsongname[2]
            difficulty2 = getsongname[3]
            message.channel.send("Added " + getsongname[0] + ", " + getsongname[1] + ", " + getsongname[2] + ", " + getsongname[3])
        } catch(error) {
            message.channel.send("Cannot find that song")
        }
        break;
    case'songname3':
        splice = message.content
        splice = splice.substring(11, splice.length)
        songname3 = splice
        console.log("Changed variable songname3 to " + songname3)
        message.channel.send("Changed variable songname3 to " + songname3)
        try{
            getsongname = await findsonginformation(songname3, 3)
            songname3 = getsongname[0]
            realname3 = getsongname[1]
            character3 = getsongname[2]
            difficulty3 = getsongname[3]
            message.channel.send("Added " + getsongname[0] + ", " + getsongname[1] + ", " + getsongname[2] + ", " + getsongname[3])
        } catch(error) {
            message.channel.send("Cannot find that song")
        }
        break;
    case'songname4':
        splice = message.content
        splice = splice.substring(11, splice.length)
        songname4 = splice
        console.log("Changed variable songname4 to " + songname4)
        message.channel.send("Changed variable songname4 to " + songname4)
        try{
            getsongname = await findsonginformation(songname4, 4)
            songname4 = getsongname[0]
            realname4 = getsongname[1]
            character4 = getsongname[2]
            difficulty4 = getsongname[3]
            message.channel.send("Added " + getsongname[0] + ", " + getsongname[1] + ", " + getsongname[2] + ", " + getsongname[3])
        } catch(error) {
            message.channel.send("Cannot find that song")
        }
        break;
    case'songname5':
        splice = message.content
        splice = splice.substring(11, splice.length)
        songname5 = splice
        console.log("Changed variable songname5 to " + songname5)
        message.channel.send("Changed variable songname5 to " + songname5)
        try{
            getsongname = await findsonginformation(songname5, 5)
            songname5 = getsongname[0]
            realname5 = getsongname[1]
            character5 = getsongname[2]
            difficulty5 = getsongname[3]
            message.channel.send("Added " + getsongname[0] + ", " + getsongname[1] + ", " + getsongname[2] + ", " + getsongname[3])
        } catch(error) {
            message.channel.send("Cannot find that song")
        }
        break;
    case'songname6':
        splice = message.content
        splice = splice.substring(11, splice.length)
        songname6 = splice
        console.log("Changed variable songname6 to " + songname6)
        message.channel.send("Changed variable songname6 to " + songname6)
        try{
            getsongname = await findsonginformation(songname6, 6)
            songname6 = getsongname[0]
            realname6 = getsongname[1]
            character6 = getsongname[2]
            difficulty6 = getsongname[3]
            message.channel.send("Added " + getsongname[0] + ", " + getsongname[1] + ", " + getsongname[2] + ", " + getsongname[3])
        } catch(error) {
            message.channel.send("Cannot find that song")
        }
        break;
    case'starttime':
        splice = message.content
        splice = splice.substring(11, splice.length)
        starttime = splice
        console.log("Changed variable starttime to " + starttime)
        message.channel.send("Changed variable starttime to " + starttime)
        break;
    case'starttime1':
        splice = message.content
        splice = splice.substring(12, splice.length)
        starttime1 = splice
        console.log("Changed variable starttime1 to " + starttime1)
        message.channel.send("Changed variable starttime1 to " + starttime1)
        break;
    case 'starttime2':
        splice = message.content
        splice = splice.substring(12, splice.length)
        starttime2 = splice
        console.log("Changed variable starttime2 to " + starttime2)
        message.channel.send("Changed variable starttime2 to " + starttime2)
        break;
    case'starttime3':
        splice = message.content
        splice = splice.substring(12, splice.length)
        starttime3 = splice
        console.log("Changed variable starttime3 to " + starttime3)
        message.channel.send("Changed variable starttime3 to " + starttime3)
        break;
    case 'starttime4':
        splice = message.content
        splice = splice.substring(12, splice.length)
        starttime4 = splice
        console.log("Changed variable starttime4 to " + starttime4)
        message.channel.send("Changed variable starttime4 to " + starttime4)
        break;
    case'starttime5':
        splice = message.content
        splice = splice.substring(12, splice.length)
        starttime5 = splice
        console.log("Changed variable starttime5 to " + starttime5)
        message.channel.send("Changed variable starttime5 to " + starttime5)
        break;
    case'starttime6':
        splice = message.content
        splice = splice.substring(12, splice.length)
        starttime6 = splice
        console.log("Changed variable starttime6 to " + starttime6)
        message.channel.send("Changed variable starttime6 to " + starttime6)
        break;
    case'ischromatic':
        ischromatic = !ischromatic
        console.log("Set ischromatic to " + ischromatic)
        message.channel.send("Set ischromatic to " + ischromatic)
        break;
    case'isscrambled':
        isscrambled = !isscrambled
        console.log("Set isscrambled to " + isscrambled)
        message.channel.send("Set isscrambled to " + isscrambled)
        break;
    case'ishardmode':
        ishardmode = !ishardmode
        console.log("Set ishardmode to " + ishardmode)
        message.channel.send("Set ishardmode to " + ishardmode)
        break;
    case'isnormal':
        isnormal = !isnormal
        console.log("Set isnormal to " + isnormal)
        message.channel.send("Set isnormal to " + isnormal)
        break;
    case'isduo':
        isduo = !isduo
        console.log("Set isduo to " + isduo)
        message.channel.send("Set isduo to " + isduo)
        isnormal = !isnormal
        console.log("Set isnormal to " + isnormal)
        message.channel.send("Set isnormal to " + isnormal)
        break;
    case 'isquad':
        isquad = !isquad
        console.log("Set isquad to " + isquad)
        message.channel.send("Set isquad to " + isquad)
        isnormal = !isnormal
        console.log("Set isnormal to " + isnormal)
        message.channel.send("Set isnormal to " + isnormal)
        break;
    case 'isfragmented':
        isfragmented = !isfragmented
        console.log("Set isfragmented to " + isfragmented)
        message.channel.send("Set isfragmented to " + isfragmented)
        break;
    case'isspecial':
        isspecial = !isspecial
        console.log("Set isspecial to " + isspecial)
        message.channel.send("Set isspecial to " + isspecial)
        break;
    case 'isreverse':
        isreverse = !isreverse
        console.log("Set isreverse to " + isreverse)
        message.channel.send("Set isreverse to " + isreverse)
        break;
    case'clearset':
        usedCommands.clear()
        console.log("cleared set usedcommands")
        message.channel.send("cleared set usedcommands")
        console.log(usedCommands)
        break;
    case'reloadvalidanswers':
        loadvalidanswers()
        console.log("+reloadvalidanswers was used")
        message.channel.send("reloaded valid answers")
        break
    case 'checkfiles' :
        response = message.content;
        response = response.substring(12, response.length);
        try {
            checkFiles(response)
            .catch((error) => {
                console.log(error)
                message.channel.send(error)
                
            });
        } catch (error) {
            message.channel.send("There was an error")
        }
        function checkFiles(filename){
            return new Promise(async (resolve, reject) => {
                message.channel.send("Starting...")
                fs.readFile(filename, "utf-8", async function(err, data){
                if(err) {
                    reject(err);
                }
                if (data == undefined) {
                    reject("The file does not exist")
                } else {
                // note: this assumes `data` is a string - you may need
                //       to coerce it - see the comments for an approach
                var lines = data.split('\n');
               
                for (i = 0; i < lines.length; i++) {
                    var song  = lines[i].split("=");
                    console.log(song[0])
                    try{
                    await processvideo("./songlist/" + song[0] + ".mp4", "./temp/temp.mp4", false, 0, 0.1);
                    } catch (error) {
                        console.log(error.message)
                        message.channel.send(error.message);
                    }
                }
                message.channel.send("Finished!")
                resolve()
                }
            })
            })
          }
        break;
    case 'storecurrentinfo' :
        storeCytusHeardleInfo();
        message.channel.send("Current Cytus Heardle info stored")
        break;
    case 'generateDungeon' :
        newDungeon = await generateDungeon();
        await saveDungeon(newDungeon);
        message.channel.send("New dungeon has been generated")
        break;
    case 'generateDailyShop' :
        generateShop(dungeonShop, false);
        await saveShop(dungeonShop)
        message.channel.send("New daily shop has been generated")
        break;
    case 'generateWeeklyShop' :
        generateShop(dungeonShop, true);
        await saveShop(dungeonShop)
        message.channel.send("New weekly shop has been generated")
        break;
    case 'modify':
          if (message.author.id == 412950175342919680 || message.author.id == 620074662994640926) {
            for(i = 0; i < playerlist.length; i++) {
                if(playerlist[i].getId() == args[1]) {
                    playerlist[i].modifyCoins(parseInt(args[2]));
                    message.channel.send(`<@${playerlist[i].getId()}> got ` + args[2] + ' CAPSO Coins added/subtracted to their profile')
                }
            }
          }
        break;
    case 'newCytusHeardle':
        newCytusHeardle = !newCytusHeardle;
        storeCytusHeardleInfo()
        message.channel.send("set newCytusHeardle to " + newCytusHeardle);
        break;
    case 'hii':
            newDungeon = await generateDungeon()
            await saveDungeon(newDungeon);
            generateShop(dungeonShop, true);
            await saveShop(dungeonShop)
            
        break;
    }

})

deckprocessed = 0
client.on('messageCreate', async (message)=>{
    if(!message.content.startsWith(otherprefix) || message.author.bot) return;
    let args = message.content.substring(debugprefix.length).split(" ");

    switch(args[0]){
        case'deck':
        if(deckprocessed == 0){
        processdeck()
        deckprocessed = 1
        sleeptime = 1000
        }else{
            sleeptime = 0
        }
        message.channel.send("Here is your deck:")
            let deck = ""
            sleep(sleeptime).then(() => {
                for(i=1;i<=20;i++){
                    randomIndex = Math.floor(Math.random() * cardlist.length);
                    deck = deck + cardlist[randomIndex][0] + "\n"
                    //console.log(cardlist[randomIndex][0])
                }
                message.channel.send(deck)
            })
            break;
        case'rcs':
        case'randomcytussong':
        try{ 
        fs.readFile("songnamestrue.txt", "utf-8", function(err, data){
            if(err) {
                throw err;
            }
        
            // note: this assumes `data` is a string - you may need
            //       to coerce it - see the comments for an approach
            var lines = data.split('\n');
            
            //while(ready == 0){
            // choose one of the lines...
            var line = lines[Math.floor(Math.random()*lines.length)]
      
      
            //line = line.substring(0,line.length-1)
      
            line = line.split('=')
            console.log("random cytus song is: " + realname)
            message.channel.send("the random song is "+ line[1]+ " from "+ line[2])
      
      
            
              //}
      
         })
        } catch (error) {
            message.channel.send("there was an error");
        }
            break;
        case 'ip' :
            axios.get('https://api.ipify.org?format=json')
            .then(response => {
              const publicIPv4 = response.data.ip;
              message.channel.send('The IP address is: ' + publicIPv4)
              console.log('Your public IPv4 address is:', publicIPv4);
            })
            .catch(error => {
              console.error('Error fetching public IPv4 address:', error);
            });
            break;
        }
    function processdeck(){
        fs.readFile("./other/inscryption.txt", "utf-8", function(err, data){
            if(err) {
                throw err;
            }
            var lines = data.split("\n")
            
            cardlist = lines.map(line => line.split(','));
        }) 
        
    }
})

client.login(currentBotToken);
//main();


/*
Notes:
refences:
sleep(2000).then(() => {loadprofiles()})

Ctrl C to stop the program
cd to change destination
if that dosent work, use D: to change to D drive
cd D:
cd CytusHeardleBot
node .
Cytus Hearlde Bot TEST token: ''
Cytus Heardle Bot token: ''
Cytus Heardle channel ID:  '958518859072172132'
Cytus Hearlde warehouse ID: '965929751560736808'
Cytus Hearlde live test ID: '1039741662861205585'

Tick: <:tick:950613255645171762>
Gemz: <:Gemz:955971112431419422>
hehehebutinreallife: <:hehehebutinreallife:945034814489239683>
Miku: <:Miku:910327131857358909>
MM: <:MM:640720107475042314> 

Steps for updating live build:
(1) uncomment the ffmpeg.setFfmpegPath thing at the top (the rest thing thats commented doesnt matter I think)
(2) change currentBotMode at the top to something thats not test (for slash commands, not implemented for the other stuff)
(3) change the token at the bottom at client.login to the live CytusHeardleBottoken
(4) change the channelid for sending Cytus Heardles to the CytusHeardleChannel ID
(5) chance in -dungeon the test to false if it is true
If getting the format error:
npm i fluent-ffmpeg
change the variables for the sleep() functions

Testing:
(1) if creating the heardle works
(2) if creating it on all gamemodes work
(3) For some reason it uses \r instead of \n so change it (might not be right)
(4) idk other stuff I made this update

When creating new things to player profiles:
(1) Add the number to the end of every person in profiles.txt
(2) Add it to the player class
(3) Add another 0 in createprofile
(4) Add a playerlist[i][number] to findprofile
(5) Add new thing at the top of saveprofiles with userlist
(6) Add it to -profile command
what profiles.txt means:
Player ID, Capso Coins, Lifetime Capso Coins, Current Streak, Highest Streak. Fame Points, Opt in to ping
*/



//Good example of adding reactions
/*
try {
    // Send a message and add a reaction to it
    const sentMessage = await message.channel.send("React to this message with 👍 or 👎");
    await sentMessage.react("1️⃣");
    await sentMessage.react("2️⃣");
  
    // Set up a filter to listen for the reaction from the user who sent the original message
    const filter = (reaction, user) => {
      return ["👍", "👎"].includes(reaction.emoji.name) && user.id === message.author.id;
    };
  
    // Wait for the user to react
    const collector = sentMessage.createReactionCollector(filter, { max: 1, time: 60000, errors: ["time"] });
    collector.on("collect", (reaction,user) => {
      // Send a response based on the user's reaction
      message.channel.send("You reacted with "+ reaction.emoji.name + "!");
      collector.stop()

    });

    collector.on('end', collected=>{
        console.log("Finished collecting")
        console.log(`Collected ${collected.size} reaction(s)`);
    })
  } catch (error) {
    console.log(error);
    await message.channel.send("There was an error processing your request.");
  }
  */
  
  

//old chromatic CAPSO Coins distribution code
/*
correctguesscandidate1 = matches.indexOf('640720107475042314')
correctguesscandidate2 = matches.indexOf('945034814489239683')
correctguesscandidate3 = matches.indexOf('910327131857358909')
console.log(correctguesscandidate1)
console.log(correctguesscandidate2)
console.log(correctguesscandidate3)
if (correctguesscandidate1 != -1 && correctguesscandidate2 != -1){
if (correctguesscandidate2 < correctguesscandidate1){
    correctguesscandidate1 = correctguesscandidate2
} 
}else if (correctguesscandidate1 == -1){
    correctguesscandidate1 = correctguesscandidate2
    console.log(correctguesscandidate1)
}

if (correctguesscandidate3 != -1){
    if (correctguesscandidate1 != -1){
    if (correctguesscandidate3 < correctguesscandidate1){
    correctguesscandidate1 = correctguesscandidate3
}
} else if (correctguesscandidate1 == -1){
    correctguesscandidate1 = correctguesscandidate3
}
}
if (correctguesscandidate1 == -1 && correctguesscandidate2 == -1 && correctguesscandidate3 == -1){
    reward = 0
}else{
       correctguessindex = correctguesscandidate1
       console.log(correctguessindex)

    if (correctguessindex == 0){
        reward = reward + 8
        //console.log("8 capso coin reward")
    } else if (correctguessindex == 1){
        reward = reward + 6
        //console.log("6 capso coin reward")
    } else if (correctguessindex == 2){
        reward = reward + 4
    } else if (correctguessindex == 3){
        reward = reward + 3
    } else if (correctguessindex == 4){
        reward = reward + 2
    } else if (correctguessindex == 5){
        reward = reward + 1
    }

    for (i = 0; i<=5;i++){
        if(matches[i] == '640720107475042314' || matches[i] == '945034814489239683' || matches[i] == '910327131857358909'){
            reward = reward + 2
           }
    }
    reward = reward -2

    for (i=0; i<=5 ; i++){
        if(matches[i] == '955971112431419422'){
            reward = reward + 0.5
        }
    }
}
*/

enemyBank = {
    skeleton: new Enemy("Skeleton", 50, 8, [], [[new Attack(0, 25, [], 0, 1)]]),
    bat: new Enemy("bat", 20, 6, [], [[new Attack(0, 25, [], 0, 1)]]),
    barbarian: new Enemy("Barbarian", 200, 10, [], [[new Attack(0, 50, [], 0, 1)]]),
    archer: new Enemy("Archer", 125, 8, [], [[new Attack(0, 30, [], 0, 1)]]),
    wizard: new Enemy("Wizard", 150, 10, [], [[new Attack(2, 50, [new Ailment(0, 20, 3)], 0, 1)]]),
    dragon: new Enemy("Dragon", 500, 20, [], [[new Attack(0, 100, [new Ailment(0, 75, 3)], 0, 1)]]),
    golem: new Enemy("Golem", 1500, 20, [[2, 'golemite', 'golemite'], [4, 50]], [[new Attack(0, 200, [], 0, 1)]]),
    golemite: new Enemy("Golemite", 750, 20, [[4, 25]], [[new Attack(0, 50, [], 0, 1)]]),
    witch: new Enemy("Witch", 200, 5, [], [[new Attack(0, 40, [], 0, 1)], [new Attack(0, 0, [new Ailment(11, ["skeleton", "skeleton", "skeleton"], 0)], 2, 1)]]),
    night_witch: new Enemy("Night Witch", 200, 6, [], [[new Attack(0, 50, [], 0, 1)], [new Attack(0, 0, [new Ailment(11, ["bat", "bat"], 0)], 2, 1)]]),
    skeleton_barrel: new Enemy("Skeleton Barrel", 200, 10, [[2, 'skeleton', 'skeleton', 'skeleton', 'skeleton', 'skeleton']], [[new Attack(0, 0, [], 0, 5)], [new Attack(4, 200, [], 0, 1)]]),
    battle_healer: new Enemy("Battle Healer", 250, 10, [], [[new Attack(0, 50, [], 0, 1), new Attack(3, 50, [], 0, 1)]]),
    healer: new Enemy("Healer", 250, 10, [], [[new Attack(3, 50, [], 0, 1)]]),
    bomb: new Enemy("bomb", 200, 10, [[1, 200]], [[new Attack(0, 0, [], 0, 1)], [new Attack(4, 100, [], 1, 1)]] ),
    giant_skeleton: new Enemy("Giant Skeleton", 500, 10, [[2, 'bomb']], [[new Attack(0, 50, [], 0, 1)]]),
    ice_wizard: new Enemy("Ice Wizard", 150, 10, [], [[new Attack(0, 25, [new Ailment(12, 1, 1)], 0, 1)]]),
    goblin_barrel: new Enemy("Goblin Barrel", 100, 10, [[2, 'goblin', 'goblin', 'goblin']], [[new Attack(4, 100, [], 0, 1)]]),
    prince: new Enemy("Prince", 350, 10, [], [[new Attack(0, 50, [], 0, 1)], [new Attack(4, 0, [new Ailment(3, 100, 1)], 0, 1)]]),
    goblin: new Enemy("Goblin", 100, 6, [], [[new Attack(0, 50, [], 0, 1)]]),
    spear_goblin: new Enemy("Spear Goblin", 75, 5, [], [[new Attack(0, 50, [], 0, 1)]]),
    giant: new Enemy("Giant", 500, 14, [], [[new Attack(0, 100, [], 0, 1)]]),
    bomber: new Enemy("Bomber", 200, 10, [], [[new Attack(2, 50, [], 0, 1)]]),
    balloon: new Enemy("Balloon", 200, 20, [], [[new Attack(0, 100, [], 0, 1)]]),
    lava_hound: new Enemy("Lava Hound", 1000, 10, [[2, 'lava_pup', 'lava_pup', 'lava_pup', 'lava_pup', 'lava_pup', 'lava_pup']], [[new Attack(0, 25, [], 0, 1)]]),
    lava_pup: new Enemy("Lava Pup", 85, 10, [], [[new Attack(0, 35, [], 0, 1)]]),
    elixir_golem: new Enemy("Elixir Golem", 500, 16, [[2, 'elixir_golemite', 'elixir_golemite']], [[new Attack(0, 100, [], 0, 1)]]),
    elixir_golemite: new Enemy("Elixir Golemite", 250, 10, [[2, 'elixir_blob', 'elixir_blob']], [[new Attack(0, 50, [], 0, 1)]]),
    elixir_blob: new Enemy("Elixir Blob", 100, 6, [], [[new Attack(0, 25, [], 0, 1)]]),
    hog_rider: new Enemy("Hog Rider", 300, 6, [], [[new Attack(0, 75, [], 0, 1)]]),
    pekka: new Enemy("P.E.K.K.A", 1000, 30, [], [[new Attack(0, 200, [], 0, 1)]]),
    mega_knight: new Enemy("Mega Knight", 1000, 14, [], [[new Attack(0, 75, [], 0, 1)], [new Attack(2, 150, [new Ailment(8, 75, 1)], 4, 1)]]),
    dropship: new Enemy("Dropship", 300, 20, [[4, 100]], [[new Attack(0, 0, [new Ailment(11, ['skeleton', 'skeleton', 'skeleton'])])]]),
    guard: new Enemy("Guard", 100, 8, [[2, 'skeleton']], [[new Attack(0, 25, [], 0, 1)]]),
    electro_dragon: new Enemy("Electro Dragon", 750, 20, [], [[new Attack(2, 200, [], 0, 1)]]),
    dart_goblin: new Enemy("Dart Goblin", 150, 3, [], [[new Attack(0, 50, [], 0, 1)]]),
    musketeer: new Enemy("Musketeer", 400, 10, [], [[new Attack(0, 150, [], 0, 1)]]),
    minion: new Enemy("Minion", 75, 10, [], [[new Attack(0, 30, [], 0, 1)]]),
    wallbreaker: new Enemy("Wallbreaker", 175, 15, [], [[new Attack(0, 200, [], 0, 1), new Attack(4, 200, [], 0, 1)]]),
    cannon: new Enemy("Cannon", 500, 10, [], [[new Attack(0, 50, [], 0, 1)]]),
    archer_tower: new Enemy("Archer Tower", 450, 8, [], [[new Attack(0, 50, [], 0, 1)]]),
    mortar: new Enemy("Mortar", 600, 10, [], [[new Attack(2, 50, [], 0, 1)]]),
    geared_up_archer_tower: new Enemy("Archer Tower (geared up)", 450, 3, [], [[new Attack(0, 50, [], 0, 1)]]),
    geared_up_cannon: new Enemy("Cannon (geared up)", 500, 10, [], [[new Attack(0, 50, [], 0, 1)], [new Attack(0, 50, [], 0, 1)], [new Attack(0, 50, [], 0, 1)], [new Attack(0, 50, [], 0, 1)]]),
    geared_up_mortar: new Enemy("Mortar", 600, 10, [], [[new Attack(2, 50, [], 0, 1), new Attack(2, 50, [], 0, 1), new Attack(2, 50, [], 0, 1)]]),
    xbow: new Enemy("Xbow", 650, 3, [], [[new Attack(0, 25, [], 0, 1)]]),
    eagle_artillery: new Enemy("Eagle Artillery", 1000, 20, [], [[new Attack(0, 200, [], 0, 1), new Attack(0, 200, [], 0, 1), new Attack(0, 200, [], 0, 1)]]),
    scattershot: new Enemy("Scattershot", 700, 15, [], [[new Attack(0, 500, [], 0, 1)], [new Attack(0, 100, [], 0, 1)], [new Attack(0, 100, [], 0, 1)]]),
    goblin_hut: new Enemy("Goblin Hut", 500, 10, [[2, 'spear_goblin', 'spear_goblin', 'spear_goblin']], new Attack(0, 0, [new Ailment(11, ['spear_goblin', 'spear_goblin'])])),
    archer_queen: new Enemy("Archer Queen", 2000, 3, [], [[new Attack(-1, 50, [], 0, 1)]]),
    royal_champion: new Enemy("Royal Champion", 1500, 5, [], [[new Attack(-2, 65, [], 0, 1)]]),
    pixie: new Enemy("Pixie", 50, 8, [], [[new Attack(0, 5, [new Ailment(4, 25, 3)], 0, 1)]]),
    squirrel: new Enemy("Squirrel", 100, 10, [], [[new Attack(0, 5, [], 0, 1)]]),
    crawlid: new Enemy("Crawlid", 75, 10, [], [[new Attack(0, 15, [], 0, 1)]]),
    hedgehog: new Enemy("Hedgehog", 100, 10, [], [[new Attack(0, 35, [], 0, 1)]]),
    numbskull: new Enemy("Numbskull", 50, 20, [], [[new Attack(0, 50, [], 0, 1)]]),
    meowbot: new Enemy("MeowBot", 150, 10, [], [[new Attack(0, 50, [], 0, 1)]]),
    meowbotv2: new Enemy("MeowBot V2.0", 200, 10, [], [[new Attack(0, 75, [], 0, 1)]]),
    super_meowbot: new Enemy("Super MeowBot", 500, 10, [], [[new Attack(0, 150, [], 0, 1)], [new Attack(0, 150, [new Ailment(5, 30, 3)], 0, 1)]]),
    baby_aloe: new Enemy("Baby Aloe", 300, 5, [], [[new Attack(1, 50, [], 0, 1)]]),
    classic_aloe: new Enemy("Classic Aloe", 300, 5, [], [[new Attack(1, 50, [], 0, 1), new Attack(1, 50, [], 0, 1)]]),
    super_aloe: new Enemy("Super Aloe", 300, 5, [], [[new Attack(1, 50, [], 0, 1), new Attack(1, 50, [], 0, 1), new Attack(1, 50, [], 0, 1)]]),
    super_aloe_sp: new Enemy("Super Aloe", 300, 5, [], [[new Attack(1, 50, [], 0, 10), new Attack(1, 50, [], 0, 1), new Attack(1, 50, [], 0, 1)], [new Attack(1, 50, [new Ailment(10, 50, 1)], 0, 1), new Attack(1, 50, [new Ailment(10, 50, 1)], 0, 1), new Attack(1, 50, [new Ailment(10, 50, 1)], 0, 1)]]),
    ultra_aloe: new Enemy("Ultra Aloe", 300, 5, [], [[new Attack(1, 50, [], 0, 10), new Attack(1, 50, [], 0, 1), new Attack(1, 50, [], 0, 1), new Attack(1, 50, [], 0, 1)], [new Attack(1, 50, [new Ailment(10, 50, 1)], 0, 10), new Attack(1, 50, [new Ailment(10, 50, 1)], 0, 1), new Attack(1, 50, [new Ailment(10, 50, 1)], 0, 1), new Attack(1, 50, [new Ailment(10, 50, 1)], 0, 1)]]),
    ultra_aloe_sp: new Enemy("Ultra Aloe", 300, 5, [], [[new Attack(1, 50, [], 0, 10), new Attack(1, 50, [], 0, 1), new Attack(1, 50, [], 0, 1), new Attack(1, 50, [], 0, 1)], [new Attack(1, 50, [new Ailment(10, 50, 2)], 0, 10), new Attack(1, 50, [new Ailment(10, 50, 2)], 0, 1), new Attack(1, 50, [new Ailment(10, 50, 2)], 0, 1), new Attack(1, 50, [new Ailment(10, 50, 2)], 0, 1)]]),
    ultra_aloe_sp_sp: new Enemy("Ultra Aloe", 300, 5, [], [[new Attack(1, 50, [], 0, 10), new Attack(1, 50, [], 0, 1), new Attack(1, 50, [], 0, 1), new Attack(1, 50, [], 0, 1)], [new Attack(1, 50, [new Ailment(10, 50, 4)], 0, 10), new Attack(1, 50, [new Ailment(10, 50, 4)], 0, 1), new Attack(1, 50, [new Ailment(10, 50, 4)], 0, 1), new Attack(1, 50, [new Ailment(10, 50, 4)], 0, 1)]]),
    ultimate_aloe: new Enemy("Ultimate Aloe", 300, 5, [], [[new Attack(1, 50, [], 0, 1), new Attack(1, 50, [], 0, 1), new Attack(1, 50, [], 0, 1), new Attack(1, 50, [], 0, 1), new Attack(1, 50, [], 0, 1)], [new Attack(1, 50, [new Ailment(10, 50, 4)], 0, 10), new Attack(1, 50, [new Ailment(10, 50, 4)], 0, 1), new Attack(1, 50, [new Ailment(10, 50, 4)], 0, 1), new Attack(1, 50, [new Ailment(10, 50, 4)], 0, 1), new Attack(1, 50, [new Ailment(10, 50, 4)], 0, 1)]]),
    peashooter: new Enemy("Peashooter", 300, 5, [], [[new Attack(0, 50, [], 0, 1)]]),
    repeater: new Enemy("Repeater", 300, 5, [], [[new Attack(0, 50, [], 0, 1), new Attack(0, 50, [], 0, 1)]]),
    treepeater: new Enemy("Threepeater", 300, 5, [], [[new Attack(0, 50, [], 0, 1), new Attack(0, 50, [], 0, 1), new Attack(0, 50, [], 0, 1)]]),
    threepeater_sp: new Enemy("Threepeater", 300, 5, [], [[new Attack(0, 50, [], 0, 10), new Attack(0, 50, [], 0, 1), new Attack(0, 50, [], 0, 1)], [new Attack(0, 50, [new Ailment(10, 50, 1)], 0, 1), new Attack(0, 50, [new Ailment(10, 50, 1)], 0, 1), new Attack(0, 50, [new Ailment(10, 50, 1)], 0, 1)]]),
    gatlingpea: new Enemy("Gatling Pea", 300, 5, [], [[new Attack(0, 50, [], 0, 10), new Attack(0, 50, [], 0, 1), new Attack(0, 50, [], 0, 1), new Attack(0, 50, [], 0, 1)], [new Attack(0, 50, [new Ailment(10, 50, 1)], 0, 10), new Attack(0, 50, [new Ailment(10, 50, 1)], 0, 1), new Attack(0, 50, [new Ailment(10, 50, 1)], 0, 1), new Attack(0, 50, [new Ailment(10, 50, 1)], 0, 1)]]),
    gatlingpea_sp: new Enemy("Gatling Pea", 300, 5, [], [[new Attack(0, 50, [], 0, 10), new Attack(0, 50, [], 0, 1), new Attack(0, 50, [], 0, 1), new Attack(0, 50, [], 0, 1)], [new Attack(0, 50, [new Ailment(10, 50, 2)], 0, 10), new Attack(0, 50, [new Ailment(10, 50, 2)], 0, 1), new Attack(0, 50, [new Ailment(10, 50, 2)], 0, 1), new Attack(0, 50, [new Ailment(10, 50, 2)], 0, 1)]]),
    gatlingpea_sp_sp: new Enemy("Gatling Pea", 300, 5, [], [[new Attack(0, 50, [], 0, 10), new Attack(0, 50, [], 0, 1), new Attack(0, 50, [], 0, 1), new Attack(0, 50, [], 0, 1)], [new Attack(0, 50, [new Ailment(10, 50, 4)], 0, 10), new Attack(0, 50, [new Ailment(10, 50, 4)], 0, 1), new Attack(0, 50, [new Ailment(10, 50, 4)], 0, 1), new Attack(0, 50, [new Ailment(10, 50, 4)], 0, 1)]]),
    mega_gatlingpea: new Enemy("Mega Gatling Pea", 300, 5, [], [[new Attack(0, 50, [], 0, 1), new Attack(0, 50, [], 0, 1), new Attack(0, 50, [], 0, 1), new Attack(0, 50, [], 0, 1), new Attack(0, 50, [], 0, 1)], [new Attack(0, 50, [new Ailment(10, 50, 4)], 0, 10), new Attack(0, 50, [new Ailment(10, 50, 4)], 0, 1), new Attack(0, 50, [new Ailment(10, 50, 4)], 0, 1), new Attack(0, 50, [new Ailment(10, 50, 4)], 0, 1), new Attack(0, 50, [new Ailment(10, 50, 4)], 0, 1)]]),
    crow: new Enemy("Crow", 250, 10, [], [[new Attack(0, 50, [new Ailment(1, 25, 5)], 0, 1)]]),
    mortis: new Enemy("Mortis", 700, 14, [], [[new Attack(0, 100, [], 0, 5)], [new Attack(2, 100, [], 5, 1), new Attack(1, 0, [new Ailment(9, 100, 5)])]]),
    mouse_bot: new Enemy("Mouse Bot", 200, 4, [], [[new Attack(0, 25, [], 0, 1)]]),
    boxing_bot: new Enemy("Boxing Bot", 600, 6, [], [[new Attack(0, 75, [], 0, 1)]]),
    sniper_bot: new Enemy("Sniper Bot", 400, 10, [], [[new Attack(0, 100, [], 0, 1)]]),
    sleeper: new Enemy("Sleeper"),
    shooter_sleeper: new Enemy("Ranged sleeper"),
    big_guy: new Enemy("Big guy"),
    charger_sleeper: new Enemy("Charger Sleeper"),
    tentacle_sleeper: new Enemy("Tentacle Sleeper")
}

/**
             * index:
             * 0 - floor 1 enemies
             * 1 - floor 1 bosses
             * 2 - floor 2 enemies
             * 3 - floor 2 bosses
             */
clashBattleRooms = [
    [
new DungeonRoom(0, "", [enemyBank.skeleton.copy(), enemyBank.skeleton.copy(), enemyBank.skeleton.copy()]),
new DungeonRoom(0, "", [enemyBank.dragon.copy()]),
new DungeonRoom(0, "", [enemyBank.giant.copy(), enemyBank.bomber.copy()]),
new DungeonRoom(0, "", [enemyBank.lava_hound.copy(), enemyBank.balloon.copy()]),
new DungeonRoom(0, "", [enemyBank.elixir_golem.copy()]),
new DungeonRoom(0, "", [enemyBank.wizard.copy(), enemyBank.witch.copy()]),
new DungeonRoom(0, "", [enemyBank.skeleton_barrel.copy(), enemyBank.balloon.copy()]),
new DungeonRoom(0, "", [enemyBank.goblin_barrel.copy(), enemyBank.giant.copy()]),
new DungeonRoom(0, "", [enemyBank.guard.copy(), enemyBank.guard.copy(), enemyBank.guard.copy(), enemyBank.wizard.copy()]),
new DungeonRoom(0, "", [enemyBank.golem.copy(), enemyBank.witch.copy()]),
new DungeonRoom(0, "", [enemyBank.goblin.copy(), enemyBank.goblin.copy(), enemyBank.goblin.copy(), enemyBank.goblin.copy(), enemyBank.prince.copy()]),
new DungeonRoom(0, "", [enemyBank.battle_healer.copy(), enemyBank.elixir_golem.copy()]),
new DungeonRoom(0, "", [enemyBank.dragon.copy(), enemyBank.balloon.copy(), enemyBank.balloon.copy(), enemyBank.balloon.copy()]),
new DungeonRoom(0, "", [enemyBank.hog_rider.copy(), enemyBank.ice_wizard.copy()]),
new DungeonRoom(0, "", [enemyBank.pekka.copy(), enemyBank.dropship.copy()]),
new DungeonRoom(0, "", [enemyBank.mega_knight.copy()]),
new DungeonRoom(0, "", [enemyBank.dart_goblin.copy(), enemyBank.goblin.copy(), enemyBank.goblin.copy(), enemyBank.goblin.copy()]),
new DungeonRoom(0, "", [enemyBank.giant_skeleton.copy(), enemyBank.musketeer.copy()]),
new DungeonRoom(0, "", [enemyBank.dropship.copy(), enemyBank.minion.copy(), enemyBank.minion.copy(), enemyBank.minion.copy()]),
new DungeonRoom(0, "", [enemyBank.skeleton_barrel.copy(), enemyBank.wallbreaker.copy(), enemyBank.wallbreaker.copy()]),
new DungeonRoom(0, "", [enemyBank.pekka.copy(), enemyBank.healer.copy()]),
new DungeonRoom(0, "", [enemyBank.electro_dragon.copy(), enemyBank.balloon.copy(), enemyBank.balloon.copy(), enemyBank.balloon.copy()]),
new DungeonRoom(0, "", [enemyBank.lava_hound.copy(), enemyBank.lava_hound.copy()])
    ], 
    [
new DungeonRoom(0, "Hard encounter ahead", [enemyBank.skeleton.copy(), enemyBank.skeleton.copy(), enemyBank.skeleton.copy(), enemyBank.skeleton.copy(), enemyBank.skeleton.copy(), enemyBank.skeleton.copy(), enemyBank.skeleton.copy(), enemyBank.skeleton.copy(), enemyBank.skeleton.copy(), enemyBank.skeleton.copy(), enemyBank.skeleton.copy(), enemyBank.skeleton.copy(), enemyBank.skeleton.copy(), enemyBank.skeleton.copy(), enemyBank.skeleton.copy(), enemyBank.skeleton.copy()]),
new DungeonRoom(0, "Hard encounter ahead", [enemyBank.golem.copy(), enemyBank.witch.copy(), enemyBank.witch.copy()]),
new DungeonRoom(0, "Hard encounter ahead", [enemyBank.elixir_golem.copy(),enemyBank.elixir_golem.copy(), enemyBank.battle_healer.copy(), enemyBank.battle_healer.copy()]),
new DungeonRoom(0, "Hard encounter ahead", [enemyBank.dragon.copy(), enemyBank.dragon.copy(), enemyBank.dragon.copy(), enemyBank.dropship.copy(), enemyBank.dropship.copy()]),
new DungeonRoom(0, "Hard encounter ahead", [enemyBank.pekka.copy(), enemyBank.electro_dragon.copy(), enemyBank.hog_rider.copy(), enemyBank.hog_rider.copy()])
    ],
    [
new DungeonRoom(0, "", [enemyBank.giant_skeleton.copy(), enemyBank.skeleton_barrel.copy(), enemyBank.cannon.copy()]), 
new DungeonRoom(0, "", [enemyBank.balloon.copy(), enemyBank.balloon.copy(), enemyBank.balloon.copy(), enemyBank.archer_tower.copy()]), 
new DungeonRoom(0, "", [enemyBank.electro_dragon.copy(), enemyBank.balloon.copy(), enemyBank.goblin_hut.copy()]), 
new DungeonRoom(0, "", [enemyBank.archer.copy(), enemyBank.archer.copy(), enemyBank.archer.copy(), enemyBank.archer.copy(), enemyBank.archer.copy(), enemyBank.barbarian.copy(), enemyBank.barbarian.copy(),  enemyBank.barbarian.copy(),  enemyBank.barbarian.copy(),  enemyBank.barbarian.copy(), enemyBank.geared_up_archer_tower.copy()]), 
new DungeonRoom(0, "", [enemyBank.mega_knight.copy(), enemyBank.hog_rider.copy(), enemyBank.hog_rider.copy(), enemyBank.hog_rider.copy(), enemyBank.cannon.copy()]),
new DungeonRoom(0, "", [enemyBank.pekka.copy(), enemyBank.dropship.copy(), enemyBank.dropship.copy()]),
new DungeonRoom(0, "", [enemyBank.giant.copy(), enemyBank.healer.copy(), enemyBank.healer.copy(), enemyBank.battle_healer.copy()]),
new DungeonRoom(0, "", [enemyBank.cannon.copy(), enemyBank.cannon.copy(), enemyBank.archer_tower.copy(), enemyBank.archer_tower.copy()]),
new DungeonRoom(0, "", [enemyBank.golem.copy(), enemyBank.geared_up_cannon.copy(), enemyBank.geared_up_cannon.copy()]),
new DungeonRoom(0, "", [enemyBank.ice_wizard.copy(), enemyBank.elixir_golem.copy(), enemyBank.hog_rider.copy()])
    ],
    [
new DungeonRoom(0, "Boss Battle ahead", [enemyBank.archer_queen.copy()]),
new DungeonRoom(0, "Boss Battle ahead", [enemyBank.royal_champion.copy()]),
    ]
]

//The first 3 option in the shop (common cards)
shopTopShelf = [1, 3, 5, 7, 9, 11, 13, 15, 16, 17, 19]
shopBottomShelf = [2, 4, 6, 8, 10, 12, 14, 18, 20, 23]
summonShopOptions = [["skeleton", 1, 10], ["barbarian", 10, 30], ["wizard", 10, 30], ["dragon", 20, 40], ["witch", 10, 30], ["skeleton_barrel", 10, 30], ["battle_healer", 10, 30], ["ice_wizard", 10, 30], ["goblin_barrel", 10, 30], ["prince", 10, 30], ["goblin", 5, 10], ["giant", 10, 30]]
avaliableCharacters = ["PAFF", "NEKO#ΦωΦ", "ROBO_Head", "Ivy", "Xenon", "ConneR", "Cherry", "JOE", "Sagar", "Rin"]
regularBattleRoomCardDrops = [1, 3, 5, 7, 9, 11, 13, 15, 16, 17, 19]

abilityDescriptions = [
    ["No Ability", "Unlock ability - 10% damage buff, 1 turn", "15%, unlock Cytus Heardles (50% - 100% more damage buff) ", "20%, +1 turn duration", "25%", "30%, +1 turn", "35%, buffed person recieves 5% max HP healing", "40%, 10% max HP healing", "45% 15% max HP healing", "50%, cytus heardle now gives half the damage boost to everyone else"], 
    ["summons a meowbot (1 use) - has 50% decay", "34% decay", "1 more use, unlock boost - 1 to 2 extra.", "20% decay", "summon an additional meowbot", "1 more use", "chance to summon super meowbot - 5% chance", "meowbot get a software update and are better", "super meowbot chance increase - 10% chance", "meowbots no longer have decay"],
    ["take 50 damage and give a character a 50 HP shield (1 turn)", "+10 shield", "+2 turns, unlock Cytus Heardles (take no damage and gives shield to entire team)", "+15 shield", "125HP shield but now for 100 damage", "+25HP, +1 turn", "sheilded characters now also get a 10% damage buff (3 turns)", "+25HP, damage buff lasts for 5 turns", "every other party member gets a shield, 10% of the ability shield", "+25HP, damage buff now lasts for 10 turns"],
    ["Revive with 1 hp if you complete a 0.5 second, scrambled, reverse Cytus Heardle", "+0.2 seconds (0.7)", "revive with 10% HP", "+0.3 seconds", "remove reverse", "+0.5 seconds (1.5)", "revive with 25% HP", "+0.5 seconds", "revive with 50% HP", "give ability to someone else"], 
    ["inflicts fragile to all enemies (25%)", "+weakness", "+fear", "+freeze (1 turn)", "unlock boost - doubles effects of ailments", "upgrade fragile (50%)", "upgrade weakness", "upgrade fear", "upgrade freeze", "+2 turns (except freeze)"],
    ["deals 25 damage to every enemy (1 use)", "+5 damage (30)", "unlock boosts - does 100%-200% more base damage", "+5 damage (35)", "does 10 more damage for each additional enemy", "+5 damage (40), +5 extra damgage (15)", "inflict 5% decay if there is 7 or more enemies (3 turns)", "+10 damage (50)", "+10 extra damage (25)", "5% decay lowered to 5 or more enemies"],
    ["give someone a cherry", "Cherry heals 10x more!!!! Healing now lasts multiple turns (10 healing per turn, 3 turns. Now uses up a turn.)", "unlock boost - gives cherries to the entire team", "+10HP more healing", "ability no longer uses up a turn", "Cherry healing is now 5 turns", "healing amplified ailment (30%, 1 turn)", "+30HP Cherry healing (50)", "healing amplified ailment now lasts 3 turns", "Cherry healing duration increased to 10 turns"],
    ["gives an ally 1 healing over time drink (50 HP 3 turns)", "unlock poison, +1 use", "unlock damage boost, +1 use", "unlock fragile, +1 use", "unlock speed boost, +1 use", "unlock weakness, +1 use", "unlock boost - complete to do double effect and restore one use", "potions last for longer (3 turns -> 5 turns)", "medical use - heals JOE for 50 HP every time he uses one", "potions are stronger"],
    ["Gets a gun that can be fired 3 times, does not consume a turn (10 damage)", "gun now does 15 more damage", "gets 1 more ammo, unlock Cytus Heardles - 5 more bullets", "gets 1 more ammo", "gun has a 50% chance to burn (20, damage, 1 turn)", "burn lasts 2 additional turns", "burn does double damage", "burn chance increased to 100%", "5 more ammo", "gun has a 50% chance to do fragile (50% more damage, 2 turns)"],
    ["plants a plant that either does damage or heals the team (1 use)", "Plant upgrade (shoots an additional shot)", "unlocks boost - replenish a use", "Plant upgrade (shoots an additional shot)", "has a chance to inflict healing over time/damage over time ailment (9%)", "Plant upgrade (shoots an additional shot)", "ailment last +1 turn", "+1 use", "ailment last +2 turns", "Plant upgrade final form (shoots an additional shot. Also has cooler name)"]
]



paffsongs = 'PAFF Songs:\n' 
+ "Body Talk -> bodytalk\n"
+ "Survive -> survive\n"
+ "Bullet Waiting For me -> bulletwaitingforme\n"
+ "KANATA -> kanata\n"
+ "Fight Another Day -> fightanotherday\n"
+ "Baptism of Fire -> baptismoffire\n"
+ "Fireflies -> fireflies\n"
+ "Gravity -> gravity\n"
+ "Re:Boost -> reboost\n"
+ "Green Hope -> greenhope\n"
+ "Under the same sky -> underthesamesky\n"
+ "Winter Games -> wintergames\n"
+ "New World -> newworld\n"
+ "SECRET;WEAPON -> secretweapon\n"
+ "Lilac For Anabel -> lilacforanabel\n"
+ "Who am I? -> whoami\n"
+ "More Than Diamond -> morethandiamond\n"
+ "Recall -> recall\n"
+ "Sleeping Beast -> sleepingbeast\n"
+ "Streetlights -> streetlights\n"
+ "Save Me Now -> savemenow\n"
+ "illMenate -> illmenate\n"
+ "Mirror -> mirror\n"
nekosongs = "NEKO #ΦωΦ Songs:\n"
+ "The Spark -> thespark\n"
+ "Resurrection -> resurrection\n"
+ "One Way Love -> onewaylove\n"
+ "Happiness Breeze -> happinessbreeze\n"
+ "Alterna Pt.a -Cosmogony- -> alternapt1\n"
+ "Zealous Hearts -> zealoushearts\n"
+ "Keep It Up -> keepitup\n"
+ "CODE NAME: GAMMA -> codenamegamma\n"
+ "Blow My Mind -> blowmymind\n"
+ "Chrome VOX -> chromevox\n"
+ "Hard Landing -> hardlanding\n"
+ "Brain Power -> brainpower\n"
+ "Extinguisher -> extinguisher\n"
+ "For You The Bellz Toll -> foryouthebellztoll\n"
+ "Rei -> rei\n"
+ "響け！ -> sound\n"
+ "気楽なCloudy -> carefreecloudy\n"
+ "Dropping Lightspeed -> droppinglightspeed\n"
+ "Better Than Your Error System -> betterthanyourerrorsystem\n"
+ "Hydra -> hydra\n"
+ "Liberation -> liberation\n"
+ "Ramen Is God -> ramenisgod\n"
+ "Re:VeLΔTiØN ～光道ト破壊ノ双白翼～ -> revelation\n"
+ "Rebirth -> rebirth\n"
+ "Ready To Take The Next Step -> readytotakethenextstep\n"
+ "Afterlife -> afterlife\n"
roboheadsongs = "ROBO_Head Songs:\n"
+ "Deadly Slot Game -> deadlyslotgame\n"
+ "Make Me Brun -> makemeburn\n"
+ "Restriction -> restriction\n"
+ "Luolimasi -> luolimasi\n"
+ "Claim the Game -> claimthegame\n"
+ "Devillic Sphere -> devillicsphere\n"
+ "Pure Powerstomper -> purepowerstomper\n"
+ "Celestial Sounds -> celestialsounds\n"
+ "Grimoire of Crimson -> grimoireofcrimson\n"
+ "Dasein -> dasein\n"
+ "CHAOS -> chaos\n"
+ "EMber -> ember\n"
+ "Midnight -> midnight\n"
+ "Dead Point -> deadpoint\n"
+ "Nocturnal Type -> nocturnaltype\n"
+ "Subconscious Mind -> subconsciousmind\n"
+ "Hyperbola -> hyperbola\n"
+ "Contact -> contact\n"
+ "The Devil Will Pray -> thedevilwillpray\n"
+ "Arklight -> arklight\n"
ivysongs = "Ivy Songs:\n"
+ "Sentimental Journey -> sentimentaljourney\n"
+ "Biotonic -> biotonic\n"
+ "Alexandrite -> alexandrite\n"
+ "Tokiwatari -> tokiwatari\n"
+ "Purge -> purge\n"
+ "Area184 -> area184\n"
+ "BloodyMare -> bloodymare\n"
+ "AssaultMare -> assaultmare\n"
+ "Lunar Mare -> lunarmare\n"
+ "99 Glooms -> 99glooms\n"
+ "Pressure -> pressure\n"
+ "V. -> v\n"
+ "Halloween Party -> halloweenparty\n"
+ "Bloody Purity -> bloodypurity\n"
+ "Masquerade -> masquerade\n"
+ "Quantum Labyrinth -> quantumlabyrinth\n"
+ "Saika -> saika\n"
+ "To Further Dream -> tofurtherdream\n"
+ "Libera Me -> liberame\n"
+ "Qualia -> qualia\n"
+ "conflict -> confict\n"
+ "FREEDOM DiVE -> freedomdive\n"
+ "Summer Zephyr -> summerzephyr\n"
+ "Sovereign -> sovereign\n"
+ "paradigm-paragramme-program -> paradigm\n"
+ "Secret Garden -> secretgarden\n"
+ "Halcyon -> halcyon\n"
+ "Dystopia -> dystopia\n"
+ "UTOPIA -> utopia\n"
+ "First Gate -> firstgate\n"
+ "Oriens -> oriens\n"
+ "The Last Illusion -> thelastillusion\n"
+ "Visions -> visions\n"
+ "Digigroove -> digigroove\n"
+ "Heat Ring -> heatring\n"
+ "Leaving All Behind -> leavingallbehind\n"
+ "Symmetry -> symmetry\n"
+ "Time to Fight -> timetofight\n"
+ "Reset -> reset\n"
+ "D R G -> drg\n"
crystalpunksongs = "Crystal PuNK songs:\n"
+ "Effervesce -> effervesce\n"
+ "Chandelier XIII -> chandelier xiii\n"
+ "Sunshine Duration -> sunshineduration\n"
+ "Deep Dive -> deepdive\n"
+ "βinαrΨ -> binary\n"
+ "Dark Madness -> darkmadness\n"
+ "The Cross -> thecross\n"
+ "眷戀 -> familylove\n"
+ "Still (Piano Version) -> stillpianoversion\n"
+ "Prema Flowers -> premaflowers\n"
+ "Collide -> collide\n"
vanessasongs = "Vanessa Songs:\n"
+ "Anchor -> anchor\n"
+ "syūten -> syuten\n"
+ "Rosa Rubus -> rosarubus\n"
+ "XYZ -> xyz\n"
+ "II-V -> iiv\n"
+ "Chaos and Abyss -3rd Movement- -> chaosandabyss\n"
+ "Duality -> duality\n"
+ "Ra -> ra\n"
+ "CHAOS //System Offline// -> chaossystemoffline\n"
+ "V. //System Offline?? -> vsystemoffline\n"
+ "	͟͝͞Ⅱ́̕ -> ii\n"
+ "Used to be -> usedtobe\n"
+ "The Whole Rest -> thewholerest\n"
+ "Blessing Reunion -> blessingreunion\n"
+ "3:00 a.m. -> 300am\n"
+ "Installation -> installation\n"
+ "Risoluto -> risoluto\n"
+ "The End Years -> theendyears\n"
+ "Incyde -> incyde\n"
+ "THE BEGINNING -> thebeginning\n"
bobosongs = "Bo Bo Songs:\n"
+ "Äventyr -> aventyr\n"
+ "NORDLYS -> nordlys\n"
+ "Snow Blossom -> snowblossom\n"
+ "Quinsialyn -> quinsailyn\n"
+ "黎明-REIMEI- -> dawnreimei\n"
+ "IBUKI -> ibuki\n"
+ "The breath of the soul -> thebreathofthesoul\n"
+ "Firstborns -> firstborns\n"
+ "Heliopolis Project -> heliopolisproject\n"
+ "TSUBAKI -> tsubaki\n"
+ "Vox Enchanted -> voxenchanted\n"
+ "King of Desert -> kingofdesert\n"
+ "tRinity Saga -> trinitysaga\n"
+ "Tomb Robber -> tombrobber\n"
+ "New Quest -> newquest\n"
+ "バステット (Cytus II Edit) -> bastet\n"
graffjsongs = "Graff.J Songs:\n"
+ "Conundrum -> conundrum\n"
+ "Game on Together! -> gameonetogether\n"
+ "Drop -> drop\n"
+ "Go Adventure! -> goadventure\n"
+ "Code Interceptor -> codeinterceptor\n"
+ "La Prière -> lapriere\n"
+ "Sdorica The Story Unfolds -> sdorica\n"
+ "Hesitant Blade -> hesitantblade\n"
+ "Pounding Destination -> poundingdestination\n"
+ "Stewrica -Cross- -> stewricacross\n"
+ "FUJIN Rubmle -> fujinrumble\n"
+ "Hop Step Adventure☆ -> hopstepadventure\n"
+ "Silent Voice -> silentvoice\n"
+ "Spring -> spring\n"
+ "dynamo -> dunamo\n"
+ "Hello Days -> hellodays\n"
+ "Interstellar Experience -> interstellarexperience\n"
+ "FUSE -> fuse\n"
+ "Gigantic Saga -> giganticsaga\n"
+ "popotnik ~ The Traveller of Ljubljana -> popotnik\n"
+ "Ascension to Heaven -> ascensiontoheaven\n"
+ "Lifill -> lifill\n"
+ "そんなに私を期待させないで => dontexpectsomuch\n"
+ "Fading Star -> fadingstar\n"
+ "Magical Toy Box -> magicaltoybox\n"
+ "Until the Blue Moon Rises -> untilthebluemoonrises\n"
+ "双龍飛閃-Dual Dragoon- -> dualdragoon\n"
+ "Like Asian Spirit -> likeasianspirit\n"
+ "Tsukiyura -> tsukiyura\n"
+ "Time Traveller => timetraveller\n"
+ "Flash Gun -> flashgun\n"
+ "Nyx -Fatal arousal of Madness- -> nyx\n"
+ "Lights of Muse -> lightsofmuse\n"
+ "Stargazer -> staragazer\n"
+ "Blackest Luxury Car -> blackestluxurycar\n"
+ "粉骨砕身カジノゥ -> funkotsusaishincasino\n"
+ "時計の部屋と精神世界 -> clockroomandspiritualworld"
+ "XING -> xing\n"
+ "Brave my Heart -> bravemyheart\n"
+ "Final Step! -> finalstep\n"
+ "Medus -> medusa\n"
+ "XODUS -> xodus\n"
+ "The 89's Momentum -> the89smomentum\n"
+ "The 90 Decision -> the90sdecision\n"
+ "Kaguya -> kaguya\n"
+ "Red Storm Sentiment -> redstormsentiment\n"
+ "非・現実逃避 -> nonescapism\n"
+ "非・現実逃避 Rabpit Remix -> nonescapismrabpitremix\n"
+ "Echo over you... -> echooveryou\n"
+ "Forest of Clock -> forestofclock\n"
+ "Kokoro Odoro -> kokoroodoro\n"
+ "Dandelion Girls, Dandelion Boys -> dandeliongirlsdandelionboys\n"
+ "BlythE -> blythe\n"
+ "glory day -> gloryday\n"
+ "OBLIVION -> oblivion\n"
+ "Play The Future -> playthefuture\n"
+ "We're All Gonna Die -> wereallgonnadie\n"
+ "Ask to Wind Live Mix -> asktowindlivemix\n"
+ "End of the Moonlight -> endofthemoonlight\n"
+ "Hello Pinky -> hellopinky\n"
+ "Nightmare -> nightmare\n"
+ "U.A.D -> uad\n"
alicesongs = "Alice Songs:\n"
+ "Friction -> friction\n"
+ "Legacy -> legacy\n"
+ "Living In The One -> livingintheone\n"
+ "YUBIKIRI-GENMAN -> yubikirigenman\n"
+ "I hate to tell you -> ihattotellyou\n"
+ "Utopiosphere -> utopiosphere\n"
+ "Marigold -> marigold\n"
+ "The Beautiful Moonlight -> thebeautifulmoonlight\n"
+ "都市の呼吸 -> breathofthecity\n"
+ "to next page -> tonextpage\n"
+ "ANiMA -> anima\n"
hanssongs = "Hans Songs:\n"
+ "Sunset -> sunset\n"
+ "Ephemeral -> ephemeral\n"
+ "Ruin in the Mirage -> ruinsinthemirage\n"
+ "Run Go Run -> rungorun\n"
+ "Platinum -> platinum\n"
+ "Leviathan -> leviathan\n"
+ "Lost in the Nowhere -> lostinthenowhere\n"
+ "Dream -> dream\n"
+ "Path and Period -> pathandperiod\n"
+ "Aragami -> aragami\n"
+ "Rhuzerv -> rhuzerv\n"
kizunaaisongs = "Kizuna Ai Songs:\n"
+ "AIAIAI -> aiaiai\n"
+ "Hello, Morning -> hellomorning\n"
+ "future base -> futurebase\n"
+ "new world -> newworld2\n"
+ "miracle step -> miraclestep\n"
+ "meet you -> meetyou\n"
+ "mirari -> mirai\n"
+ "over the reality -> overthereality\n"
+ "melty world -> meltyworld\n"
+ "hello, alone -> helloalone\n"
mikusongs = "Miku Songs:\n"
+ "Blue Star -> bluestar\n"
+ "BREAK IT -> breakit\n"
+ "Can't Make A Song!! -> cantmakeasong\n"
+ "Miku -> miku\n"
+ "Sharing The World -> sharingtheworld\n"
+ "Venus di Ujung Jari -> venusdiujungjari\n"
+ "ラッキー☆オーブ -> luckyorb\n"
+ "魔法みたいなミュージック！ -> musiclikemagic\n"
+ "月西江 -> moonwestrivier\n"
+ "Ten Thousand Stars -> tenthousandstars\n"
+ "Glass Wall -> glasswall\n"
+ "Cybernetic -> cybernetic\n"
+ "Decade -> decade\n"
+ "ラッキー☆オーブ(3R2 Remix) -> luckyorb3r2remix\n"
xenonsongs = "Xenon Songs: \n"
+ "INSPION -> inspion\n"
+ "Whispers in my Head -> whispersinmyhead\n"
+ "Return -> return\n"
+ "concentric circles -> concentriccircles\n"
+ "Fighting -> fighting\n"
+ "To the Light -> tothelight\n"
+ "Phantom Razor -> phantomrazor\n"
+ "Black Hole -> blackhole\n"
+ "SAMURAI -> samurai\n"
+ "IOLITE-SUNSTONE -> iolitesunstone\n"
+ "Ultimate feat. 放課後のあいつ -> ultimatefeat\n"
+ "Karma -> karma\n"
+ "Chosen -> chosen\n"
+ "Violet -> violet\n"
+ "Asylum -> asylum\n"
+ "Tiny Giant Goes To The Sea -> tinygiantgoestothesea\n"
connersongs = "ConneR Songs:\n"
+ "Xiorc -> xiorc\n"
+ "REBELLIUM -> rebellium\n"
+ "Imprinting -> imprinting\n"
+ "Gekkouka -> gekkouka\n"
+ "Light of Buenos Aires -> lightofbuenosaires\n"
+ "tondari-hanetari -> tondarihanetari\n"
+ "Abduction -> abduction\n"
+ "Nostalgia Sonatina -> nostalgiasonatina\n"
+ "I luv U -> iluvu\n"
+ "Instinct -> instinct\n"
+ "Floor of Lava -> flooroflava\n"
+ "Aphasoa -> aphasoa\n"
+ "Olympia -> olympia\n"
+ "Demetrius -> demetrius\n"
+ "L'Ultima Cena -> lultimacena\n"
+ "Deus Ex Machina -> deusexmachina\n"
+ "Fur War, Pur War -> furwarpurwar\n"
+ "Re:boot -> reboot\n"
+ "Last Landing -> lastlanding\n"
cherrysongs = "Cherry Songs:\n"
+ "Scenery in your eyes -> sceneryinyoureyes\n"
+ "LEVEL 4 -> level4\n"
+ "Living for you -> livingintheone\n"
+ "I'M NOT -> imnot\n"
+ "Stop at nothing -> stopatnothing\n"
+ "RETRIEVE -> retrieve\n"
+ "Still -> still\n"
+ "CREDENCE -> credence\n"
+ "SYSTEMFEIT -> systemfeit\n"
+ "hunted -> hunted\n"
+ "Capture me -> captureme\n"
+ "Realize -> realize\n"
joesongs = "JOE Songs:\n"
+ "Childish -> childish\n"
+ "Turnstile Jumper -> turnstilejumper\n"
+ "Juicy Gossip -> juicygossip\n"
+ "Standby for Action -> standbyforaction\n"
+ "Open the Game -> openthegame\n"
+ "Hydrangea -> hydrangea\n"
+ "Absolutely -> absolutely\n"
+ "Higher and Higher -> higherandhigher\n"
+ "Take me to the Future\n"
+ "Nautilus -> nautilus\n"
+ "Bass Music -> bassmusic\n"
sagarsongs = "Sagar Songs:\n"
+ "Amenemhat -> amenemhar\n"
+ "Elysium -> elysium\n"
+ "Immran Brain -> immranbrain\n"
+ "Space Alien -> spacealien\n"
+ "Doldrums -> doldrums\n"
+ "Nídhögg -> nidhogg\n"
+ "Legacy -> legacy\n"
+ "A Portent of the Silver Wheel -> aportentofthesilverwheel\n"
+ "Sacrifice -> sacrifice\n"
+ "Return of the Lamp -> returnofthelamp\n"
rinsongs = "Ring Songs:\n"
+ "The Siege -> thesiege\n"
+ "The Grand Debate -> thegranddebate\n"
+ "三灯火 -> threelights\n"
+ "「妖怪録、我し来にけり。」 -> yokairock\n"
+ "Starry Summoner -> starrysummoner\n"
+ "すゝめ☆クノイチの巻 -> goaheadkunoichi\n"
+ "彩 -> leafygreen\n"
+ "決戦 -> decisivebattle\n"
+ "Mari-Temari -> maritemari\n"
+ "Inari -> inari\n"
aromasongs = "Aroma Songs:\n"
+ "change -> change\n"
+ "No One Can't Stop Me -> noonecantstopme\n"
+ "Spotlight On -> spotlighton\n"
+ "Bring the light -> bringthelight\n"
+ "Make U Mine -> makeumine\n"
+ "Anzen Na Kusuri -> Anzennakusuri\n"
+ "漂流 -> drifting\n"
+ "Perspectives -> perspectives\n"
+ "風の声 -> thewindsvoice\n"
+ "Neon Escape -> neonescape\n"
+ "Beautiful Lie -> beautifullie\n"
norasongs = "Nora Songs:\n"
+ "Accelerator -> accelerator\n"
+ "Dance till Dawn -> dancetilldawn\n"
+ "Uranus -> uranus\n"
+ "Drop The World -> droptheworld\n"
+ "Starlight -> starlight\n"
+ "Bastard of Hardcore -> bastardofhardcore\n"
+ "jakarta PROGRESSION -> jakartaprogression\n"
+ "Eternity -> eternity\n"
+ "Phagy Mutation -> phagymutation\n"
+ "ATONEMENT -> atonement\n"
youngnekosongs = "Neko Songs:\n"
+ "Chocolate Missile -> chocolatemissile\n"
+ "I can avoid it.#φωφ -> icanavoidit\n"
+ "Pink Graduation -> pinkgraduation\n"
+ "一啖兩啖 -> onebitetwobites\n"
+ "Mammal -> mammal\n"
+ "Blah!! -> blahh\n"
+ "リラ -> lira\n"
+ "Log In -> login\n"
+ "DJ Mashiro is dead or alive -> djmashiroisdeadoralive\n"
+ "Re:incRnaTiØN ～夕焼ケ世界ノ決別ヲ～ -> reincarnation\n"
+ "R.I.P. -> rip\n"




const registerSlashCommands = async () => {
    const commands = [
        {
            name: 'ping',
            description: 'Replies with Pingged!'
        },
        {
            name: 'viewcard',
            description: 'Shows you your hand in tycoon'
        },
        {
            name: 'sethand',
            description: 'Sets hand in tycoon to like 2 cards (debug feature)'
        },
        {
            name: 'tycoon',
            description: "Play tycoon",
            options: [
                {
                    type: 6,  // 6 is the type for USER
                    name: 'user1',
                    description: 'First user',
                    required: true
                },
                {
                    type: 6,  // 6 is the type for USER
                    name: 'user2',
                    description: 'Second user',
                    required: true
                },
                {
                    type: 6,  // 6 is the type for USER
                    name: 'user3',
                    description: 'Third user',
                    required: true
                },
                {
                    type: 4, // integer
                    name: 'maxRound',
                    description: 'Max number of rounds to run before quitting',
                    required: false
                }
            ]
    
        }
        // Add more commands here
    ];

    const rest = new REST({ version: '9' }).setToken(currentBotToken);

    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands(currentApplicationID),
            { body: commands }
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
};

