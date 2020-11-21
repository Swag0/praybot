const { Config } = require("../config");
const { CheckifUserExists } = require("../../bot");

function Count(userId, msg, dbHandler) {
    let userstore = dbHandler.getDB().get('users');
    //check first if user is a new user

    dbHandler.CheckifUserExists(userId);

    console.log(msg.mentions.users.first());

    let checkedmemberpray = "";

    if (msg.mentions.users.first() == undefined) {
        console.log("Nobody was mentioned. Typical people talking only about themselves. This is why COVID still exists.");
    } else {
        checkedmemberpray = msg.mentions.users.first().id;
    }
    
    
    
    console.log(checkedmemberpray != "");

    if (checkedmemberpray) {

        dbHandler.CheckifUserExists(checkedmemberpray);

        let targetuser = userstore.find({
            id: checkedmemberpray
        }).value();

        console.log("Someone is checking someone out");

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
        } 
    }
}

module.exports = { Count };