const { Config } = require("../../config");
const { CheckifUserExists } = require("../../../bot");

function Buy(userId, msg, dbHandler, building) { //building type in msg
    let userstore = dbHandler.getDB().get('users');
    dbHandler.CheckifUserExists(msg.author.id);

    let user = userstore.find({
        id: userId
    }).value();
    
    if (building == "church") {
        if (user.prayers >= Config.churchPrice) {

            user.churchnum++;
            user.prayers -= Config.churchPrice;
            
              msg.reply("You bought a church for 10 prayers and now have " + user.churchnum + " churches.");
          } else {
              msg.reply("You need 10 prayers to build a church.")
              msg.reply("You currently have " + (user.churchnum) + " churches. ")
          }
    }  

    if (building == "community") {
        if (user.prayers >= Config.communityPrice) {

            user.communitynum++;
            user.prayers -= Config.communityPrice;
            
              msg.reply("You bought a community for 100 prayers and now have " + user.communitynum + " communities.");
          } else {
              msg.reply("You need 100 prayers to build a community.")
              msg.reply("You currently have " + (user.communitynum) + " communities. ")
          }
    } 
    
    if (building == "city") {
        if (user.prayers >= Config.cityPrice) {

            user.citynum++;
            user.prayers -= Config.cityPrice;
            
              msg.reply("You bought a city for 1000 prayers and now have " + user.citynum + " cities.");
          } else {
              msg.reply("You need 1000 prayers to build a city.")
              msg.reply("You currently have " + (user.citynum) + " cities. ")
          }

    }

    if (building == "province") {
        if (user.prayers >= Config.provincePrice) {

            user.provincenum++;
            user.prayers -= Config.provincePrice;
            
              msg.reply("You bought a province for 10,000 prayers and now have " + user.provincenum + " provinces.");
          } else {
              msg.reply("You need 10,000 prayers to build a province.")
              msg.reply("You currently have " + (user.provincenum) + " provinces. ")
          }
    }

    userstore.find({
        id:userId
    }).assign(user).write();
  
    
  }
  module.exports = { Buy };