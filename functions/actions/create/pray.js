const { Config } = require("../../config");
const { CheckifUserExists } = require("../../../bot");


function IncrementPrays(userId, msg, dbHandler) {
  //console.log("Incrementing prayers for user id: " + userId);
  let userstore = dbHandler.getDB().get('users');
  //check first if user is a new user

  dbHandler.CheckifUserExists(userId, msg);

  let user = userstore.find({
    id: userId
  }).value();


  if (user.item == "Atheist") {
    msg.reply("You are an atheist, so you can't pray. Go gamble your life savings away.");
    return;
  }

  let cooldown = Config.prayCooldown;

  if (user.item == "Priest") {
    cooldown = Config.prayCooldown / 1.5;
  }


  if (Date.now() - user.lastpraydate > cooldown) {


    if (user.item == "Holy Grail") {
      user.prayers += 2;
      msg.reply("You also have the Holy Grail, so you got 2 prayers. ");
    } else {
      user.prayers++;
    }

    user.lastpraydate = Date.now();

    userstore.find({
      id: userId
    }).assign(user).write();

    user.prayers = Math.floor(user.prayers);

    console.log(user.username + " has " + user.prayers + " prayers.");
    msg.reply("You now have " + user.prayers + " prayers");

  } else {
    let remainingTime = cooldown - (Date.now() - user.lastpraydate)
    if (userId == 346758543489105941) {
      if (Math.floor(remainingTime / 1000 % 60) < 10) {
        msg.channel.send("You are a significant being. But still, please pray in " + Math.floor(remainingTime / 1000 / 60) + ":0" + Math.floor(remainingTime / 1000 % 60) + ".");
      } else {
        msg.channel.send("You are a significant being. But still, please pray in " + Math.floor(remainingTime / 1000 / 60) + ":" + Math.floor(remainingTime / 1000 % 60) + ".");
      }
    } else {
      if (Math.floor(remainingTime / 1000 % 60) < 10) {
        msg.channel.send("You are an insignificant being. Please pray in " + Math.floor(remainingTime / 1000 / 60) + ":0" + Math.floor(remainingTime / 1000 % 60) + ".");
      } else {
        msg.channel.send("You are an insignificant being. Please pray in " + Math.floor(remainingTime / 1000 / 60) + ":" + Math.floor(remainingTime / 1000 % 60) + ".");
      }
    }
  }
}
module.exports = { IncrementPrays };