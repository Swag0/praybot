const { Config } = require("../../config");
const { CheckifUserExists } = require("../../../bot");


function IncrementPrays(userId, msg, dbHandler) {
    console.log("Incrementing prayers for user id: " + userId);
    let userstore = dbHandler.getDB().get('users');
    //check first if user is a new user
  
    dbHandler.CheckifUserExists(userId);

    let user = userstore.find({
        id: userId
    }).value();


    if (Date.now() - user.lastpraydate > Config.prayCooldown) {
      msg.reply("You have been acknowledged for praying to your gods. Do not pray again for 15 minutes. ");
  
        user.prayers++;
        user.lastpraydate = Date.now();

        userstore.find({
            id:userId
        }).assign(user).write();

    user.prayers = Math.floor(user.prayers);

    console.log(user.username + " has " + user.prayers + " prayers ");
      msg.reply("You have " + user.prayers + " prayers");
    } else {
      let remainingTime = Config.prayCooldown - (Date.now() - user.lastpraydate)
      msg.channel.send("You are an insignificant being. Please pray in " +  Math.floor(remainingTime / 1000 / 60) + ":" + Math.floor(remainingTime / 1000 % 60) + ".");
    }
  }
  module.exports = { IncrementPrays };