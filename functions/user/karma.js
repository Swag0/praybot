const { Config } = require("../config");
const { CheckifUserExists } = require("../../bot");
const Discord = require("discord.js");

function Karma(userId, msg, dbHandler) {
    let userstore = dbHandler.getDB().get('users');
    //check first if user is a new user

    dbHandler.CheckifUserExists(userId, msg);

    let target = "";

    if (msg.mentions.users.first() != undefined) {
        target = msg.mentions.users.first().id;
    }

    let karmascore = "";
    let color;
    let username;
    let x = 100;
    //"helllish" "terrible" "bad" "meh" neutral" "good" "pretty good" great" "fantastic" "legendary" "godlike"

    if (target) {
        dbHandler.CheckifUserExists(target, msg);

        let player = userstore.find({
            id: target
        }).value();

        username = player.username;

        x = player.karma;

    } else {

        let player = userstore.find({
            id: userId
        }).value();

        username = player.username;

        x = player.karma;
    }

    switch (true) {
        case (x <= 0): //Less than/equal to 0
            karmascore = "Hellish";
            color = [255, 255, 255]
            break;
        case (x < 50): //1-49
            karmascore = "Terrible"
            color = [255, 0, 0]
            break;
        case (x < 100): //50-99
            karmascore = "Bad"
            color = [255, 127.5, 0]
            break;
        case (x < 200): //100-199
            karmascore = "Meh"
            color = [255, 255, 0]
            break;
        case (x < 500): //200-499
            karmascore = "OK"
            color = [127.5, 255, 0]
            break;
        case (x < 750): //500-749
            karmascore = "Decent"
            color = [0, 255, 0]
            break;
        case (x < 1000): //750-1000
            karmascore = "Good"
            color = [0, 255, 127.5]
            break;
        case (x < 2000): //1000-1999
            karmascore = "Great"
            color = [0, 255, 255]
            break;
        case (x < 5000): //2000-4999
            karmascore = "Fantastic"
            color = [0, 127.5, 255]
            break;
        case (x < 7500): //5000-7499
            karmascore = "Legendary"
            color = [0, 0, 255]
            break;
        case (x >= 7500): //1000-1999
            karmascore = "Godlike"
            color = '#eeeeee';
            break;
        default:
            karmascore = "**Broken**"
            color = [74, 65, 42]
            break;
    }

    const karmaEmbed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(username + "'s Karma.")
        .setDescription(`**${karmascore}**`)
    msg.channel.send(karmaEmbed);
}

module.exports = { Karma };