const { Config } = require("./config");

function TimeUntilTick(msg) {

    var nextHour = (3600000 - new Date().getTime() % 3600000);


    
    msg.channel.send("Next prayday is in " + (5 - (new Date().getHours() % 6)) + " hours and " + Math.floor(nextHour / 1000 / 60) + " minutes.");


}

module.exports = { TimeUntilTick };