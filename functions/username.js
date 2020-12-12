const { Config } = require("./config");
const { CheckifUserExists } = require("../bot");
const Discord = require("discord.js");
const client = new Discord.Client();

function SetUsername(userId, msg, dbHandler) {
    let userstore = dbHandler.getDB().get('users');
    //check first if user is a new user
    dbHandler.CheckifUserExists(userId, msg);

    let usersname = userstore.find({ //finds specific username
        id: userId
    }).value().username;

    const args = msg.content.trim().split(/ +/g);
    const cmd = args[0].slice(1).toLowerCase(); // case INsensitive, without prefix

    if (cmd === 'username') {
        if (!args[1]) {
            msg.reply("Please specify your new username.")
            return;
        }

        let res;
        res = args.slice(1, args.length);
        var newUsername = res.toString().replace(",", " ");
        msg.reply("Are you sure you want to change your name to **" + newUsername + "**?")

            .then(function (message) {

                message.react('✅').then(r => {
                    message.react('❎');
                });

                // First argument is a filter function
                message.awaitReactions((reaction, user) => user.id == msg.author.id && (reaction.emoji.name == '✅' || reaction.emoji.name == '❎'),
                    { max: 1, time: 10000 }).then(collected => {
                        if (collected.first().emoji.name == '✅') {
                            msg.channel.send("Ok. Your new username is " + newUsername + ".")
                            userstore.find({
                                id: userId
                            }).assign({
                                username: newUsername,
                            })
                                .write();
                        }
                        else if (collected.first().emoji.name == '❎') {
                            msg.channel.send("Ok. You will stay as " + usersname + ".")
                            return;
                        }
                    }).catch(() => {
                        msg.reply('No reaction after 10 seconds, operation cancelled');

                    });

            }).catch(function () {
                console.log("something maybe did sad");
            });

    }



}

module.exports = { SetUsername };