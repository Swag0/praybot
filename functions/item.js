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
   Holy Grail: 2x prayers (pray.js) 
  Blessed: You can not be cursed (curse.js) (maybe also make steal as well)
  Godspeed: 2x steal value (steal.js) 
  Zeus' Chosen: Increased backfire chance when stolen from. (steal.js) 
  Atheist: Can't pray, but 15 minute gamble timer. (pray.js and gamble.js) 
  Priest: 10 minute pray timer (pray.js)
  Devil's Advocate: 1.5x Curse Damage (rounded up) for 0.5x Curse Price (rounded down)
  Bible: 2x income on churches
  Religious School: 2x income on community
  Sistine Chapel: 2x income on city
  Bible Belt: 2x income on province
  Menorah: You can steal up to 7 prayers.
    */

    if (msg.content === "†itemlist" || msg.content === "+itemlist" || msg.content === "†items" || msg.content === "+items") {
        const itemListEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle("Item List")
            .addField("Blessed", 'You can not be cursed.')
            .addField("Godspeed", '2x Steal Value.')
            .addField("Zeus' Chosen", "Increased backfire chance when stolen from.")
            .addField("Atheist", "Can't pray, but 15 minute gamble timer.")
            .addField("Priest", "10 minute pray timer.")
            .addField("Devil's Advocate", "1.5x Curse Damage (rounded up) for 0.5x Curse Price (rounded down).")
            .addField("Bible", "2x income on churches.")
            .addField("Religious School", " 2x income on communities.")
            .addField("Sistine Chapel", " 2x income on cities.")
            .addField("Bible Belt", " 2x income on provinces.")
            .addField("Menorah", " You can steal up to 7 prayers.")
            .setTimestamp()
            .setFooter(user.username, 'https://i.pinimg.com/originals/19/0f/d7/190fd7f6d541af4262516cb3d9a7bc3f.png');
        msg.channel.send(itemListEmbed);
        return;
    }

    if (user.item == "Holy Grail") {
        const itemEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(user.username)
            .addField("Item: ", user.item)
            .addField("Use: ", "Gives 2x Prayers.")
            .setTimestamp()
        msg.channel.send(itemEmbed);
    } else if (user.item == "Blessed") {
        const itemEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(user.username)
            .addField("Item: ", user.item)
            .addField("Use: ", "You can not be cursed.")
            .setTimestamp()
        msg.channel.send(itemEmbed);

    } else if (user.item == "Godspeed") {
        const itemEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(user.username)
            .addField("Item: ", user.item)
            .addField("Use: ", "2x Steal Value.")
            .setTimestamp()
        msg.channel.send(itemEmbed);

    } else if (user.item == "Zeus' Chosen") {
        const itemEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(user.username)
            .addField("Item: ", user.item)
            .addField("Use: ", "Increased Backfire Chance When Stolen From.")
            .setTimestamp()
        msg.channel.send(itemEmbed);
    } else if (user.item == "Atheist") {
        const itemEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(user.username)
            .addField("Item: ", user.item)
            .addField("Use: ", "You can't pray, but you have a 15 minute gamble timer.")
            .setTimestamp()
        msg.channel.send(itemEmbed);
    } else if (user.item == "Priest") {
        const itemEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(user.username)
            .addField("Item: ", user.item)
            .addField("Use: ", "You have a 10 minute pray timer.")
            .setTimestamp()
        msg.channel.send(itemEmbed);
    } else if (user.item == "Bible") {
        const itemEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(user.username)
            .addField("Item: ", user.item)
            .addField("Use: ", "You receive 2x income on churches.")
            .setTimestamp()
        msg.channel.send(itemEmbed);
    } else if (user.item == "Religious School") {
        const itemEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(user.username)
            .addField("Item: ", user.item)
            .addField("Use: ", "You receive 2x income on communities.")
            .setTimestamp()
        msg.channel.send(itemEmbed);
    } else if (user.item == "Sistine Chapel") {
        const itemEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(user.username)
            .addField("Item: ", user.item)
            .addField("Use: ", "You receive 2x income on cities.")
            .setTimestamp()
        msg.channel.send(itemEmbed);
    } else if (user.item == "Bible Belt") {
        const itemEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(user.username)
            .addField("Item: ", user.item)
            .addField("Use: ", "You receive 2x income on provinces.")
            .setTimestamp()
        msg.channel.send(itemEmbed);
    } else if (user.item == "Devil's Advocate") {
        const itemEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(user.username)
            .addField("Item: ", user.item)
            .addField("Use: ", "1.5x Curse Damage (rounded up) for 0.5x Curse Price (rounded down).")
            .setTimestamp()
        msg.channel.send(itemEmbed);
    } else if (user.item == "Menorah") {
        const itemEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(user.username)
            .addField("Item: ", user.item)
            .addField("Use: ", "Menorah: You can steal up to 7 prayers.")
            .setTimestamp()
        msg.channel.send(itemEmbed);
    } else {
        const itemEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(user.username)
            .addField("Item: ", user.item)
            .addField("Use: ", "Nothing.")
            .setTimestamp()
        msg.channel.send(itemEmbed);
    }




}
module.exports = { Item };