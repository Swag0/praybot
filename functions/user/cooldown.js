const { Config } = require("../config");
const { CheckifUserExists } = require("../../bot");
const Discord = require("discord.js");

function Cooldown(userId, msg, dbHandler) {
    let userstore = dbHandler.getDB().get('users');
    //check first if user is a new user
    dbHandler.CheckifUserExists(userId, msg);

    let user = userstore.find({
        id: userId
    }).value();

    if (user.lastpraydate == undefined || user.lastpraydate == NaN) {
        user.lastpraydate = 0;
    }
    if (user.laststealdate == undefined || user.laststealdate == NaN) {
        user.laststealdate = 0;
    }
    if (user.lastcursedate == undefined || user.lastcursedate == NaN) {
        user.lastcursedate = 0;
    }
    if (user.lastgambledate == undefined || user.lastgambledate == NaN) {
        user.lastgambledate = 0;
    }


    let cooldown = Config.prayCooldown;

    if (user.item == "Priest") {
        if (user.ascension.includes("Item Upgrade")) cooldown /= 3;
        else cooldown /= 2;
    }

    let remainingTimePray = cooldown - (Date.now() - user.lastpraydate);
    let remainingTimeSteal = Config.stealCooldown - (Date.now() - user.laststealdate);
    let remainingTimeCurse = Config.curseCooldown - (Date.now() - user.lastcursedate);
    let remainingTimeGamble = Config.gambleCooldown - (Date.now() - user.lastgambledate);


    let answerPray = "";
    let answerSteal = "";
    let answerCurse = "";
    let answerGamble = "";


    //Next Pray
    if (Date.now() - user.lastpraydate > cooldown) {
        answerPray = "Ready";
    } else {
        if (Math.floor(remainingTimePray / 1000 % 60) < 10) {
            answerPray = (Math.floor(remainingTimePray / 1000 / 60) + ":0" + Math.floor(remainingTimePray / 1000 % 60));
        } else {
            answerPray = (Math.floor(remainingTimePray / 1000 / 60) + ":" + Math.floor(remainingTimePray / 1000 % 60));
        }
    }
    //Next Steal
    if (Date.now() - user.laststealdate > Config.stealCooldown) {
        answerSteal = "Ready";
    } else {
        if (Math.floor(remainingTimeSteal / 1000 % 60) < 10) {
            answerSteal = Math.floor(remainingTimeSteal / 1000 / 60) + ":0" + Math.floor(remainingTimeSteal / 1000 % 60);
        } else {
            answerSteal = Math.floor(remainingTimeSteal / 1000 / 60) + ":" + Math.floor(remainingTimeSteal / 1000 % 60);
        }
    }
    //Next Curse
    if (Date.now() - user.lastcursedate > Config.curseCooldown) {
        answerCurse = "Ready";
    } else {
        if (remainingTimeCurse < 0) { //negative numbers confuse bot
            answerCurse = "Ready";
        } else {
            if (Math.floor(remainingTimeCurse / 1000 % 60) < 10) {
                answerCurse = (Math.floor(remainingTimeCurse / 1000 / 60 / 60)) + ":" + (Math.floor(remainingTimeCurse / 1000 / 60) - (Math.floor(remainingTimeCurse / 1000 / 60 / 60) * 60)) + ":0" + Math.floor(remainingTimeCurse / 1000 % 60);
            } else {
                answerCurse = (Math.floor(remainingTimeCurse / 1000 / 60 / 60)) + ":" + (Math.floor(remainingTimeCurse / 1000 / 60) - (Math.floor(remainingTimeCurse / 1000 / 60 / 60) * 60)) + ":" + Math.floor(remainingTimeCurse / 1000 % 60);
            }
        }
    }

    //Next Gamble


    cooldown = Config.gambleCooldown;
    if (user.item == "Atheist") {
        if (user.ascension.includes("Item Upgrade")) cooldown /= 6;
        else cooldown /= 4;
    }

    remainingTimeGamble = cooldown - (Date.now() - user.lastgambledate);

    if (Date.now() - user.lastgambledate > cooldown) {
        answerGamble = "Ready";
    } else {
        if (Math.floor(remainingTimeGamble / 1000 % 60) < 10) {
            answerGamble = Math.floor(remainingTimeGamble / 1000 / 60) + ":0" + Math.floor(remainingTimeGamble / 1000 % 60);
        } else {
            answerGamble = Math.floor(remainingTimeGamble / 1000 / 60) + ":" + Math.floor(remainingTimeGamble / 1000 % 60);
        }
    }


    if (user.item == "Atheist") {
        answerPray = "Can't Pray Today."
    }


    const cdembed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Cooldowns')
        .addField("Pray CD: ", answerPray)
        .addField("Steal CD: ", answerSteal)
        .addField("Curse CD: ", answerCurse)
        .addField("Gamble CD: ", answerGamble)
        .setTimestamp()
        .setFooter(user.username, 'https://i.pinimg.com/originals/19/0f/d7/190fd7f6d541af4262516cb3d9a7bc3f.png');
    msg.channel.send(cdembed);
}
module.exports = { Cooldown };