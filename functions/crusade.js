const { Config } = require("../config");
const { CheckifUserExists } = require("../../bot");
const Discord = require("discord.js");
const client = new Discord.Client();

async function Crusade(userId, msg, dbHandler) {

    let arr = [

    ]
    const embed = new Discord.MessageEmbed()
        .setTitle(`${msg.author.username}'s Crusade`)
        .setColor('36393F')
        .setDescription(`React with :pray: to enter!`)
        .setTimestamp(Date.now() + (10000))
    let message = await msg.channel.send(':pray: **CRUSADE** :pray:', embed)
    await message.react('🙏')
    setTimeout(() => {
        message.reactions.cache.get('🙏').users.remove(Config.PrayBotID)

        setTimeout(() => {

            let reactors = message.reactions.cache.get('🙏').users.cache.keys();

            for (let word of reactors) {
                dbHandler.getDB().get('users').value().forEach((user) => {
                    if (user.id === word) {
                        arr.push(word)
                    }
                });
            }

            if (!arr.includes(msg.author.id)) {
                arr.push(msg.author.id)
            }

            let text = "";

            for (let i = 0; i < arr.length; i++) {
                if (arr.length === 1) {
                    text = "<@" + arr[0] + "> ";
                } else if (arr.length === 2) {
                    text = "<@" + arr[0] + "> and " + "<@" + arr[1] + "> ";
                } else if (i == arr.length - 2) {
                    text += "<@" + arr[i] + ">, and ";
                } else if (i == arr.length - 1) {
                    text += "<@" + arr[i] + "> ";
                } else {
                    text += "<@" + arr[i] + ">, ";
                }
            }

            /*
            Crusades:
            1. Crusade of the Faint-Hearted  / 1101 Crusade (1160 strength)
            2. Battle of Fariksfur / Seventh Crusade
            3. Sack of Constantinople / Second Crusade (37000 strength)
            4. Siege of Acre / Third Crusade (59000 strength)
            5. Prince's Crusade / Siege of Jerusalem / First Crusade (42000 - 60000 strength)
            6. Holy Land (NA)
            */

            let crusade;
            let difficulty; //0.5 = 50% chance, 0.2 = 20%, 0.9 = 90% of success

            if (arr.length === 0) {
                crusade = "No Crusade";
            } else if (arr.length === 1) {
                crusade = "Crusade of the Faint-Hearted";
                difficulty = 0.7; //70 * (1)
            } else if (arr.length < 4) {
                crusade = "Battle of Fariksfur";
                difficulty = 0.3; //30 * (2/3)
            } else if (arr.length < 6) {
                crusade = "Sack of Constantinople";
                difficulty = 0.2; //20 * (4/5)
            } else if (arr.length < 10) { //7,8,9
                crusade = "Siege of Acre";
                difficulty = 0.11; //11 * (7/8/9)
            } else if (arr.length === 10) { //10
                crusade = "Prince's Crusade";
                difficulty = 0.1; //10 * (10)
            } else { //10+
                crusade = "Battle For The Holy Land";
                difficulty = 0.08; //8x
            }

            if (arr.length === 0) {
                const crusade_embed = new Discord.MessageEmbed()
                    .setTitle(`${msg.author.username}'s Crusade`)
                    .setColor('36393F')
                    .setDescription(`No one joined the crusade.`)
                message.edit(':pray: **CRUSADE ENDED** :pray:', crusade_embed);
            } else {
                const crusade_embed = new Discord.MessageEmbed()
                    .setTitle(`${crusade}`)
                    .setColor('36393F')
                    .setDescription(`${text} joined the crusade.`)
                    .setFooter(`${msg.author.username}'s Crusade`)
                message.edit(':pray: **CRUSADE STARTED** :pray:', crusade_embed);
            }

            let livingArr = arr;

            var x = 0;
            var intervalID = setInterval(function () {

                let luck = 0;
                for (let k = 0; k < livingArr.length; k++) {
                    luck = (Math.random());
                    if (luck > difficulty) {
                        msg.channel.send("<@" + arr[k] + "> has died.")
                        livingArr.splice(k, 1)
                    }
                }

                if (++x >= arr.length) {
                    clearInterval(intervalID);

                    for (let i = 0; i < livingArr.length; i++) {

                        if (livingArr.length === 1) {
                            text = "<@" + livingArr[0] + "> ";
                        } else if (livingArr.length === 2) {
                            text = "<@" + livingArr[0] + "> and " + "<@" + livingArr[1] + "> ";
                        } else if (i == livingArr.length - 2) {
                            text += "<@" + livingArr[i] + ">, and ";
                        } else if (i == livingArr.length - 1) {
                            text += "<@" + livingArr[i] + "> ";
                        } else {
                            text += "<@" + livingArr[i] + ">, ";
                        } 
                    }

                    if (livingArr.length === 0) {
                        msg.channel.send("Everyone died in the " + crusade);
                        return;
                    } else {
                        msg.channel.send(text + " lived in the " + crusade + ".");
                        return;
                    }
                }
            }, 4000);  //Time between deaths

        }, 5000); //How long until crusade starts
    }, 10000); //How long until pray ends
}

module.exports = { Crusade };