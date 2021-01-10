
const { Config } = require("../../config");
const { CheckifUserExists } = require("../../../bot");

function Ascend(userId, msg, dbHandler) {

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
        if (msg.content.toLowerCase().includes(item.toLowerCase())) {
            ascensionChoice = item;
        }
    });

    if (!user.ascension.toLowerCase().includes(ascensionChoice.toLowerCase()) && user.ascension != "0") { //If changing ascension path
        msg.reply("You are changing ascension paths. Use †convert [new ascension] instead.");
        return;
    }

    if (ascensionChoice == "-") {
        msg.reply("Please choose an ascension path. Use (†ascend help) for possible paths.")
        return;
    }

    givenAscension = ascensionChoice;

    if (ascensionLevel === 10) {
        msg.reply("You are at the highest ascension level.")
        return;
    }

    let prayersLeft = 0;

    if (user.karma > 7500) user.karma = 7500;

    prayersLeft = user.karma / 50000;

    if (user.karma < 0) prayersLeft = 0;


    if (user.prayers >= cost) {
        msg.reply(`You will ascend into ${givenAscension} level ${(ascensionLevel + 1)}. You will lose ${Math.round((100 - (prayersLeft * 100)) * 100) / 100}% of your remaining prayers and all of your buildings. Are you sure you want to ascend?`)
            .then(function (message) {

                message.react('✅').then(r => {
                    message.react('❎');
                });

                // First argument is a filter function
                message.awaitReactions((reaction, user) => user.id == msg.author.id && (reaction.emoji.name == '✅' || reaction.emoji.name == '❎'),
                    { max: 1, time: 10000 }).then(collected => {
                        if (collected.first().emoji.name == '✅') {
                            ascensionLevel++;


                            if (ascensionLevel === 10) {
                                msg.reply("You are now at the highest ascension level. You have been a worthy worshipper, " + user.username + ".");
                                console.log("Congratulations " + user.username + "! They have reached ascension level 10.");
                            }

                            user.karma /= 2;
                            user.karma = Math.round(user.karma);

                            user.ascension = givenAscension.concat(": ").concat(ascensionLevel);

                            user.prayers += user.churchnum * (Config.churchPrice / 5);
                            user.prayers += user.communitynum * (Config.communityPrice / 5);
                            user.prayers += user.citynum * (Config.cityPrice / 5);
                            user.prayers += user.provincenum * (Config.provincePrice / 5);
                            user.prayers += user.countrynum * (Config.countryPrice / 5);

                            user.churchnum = 0;
                            user.communitynum = 0;
                            user.citynum = 0;
                            user.provincenum = 0;
                            user.countrynum = 0;

                            let remainingPrayers = Math.round((user.prayers - cost) * prayersLeft);

                            userstore.find({
                                id: msg.author.id
                            }).assign({
                                prayers: remainingPrayers,
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
        msg.reply("You don't have enough to ascend. You need " + cost + " prayers.")
        return;
    }




}

module.exports = { Ascend };
