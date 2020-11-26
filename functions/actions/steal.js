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

 

    let stealnum = Math.floor(Math.random() * 5);

    let stealerprayers = userstore.find({
        id: stealer
      }).value().prayers;

    let targetprayers = userstore.find({
        id: target
      }).value().prayers;
    
    if (stealerprayers < 1) {
        msg.reply("You need 1 prayer in order to steal.");
        return;
    }    

    if (targetprayers < 4) {
        msg.reply("Your target needs at least 4 prayers to be stolen from them.");
        return;
    }

    if (target == "391015029379432448") {
        msg.reply("Don't even try.");
        return;
    }
    //console.log(msg.author.username + " is stealing from " + msg.mentions.users.first().username + ".");

    if (Date.now() - user.laststealdate > Config.stealCooldown) {

        user.laststealdate = Date.now();

        //stealnum *= Math.floor(Math.random()*4) == 1 ? -1 : 1; // this makes 75/25 positive -- maybe add?

        userstore.find({
            id: target
          }).assign({
              prayers: targetprayers - stealnum,
            })
            .write();
    
        userstore.find({
            id: stealer
          }).assign({
              prayers: stealerprayers + stealnum - 1,
            })
            .write();

        msg.channel.send(msg.mentions.users.first().username + " had " + stealnum + " prayers stolen from him.");
        msg.channel.send(msg.author.username + " gained " + (stealnum - 1) + " prayers.");

    } else {
      let remainingTime = Config.stealCooldown - (Date.now() - user.laststealdate)
      msg.channel.send("The gods are watching. Wait " +  Math.floor(remainingTime / 1000 / 60) + ":" + Math.floor(remainingTime / 1000 % 60) + " to steal again.");
    }

}
module.exports = { StealPrayers };