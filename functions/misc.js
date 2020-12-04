const { Config } = require("./config");
const { CheckifUserExists } = require("../bot");

function TimeUntilTick(msg, dbHandler) {
    let userstore = dbHandler.getDB().get('users');
    //check first if user is a new user
    dbHandler.CheckifUserExists(msg.author.id);
    
    let user = userstore.find({
        id: msg.author.id
    }).value();
    
    
    let income = 0;
    
    if (user.item == "Bible") {
        income += (churchnum*2);
    }
    if (user.item == "Religious School") {
        income += (communitynum*2);
    }
    if (user.item == "Sistine Chapel") {
        income += (citynum*2);
    }
    if (user.item == "Bible Belt") {
        income += (provincenum*2);
    }

    var nextHour = (3600000 - new Date().getTime() % 3600000);
    
    if (!msg.content.includes("income")) {
        msg.channel.send("Next prayday is in " + (5 - (new Date().getHours() % 6)) + " hours and " + Math.floor(nextHour / 1000 / 60) + " minutes.");
    }
    if (!msg.content.includes("time")) {
        msg.reply("Your income will be " + income + " prayers.");
    }

}
module.exports = { TimeUntilTick };