const { Config } = require("./config");
const { CheckifUserExists } = require("../bot");
const Discord = require("discord.js");
const client = new Discord.Client();

function ShowLeaderboard(msg, dbHandler) {

    if (msg.content === "†leaderboards" || msg.content === "+leaderboards")  {
        const leaderboardsEmbed = new Discord.MessageEmbed()
        .setColor('#FFD700')
        .setTitle("Leaderboard Types")
        .setDescription('\u200b')
        .addField("Prayers Leaderboard", '\u200b') 
        .addField("Buildings Leaderboards", 'Churches, Communities, Cities, Provinces, and Countries') 
        .addField("Ascension Leaderboard", '\u200b') 
        .addField("Karma Leaderboard", '\u200b') 
        .addField("Income Leaderboard", 'Does not include items') 
        .setFooter("†leaderboard [type]")
        msg.channel.send(leaderboardsEmbed);
        return;
    }

    let playerArr =
        [

        ]

    let item;
    let type;
    let turnOff = false;

    dbHandler.getDB().get('users').value().forEach((user) => {

        if (msg.content.toLowerCase().includes("pray")) {
            type = "Prayers"
            item = user.prayers;
        } else if (msg.content.toLowerCase().includes("church")) {
            type = "Churches"
            item = user.churchnum;
        } else if (msg.content.toLowerCase().includes("communit")) {
            type = "Communities"
            item = user.communitynum;
        } else if (msg.content.toLowerCase().includes("province")) {
            type = "Provinces"
            item = user.provincenum;
        } else if (msg.content.toLowerCase().includes("countr")) {
            type = "Countries"
            item = user.countrynum;
        } else if (msg.content.toLowerCase().includes("ascension")) {
            type = "Ascension Level"
            item = ((Number(user.ascension.split(" ").pop())));
        } else if (msg.content.toLowerCase().includes("karma")) {
            type = "Karma"
            item = user.karma;
        } else if (msg.content.toLowerCase().includes("income")) {
            type = "Income"
            let income;
            income += (user.churchnum);
            income += (user.communitynum * 11);
            income += (user.citynum * 110);
            income += (user.provincenum * 1100);
            income += (user.countrynum * 11000);
            
            if (user.ascension.includes("Income Upgrade")) income *= (1 + ((Number(user.ascension.split(" ").pop())) / 2));

            item = income;
        } else {
            turnOff = true;
        }

        if (user.username && !turnOff) {
            if (user.id != Config.PrayBotID) playerArr.push(`${item}: ${user.username}`); //Leaderboard does not show praybot
        }
    });

    if (turnOff) {
        msg.reply("Please specify a category. Use †leaderboards for all categories.")
        return;
    }

    const sortAlphaNum = (a, b) => a.localeCompare(b, 'en', { numeric: true })
    playerArr = playerArr.sort(sortAlphaNum);
    playerArr = playerArr.reverse();

    const leaderEmbed = new Discord.MessageEmbed()
        .setColor('#FFD700')
        .setTitle(`Top 5 ${type}`)
        .addField("1. ", playerArr[0])
        .addField("2. ", playerArr[1])
        .addField("3. ", playerArr[2])
        .addField("4. ", playerArr[3])
        .addField("5. ", playerArr[4])
        .setTimestamp()
    msg.channel.send(leaderEmbed);

    //console.log(playerArr + ": " + type);
}
module.exports = { ShowLeaderboard };