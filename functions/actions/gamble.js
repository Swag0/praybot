const { Config } = require("../config");
const { CheckifUserExists } = require("../../bot");
const Discord = require("discord.js");
const client = new Discord.Client();

function Gamble(userId, msg, dbHandler) {
    let userstore = dbHandler.getDB().get('users');
    //check first if user is a new user
    dbHandler.CheckifUserExists(userId, msg);

    let player = msg.author.id;

    let user = userstore.find({
        id: userId
    }).value();

    dbHandler.CheckifUserExists(player, msg);

    let playerprayers = userstore.find({
        id: player
    }).value().prayers;

    if (playerprayers < 1) {
        if (user.item == "Atheist") {
            msg.reply("You have no prayers, so don't lose or you are going into debt");
        } else {
            msg.reply("You need 1 prayer in order to gamble.");
            return;
        }
    }

    if (user.lastgambledate == undefined || user.lastgambledate == NaN) {
        user.lastgambledate = 0;
    }

    let cooldown = Config.gambleCooldown;

    if (user.item == "Atheist") {
        if (user.ascension.includes("Item Upgrade")) cooldown = Config.gambleCooldown / 6;
        else cooldown = Config.gambleCooldown / 4;
    }

    if (Date.now() - user.lastgambledate > cooldown) {

        console.log(user.karma)

        if (user.item == "Four Leaf Clover") user.karma++;
        else user.karma--;

        console.log(user.karma)

        let guess = 0;

        let gamblenum = 0;

        if (user.item == "Four Leaf Clover") {
            gamblenum = Math.floor(Math.random() * 2 + 1);
        }
        else {
            gamblenum = Math.floor(Math.random() * 3 + 1);
        }

        let num = "-";

        if (!isNaN(Number(msg.content.split(" ").pop()))) {
            num = Number(msg.content.split(" ").pop());
        }

        if (num != "-") {
            if (num == gamblenum) {
                msg.reply("You guessed " + num + " and were correct.")
                user.lastgambledate = Date.now();
                if (user.ascension.includes("Item Upgrade") && user.item == "Four Leaf Clover") { //If Mega Win
                    userstore.find({
                        id: player
                    }).assign({
                        prayers: playerprayers + 6,
                    })
                        .write();
                } else { //If Normal Win
                    userstore.find({
                        id: player
                    }).assign({
                        prayers: playerprayers + 3,
                    })
                        .write();
                }
                return;
            }
            if (num > 3 && user.item != "Four Leaf Clover") {
                msg.reply("You have to guess a number from 1-3.")
                user.lastgambledate = 0;
                return;
            }
            if (num > 2 && user.item == "Four Leaf Clover") {
                msg.reply("With the Four Leaf Clover, you have to guess a number from 1-2.")
                user.lastgambledate = 0;
                return;
            }
            if (Math.round(num) != num) {
                msg.reply("Please enter an integer.")
                user.lastgambledate = 0;
                return;
            }

            if (num < 1) {
                msg.reply("Please enter a positive integer.")
                user.lastgambledate = 0;
                return;
            }

            msg.reply("You are incorrect. You guessed " + num + " and the answer was " + gamblenum + ".")
            user.lastgambledate = Date.now();
            user.prayers--;
            userstore.find({
                id: user
            }).write();
            return;
        }

        console.log(user.username + " should say " + gamblenum + ".");

        user.lastgambledate = Date.now();

        msg.channel.send("Pick a number.")


            .then(function (message) {

                message.react('1️⃣').then(r => {
                    message.react('2️⃣').then(r => {
                        if (user.item != "Four Leaf Clover") message.react('3️⃣');
                    })
                });

                // First argument is a filter function
                message.awaitReactions((reaction, user) => user.id == msg.author.id && (reaction.emoji.name == '1️⃣' || reaction.emoji.name == '2️⃣' || reaction.emoji.name == '3️⃣'),
                    { max: 1, time: 10000 }).then(collected => {
                        if (collected.first().emoji.name == '1️⃣') {
                            guess = 1;
                            if (guess == gamblenum) {
                                msg.reply('You guessed ' + guess + ' and were correct.');
                                if (user.ascension.includes("Item Upgrade") && user.item == "Four Leaf Clover") { //If Mega Win
                                    userstore.find({
                                        id: player
                                    }).assign({
                                        prayers: playerprayers + 6,
                                    })
                                        .write();
                                } else { //If Normal Win
                                    userstore.find({
                                        id: player
                                    }).assign({
                                        prayers: playerprayers + 3,
                                    })
                                        .write();
                                }
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
                            guess = 2;
                            if (guess == gamblenum) {
                                msg.reply('You guessed ' + guess + ' and were correct.');
                                if (user.ascension.includes("Item Upgrade") && user.item == "Four Leaf Clover") { //If Mega Win
                                    userstore.find({
                                        id: player
                                    }).assign({
                                        prayers: playerprayers + 6,
                                    })
                                        .write();
                                } else { //If Normal Win
                                    userstore.find({
                                        id: player
                                    }).assign({
                                        prayers: playerprayers + 3,
                                    })
                                        .write();
                                }
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
                        user.lastgambledate = 0;
                        if (user.item == "Four Leaf Clover") user.karma--;
                        else user.karma++;

                    });

            }).catch(function () {
                console.log("something maybe did sad");
            });

    } else {

        let remainingTime = cooldown - (Date.now() - user.lastgambledate)
        if (Math.floor(remainingTime / 1000 % 60) < 10) {
            msg.channel.send("You have gambled too much. Do not fall to addiction. Wait " + Math.floor(remainingTime / 1000 / 60) + ":0" + Math.floor(remainingTime / 1000 % 60) + ".");
        } else {
            msg.channel.send("You have gambled too much. Do not fall to addiction. Wait " + Math.floor(remainingTime / 1000 / 60) + ":" + Math.floor(remainingTime / 1000 % 60) + ".");
        }
    }
}

module.exports = { Gamble };