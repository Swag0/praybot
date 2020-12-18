const { Config } = require("../config");
const { CheckifUserExists } = require("../../bot");

function GiftPrayers(userId, msg, dbHandler) {
  let userstore = dbHandler.getDB().get('users');
  //check first if user is a new user
  dbHandler.CheckifUserExists(userId, msg);

  let target = msg.mentions.users.first().id;
  let gifter = msg.author.id;

  dbHandler.CheckifUserExists(target, msg);
  dbHandler.CheckifUserExists(gifter, msg);

  let num = "-";

  if (!isNaN(Number(msg.content.split(" ").pop()))) {
    num = Number(msg.content.split(" ").pop());
  }


  let giftercurrentprayers = userstore.find({
    id: gifter
  }).value().prayers;

  if (msg.content.includes("all")) {
    num = giftercurrentprayers;
  }

  if (num == "-") {
    msg.reply("You need to gift an amount of prayers.");
    return;
  }

  if (num > giftercurrentprayers) {
    msg.reply("Sorry you don't have that many prayers.");
    return;
  }
  if (num < (giftercurrentprayers * -1)) {
    msg.reply("No.");
    return;
  }

  if (target === gifter) {
    msg.reply("You can't gift yourself.");
    return;
  }

  let giftnum = Math.floor(num);

  if (num < 0) {
    msg.reply("You can't gift negative numbers");
    return;
  }


  

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

  console.log("Gift: " + msg.author.username + " => " + msg.mentions.users.first().username + ".");

}

module.exports = { GiftPrayers };