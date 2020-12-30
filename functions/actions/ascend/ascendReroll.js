const { Config } = require("../../config");
const { CheckifUserExists } = require("../../../bot");

function Convert(userId, msg, dbHandler) {

    let userstore = dbHandler.getDB().get('users');
    //check first if user is a new user
    dbHandler.CheckifUserExists(userId, msg);

    let user = userstore.find({
        id: userId
    }).value();

    if (user.ascension === "0") {
        msg.reply("You can't convert until you have ascended.");
        return;
    }

    for (var i = Config.ascensionArr.length - 1; i >= 0; i--) {
        if (Config.ascensionArr[i].toLowerCase().includes(user.ascension.toLowerCase())) {
            Config.ascensionArr.splice(i, 1);
        }
    }

    let cost = 0;

    ascensionLevel = Number(user.ascension.split(" ").pop());

    cost = ascensionLevel * 750000; //make 5 mill


    let ascendChoice = "-";

    if (user.prayers >= cost) {

        Config.ascensionArr.forEach(item => {
            if (msg.content.toLowerCase().includes(item.toLowerCase())) {
                ascendChoice = item;
            }
        });

        if (ascendChoice == "-") {
            msg.reply("Choose your new ascension. Do this with †convert [new ascension].")
            return;
        }

        msg.reply("Converting your ascension costs " + cost + " prayers. Are you sure you want to change your ascension from " + user.ascension + " to " + ascendChoice + ": " + ascensionLevel + ".")
            .then(function (message) {

                message.react('✅').then(r => {
                    message.react('❎');
                });

                // First argument is a filter function
                message.awaitReactions((reaction, user) => user.id == msg.author.id && (reaction.emoji.name == '✅' || reaction.emoji.name == '❎'),
                    { max: 1, time: 10000 }).then(collected => {
                        if (collected.first().emoji.name == '✅') {
                            msg.channel.send("Ok. You rerolled and now have " + ascendChoice + ".");
                            user.ascension = ascendChoice.concat(": ").concat(ascensionLevel);

                            userstore.find({
                                id: msg.author.id
                            }).assign({
                                prayers: user.prayers -= cost,
                            })
                                .write();
                            return;
                        }
                        else if (collected.first().emoji.name == '❎') {
                            msg.channel.send("Ok. You will keep " + user.ascension + ".")
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
        msg.reply("You don't have enough to change your ascension. You need " + cost + " prayers.")
        return;
    }




}

module.exports = { Convert };