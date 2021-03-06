const { Config } = require("../config");
const { CheckifUserExists } = require("../../bot");

function StealPrayers(userId, msg, dbHandler) {

    let failureArr =
        [
            "tripped",
            "exploded",
            "had an anvil fall on their head",
            "imploded",
            "was smited by Zeus",
            "ceased to exist",
            "was nuked",
            "fell",
            "crossed the River Styx",
            "was squished",
            "was stabbed multiple times",
            "ate a poisonous potato",
            "was created and destroyed in the completely fake creation of the universe via the Big Bang which definitely did not happen as god controls all, just as he snapped them into being only to snap them away on a whim where they died"
        ] //stealer __ and lost x prayers.

    let randomArr = Math.floor(Math.random() * failureArr.length);
    let failureMsg = failureArr[randomArr];

    let userstore = dbHandler.getDB().get('users');
    //check first if user is a new user
    dbHandler.CheckifUserExists(userId, msg);

    let target = msg.mentions.users.first().id;
    let stealer = msg.author.id;

    let user = userstore.find({
        id: userId
    }).value();

    dbHandler.CheckifUserExists(target, msg);
    dbHandler.CheckifUserExists(stealer, msg);

    let targetId = userstore.find({
        id: target
    }).value();

    let Chosen = false;

    if (targetId.item == "Zeus' Chosen") {
        Chosen = true;
    }

    let stealnum = Math.floor(Math.random() * 3 + 1); //1-3

    if (user.item == "Menorah") {
        if (user.ascension.includes("Item Upgrade")) stealnum = Math.floor(Math.random() * 9 + 1); //1-9
        else stealnum = Math.floor(Math.random() * 7 + 1); //1-7
    }

    let stealerprayers = userstore.find({
        id: stealer
    }).value().prayers;

    let targetprayers = userstore.find({
        id: target
    }).value().prayers;


    if (target === stealer) {
        msg.reply("You can't steal from yourself.");
        return;
    }

    if (targetId.item == "Blessed" && targetId.ascension.includes("Item Upgrade")) {
        msg.channel.send(msg.mentions.users.first().username + " can not be stolen from as they have an Upgraded Blessing.")
        return;
    }

    if (stealerprayers < 3 && (user.item != "Menorah")) {
        msg.reply("You need 3 prayers in order to steal.");
        return;
    }
    if (stealerprayers < 7 && (user.item == "Menorah")) {
        msg.reply("You have the menorah, so you need 7 prayers in order to steal.");
        return;
    }
    if (stealerprayers < 9 && (user.item == "Menorah") && (user.ascension.includes("Item Upgrade"))) {
        msg.reply("You have the upgraded menorah, so you need 9 prayers in order to steal.");
        return;
    }

    if (targetprayers < 3) {
        msg.reply("Your target needs 3 prayers to steal from.");
        return;
    }

    if (targetprayers - stealnum < 0 && user.item == "Menorah") {
        stealnum = Math.floor(Math.random() * targetprayers + 1);
    }

    if (user.ascension.includes("Attack Upgrade")) { //2% of prayers
        if (stealerprayers > targetprayers) {
            if (stealnum < targetprayers / 100 * (2 * Math.ceil((Number(user.ascension.split(" ").pop()))))) {
                stealnum = Math.ceil(targetprayers / 100 * (2 * Math.ceil((Number(user.ascension.split(" ").pop())))));
            }
        } else {
            if (stealnum < stealerprayers / 100 * (2 * Math.ceil((Number(user.ascension.split(" ").pop()))))) {
                stealnum = Math.ceil(stealerprayers / 100 * (2 * Math.ceil((Number(user.ascension.split(" ").pop())))));
            }
        }
    }

    let actualStealNum = stealnum;

    /*if (target == Config.PrayBotID) {
        msg.reply("Don't even try.");
        return;
    }*/

    if (Date.now() - user.laststealdate > Config.stealCooldown) {

        user.laststealdate = Date.now();
        user.karma -= 5;

        if (Chosen && user.ascension.includes("Item Upgrade")) {
            stealnum *= Math.floor(Math.random() * 4) != 1 ? -1 : 1; //this makes 75/25 negative
        } else if (Chosen) {
            stealnum *= Math.floor(Math.random() * 2) == 1 ? -1 : 1; //this makes 50/50 positive
        } else {
            stealnum *= Math.floor(Math.random() * 4) == 1 ? -1 : 1; // this makes 75/25 positive
        }

        if (user.item == "Godspeed" && user.ascension.includes("Item Upgrade")) {
            actualStealNum = (stealnum * (2 + (Number(user.ascension.split(" ").pop()))));
            userstore.find({
                id: stealer
            }).assign({
                prayers: stealerprayers + (stealnum * (2 + (Number(user.ascension.split(" ").pop())))),
            })
                .write();
        }
        else if (user.item == "Godspeed") {
            actualStealNum = stealnum*2;
            userstore.find({
                id: stealer
            }).assign({
                prayers: stealerprayers + (stealnum * 2),
            })
                .write();
        } else {
            userstore.find({
                id: stealer
            }).assign({
                prayers: stealerprayers + stealnum,
            })
                .write();
        }

        userstore.find({
            id: target
        }).assign({
            prayers: targetprayers - stealnum,
        })
            .write();

        if (stealnum > 0) { //pos
            msg.channel.send(msg.mentions.users.first().username + " had " + stealnum + " prayers stolen from them.");
            msg.channel.send(msg.author.username + " gained " + actualStealNum + " prayers.");
        } else { //negative
            msg.channel.send(msg.author.username + " " + failureMsg + " and lost " + (actualStealNum) + " prayers.")
            msg.channel.send(msg.mentions.users.first().username + " found " + (stealnum * -1) + " prayers.");
        }

        console.log("Steal: " + msg.author.username + " => " + msg.mentions.users.first().username + ".");


    } else {
        let remainingTime = Config.stealCooldown - (Date.now() - user.laststealdate)
        msg.channel.send("The gods are watching. Wait " + Math.floor(remainingTime / 1000 / 60) + ":" + Math.floor(remainingTime / 1000 % 60) + " to steal again.");
        console.log("Attempted Steal: " + msg.author.username + ".");
    }

}
module.exports = { StealPrayers };