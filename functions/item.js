const { Config } = require("./config");
const { CheckifUserExists } = require("../bot");
const Discord = require("discord.js");

function Item(userId, msg, dbHandler) {

    let userstore = dbHandler.getDB().get('users');

    dbHandler.CheckifUserExists(userId, msg);

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
  The Vatican: 2x income on country
  Menorah: You can steal up to 7 prayers.
  Master Bolt: Usable once only -- Steals 10% of target prayers.
    */

    if (msg.content === "†itemlist" || msg.content === "+itemlist" || msg.content === "†items" || msg.content === "+items") {
        const itemListEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle("Item List")
            .addField("Blessed", 'You can not be cursed.')
            .addField("Godspeed", '2x Steal Value.')
            .addField("Zeus' Chosen", "Increased backfire chance when stolen from.")
            .addField("Atheist", "Can't pray, but 15 minute gamble timer.")
            .addField("Priest", "7m 30s pray timer.")
            .addField("Devil's Advocate", "2x Curse Damage for 0.5x Curse Price (rounded down).")
            .addField("Bible", "2x income on churches.")
            .addField("Religious School", "2x income on communities.")
            .addField("Sistine Chapel", "2x income on cities.")
            .addField("Bible Belt", "2x income on provinces.")
            .addField("The Vatican", "2x income on countries.")
            .addField("Menorah", "You can steal up to 7 prayers.")
            .addField("Master Bolt", "A one time smite that steals 10% of the target's prayers.")
            .addField("Four Leaf Clover", "There will only be two options when gambling")
            .addField("Altar", "Your income doubles for ONE prayday")
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
            .addField("Use: ", "You have a 7m 30s pray timer.")
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
    } else if (user.item == "The Vatican") {
        const itemEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(user.username)
            .addField("Item: ", user.item)
            .addField("Use: ", "You receive 2x income on countries.")
            .setTimestamp()
        msg.channel.send(itemEmbed);
    } else if (user.item == "Devil's Advocate") {
        const itemEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(user.username)
            .addField("Item: ", user.item)
            .addField("Use: ", "2x Curse Damage for 0.5x Curse Price (rounded down).")
            .setTimestamp()
        msg.channel.send(itemEmbed);
    } else if (user.item == "Menorah") {
        const itemEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(user.username)
            .addField("Item: ", user.item)
            .addField("Use: ", "You can steal up to 7 prayers.")
            .setTimestamp()
        msg.channel.send(itemEmbed);
    } else if (user.item == "Master Bolt") {
        const itemEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(user.username)
            .addField("Item: ", user.item)
            .addField("Use: ", "A one time smite that steals 10% of the target's prayers.")
            .setTimestamp()
        msg.channel.send(itemEmbed);
    } else if (user.item == "Four Leaf Clover") {
        const itemEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(user.username)
            .addField("Item: ", user.item)
            .addField("Use: ", "There will only be two options when gambling.")
            .setTimestamp()
        msg.channel.send(itemEmbed);
    } else if (user.item == "Altar") {
        const itemEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(user.username)
            .addField("Item: ", user.item)
            .addField("Use: ", "Your income doubles for ONE prayday.")
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