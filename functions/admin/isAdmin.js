const { Config } = require("../config");
const { CheckifUserExists } = require("../../bot");
const Discord = require("discord.js");
const client = new Discord.Client();

function IsAdmin(msg) {
  //console.log(user.username + " used test function.");

  if (msg.author.id != 346758543489105941) {
    return false;
  } else {
    console.log("Hello Cole.")
    return true;
  }

}

module.exports = { IsAdmin };