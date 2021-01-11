const { Config } = require("../config");
const { CheckifUserExists } = require("../../bot");

function GiftPrayers(userId, msg, dbHandler) {
  let userstore = dbHandler.getDB().get('users');
  //check first if user is a new user
  dbHandler.CheckifUserExists(userId, msg);

  let target = msg.mentions.users.first().id;

  let user = userstore.find({
    id: userId
  }).value();
  
  dbHandler.CheckifUserExists(target, msg);

  let targetuser = userstore.find({
    id: target
  }).value();

  let num = "-";

  if (Math.abs((Number(targetuser.ascension.split(" ").pop())) - (Number(user.ascension.split(" ").pop()))) > 1) {
    msg.reply("You can not gift to someone with an ascension level more than 1 apart.");
    msg.channel.send(`**${user.username}:** ${(Number(user.ascension.split(" ").pop()))} vs **${targetuser.username}:** ${(Number(targetuser.ascension.split(" ").pop()))}`)
    return;
  }

  if (!isNaN(Number(msg.content.split(" ").pop()))) {
    num = Number(msg.content.split(" ").pop());
  }

  if (msg.content.includes("all")) {
    num = user.prayers;
  }

  if (num == "-") {
    msg.reply("You need to gift an amount of prayers.");
    return;
  }

  if (num > user.prayers) {
    msg.reply("Sorry you don't have that many prayers.");
    return;
  }
  if (num < (user.prayers * -1)) {
    msg.reply("No.");
    return;
  }

  if (target === userId) {
    msg.reply("You can't gift yourself.");
    return;
  }

  let giftnum = Math.floor(num);

  if (num < 0) {
    msg.reply("You can't gift negative numbers");
    return;
  }


  userstore.find({
    id: target
  }).assign({
    prayers: targetuser.prayers + giftnum,
  })
    .write();

  if (target === Config.PrayBotID) {
    msg.channel.send("I recieved " + giftnum + " prayers.");
  } else {
    msg.channel.send(targetuser.username + " recieved " + giftnum + " prayers.");
  }

  userstore.find({
    id: userId
  }).assign({
    prayers: user.prayers - giftnum,
  })
    .write();

  console.log("Gift: " + msg.author.username + " => " + msg.mentions.users.first().username + ".");

}

module.exports = { GiftPrayers };