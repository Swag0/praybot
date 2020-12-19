const { Config } = require("../config");
const { CheckifUserExists } = require("../../bot");

function Curse(userId, msg, dbHandler) {
    let userstore = dbHandler.getDB().get('users');
    //check first if user is a new user
    dbHandler.CheckifUserExists(userId, msg);

    let target = msg.mentions.users.first().id;
    let curser = msg.author.id;

    dbHandler.CheckifUserExists(target, msg);
    dbHandler.CheckifUserExists(curser, msg);

    let user = userstore.find({
        id: userId
    }).value();

    let targetId = userstore.find({
        id: target
    }).value();

    if (targetId.item == "Blessed") {
        msg.channel.send(msg.mentions.users.first().username + " can not be cursed as they are Blessed.")
        return;
    }



    let curserprayers = userstore.find({
        id: curser
    }).value().prayers;

    let targetprayers = userstore.find({
        id: target
    }).value().prayers;


    let cursednum = Math.ceil(targetprayers / 100); //2% of prayers
    let cursernum = Math.ceil(curserprayers / 100);

    console.log(user.item);

    if (user.item == "Devil's Advocate") {
        cursednum = Math.ceil(cursednum * 2)
        cursernum = Math.floor(cursernum / 2)
    }
    
    if (Date.now() - user.lastcursedate > Config.curseCooldown) {

            msg.reply("Are you sure you want to curse them? You will lose " + cursernum + " and they will lose " + cursednum + ".")
                .then(function (message) {

                    message.react('✅').then(r => {
                        message.react('❎');
                    });

                    // First argument is a filter function
                    message.awaitReactions((reaction, user) => user.id == msg.author.id && (reaction.emoji.name == '✅' || reaction.emoji.name == '❎'),
                        { max: 1, time: 10000 }).then(collected => {
                            if (collected.first().emoji.name == '✅') {
                                
                                console.log("Curse: " + msg.author.username + " => " + msg.mentions.users.first().username + ".");

                                userstore.find({
                                    id: target
                                }).assign({
                                    prayers: targetprayers - cursednum,
                                })
                                    .write();

                                userstore.find({
                                    id: curser
                                }).assign({
                                    prayers: curserprayers - cursernum,
                                })
                                    .write();

                                msg.channel.send(msg.mentions.users.first().username + " lost " + cursednum + " prayers.");
                                msg.channel.send(msg.author.username + " lost " + cursernum + " prayers.");
                                user.lastcursedate = Date.now();
                            }
                            else if (collected.first().emoji.name == '❎') {
                                message.edit("You did not curse " + msg.mentions.users.first().username + ".")
                            }
                        }).catch(() => {
                            msg.reply('No reaction after 10 seconds, operation cancelled');

                        });

                }).catch(function () {
                    console.log("something maybe did sad");
                });
    } else {

        let remainingTime = Config.curseCooldown - (Date.now() - user.lastcursedate)

        if (remainingTime > 3600000) {
            msg.channel.send("The gods are watching. Wait " + (Math.floor(remainingTime / 1000 / 60 / 60)) + " hour and " + (Math.floor(remainingTime / 1000 / 60) - (Math.floor(remainingTime / 1000 / 60 / 60) * 60)) + " minutes to curse again.");
        } else {
            msg.channel.send("The gods are watching. Wait " + Math.floor(remainingTime / 1000 / 60) + ":" + Math.floor(remainingTime / 1000 % 60) + " to curse again.");
        }
        console.log("Attempted Curse: " + msg.author.username + ".");

    }
}
module.exports = { Curse };