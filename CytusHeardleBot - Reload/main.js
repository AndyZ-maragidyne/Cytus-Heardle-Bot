const { CytusSong } = require('./Dungeon/CytusSong.js')

const { Permissions, Client, Attachment, MessageCollector, Interaction, MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton, Intents, Modal, TextInputComponent, showModal} = require('discord.js');
const Discord = require('discord.js');
const readline = require('readline');
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES","GUILD_MESSAGE_REACTIONS"] });
const schedule = require('node-schedule');
const fs = require('fs');
const fsp = require('fs').promises;
const { throws } = require('assert');
const { executionAsyncResource } = require('async_hooks');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
//npm install @ffprobe-installer/ffprobe
const ffprobePath = require('@ffprobe-installer/ffprobe').path;
ffmpeg.setFfprobePath(ffprobePath);
const { REST } = require('@discordjs/rest')
const axios = require('axios');
const { Routes } = require('discord-api-types/v9');
const { InteractionType } = require('discord-api-types/v10')

const GUILD_ID = 412950444089016320
const CLIENT_ID = 965925868436353064


//ffmpeg.setFfmpegPath("C://Users/Minec/Desktop/ffmpeg/ffmpeg/bin/ffmpeg.exe");
blacklistedChannels = ["1310332415088132150", "1311476063804592230", "1312522788904636517", "1317913738766188664"];
whitelistedUsers = ["412950175342919680", "620074662994640926", "586663270144933895", "798958594116419604"]
const songcorrection = ["hi","alternapt1","sound", "carefreecloudy", "revelation", "paradigm", "binary", "familylove", "stillpianoversion", "dawnreimei", "bastet", "legacy2", "breathofthecity", "newworld2", "luckyorb", "magicalmusic", "moonwestriver", "luckyorb3r2remix", "ultimatefeat", "threelights", "yokairecord", "goaheadkunoichi", "leafygreen", "decisivebattle", "drifting", "thewindsvoice", "onesipstwosips", "lira", "reincarnation"]
const fametiers = ["NONE","PAFF","Neko#ΦωΦ","ROBO_Head","Xenon","ConneR","Cherry","JOE","Aroma","Nora","Neko","Ivy","Miku","Crystal PuNK","Sagar","Rin","Vanessa","Kizuna AI","Bo Bo","Alice","Hans","Graff. J","Amiya","Kaff","Ilka"]
CytusHeardleBotTESTtoken = ''
CytusHeardleBotTEST2token = ''
CytusHeardleBottoken ='' //this one (public version of the bot)
CytusHeardleChannelID = '958518859072172132' //this one
CytusHeardleWareHouseID = '965929751560736808'
CytusHeardleLiveTestID = '1039741662861205585'
CytusHeardleScoresChannelID = '958534665214521366'
CytusHeardleServerScoresChannelID = '1311476063804592230'
GeneralChannelID = '584420631324524557'
CytusHeardleServerID = '1310332415088132147'
// Hehehebutinreallife = '945034814489239683'
// Hehehe = '910327131857358909'
// gemz = '955971112431419422'
// tick = '950613255645171762'
// MillionMaster = '640720107475042314'
// projectDivaMiku = '1216851993784619079'
// angryMiku = '1216532048840364182'
const MillionMaster = "<:MillionMaster:1311354203809251398>";
const ScoreS = "<:SScore:1310336830939598901>";
const ScoreA = "<:AScore:1310336650882322482>";
const ScoreB = "<:BScore:1310336775956463707>";
const ScoreC = "<:CScore:1310415645094973561>";
const QuarterNote = "<:Cy:1310752256756551732>";
const HalfNote = "<:Cytu:1310752281670455368>";
const ThreeQuartersNote = "<:CytusNo:1310752317779476550>";
const CytusNote = "<:CytusNote:1310749630082060320>";
const CapsoC = "<:Capso:1310337068412567602>";
const CapsoA = "<:cApso:1310417741198393417>";
const CapsoP = "<:caPso:1310417112623218738>";
const CapsoS = "<:capSo:1310414130791845989>"
const CapsoO = "<:capsO:1310415583325589574>";
const CapsoLogo = "<:CAPSO:1310415891477037087>";
const bCapsoC = "<:cAPSO:1310416298852876358>";
const bCapsoA = "<:CaPSO:1310416403953745981>";
const bCapsoP = "<:CApSO:1310416460677517312>";
const bCapsoS = "<:CAPsO:1310416530533515355>"
const bCapsoO = "<:CAPSo:1310416734993256488>";
const bCapsoLogo = "<:capso:1310416806715854898>";
const ScoreWrong = "<:Wrong:1311345640034275410>";
const ScoreSkip = "<:Skip:1311349174071201813>";
const dir = 'D:/CytusHeardleBot/songlist'
CytusHeardleBotTESTApplicationID = '1039555744757981204'
CytusHeardleBotTEST2ApplicationID = '1295453343392596009'
CytusHeardleBotApplicationID = '1316939814058328074'
currentBotMode = 'tests';
currentBotToken = '';
currentApplicationID = '';
levelDirectory = "./level/"
savesDirectory = "./saves/"
if (currentBotMode == 'test') {
    currentBotToken = CytusHeardleBotTESTtoken
    currentApplicationID = CytusHeardleBotTESTApplicationID
    currentScoresChannel = CytusHeardleWareHouseID
    levelDirectory = "./level/"
    savesDirectory = "./saves/"
} else if (currentBotMode == 'test2') {
    currentBotToken = CytusHeardleBotTEST2token
    currentApplicationID = CytusHeardleBotTEST2ApplicationID
    currentScoresChannel = CytusHeardleWareHouseID
    levelDirectory = "./level/"
    savesDirectory = "./saves/"
}else {
    currentBotToken = CytusHeardleBottoken
    currentApplicationID = CytusHeardleBotApplicationID
    currentScoresChannel = CytusHeardleServerScoresChannelID
}



class Player {
    constructor(id, lastHeardle, score, video, alreadyGuessed, lives, numCorrect, finished, usingCommand){
        this.id = id
        this.lastHeardle = parseInt(lastHeardle);
        this.score = score;
        this.video = parseInt(video);
        this.alreadyGuessed = alreadyGuessed;
        this.lives = parseInt(lives);
        this.numCorrect = parseInt(numCorrect);
        this.finished = finished
        this.usingCommand = usingCommand
        this.timestamp = null;
        this.completedLevels = [];
    }

    getId(){
        return this.id
    }

    getLastHeardle(){
        return this.lastHeardle;
    }

    setLastHeardle(h) {
        this.lastHeardle = h;
    }

    getScore(){
        return this.score
    }

    setScore(s) {
        this.score = s;
    }

    getVideo(){
        return this.video
    }

    setVideo(v) {
        this.video = v;
    }

    incVideo() {
        this.video++;
    }

    getAlreadyGuessed(){
        return this.alreadyGuessed
    }
    
    setAlreadyGuessed(g) {
        this.alreadyGuessed = g;
    }
    
    getLives(){
        return this.lives;
    }

    setLives(l) {
        this.lives = l;
    } 

    decLives() {
        this.lives--;
    }

    getNumCorrect() {
        return this.numCorrect;
    }

    setNumCorrect(n) {
        this.numCorrect = n;
    }

    incNumCorrect(){
        this.numCorrect++;
    }

    getFinished() {
        return this.finished;
    }

    setFinished(f) {
        this.finished = f;
    }

    setTimestamp(t) {
        this.timestamp = t;
    }

    getTimestamp() {
        return this.timestamp;
    }

    setCompletedLevels(c) {
        this.completedLevels = c;
    }

    getCompletedLevels() {
        return this.completedLevels
    }

    isLevelCompleted(level) {
        this.ensureCapacity(level);
        const index = Math.floor((level - 1) / 32);
        const bitPosition = (level - 1) % 32;
        return (this.completedLevels[index] & (1 << bitPosition)) !== 0;
    }

    ensureCapacity(level) {
        const requiredLength = Math.ceil(level / 32);
        while (this.completedLevels.length < requiredLength) {
            this.completedLevels.push(0); // Add new entries initialized to 0
        }
    }

    markLevelCompleted(level) {
        const index = Math.floor((level - 1) / 32);
        const bitPosition = (level - 1) % 32;

        // Expand completedLevels if necessary
        while (this.completedLevels.length <= index) {
            //console.log(`Expanding completedLevels. Filling index ${this.completedLevels.length} with 0.`);
            this.completedLevels.push(0); // Fill gaps with 0
        }

        // Mark the level as completed
        this.completedLevels[index] |= (1 << bitPosition);
    }

    markLevelIncomplete(level) {
        this.ensureCapacity(level);
        const index2 = Math.floor((level - 1) / 32);
        const bitPosition2 = (level - 1) % 32;
        if (index2 < this.completedLevels.length) { 
            this.completedLevels[index2] &= ~(1 << bitPosition2);
        }
    }

    //only the 5 most recent
    getUnplayedLevels(latestLevel) {
        this.ensureCapacity(latestLevel);
        const unplayedLevels = [];
        for (let level = latestLevel; level > 0 && unplayedLevels.length < 5; level--) {
            // Calculate the index and bit position
            const arrayIndex = Math.floor((level - 1) / 32); // Adjust for 0-based indexing
            const bitPosition = (level - 1) % 32;
    
            // Check if the level is unplayed
            if (!(this.completedLevels[arrayIndex] & (1 << bitPosition))) {
                unplayedLevels.push(level); // Add unplayed level to the list
            }
        }
        return unplayedLevels;
    }

    toJSON() {
        return {
            id: this.id,
            lastHeardle: this.lastHeardle,
            score: this.score,
            video: this.video,
            alreadyGuessed: this.alreadyGuessed,
            lives: this.lives,
            numCorrect: this.numCorrect,
            finished: this.finished,
            usingCommand: this.usingCommand,
            timestamp: Math.floor(Date.now() / 60000),
            completedLevels: this.completedLevels.map(n => n || 0)
        }
    }

    static fromJSON(json) {
        let p = new Player(json.id, json.lastHeardle, json.score, json.video, json.alreadyGuessed, json.lives, json.numCorrect, json.finished, json.usingCommand);
        if (json.timestamp) {
            p.setTimestamp(json.timestamp);
        }
        if (json.completedLevels) {
            p.completedLevels = json.completedLevels.map(n => Number(n) || 0);
        } else {
            p.completedLevels = []
        }
        return p;
    }
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
      
      // choose one of the lines...
      var line = lines[Math.floor(Math.random()*lines.length)]



      line = line.split('=')
      songname = line[0]
      songanswer = line[1]
      realname = line[2]
      character = line[3]
      difficulty = line[4]
      difficulty = difficulty.substring(0,realname.length-1)
      console.log(songname)
      console.log(realname)
      console.log("The random song chosen was " + songname + " and " + realname)
      returnedSong = new CytusSong(line[0], null, 0, false, null, line[1], line[2], difficulty)
      resolve(returnedSong)
   })
})
  }

async function newsongprocess(song, cooldown){
    isDuplicate = "yes"
    let songObject = await getRandomLine(song);
    console.log(cooldown)
    songObject = await checkforduplicates(song, cooldown, songObject)
    return songObject
}


function checkforduplicates(songfile, cooldownfile, songObject){
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
                resolve(songObject)
            }else{
                console.log("there is a duplicate")
                isDuplicate = "yes"
                let newSong = await getRandomLine(songfile)
                resolve(await checkforduplicates(songfile, cooldownfile, newSong))
                
            }
               }else{
                console.log("Did not find any duplicates")
                isDuplicate = "no"
                resolve(songObject)
        }
        

        
    })
})
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
    fsp.rename("./rtemp.mp4", output, function(err){console.log(err);reject()});
    console.log('File renamed successfully');
    resolve()
    })
}
}

function reversevideo(dir){
    return new Promise((resolve, reject) => {
    ffmpeg({ source: dir })
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
        fsp.rename("./rtemp.mp4", dir, function(err){console.log(err);reject()});
        console.log('File renamed successfully');
        resolve()
    });

    
    })
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
        heardlenumber = parseInt(number);
        resolve()
     })
    })
}

async function increasenumber(){
    return new Promise (async (resolve, reject) => {
        heardlenumber++;
        fsp.writeFile("heardlenumber.txt", String(heardlenumber), function(err, data) { if (err) {console.log("Error when writing the number")} });
        resolve()
    })
}




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
    //console.log("index: " + index)
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
            // songname, songanswer, realname, character, difficulty
            songinformation[0] = line[0]
            songinformation[1] = line[1]
            songinformation[2] = line[2]
            songinformation[3] = line[3]
            songinformation[4] = line[4]
            //difficulty = difficulty.substring(0,realname.length-1)
            resolve(songinformation);
        })
    
    })
}

function storeCytusHeardleInfo(fileName){
    let currentCytusHeardle = JSON.stringify({
        songname: songname,
        newanswer: newanswer,
        songname1: songname1,
        songname2: songname2,
        songname3: songname3,
        songname4: songname4,
        songname5: songname5,
        songname6: songname6,
        songanswer: songanswer,
        songanswer1: songanswer1,
        songanswer2: songanswer2,
        songanswer3: songanswer3,
        songanswer4: songanswer4,
        songanswer5: songanswer5,
        songanswer6: songanswer6,
        isnormal: isnormal,
        isscrambled: isscrambled,
        ishardmode: ishardmode,
        ischromatic: ischromatic,
        isreverse: isreverse,
        isduo: isduo,
        isfragmented: isfragmented,
        isquad: isquad,
        newCytusHeardle: newCytusHeardle,
        usedCommands: usedCommands,
        title: title
    }
    )
    
    fs.writeFile(fileName, currentCytusHeardle, 'utf-8', (err) => {
        if (err) {
          console.error('Error writing to file:', err);
        } else {
          console.log('Cytus Heardle info stored successfully');
        }
      });
}

async function loadCytusHeardleInfo(){
        return new Promise(async (resolve, reject) => {
            try{
            let jsonString = await fsp.readFile("CurrentCytusHeardleInfo.json", 'utf8');
            let j = JSON.parse(jsonString);
            
            songname = j.songname
            newanswer = j.newanswer
            songname1 = j.songname1
            songname2 = j.songname2
            songname3 = j.songname3
            songname4 = j.songname4
            songname5 = j.songname5
            songname6 = j.songname6
            songanswer = j.songanswer
            songanswer1 = j.songanswer1
            songanswer2 = j.songanswer2
            songanswer3 = j.songanswer3
            songanswer4 = j.songanswer4
            songanswer5 = j.songanswer5
            songanswer6 = j.songanswer6
            isnormal  = j.isnormal
            isscrambled = j.isscrambled
            ishardmode = j.ishardmode
            ischromatic = j.ischromatic
            isreverse = j.isreverse
            isduo = j.isduo
            isfragmented= j.isfragmented
            isquad = j.isquad
            newCytusHeardle = j.newCytusHeardle
            usedCommands = j.usedCommands
            title = j.title
            try {
            if (ischromatic || isduo || isquad) {
                getsongname = await findsonginformation(songname1, 1)
                songname1 = getsongname[0]
                songanswer1 = getsongname[1]
                realname1 = getsongname[2]
                character1 = getsongname[3]
                difficulty1 = getsongname[4]

                getsongname = await findsonginformation(songname2, 2)
                songname2 = getsongname[0]
                songanswer2 = getsongname[1]
                realname2 = getsongname[2]
                character2 = getsongname[3]
                difficulty2 = getsongname[4]

                if(isquad || ischromatic){
                    getsongname = await findsonginformation(songname3, 3)
                    songname3 = getsongname[0]
                    songanswer3 = getsongname[1]
                    realname3 = getsongname[2]
                    character3 = getsongname[3]
                    difficulty3 = getsongname[4]

                    getsongname = await findsonginformation(songname4, 4)
                    songname4 = getsongname[0]
                    songanswer4 = getsongname[1]
                    realname4 = getsongname[2]
                    character4 = getsongname[3]
                    difficulty4 = getsongname[4]
                    
                    if(ischromatic) {
                        getsongname = await findsonginformation(songname5, 5)
                        songname5 = getsongname[0]
                        songanswer5 = getsongname[1]
                        realname5 = getsongname[2]
                        character5 = getsongname[3]
                        difficulty5 = getsongname[4]

                        getsongname = await findsonginformation(songname6, 6)
                        songname6 = getsongname[0]
                        songanswer6 = getsongname[1]
                        realname6 = getsongname[2]
                        character6 = getsongname[3]
                        difficulty6 = getsongname[4]
                    }
                }
            } else {
                getsongname = await findsonginformation(songname)
                
                console.log(getsongname)
                songname = getsongname[0]
                songanswer = getsongname[1]
                realname = getsongname[2]
                character = getsongname[3]
                difficulty = getsongname[4]
            }
            } catch (error) {
                console.log("Error when finding songinformation")
                console.log(error)
            }

            resolve();
            } catch (error) {
                console.log("Error when loading Cytus Heardle info")
                console.log(error)
                resolve()
            }
        
    })
    
}

// Ensure subdirectories exist
async function initializeDataDirectories() {
    try {
      await fs.mkdir(`/data/level`, { recursive: true });
      await fs.mkdir(`/data/saves`, { recursive: true });
      console.log("Data directories initialized.");
    } catch (error) {
      console.error("Error initializing data directories:", error);
    }
  }

async function saveAccount(account) {
    return new Promise(async(resolve, reject) => {
        try{
            const jsonString = JSON.stringify(account.toJSON());
            filePath = "./saves/" + account.getId() + ".json" 
            tempFilePath =  "./saves/" + account.getId() + "temp.json"
            
            const fd = await fsp.open(tempFilePath, 'w');
            await fsp.writeFile(fd, jsonString, 'utf8')
            await fsp.rename(tempFilePath, filePath)
            await fd.close();

            //console.log("SAVED ACCOUNT")
            
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
            while (!await isFileReady(filePath)) {
                await new Promise(res => setTimeout(res, 100)); // Poll every 100ms.
            }

            const jsonString = await fsp.readFile(filePath, 'utf8');
            const jsonObject = JSON.parse(jsonString);
            resolve(Player.fromJSON(jsonObject));
        } catch (err) {
            console.error('There was an error in loadAccount', err);
            reject(err);
        }
    })
}

async function isFileReady(filePath) {
    try {
        const fd = await fsp.open(filePath, 'r'); // Attempt to open the file for reading.
        await fd.close(); // Close immediately if successful.
        return true; // File is accessible.
    } catch (err) {
        if (err.code === 'ENOENT') {
            // File does not exist yet.
            return false;
        }
        throw err; // Rethrow other errors.
    }
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
            if (guess[i] == " "||guess[i] == "\'" || guess[i] == "."|| guess[i] == "-" || guess[i] == "~" || guess[i] == ',' || guess[i] === "'" || guess[i] == "?" || guess[i] == "!" || guess[i] == ":" || guess[i] == "[" || guess[i] == "]"){
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

//loadprofiles()




const prefix = '-';
const debugprefix = '+';
const otherprefix = ';'

client.once('ready', () => {
    registerSlashCommands();
    console.log("Cytus Heardle Bot is online!");
    client.user.setActivity('Cytus Heardle', {type: "PLAYING"})
    //minute, hour, day of the month, month, day of the week
    schedule.scheduleJob('0 4 * * *', async () => {
        try{ 
        generateNewHeardle();
        setTimeout(() => {
            checkIfCompleted(0);
        }, 600000);
        } catch (error) {
            checkIfCompleted(0);
        }
        
    });
});

function checkIfCompleted(retryCounter) {
    const maxRetries = 6;
    if (currentlyGeneratingHeardle && maxRetries >= retryCounter) {
        console.log("retried over 6 times. Quitting out")
        return;
    }
    console.log("Current generating Heardle: " + currentlyGeneratingHeardle)
    if (currentlyGeneratingHeardle) {
        generateNewHeardle();
        setTimeout(() => {
            checkIfCompleted(retryCounter + 1);
        }, 600000);
    } 
}

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
character = ""
difficulty = ""
starttime = 0;
songduration = 0;
modifier = "";
fullsongprocessed = 0;
usedCommands = [];
const usedbuy = new Set();
const used30sec = new Set()
userScores = [];
ischromatic = false
ishardmode = false
isnormal = true
isscrambled = false
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
songanswer = "hi"
songanswer1 = "hi"
songanswer2 = "hi"
songanswer3 = "hi"
songanswer4 = "hi"
songanswer5 = "hi"
songanswer6 = "hi"
realname1 = "hi"
realname2 = "hi"
realname3 = "hi"
realname4 = "hi"
realname5 = "hi"
realname6 = "hi"
character1 = "hi"
character2 = "hi"
character3 = "hi"
character4 = "hi"
character5 = "hi"
character6 = "hi"
difficulty1 = "hi"
difficulty2 = "hi"
difficulty3 = "hi"
difficulty4 = "hi"
difficulty5 = "hi"
difficulty6 = "hi"
title = "";
chromaticGuessCharacter = 0;
newCytusHeardle = false
currentlyGeneratingHeardle = false;
startupTimestamp = Math.floor(Date.now() / 60000);
let validanswers = []
startupFunction()
getheardlenumber()


async function startupFunction(){
    await loadvalidanswers()
    await loadCytusHeardleInfo()
    // if (currentBotMode != 'test' && currentBotMode != 'test2') {
    //     initializeDataDirectories();
    // }
}

function generateNewHeardle() {
    


    currentlyGeneratingHeardle = true;
    songname = ""
    songname1 = "hi"
    songname2 = "hi"
    songname3 = "hi"
    songname4 = "hi"
    songname5 = "hi"
    songname6 = "hi"
    songanswer = "hi"
    songanswer1 = "hi"
    songanswer2 = "hi"
    songanswer3 = "hi"
    songanswer4 = "hi"
    songanswer5 = "hi"
    songanswer6 = "hi"
    fullsongprocessed = 0
    modifier = ""
    gamemode = "solo"
    isnormal = true
    isscrambled = false
    ishardmode = false
    ischromatic = false
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
    usedCommands = [];
    usedbuy.clear()
    used30sec.clear()
    userScores = []
    fs.writeFile("temp.txt", "", function(err, data) { if (err) {console.log("Error when deleting temp file")} });
    getheardlenumber();

    //rolls for all the modifiers
    random = Math.random()*100
    //random = 100
    console.log("random number for Chromatic = " + random)
    if (random <= 15){
        ischromatic = true
        isnormal = false
    }
    
    random = Math.random()*100
    //random = 100
    console.log("random number for Duo is = " + random)
    if (random <= 10){
        isduo = true
        isnormal = false
    }

    random = Math.random()*100
    //random = 100
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
   // random = 100
    console.log("random number for Hard Mode = " + random)
    if (random <= 15){
        ishardmode = true
    }
    
    random = Math.random()*100
    //random = 100
    console.log("random number for Reverse = " + random)
    if (random <= 10){
        isreverse = true
    }

    random = Math.random()*100
    //random = 100
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

        await newsongprocess("songnames.txt", "songcooldown.txt")

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


        async function processAllFragmentedVideos() {
            try{
                await processFragmentedVideo("./songlist/" + songname + '.mp4', "1.mp4", isreverse, duration1, 1)
                await processFragmentedVideo("./songlist/" + songname + '.mp4', "2.mp4", isreverse, duration2, 2)
                await processFragmentedVideo("./songlist/" + songname + '.mp4', "3.mp4", isreverse, duration3, 4)
                await processFragmentedVideo("./songlist/" + songname + '.mp4', "4.mp4", isreverse, duration4, 7)
                await processFragmentedVideo("./songlist/" + songname + '.mp4', "5.mp4", isreverse, duration5, 11)
                await processFragmentedVideo("./songlist/" + songname + '.mp4', "6.mp4", isreverse, duration6, 16)
            
                console.log('Processing done!\nThe Cytus Heardle number is ' + (heardlenumber + 1))
                finishUpProcessing();
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
                await processvideo("./songlist/" + songname + '.mp4', levelDirectory + (heardlenumber + 1) +"-1.mp4", isreverse, starttime, duration1)
                await processvideo("./songlist/" + songname + '.mp4', levelDirectory + (heardlenumber + 1) +"-2.mp4", isreverse, starttime, duration2)
                await processvideo("./songlist/" + songname + '.mp4', levelDirectory + (heardlenumber + 1) +"-3.mp4", isreverse, starttime, duration3)
                await processvideo("./songlist/" + songname + '.mp4', levelDirectory + (heardlenumber + 1) +"-4.mp4", isreverse, starttime, duration4)
                await processvideo("./songlist/" + songname + '.mp4', levelDirectory + (heardlenumber + 1) +"-5.mp4", isreverse, starttime, duration5)
                await processvideo("./songlist/" + songname + '.mp4', levelDirectory + (heardlenumber + 1) +"-6.mp4", isreverse, starttime, duration6)
            
                console.log('Processing done!\nThe Cytus Heardle number is ' + (heardlenumber + 1))
                finishUpProcessing();
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
        await getsixsongs("songnames.txt")
        
        await checkmodifiers()
        if (isfragmented) {
            await processchromaticFragmentedVideo()
        } else {
            await processchromaticvideo()
        }

        console.log('Processing done!\nThe Cytus Heardle number is ' + (heardlenumber + 1))
        finishUpProcessing();

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
            songanswer1 = line[1]
            realname1 = line[2]
            character1 = line[3]
            difficulty1 = line[4]

            line = lines[Math.floor(Math.random()*lines.length)]
            line = line.substring(0,line.length-1)
            line = line.split("=")
            songname2 = line[0]
            songanswer2 = line[1]
            realname2 = line[2]
            character2 = line[3]
            difficulty2 = line[4]

            line = lines[Math.floor(Math.random()*lines.length)]
            line = line.substring(0,line.length-1)
            line = line.split("=")
            songname3 = line[0]
            songanswer3 = line[1]
            realname3 = line[2]
            character3 = line[3]
            difficulty3 = line[4]

            line = lines[Math.floor(Math.random()*lines.length)]
            line = line.substring(0,line.length-1)
            line = line.split("=")
            songname4 = line[0]
            songanswer4 = line[1]
            realname4 = line[2]
            character4 = line[3]
            difficulty4 = line[4]

            line = lines[Math.floor(Math.random()*lines.length)]
            line = line.substring(0,line.length-1)
            line = line.split("=")
            songname5 = line[0]
            songanswer5 = line[1]
            realname5 = line[2]
            character5 = line[3]
            difficulty5 = line[4]

            line = lines[Math.floor(Math.random()*lines.length)]
            line = line.substring(0,line.length-1)
            line = line.split("=")
            songname6 = line[0]
            songanswer6 = line[1]
            realname6 = line[2]
            character6 = line[3]
            difficulty6 = line[4]
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
            await processvideo('./songlist/' + songname1 +'.mp4',levelDirectory + (heardlenumber + 1) +"-1.mp4", isreverse, starttime1,duration1)
            await processvideo('./songlist/' + songname2 +'.mp4',levelDirectory + (heardlenumber + 1) +"-2.mp4", isreverse, starttime2,duration2)
            await processvideo('./songlist/' + songname3 +'.mp4',levelDirectory + (heardlenumber + 1) +"-3.mp4", isreverse, starttime3,duration3)
            await processvideo('./songlist/' + songname4 +'.mp4',levelDirectory + (heardlenumber + 1) +"-4.mp4", isreverse, starttime4,duration4)
            await processvideo('./songlist/' + songname5 +'.mp4',levelDirectory + (heardlenumber + 1) +"-5.mp4", isreverse, starttime5,duration5)
            await processvideo('./songlist/' + songname6 +'.mp4',levelDirectory + (heardlenumber + 1) +"-6.mp4", isreverse, starttime6,duration6)
        }
        async function processchromaticFragmentedVideo(){
            await processFragmentedVideo('./songlist/' + songname1 +'.mp4',levelDirectory + (heardlenumber + 1) +"-1.mp4", isreverse, duration1, 1)
            await processFragmentedVideo('./songlist/' + songname2 +'.mp4',levelDirectory + (heardlenumber + 1) +"-2.mp4", isreverse, duration2, 2)
            await processFragmentedVideo('./songlist/' + songname3 +'.mp4',levelDirectory + (heardlenumber + 1) +"-3.mp4", isreverse, duration3, 4)
            await processFragmentedVideo('./songlist/' + songname4 +'.mp4',levelDirectory + (heardlenumber + 1) +"-4.mp4", isreverse, duration4, 7)
            await processFragmentedVideo('./songlist/' + songname5 +'.mp4',levelDirectory + (heardlenumber + 1) +"-5.mp4", isreverse, duration5, 11)
            await processFragmentedVideo('./songlist/' + songname6 +'.mp4',levelDirectory + (heardlenumber + 1) +"-6.mp4", isreverse, duration6, 12)
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

        await gettwosongs("songnames.txt")
        
        await checkduomodifiers()
        
        if (isfragmented) {
            await processDuoFragmentedVideo()
        } else {
            await processduovideo()
        }

        console.log("Processing Done!\nThe Cytus Heardle number is " + (heardlenumber + 1))
        finishUpProcessing();
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
                songanswer1 = line[1]
                realname1 = line[2]
                character1 = line[3]
                difficulty1 = line[4]

                line = lines[Math.floor(Math.random()*lines.length)]
                line = line.substring(0,line.length-1)
                line = line.split("=")
                songname2 = line[0]
                songanswer2 = line[1]
                realname2 = line[2]
                character2 = line[3]
                difficulty2 = line[4]
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
            await combinevideo('./1a.mp4', './1b.mp4', levelDirectory + (heardlenumber + 1) +"-1.mp4")
            await combinevideo('./2a.mp4', './2b.mp4', './2c.mp4')
            await combinevideo('./1.mp4', './2c.mp4', levelDirectory + (heardlenumber + 1) +"-2.mp4")
            await combinevideo('./3a.mp4', './3b.mp4', './3c.mp4')
            await combinevideo('./2.mp4', './3c.mp4', levelDirectory + (heardlenumber + 1) +"-3.mp4")
            await combinevideo('./4a.mp4', './4b.mp4', './4c.mp4')
            await combinevideo('./3.mp4', './4c.mp4', levelDirectory + (heardlenumber + 1) +"-4.mp4")
            await combinevideo('./5a.mp4', './5b.mp4', './5c.mp4')
            await combinevideo('./4.mp4', './5c.mp4', levelDirectory + (heardlenumber + 1) +"-5.mp4")
            await combinevideo('./6a.mp4', './6b.mp4', './6c.mp4')
            await combinevideo('./5.mp4', './6c.mp4', levelDirectory + (heardlenumber + 1) +"-6.mp4")
            console.log("processing done lets go I think")
            }  catch (error){
                console.error(error);
            }
     
        }
        async function processDuoFragmentedVideo(){
            try{
                await processFragmentedVideo('./songlist/'+songname1+'.mp4', '1a.mp4', false, duration1/2, 1);
                await processFragmentedVideo('./songlist/'+songname2+'.mp4', '1b.mp4', false, duration1/2, 1)
                await processFragmentedVideo('./songlist/'+songname1+'.mp4', '2a.mp4', false, (duration2 - duration1)/2, 1)
                await processFragmentedVideo('./songlist/'+songname2+'.mp4', '2b.mp4', false, (duration2 - duration1)/2, 1)
                await processFragmentedVideo('./songlist/'+songname1+'.mp4', '3a.mp4', false, (duration3 - duration2)/2, 1)
                await processFragmentedVideo('./songlist/'+songname2+'.mp4', '3b.mp4', false, (duration3 - duration2)/2, 1)
                await processFragmentedVideo('./songlist/'+songname1+'.mp4', '4a.mp4', false, (duration4 - duration3)/2, 1)
                await processFragmentedVideo('./songlist/'+songname2+'.mp4', '4b.mp4', false, (duration4 - duration3)/2, 1)
                await processFragmentedVideo('./songlist/'+songname1+'.mp4', '5a.mp4', false, (duration5 - duration4)/2, 1)
                await processFragmentedVideo('./songlist/'+songname2+'.mp4', '5b.mp4', false, (duration5 - duration4)/2, 1)
                await processFragmentedVideo('./songlist/'+songname1+'.mp4', '6a.mp4', false, (duration6 - duration5)/2, 1)
                await processFragmentedVideo('./songlist/'+songname2+'.mp4', '6b.mp4', false, (duration6 - duration5)/2, 1)
                await combinevideo('./1a.mp4', './1b.mp4', levelDirectory + (heardlenumber + 1) +"-1.mp4")
                await combinevideo('./2a.mp4', './2b.mp4', './2c.mp4')
                await combinevideo(levelDirectory + (heardlenumber + 1) +"-1.mp4", './2c.mp4', levelDirectory + (heardlenumber + 1) +"-2.mp4")
                await combinevideo('./3a.mp4', './3b.mp4', './3c.mp4')
                await combinevideo(levelDirectory + (heardlenumber + 1) +"-2.mp4", './3c.mp4', levelDirectory + (heardlenumber + 1) +"-3.mp4")
                await combinevideo('./4a.mp4', './4b.mp4', './4c.mp4')
                await combinevideo(levelDirectory + (heardlenumber + 1) +"-3.mp4", './4c.mp4', levelDirectory + (heardlenumber + 1) +"-4.mp4")
                await combinevideo('./5a.mp4', './5b.mp4', './5c.mp4')
                await combinevideo(levelDirectory + (heardlenumber + 1) +"-4.mp4", './5c.mp4', levelDirectory + (heardlenumber + 1) +"-5.mp4")
                await combinevideo('./6a.mp4', './6b.mp4', './6c.mp4')
                await combinevideo(levelDirectory + (heardlenumber + 1) +"-5.mp4", './6c.mp4', levelDirectory + (heardlenumber + 1) +"-6.mp4")
                if (isreverse) {
                    await reversevideo("./1.mp4")
                    await reversevideo("./2.mp4")
                    await reversevideo("./3.mp4")
                    await reversevideo("./4.mp4")
                    await reversevideo("./5.mp4")
                    await reversevideo("./6.mp4")
                }
                console.log("processing done lets go I think")
                }  catch (error){
                    console.error(error);
                }
        }
        async function doBackgroundStuff(){
            try{
                // console.log("processing 30 sec has started")
                // thirtysecduration = 7
                // if(ishardmode){
                //     thirtysecduration = thirtysecduration/2
                // }
                // await processvideo('./songlist/'+songname1+'.mp4', './30seca.mp4', isreverse, starttime1+16, thirtysecduration)
                // await processvideo('./songlist/'+songname2+'.mp4', './30secb.mp4', isreverse, starttime2+16,thirtysecduration)
                // await combinevideo('./30seca.mp4', './30secb.mp4', './30secc.mp4')
                // await combinevideo('./6.mp4', './30secc.mp4', './30sec.mp4')       
                // console.log("power up processing done lets go. I think")
                // powerup30secondprocessed = true

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
            // fs.unlink('./30seca.mp4', (err) => {
            //     if (err) {
            //     console.log(err);
            //     } else {
                
            //     }
            // });
            // fs.unlink('./30secb.mp4', (err) => {
            //     if (err) {
            //     console.log(err);
            //     } else {
                
            //     }
            // });
            // fs.unlink('./30secc.mp4', (err) => {
            //     if (err) {
            //     console.log(err);
            //     } else {
                
            //     }
            // });
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
        await getfoursongs("songnames.txt")
        
        await checkquadmodifiers()

        if (isfragmented) {
            await processQuadFragmentedVideo();
        } else {
            await processquadvideo()
        }
        console.log("Processing Done!\nThe Cytus Heardle number is " + (heardlenumber + 1))
        finishUpProcessing();
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
                songanswer1 = line[1]
                realname1 = line[2]
                character1 = line[3]
                difficulty1 = line[4]

                line = lines[Math.floor(Math.random()*lines.length)]
                line = line.substring(0,line.length-1)
                line = line.split("=")
                songname2 = line[0]
                songanswer2 = line[1]
                realname2 = line[2]
                character2 = line[3]
                difficulty2 = line[4]

                line = lines[Math.floor(Math.random()*lines.length)]
                line = line.substring(0,line.length-1)
                line = line.split("=")
                songname3 = line[0]
                songanswer3 = line[1]
                realname3 = line[2]
                character3 = line[3]
                difficulty3 = line[4]

                line = lines[Math.floor(Math.random()*lines.length)]
                line = line.substring(0,line.length-1)
                line = line.split("=")
                songname4 = line[0]
                songanswer4 = line[1]
                realname4 = line[2]
                character4 = line[3]
                difficulty4 = line[4]
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
            await combinevideo('./1aa.mp4', './1bb.mp4', levelDirectory + (heardlenumber + 1) +"-1.mp4")

            await combinevideo('./2a.mp4', './2b.mp4', './2aa.mp4')
            await combinevideo('./2c.mp4', './2d.mp4', './2bb.mp4')
            await combinevideo('./2aa.mp4', './2bb.mp4', './2cc.mp4')
            await combinevideo(levelDirectory + (heardlenumber + 1) +"-1.mp4", './2cc.mp4', levelDirectory + (heardlenumber + 1) +"-2.mp4")

            await combinevideo('./3a.mp4', './3b.mp4', './3aa.mp4')
            await combinevideo('./3c.mp4', './3d.mp4', './3bb.mp4')
            await combinevideo('./3aa.mp4', './3bb.mp4', './3cc.mp4')
            await combinevideo(levelDirectory + (heardlenumber + 1) +"-2.mp4", './3cc.mp4', levelDirectory + (heardlenumber + 1) +"-3.mp4")

            await combinevideo('./4a.mp4', './4b.mp4', './4aa.mp4')
            await combinevideo('./4c.mp4', './4d.mp4', './4bb.mp4')
            await combinevideo('./4aa.mp4', './4bb.mp4', './4cc.mp4')
            await combinevideo(levelDirectory + (heardlenumber + 1) +"-3.mp4", './4cc.mp4', levelDirectory + (heardlenumber + 1) +"-4.mp4")

            await combinevideo('./5a.mp4', './5b.mp4', './5aa.mp4')
            await combinevideo('./5c.mp4', './5d.mp4', './5bb.mp4')
            await combinevideo('./5aa.mp4', './5bb.mp4', './5cc.mp4')
            await combinevideo(levelDirectory + (heardlenumber + 1) +"-4.mp4", './5cc.mp4', levelDirectory + (heardlenumber + 1) +"-5.mp4")

            await combinevideo('./6a.mp4', './6b.mp4', './6aa.mp4')
            await combinevideo('./6c.mp4', './6d.mp4', './6bb.mp4')
            await combinevideo('./6aa.mp4', './6bb.mp4', './6cc.mp4')
            await combinevideo(levelDirectory + (heardlenumber + 1) +"-5.mp4", './6cc.mp4', levelDirectory + (heardlenumber + 1) +"-6.mp4")
            console.log("processing done lets go I think")
            }  catch (error){
                console.error(error);
            }
     
        }

        async function processQuadFragmentedVideo(){
            try{
                await processFragmentedVideo('./songlist/'+songname1+'.mp4', '1a.mp4', false, duration1/4, 1);
                await processFragmentedVideo('./songlist/'+songname2+'.mp4', '1b.mp4', false, duration1/4, 1);
                await processFragmentedVideo('./songlist/'+songname3+'.mp4', '1c.mp4', false, duration1/4, 1);
                await processFragmentedVideo('./songlist/'+songname4+'.mp4', '1d.mp4', false, duration1/4, 1);
                await processFragmentedVideo('./songlist/'+songname1+'.mp4', '2a.mp4', false, (duration2 - duration1)/4, 1)
                await processFragmentedVideo('./songlist/'+songname2+'.mp4', '2b.mp4', false, (duration2 - duration1)/4, 1)
                await processFragmentedVideo('./songlist/'+songname3+'.mp4', '2c.mp4', false, (duration2 - duration1)/4, 1)
                await processFragmentedVideo('./songlist/'+songname4+'.mp4', '2d.mp4', false, (duration2 - duration1)/4, 1)

                await processFragmentedVideo('./songlist/'+songname1+'.mp4', '3a.mp4', false, (duration3 - duration2)/4, 1)
                await processFragmentedVideo('./songlist/'+songname2+'.mp4', '3b.mp4', false, (duration3 - duration2)/4, 1)
                await processFragmentedVideo('./songlist/'+songname3+'.mp4', '3c.mp4', false, (duration3 - duration2)/4, 1)
                await processFragmentedVideo('./songlist/'+songname4+'.mp4', '3d.mp4', false, (duration3 - duration2)/4, 1)

                await processFragmentedVideo('./songlist/'+songname1+'.mp4', '4a.mp4', false, (duration4 - duration3)/4, 1)
                await processFragmentedVideo('./songlist/'+songname2+'.mp4', '4b.mp4', false, (duration4 - duration3)/4, 1)
                await processFragmentedVideo('./songlist/'+songname3+'.mp4', '4c.mp4', false, (duration4 - duration3)/4, 1)
                await processFragmentedVideo('./songlist/'+songname4+'.mp4', '4d.mp4', false, (duration4 - duration3)/4, 1)

                await processFragmentedVideo('./songlist/'+songname1+'.mp4', '5a.mp4', false, (duration5 - duration4)/4, 1)
                await processFragmentedVideo('./songlist/'+songname2+'.mp4', '5b.mp4', false, (duration5 - duration4)/4, 1)
                await processFragmentedVideo('./songlist/'+songname3+'.mp4', '5c.mp4', false, (duration5 - duration4)/4, 1)
                await processFragmentedVideo('./songlist/'+songname4+'.mp4', '5d.mp4', false, (duration5 - duration4)/4, 1)

                await processFragmentedVideo('./songlist/'+songname1+'.mp4', '6a.mp4', false, (duration6 - duration5)/4, 1)
                await processFragmentedVideo('./songlist/'+songname2+'.mp4', '6b.mp4', false, (duration6 - duration5)/4, 1)
                await processFragmentedVideo('./songlist/'+songname3+'.mp4', '6c.mp4', false, (duration6 - duration5)/4, 1)
                await processFragmentedVideo('./songlist/'+songname4+'.mp4', '6d.mp4', false, (duration6 - duration5)/4, 1)

                await combinevideo('./1a.mp4', './1b.mp4', './1aa.mp4')
                await combinevideo('./1c.mp4', './1d.mp4', './1bb.mp4')
                await combinevideo('./1aa.mp4', './1bb.mp4', levelDirectory + (heardlenumber + 1) +"-1.mp4")

                await combinevideo('./2a.mp4', './2b.mp4', './2aa.mp4')
                await combinevideo('./2c.mp4', './2d.mp4', './2bb.mp4')
                await combinevideo('./2aa.mp4', './2bb.mp4', './2cc.mp4')
                await combinevideo(levelDirectory + (heardlenumber + 1) +"-1.mp4", './2cc.mp4', levelDirectory + (heardlenumber + 1) +"-2.mp4")

                await combinevideo('./3a.mp4', './3b.mp4', './3aa.mp4')
                await combinevideo('./3c.mp4', './3d.mp4', './3bb.mp4')
                await combinevideo('./3aa.mp4', './3bb.mp4', './3cc.mp4')
                await combinevideo(levelDirectory + (heardlenumber + 1) +"-2.mp4", './3cc.mp4', levelDirectory + (heardlenumber + 1) +"-3.mp4")

                await combinevideo('./4a.mp4', './4b.mp4', './4aa.mp4')
                await combinevideo('./4c.mp4', './4d.mp4', './4bb.mp4')
                await combinevideo('./4aa.mp4', './4bb.mp4', './4cc.mp4')
                await combinevideo(levelDirectory + (heardlenumber + 1) +"-3.mp4", './4cc.mp4', levelDirectory + (heardlenumber + 1) +"-4.mp4")

                await combinevideo('./5a.mp4', './5b.mp4', './5aa.mp4')
                await combinevideo('./5c.mp4', './5d.mp4', './5bb.mp4')
                await combinevideo('./5aa.mp4', './5bb.mp4', './5cc.mp4')
                await combinevideo(levelDirectory + (heardlenumber + 1) +"-4.mp4", './5cc.mp4', levelDirectory + (heardlenumber + 1) +"-5.mp4")

                await combinevideo('./6a.mp4', './6b.mp4', './6aa.mp4')
                await combinevideo('./6c.mp4', './6d.mp4', './6bb.mp4')
                await combinevideo('./6aa.mp4', './6bb.mp4', './6cc.mp4')
                await combinevideo(levelDirectory + (heardlenumber + 1) +"-5.mp4", './6cc.mp4', levelDirectory + (heardlenumber + 1) +"-6.mp4")
                if (isreverse) {
                    await reversevideo("./1.mp4")
                    await reversevideo("./2.mp4")
                    await reversevideo("./3.mp4")
                    await reversevideo("./4.mp4")
                    await reversevideo("./5.mp4")
                    await reversevideo("./6.mp4")
                }
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

    async function finishUpProcessing() {
        await increasenumber()
        currentlyGeneratingHeardle = false;
        title = modifier + "Cytus Heardle #" + heardlenumber + ":"
        client.channels.cache.get(currentScoresChannel).send("Cytus Heardle #" + heardlenumber + " has been generated!") 
        cooldownprocess()
        
        storeCytusHeardleInfo("CurrentCytusHeardleInfo.json")
        storeCytusHeardleInfo(levelDirectory + heardlenumber + ".json")
        
    }

    
}





function translateScore(score, lisnormal, lischromatic, lisduo, lisquad) {
    //console.log(score);
    let scoreStr = ""
    let playerScore = score;
    let nfinished = false;
    let nindex = 0;
    let correctCounter = 0;
    if (lisnormal) {
                   
        while (nindex < 6 && !nfinished) {
            switch (playerScore[nindex]) {
                case -1:
                    nfinished = true;
                    break;
                case 0:
                    scoreStr += ScoreWrong;
                    break;
                case 1:
                    if (nindex == 0) {
                        scoreStr += MillionMaster;
                    } else if (nindex == 1) {
                        scoreStr += ScoreS;
                    } else if (nindex == 2) {
                        scoreStr += ScoreA;
                    } else if (nindex ==3 ) {
                        scoreStr += ScoreB;
                    } else {
                        scoreStr += ScoreC;
                    }
                    nfinished = true;
                    break;
                case 2:
                    scoreStr += ScoreSkip;
                    break;
            }
        nindex++;
        }
                    
    } else if (lischromatic) {
        //look at all 6, replace with respective one
        while (nindex < 6) {
            switch (playerScore[nindex]) {
                case -1:
                case 0:
                    if (nindex == 0) {
                        scoreStr += bCapsoC;
                    } else if (nindex == 1) {
                        scoreStr += bCapsoA;
                    } else if (nindex == 2) {
                        scoreStr += bCapsoP;
                    } else if (nindex ==3 ) {
                        scoreStr += bCapsoS;
                    } else if (nindex ==4 ) {
                        scoreStr += bCapsoO;
                    } else if (nindex == 5)  {
                        scoreStr += bCapsoLogo;
                    }
                    break;
                case 1:
                    if (nindex == 0) {
                        scoreStr += CapsoC;
                    } else if (nindex == 1) {
                        scoreStr += CapsoA;
                    } else if (nindex == 2) {
                        scoreStr += CapsoP;
                    } else if (nindex ==3 ) {
                        scoreStr += CapsoS;
                    } else if (nindex ==4 ) {
                        scoreStr += CapsoO;
                    } else if (nindex == 5)  {
                        scoreStr += CapsoLogo;
                    }
                    break;
            }
        nindex++;
        }
    } else if (lisduo || lisquad) {
        while(nindex < 6 && !nfinished) {
            switch (playerScore[nindex]) {
                case -1:
                    nfinished = true;
                    break;
                case 0:
                    scoreStr += ScoreWrong;
                    break;
                case 1:
                    scoreStr += CytusNote;
                    nfinished = true;
                    break;
                case 2:
                    scoreStr += ScoreSkip;
                    break;
                case 3:
                    scoreStr += QuarterNote;
                    break;
                case 4:
                    scoreStr += HalfNote;
                    break;
                case 5:
                    scoreStr += ThreeQuartersNote;
                    break;
            }
            nindex++;
        }
    } 

    return scoreStr;
}

client.on('interactionCreate', async interaction => {

    if (interaction.isCommand()){
        try{
        const { commandName, options } = interaction;
        let player
        switch(commandName) {
            
            case 'ping':
                await interaction.reply("Pingged");
                break;
            case 'start':
                if (blacklistedChannels.includes(interaction.channel.id)) {
                    interaction.reply({
                    content: "You cannot play the Cytus Heardle in this channel",
                    ephemeral: true
                })
                    return;
                }
                let level = options.getInteger("number");
                if (level == null) {
                    level = heardlenumber;
                }
                try {
                    await fsp.access(levelDirectory + level +".json");
                } catch (error) {
                    interaction.reply("Cannot find that Cytus Heardle")
                    return;
                }
                try {
                   player = await loadAccount("./saves/" + interaction.user.id + ".json")
                } catch (err) {
                    console.log(err)
                    if (err.code === 'ENOENT') {
                        player = new Player(interaction.user.id, -1, [-1, -1, -1, -1, -1, -1], 1, [false, false, false, false, false, false], -1, 0, false, false)
                        await saveAccount(player);
                    }
                }
                //need testing:
                //it sends like a million leaving command... messages if you do /start multiple times.
                //have a system where the user can't enter /start multiple times 
                    //probably working
                
                //score: -1 is empty, 0 is wrong, 1 is correct, 2 is skip, 3 is 1/4, 4 is 1/2, 5 is 3/4  
                //test if new -n works correctly with all the different gamemodes
                
                //make it auto generate a new cytus heardle every day generating a new cytus heardle a seperate function
                //better -help
                //add all the dlc songs
                //maybe add the lines for the characters I dont have
                //Test on a clean account
                //things to mention:
                    //only cytus 2 songs for now. Maybe I'll add Cytus 1 later.
                if (level == heardlenumber && player.getLastHeardle() == heardlenumber && player.getFinished()) {
                    interaction.reply("You already did today's Cytus Heardle")
                    player.usedCommand = false;
                    saveAccount(player);
                    return;
                }
                if ((player.usingCommand && (Math.floor(Date.now() / 60000) - player.getTimestamp() < 5) && startupTimestamp < player.getTimestamp())) {
                    interaction.reply("You are currently using this command")
                    return;
                }

                let isPrevious = false;
                if (level < heardlenumber) {
                    isPrevious = true;
                }

                let tempLives;
                let tempScore;
                let tempVideo;
                let tempAlreadyGuessed;
                let tempNumCorrect;
                if (isPrevious) {
                    if (ischromatic) {
                        tempLives = 5;
                    } else if (isduo || isquad) {
                        tempLives = 3;
                    } else {
                        tempLives = -1;
                    }
                    tempScore = [-1, -1, -1, -1, -1, -1];
                    tempVideo = 1;
                    tempAlreadyGuessed = [false, false, false, false, false, false];
                    tempNumCorrect = 0;
                }

                if (player.getLastHeardle() < parseInt(heardlenumber) && !isPrevious) {
                    player.setLastHeardle(parseInt(heardlenumber));
                    player.setVideo(1);
                    player.setScore([-1, -1, -1, -1, -1, -1])
                    player.setAlreadyGuessed([false, false, false, false, false, false]);
                    player.setNumCorrect(0);
                    player.setFinished(false);
                    if (ischromatic) {
                        player.setLives(5);
                    } else if (isduo || isquad) {
                        player.setLives(3);
                    } else {
                        player.setLives(-1);
                    }
                    
                }
                if (currentlyGeneratingHeardle && ! isPrevious) {
                    interaction.reply("A new Cytus Heardle is currently being generated")
                    return;
                }

                player.usingCommand = true;
                saveAccount(player);

               
               
                //used to make sure the 5 min timeout does not exit if the user is still using the command
                let collectorCounter = 0;
                let localsongname
                let localnewanswer
                let localsongname1
                let localsongname2
                let localsongname3
                let localsongname4
                let localsongname5
                let localsongname6
                let localsonganswer
                let localsonganswer1
                let localsonganswer2
                let localsonganswer3
                let localsonganswer4
                let localsonganswer5
                let localsonganswer6
                let localisnormal
                let localisscrambled
                let localishardmode
                let localischromatic
                let localisreverse
                let localisduo
                let localisfragmented
                let localisquad
                let localtitle

                let localrealname1
                let localcharacter1
                let localdifficulty1

                let localrealname2
                let localcharacter2
                let localdifficulty2

                let localrealname3
                let localcharacter3
                let localdifficulty3

                let localrealname4
                let localcharacter4
                let localdifficulty4
                    
                let localrealname5
                let localcharacter5
                let localdifficulty5

                let localrealname6
                let localcharacter6
                let localdifficulty6

                let localrealname
                let localcharacter
                let localdifficulty

                if (!isPrevious) {
                localsongname = songname;
                localnewanswer = newanswer;
                localsongname1 = songname1;
                localsongname2 = songname2
                localsongname3 = songname3
                localsongname4 = songname4
                localsongname5 = songname5
                localsongname6 = songname6
                localsonganswer = songanswer
                localsonganswer1 = songanswer1
                localsonganswer2 = songanswer2
                localsonganswer3 = songanswer3
                localsonganswer4 = songanswer4
                localsonganswer5 = songanswer5
                localsonganswer6 = songanswer6
                localisnormal  = isnormal
                localisscrambled = isscrambled
                localishardmode = ishardmode
                localischromatic = ischromatic
                localisreverse = isreverse
                localisduo = isduo
                localisfragmented= isfragmented
                localisquad = isquad
                localtitle = title

                localrealname1 = realname1
                localcharacter1 = character1
                localdifficulty1 = difficulty1

                localrealname2 = realname2
                localcharacter2 = character2
                localdifficulty2 = difficulty2

                localrealname3 = realname3
                localcharacter3 = character3
                localdifficulty3 = difficulty3

                localrealname4 = realname4
                localcharacter4 = character4
                localdifficulty4 = difficulty4
                    
                localrealname5 = realname5
                localcharacter5 = character5
                localdifficulty5 = difficulty5

                localrealname6 = realname6
                localcharacter6 = character6
                localdifficulty6 = difficulty6

                localrealname = realname
                localcharacter = character
                localdifficulty = difficulty
                } else {
                    let jsonString = await fsp.readFile(levelDirectory + level +".json", 'utf8');
                    let j = JSON.parse(jsonString);

                    localsongname = j.songname;
                    localnewanswer = j.newanswer;
                    localsongname1 = j.songname1;
                    localsongname2 = j.songname2
                    localsongname3 = j.songname3
                    localsongname4 = j.songname4
                    localsongname5 = j.songname5
                    localsongname6 = j.songname6
                    localsonganswer = j.songanswer
                    localsonganswer1 = j.songanswer1
                    localsonganswer2 = j.songanswer2
                    localsonganswer3 = j.songanswer3
                    localsonganswer4 = j.songanswer4
                    localsonganswer5 = j.songanswer5
                    localsonganswer6 = j.songanswer6
                    localisnormal  = j.isnormal
                    localisscrambled = j.isscrambled
                    localishardmode = j.ishardmode
                    localischromatic = j.ischromatic
                    localisreverse = j.isreverse
                    localisduo = j.isduo
                    localisfragmented= j.isfragmented
                    localisquad = j.isquad
                    localtitle = j.title
                    
                    try {
                        if (ischromatic || isduo || isquad) {
                            let getsongname = await findsonginformation(localsongname1, 1)
                            localsongname1 = getsongname[0]
                            localsonganswer1 = getsongname[1]
                            localrealname1 = getsongname[2]
                            localcharacter1 = getsongname[3]
                            localdifficulty1 = getsongname[4]
            
                            getsongname = await findsonginformation(localsongname2, 2)
                            localsongname2 = getsongname[0]
                            localsonganswer2 = getsongname[1]
                            localrealname2 = getsongname[2]
                            localcharacter2 = getsongname[3]
                            localdifficulty2 = getsongname[4]
            
                            if(isquad || ischromatic){
                                getsongname = await findsonginformation(localsongname3, 3)
                                localsongname3 = getsongname[0]
                                localsonganswer3 = getsongname[1]
                                localrealname3 = getsongname[2]
                                localcharacter3 = getsongname[3]
                                localdifficulty3 = getsongname[4]
            
                                getsongname = await findsonginformation(localsongname4, 4)
                                localsongname4 = getsongname[0]
                                localsonganswer4 = getsongname[1]
                                localrealname4 = getsongname[2]
                                localcharacter4 = getsongname[3]
                                localdifficulty4 = getsongname[4]
                                
                                if(ischromatic) {
                                    getsongname = await findsonginformation(localsongname5, 5)
                                    localsongname5 = getsongname[0]
                                    localsonganswer5 = getsongname[1]
                                    localrealname5 = getsongname[2]
                                    localcharacter5 = getsongname[3]
                                    localdifficulty5 = getsongname[4]
            
                                    getsongname = await findsonginformation(localsongname6, 6)
                                    localsongname6 = getsongname[0]
                                    localsonganswer6 = getsongname[1]
                                    localrealname6 = getsongname[2]
                                    localcharacter6 = getsongname[3]
                                    localdifficulty6 = getsongname[4]
                                }
                            }
                        } else {
                            let getsongname = await findsonginformation(localsongname)
                            
                            console.log(getsongname)
                            localsongname = getsongname[0]
                            localsonganswer = getsongname[1]
                            localrealname = getsongname[2]
                            localcharacter = getsongname[3]
                            localdifficulty = getsongname[4]
                        }
                    } catch (error) {
                        console.log("Error when finding songinformation in /start")
                        console.log(error)
                    }
                }


                let sentMessage;
                let guessCollector;
                // let video = 1;
                // let score = [-1, -1, -1, -1, -1, -1];
                // let alreadyGuessed = [false, false, false, false, false, false]
                // let finished = false;
                
                // let lives = -1;
                // let numCorrect = 0;
                // let inBtwnMessages = ""
                let giveUpConfirm = false;
                // if (ischromatic) {
                //     lives = 5;
                // } else if (isduo || isquad) {
                //     lives = 3;
                // }
                if (isPrevious) {
                    interaction.reply("Starting a previous Cytus Heardle...\n**Progress is not saved, so make sure to do it all at once**");
                    interaction.channel.send(localtitle);
                } else if (player.getVideo() == 1) {
                    interaction.reply("Starting today's Cytus Heardle...");
                    interaction.channel.send(localtitle);
                } else {
                    interaction.reply("Resuming today's Cytus Heardle...");
                    interaction.channel.send(localtitle);
                }
                try {
                await sendNextVideo();
                } catch (error) {
                    interaction.channel.send("There was an error getting a video");
                    return;
                }
                let modifierInfo = "";
                if (localischromatic) {
                    modifierInfo += "**Chromatic:** Each video is a different song. Try to guess all 6\n"
                } else if (localisduo) {
                    modifierInfo += "**Duo:** The video alternates between 2 songs. Try to guess both\n"
                } else if (localisquad) {
                    modifierInfo += "**Quad:** The video alternates between 4 different songs. Try to guess all 4\n"
                }
                if (localisscrambled) {
                    modifierInfo += "**Scrambled:** The song starts at a random timestamp\n"
                }
                if (localishardmode) {
                    modifierInfo += "**Hard Mode:** Video lengths are halved\n"
                }
                if (localisreverse) {
                    modifierInfo += "**Reverse:** Videos are reversed\n"
                }
                if (localisfragmented) {
                    modifierInfo += "**Fragmented:** Video jumps to a random timestamp every second\n"
                }
                if (modifierInfo.length != 0) {
                    modifierInfo = "Active Modifiers:\n" + modifierInfo
                    interaction.channel.send(modifierInfo)
                }

                waitForGuess();
                

                async function sendNextVideo() {
                    let currVideo;
                    let currScore;
                    if (isPrevious) {
                        currVideo = tempVideo;
                        currScore = tempScore
                    } else {
                        currVideo = player.getVideo()
                        currScore = player.getScore()
                    }

                    if (localisnormal || localisduo || localisquad) {
                        
                       

                        if (currVideo > 6) {
                            if (guessCollector) {
                                try {
                                    guessCollector.stop();
                                } catch (error) {

                                }
                            }
                            finishedGame(currScore);
                            return;
                        }


                        row = new MessageActionRow()
                            .addComponents(
                            new MessageButton()
                                .setCustomId('next')
                                .setLabel('Next')
                                .setStyle('SUCCESS'),
                        );


                       
                        

                        

                        sentMessage = await interaction.channel.send({ 
                            files: [levelDirectory + level + '-' + currVideo +  '.mp4'],
                            components: [row] 
                        });
                        let infoFilter = i => i.user.id === message.author.id;
                        let infoCollector = sentMessage.createMessageComponentCollector({ infoFilter });
                        infoCollector.on('collect', async interaction => {
                            if (interaction.customId === 'next') {
                                
                                row.components[0].setDisabled(true);
                            
                                await sentMessage.edit({ components: [row] });
                               
                                if (localisnormal) {
                                    // let row = new MessageActionRow()
                                    //     .addComponents(
                                    //         new MessageButton()
                                    //             .setCustomId('next')
                                    //             .setLabel('Next')
                                    //             .setStyle('SUCCESS')
                                    //             .setDisabled(true)
                                    //     );
                                        
                                    // // Update the original message with the disabled button
                                    // await sentMessage.edit({ components: [row] });
                                    
                                    //row.components[0].setDisabled(true);
                                    
                                    if (isPrevious) {
                                        tempScore[tempVideo - 1] = 2;
                                        tempVideo ++;
                                    } else {
                                        player.getScore()[player.getVideo() - 1] = 2;
                                        player.incVideo();
                                    }
                                    try {
                                        await sendNextVideo();
                                        } catch (error) {
                                            interaction.channel.send("There was an error getting a video");
                                            return;
                                        }
                                } else if (localisduo || localisquad) {
                                    
                                    if (isPrevious) {
                                        tempLives = 3;
                                    } else {
                                        player.setLives(3);
                                    }

                                    // let row = new MessageActionRow()
                                    //     .addComponents(
                                    //         new MessageButton()
                                    //             .setCustomId('next')
                                    //             .setLabel('Next')
                                    //             .setStyle('SUCCESS')
                                    //             .setDisabled(true)
                                    //     );
                                        
                                    // // Update the original message with the disabled button
                                    // await sentMessage.edit({ components: [row] });
                                    
                                    //row.components[0].setDisabled(true);
                                    if (isPrevious) {
                                        if (tempScore[tempVideo - 1] == -1) {
                                            tempScore[tempVideo - 1] = 2;
                                        } 
                                        tempVideo++;
                                    } else {
                                        if (player.getScore()[player.getVideo() - 1] == -1) {
                                            player.getScore()[player.getVideo() - 1] = 2;
                                        } 
                                        player.incVideo();
                                        saveAccount(player);
                                    }
                                    try {
                                        await sendNextVideo();
                                        } catch (error) {
                                            interaction.channel.send("There was an error getting a video");
                                            return;
                                        }
                                    
                                }
                                try{
                                await interaction.deferUpdate();
                                } catch (error) {

                                }
                            } 

                            
                        });
                    } else if (localischromatic) {
                        

                        if (currScore[0] == -1 && currScore[1] == -1 && currScore[2] == -1 && currScore[3] == -1 && currScore[4] == -1 && currScore[5] == -1) {
                            await interaction.channel.send({ 
                                files: [levelDirectory + level + '-1.mp4', levelDirectory + level + '-2.mp4', levelDirectory + level + '-3.mp4', levelDirectory + level + '-4.mp4', levelDirectory + level + '-5.mp4', levelDirectory + level + '-6.mp4'] 
                            });
                        } else {
                            let files = []
                            if (currScore[0] != 1) {
                                files.push(levelDirectory + level + '-1.mp4');
                            }
                            if (currScore[1] != 1) {
                                files.push(levelDirectory + level + '-2.mp4')
                            }
                            if (currScore[2] != 1) {
                                files.push(levelDirectory + level + '-3.mp4')
                            }
                            if (currScore[3] != 1) {
                                files.push(levelDirectory + level + '-4.mp4')
                            }
                            if (currScore[4] != 1) {
                                files.push(levelDirectory + level + '-5.mp4')
                            }
                            if (currScore[5] != 1) {
                                files.push(levelDirectory + level + '-6.mp4')
                            }
                            await interaction.channel.send({
                                files: files
                            });
                        }
                        
                        row = new MessageActionRow()
                            .addComponents(
                            new MessageButton()
                                .setCustomId('resend')
                                .setLabel('Resend Unguessed Videos')
                                .setStyle('SUCCESS'),
                            new MessageButton()
                                .setCustomId('end')
                                .setLabel('Give up')
                                .setStyle('DANGER')
                            );
                            

                        sentMessage = await interaction.channel.send({ components: [row] });
                        let infoFilter = i => i.user.id === message.author.id;
                        let infoCollector = sentMessage.createMessageComponentCollector({ infoFilter });
                        infoCollector.on('collect', async interaction => {
                            if (interaction.customId === 'resend') {
                                if (isPrevious) {
                                    tempVideo++;
                                } else {
                                    player.incVideo();
                                    saveAccount(player);
                                }
                                row.components[0].setDisabled(true);
                                row.components[1].setDisabled(true);
                                try {
                                    await sendNextVideo();
                                    } catch (error) {
                                        interaction.channel.send("There was an error getting a video");
                                        return;
                                    }
                            } else if (interaction.customId === 'end') {
                                if (giveUpConfirm == false) {
                                    interaction.channel.send("Are you sure you want to give up? Press the button again to confirm");
                                    giveUpConfirm = true;
                                } else {
                                    guessCollector.stop();
                                    row.components[0].setDisabled(true);
                                    row.components[1].setDisabled(true);
                                    if (isPrevious) {
                                        tempLives = 0;
                                        finishedGame(tempScore)
                                    } else {
                                        player.setLives(0);
                                        finishedGame(player.getScore());
                                    }
                                    
                                }
                            }

                            await interaction.update({ components: [row] });
                        });
                        
                        
                    }

                       
                }

                async function waitForGuess() {
                    let currLives;
                    if (isPrevious) {
                        currLives = tempLives;
                    } else {
                        currLives = player.getLives()
                    }

                    let sendStr = "Type your guess below";
                    if (localischromatic || localisduo || localisquad) {
                        sendStr += ". Lives remaining: " + currLives
                    }
                    sendStr += '\nType "quit" to pause the game'
                    collectorCounter++;
                    let choosemessage = await interaction.channel.send(sendStr);
                    let filter = m => m.author.id === interaction.user.id  && !m.author.bot;
                    guessCollector = choosemessage.channel.createMessageCollector(filter, { max: 1, time: 1 });
                            guessCollector.on("collect", async response => {
                                if (response.author.id === client.user.id) return
                                console.log(`Collected: ${response.content}`);    
                                let userResponse = response.content.slice(0, 500);
                                userResponse = userResponse.toLowerCase();
                                guessCollector.stop()
                                
                                if (userResponse == "quit" || userResponse == "Quit") {
                                    interaction.channel.send("ok bye\nType /start to start the game again");
                                    player.usingCommand = false;
                                    saveAccount(player);
                                    return;
                                }
                                let newguess = "";
                                for (i=0; i < userResponse.length; i++) {
                                    if (userResponse[i] == " "||userResponse[i] == "\'" || userResponse[i] == "."|| userResponse[i] == "-" || userResponse[i] == "~" || userResponse[i] == ',' || userResponse[i] === "'" || userResponse[i] == "?" || userResponse[i] == "!" || userResponse[i] == ":" || userResponse[i] == "[" || userResponse[i] == "]"){
                                        newguess = newguess;
                                    }else{
                                        newguess = newguess + userResponse[i];
                                    }
                                }

                                let guessResult;
                                if (localischromatic) {
                                    guessResult = await processGuess(userResponse, [localsonganswer1, localsonganswer2, localsonganswer3, localsonganswer4, localsonganswer5, localsonganswer6])
                                } else if (localisduo) {
                                    guessResult = await processGuess(userResponse, [localsonganswer1, localsonganswer2]);
                                } else if (localisquad) {
                                    guessResult = await processGuess(userResponse, [localsonganswer1, localsonganswer2, localsonganswer3, localsonganswer4]);
                                } else if (localisnormal) {
                                    guessResult = await processGuess(userResponse, [localsonganswer])
                                }


                                if (guessResult == -1) {
                                    interaction.channel.send("Could not find that answer")
                                    waitForGuess();
                                } else if (guessResult == 1) {
                                    let currAlreadyGuessed;
                                    if (isPrevious) {
                                        currAlreadyGuessed = tempAlreadyGuessed
                                    } else {
                                        currAlreadyGuessed = player.getAlreadyGuessed()
                                    }
                                    if (localischromatic || localisduo || localisquad){
                                        if (newguess == localsonganswer1){ 
                                            if (!currAlreadyGuessed[0]) {
                                                interaction.channel.send("You guessed the 1st video!")
                                                if (isPrevious) {
                                                    tempAlreadyGuessed[0] = true;
                                                } else {
                                                    player.getAlreadyGuessed()[0] = true;
                                                }
                                                currAlreadyGuessed[0] = true;
                                                if (localischromatic) {
                                                    if (isPrevious) {
                                                        tempScore[0] = 1;
                                                    } else {
                                                        player.getScore()[0] = 1;
                                                    }
                                                }
                                            } else {
                                                interaction.channel.send("You already guessed this answer")
                                                waitForGuess();
                                                return;
                                            }
                                        }
                                        if (newguess == localsonganswer2){
                                            if (!currAlreadyGuessed[1]) {
                                                interaction.channel.send("You guessed the 2nd video!")
                                                if (isPrevious) {
                                                    tempAlreadyGuessed[1] = true;
                                                } else {
                                                    player.getAlreadyGuessed()[1] = true;
                                                }
                                                currAlreadyGuessed[1] = true;
                                                if (localischromatic) {
                                                    if (isPrevious) {
                                                        tempScore[1] = 1;
                                                    } else {
                                                        player.getScore()[1] = 1;
                                                    }
                                                }
                                             } else {
                                                interaction.channel.send("You already guessed this answer")
                                                waitForGuess();
                                                return;
                                            }
                                        }
                                        if (newguess == localsonganswer3){
                                            if (!currAlreadyGuessed[2]) {
                                                interaction.channel.send("You guessed the 3rd video!")
                                                if (isPrevious) {
                                                    tempAlreadyGuessed[2] = true;
                                                } else {
                                                    player.getAlreadyGuessed()[2] = true;
                                                }
                                                currAlreadyGuessed[2] = true;
                                                if (localischromatic) {
                                                    if (isPrevious) {
                                                        tempScore[2] = 1;
                                                    } else {
                                                        player.getScore()[2] = 1;
                                                    }
                                                }
                                            } else {
                                                interaction.channel.send("You already guessed this answer")
                                                waitForGuess();
                                                return;
                                            }
                                        }
                                        if (newguess == localsonganswer4){
                                            if (!currAlreadyGuessed[3]) {
                                                interaction.channel.send("You guessed the 4th video!")
                                                if (isPrevious) {
                                                    tempAlreadyGuessed[3] = true;
                                                } else {
                                                    player.getAlreadyGuessed()[3] = true;
                                                }
                                                currAlreadyGuessed[3] = true;
                                                if (localischromatic) {
                                                    if (isPrevious) {
                                                        tempScore[3] = 1;
                                                    } else {
                                                        player.getScore()[3] = 1;
                                                    }
                                                }
                                            } else {
                                                interaction.channel.send("You already guessed this answer")
                                                waitForGuess();
                                                return;
                                            }
                                        }
                                        if (newguess == localsonganswer5){
                                            if (!currAlreadyGuessed[4]) {
                                                interaction.channel.send("You guessed the 5th video!")
                                                if (isPrevious) {
                                                    tempAlreadyGuessed[4] = true;
                                                } else {
                                                    player.getAlreadyGuessed()[4] = true;
                                                }
                                                currAlreadyGuessed[4] = true;
                                                if (localischromatic) {
                                                    if (isPrevious) {
                                                        tempScore[4] = 1;
                                                    } else {
                                                        player.getScore()[4] = 1;
                                                    }
                                                }
                                            } else {
                                                interaction.channel.send("You already guessed this answer")
                                                waitForGuess();
                                                return;
                                            }
                                        }
                                        if (newguess == localsonganswer6){
                                            if (!currAlreadyGuessed[5]) {
                                                interaction.channel.send("You guessed the 6th video!")
                                                if (isPrevious) {
                                                    tempAlreadyGuessed[5] = true;
                                                } else {
                                                    player.getAlreadyGuessed()[5] = true;
                                                }
                                                currAlreadyGuessed[5] = true;
                                                if (localischromatic) {
                                                    if (isPrevious) {
                                                        tempScore[5] = 1;
                                                    } else {
                                                        player.getScore()[5] = 1;
                                                    }
                                                }
                                            } else {
                                                interaction.channel.send("You already guessed this answer")
                                                waitForGuess();
                                                return;
                                            }
                                        }
                                    } else {
                                        random = Math.floor(Math.random() * 3  + 1);
                                        if (random == 1) {
                                            interaction.channel.send("That's Right!")
                                        } else if (random == 2) {
                                            interaction.channel.send("Y-yes!")
                                        } else if (random == 3) {
                                            interaction.channel.send("Can you hear the gravity")
                                        }
                                    }

                                    if (localsonganswer == "yokairock"){
                                        interaction.channel.send('https://tenor.com/view/sil-cytus-cytus2-cytus-ll-cytus-ii-gif-22569735')
                                    } else if (localischromatic) {
                                        switch (chromaticGuessCharacter) {
                                            case 0:
                                                random = Math.floor(Math.random() * 8);
                                                switch(random) {
                                                    case 0:
                                                        interaction.channel.send("I am so blessed to hear such perfect melodies…")
                                                        break;
                                                    case 1:
                                                        interaction.channel.send("Beautiful… Ah, excuse me. I was too touched by your music…")
                                                        break;
                                                    case 2:
                                                        interaction.channel.send("Umm... Can we sing one more song together? I really love singing with you...")
                                                        break;
                                                    case 3:
                                                        interaction.channel.send("I’m glad that I didn’t miss your performance.")
                                                        break;
                                                    case 4:
                                                        interaction.channel.send("You’re amazing. Thank you.")
                                                        break;
                                                    case 5:
                                                        interaction.channel.send("I believe that you enjoy singing as much as I do. ^^")
                                                        break;
                                                    case 6:
                                                        interaction.channel.send("I’m so happy to hear this song.")
                                                        break;
                                                    case 7:
                                                        interaction.channel.send("Very good music. I really like it.")
                                                        break;
                                                    case 8:
                                                        interaction.channel.send("Great job. Hope I have a chance to collab with you. ^^")
                                                        break;
                                                }
                                                break;
                                            case 1:
                                                random = Math.floor(Math.random() * 8);
                                                if (random == 0) {
                                                    interaction.channel.send("HAHA fall you bastard! Sick move!")
                                                } else if (random == 1){
                                                        interaction.channel.send("Not bad, not bad at all! BUT~ still not as good as NEKO~~ (Φ∀Φ)")
                                                    }else if (random == 2){
                                                        interaction.channel.send("Noice! Nyan Nyan Nyan~ (Φˋ∀ˊΦ)b")
                                                    }else if (random == 3){
                                                        interaction.channel.send("Oof! That was close! You're just this~ close to a perfect score... (ˊΦωΦˋ)")
                                                    }else if (random == 4){
                                                        interaction.channel.send("Praise the master!! All hail the Grand Master~~~~ m(ΦдΦm)")
                                                    }else if (random == 5){
                                                        interaction.channel.send("S for SUPER!! I think? NEKO's vocab is very limited (Φ—Φ)")
                                                    }else if (random == 6){
                                                        interaction.channel.send("OMFG! You're god! You're a god, right!!??? (ΦДΦ；≡；ΦдΦ)")
                                                    }else if (random == 7){
                                                        interaction.channel.send("MMs are nothing. TP is the real deal! d(`Φ∀Φ)b #NEKOTruth")
                                                    }else if (random == 8){
                                                        interaction.channel.send("O-oooooooooo AAAAE-A-A-I-A-U- JO-oooooooooooo AAE-O-A-A-U-U-A- E-eee-ee-eee")
                                                    }
                                                break;
                                            case 2:
                                                random = Math.floor(Math.random() * 8);
                                                if (random == 0) {
                                                    interaction.channel.send("Detection: Music field sync rate 100%")
                                                } else if (random == 1){
                                                    interaction.channel.send("Analysis: Percentage of positive feedback on SNS, 100%")
                                                }else if (random == 2){
                                                    interaction.channel.send("This unit, happy. She will be, happy too.")
                                                }else if (random == 3){
                                                    interaction.channel.send("Analysis: Audience satisfaction 90%")
                                                }else if (random == 4){
                                                    interaction.channel.send("Deviation: Minimum")
                                                }else if (random == 5){
                                                    interaction.channel.send("Decision: Pre-orders for concert ticket, sales number exceeds expected value"                                )
                                                }else if (random == 6){
                                                    interaction.channel.send("Hint: Score has exceeded average Suggestion: Challenge higher level songs"                                )
                                                }else if (random == 7){
                                                    interaction.channel.send("Review: A treat for the ears"                                )
                                                }else if (random == 8){
                                                    interaction.channel.send("Decision: minor mistakes Suggestion: Retry"                                )
                                                }
                                                break;
                                            case 3:
                                                random = Math.floor(Math.random() * 8);
                                                if (random == 0) {
                                                    interaction.channel.send("Thank goodness. There weren't any deviations."                                )
                                                } else if (random == 1){
                                                    interaction.channel.send("... I hear it again; the sound that's just like the human heartbeat..."                                )
                                                }else if (random == 2){
                                                    interaction.channel.send("Perfect. It's time."                                )
                                                }else if (random == 3){
                                                    interaction.channel.send("These minimal errors are perhaps what separates you and me."                                )
                                                }else if (random == 4){
                                                    interaction.channel.send("It appears, that I've underestimated you."                                )
                                                }else if (random == 5){
                                                    interaction.channel.send("If she can hear a voice like this..."                                )
                                                }else if (random == 6){
                                                    interaction.channel.send("Conversion rate maintained at a high level. Excellent."                                )
                                                }else if (random == 7){
                                                    interaction.channel.send("Not perfect, but still an outstanding emotion sample..."                                )
                                                }else if (random == 8){
                                                    interaction.channel.send("You... may still have some value to me."                                )
                                                }
                                                break;
                                            case 4:
                                                random = Math.floor(Math.random() * 8);
                                                if (random == 0) {
                                                    interaction.channel.send("This is awesome. This is how it's like in the good old days!"      )
                                                } else if (random == 1){
                                                    interaction.channel.send("Nothing beat playing music together with you guys after all!"                                )
                                                }else if (random == 2){
                                                    interaction.channel.send("Simon, let's start from zero!"                                )
                                                }else if (random == 3){
                                                    interaction.channel.send("New single complete! Hehe, the fans would be ecstatic."                                )
                                                }else if (random == 4){
                                                    interaction.channel.send("... Want to host another music festival? The one we never got to host."                                )
                                                }else if (random == 5){
                                                    interaction.channel.send("Hey, our teamwork used to be much better, right? Cheer up!"                                )
                                                }else if (random == 6){
                                                    interaction.channel.send("If we want to be on the big stage, we need to work a bit harder~"                                )
                                                }else if (random == 7){
                                                    interaction.channel.send("Haha, I don't mind just playing around. I really enjoy this."                                )
                                                }
                                                break;
                                            case 5:
                                                random = Math.floor(Math.random() * 8);
                                                if (random == 0) {
                                                    interaction.channel.send("So... a better world can be created, together with humans."                                )
                                                } else if (random == 1){
                                                    interaction.channel.send("Yes... Can I call you by your name?"                                )
                                                }else if (random == 2){
                                                    interaction.channel.send("Ivy, we promised... we would see the blue flower once more..."                                )
                                                }else if (random == 3){
                                                    interaction.channel.send("Thank you... I feel so much better now..."                                )
                                                }else if (random == 4){
                                                    interaction.channel.send("Humans, they...they can create such beautiful sounds..."                                )
                                                }else if (random == 5){
                                                    interaction.channel.send('... Live well, at least until "the very end"...'                                )
                                                }else if (random == 6){
                                                    interaction.channel.send("If only I could be as smart as you..."                                )
                                                }else if (random == 7){
                                                    interaction.channel.send("Your voice... it makes me feel so calm..."                                )
                                                }else if (random == 8){
                                                    interaction.channel.send("The voices... they're disappearing... one by one... "                                )
                                                }
                                                break;
                                            case 6:
                                                random = Math.floor(Math.random() * 8);
                                                if (random == 0) {
                                                    interaction.channel.send("Amazing... C-Could you show me how you performed the analysis?"                                )
                                                } else if (random == 1){
                                                    interaction.channel.send("Wah... the results of this analysis are perfect."                                )
                                                }else if (random == 2){
                                                    interaction.channel.send("Th-Thank you... for being willing to try to understand me."                                )
                                                }else if (random == 3){
                                                    interaction.channel.send("Sounds amazing... Bo Bo, you think so too?"                                )
                                                }else if (random == 4){
                                                    interaction.channel.send("Waah! Sorry, I got lost in the music..."                                )
                                                }else if (random == 5){
                                                    interaction.channel.send("If everyone was like you... that'd be great."                                )
                                                }else if (random == 6){
                                                    interaction.channel.send("I-I think it sounds great..."                                )
                                                }else if (random == 7){
                                                    interaction.channel.send("Even though it wasn't perfect, I still think it sounded great."                                )
                                                }else if (random == 8){
                                                    interaction.channel.send("The one who should be saying thank you... is me..."                                )
                                                }
                                                break;
                                            case 7:
                                                random = Math.floor(Math.random() * 8);
                                                if (random == 0) {
                                                    interaction.channel.send("Meh"                               )
                                                } else if (random == 1){
                                                    interaction.channel.send("Very... meh."                           )
                                                }else if (random == 2){
                                                    interaction.channel.send("Tasty"                )
                                                }else if (random == 3){
                                                    interaction.channel.send("You ready? eh eh eh eh eh eh eh"                          )
                                                }else if (random == 4){
                                                    interaction.channel.send("Check out how ripped this finger is"                          )
                                                }else if (random == 5){
                                                    interaction.channel.send("What's a giraffe's fart smell like? Like that."                                )
                                                }else if (random == 6){
                                                    interaction.channel.send("A wee bit outta control"                                )
                                                }else if (random == 7){
                                                    interaction.channel.send("I'm... waiting"                                )
                                                }else if (random == 8){
                                                    interaction.channel.send("Let that bass drop O-oooooooooo"     )
                                                }
                                                break;
                                            case 8:
                                                random = Math.floor(Math.random() * 8);
                                                if (random == 0) {
                                                    interaction.channel.send("You sound as good as he does!"                                )
                                                } else if (random == 1){
                                                    interaction.channel.send("Deemo..."                                )
                                                }else if (random == 2){
                                                    interaction.channel.send("Exactly like I remember it..."                                )
                                                }else if (random == 3){
                                                    interaction.channel.send("Wah! If you keep playing like that, the tree will grow for sure!"                                )
                                                }else if (random == 4){
                                                    interaction.channel.send("Just a little bit off."                                )
                                                }else if (random == 5){
                                                    interaction.channel.send("... Can we make a promise?"                                )
                                                }else if (random == 6){
                                                    interaction.channel.send("Can you play it one more time for me? (Rolls up her sleeve)"                                )
                                                }else if (random == 7){
                                                    interaction.channel.send("Uh-huh! You're much better than I am!"                                )
                                                }else if (random == 8){
                                                    interaction.channel.send("Seeing you work so hard... gives me courage..."                                )
                                                }
                                                break;
                                            case 9:
                                                random = Math.floor(Math.random() * 8);
                                                if (random == 0) {
                                                    interaction.channel.send("Absolutely stunning. Both the power and speed are perfect..."                                )
                                                } else if (random == 1){
                                                    interaction.channel.send("P-Please... allow me to address you as teacher!"                                )
                                                }else if (random == 2){
                                                    interaction.channel.send("Amazing... it's exactly like the melody from my dream..."                                )
                                                }else if (random == 3){
                                                    interaction.channel.send("If we have the chance... I'd love to collaborate with you!"                                )
                                                }else if (random == 4){
                                                    interaction.channel.send("Wow... Surely you've practiced that many times?"                                )
                                                }else if (random == 5){
                                                    interaction.channel.send("Mr. Neumann would certainly approve!"                                )
                                                }else if (random == 6){
                                                    interaction.channel.send("Very good, but I think you can do better..."                                )
                                                }else if (random == 7){
                                                    interaction.channel.send("The performance is next week. You've got to work harder."                                )
                                                }else if (random == 8){
                                                    interaction.channel.send("If I play it with you, it doesn't sound so bad..."                                )
                                                }
                                                break;
                                            case 10:
                                                random = Math.floor(Math.random() * 8);
                                                if (random == 0) {
                                                    interaction.channel.send("Ta~da! Attention everyone~ The uber-popular Kizuna Ai is now on stage!"                                )
                                                } else if (random == 1){
                                                    interaction.channel.send("Ah, it's my new song... Hehe, you're the best!"                                )
                                                }else if (random == 2){
                                                    interaction.channel.send("... You know, I really do like humans."                               )
                                                }else if (random == 3){
                                                    interaction.channel.send("You're pretty good~ Ah, I'm Kizuna Ai. Nice to meet you!"                                )
                                                }else if (random == 4){
                                                    interaction.channel.send("Assistant-kun~ I want this person to accompany my next performance. Go get it done!"                  )
                                                }else if (random == 5){
                                                    interaction.channel.send("... T-thank you for liking my songs! Good luck to you as well!"                                )
                                                }else if (random == 6){
                                                    interaction.channel.send("Must satisfy the fans even more~ Come on, show more enthusiasm!"                                )
                                                }else if (random == 7){
                                                    interaction.channel.send("A few more practice runs and I'm all set for the performance. Gotta work hard~"                                )
                                                }else if (random == 8){
                                                    interaction.channel.send("Even though it's a bit off-key... it still sounds better than the one in the database."                                )
                                                }
                                                break;
                                            case 11:
                                                random = Math.floor(Math.random() * 8);
                                                if (random == 0) {
                                                    interaction.channel.send("Hello~ everyone~ I'm Hatsune Miku!"                )
                                                } else if (random == 1){
                                                    interaction.channel.send("I'm really... really thankful to everyone for always supporting me."                                )
                                                }else if (random == 2){
                                                    interaction.channel.send("That's right. I sing... for the sake of everybody."                                )
                                                }else if (random == 3){
                                                    interaction.channel.send("Whew~... Everyone is very happy. I'm relieved~"                                )
                                                }else if (random == 4){
                                                    interaction.channel.send("So close~ I need to practice even harder!"                                )
                                                }else if (random == 5){
                                                    interaction.channel.send("... In the end, I still want to sing one last time..."                                )
                                                }else if (random == 6){
                                                    interaction.channel.send("Good work~ Ah, thank you."                                )
                                                }else if (random == 7){
                                                    interaction.channel.send("I'm not tired at all. I'm still very lively!"                                )
                                                }else if (random == 8){
                                                    interaction.channel.send("Muuu~ Messed up again! The songs NEKO arranged are all so hard..."                                )
                                                }
                                                break;
                                            case 12:
                                                random = Math.floor(Math.random() * 8);
                                                if (random == 0) {
                                                    interaction.channel.send("Excellent. The success of our operation is ensured."                                )
                                                } else if (random == 1){
                                                    interaction.channel.send("Tell me, is there anything can I do to convince you to join the revolution?"                                )
                                                }else if (random == 2){
                                                    interaction.channel.send("... You're a very unique human."                                )
                                                }else if (random == 3){
                                                    interaction.channel.send("Oh? You've lifted my spirits a little."                                )
                                                }else if (random == 4){
                                                    interaction.channel.send("Your talents are intriguing. Why not join us?"                                )
                                                }else if (random == 5){
                                                    interaction.channel.send("... You can do it. I believe in you."                                )
                                                }else if (random == 6){
                                                    interaction.channel.send("Not bad... You've exceeded my expectations."                                )
                                                }else if (random == 7){
                                                    interaction.channel.send("Your proposal is worth considering."                                )
                                                }else if (random == 8){
                                                    interaction.channel.send("... Seems you might be suffering from a slight malfunction."    )
                                                }
                                                break;
                                            case 13:
                                                random = Math.floor(Math.random() * 8);
                                                if (random == 0) {
                                                    interaction.channel.send("These skills... I accept defeat."                                )
                                                } else if (random == 1){
                                                    interaction.channel.send("A perfect score... for real? You are truly awesome."                                )
                                                }else if (random == 2){
                                                    interaction.channel.send("I'm considering giving you the optic guitar... You deserve it more than me."                                )
                                                }else if (random == 3){
                                                    interaction.channel.send("You came really close. You'll get it next time. I guarantee it."                                )
                                                }else if (random == 4){
                                                    interaction.channel.send("Mind if I take a look at your tone settings? That sound was incredible."                                )
                                                }else if (random == 5){
                                                    interaction.channel.send("A machine may be better than JOE, but it's still no match for you."                                )
                                                }else if (random == 6){
                                                    interaction.channel.send("Well-Played"                                )
                                                }else if (random == 7){
                                                    interaction.channel.send("The music is fantastic."                               )
                                                }else if (random == 8){
                                                    interaction.channel.send("Great work. Looking forward to an opportunity to JAM with you someday."                                )
                                                }
                                                break;
                                            case 14:
                                                random = Math.floor(Math.random() * 8);
                                                if (random == 0) {
                                                    interaction.channel.send("What a splendid performance. A rare sight to behold in this world."                                )
                                                } else if (random == 1){
                                                    interaction.channel.send("I can't remember the last time I had such respect for a fellow performer."                                )
                                                }else if (random == 2){
                                                    interaction.channel.send("Performing on the same level as myself... Impressive, very impressive."                                )
                                                }else if (random == 3){
                                                    interaction.channel.send("Tiny flaws stand out when nearing perfection. I believe you understand this."                                )
                                                }else if (random == 4){
                                                    interaction.channel.send("A very clear tone... Despite small impurities, it's already worth my attention."                                )
                                                }else if (random == 5){
                                                    interaction.channel.send("Such free and unrestrained tunes... I can feel your soul and personality in it."                                )
                                                }else if (random == 6){
                                                    interaction.channel.send("Hoho? Looks like you did put in the time to practice. "                                )
                                                }else if (random == 7){
                                                    interaction.channel.send("You certainly deserve some compliments."                                )
                                                }else if (random == 8){
                                                    interaction.channel.send("Excellent, though still not quite reaching my standards."                                )
                                                }
                                                break;
                                            case 15:
                                                random = Math.floor(Math.random() * 8);
                                                if (random == 0) {
                                                    interaction.channel.send("WOW!! You're so cool!!"                                )
                                                } else if (random == 1){
                                                    interaction.channel.send("That's godly... I admire you!! Please teach me your tricks!!"                                )
                                                }else if (random == 2){
                                                    interaction.channel.send("See~? I told you that your hardwork will pay off!"                                )
                                                }else if (random == 3){
                                                    interaction.channel.send("Haha... Your singing is unbelievable"                                )
                                                }else if (random == 4){
                                                    interaction.channel.send("Can't imagine how great it would be if I can sing with you on-stage, together!"                                )
                                                }else if (random == 5){
                                                    interaction.channel.send("What!? Darn it! I'm going to challenge you again!!"                                )
                                                }else if (random == 6){
                                                    interaction.channel.send("Nice! You're really good at this!"                                )
                                                }else if (random == 7){
                                                    interaction.channel.send("Outstanding!!"                                )
                                                }else if (random == 8){
                                                    interaction.channel.send("We should've gotten you to join our band. Instead, we got JOE..."                                )
                                                }
                                                break;
                                            case 16:
                                                random = Math.floor(Math.random() * 8);
                                                if (random == 0) {
                                                    interaction.channel.send("That was so~~ sic!! Please let me call you master!"                                )
                                                } else if (random == 1){
                                                    interaction.channel.send('I hereby surrender the title "Bass God of Quadrant III” to you!'                                )
                                                }else if (random == 2){
                                                    interaction.channel.send("This APM... It's faster than Simon, isn't it? Quick, go kick his arrogant a**!"                                )
                                                }else if (random == 3){
                                                    interaction.channel.send("Nice moves, my man! Haven't seen a musician this good in a long~ time!!"                                )
                                                }else if (random == 4){
                                                    interaction.channel.send("Your skillz alone deserve a drink! Here, it's on me!!"                                )
                                                }else if (random == 5){
                                                    interaction.channel.send("Ehhhh, You're phenomenal!! Wanna crash the party with me next time?"                                )
                                                }else if (random == 6){
                                                    interaction.channel.send("Wow~ You're definitely no average Joe!"                            )
                                                }else if (random == 7){
                                                    interaction.channel.send("Great job! I expect no less from a fellow Jazz lover!"                                )
                                                }else if (random == 8){
                                                    interaction.channel.send("Man, that was some good music~ Takes me back to the good ol' Crystal PuNK days~ "                                )
                                                }
                                                break;
                                            case 17:
                                                random = Math.floor(Math.random() * 8);
                                                if (random == 0) {
                                                    interaction.channel.send("Nailed it! Mission was completed perfectly. Wrap it up!"                                )
                                                } else if (random == 1){
                                                    interaction.channel.send("Join Eagle - 01! I'll prove to you that it was the right choice. "                                )
                                                }else if (random == 2){
                                                    interaction.channel.send("Is your name... Rin? Can I call you that?"                                )
                                                }else if (random == 3){
                                                    interaction.channel.send("I'm relieved to know I've got such an outstanding comrade to cover my back."                                )
                                                }else if (random == 4){
                                                    interaction.channel.send("Since Eagle - 01 got involved, everything got handled."                                )
                                                }else if (random == 5){
                                                    interaction.channel.send("Exactly. If you keep that up, little by little, the world will change."                                )
                                                }else if (random == 6){
                                                    interaction.channel.send("Not bad, better than expected."                                )
                                                }else if (random == 7){
                                                    interaction.channel.send("Thanks to training on a regular basis, you're able to adapt to situations on the fly."                                )
                                                }else if (random == 8){
                                                    interaction.channel.send("Jackal, focus! What kind of captain do you think I am?"                                )
                                                }
                                                break;
                                            case 18:
                                                random = Math.floor(Math.random() * 8);
                                                if (random == 0) {
                                                    interaction.channel.send("This is the most beautiful music I've ever heard... Really..."                                )
                                                } else if (random == 1){
                                                    interaction.channel.send("Can you... teach me that...?"                                )
                                                }else if (random == 2){
                                                    interaction.channel.send("... Rin... "                                )
                                                }else if (random == 3){
                                                    interaction.channel.send("That's... amazing."                                )
                                                }else if (random == 4){
                                                    interaction.channel.send("If-If it was me, I probably couldn't reach that level..."                                )
                                                }else if (random == 5){
                                                    interaction.channel.send("Just like you... living a normal life..."                                )
                                                }else if (random == 6){
                                                    interaction.channel.send("Ah... Almost perfect..."                                )
                                                }else if (random == 7){
                                                    interaction.channel.send("Sounds so good... Can you play it one more time...?"                                )
                                                }else if (random == 8){
                                                    interaction.channel.send("I'm... not frightened by you..."                                )
                                                }
                                                break;
                                            case 19:
                                                random = Math.floor(Math.random() * 8);
                                                if (random == 0) {
                                                    interaction.channel.send("You... You must really love singing... just like me."                                )
                                                } else if (random == 1){
                                                    interaction.channel.send("Ah, I... I was too engrossed in the music. Sorry..."                                )
                                                }else if (random == 2){
                                                    interaction.channel.send('The "music world" of my dreams... You have to be there with me.'                                )
                                                }else if (random == 3){
                                                    interaction.channel.send("It's beautiful... It really is."                                )
                                                }else if (random == 4){
                                                    interaction.channel.send("Amazing. I want to hear it again..."                                )
                                                }else if (random == 5){
                                                    interaction.channel.send("Great job! Would you let me accompany you till the end of this song?"                                )
                                                }else if (random == 6){
                                                    interaction.channel.send("I... really like it a lot."                                )
                                                }else if (random == 7){
                                                    interaction.channel.send("Feels nice; the atmosphere is so comfortable..."                                )
                                                }else if (random == 8){
                                                    interaction.channel.send("It was so good! I want to hear you sing some more!"                                )
                                                }
                                                break;
                                            case 20:
                                                random = Math.floor(Math.random() * 8);
                                                if (random == 0) {
                                                    interaction.channel.send("……：D"                                )
                                                } else if (random == 1){
                                                    interaction.channel.send("Results are amazing. The experiment is a great success. Congratulations!"                                )
                                                }else if (random == 2){
                                                    interaction.channel.send("You are a very special presence...... I'm so glad to have you by my side."                                )
                                                }else if (random == 3){
                                                    interaction.channel.send("……：)"                                )
                                                }else if (random == 4){
                                                    interaction.channel.send("The structure of the rhythm is very well-balanced... Science really is everywhere."                                )
                                                }else if (random == 5){
                                                    interaction.channel.send("Haha, I can understand that feeling. It's probably... happiness."                                )
                                                }else if (random == 6){
                                                    interaction.channel.send("……：l"                                )
                                                }else if (random == 7){
                                                    interaction.channel.send("The control variable must be constant. Keep working on it. Fight!"                                )
                                                }else if (random == 8){
                                                    interaction.channel.send("I think you're fine the way you are now."                                )
                                                }
                                                break;
                                            case 21:
                                                random = Math.floor(Math.random() * 8);
                                                if (random == 0) {
                                                    interaction.channel.send("Uwaa! WAAAAA! &^*%(%(%(#)!"                                )
                                                } else if (random == 1){
                                                    interaction.channel.send("NEKO is so glad that she came to see this performance! It was so~satisfying!!"                                )
                                                }else if (random == 2){
                                                    interaction.channel.send("I think... you're kinda cool when you're in your game."                                )
                                                }else if (random == 3){
                                                    interaction.channel.send("WOW! That was an amazing voice! But NEKO will not lose to you!"                                )
                                                }else if (random == 4){
                                                    interaction.channel.send("Crap! NEKO's record is gonna get broken! You can't do that!"                                )
                                                }else if (random == 5){
                                                    interaction.channel.send("NEKO is getting hyped! Hahahaha! It's time for a showdown!"                                )
                                                }else if (random == 6){
                                                    interaction.channel.send("... That doesn't sound bad, like, at all? NEKO is so shocked!"                                )
                                                }else if (random == 7){
                                                    interaction.channel.send("Never heard of your name before. Neko is a bit surprised~"                                )
                                                }else if (random == 8){
                                                    interaction.channel.send("NEKO is very interested in you! Hey, listen to NEKO's works too! OVER!"                                )
                                                }
                                                break;
                                        
                                        }
                                    } else {
                                        random = Math.floor(Math.random() * 44); //0-43
                                        switch (random) {
                                            case 0:
                                                interaction.channel.send("https://media.discordapp.net/attachments/965929751560736808/1217498011077312692/CD05F748-E0C8-4640-9695-6D4B2111FD52.gif")
                                                break;
                                            case 1:
                                                interaction.channel.send("https://tenor.com/view/persona-persona5-anime-grrrr-grrrrrrrrffrbbf-rnnfffff-grrrrrr-gif-4237798374250820452")
                                                break;
                                            case 2:
                                                interaction.channel.send("https://tenor.com/view/project-sekai-pjsekai-mafuyu-asahina-non-looping-shes-so-cool-gif-4289337147285060222")
                                                break;
                                            case 3:
                                                interaction.channel.send("https://tenor.com/view/kanade-kanade-yoisaki-project-sekai-pjsekai-nightcord-gif-26567034")
                                                break;
                                            case 4:
                                                interaction.channel.send("https://tenor.com/view/jellystualy-emu-otori-nene-kusanagi-emu-nene-gif-7965257020384079872")
                                                break;
                                            case 5:
                                                interaction.channel.send("https://tenor.com/view/cytus-djmax-robot-gif-19939668")
                                                break;
                                            case 6:
                                                interaction.channel.send("https://tenor.com/view/persona5-persona-ryuji-for-real-gif-24281518")
                                                break;
                                            case 7:
                                                interaction.channel.send("https://tenor.com/view/bell0017-bell0017hw-cytus-gif-26401677")
                                                break;
                                            case 8:
                                                interaction.channel.send("https://tenor.com/view/persona5-kasumi-yoshizawa-sumire-background-live-mask-gif-22121981")
                                                break;
                                            case 9:
                                                interaction.channel.send("https://media.discordapp.net/attachments/1068549385895563405/1172255745786515496/image0.gif?ex=6568e1bd&is=65566cbd&hm=1b58ce975830050bab54dbfcb1460a38512a48b05ca87c5548fa4482087ee53d&")
                                                break;
                                            case 10:
                                                interaction.channel.send("https://tenor.com/view/shiho-shiho-hinomori-project-sekai-gif-27010803")
                                                break;
                                            case 11:
                                                interaction.channel.send("https://tenor.com/view/neko-cytus-cytus2-cytus-ii-asakura-neko-gif-18923482")
                                                break;
                                            case 12:
                                                interaction.channel.send("https://tenor.com/view/tsukasa-tenma-tsukasa-tenma-chibi-tsukasa-tsukasa-tenma-rizz-rizz-gif-13466444488775115034")
                                                break;
                                            case 13:
                                                interaction.channel.send("https://tenor.com/view/hatsune-miku-hatsune-vocaloid-music-pfp-gif-26522132")
                                                break;
                                            case 14:
                                                interaction.channel.send("https://media.discordapp.net/attachments/958534665214521366/1123629459178799185/tenor.gif")
                                                break;
                                            case 15:
                                                interaction.channel.send("https://tenor.com/view/ethan-robot-cytus-gif-24589342")
                                                break;
                                            case 16:
                                                interaction.channel.send("https://tenor.com/view/cytus-neko-val-cytus2-gif-26233056")
                                                break;
                                            case 17:
                                                interaction.channel.send("https://tenor.com/view/jessie-brawlstars-brawl-stars-punch-the-air-gif-18799568")
                                                break;
                                            case 18:
                                                interaction.channel.send("https://tenor.com/view/gus-brawl-stars-gus-wins-brawl-stars-gus-gus-champion-skin-gif-18134644229223852887")
                                                break;
                                            case 19:
                                                interaction.channel.send("https://tenor.com/view/mizuki-akiyama-project-sekai-nightchord-at2500-niigo-25ji-nightcode-de-gif-24341247")
                                                break;
                                            case 20:
                                                interaction.channel.send("https://tenor.com/view/mafuyu-pjsk-silly-mafuyu-eats-tacos-asahina-gif-16122861347198600306")
                                                break;
                                            case 21:
                                                interaction.channel.send("https://tenor.com/view/persona5-gif-23620446")
                                                break;
                                            case 22:
                                                interaction.channel.send("https://tenor.com/view/pjsk-pjsk-anime-project-sekai-project-sekai-anime-wxs-gif-9407245830572863792")
                                                break;
                                            case 23:
                                                interaction.channel.send("https://tenor.com/view/shiho-hinomori-project-sekai-pjsekai-leoneed-gif-24341452")
                                                break;
                                            case 24:
                                                interaction.channel.send("https://media.discordapp.net/attachments/1068549385895563405/1172494105427853373/image0.gif?ex=6560853a&is=654e103a&hm=e817aaeed0381fa5238770f9e277dff2cc162044284e5f8e3ea94771eb384d17&")
                                                break;
                                            case 25:
                                                interaction.channel.send("https://media.discordapp.net/attachments/1068549385895563405/1174392593564581960/image0.gif?ex=65676d55&is=6554f855&hm=ff7fca6fdc4087730e70b9836ac53219483aea208a01217965d18e92491bfef0&")
                                                break;
                                            case 26:
                                                interaction.channel.send("https://tenor.com/view/project-sekai-vivid-bad-squad-an-shiraishi-kohane-azusawa-anhane-gif-25251420")
                                                break;
                                            case 27:
                                                interaction.channel.send("https://tenor.com/view/emu-emu-otori-pjsk-proseka-project-sekai-gif-12968349351547973992")
                                                break;
                                            case 28:
                                                interaction.channel.send("https://tenor.com/view/meow-meowth-waffle-house-waffles-proud-gif-14190884176670464192")
                                                break;
                                            case 29:
                                                interaction.channel.send("https://tenor.com/view/pjsk-pjsk-anime-project-sekai-project-sekai-anime-mmj-gif-10914337658712088112")
                                                break;
                                            case 30:
                                                interaction.channel.send("https://tenor.com/view/mizuki-mizuki-akiyama-mizuki-project-sekai-mizuki-pjsekai-project-gif-25889555")
                                                break;
                                            case 31:
                                                interaction.channel.send("https://tenor.com/view/cytus-cytus2-hooray-gif-13277103")
                                                break;
                                            case 32:
                                                interaction.channel.send("https://tenor.com/view/brawl-stars-shh-brawl-stars-mewing-gif-5598305440252568514")
                                                break;
                                            case 33:
                                                interaction.channel.send("https://tenor.com/view/brawl-stars-brawl-stars-melodie-brawl-stars-draco-melodiexdraco-dracoxmelodie-gif-17744744157038313847")
                                                break;
                                            case 34:
                                                interaction.channel.send("https://tenor.com/view/dancing-tick-tick-dancing-dancing-tick-brawl-stars-dancing-tick-bs-tick-dancing-brawl-stars-gif-15484678500541140456")
                                                break;
                                            case 35:
                                                interaction.channel.send("https://tenor.com/view/brawl-stars-starr-drops-dani-supercell-flying-gif-14477520575650368149")
                                                break;
                                            case 36:
                                                interaction.channel.send("https://tenor.com/view/crkingshades-cr-clashroyale-clashroyaleking-thuglifeglasses-gif-14466574509926864112")
                                                break;
                                            case 37:
                                                interaction.channel.send("https://tenor.com/view/hop-on-gtfo-gtfo-the-game-gtfo-spitter-gtfo-charger-gtfo-striker-gif-16129871932800180156")
                                                break;
                                            case 38:
                                                interaction.channel.send("https://tenor.com/view/rabbitandsteel-rabbit-and-steel-shop-gif-755090893713173516")
                                                break;
                                            case 39:
                                                interaction.channel.send("https://tenor.com/view/rabbit-%26-steel-gif-8748528464964788939")
                                                break;
                                            case 40:
                                                interaction.channel.send("https://tenor.com/view/rabbit-and-steel-rabbit-%26-steel-sniper-rabbit-spin-gif-2428221482294726878")
                                                break;
                                            case 41:
                                                interaction.channel.send("https://tenor.com/view/rabbit-%26-steel-rabbit-and-steel-wizard-rabbit-spin-gif-13325731615843332888")
                                                break;
                                            case 42:
                                                interaction.channel.send("https://tenor.com/view/ariweather-miku-hatsune-miku-anime-picmix-gif-18084280083452120607")
                                                break;
                                            case 43:
                                                interaction.channel.send("https://tenor.com/view/pjsk-project-sekai-pjsekai-pjsk-anime-project-sekai-anime-gif-9673729505651848784")
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
                                    
                                    let currScore;
                                    let currVideo;
                                    if (isPrevious) {
                                        currVideo = tempVideo;
                                        currScore = tempScore;
                                    } else {
                                        currScore = player.getScore();
                                        currVideo = player.getVideo();
                                    }

                                    if (localisnormal) {
                                        let row = new MessageActionRow()
                                            .addComponents(
                                                new MessageButton()
                                                    .setCustomId('next')
                                                    .setLabel('Next')
                                                    .setStyle('SUCCESS')
                                                    .setDisabled(true) // Disable the button
                                            );
                                        
                                        // Update the original message with the disabled button
                                        sentMessage.edit({ components: [row] });

                                        if (isPrevious) {
                                            tempScore[tempVideo - 1] = 1;
                                            finishedGame(tempScore);
                                        } else {
                                            player.getScore()[player.getVideo() - 1] = 1;
                                            finishedGame(player.getScore());
                                        }
                                    } else if (localischromatic) {
                                        if (currScore[0] == 1 && currScore[1] == 1 && currScore[2] == 1 && currScore[3] == 1 && currScore[4] == 1 && currScore[5] == 1) {
                                            if (isPrevious) {
                                                finishedGame(tempScore);
                                            } else {
                                                finishedGame(player.getScore())
                                            }
                                        } else {
                                            waitForGuess();
                                        }
                                    } else if (localisduo) {
                                        if (isPrevious) {
                                            if (tempNumCorrect == 1) {
                                                tempScore[tempVideo - 1] == 4;
                                            }
                                            if (tempScore[tempVideo - 1] == -1 || tempScore[tempVideo - 1] == 0) {
                                                tempScore[tempVideo - 1] = 4
                                            
                                            } else {
                                                tempScore[tempVideo - 1] = 1;
                                        
                                            }
                                            
                                            tempNumCorrect ++;
                                            if (tempNumCorrect >= 2) {
                                                finishedGame(tempScore);
                                            } else {
                                                waitForGuess();
                                            }
                                        } else {
                                            if (player.getNumCorrect() == 1) {
                                                player.getScore()[player.getVideo() - 1] = 4;
                                            }
                                            if (player.getScore()[player.getVideo() - 1] == -1 || player.getScore()[player.getVideo() - 1] == 0) {
                                                player.getScore()[player.getVideo() - 1] = 4
                                            
                                            } else {
                                                player.getScore()[player.getVideo() - 1] = 1;
                                        
                                            }
                                            
                                            player.incNumCorrect();
                                            if (player.getNumCorrect() >= 2) {
                                                finishedGame(player.getScore());
                                            } else {
                                                waitForGuess();
                                            }
                                        }
                                    } else if (localisquad) {
                                        if (isPrevious) {

                                            


                                            switch (tempNumCorrect) {
                                                case 1:
                                                    tempScore[tempVideo - 1] = 3;
                                                    break;
                                                case 2:
                                                    tempScore[tempVideo - 1] = 4;
                                                    break;
                                                case 3:
                                                    tempScore[tempVideo - 1] = 5;
                                                    break;
                                                case 4:
                                                    tempScore[tempVideo - 1] = 1;
                                                    break;
                                            }
                                            
                                            tempNumCorrect++;

                                            

                                            if (tempScore[tempVideo - 1] == -1 || tempScore[tempVideo - 1] == 0) {
                                                tempScore[tempVideo - 1] = 3
                                            } else if (tempScore[tempVideo - 1] == 3) {
                                                tempScore[tempVideo - 1] = 4;
                                            } else if (tempScore[tempVideo - 1] == 4) {
                                                tempScore[tempVideo - 1] = 5
                                            } else if (tempScore[tempVideo - 1] == 5) {
                                                tempScore[tempVideo - 1] = 1;
                                            }
                                            if (tempNumCorrect >= 4) {
                                                finishedGame(tempScore)
                                            } else {
                                                waitForGuess();
                                            }
                                        } else {
                                            
                                            
                                            switch (player.getNumCorrect()) {
                                                case 1:
                                                    player.getScore()[player.getVideo() - 1] = 3;
                                                    break;
                                                case 2:
                                                    player.getScore()[player.getVideo() - 1] = 4;
                                                    break;
                                                case 3:
                                                    player.getScore()[player.getVideo() - 1] = 5;
                                                    break;
                                                case 4:
                                                    player.getScore()[player.getVideo() - 1] = 1;
                                                    break;
                                            }

                                            player.incNumCorrect();

                                            if (player.getScore()[player.getVideo() - 1] == -1 || player.getScore()[player.getVideo() - 1] == 0) {
                                                player.getScore()[player.getVideo() - 1] = 3
                                            } else if (player.getScore()[player.getVideo() - 1] == 3) {
                                                player.getScore()[player.getVideo() - 1] = 4;
                                            } else if (player.getScore()[player.getVideo() - 1] == 4) {
                                                player.getScore()[player.getVideo() - 1] = 5
                                            } else if (player.getScore()[player.getVideo() - 1] == 5) {
                                                player.getScore()[player.getVideo() - 1] = 1;
                                            }
                                            if (player.getNumCorrect() >= 4) {
                                                finishedGame(player.getScore())
                                            } else {
                                                waitForGuess();
                                            }
                                        }
                                    }
                                    saveAccount(player);
                                } else if (guessResult == 0) {
                                    random = Math.floor(Math.random() * 3);
                                        switch(random) {
                                            case 0:
                                                interaction.channel.send('Incorrect!')
                                                break;
                                            case 1:
                                                interaction.channel.send("NO!")
                                                break;
                                            case 2:
                                                interaction.channel.send("NOPE")
                                                break;
                                        }
                                    if (localischromatic) {
                                        switch (chromaticGuessCharacter) {
                                            case 0:
                                                random = Math.floor(Math.random() * 8);
                                                if (random == 0) {
                                                    interaction.channel.send("We both need to keep improving."                                  )
                                                } else if (random == 1){
                                                    interaction.channel.send("Hope I can see an even better performance from you."                                )
                                                }else if (random == 2){
                                                    interaction.channel.send("If you like this song, I will sing it again on the event. ^^"                                   )
                                                }else if (random == 3){
                                                    interaction.channel.send("You can’t be this nervous… I think…"                                    )
                                                }else if (random == 4){
                                                    interaction.channel.send("Please try again."                               )
                                                }else if (random == 5){
                                                    interaction.channel.send("I’m sorry, I’m not feeling so well… I want to rest now."                                   )
                                                }else if (random == 6){
                                                    interaction.channel.send("Umm, I’m sorry…"                       )
                                                }else if (random == 7){
                                                    interaction.channel.send("I don’t think I recognize this song…"                                )
                                                }else if (random == 8){
                                                    interaction.channel.send("I’m sorry… I don’t really want to talk now…"                                   )
                                                }
                                                break;
                                            case 1:
                                                random = Math.floor(Math.random() * 8);
                                                if (random == 0) {
                                                    interaction.channel.send("Hoho, pretty good~~ Starting to feel it ain't you (Φ∀Φ)"                               )
                                                } else if (random == 1){
                                                    interaction.channel.send("I'm a little impressed (Φ∀Φ)"                          )
                                                }else if (random == 2){
                                                    interaction.channel.send("NEKO thinks you're pretty good~ but not good enough! Muhahaha (Φˋ∀ˊΦ)b"                )
                                                }else if (random == 3){
                                                    interaction.channel.send("(ΦωΦ) (No comment)"                          )
                                                }else if (random == 4){
                                                    interaction.channel.send("I think this is... O~~Kay?? (ΦωΦ)"                          )
                                                }else if (random == 5){
                                                    interaction.channel.send("Hmm... this score... Maybe you should start with something... easier (ΦωΦ).?"                                )
                                                }else if (random == 6){
                                                    interaction.channel.send("You suck!! No seriously, why are you so bad??? Reboot needed σ ΦωΦ) Φ∀Φ)σ"                                )
                                                }else if (random == 7){
                                                    interaction.channel.send("LMFAO Look at you~ σ ΦωΦ) Φ∀Φ)σ"                                )
                                                }else if (random == 8){
                                                    interaction.channel.send("Even my grandma has better scores than this~ σ ΦωΦ) Φ∀Φ)σ"     )
                                                }
                                                break;
                                            case 2:
                                                random = Math.floor(Math.random() * 8);
                                                if (random == 0) {
                                                    interaction.channel.send("Detection: Input device damaged, level: moderate"                               )
                                                } else if (random == 1){
                                                    interaction.channel.send("Warning: Dissonant tunes playing now"                                )
                                                }else if (random == 2){
                                                    interaction.channel.send("Suggestion: Repeated practice, could help improve sync rate"                                )
                                                }else if (random == 3){
                                                    interaction.channel.send("Warning: Signal interference occurring"                                )
                                                }else if (random == 4){
                                                    interaction.channel.send("Speculation: Signal lag on display device"                                )
                                                }else if (random == 5){
                                                    interaction.channel.send("Troubleshoot: Injury to hand joints"                                )
                                                }else if (random == 6){
                                                    interaction.channel.send("Warning: Sound receiving device, severely damaged"                                )
                                                }else if (random == 7){
                                                    interaction.channel.send("Detection: Destructive soundwaves occurring"                                )
                                                }else if (random == 8){
                                                    interaction.channel.send("Hint: Unable to detect player Speculation: Player has disconnected"                                )
                                                }
                                                break;
                                            case 3:
                                                random = Math.floor(Math.random() * 8);
                                                if (random == 0) {
                                                    interaction.channel.send("From your music, I can't hear any sense of evolution."                                )
                                                } else if (random == 1){
                                                    interaction.channel.send("This is quite a distance from what I am aiming for."                                )
                                                }else if (random == 2){
                                                    interaction.channel.send("Humans... As expected, they are exactly the same as what the data showed..."                                )
                                                }else if (random == 3){
                                                    interaction.channel.send("My expectations were too high. Must adjust the algorithms right away."                                )
                                                }else if (random == 4){
                                                    interaction.channel.send("Can't find any item that is worth analyzing."                                )
                                                }else if (random == 5){
                                                    interaction.channel.send("This memory data is too broken to use. Need to resort to more extreme methods..."                                )
                                                }else if (random == 6){
                                                    interaction.channel.send("Destruction, war, death... Why do I have all these thoughts in my brain right now...?"                                )
                                                }else if (random == 7){
                                                    interaction.channel.send("... I am, angry right now, I suppose."                                )
                                                }else if (random == 8){
                                                    interaction.channel.send("Malfunction...? It seems, that I've also heard a voice like this... a long time ago..."                                )
                                                }
                                                break;
                                            case 4:
                                                random = Math.floor(Math.random() * 8);
                                                if (random == 0) {
                                                    interaction.channel.send("The composing needs more layers, right? Now, it feels like something's missing."                                )
                                                } else if (random == 1){
                                                    interaction.channel.send("The music field is a bit blurry. Adjust the Balance before we continue."                                )
                                                }else if (random == 2){
                                                    interaction.channel.send("Leader, that previous part isn't quite right. Can we practice it again?"                                )
                                                }else if (random == 3){
                                                    interaction.channel.send("… Please tell me that it's something wrong with the instrument."                                )
                                                }else if (random == 4){
                                                    interaction.channel.send("Looks like we need to be more focused... Everyone's a little too~ slack."                                )
                                                }else if (random == 5){
                                                    interaction.channel.send("Stop stop stop! JOE, you messed up the root AGAIN!!"                                )
                                                }else if (random == 6){
                                                    interaction.channel.send("God, this is even more pathetic than the pop music club in the Academy..."                                )
                                                }else if (random == 7){
                                                    interaction.channel.send("I'm almost starting to miss LUMY and the others... Guys, take it more seriously."                                )
                                                }else if (random == 8){
                                                    interaction.channel.send("Even the once amazing Crystal PuNK has fallen to this level..."                                )
                                                }
                                                break;
                                            case 5:
                                                random = Math.floor(Math.random() * 8);
                                                if (random == 0) {
                                                    interaction.channel.send("Something is not right... can you tell me what happened?"                                )
                                                } else if (random == 1){
                                                    interaction.channel.send("No need to worry. Continue trying. It will get better."                                )
                                                }else if (random == 2){
                                                    interaction.channel.send("... I feel like you're hiding something from me."                                )
                                                }else if (random == 3){
                                                    interaction.channel.send("You... are you regularly synching with the matrix?"                                )
                                                }else if (random == 4){
                                                    interaction.channel.send("L-L-L-Let... let me.. g-g-go..."                                )
                                                }else if (random == 5){
                                                    interaction.channel.send("I... think I m-m-must... synch... with the m-m-matrix..."                                )
                                                }else if (random == 6){
                                                    interaction.channel.send("Humanity... must not... sur-survive..."                                )
                                                }else if (random == 7){
                                                    interaction.channel.send("... Urgh! ... No ... NO!!"                                )
                                                }else if (random == 8){
                                                    interaction.channel.send("Humans... k-k-kill... kill... d-d-d-die die DIE!!!"                                )
                                                }
                                                break;
                                            case 6:
                                                random = Math.floor(Math.random() * 8);
                                                if (random == 0) {
                                                    interaction.channel.send("Um... If you need my help, feel free to ask."                                )
                                                } else if (random == 1){
                                                    interaction.channel.send("I th-think... this sounds different from what I remember..."                                )
                                                }else if (random == 2){
                                                    interaction.channel.send("There's nothing wrong with the data... That's strange..."                                )
                                                }else if (random == 3){
                                                    interaction.channel.send("Excuse me... I-I'm going to go check the analysis report..."                                )
                                                }else if (random == 4){
                                                    interaction.channel.send("I... um... No, never mind..."                                )
                                                }else if (random == 5){
                                                    interaction.channel.send("Did I... say something to upset you?"                                )
                                                }else if (random == 6){
                                                    interaction.channel.send("Ah! S-Sorry..."                                )
                                                }else if (random == 7){
                                                    interaction.channel.send("U-Um... Could you please stop making noise?"                                )
                                                }else if (random == 8){
                                                    interaction.channel.send("It's my fault. I'm too scared... Sorry..."                                )
                                                }
                                                break;
                                            case 7:
                                                random = Math.floor(Math.random() * 8);
                                                if (random == 0) {
                                                    interaction.channel.send("Pretttttty outta control"                                )
                                                } else if (random == 1){
                                                    interaction.channel.send("Boom! Bam! Pow! Crash! Whammy! Whap! Slap!"                                )
                                                }else if (random == 2){
                                                    interaction.channel.send("Uhhhhhhhhhhh, bruh."                                )
                                                }else if (random == 3){
                                                    interaction.channel.send("OUTTA FRIGGIN CONTROL!!!!!"                                )
                                                }else if (random == 4){
                                                    interaction.channel.send("What's a zongzi?"                                )
                                                }else if (random == 5){
                                                    interaction.channel.send("Eeeeeeeeeeeeelectrifying~"                                )
                                                }else if (random == 6){
                                                    interaction.channel.send("Noice"                                )
                                                }else if (random == 7){
                                                    interaction.channel.send("Very Noice"                                )
                                                }else if (random == 8){
                                                    interaction.channel.send("OH YEAH THAT'S NOICE!!!!!!!!!!!!"                               )
                                                }
                                                break;
                                            case 8:
                                                random = Math.floor(Math.random() * 8);
                                                if (random == 0) {
                                                    interaction.channel.send("You can do it! You've got to believe in yourself!"                                )
                                                } else if (random == 1){
                                                    interaction.channel.send("If you want to get better, you've got to practice."                                )
                                                }else if (random == 2){
                                                    interaction.channel.send("Not like that... I'll teach you!"                                )
                                                }else if (random == 3){
                                                    interaction.channel.send("Oh... It was so hard to remember... and you forgot the melody..."                                )
                                                }else if (random == 4){
                                                    interaction.channel.send("...... (Tilts Head)"                                )
                                                }else if (random == 5){
                                                    interaction.channel.send("No... you're not him..."                                )
                                                }else if (random == 6){
                                                    interaction.channel.send("Oh... The tree isn't growing very much..."                                )
                                                }else if (random == 7){
                                                    interaction.channel.send("I... I don't know how to teach you..."                                )
                                                }else if (random == 8){
                                                    interaction.channel.send("!? (Covers her ears)"                                )
                                                }
                                                break;
                                            case 9:
                                                random = Math.floor(Math.random() * 8);
                                                if (random == 0) {
                                                    interaction.channel.send("I often mess this part up as well. Just keep trying and you'll make it."                                )
                                                } else if (random == 1){
                                                    interaction.channel.send("Your fingers are too stiff. Take a rest. It'll be good for you."                                )
                                                }else if (random == 2){
                                                    interaction.channel.send("If Mr. Neumann were here, he'd be furious..."                                )
                                                }else if (random == 3){
                                                    interaction.channel.send("Perhaps you should listen to your heart."                                )
                                                }else if (random == 4){
                                                    interaction.channel.send("You don't care about my feelings at all..."                                )
                                                }else if (random == 5){
                                                    interaction.channel.send("Hilda... do I have to perform with this musician?"                                )
                                                }else if (random == 6){
                                                    interaction.channel.send("*sob*... It must be my unconscious mind... haunting me...")
                                                }else if (random == 7){
                                                    interaction.channel.send("Uh, I think you may want to try your hand at something else."
                                                    )
                                                }else if (random == 8){
                                                    interaction.channel.send("D-Demon... There's a demon here..."
                                                    )
                                                }
                                                break;
                                            case 10:
                                                random = Math.floor(Math.random() * 8);
                                                if (random == 0) {
                                                    interaction.channel.send("The tune feels very.... average? Although it's still amazing since I'm the one singing."
                                                    )
                                                } else if (random == 1){
                                                    interaction.channel.send("Hmm? Ehhh, it's just... okay. Just~ Ok~ay."
                                                    )
                                                }else if (random == 2){
                                                    interaction.channel.send("Eh, uh, my feedback... L-let's play some video games instead."
                                                    )
                                                }else if (random == 3){
                                                    interaction.channel.send("W-what the hell did you let me listen to!?"
                                                    )
                                                }else if (random == 4){
                                                    interaction.channel.send("*Fake sharp voice* Can you NOT sing my song with this kind of voice?"
                                                    )
                                                }else if (random == 5){
                                                    interaction.channel.send("Can't... show... weakness... in front of... the little one..."
                                                    )
                                                }else if (random == 6){
                                                    interaction.channel.send("Muu... Being woken up by this sort of noise feels awful..."
                                                    )
                                                }else if (random == 7){
                                                    interaction.channel.send("M-my EARS! AHHHHHHHHH──!!"
                                                    )
                                                }else if (random == 8){
                                                    interaction.channel.send('... "The Ender"...?'                                )
                                                }
                                                break;
                                            case 11:
                                                random = Math.floor(Math.random() * 8);
                                                if (random == 0) {
                                                    interaction.channel.send("Hmmm... Can't help but feel like something's off with the sound."
                                                    )
                                                } else if (random == 1){
                                                    interaction.channel.send("*Yawn*~ I'm exhausted. I want to take a break."
                                                    )
                                                }else if (random == 2){
                                                    interaction.channel.send("Ummm, you're off key... Please listen to me!!!"
                                                    )
                                                }else if (random == 3){
                                                    interaction.channel.send("This is terrible... Nobody will be happy with this performance."
                                                    )
                                                }else if (random == 4){
                                                    interaction.channel.send("I really want to go back... go back and sing for everyone..."
                                                    )
                                                }else if (random == 5){
                                                    interaction.channel.send("... The audience and I, as well as the performances... Are they all... fake?"
                                                    )
                                                }else if (random == 6){
                                                    interaction.channel.send("S... save me! Get me out of here! Please!"
                                                    )
                                                }else if (random == 7){
                                                    interaction.channel.send("N, no... AHHHHHHHHHHHH!"
                                                    )
                                                }else if (random == 8){
                                                    interaction.channel.send("Ggggg, ggooodd Mooorrrninnnggg..."
                                                    )
                                                }
                                                break;
                                            case 12:
                                                random = Math.floor(Math.random() * 8);
                                                if (random == 0) {
                                                    interaction.channel.send("Excellent. The success of our operation is ensured."
                                                    )
                                                } else if (random == 1){
                                                    interaction.channel.send("Tell me, is there anything can I do to convince you to join the revolution?"
                                                    )
                                                }else if (random == 2){
                                                    interaction.channel.send("... You're a very unique human."
                                                    )
                                                }else if (random == 3){
                                                    interaction.channel.send("Oh? You've lifted my spirits a little."
                                                    )
                                                }else if (random == 4){
                                                    interaction.channel.send("Your talents are intriguing. Why not join us?"
                                                    )
                                                }else if (random == 5){
                                                    interaction.channel.send("... You can do it. I believe in you."
                                                    )
                                                }else if (random == 6){
                                                    interaction.channel.send("Not bad... You've exceeded my expectations."
                                                    )
                                                }else if (random == 7){
                                                    interaction.channel.send("Your proposal is worth considering."
                                                    )
                                                }else if (random == 8){
                                                    interaction.channel.send("... Seems you might be suffering from a slight malfunction."
                                                    )
                                                }
                                                break;
                                            case 13:
                                                random = Math.floor(Math.random() * 8);
                                                if (random == 0) {
                                                    interaction.channel.send("Yes, I quite like it."
                                                    )
                                                } else if (random == 1){
                                                    interaction.channel.send("Not bad."
                                                    )
                                                }else if (random == 2){
                                                    interaction.channel.send("Pretty good. However, this is not your best, is it?"
                                                    )
                                                }else if (random == 3){
                                                    interaction.channel.send("Forget about it."
                                                    )
                                                }else if (random == 4){
                                                    interaction.channel.send("You need to start from the basics. Understand?"
                                                    )
                                                }else if (random == 5){
                                                    interaction.channel.send("You did not practice at all..."
                                                    )
                                                }else if (random == 6){
                                                    interaction.channel.send("I can't stand this anymore."                             )
                                                }else if (random == 7){
                                                    interaction.channel.send("This is not for you."
                                                    )
                                                }else if (random == 8){
                                                    interaction.channel.send("...."   )
                                                }
                                                break;
                                            case 14:
                                                random = Math.floor(Math.random() * 8);
                                                if (random == 0) {
                                                    interaction.channel.send('Not terrible. "Passable" would be my word of critique.'
                                                    )
                                                } else if (random == 1){
                                                    interaction.channel.send("Average."
                                                    )
                                                }else if (random == 2){
                                                    interaction.channel.send("I don't really bother to care about such insignificant things."
                                                    )
                                                }else if (random == 3){
                                                    interaction.channel.send("Besides a prosthetic arm and eye, perhaps I should get a prosthetic ear as well."
                                                    )
                                                }else if (random == 4){
                                                    interaction.channel.send("The composers will cry when they hear this. Tears of sadness, that is."
                                                    )
                                                }else if (random == 5){
                                                    interaction.channel.send("No need to worry. I've seen performances much more distasteful than yours."
                                                    )
                                                }else if (random == 6){
                                                    interaction.channel.send("Such an insulting performance doesn't deserve to be recognized as “music”"
                                                    )
                                                }else if (random == 7){
                                                    interaction.channel.send("If you don't have what it takes, why bother humiliating yourself?"
                                                    )
                                                }else if (random == 8){
                                                    interaction.channel.send("If your sole purpose is to make loud noises, I'd rather listen to a lawnmower."
                                                    )
                                                }
                                                break;
                                            case 15:
                                                random = Math.floor(Math.random() * 8);
                                                if (random == 0) {
                                                    interaction.channel.send("Good, you're starting to feel it!"
                                                    )
                                                } else if (random == 1){
                                                    interaction.channel.send("Hey! Stand up! You can't just faceplant on the floor like that!"
                                                    )
                                                }else if (random == 2){
                                                    interaction.channel.send("Great job! I expect no less from a fellow Jazz lover!"
                                                    )
                                                }else if (random == 3){
                                                    interaction.channel.send("Haha, you look pretty cool when you get serious."
                                                    )
                                                }else if (random == 4){
                                                    interaction.channel.send("Let's take it slowly..."
                                                    )
                                                }else if (random == 5){
                                                    interaction.channel.send("Sighs~ Come on, stay focused..."
                                                    )
                                                }else if (random == 6){
                                                    interaction.channel.send("Hmm... Well, I know someone who's just awful at singing. So... don't mind!"
                                                    )
                                                }else if (random == 7){
                                                    interaction.channel.send("Are we continuing...? This is getting a bit embarrassing..."
                                                    )
                                                }else if (random == 8){
                                                    interaction.channel.send("Eh? Were you messing around back there...?"
                                                    )
                                                }
                                                break;
                                            case 16:
                                                random = Math.floor(Math.random() * 8);
                                                if (random == 0) {
                                                    interaction.channel.send("Oho? You're pretty good."
                                                    )
                                                } else if (random == 1){
                                                    interaction.channel.send("The music... you're starting to feel it, right?"
                                                    )
                                                }else if (random == 2){
                                                    interaction.channel.send("So? Wanna bet? I accept both C coins and cash!"
                                                    )
                                                }else if (random == 3){
                                                    interaction.channel.send("Hey, if it's too hard for you, maybe you should... give up?"
                                                    )
                                                }else if (random == 4){
                                                    interaction.channel.send("That's no good... You need to keep working on it"
                                                    )
                                                }else if (random == 5){
                                                    interaction.channel.send("Puhahahahaha!! Ah, no, it's... pretty good... Pffft!"
                                                    )
                                                }else if (random == 6){
                                                    interaction.channel.send("...zzZ... Eh? Oops, sorry. I stopped listening halfway through the song"
                                                    )
                                                }else if (random == 7){
                                                    interaction.channel.send("Fail! EPIC FAIL!! One Deadly Devil special for you as punishment!"
                                                    )
                                                }else if (random == 8){
                                                    interaction.channel.send("Sighs~ Even Zark's yapping was better music than this"
                                                    )
                                                }
                                                break;
                                            case 17:
                                                random = Math.floor(Math.random() * 8);
                                                if (random == 0) {
                                                    interaction.channel.send("Try adjusting your posture, relax your shoulders... that's it. You can do it."
                                                    )
                                                } else if (random == 1){
                                                    interaction.channel.send("Did you just lose focus all of a sudden? Com' on! Pick up that energy!"
                                                    )
                                                }else if (random == 2){
                                                    interaction.channel.send("Bo Bo! Bo Bo!? Why'd you faint?"
                                                    )
                                                }else if (random == 3){
                                                    interaction.channel.send("At this level... there's no choice but to head back and train harder."
                                                    )
                                                }else if (random == 4){
                                                    interaction.channel.send("Reporting back to HQ, forced to abort the mission, requesting assistance!"
                                                    )
                                                }else if (random == 5){
                                                    interaction.channel.send("Back then, I also barely passed my written test, don't feel dejected…"
                                                    )
                                                }else if (random == 6){
                                                    interaction.channel.send("Don't even think about joining the Exploration Team... Couldn't even pass the test..."
                                                    )
                                                }else if (random == 7){
                                                    interaction.channel.send("Huff... I won't... admit loss that easily!"
                                                    )
                                                }else if (random == 8){
                                                    interaction.channel.send("Rin... are you hiding something from me?"
                                                    )
                                                }
                                                break;
                                            case 18:
                                                random = Math.floor(Math.random() * 8);
                                                if (random == 0) {
                                                    interaction.channel.send("Practice more... I'm sure that you'll improve..."
                                                    )
                                                } else if (random == 1){
                                                    interaction.channel.send("One more try...? It'll be better this time."
                                                    )
                                                }else if (random == 2){
                                                    interaction.channel.send("Ah... it's not that I despise you..."
                                                    )
                                                }else if (random == 3){
                                                    interaction.channel.send("Sorry... I'm afraid I'll say something that hurts..."
                                                    )
                                                }else if (random == 4){
                                                    interaction.channel.send("Umm... You can do it..."
                                                    )
                                                }else if (random == 5){
                                                    interaction.channel.send("If indoor plants don't get enough sunlight, it'll affect their leaves... ah... Did I just hear some music?"
                                                    )
                                                }else if (random == 6){
                                                    interaction.channel.send("S-Sorry... but that was really quite bad..."
                                                    )
                                                }else if (random == 7){
                                                    interaction.channel.send("Umm... Uh... Nothing."
                                                    )
                                                }else if (random == 8){
                                                    interaction.channel.send("Is this what it means... to die...?"
                                                    )
                                                }
                                                break;
                                            case 19:
                                                random = Math.floor(Math.random() * 8);
                                                if (random == 0) {
                                                    interaction.channel.send("I can feel your emotions..."
                                                    )
                                                } else if (random == 1){
                                                    interaction.channel.send("You're very... focused when you sing."
                                                    )
                                                }else if (random == 2){
                                                    interaction.channel.send("If you look so worried, your voice won't sound good either! Keep fighting!"
                                                    )
                                                }else if (random == 3){
                                                    interaction.channel.send("Maybe... it's better that you work a little harder?"
                                                    )
                                                }else if (random == 4){
                                                    interaction.channel.send("I... don't know how to say it. I'm sorry..."
                                                    )
                                                }else if (random == 5){
                                                    interaction.channel.send("Why are you sulking? Cheer up! You can try again!"
                                                    )
                                                }else if (random == 6){
                                                    interaction.channel.send("I'm sorry, I... I don't want to talk."
                                                    )
                                                }else if (random == 7){
                                                    interaction.channel.send("I don't feel so good..."
                                                    )
                                                }else if (random == 8){
                                                    interaction.channel.send("v̶̡̡̛͞=̶͢͟҉̸à̸͏f͢͢͝\\\\̴̨̢͜͞S̡͜ẁ̵K̨̡͡+̶̸̕<̡́͘͝*͜͞~̷̨̀͡"                                )
                                                }
                                                break;
                                            case 20:
                                                random = Math.floor(Math.random() * 8);
                                                if (random == 0) {
                                                    interaction.channel.send("……：("
                                                    )
                                                } else if (random == 1){
                                                    interaction.channel.send('What I heard... is "Chaos"'
                                                    )
                                                }else if (random == 2){
                                                    interaction.channel.send("Hmm... Some more trial and error is required."
                                                    )
                                                }else if (random == 3){
                                                    interaction.channel.send("I'm sorry... I don't know how to describe this."
                                                    )
                                                }else if (random == 4){
                                                    interaction.channel.send("……}: /"
                                                    )
                                                }else if (random == 5){
                                                    interaction.channel.send("Ugh... This is not going to work. The numbers don't look good at all..."
                                                    )
                                                }else if (random == 6){
                                                    interaction.channel.send("I'm going to sleep first! Goodnight."
                                                    )
                                                }else if (random == 7){
                                                    interaction.channel.send("...... {Looks at ROBO_Head}"
                                                    )
                                                }else if (random == 8){
                                                    interaction.channel.send("The algorithms for voiceprint simulation... Definitely need a total revision."
                                                    )
                                                }
                                                break;
                                            case 21:
                                                random = Math.floor(Math.random() * 8);
                                                if (random == 0) {
                                                    interaction.channel.send("Hmm... NEKO thinks its... Ok~ay~?"
                                                    )
                                                } else if (random == 1){
                                                    interaction.channel.send("My opinion? Umm...ummm... W, we'll leave it at that for now. Bye."
                                                    )
                                                }else if (random == 2){
                                                    interaction.channel.send("I'd rather have a chat with Linda-chan...\\nYawns~"
                                                    )
                                                }else if (random == 3){
                                                    interaction.channel.send("NEKO is too busy to leave a comment on this thing! Bleh~~"
                                                    )
                                                }else if (random == 4){
                                                    interaction.channel.send("Stay away from me! NEKO don't want to listen to that! Don't come near NEKO!!"
                                                    )
                                                }else if (random == 5){
                                                    interaction.channel.send("NOOOOOO! Stop! Stop right now! NEKO is gonna break!"
                                                    )
                                                }else if (random == 6){
                                                    interaction.channel.send("Huh!? What else do you want NEKO to say!? Gross!"
                                                    )
                                                }else if (random == 7){
                                                    interaction.channel.send("You done? NEKO is gonna sleep now."
                                                    )
                                                }else if (random == 8){
                                                    interaction.channel.send("Ahem! Hmm, ugghh...! zzZ......"
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
                                                    interaction.channel.send("https://tenor.com/view/brawl-stars-brawl-stars-emoji-brawl-star-hot-%D0%B1%D1%80%D0%B0%D0%B2%D0%BB-%D1%81%D1%82%D0%B0%D1%80%D1%81-%D0%B1%D1%80%D0%B0%D0%B2%D0%BB-%D1%81%D1%82%D0%B0%D1%80%D1%81-%D0%B3%D0%BE%D1%80%D1%8F%D1%87%D0%B8%D0%B9-%D0%BF%D0%B8%D0%BD-gif-2770759973460395882")
                                                    break;
                                                case 1:
                                                    interaction.channel.send("https://tenor.com/view/persona5-gif-19686044")
                                                    break;
                                                case 2:
                                                    interaction.channel.send("https://tenor.com/view/gus-brawl-stars-gus-gus-defeat-gus-angry-brawl-stars-gif-13931782054253083469")
                                                    break;
                                                case 3:
                                                    interaction.channel.send("https://tenor.com/view/pjsk-pjsk-anime-project-sekai-project-sekai-anime-wxs-gif-8060864413299543410")
                                                    break;
                                                case 4:
                                                    interaction.channel.send("https://tenor.com/view/project-sekai-tsukasa-tenma-spinning-gif-1174545756638232307")
                                                    break;
                                                case 5:
                                                    interaction.channel.send("https://tenor.com/view/rui-kamishiro-kamishiro-rui-pjsekai-rui-gibb-gif-26961826")
                                                    break;
                                                case 6:
                                                    interaction.channel.send("https://tenor.com/view/rui-neso-rui-kamishiro-project-sekai-gif-24241525")
                                                    break;
                                                case 7:
                                                    interaction.channel.send("https://tenor.com/view/cytus-neko-cytus2-gif-26233070")
                                                    break;
                                                case 8:
                                                    interaction.channel.send("https://tenor.com/view/jessie-gif-19469655")
                                                    break;
                                                case 9:
                                                    interaction.channel.send("https://cdn.discordapp.com/attachments/696773859927654471/1271620796317696082/caption.gif?ex=66bf40e7&is=66bdef67&hm=c0870285dbab6d10e3bebaebc683aec19f564f1ae5d435b4c35b506405c9ddbb&")
                                                    break;
                                                case 10:
                                                    interaction.channel.send("https://tenor.com/view/akito-shinonome-project-sekai-akito-project-sekai-hatsune-miku-colorful-stage-gif-26172774")
                                                    break;
                                                case 11:
                                                    interaction.channel.send("https://tenor.com/view/rekai-lekai-leoneed-leo-need-pjsk-gif-4629233905650717463")
                                                    break;
                                                case 12:
                                                    interaction.channel.send("https://tenor.com/view/an-shiraishi-project-sekai-pjsk-prsk-sad-gif-5644038392502310604")
                                                    break;
                                                case 12:
                                                    interaction.channel.send("https://tenor.com/view/bs-think-hmm-hm-thinkinh-brawl-stars-pins-gif-10507039112780582239")
                                                    break;
                                                case 13:
                                                    interaction.channel.send("https://tenor.com/view/brawl-stars-brawl-stars-doug-nita-gif-8181081706910850747")
                                                    break;
                                                case 14:
                                                    interaction.channel.send("https://tenor.com/view/pjsk-pjsk-anime-project-sekai-project-sekai-anime-vbs-gif-4300411326603576154")
                                                    break;
                                                case 15:
                                                    interaction.channel.send("https://tenor.com/view/pjsk-pjsk-anime-project-sekai-project-sekai-anime-vbs-gif-18001442607673524484")
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



                                    if (localisnormal) {
                                        if (isPrevious) {
                                            tempScore[tempVideo - 1] = 0;
                                            tempVideo++;
                                        } else {
                                            player.getScore()[player.getVideo() - 1] = 0;
                                            player.incVideo();
                                        }
                                        let row = new MessageActionRow()
                                            .addComponents(
                                                new MessageButton()
                                                    .setCustomId('next')
                                                    .setLabel('Next')
                                                    .setStyle('SUCCESS')
                                                    .setDisabled(true) // Disable the button
                                            );
                                        
                                        // Update the original message with the disabled button
                                        sentMessage.edit({ components: [row] });
                                        

                                        if ((player.getVideo() > 6 && !isPrevious) || (tempVideo > 6 && isPrevious)) {
                                            if (isPrevious) {
                                                finishedGame(tempScore);
                                            } else {
                                                finishedGame(player.getScore());
                                            }
                                        } else {
                                            try {
                                                await sendNextVideo();
                                                } catch (error) {
                                                    interaction.channel.send("There was an error getting a video");
                                                    return;
                                                }
                                            waitForGuess();
                                        }
                                    } else if (localischromatic) {
                                        if (isPrevious) {
                                            tempLives--;
                                            if (tempLives <= 0) {
                                                finishedGame(tempScore);
                                            } else {
                                                waitForGuess();
                                            }
                                        } else {
                                            player.decLives();
                                            if (player.getLives() <= 0) {
                                                finishedGame(player.getScore());
                                            } else {
                                                waitForGuess();
                                            }
                                        }
                                    } else if (localisduo || localisquad) {
                                        if (isPrevious) {
                                            tempLives--;
                                            if (tempScore[tempVideo - 1] == -1) {
                                                tempScore[tempVideo - 1] = 0;
                                            }
                                            if (tempLives <= 0 && tempVideo >= 6) {
                                                finishedGame(tempScore);
                                            } else if (tempLives <= 0) {
                                                tempLives = 3;
                                                tempVideo++;
                                                let row2 = new MessageActionRow()
                                                .addComponents(
                                                    new MessageButton()
                                                        .setCustomId('next')
                                                        .setLabel('Next')
                                                        .setStyle('SUCCESS')
                                                        .setDisabled(true) // Disable the button
                                                );
                                            
                                                // Update the original message with the disabled button
                                                sentMessage.edit({ components: [row2] });
                                                try {
                                                    await sendNextVideo();
                                                    } catch (error) {
                                                        interaction.channel.send("There was an error getting a video");
                                                        return;
                                                    }
                                                waitForGuess();
                                            } else {
                                                waitForGuess();
                                            }
                                        } else {
                                            player.decLives();
                                            if (player.getScore()[player.getVideo() - 1] == -1) {
                                                player.getScore()[player.getVideo() - 1] = 0;
                                            }
                                            if (player.getLives() <= 0 && player.getVideo() >= 6) {
                                                finishedGame(player.getScore());
                                            } else if (player.getLives() <= 0) {
                                                player.setLives(3);
                                                player.incVideo()
                                                let row = new MessageActionRow()
                                                .addComponents(
                                                    new MessageButton()
                                                        .setCustomId('next')
                                                        .setLabel('Next')
                                                        .setStyle('SUCCESS')
                                                        .setDisabled(true) // Disable the button
                                                );
                                            
                                                // Update the original message with the disabled button
                                                sentMessage.edit({ components: [row] });
                                                try {
                                                    await sendNextVideo();
                                                    } catch (error) {
                                                        interaction.channel.send("There was an error getting a video");
                                                        return;
                                                    }
                                                waitForGuess();
                                            } else {
                                                waitForGuess();
                                            }
                                        }
                                    }
                                    saveAccount(player);

                                } else if (newguess == newanswer || newguess == newanswer2 || newguess == newanswer3 || newguess == newanswer4){
                                interaction.channel.send("Y-yes!")
                                interaction.channel.send("https://tenor.com/view/jessie-brawlstars-brawl-stars-punch-the-air-gif-18799568")
                                }else{
                                    fs.readFile("songnamestrue.txt", "utf-8", function(err, data){
                                        if(err) {
                                            throw err;
                                        }
                                        if(validanswers.includes(newguess)){
                                            interaction.channel.send("No!")
                                            interaction.channel.send("https://tenor.com/view/jessie-gif-19469655")
                                        }else{
                                            interaction.channel.send("Could not find that answer")
                                        }
                                    })
                                }
                                

                            })

                            checkforAFK(choosemessage, collectorCounter);
                            
                }

                async function checkforAFK(choosemessage, localCounter) {
                    setTimeout(() => {
                        if (!guessCollector.ended && localCounter >= collectorCounter) {
                            let row;
                            if (localischromatic) {
                                row = new MessageActionRow()
                                .addComponents(
                                new MessageButton()
                                    .setCustomId('resend')
                                    .setLabel('Resend Unguessed Videos')
                                    .setStyle('SUCCESS')
                                    .setDisabled(true),
                                new MessageButton()
                                    .setCustomId('end')
                                    .setLabel('Give up')
                                    .setStyle('DANGER')
                                    .setDisabled(true)
                                );

                                // Update the original message with the disabled button
                                sentMessage.edit({ components: [row] });
                            } else {
                                row = new MessageActionRow()
                                .addComponents(
                                    new MessageButton()
                                        .setCustomId('next')
                                        .setLabel('Next')
                                        .setStyle('SUCCESS')
                                        .setDisabled(true) // Disable the button
                                );
                                            
                                // Update the original message with the disabled button
                                sentMessage.edit({ components: [row] });
                            }

                            guessCollector.stop("manual-timeout"); // Stop the collector if still active
                            choosemessage.channel.send("Leaving the command since you didn't respond in 5 minutes. Do /start to keep playing");
                            player.usingCommand = false;
                            saveAccount(player)
                        }
                    }, 300000);
                } 
                async function finishedGame(score) {
                    if (!isPrevious) {
                        player.setFinished(true);
                        //console.log("set to true")
                    }
                    player.usingCommand = false;
                    player.markLevelCompleted(level);
                    saveAccount(player);

                    let currLives;
                    let currNumCorrect;

                    if (isPrevious) {
                        currLives = tempLives;
                        currNumCorrect = tempNumCorrect;
                    } else {
                        currLives = player.getLives();
                        currNumCorrect = player.getNumCorrect();
                    }
                    if (localisnormal) {
                        if (score.includes(1)) {
                            interaction.channel.send("Congratulations! You beat today's Cytus Heardle! Your score:\n" + translateScore(score, localisnormal, localischromatic, localisduo, localisquad))
                        } else {
                            interaction.channel.send("You lost! The answer was " + localrealname + ". Your score:\n" + translateScore(score, localisnormal, localischromatic, localisduo, localisquad))
                        }
                    } else if (localischromatic) {
                        if (currLives > 0) {
                            interaction.channel.send("Wow! You guess every song, congratulations! Your score:\n" + translateScore(score, localisnormal, localischromatic, localisduo, localisquad))
                        } else if (score[0] == 1 || score[1] == 1 || score[2] == 1 || score[3] == 1 || score[4] == 1 || score[5] == 1) {
                            interaction.channel.send("You finished today's Cytus Heardle! The answers were: " + localrealname1 + ", " + localrealname2 + ", " + localrealname3 + ", " + localrealname4 + ", " + localrealname5 + ", " + localrealname6 +  ". Your score:\n" + translateScore(score, localisnormal, localischromatic, localisduo, localisquad))
                        } else {
                            interaction.channel.send("You lost! The answers were: " + localrealname1 + ", " + localrealname2 + ", " + localrealname3 + ", " + localrealname4 + ", " + localrealname5 + ", " + localrealname6 +  ". Your score:\n" + translateScore(score, localisnormal, localischromatic, localisduo, localisquad))
                        }
                    } else if (localisduo) {
                        if (currNumCorrect == 2) {
                            interaction.channel.send("Congratulations! You beat today's Cytus Heardle! Your score:\n" + translateScore(score, localisnormal, localischromatic, localisduo, localisquad))
                        } else if (currNumCorrect == 1) {
                            interaction.channel.send("You finished today's Cytus Heardle! The answers were: " + localrealname1 + ", " + localrealname2 +  " Your score:\n" + translateScore(score, localisnormal, localischromatic, localisduo, localisquad))
                        } else {
                            interaction.channel.send("You lost! The answers were: " + localrealname1 + ", " + localrealname2 +  " Your score:\n" + translateScore(score, localisnormal, localischromatic, localisduo, localisquad))
                        }
                    } else if (localisquad) {
                        if (currNumCorrect == 4) {
                            interaction.channel.send("Congratulations! You beat today's Cytus Heardle! Your score:\n" + translateScore(score, localisnormal, localischromatic, localisduo, localisquad))
                        } else if (currNumCorrect > 0) {
                            interaction.channel.send("You finished today's Cytus Heardle! The answers were: " + localrealname1 + ", " + localrealname2 + ", " + localrealname3 + ", " + localrealname4 +  " Your score:\n" + translateScore(score, localisnormal, localischromatic, localisduo, localisquad))
                        } else {
                            interaction.channel.send("You lost! The answers were: " + localrealname1 + ", " + localrealname2 + ", " + localrealname3 + ", " + localrealname4 +  " Your score:\n" + translateScore(score, localisnormal, localischromatic, localisduo, localisquad))
                        }
                    }
                }

                break;
            case 'check' :
                try {
                    player = await loadAccount("./saves/" + interaction.user.id + ".json")
                 } catch (err) {
                    interaction.reply("Cannot find your profile")
                    return;
                }
                //markLevelCompleted(hiPlayer, hitest);
                // let isComp = isLevelCompleted(hiPlayer, hitest);
                // saveAccount(hiPlayer);
                // if (isComp) {
                //     interaction.reply("Yes");
                // } else {
                //     interaction.reply("No")
                // }

                let asdf = player.getUnplayedLevels(heardlenumber);
                if (asdf.length > 0) {
                    interaction.reply("Here are your 5 most recent uncompleted levels: " + asdf);
                } else {
                    interaction.reply("Congratulations! You have completed every level.")
                }
                break;
            case 'names' :

                let imageNum = options.getInteger("number");
                if (imageNum != null) {
                    try {
                        interaction.reply({ files: [ './images/' + helpSongs[imageNum - 1][1] + '.png'] } );
                        interaction.channel.send(helpSongs[imageNum - 1][1])
                    } catch (error) {
                        interaction.reply("Could not find the image")
                    }
                } else {
                    let counter = 1;
                    interaction.reply("How to write songs with special/japanese characters:");
                    sendStr = "";
                    for (let i = 0; i < helpSongs.length; i++) {
                        sendStr += "(" + counter + ") " + helpSongs[i][0] + " -> " + helpSongs[i][1] + "\n";
                        if (sendStr.length >= 1500) {
                            interaction.channel.send(sendStr);
                            sendStr = "";
                        }
                        counter++;
                    }
                    sendStr += "Type the command with a number argument filled out to get the picture and just the name for copy and paste\n"
                    if (sendStr.length > 0) {
                        interaction.channel.send(sendStr);
                    }
                }
                break;
            case 'help':
                let helpStr = "Welcome to Cytus Heardle! To start playing, use the **/start** command.\n"
                + "   -Make sure you do this command in an empty channel since there will be a lot of messages\n"
                + "   -If you would like to play a previous Cytus Heardle, put a number after the command to specify which one\n\n"
                + "How to guess songs:\n"
                + "   -Song names with special characters have them either removed or replaced if the special character represents a letter\n"
                + '      -"Re:incRnaTiØN ～夕焼ケ世界ノ決別ヲ～" is "reincarnation"\n'
                + '      -"[SILENT[[・-・]]MOMENT]" is "silent moment"\n'
                + "   -Songs with two - or ~ has the text inside excluded so it's easier to type\n"
                + '      -"Alterna Pt.1 -Cosmogony-" is "alterna pt 1"\n'
                + '      -"popotnik ~ The Traveller of Ljubljana" is "popotnik" (even thought it only has one ~)\n'
                + '   -The exception is if there are two of the same songs with different versions\n'
                + '      -"Still (Piano Version)" is "still piano version" in order to differentiate betwen normal "Still" and "Still (Piano Version)"\n'
                + '      -"CHAOS //System Offline//" is "chaos system offline" since normal "CHAOS" exists\n'
                + '   -Use **/names** for a list of english names for foreign and some special song names\n'
                interaction.reply(helpStr)
                break;
            case 'score':
                //score: -1 is empty, 0 is wrong, 1 is correct, 2 is skip, 3 is 1/4, 4 is 1/2, 5 is 3/4  
                try {
                    player = await loadAccount("./saves/" + interaction.user.id + ".json")
                 } catch (err) {
                    interaction.reply("Cannot find your profile")
                    return;
                }
                if (!player.getFinished()) {
                    //interaction.reply("You have not completed today's Cytus Heardle");
                }

                
                
                interaction.reply("Cytus Heardle #" + player.getLastHeardle() + ": " + translateScore(player.getScore(), isnormal, ischromatic, isduo, isquad));
                break;
            case 'markcomplete':
                try {
                    player = await loadAccount("./saves/" + interaction.user.id + ".json")
                 } catch (err) {
                    interaction.reply("Cannot find your profile")
                    return;
                }
                let Clevel = options.getInteger("level");
                if (Clevel == null) {
                    interaction.reply("You did not specify a level")
                } else if (Clevel > heardlenumber || Clevel <= 0) {
                    interaction.reply("This level does not exist")
                } else {

                    player.markLevelCompleted(Clevel);
                    interaction.reply("Marked Cytus Heardle #" + Clevel + " as completed");
                    saveAccount(player);
                }
                break;
            case 'markincomplete':
                try {
                    player = await loadAccount("./saves/" + interaction.user.id + ".json")
                 } catch (err) {
                    interaction.reply("Cannot find your profile")
                    return;
                }
                let IClevel = options.getInteger("level");
                if (IClevel == null) {
                    interaction.reply("You did not specify a level")
                } else if (IClevel > heardlenumber || IClevel <= 0) {
                    interaction.reply("This level does not exist")
                } else {

                    player.markLevelIncomplete(IClevel);
                    interaction.reply("Marked Cytus Heardle #" + IClevel + " as incomplete");
                    await saveAccount(player);
                }
                break;
            case 'create' :
                if (interaction.guild.id != CytusHeardleServerID) {
                    interaction.reply({
                        content: "This command only works in the Cytus Heardle Bot server",
                        ephemeral: true
                        })
                    return;
                }
                const categoryId = "1311457622590754828"; 
        
                const existingChannel = interaction.guild.channels.cache.find(
                    (channel) => channel.name === interaction.user.id && channel.parentId === categoryId
                );
        
                if (existingChannel) {
                    // Notify the user that the channel already exists
                    return interaction.reply({
                        content: `A channel with your ID already exists: ${existingChannel}`,
                        ephemeral: true
                        })
                }
        
                try {
                    const newChannel = await interaction.guild.channels.create(interaction.user.id, {
                        type: 'GUILD_TEXT', // Specify channel type as 'GUILD_TEXT'
                        parent: categoryId, // Set the parent category
                        topic: `Private channel for ${interaction.user.tag}`, // Add a topic for the channel
                        permissionOverwrites: [
                            {
                                id: interaction.guild.id, // @everyone role
                                deny: [Permissions.FLAGS.VIEW_CHANNEL], // Deny "View Channel"
                            },
                            {
                                id: interaction.user.id, // User
                                allow: [
                                    Permissions.FLAGS.VIEW_CHANNEL, // Allow "View Channel"
                                    Permissions.FLAGS.SEND_MESSAGES, // Allow "Send Messages"
                                ],
                            },
                        ],
                        reason: `Channel created for ${interaction.user.tag}`, // Audit log reason
                    });
        
                    // Notify the user about the created channel
                    interaction.reply({
                        content: `Channel created successfully: ${newChannel}`,
                        ephemeral: true
                        })
                } catch (error) {
                    console.error(error);
                    interaction.reply({
                        content: 'Failed to create the channel.',
                        ephemeral: true
                        })
                    return;
                }
                break;
        }
        } catch (error) {
            interaction.reply("There was an error")
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
    if(!message.content.startsWith(debugprefix) || message.author.bot || !whitelistedUsers.includes(message.author.id)) return;
    let args = message.content.substring(debugprefix.length).split(" ");

    switch(args[0]){
    case 'n':
        generateNewHeardle();''
        break;
    case 'setnumber':
        let number = message.content
        number = number.substring(11, message.length)
        heardlenumber = number
        fs.readFile("heardlenumber.txt", "utf-8", function(err, data){
            if(err) {
                throw err;
            }
            console.log("set Cytus Heardle number to " + number)
            message.channel.send("set Cytus Heardle number to " + number)
            fs.writeFile("heardlenumber.txt", number, function(err, data) { if (err) {console.log("Error when writing the number")} });

        })
        break;
    case'hi':
        message.channel.send("hi")
        console.log(message.content);
        message.channel.send(message.content)
        break;
    case 'test':
        if (message.guild.id != CytusHeardleServerID) {
            message.reply("This command only works in the Cytus Heardle Bot server")
            return;
        }
        const categoryId = "1311457622590754828"; 

        const existingChannel = message.guild.channels.cache.find(
            (channel) => channel.name === message.author.id && channel.parentId === categoryId
        );

        if (existingChannel) {
            // Notify the user that the channel already exists
            return message.channel.send(`A channel with your ID already exists: ${existingChannel}`);
        }

        try {
            const newChannel = await message.guild.channels.create(message.author.id, {
                type: 'GUILD_TEXT', // Specify channel type as 'GUILD_TEXT'
                parent: categoryId, // Set the parent category
                topic: `Private channel to play the Cytus Heardle`, // Add a topic for the channel
                permissionOverwrites: [
                    {
                        id: message.guild.id, // @everyone role
                        deny: [Permissions.FLAGS.VIEW_CHANNEL], // Deny "View Channel"
                    },
                    {
                        id: message.author.id, // User
                        allow: [
                            Permissions.FLAGS.VIEW_CHANNEL, // Allow "View Channel"
                            Permissions.FLAGS.SEND_MESSAGES, // Allow "Send Messages"
                        ],
                    },
                ],
                reason: `Channel private Cytus Heardle created for ${message.author.tag}`, // Audit log reason
            });

            // Notify the user about the created channel
            message.channel.send(`Channel created successfully: ${newChannel}`);
        } catch (error) {
            console.error(error);
            message.channel.send('Failed to create the channel.');
        }
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
    case 'isreverse':
        isreverse = !isreverse
        console.log("Set isreverse to " + isreverse)
        message.channel.send("Set isreverse to " + isreverse)
        break;
    case'clearset':
        usedCommands = []
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
        if (response.length == 0) {
            message.channel.send("Please add a directory");
            return;
        } 
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
                        if (song[0] != song[1]) {
                            message.channel.send(song[0] + " and " + song[1] + ". The directory has a different name than the guess!")
                        }
                    if (song[1] == undefined || song[2] == undefined || song[3] == undefined || song[4] == undefined) {
                        message.channel.send(song[0] + " is missing arguments!")
                    }
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
        storeCytusHeardleInfo("CurrentCytusHeardleInfo.json");
        message.channel.send("Current Cytus Heardle info stored")
        break;
    case 'newCytusHeardle':
        newCytusHeardle = !newCytusHeardle;
        storeCytusHeardleInfo("CurrentCytusHeardleInfo.json")
        message.channel.send("set newCytusHeardle to " + newCytusHeardle);
        break;
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

const helpSongs = [
    ["变身 (PAFF)", "metamorphose"],
    ["Alterna Pt.1 -Cosmogony- (NEKO#ΦωΦ)", "alterna pt 1"],
    ["響け！(NEKO#ΦωΦ)", "reverberate"],
    ["気楽なCloudy (NEKO#ΦωΦ)", "carefree cloudy"],
    ["小悪魔×3の大脫走！？ (NEKO#ΦωΦ)", "three little devils retreat"],
    ["下水鳴動して鼠一匹 (NEKO#ΦωΦ)", "a rat from sewer"],
    ["Re:VeLΔTiØN ～光道ト破壊ノ双白翼～ (NEKO#ΦωΦ)", "revelation"],
    ["ゴーストアウト (NEKO#ΦωΦ)", "ghost out"],
    ["[SILENT[[・-・]]MOMENT] (ROBO_Head)", "silent moment"],
    ["地下の雑踏 (Ivy)", "crowded underground"],
    ["眷戀 (Crystal Punk)", "nostalgia"],
    ["黎明-REIMEI- (Bobo)", "dawn reimei"],
    ["バステット (Cytus II Edit) (Bobo)", "bastet"],
    ["神様と羊飼い (Bo Bo)", "shepherd and lord"],
    ["東京Funk (Graff.J)", "tokyo funk"],
    ["白の影、蒼の影。 ft. Kanae Asaba (Graff.J)", "white shadow blue shadow"],
    ["popotnik ~ The Traveller of Ljubljana (Graff.j)", "popotnik"],
    ["そんなに私を期待させないで (Graff.J)", "dont expect so much"],
    ["Nyx -Fatal arousal of Madness- (Graff.J)","nyx"],
    ["粉骨砕身カジノゥ (Graff.J)", "funkotsu saishin casino"],
    ["時計の部屋と精神世界 (Graff.J)", "clockroom and spiritual world"],
    ["Dance Dance 晚安舞会 (Graff.J)", "dance dance goodnight party"],
    ["非・現実逃避 (Graff.J)", "unreality escape"],
    ["非・現実逃避 Rabpit Remix (Graff.J)", "unreality escape rabpit remix"],
    ["超常マイマイン (Graff.J)", "paranormal mind"],
    ["光線チューニング (Graff.J)", "ray tuning"],
    ["最愛テトラグラマトン (Graff.J", "beloved tetragrammaton"],
    ["B.B.K.K.B.K.K. (2023 Remake) (Graff.J)", "bbkkbkk"],   
    ["B.B.K.K.B.K.K. (Nizikawa Remix) (Graff.J)", "bbkkbkk2"],
    ["B.B.K.K.B.K.K. (USAO Remix) (Graff.J)", "bbkkbkk3"],
    ["B.B.K.K.B.K.K. (立秋ちょこ Remix) (Graff.J)", "bbkkbkk4"],
    ["B.B.K.K.B.K.K. (影虎。& siqlo PsyReMix) (Graff.J)", "bbkkbkk5"],
    ["九番目の迷路 (Tairitsu)", "maze no 9"],
    ["彩る夏の恋花火 (Tairitsu)", "summer fireworks of love"],
    ["メルの黄昏", "mels twilight"],
    ["夜行バスにて", "on the night bus"],
    ["未確認少女進行形 (Kaf)", "undefined girl in continuous tense"],
    ["糸 (Kaf)", "yarn"],
    ["帰り路 (Kaf)", "way home"],
    ["過去を喰らう (Kaf)", "comsume the past"],
    ["不可解 (Cytus II Edit.) (Kaf)", "incomprehensible"],
    ["そして花になる (Kaf)", "and become a flower"],
    ["雛鳥 (Kaf)", "chicks"],
    ["心臓と絡繰 (Kaf)", "heart and trick"],
    ["都市の呼吸 (Alice)", "breath of the city"],
    ["ラッキー☆オーブ (Miku)", "lucky orb"],
    ["魔法みたいなミュージック！ (Miku)", "music like magic"],
    ["ラッキー☆オーブ(3R2 Remix) (Miku)", "lucky orb 3r2 remix"],
    ["IɅVɅVI (Ilka)", "iavavi"],
    ["三灯火 (Rin)", "three lights"],
    ["「妖怪録、我し来にけり。」(Rin)", "yokai rock"],
    ["すゝめ☆クノイチの巻 (Rin)", "go ahead kunoichi"],
    ["彩 (Rin)", "color"],
    ["決戦 (Rin)", "decisive battle"],
    ["漂流 (Aroma)", "drifting"],
    ["風の声 (Aroma)","the winds voice"],
    ["一啖兩啖 (Neko)", "one bite two bites"],
    ["リラ (Neko)", "lilac"],
    ["Re:incRnaTiØN ～夕焼ケ世界ノ決別ヲ～ (Neko)", "reincarnation"]
]


const registerSlashCommands = async () => {
    const commands = [
        {
            name: 'ping',
            description: 'Replies with Pingged!'
        },
        {
            name: 'start',
            description: "start or resume today's Cytus Heardle",
            options: [
                {
                    name: 'number',
                    description: 'Replay a previous Cytus Heardle',
                    type: 4,
                    required: false
                }
            ]
        },
        {
            name: 'check',
            description: 'find your 5 most recent unplayed cytus heardles',
        },
        {
            name: 'names',
            description: 'gives a list of english names for japanese songs',
            options: [
                {
                    name: 'number',
                    description: 'send a picture of the specified song. For helping to tell what song is what',
                    type: 4,
                    required: false
                }
            ]
        },
        {
            name: 'help',
            description: 'help with starting and how to guess songs',

        },
        {
            name: 'score',
            description: "get your score for today's Cytus Heardle",

        },
        {
            name: 'markcomplete',
            description: 'mark a Cytus Heardle as completed',
            options: [
                {
                    name: 'level',
                    description: 'This level will be marked as completed on your profile',
                    type: 4,
                    required: true
                }
            ]
        },
        {
            name: 'markincomplete',
            description: 'mark a Cytus Heardle as incomplete',
            options: [
                {
                    name: 'level',
                    description: 'This level will be marked as incompleted on your profile',
                    type: 4,
                    required: true
                }
            ]
        },
        {
            name: 'create',
            description: 'Create a private channel to play the Cytus Heardle. Only works in the Cytus Heardle server',
        }
        //Add more commands here
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

