const { Config } = require("../config");
const { CheckifUserExists } = require("../../bot");

function GiftPrayers(userId, msg, dbHandler) {
    let userstore = dbHandler.getDB().get('users');
    //check first if user is a new user
    dbHandler.CheckifUserExists(userId);

    console.log(msg.author.username + " is being kind to " + msg.mentions.users.first().username + " for some reason.");

    let target = msg.mentions.users.first().id;
    let gifter = msg.author.id;
  
    dbHandler.CheckifUserExists(target);
    dbHandler.CheckifUserExists(gifter);
  
    let num = 0;
  
    if (!isNaN(Number(msg.content.split(" ").pop()))) {
        num = Number(msg.content.split(" ").pop());
    }
    

    let giftercurrentprayers = userstore.find({
        id: gifter
      }).value().prayers;

    if (num > giftercurrentprayers) {
        msg.reply("Sorry you don't have that many prayers.");
        return;
    }

    if (num < 0) {
        msg.reply("You fool. You absolute buffoon. I hereby diagnose you with idiocy. You think that I will be fooled by numbers below 0? I am not some kind of 1st grader. Well, the joke is on you sir. Checkmate.");
        msg.channel.send("I will take those prayers from you, you moronic swine.");
        num = Math.abs(num);
        dbHandler.CheckifUserExists(391015029379432448);
        target = 391015029379432448; //praybot
    }
  
  
    let giftnum = Math.floor(num);
  
    let targetcurrentprayers = userstore.find({
      id: target
    }).value().prayers;
    userstore.find({
      id: target
    }).assign({
        prayers: targetcurrentprayers + giftnum,
      })
      .write();

      if (target == 391015029379432448) {
        msg.channel.send("I recieved " + giftnum + " prayers.");
      } else {
        msg.channel.send(msg.mentions.users.first().username + " recieved " + giftnum + " prayers.");
      }
      
    userstore.find({
      id: gifter
    }).assign({
      prayers: giftercurrentprayers - giftnum,
    })
    .write();
  }

  module.exports = { GiftPrayers };