const { Config } = require("../config");
const { CheckifUserExists } = require("../../bot");

function Count(userId, msg, dbHandler) {
    let userstore = dbHandler.getDB().get('users');
    //check first if user is a new user

    dbHandler.CheckifUserExists(userId, msg);


    let target = "";

    if (msg.mentions.users.first() != undefined) {
        target = msg.mentions.users.first().id;
    }

    if (target) {

        dbHandler.CheckifUserExists(target, msg);

        let targetuser = userstore.find({
            id: target
        }).value();

        if (msg.content.includes("pray")) {
            msg.channel.send(msg.mentions.users.first().username + " has " + targetuser.prayers + " prayers.") 
        } else if (msg.content.includes("church")) {
            msg.channel.send(msg.mentions.users.first().username + " has " + targetuser.churchnum + " churches.") 
        } else if (msg.content.includes("community")) {
            msg.channel.send(msg.mentions.users.first().username + " has " + targetuser.communitynum + " communities.") 
        } else if (msg.content.includes("city")) {
            msg.channel.send(msg.mentions.users.first().username + " has " + targetuser.citynum + " cities.") 
        } else if (msg.content.includes("province")) {
            msg.channel.send(msg.mentions.users.first().username + " has " + targetuser.provincenum + " provinces.") 
        } else if (msg.content.includes("country")) {
            msg.channel.send(msg.mentions.users.first().username + " has " + targetuser.countrynum + " countries.") 
        }
         else if (msg.content.includes("all")) {
            msg.reply(msg.mentions.users.first().username + " has " + targetuser.prayers + " prayers, " +  + targetuser.churchnum + " churches, "  + targetuser.communitynum + " communities, "  + targetuser.citynum + " cities, "  + targetuser.provincenum + " provinces, and "  + targetuser.countrynum + " countries.");
        }

    } else {

        let user = userstore.find({
            id: userId
        }).value();
    

        if (msg.content.includes("pray")) {
            msg.reply("You have " + user.prayers + " prayers");  
        } else if (msg.content.includes("church")) {
            msg.reply("You have " + user.churchnum + " churches");  
        } else if (msg.content.includes("community")) {
            msg.reply("You have " + user.communitynum + " communities");  
        } else if (msg.content.includes("city")) {
            msg.reply("You have " + user.citynum + " cities");  
        } else if (msg.content.includes("province")) {
            msg.reply("You have " + user.provincenum + " provinces");  
        } else if (msg.content.includes("country")) {
            msg.reply("You have " + user.countrynum + " countries");  
        } else if (msg.content.includes("all")) {
            msg.reply("You have: " + user.prayers + " prayers, " +  + user.churchnum + " churches, "  + user.communitynum + " communities, "  + user.citynum + " cities, "  + user.provincenum + " provinces, and "  + user.countrynum + " countries.");
        }
    }
}

module.exports = { Count };