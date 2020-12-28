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

    if (user.ascension.includes("Item Upgrade")) cooldown = Config.prayCooldown / 3;
    else cooldown = Config.prayCooldown / 2;
    
  }


  if (Date.now() - user.lastpraydate > cooldown) {

    let prayAmount = 1;

    if (user.ascension.includes("Pray Upgrade")) {
      prayAmount = Math.ceil(user.prayers/100);
      prayAmount *= (Number(user.ascension.split(" ").pop()));
    }

    if (user.item == "Holy Grail") {
      if (user.ascension.includes("Item Upgrade")) prayAmount *= (2 + (Number(user.ascension.split(" ").pop())));
      else prayAmount *= 2;
    }

    user.prayers += prayAmount;

    user.lastpraydate = Date.now();

    userstore.find({
      id: userId
    }).assign(user).write();

    user.prayers = Math.floor(user.prayers);

    console.log(user.username + " has " + user.prayers + " prayers.");

    if (prayAmount == 1) msg.reply("You gained " + prayAmount + " prayer, and now have " + user.prayers + " prayers");
    else msg.reply("You gained " + prayAmount + " prayers, and now have " + user.prayers + " prayers");
    

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