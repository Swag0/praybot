
const { Config } = require("../../config");
const { CheckifUserExists } = require("../../../bot");
const Discord = require("discord.js");
const client = new Discord.Client();

function AscendHelp(msg) {

    /*Ascension Types
    Choosy: (You get to choose your item when rerolling)
    Pray Upgrade: (You pray 1% of your total prayers)
    Upgraded Abilities: (Your abilities are upgraded.
        - You can choose your gamble cost
        - Your curse does 5x
        - You steal 5x)
    Income Upgrade: (You get 2x income)
    Item Upgrade:
      "Holy Grail", (3 prayers)
      "Blessed", (also no stealing)
      "Godspeed", (3x stealing)
      "Zeus' Chosen", (75% backfire)
      "Atheist", (Can Pray || 10 minute gamble)
      "Priest", (5 minute pray timer)
      "Devil's Advocate", (3x curse + 1/3x curse)
      "Bible", (3x income)
      "Religious School", (3x income)
      "Sistine Chapel", (3x income)
      "Bible Belt", (3x income)
      "The Vatican", (3x income)
      "Menorah", (Can steal 9)
      "Master Bolt", (Smite 20%)
      "Four Leaf Clover", (2 correct choices)
      "Altar" (3x income)
    */

    const ascensionsEmbed = new Discord.MessageEmbed()
        .setColor('#B0FFFA')
        .setTitle("Possible Ascensions")
        .addField("Reroll Upgrade", 'When rerolling, you get to choose which item to receive. You also receive discounted rerolls.') 
        .addField("Pray Upgrade", 'When praying, you gain a percent of your total prayers (rounded up).') 
        .addField("Attack Upgrade", 'Your cursing and stealing actions are upgraded. ') //5x curse and %steal.
        .addField("Income Upgrade", 'You gain more income.') 
        .addField("Item Upgrade", 'Your items are upgraded.') 
    msg.channel.send(ascensionsEmbed);

}

module.exports = { AscendHelp };
