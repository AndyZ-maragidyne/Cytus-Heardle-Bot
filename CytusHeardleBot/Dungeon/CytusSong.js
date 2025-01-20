var fs = require('fs');

class CytusSong{
    constructor(songname, duration, starttime, isreverse, outputdirectory, realname, character, difficulty){
        this.songname = songname
        this.duration = duration
        this.starttime = starttime
        this.isreverse = isreverse
        this.outputdirectory = outputdirectory
        this.realname = realname
        this.character = character
        this.difficulty = difficulty
    }

    getSongname(){
        return this.songname;
    }

    getDuraction(){
        return this.durartion;
    }

    getStarttime(){
        return this.starttime;
    }

    getIsReverse(){
        return this.isreverse;
    }

    getOutputDirectory(){
        return this.outputdirectory;
    }

    getRealname(){
        return this.realname
    }

    getCharacter(){
        return this.character;
    }

    getDifficulty(){
        return this.difficulty;
    }

    deleteFile(){
        fs.unlink(this.outputdirectory, (err) => {
                    if (err) {
                    console.error('Error deleting file:', err);
                    return;
                    }
                    console.log('File deleted successfully');
                });
    }
}

module.exports = { CytusSong };