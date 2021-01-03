const { Config } = require("../../config");
const { CheckifUserExists } = require("../../../bot");
const Discord = require("discord.js");
const client = new Discord.Client();

async function Crusade(userId, msg, dbHandler) {

    let durationBetweenDeaths = 2500;
    let reactionTime = 10000;
    let waitTime = 5000;

    let userstore = dbHandler.getDB().get('users');

    dbHandler.CheckifUserExists(userId, msg);

    let main = userstore.find({
        id: userId
    }).value();

    if (!(Date.now() - main.lastcrusadedate > Config.crusadeCooldown)) {
        let remainingTime = Config.crusadeCooldown - (Date.now() - main.lastcrusadedate)
        if (remainingTime > 3600000) {
            msg.channel.send("You recently lost a crusade. Wait " + (Math.floor(remainingTime / 1000 / 60 / 60)) + " hour and " + (Math.floor(remainingTime / 1000 / 60) - (Math.floor(remainingTime / 1000 / 60 / 60) * 60)) + " minutes to crusade again.");
        } else {
            msg.channel.send("You recently lost a crusade. Wait " + Math.floor(remainingTime / 1000 / 60) + ":" + Math.floor(remainingTime / 1000 % 60) + " to crusade again.");
        }
        return;
    }

    let arr = [

    ]
    const embed = new Discord.MessageEmbed()
        .setTitle(`${msg.author.username}'s Crusade`)
        .setColor('36393F')
        .setDescription(`React with :pray: to enter!`)
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

            let crusade;
            let difficulty; //0.5 = 50% chance, 0.2 = 20%, 0.9 = 90% of success
            let reward;

            if (arr.length === 0) {
                crusade = "No Crusade";
            } else if (arr.length === 1) {
                crusade = "Crusade of the Faint-Hearted";
                difficulty = 0.5; //50 * (1)
                reward = 10;
            } else if (arr.length < 4) {
                crusade = "Battle of Fariksfur";
                difficulty = 0.3; //30 * (2/3)
                reward = 100;
            } else if (arr.length < 6) {
                crusade = "Sack of Constantinople";
                difficulty = 0.2; //20 * (4/5)
                reward = 3000;
            } else if (arr.length < 10) { //7,8,9
                crusade = "Siege of Acre";
                difficulty = 0.11; //11 * (7/8/9)
                reward = 15000;
            } else if (arr.length === 10) { //10
                crusade = "Prince's Crusade";
                difficulty = 0.1; //10 * (10)
                reward = 100000;
            } else { //10+
                crusade = "Battle For The Holy Land";
                difficulty = 0.08; //8x
                reward = 250000;
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
            let luck;
            var died = [

            ]
            var deadArr = [

            ]

            console.log("Everyone: " + arr);


            var x = 0;
            var intervalID = setInterval(function () {

                for (let k = 0; k < arr.length; k++) {

                    luck = (Math.random());
                    let luckMod = 1;

                    user = userstore.find({
                        id: arr[k]
                    }).value();

                   
                    if (user.item === "Excalibur") {
                        if (user.ascension.includes("Item Upgrade")) luckMod = (2 + (Number(user.ascension.split(" ").pop())));
                        else luckMod = 2;
                    }

                    if (user.item === "Upside-Down Horseshoe") {
                        luckMod *= 0.9;
                    }

                    if (1 / luckMod <= difficulty) { //If guaranteed win, 5% chance of loss
                        if (luck >= 0.95) luck = 100;
                    }

                    if (luck / luckMod > difficulty) {
                        msg.channel.send("<@" + arr[k] + "> has died.")
                        died.push(k);
                        deadArr.push(arr[k])
                    }
                }


                for (let i = arr.length; i >= 0; i--) {
                    if (died.includes(i)) {
                        livingArr.splice(i, 1);
                    }
                }


                if (++x >= arr.length) {
                    const crusade_embed = new Discord.MessageEmbed()
                        .setTitle(`${crusade}`)
                        .setColor('36393F')
                        .setDescription(`${text} joined the crusade.`)
                        .setFooter(`${msg.author.username}'s Crusade`)
                    message.edit(':pray: **CRUSADE ENDED** :pray:', crusade_embed);
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

                    console.log("Dead: " + deadArr)
                    console.log("Living: " + livingArr)

                    if (livingArr.length === 0) {
                        msg.channel.send("Everyone died in the " + crusade);
                        for (let i = 0; i < deadArr.length; i++) { //Everyone Died:

                            user = userstore.find({
                                id: deadArr[i]
                            }).value();

                            user.item = "Upside-Down Horseshoe"

                            if (user === main) {
                                user.lastcrusadedate = Date.now();
                            } else {
                                user.lastcrusadedate = user.lastcrusadedate + 1200000; //20 mins longer time
                            }

                            userstore.find({
                                id: user
                            }).write();
                        }
                        return;
                    } else {
                        msg.channel.send(text + " lived in the " + crusade + ".");
                        let user;
                        const crusade_embed = new Discord.MessageEmbed()
                            .setTitle(`${crusade}`)
                            .setColor('36393F')
                            .setDescription(`${text} won the crusade.`)
                            .setFooter(`${msg.author.username}'s Crusade`)
                        message.edit(':pray: **CRUSADE ENDED** :pray:', crusade_embed);

                        for (let i = 0; i < deadArr.length; i++) { //Helped (Died):

                            user = userstore.find({
                                id: deadArr[i]
                            }).value();

                            if (user === main) {
                                user.lastcrusadedate = Date.now();
                            } else {
                                user.lastcrusadedate = user.lastcrusadedate + 1200000; //20 mins longer time
                            }

                            user.item = "Upside-Down Horseshoe"

                            userstore.find({
                                id: user
                            }).write();
                        }
                        for (let i = 0; i < livingArr.length; i++) { //Win Only:

                            user = userstore.find({
                                id: livingArr[i]
                            }).value();

                            if (user === main) {
                                user.prayers += Math.round(reward * 1.5);
                                msg.channel.send("<@" + user.id + "> led the crusade and gained extra prayers.");
                                user.lastcrusadedate = Date.now() - Config.crusadeCooldown;
                                if (main.item === "Upside-Down Horseshoe") {
                                    let randomArr = Math.floor(Math.random() * Config.itemArr.length);
                                    main.item = Config.itemArr[randomArr];
                                }
                            } else {
                                user.prayers += reward;
                                user.lastcrusadedate = user.lastcrusadedate - 3600000 //1 hour shorter time
                            }

                            userstore.find({
                                id: user
                            }).write();
                        }
                        return;
                    }
                }
            }, durationBetweenDeaths);  //Time between deaths

        }, waitTime); //How long until crusade starts
    }, reactionTime); //Reaction time
}

module.exports = { Crusade };