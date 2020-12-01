const { Config } = require("../config");
const { CheckifUserExists } = require("../../bot");

function StealPrayers(userId, msg, dbHandler) {
    let userstore = dbHandler.getDB().get('users');
    //check first if user is a new user
    dbHandler.CheckifUserExists(userId);

    let target = msg.mentions.users.first().id;
    let stealer = msg.author.id;

    let user = userstore.find({
        id: userId
    }).value();
  
    dbHandler.CheckifUserExists(target);
    dbHandler.CheckifUserExists(stealer);

 

    let stealnum = Math.floor(Math.random() * 3 + 1); //1-3

    let stealerprayers = userstore.find({
        id: stealer
      }).value().prayers;

    let targetprayers = userstore.find({
        id: target
      }).value().prayers;
    

    if (target === stealer) {
        msg.reply("You can't steal from yourself.");
        return;
    }

    if (stealerprayers < 3) {
        msg.reply("You need 3 prayers in order to steal.");
        return;
    }    

    if (targetprayers < 3) {
        msg.reply("Your target needs at least 3 prayers to be stolen from them.");
        return;
    }

    if (target == "391015029379432448") {
        msg.reply("Don't even try.");
        return;
    }
    //console.log(msg.author.username + " is stealing from " + msg.mentions.users.first().username + ".");

    if (Date.now() - user.laststealdate > Config.stealCooldown) {

        user.laststealdate = Date.now();

        stealnum *= Math.floor(Math.random()*4) == 1 ? -1 : 1; // this makes 75/25 positive

        userstore.find({
            id: stealer
          }).assign({
              prayers: stealerprayers + stealnum,
            })
            .write();
 
        userstore.find({
            id: target
          }).assign({
              prayers: targetprayers - stealnum,
            })
            .write();

        if (stealnum > 0) { //pos
            msg.channel.send(msg.mentions.users.first().username + " had " + stealnum + " prayers stolen from him.");
            msg.channel.send(msg.author.username + " gained " + stealnum + " prayers.");
        } else { //negative
            msg.channel.send(msg.author.username + " tripped and lost " + (stealnum * -1) + " prayers.")
            msg.channel.send(msg.mentions.users.first().username + " found " + (stealnum * -1) + " prayers.");
        }

        console.log("Steal: " + msg.author.username + " => " + msg.mentions.users.first().username + ".");
        

    } else {
      let remainingTime = Config.stealCooldown - (Date.now() - user.laststealdate)
      msg.channel.send("The gods are watching. Wait " +  Math.floor(remainingTime / 1000 / 60) + ":" + Math.floor(remainingTime / 1000 % 60) + " to steal again.");
      console.log("Attempted Steal: " + msg.author.username + ".");
    }

}
module.exports = { StealPrayers };