const { Config } = require("../../config");
const { CheckifUserExists } = require("../../../bot");

function Sacrifice(userId, msg, dbHandler) { //building type in msg
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

    if (msg.content.includes("church")) building = "church";
    else if (msg.content.includes("communit")) building = "community";
    else if (msg.content.includes("cit")) building = "city";
    else if (msg.content.includes("province")) building = "province";
    else if (msg.content.includes("countr")) building = "country";


    
    if (building == "church") {
        if (user.churchnum >= num) {

            user.churchnum -= num;
            user.prayers += (Config.churchPrice / 5);
            
            if (num == 1) msg.reply("You sacrificed 1 church and now have " + user.churchnum + " churches.");
            else msg.reply("You sacrificed " + num + " churches and now have " + user.churchnum + " churches.");
              
            console.log(user.username + " sacrificed => " + num + " " + building + ".")
          } else {
            msg.reply("You can't sacrifice more churches than you have.")
            msg.reply("You currently have " + (user.churchnum) + " churches. ");
          }
    }  

    if (building == "community") {
        if (user.communitynum >= num) {

            user.communitynum -= num;
            user.prayers += (Config.communityPrice / 5);
            
            if (num == 1) msg.reply("You sacrificed 1 community and now have " + user.communitynum + " communities.");
            else msg.reply("You sacrificed " + num + " communities and now have " + user.communitynum + " communities.");
              
            console.log(user.username + " sacrificed => " + num + " " + building + ".")
          } else {
            msg.reply("You can't sacrifice more communities than you have.")
            msg.reply("You currently have " + (user.communitynum) + " communities. ");
          }
    }  
    
    if (building == "city") {
        if (user.citynum >= num) {

            user.citynum -= num;
            user.prayers += (Config.cityPrice / 5);
            
            if (num == 1) msg.reply("You sacrificed 1 city and now have " + user.citynum + " cities.");
            else msg.reply("You sacrificed " + num + " cities and now have " + user.citynum + " cities.");
              
            console.log(user.username + " sacrificed => " + num + " " + building + ".")
          } else {
            msg.reply("You can't sacrifice more cities than you have.")
            msg.reply("You currently have " + (user.citynum) + " cities. ");
          }
    }   

    if (building == "province") {
        if (user.provincenum >= num) {

            user.provincenum -= num;
            user.prayers += (Config.provincePrice / 5);
            
            if (num == 1) msg.reply("You sacrificed 1 province and now have " + user.provincenum + " provinces.");
            else msg.reply("You sacrificed " + num + " provinces and now have " + user.provincenum + " provinces.");
              
            console.log(user.username + " sacrificed => " + num + " " + building + ".")
          } else {
            msg.reply("You can't sacrifice more provinces than you have.")
            msg.reply("You currently have " + (user.provincenum) + " provinces. ");
          }
    }  

    if (building == "country") {
        if (user.countrynum >= num) {

            user.countrynum -= num;
            user.prayers += (Config.countryPrice / 5);
            
            if (num == 1) msg.reply("You sacrificed 1 country and now have " + user.countrynum + " countries.");
            else msg.reply("You sacrificed " + num + " countries and now have " + user.churchnum + " countries.");
              
            console.log(user.username + " sacrificed => " + num + " " + building + ".")
          } else {
            msg.reply("You can't sacrifice more countries than you have.")
            msg.reply("You currently have " + (user.countrynum) + " countries. ");
          }
    }  

    userstore.find({
        id:userId
    }).assign(user).write();
    
  }
  module.exports = { Sacrifice };