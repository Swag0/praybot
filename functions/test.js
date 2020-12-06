const { Config } = require("./config");
const { CheckifUserExists } = require("../bot");
const Discord = require("discord.js");
const client = new Discord.Client();

function Test(userId, msg, dbHandler) {

  let userstore = dbHandler.getDB().get('users');

  dbHandler.CheckifUserExists(userId, msg);

  let user = userstore.find({
    id: userId
  }).value();

  //console.log(user.username + " used test function.");

  if (user.id != 346758543489105941) {
    console.log(user.username + " tried to test.");
    msg.delete();
    return false;
  } else {
    msg.delete();
    console.log("Hello Cole.")
    return true;
  }

  



}

module.exports = { Test };