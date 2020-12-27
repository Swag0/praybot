const { Config } = require("../config");
const { CheckifUserExists } = require("../../bot");
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

    let itemChoice = "-";

    Config.itemArr.forEach(item => {
        if (msg.content.includes(item)) {
            itemChoice = item;
        }
    });

    if (itemChoice == "-") {
        itemChoice = user.item;
    }

    if (itemChoice == "Holy Grail") {
        const itemEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(user.username)
            .addField("Item: ", "Holy Grail")
            .addField("Use: ", "Gives 2x Prayers.")
            .addField("*Ascended Use: ", "Gives 3x Prayers.")
            .setTimestamp()
        msg.channel.send(itemEmbed);
    } else if (itemChoice == "Blessed") {
        const itemEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(user.username)
            .addField("Item: ", "Blessed")
            .addField("Use: ", "You can not be cursed.")
            .addField("Ascended Use: ", "You can not be cursed or stolen from.")
            .setTimestamp()
        msg.channel.send(itemEmbed);

    } else if (itemChoice == "Godspeed") {
        const itemEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(user.username)
            .addField("Item: ", "Godspeed")
            .addField("Use: ", "2x Steal Value.")
            .addField("*Ascended Use: ", "3x Steal Value.")
            .setTimestamp()
        msg.channel.send(itemEmbed);

    } else if (itemChoice == "Zeus' Chosen") {
        const itemEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(user.username)
            .addField("Item: ", "Zeus' Chosen") //normally 25%
            .addField("Use: ", "Increased Backfire Chance When Stolen From.") //now 50%
            .addField("Ascended Use: ", "Hugely Increased Backfire Chance When Stolen From.") //now 75%
            .setTimestamp()
        msg.channel.send(itemEmbed);
    } else if (itemChoice == "Atheist") {
        const itemEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(user.username)
            .addField("Item: ", "Atheist")
            .addField("Use: ", "You can't pray, but you have a 15 minute gamble timer.")
            .addField("Ascended Use: ", "You can't pray, but you have a 10 minute gamble timer.")
            .setTimestamp()
        msg.channel.send(itemEmbed);
    } else if (itemChoice == "Priest") {
        const itemEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(user.username)
            .addField("Item: ", "Priest")
            .addField("Use: ", "You have a 7m 30s pray timer.")
            .addField("Ascended Use: ", "You have a 5m pray timer.")
            .setTimestamp()
        msg.channel.send(itemEmbed);
    } else if (itemChoice == "Bible") {
        const itemEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(user.username)
            .addField("Item: ", "Bible")
            .addField("Use: ", "You receive 2x income on churches.")
            .addField("*Ascended Use: ", "You receive 3x income on churches.")
            .setTimestamp()
        msg.channel.send(itemEmbed);
    } else if (itemChoice == "Religious School") {
        const itemEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(user.username)
            .addField("Item: ", "Religious School")
            .addField("Use: ", "You receive 2x income on communities.")
            .addField("*Ascended Use: ", "You receive 3x income on communities.")
            .setTimestamp()
        msg.channel.send(itemEmbed);
    } else if (itemChoice == "Sistine Chapel") {
        const itemEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(user.username)
            .addField("Item: ", "Sistine Chapel")
            .addField("Use: ", "You receive 2x income on cities.")
            .addField("*Ascended Use: ", "You receive 3x income on cities.")
            .setTimestamp()
        msg.channel.send(itemEmbed);
    } else if (itemChoice == "Bible Belt") {
        const itemEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(user.username)
            .addField("Item: ", "Bible Belt")
            .addField("Use: ", "You receive 2x income on provinces.")
            .addField("*Ascended Use: ", "You receive 3x income on provinces.")
            .setTimestamp()
        msg.channel.send(itemEmbed);
    } else if (itemChoice == "The Vatican") {
        const itemEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(user.username)
            .addField("Item: ", "The Vatican")
            .addField("Use: ", "You receive 2x income on countries.")
            .addField("*Ascended Use: ", "You receive 3x income on countries.")
            .setTimestamp()
        msg.channel.send(itemEmbed);
    } else if (itemChoice == "Devil's Advocate") {
        const itemEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(user.username)
            .addField("Item: ", "Devil's Advocate")
            .addField("Use: ", "2x Curse Damage for 0.5x Curse Price (rounded down).")
            .addField("*Ascended Use: ", "3x Curse Damage for 0.3x Curse Price (rounded down).")
            .setTimestamp()
        msg.channel.send(itemEmbed);
    } else if (itemChoice == "Menorah") {
        const itemEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(user.username)
            .addField("Item: ", "Menorah")
            .addField("Use: ", "You can steal up to 7 prayers.")
            .addField("Ascended Use: ", "You can steal up to 9 prayers.")
            .setTimestamp()
        msg.channel.send(itemEmbed);
    } else if (itemChoice == "Master Bolt") {
        const itemEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(user.username)
            .addField("Item: ", "Master Bolt")
            .addField("Use: ", "A one time smite that steals 10% of the target's prayers.")
            .addField("*Ascended Use: ", "A one time smite that steals 15% of the target's prayers.")
            .setTimestamp()
        msg.channel.send(itemEmbed);
    } else if (itemChoice == "Four Leaf Clover") {
        const itemEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(user.username)
            .addField("Item: ", "Four Leaf Clover")
            .addField("Use: ", "There will only be two options when gambling.")
            .addField("Ascended Use: ", "You will gain 2x the winnings.")
            //.addField("Ascended Use: ", "There will only be two correct options when gambling.")
            .setTimestamp()
        msg.channel.send(itemEmbed);
    } else if (itemChoice == "Altar") {
        const itemEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(user.username)
            .addField("Item: ", "Altar")
            .addField("Use: ", "Your income doubles for ONE prayday.")
            .addField("*Ascended Use: ", "Your income triples for ONE prayday.")
            .setTimestamp()
        msg.channel.send(itemEmbed);
    }

}
module.exports = { Item };