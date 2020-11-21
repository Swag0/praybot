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
      
        msg.channel.send(msg.mentions.users.first().username + " has " + targetuser.prayers + " prayers.") 
    } else {

        let user = userstore.find({
            id: userId
        }).value();


        msg.reply("You have " + user.prayers + " prayers");  
    }
}

module.exports = { Count };