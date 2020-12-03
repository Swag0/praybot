const { Config } = require("./config");
const { CheckifUserExists } = require("../bot");
const Discord = require("discord.js");

function Item(userId, msg, dbHandler) {

    let userstore = dbHandler.getDB().get('users');

    dbHandler.CheckifUserExists(userId);

    let user = userstore.find({
        id: userId
    }).value();


    /*
    Holy Grail: Gives 2x prayers
    Blessed: You can not be cursed
    Godspeed: 2x steal value
    Zeus' Chosen: Increased backfire chance when stolen from.
    Atheist: Can't pray, but 15 minute gamble timer.
    Priest: 10 minute pray timer
    Bible: 2x income
    */

    if (user.item == "Holy Grail") {
        const itemEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(user.username)
            .addField("Item: ", user.item)
            .addField("Use: ", "Gives 2x Prayers.")
            .setTimestamp()
            .setFooter("", 'https://i.pinimg.com/originals/19/0f/d7/190fd7f6d541af4262516cb3d9a7bc3f.png');
        msg.channel.send(itemEmbed);
    } else if (user.item == "Blessed") {
        const itemEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(user.username)
            .addField("Item: ", user.item)
            .addField("Use: ", "You can not be cursed.")
            .setTimestamp()
            .setFooter("", 'https://i.pinimg.com/originals/19/0f/d7/190fd7f6d541af4262516cb3d9a7bc3f.png');
        msg.channel.send(itemEmbed);

    } else if (user.item == "Godspeed") {
        const itemEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(user.username)
            .addField("Item: ", user.item)
            .addField("Use: ", "2x Steal Value.")
            .setTimestamp()
            .setFooter("", 'https://i.pinimg.com/originals/19/0f/d7/190fd7f6d541af4262516cb3d9a7bc3f.png');
        msg.channel.send(itemEmbed);

    } else if (user.item == "Zeus' Chosen") {
        const itemEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(user.username)
            .addField("Item: ", user.item)
            .addField("Use: ", "Increased Backfire Chance When Stolen From.")
            .setTimestamp()
            .setFooter("", 'https://i.pinimg.com/originals/19/0f/d7/190fd7f6d541af4262516cb3d9a7bc3f.png');
        msg.channel.send(itemEmbed);
    } else if (user.item == "Atheist") {
        const itemEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(user.username)
            .addField("Item: ", user.item)
            .addField("Use: ", "You can't pray, but you have a 15 minute gamble timer.")
            .setTimestamp()
            .setFooter("", 'https://i.pinimg.com/originals/19/0f/d7/190fd7f6d541af4262516cb3d9a7bc3f.png');
        msg.channel.send(itemEmbed);
    } else if (user.item == "Priest") {
        const itemEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(user.username)
            .addField("Item: ", user.item)
            .addField("Use: ", "You have a 10 minute pray timer.")
            .setTimestamp()
            .setFooter("", 'https://i.pinimg.com/originals/19/0f/d7/190fd7f6d541af4262516cb3d9a7bc3f.png');
            
        msg.channel.send(itemEmbed);
    } else if (user.item == "Bible") {
        const itemEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(user.username)
            .addField("Item: ", user.item)
            .addField("Use: ", "You receive 2x income.")
            .setTimestamp()
            .setFooter("", 'https://i.pinimg.com/originals/19/0f/d7/190fd7f6d541af4262516cb3d9a7bc3f.png');
        msg.channel.send(itemEmbed);
    }




}
module.exports = { Item };