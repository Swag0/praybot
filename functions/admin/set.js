const { Config } = require("../config");
const { CheckifUserExists } = require("../../bot");

function Set(userId, msg, dbHandler) {


    //All Admin Functions:
    /*
    Date: 
    Pray, Curse, Steal, Gamble

    Item:
    From Item List (Also free reroll)

    Amount:
    Prayers, Churches, Communities, Cities, Provinces, Countries
    */

    let userstore = dbHandler.getDB().get('users');
    //check first if user is a new user

    if (msg.mentions.users.first() == undefined) {
        msg.reply("You need a target.");
        return;
    }

    let num = "-";

    if (!isNaN(Number(msg.content.split(" ").pop()))) {
        num = Number(msg.content.split(" ").pop());
    }

    targetId = msg.mentions.users.first().id;

    dbHandler.CheckifUserExists(targetId, msg);

    let target = userstore.find({
        id: targetId
    }).value();

    if (msg.content.includes("date")) {
        if (num == "-") {
            msg.reply("Please specify a date.")
            return;
        }
        if (msg.content.includes("pray")) {
            target.lastpraydate = num;
            msg.channel.send("Changed " + target.username + " last pray date to " + target.lastpraydate + ".");
        } else if (msg.content.includes("curse")) {
            target.lastcursedate = num;
            msg.channel.send("Changed " + target.username + " last curse date to " + target.lastcursedate + ".");
        } else if (msg.content.includes("gamble")) {
            target.lastgambledate = num;
            msg.channel.send("Changed " + target.username + " last gamble date to " + target.lastgambledate + ".");
        } else if (msg.content.includes("steal")) {
            target.laststealdate = num;
            msg.channel.send("Changed " + target.username + " last steal date to " + target.laststealdate + ".");
        } else if (msg.content.includes("crusade")) {
            target.lastcrusadedate = num;
            msg.channel.send("Changed " + target.username + " last steal date to " + target.lastcrusadedate + ".");
        } else {
            msg.reply("No specified changed time.");
        }
    }

    if (msg.content.includes("item")) {

        for (i = 0; i < Config.itemArr.length; i++) {
            if (msg.content.includes(Config.itemArr[i])) {
                target.item = Config.itemArr[i];
                msg.channel.send("Changed " + target.username + " item to " + Config.itemArr[i] + ".");
            }
        }

        if (msg.content.includes("random")) {
            let randomArr = Math.floor(Math.random() * Config.itemArr.length);
            let givenItem = Config.itemArr[randomArr];
            target.item = givenItem;

            msg.channel.send("Changed " + target.username + " item to... " + givenItem + ".");
        }
    }

    if (msg.content.includes("amount")) {
        if (num == "-") {
            msg.reply("Please specify an amount.")
            return;
        }
        if (msg.content.includes("prayer")) {
            target.prayers = num;
            msg.channel.send("Changed " + target.username + " prayers to " + target.prayers + ".");
        } else if (msg.content.includes("church")) {
            target.churchnum = num;
            msg.channel.send("Changed " + target.username + " churches to " + target.churchnum + ".");
        } else if (msg.content.includes("community")) {
            target.communitynum = num;
            msg.channel.send("Changed " + target.username + " communities to " + target.communitynum + ".");
        } else if (msg.content.includes("city")) {
            target.citynum = num;
            msg.channel.send("Changed " + target.username + " cities to " + target.citynum + ".");
        } else if (msg.content.includes("province")) {
            target.provincenum = num;
            msg.channel.send("Changed " + target.username + " provinces to " + target.provincenum + ".");
        } else if (msg.content.includes("country")) {
            target.countrynum = num;
            msg.channel.send("Changed " + target.username + " countries to " + target.countrynum + ".");
        } else {
            msg.reply("No specified changed amount.");
        }
    }

    if (msg.content.includes("ascension")) {
        if (msg.content.toLowerCase().includes("no")) {
            target.ascension = "0";
            msg.channel.send("Changed " + target.username + " ascension to 0.");
            return;
        }
        if (num == "-") {
            msg.reply("Please specify an ascension level.")
            return;
        }
        for (i = 0; i < Config.ascensionArr.length; i++) {
            if (msg.content.includes(Config.ascensionArr[i])) {
                target.ascension = Config.ascensionArr[i].concat(": ").concat(num);
                msg.channel.send("Changed " + target.username + " ascension to " + Config.ascensionArr[i] + ": " + num + ".");
            }
        } 
    }

    userstore.find({
        id: targetId
    }).assign(target).write();


}
module.exports = { Set };