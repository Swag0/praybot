
const { Config } = require("../../config");
const { CheckifUserExists } = require("../../../bot");

function Ascend(userId, msg, dbHandler) {

    /*Ascension Types
    Free Will: (You get to choose your item when rerolling)
    Percent Pray: (You pray 1% of your total prayers)
    Action Upgrade: (Your actions are upgraded.
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
      "Menorah", (Can steal 8, 9, etc)
      "Master Bolt", (Smite 20%)
      "Four Leaf Clover", (2 correct choices)
      "Altar" (3x income)
    */


    let userstore = dbHandler.getDB().get('users');
    //check first if user is a new user
    dbHandler.CheckifUserExists(userId, msg);

    let user = userstore.find({
        id: userId
    }).value();

    let cost = 0;

    ascensionLevel = Number(user.ascension.split(" ").pop());

    cost = Math.pow(5, ascensionLevel);

    cost *= 1000000; //make 5 mill

    let ascensionChoice = "-";

    Config.ascensionArr.forEach(item => {
        if (msg.content.includes(item)) {
            ascensionChoice = item;
        }
    });

    if (!user.ascension.includes(ascensionChoice)) { //If changing ascension path
        cost = 1000000;
        ascensionLevel = 0;
    }

    if (ascensionChoice == "-") {
        msg.reply("Please choose an ascension path. Use (†ascend help) for possible paths.")
        return;
    }

    givenAscension = ascensionChoice;

    if (user.prayers >= cost) {
        msg.reply("You will ascend into " + givenAscension + " level " + (ascensionLevel + 1) + ". It costs " + cost + " prayers and you will lose all of your buildings. Are you sure you want to ascend?")
            .then(function (message) {

                message.react('✅').then(r => {
                    message.react('❎');
                });

                // First argument is a filter function
                message.awaitReactions((reaction, user) => user.id == msg.author.id && (reaction.emoji.name == '✅' || reaction.emoji.name == '❎'),
                    { max: 1, time: 10000 }).then(collected => {
                        if (collected.first().emoji.name == '✅') {
                            ascensionLevel++;
                            user.ascension = givenAscension.concat(": ").concat(ascensionLevel);

                            user.churchnum = 0;
                            user.communitynum = 0;
                            user.citynum = 0;
                            user.provincenum = 0;
                            user.countrynum = 0;

                            userstore.find({
                                id: msg.author.id
                            }).assign({
                                prayers: user.prayers -= cost,
                            })
                                .write();

                            msg.channel.send("Ok. You ascended and now have " + user.ascension + ".");
                            console.log(user.username + " ascended into " + user.ascension);
                            return;
                        }
                        else if (collected.first().emoji.name == '❎') {
                            if (user.ascension != "0") msg.reply("Ok. You will keep " + user.ascension + ".");
                            else msg.reply("Ok. You will continue with no ascensions.");
                            return;
                        }
                    }).catch(() => {
                        msg.reply('No reaction after 10 seconds, operation cancelled');
                        return;
                    });

            }).catch(function () {
                console.log("something maybe did sad");
                return;
            });
    } else {
        msg.reply("You don't have enough to reroll. You need " + cost + " prayers.")
        return;
    }




}

module.exports = { Ascend };
