const { Config } = require("../config");
const { CheckifUserExists } = require("../../bot");
const Discord = require("discord.js");
const client = new Discord.Client();

function Gamble(userId, msg, dbHandler) {
    let userstore = dbHandler.getDB().get('users');
    //check first if user is a new user
    dbHandler.CheckifUserExists(userId);

    let player = msg.author.id;

    let user = userstore.find({
        id: userId
    }).value();

    dbHandler.CheckifUserExists(player);

    let playerprayers = userstore.find({
        id: player
    }).value().prayers;

    if (playerprayers < 1) {
        msg.reply("You need 1 prayer in order to gamble.");
        return;
    }

    if (user.lastgambledate == undefined || user.lastgambledate == NaN) {
        user.lastgambledate = 0;
    }

    if (Date.now() - user.lastgambledate > Config.gambleCooldown) {

        let guess = 0;

        let gamblenum = Math.floor(Math.random() * 3 + 1);

        console.log(user.username + " should say " + gamblenum + ".");

        msg.channel.send("Pick a number.")


            .then(function (message) {

                message.react('1️⃣').then(r => {
                    message.react('2️⃣').then(r => {
                        message.react('3️⃣');
                    })
                });

                // First argument is a filter function
                message.awaitReactions((reaction, user) => user.id == msg.author.id && (reaction.emoji.name == '1️⃣' || reaction.emoji.name == '2️⃣' || reaction.emoji.name == '3️⃣'),
                    { max: 1, time: 10000 }).then(collected => {
                        if (collected.first().emoji.name == '1️⃣') {
                            user.lastgambledate = Date.now();
                            guess = 1;
                            if (guess == gamblenum) {
                                userstore.find({
                                    id: player
                                }).assign({
                                    prayers: playerprayers + 3,
                                })
                                    .write();
                                msg.reply('You guessed ' + guess + ' and were correct.');
                            } else {
                                userstore.find({
                                    id: player
                                }).assign({
                                    prayers: playerprayers - 1,
                                })
                                    .write();
                                msg.reply('You guessed ' + guess + ' and were incorrect.');
                                msg.channel.send("The answer was " + gamblenum + ".");
                            }
                        }
                        else if (collected.first().emoji.name == '2️⃣') {
                            user.lastgambledate = Date.now();
                            guess = 2;
                            if (guess == gamblenum) {
                                userstore.find({
                                    id: player
                                }).assign({
                                    prayers: playerprayers + 3,
                                })
                                    .write();
                                msg.reply('You guessed ' + guess + ' and were correct.');
                            } else {
                                userstore.find({
                                    id: player
                                }).assign({
                                    prayers: playerprayers - 1,
                                })
                                    .write();
                                msg.reply('You guessed ' + guess + ' and were incorrect.');
                                msg.channel.send("The answer was " + gamblenum + ".");
                            }
                        }
                        else if (collected.first().emoji.name == '3️⃣') {
                            user.lastgambledate = Date.now();
                            guess = 3;
                            if (guess == gamblenum) {
                                userstore.find({
                                    id: player
                                }).assign({
                                    prayers: playerprayers + 3,
                                })
                                    .write();
                                msg.reply('You guessed ' + guess + ' and were correct.');
                            } else {
                                userstore.find({
                                    id: player
                                }).assign({
                                    prayers: playerprayers - 1,
                                })
                                    .write();
                                msg.reply('You guessed ' + guess + ' and were incorrect.');
                                msg.channel.send("The answer was " + gamblenum + ".");
                            }
                        }
                    }).catch(() => {
                        msg.reply('No reaction after 10 seconds, operation cancelled');
                    });

            }).catch(function () {
                console.log("something maybe did sad");
            });

    } else {

        let remainingTime = Config.gambleCooldown - (Date.now() - user.lastgambledate)
        if (Math.floor(remainingTime / 1000 % 60) < 10) {
            msg.channel.send("You have gambled too much. Do not fall to addiction. Wait " + Math.floor(remainingTime / 1000 / 60) + ":0" + Math.floor(remainingTime / 1000 % 60) + ".");
        } else {
            msg.channel.send("You have gambled too much. Do not fall to addiction. Wait " + Math.floor(remainingTime / 1000 / 60) + ":" + Math.floor(remainingTime / 1000 % 60) + ".");
        }
    }
}

module.exports = { Gamble };