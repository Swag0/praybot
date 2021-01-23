const { Config } = require("./config");
const { CheckifUserExists } = require("../bot");
const Discord = require("discord.js");
const { IsAdmin } = require("./admin/isAdmin");

function RandomEvent(userId, msg, dbHandler) {

    if ((Math.random() <= 0.9925)) { //149/150 chance of NO (99.25%)
        if (msg.content === "†event" && IsAdmin(msg)) {
            console.log("Admin started an event.")
        } else {
            return;
        }
    }

    const possibleEvents = [
        "Extra Funding", //crusade time down
        "Sudden Following", //extra communities
        "Rapid Conversion", //free reroll
        "Gambling License Revoked", //gamble time up
        "Flash Flood", //Lose buildings
        "Cthulhu Awakens", //cthulhu is friend and slaps 1-8 other people
        "Tithe" //takes 1% prayers and gives to praybot
    ]

    let userstore = dbHandler.getDB().get('users');
    //check first if user is a new user
    dbHandler.CheckifUserExists(userId, msg);

    let user = userstore.find({
        id: userId
    }).value();

    if (user.ascension === "0") {
        return;
    }

    let num;

    var occurence = possibleEvents[Math.floor(Math.random() * possibleEvents.length)];

    // TODO: Make these embed
    console.log("Random Event: " + user.username + ", " + occurence + ".");

    var eventEmbed;
    //msg.channel.send(occurence);

    switch (occurence) {
        case "Extra Funding":
            eventEmbed = new Discord.MessageEmbed()
                .setTitle(occurence)
                .setDescription(`<@${user.id}>, you can now go on another crusade!`)
            msg.channel.send(eventEmbed);
            user.crusadedate = 0;
            break;
        case "Gambling License Revoked":
            eventEmbed = new Discord.MessageEmbed()
                .setTitle(occurence)
                .setDescription(`<@${user.id}>, you can't gamble for 12 hours!`)
            msg.channel.send(eventEmbed);
            user.lastgambledate = Date.now() + (Config.tickRate * 12);
            break;
        case "Sudden Following":
            num = Math.floor(Math.random() * 9) + 2; //2-10
            eventEmbed = new Discord.MessageEmbed()
                .setTitle(occurence)
                .setDescription(`<@${user.id}>, you gained an extra ${num} communities!`)
            msg.channel.send(eventEmbed);
            user.communitynum += num;
            break;
        case "Rapid Conversion":
            num = Math.floor(Math.random() * 9) + 2; //2-10
            eventEmbed = new Discord.MessageEmbed()
                .setTitle(occurence)
                .setDescription(`<@${user.id}>, you gained a free reroll!`)
            msg.channel.send(eventEmbed);
            user.item = "Reroll";
            break;
        case "Flash Flood":
            eventEmbed = new Discord.MessageEmbed()
                .setTitle(occurence)
                .setDescription(`<@${user.id}>, you lost 2% of your buildings.`)
            msg.channel.send(eventEmbed);
            user.churchnum = Math.round(user.churchnum * 0.98);
            user.communitynum = Math.round(user.communitynum * 0.98);
            user.citynum = Math.round(user.citynum * 0.98);
            user.provincenum = Math.round(user.provincenum * 0.98);
            user.countrynum = Math.round(user.countrynum * 0.98);
            break;
        case "Cthulhu Awakens":
            num = Math.floor(Math.random() * 7) + 1; //1-8

            var arr = [...dbHandler.getDB().get('users').value()];
            let array = arr;

            let shuffledArray = shuffle(array);

            let slapped = [];

            let people = num;
            for (let i = 0; i < people; i++) {
                //console.log(shuffledArray[i])
                if (shuffledArray[i].ascension === "0") { //If too low level
                    people++;
                    continue;
                }

                if (shuffledArray[i].id === undefined || shuffledArray[i].id === Config.PrayBotID) { //If non-existent
                    people++
                    continue;
                }

                if (shuffledArray[i].id === msg.author.id) { //If author
                    people++;
                    continue;
                }

                if (shuffledArray[i].prayers < 5) { //Skips if less than 5 prayers
                    people++;
                    continue;
                }

                slapped.push(shuffledArray[i]);

                userstore.find({
                    id: shuffledArray[i].id
                }).assign({
                    prayers: shuffledArray[i].prayers - 5,
                })
                    .write();
            }

            user.prayers += (num * 5);

            let text = "";
            for (let i = 0; i < slapped.length; i++) {
                if (slapped.length === 1) {
                    text = slapped[0].username + " ";
                } else if (slapped.length === 2) {
                    text = slapped[0].username + " and " + slapped[1].username + ".";
                } else if (i == slapped.length - 2) {
                    text += "" + slapped[i].username + ", and ";
                } else if (i == slapped.length - 1) {
                    text += "" + slapped[i].username + "";
                } else {
                    text += "" + slapped[i].username + ", ";
                }
            }

            eventEmbed = new Discord.MessageEmbed()
                .setTitle(occurence)
                .setDescription(`<@${user.id}>, Cthulhu is your friend, and slapped ${num} people for you. They lost 5 prayers and you gained those prayers.`)
            msg.channel.send(eventEmbed);
            msg.channel.send(`Slapped People: ${text}.`)

            break;
        case "Tithe":
            eventEmbed = new Discord.MessageEmbed()
                .setTitle(occurence)
                .setDescription(`<@${user.id}>, you have to pay a tithe of 1% of your prayers to Praybot.`)
            msg.channel.send(eventEmbed);
            
            let tithe = user.prayers;
            user.prayers = user.prayers * 0.99;
            tithe = Math.round(tithe - user.prayers);
            
            let praybot = userstore.find({
                id: Config.PrayBotID
            }).value();

            userstore.find({
                id: Config.PrayBotID,
            }).assign({
                prayers: praybot.prayers + tithe,
            })
                .write();
            
            break;
        default:
            eventEmbed = new Discord.MessageEmbed()
                .setTitle("Glitch!")
                .setDescription(`<@${user.id}>. Something broke, so here's a cookie.`)
            msg.channel.send(eventEmbed);
            user.item = "Cookie";
            break;
    }

    userstore.find({
        id: userId
    }).assign(user).write();

}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

module.exports = { RandomEvent };