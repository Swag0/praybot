const { Config } = require("./config");
const { CheckifUserExists } = require("../bot");

function Cooldown(userId, msg, dbHandler) {
    let userstore = dbHandler.getDB().get('users');
    //check first if user is a new user
    dbHandler.CheckifUserExists(userId);

    let user = userstore.find({
        id: userId
    }).value();

    let ready = false;

    let remainingTimePray = Config.prayCooldown - (Date.now() - user.lastpraydate);
    let remainingTimeSteal = Config.stealCooldown - (Date.now() - user.laststealdate);
    let remainingTimeCurse = Config.curseCooldown - (Date.now() - user.lastcursedate);

    if (msg.content.includes("r")) {
        ready = true;
    }
    
    //Next Pray
    if (Date.now() - user.lastpraydate > Config.prayCooldown) {
        msg.reply("Pray CD: Ready.");
    } else {
        if (!ready) {
            if (Math.floor(remainingTimePray / 1000 % 60) < 10) {
                msg.reply("Pray CD: " +  Math.floor(remainingTimePray / 1000 / 60) + ":0" + Math.floor(remainingTimePray / 1000 % 60) + ".");
            } else {
                msg.reply("Pray CD: " +  Math.floor(remainingTimePray / 1000 / 60) + ":" + Math.floor(remainingTimePray / 1000 % 60) + ".");
            }
        }
    }
    //Next Steal
    if (Date.now() - user.laststealdate > Config.stealCooldown) {
        msg.reply("Steal CD: Ready.");
    } else {
        if (!ready) {
            if (Math.floor(remainingTimeSteal / 1000 % 60) < 10) {
                msg.reply("Steal CD: " +  Math.floor(remainingTimeSteal / 1000 / 60) + ":0" + Math.floor(remainingTimeSteal / 1000 % 60) + ".");
            } else {
                msg.reply("Steal CD: " +  Math.floor(remainingTimeSteal / 1000 / 60) + ":" + Math.floor(remainingTimeSteal / 1000 % 60) + ".");
            }
        }
    }
    //Next Curse
    if (Date.now() - user.laststealdate > Config.stealCooldown) {
        msg.reply("Curse CD: Ready.");
    } else {
        if (!ready) {
            if (remainingTimeCurse < 0) { //negative numbers confuse bot
                msg.reply("Curse CD: Ready.");
            } else {
                if (Math.floor(remainingTimeCurse / 1000 % 60) < 10) {
                    msg.reply("Curse CD: " + (Math.floor(remainingTimeCurse / 1000 / 60 / 60)) + ":" + (Math.floor(remainingTimeCurse / 1000 / 60) - (Math.floor(remainingTimeCurse / 1000 / 60 / 60) * 60)) + ":0" + Math.floor(remainingTimeCurse / 1000 % 60) + ".");
                } else {
                    msg.reply("Curse CD: " + (Math.floor(remainingTimeCurse / 1000 / 60 / 60)) + ":" + (Math.floor(remainingTimeCurse / 1000 / 60) - (Math.floor(remainingTimeCurse / 1000 / 60 / 60) * 60)) + ":" + Math.floor(remainingTimeCurse / 1000 % 60) + ".");
                }
            }
           }
    }

    if ((Date.now() - user.lastpraydate < Config.prayCooldown) && (Date.now() - user.laststealdate < Config.stealCooldown) && (Date.now() - user.laststealdate < Config.stealCooldown) && ready) {
        msg.reply("You have no cooldowns up right now.");
    } 
    

}
module.exports = { Cooldown };