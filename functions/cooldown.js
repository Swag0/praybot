const { Config } = require("./config");
const { CheckifUserExists } = require("../bot");
const Discord = require("discord.js");

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

    let answerPray = "";
    let answerSteal = "";
    let answerCurse = "";

    //Next Pray
    if (Date.now() - user.lastpraydate > Config.prayCooldown) {
        answerPray = "Ready";
    } else {
        if (!ready) {
            if (Math.floor(remainingTimePray / 1000 % 60) < 10) {
                answerPray = (Math.floor(remainingTimePray / 1000 / 60) + ":0" + Math.floor(remainingTimePray / 1000 % 60));
            } else {
                answerPray = (Math.floor(remainingTimePray / 1000 / 60) + ":" + Math.floor(remainingTimePray / 1000 % 60));
            }
        }
    }
    //Next Steal
    if (Date.now() - user.laststealdate > Config.stealCooldown) {
        answerSteal = "Ready";
    } else {
        if (!ready) {
            if (Math.floor(remainingTimeSteal / 1000 % 60) < 10) {
                answerSteal = Math.floor(remainingTimeSteal / 1000 / 60) + ":0" + Math.floor(remainingTimeSteal / 1000 % 60);
            } else {
                answerSteal = Math.floor(remainingTimeSteal / 1000 / 60) + ":" + Math.floor(remainingTimeSteal / 1000 % 60);
            }
        }
    }
    //Next Curse
    if (Date.now() - user.laststealdate > Config.stealCooldown) {
        answerCurse = "Ready";
    } else {
        if (!ready) {
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
    }

    if ((Date.now() - user.lastpraydate < Config.prayCooldown) && (Date.now() - user.laststealdate < Config.stealCooldown) && (Date.now() - user.laststealdate < Config.stealCooldown) && ready) {
        msg.reply("You have no cooldowns up right now.");
    }


    if (!ready) {
        const cdembed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Cooldowns')
            .addField("Pray CD: ", answerPray)
            .addField("Steal CD: ", answerSteal)
            .addField("Curse CD: ", answerCurse)
            .setTimestamp()
            .setFooter(user.username, 'https://i.pinimg.com/originals/19/0f/d7/190fd7f6d541af4262516cb3d9a7bc3f.png');
            msg.channel.send(cdembed);
    }



}
module.exports = { Cooldown };