const { Config } = require("../config");
const { CheckifUserExists } = require("../../bot");
const Discord = require("discord.js");


function Profile(userId, msg, dbHandler) {
    let userstore = dbHandler.getDB().get('users');
    //check first if user is a new user
    dbHandler.CheckifUserExists(userId, msg);

    let user = userstore.find({
        id: userId
    }).value();


    let target = "";

    if (msg.mentions.users.first() != undefined) {
        target = msg.mentions.users.first().id;
    }

    if (target) {

        dbHandler.CheckifUserExists(target, msg);

        let player = userstore.find({
            id: target
        }).value();

        const profileEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(player.username)
        .addField("Prayers: ", player.prayers)
        .addField("Churches ", player.churchnum)
        .addField("Communities: ", player.communitynum)
        .addField("Cities ", player.citynum)
        .addField("Provinces: ", player.provincenum)
        .addField("Countries: ", player.countrynum)
        .addField("Item: ", player.item)
        .setTimestamp()
        .setFooter(player.username, 'https://i.pinimg.com/originals/19/0f/d7/190fd7f6d541af4262516cb3d9a7bc3f.png');
        msg.channel.send(profileEmbed);

    } else {
        const profileEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(user.username)
        .addField("Prayers: ", user.prayers)
        .addField("Churches: ", user.churchnum)
        .addField("Communities: ", user.communitynum)
        .addField("Cities: ", user.citynum)
        .addField("Provinces: ", user.provincenum)
        .addField("Countries: ", user.countrynum)
        .addField("Item: ", user.item)
        .setTimestamp()
        .setFooter(user.username, 'https://i.pinimg.com/originals/19/0f/d7/190fd7f6d541af4262516cb3d9a7bc3f.png');
    msg.channel.send(profileEmbed);
    }

    

}

module.exports = { Profile };