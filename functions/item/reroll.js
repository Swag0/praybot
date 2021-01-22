const { Config } = require("../config");
const { CheckifUserExists } = require("../../bot");

function Reroll(userId, msg, dbHandler) {

    let userstore = dbHandler.getDB().get('users');
    //check first if user is a new user
    dbHandler.CheckifUserExists(userId, msg);

    let user = userstore.find({
        id: userId
    }).value();

    for (var i = Config.itemArr.length - 1; i >= 0; i--) {
        if (Config.itemArr[i] === user.item) {
            Config.itemArr.splice(i, 1);
        }
    }

    let randomArr = Math.floor(Math.random() * Config.itemArr.length);

    let givenItem = Config.itemArr[randomArr];

    let cost = 5;

    cost += (user.churchnum * 1);
    cost += (user.communitynum * 11);
    cost += user.citynum * 110;
    cost += (user.provincenum * 1100);
    cost += (user.countrynum * 11000);

    let itemChoice = "-";

    if (user.ascension.includes("Reroll Upgrade")) {
        cost /= (1 + Number(user.ascension.split(" ").pop()))
        cost = Math.round(cost);
    }

    //((Number(user.ascension.split(" ").pop()))

    if (user.prayers >= cost) {

        if (user.ascension.includes("Reroll Upgrade")) {


            Config.itemArr.forEach(item => {
                if (msg.content.includes(item)) {
                    itemChoice = item;
                }
            });

            if (itemChoice == "-") {
                msg.reply("You have the Reroll Upgrade ascension. You can choose your item. Do this with †reroll [itemChoice].")
                return;
            }

            givenItem = itemChoice;
        }

        msg.reply("You can afford the reroll. It costs " + cost + " prayers or a Reroll Item. Are you sure you want to reroll?")
            .then(function (message) {

                message.react('✅').then(r => {
                    message.react('❎');
                });

                // First argument is a filter function
                message.awaitReactions((reaction, user) => user.id == msg.author.id && (reaction.emoji.name == '✅' || reaction.emoji.name == '❎'),
                    { max: 1, time: 10000 }).then(collected => {
                        if (collected.first().emoji.name == '✅') {
                            msg.channel.send("Ok. You rerolled and now have " + givenItem + ".");
                            

                            if (user.item === "Reroll") {
                                cost = 0;
                            }

                            user.item = givenItem;
                            
                            userstore.find({
                                id: msg.author.id
                            }).assign({
                                prayers: user.prayers -= cost,
                            })
                                .write();
                            return;
                        }
                        else if (collected.first().emoji.name == '❎') {
                            msg.channel.send("Ok. You will keep " + user.item + ".")
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

module.exports = { Reroll };