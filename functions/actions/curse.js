const { Config } = require("../config");
const { CheckifUserExists } = require("../../bot");

function Curse(userId, msg, dbHandler) {
    let userstore = dbHandler.getDB().get('users');
    //check first if user is a new user
    dbHandler.CheckifUserExists(userId);

    let target = msg.mentions.users.first().id;
    let curser = msg.author.id;

    let user = userstore.find({
        id: userId
    }).value();
  
    dbHandler.CheckifUserExists(target);
    dbHandler.CheckifUserExists(curser);

 

    let cursenum = Math.floor(Math.random() * 3) + 1;

    let curserprayers = userstore.find({
        id: curser
      }).value().prayers;

    let targetprayers = userstore.find({
        id: target
      }).value().prayers;
    
    if (curserprayers < 1) {
        msg.reply("You need 2 prayer in order to curse someone.");
        return;
    }    

    if (targetprayers < 3) {
        msg.reply("Your target needs at least 3 prayers to curse them.");
        return;
    }
    //console.log(msg.author.username + " is stealing from " + msg.mentions.users.first().username + ".");

    if (Date.now() - user.lastcursedate > Config.curseCooldown) {

        user.lastcursedate = Date.now();

        //stealnum *= Math.floor(Math.random()*4) == 1 ? -1 : 1; // this makes 75/25 positive -- maybe add?

        userstore.find({
            id: target
          }).assign({
              prayers: targetprayers - cursenum,
            })
            .write();
    
        userstore.find({
            id: curser
          }).assign({
              prayers: curserprayers - cursenum + 1,
            })
            .write();

        msg.channel.send(msg.mentions.users.first().username + " lost " + cursenum + " prayers.");
        msg.channel.send(msg.author.username + " lost " + (cursenum - 1) + " prayers.");

        console.log("Curse: " + msg.author.username + " => " + msg.mentions.users.first().username + ".");

    } else {
      let remainingTime = Config.curseCooldown - (Date.now() - user.lastcursedate)
      
      if (remainingTime > 3600000) {
        msg.channel.send("The gods are watching. Wait " + (Math.floor(remainingTime / 1000 / 60 / 60)) + " hour and " + (Math.floor(remainingTime / 1000 / 60) - (Math.floor(remainingTime / 1000 / 60 / 60) * 60)) + " minutes to curse again.");
      } else {
        msg.channel.send("The gods are watching. Wait " +  Math.floor(remainingTime / 1000 / 60) + ":" + Math.floor(remainingTime / 1000 % 60) + " to curse again.");
      }
      console.log("Attempted Curse: " + msg.author.username + ".");
     
      }

}
module.exports = { Curse };