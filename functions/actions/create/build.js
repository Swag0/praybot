const { Config } = require("../../config");
const { CheckifUserExists } = require("../../../bot");

function Buy(userId, msg, dbHandler, building) { //building type in msg
    let userstore = dbHandler.getDB().get('users');
    dbHandler.CheckifUserExists(msg.author.id, msg);

    let user = userstore.find({
        id: userId
    }).value();

    let num = 1;
  
    if (!isNaN(Number(msg.content.split(" ").pop()))) {
        num = Number(msg.content.split(" ").pop());
    }

    if (Math.round(num) != num) {
        msg.reply("Please enter an integer.")
        return;
    }

    if (num < 1) {
        msg.reply("Please enter a positive integer.")
        return;
    } 


    
    if (building == "church") {
        if ((user.prayers / num) >= Config.churchPrice) {

            user.churchnum += num;
            user.prayers -= (Config.churchPrice * num);
            
            if (num == 1) msg.reply("You bought 1 church for " + (Config.churchPrice * num) + " prayers and now have " + user.churchnum + " churches.");
            else msg.reply("You bought " + num + " churches for " + (Config.churchPrice * num) + " prayers and now have " + user.churchnum + " churches.");
              
            console.log(user.username + " bought => " + num + " " + building + ".")
          } else {
            if (num == 1) msg.reply("You need " + (Config.churchPrice * num) + " to build " + num + " church.");
            else msg.reply("You need " + (Config.churchPrice * num) + " to build " + num + " church(es).");

            msg.reply("You currently have " + (user.churchnum) + " churches. ");
          }
    }  

    if (building == "community") {
        if ((user.prayers / num) >= Config.communityPrice) {

            user.communitynum += num;
            user.prayers -= (Config.communityPrice * num);
            
            if (num == 1) msg.reply("You bought 1 community for " + (Config.communityPrice * num) + " prayers and now have " + user.communitynum + " communities.");
            else msg.reply("You bought " + num + " communities for " + (Config.communityPrice * num) + " prayers and now have " + user.communitynum + " communities.");

            console.log(user.username + " bought => " + num + " " + building + ".")
          } else {
              if (num == 1 )msg.reply("You need " + (Config.communityPrice * num) + " to build " + num + " community.");
              else msg.reply("You need " + (Config.communityPrice * num) + " to build " + num + " communities.");
              msg.reply("You currently have " + (user.communitynum) + " communities. ")
          }
    } 
    
    if (building == "city") {
        if ((user.prayers / num) >= Config.cityPrice) {

            user.citynum += num;
            user.prayers -= (Config.cityPrice * num);
            
            if (num == 1) msg.reply("You bought 1 city for " + (Config.cityPrice * num) + " prayers and now have " + user.citynum + " cities.");
            else msg.reply("You bought " + num + " cities for " + (Config.cityPrice * num) + " prayers and now have " + user.citynum + " cities.");
              
            console.log(user.username + " bought => " + num + " " + building + ".")
          } else {
              if (num == 1) msg.reply("You need " + (Config.cityPrice * num) + " to build " + num + " city.");
              else msg.reply("You need " + (Config.cityPrice * num) + " to build " + num + " cities.");
              msg.reply("You currently have " + (user.citynum) + " cities. ")
          }
    } 

    if (building == "province") {
        if ((user.prayers / num) >= Config.provincePrice) {

            user.provincenum += num;
            user.prayers -= (Config.provincePrice * num);
            
            if (num == 1) msg.reply("You bought 1 province for " + (Config.provincePrice * num) + " prayers and now have " + user.provincenum + " provinces.");
            else msg.reply("You bought " + num + " provinces for " + (Config.provincePrice * num) + " prayers and now have " + user.provincenum + " provinces.");

            console.log(user.username + " bought => " + num + " " + building + ".")
          } else {
              if (num == 1) msg.reply("You need " + (Config.provincePrice * num) + " to build " + num + " province.");
              else msg.reply("You need " + (Config.provincePrice * num) + " to build " + num + " provinces.");
              msg.reply("You currently have " + (user.provincenum) + " provinces. ")
          }
    } 

    if (building == "country") {
        if ((user.prayers / num) >= Config.countryPrice) {

            user.countrynum += num;
            user.prayers -= (Config.countryPrice * num);
            
            if (num == 1) msg.reply("You bought 1 country for " + (Config.countryPrice * num) + " prayers and now have " + user.countrynum + " countries.");
            else msg.reply("You bought " + num + " countries for " + (Config.countryPrice * num) + " prayers and now have " + user.countrynum + " countries.");

            console.log(user.username + " bought => " + num + " " + building + ".")
          } else {
              if (num == 1) msg.reply("You need " + (Config.countryPrice * num) + " to build " + num + " country.");
              else msg.reply("You need " + (Config.countryPrice * num) + " to build " + num + " countries.");
              msg.reply("You currently have " + (user.countrynum) + " countries. ")
          }
    } 

    userstore.find({
        id:userId
    }).assign(user).write();
    
  }
  module.exports = { Buy };