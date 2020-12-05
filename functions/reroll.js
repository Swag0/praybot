const { Config } = require("./config");
const { CheckifUserExists } = require("../bot");

function Reroll(userId, msg, dbHandler) {

    let userstore = dbHandler.getDB().get('users');
    //check first if user is a new user
    dbHandler.CheckifUserExists(userId);

    let user = userstore.find({
        id: userId
    }).value();

    let cost = 5;

    if (user.item == "Bible") {
        cost += (user.churchnum * 2);
    } else {
        cost += (user.churchnum);
    }
    if (user.item == "Religious School") {
        cost += (user.communitynum * 22);
    } else {
        cost += (user.communitynum * 11);
    }
    if (user.item == "Sistine Chapel") {
        cost += (user.citynum * 220);
    } else {
        cost += user.citynum * 110;
    }
    if (user.item == "Bible Belt") {
        cost += (user.provincenum * 2200);
    } else {
        cost += (user.provincenum * 1100);
    }

    if (user.prayers >= cost) {
        console.log("Can afford reroll.")
    } else {
        msg.reply("You don't have enough to reroll. You need " + cost + " prayers.")
        return;
    }

    console.log(user.prayers + " v. " + cost);

    let itemArr =
        [
            "Holy Grail",
            "Blessed",
            "Godspeed",
            "Zeus' Chosen",
            "Atheist",
            "Priest",
            "Devil's Advocate",
            "Bible",
            "Religious School",
            "Sistine Chapel",
            "Bible Belt",
            "Menorah"
        ]

    let randomArr = Math.floor(Math.random() * itemArr.length);
    let givenItem = itemArr[randomArr];

    user.item = givenItem;

    userstore.find({
        id: msg.author.id
    }).assign({
        prayers: user.prayers -= cost,
    })
        .write();

    msg.reply("You rerolled and got " + user.item)


}

module.exports = { Reroll };