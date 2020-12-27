const { Config } = require("../config");
const { CheckifUserExists } = require("../../bot");

function Smite(userId, msg, dbHandler) { //building type in msg
    let userstore = dbHandler.getDB().get('users');
    //check first if user is a new user
    dbHandler.CheckifUserExists(userId, msg);

    let target = msg.mentions.users.first().id;
    let smiter = msg.author.id;

    let user = userstore.find({
        id: userId
    }).value();

    dbHandler.CheckifUserExists(target, msg);
    dbHandler.CheckifUserExists(smiter, msg);

    if (user.item != "Master Bolt") {
        msg.reply("You don't have the master bolt, so you can't smite.")
        return;
    }

    //if you do have master bolt,

    let smiteAmount;

    let smiterprayers = userstore.find({
        id: smiter
    }).value().prayers;

    let targetprayers = userstore.find({
        id: target
    }).value().prayers;

    if (user.ascension.includes("Item Upgrade")) {
        smiteAmount = Math.floor(targetprayers * ((0.1) + (0.05 * (Number(user.ascension.split(" ").pop())))));
    } else {
        smiteAmount = Math.floor(targetprayers / 10);
    }

    msg.reply("You smited " + msg.mentions.users.first().username + " and you got " + smiteAmount + " prayers. They lost " + smiteAmount + ".");
    
    console.log("Smite: " + msg.author.username + " => " + msg.mentions.users.first().username + ".");

    user.item = "No Item";

    userstore.find({
        id: smiter
    }).assign({
        prayers: smiterprayers + smiteAmount,
    })
        .write();

    userstore.find({
        id: target
    }).assign({
        prayers: targetprayers - smiteAmount,
    })
        .write();
}

module.exports = { Smite };