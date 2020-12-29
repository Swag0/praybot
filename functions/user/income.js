const { Config } = require("../config");
const { CheckifUserExists } = require("../../bot");

function TimeUntilTick(msg, dbHandler) {
    let userstore = dbHandler.getDB().get('users');
    //check first if user is a new user
    dbHandler.CheckifUserExists(msg.author.id, msg);
    
    let user = userstore.find({
        id: msg.author.id
    }).value();
    
    
    let income = 0;
    
    if (user.item == "Bible" || user.item == "Altar") {
        if (user.ascension.includes("Item Upgrade")) income += user.churchnum * (2 + (Number(user.ascension.split(" ").pop()))); 
        else income += user.churchnum * 2; 
    } else {
        income += (user.churchnum);
    }
    if (user.item == "Religious School" || user.item == "Altar") {
        if (user.ascension.includes("Item Upgrade")) income += user.communitynum * (22 + ((Number(user.ascension.split(" ").pop())) * 11)); 
        else income += user.communitynum * 22; 
    } else {
        income += (user.communitynum*11);
    }
    if (user.item == "Sistine Chapel" || user.item == "Altar") {
        if (user.ascension.includes("Item Upgrade")) income += user.citynum * (220 + ((Number(user.ascension.split(" ").pop())) * 110)); 
        else income += user.citynum * 220; 
    } else {
        income += user.citynum*110;
    }
    if (user.item == "Bible Belt" || user.item == "Altar") {
        if (user.ascension.includes("Item Upgrade")) income += user.provincenum * (2200 + ((Number(user.ascension.split(" ").pop())) * 1100)); 
        else income += user.provincenum * 2200; 
    } else {
        income += (user.provincenum*1100);
    }
    if (user.item == "The Vatican" || user.item == "Altar") {
        if (user.ascension.includes("Item Upgrade")) income += user.countrynum * (22000 + ((Number(user.ascension.split(" ").pop())) * 11000)); 
        else income += user.countrynum * 22000; 
    } else {
        income += (user.countrynum*11000);
    }

    if (user.ascension.includes("Income Upgrade")) income *= (Number(user.ascension.split(" ").pop()));

    var nextHour = (3600000 - new Date().getTime() % 3600000);
    
    if (!msg.content.includes("income")) {
        msg.channel.send("Next prayday is in " + (5 - (new Date().getHours() % 6)) + " hours and " + Math.floor(nextHour / 1000 / 60) + " minutes.");
    }
    if (!msg.content.includes("time")) {
        msg.reply("Your income will be " + income + " prayers.");
    }

}
module.exports = { TimeUntilTick };