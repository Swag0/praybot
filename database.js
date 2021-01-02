const FileSync = require("lowdb/adapters/FileSync");
const low = require("lowdb");
const adapter = new FileSync("db.json");
const util = require("util");
const db = low(adapter);



class DatabaseHandler {

    constructor() {
        db.defaultsDeep({
            users: [{
                id: 0,
                username: "",
                prayers: 0,
                lastpraydate: 0,
                lastcursedate: 0,
                laststealdate: 0,
                lastgambledate: 0,
                lastcrusadedate: 0,
                churchnum: 0,
                communitynum: 0,
                citynum: 0,
                provincenum: 0,
                countrynum: 0,
                item: "No Item",
                ascension: "0"
                //continentnum: 0,
                //planetnum: 0,
                //solarsystemnum: 0,
                //galaxynum: 0,
                //universenum: 0,
                //dimensionnum: 0,
                //multiversenum: 0,
                //cryingbabynum: 0
            }]
        }).write();
    }


    CheckifUserExists(id, msg = "") {
        let userstore = db.get('users');

        if (util.isNullOrUndefined(userstore.find({ id: id }).value())) {

            var usersname;

            if (msg) {
                if (msg.mentions.users.size === 0) {
                    msg.channel.send("*Logging* " + "<@" + id + "> *into Praybot databases.*")
                    usersname = msg.author.username;
                } else {
                    msg.channel.send("*Logging* " + "<@" + id + "> *into Praybot databases.*")
                    usersname = msg.mentions.users.first().username;

                    if (msg.mentions.users.first().bot) {
                       usersname = msg.mentions.users.first().username + ": Bot";
                    }
                }
            }

            console.log("New User: " + usersname + " added.");

            userstore.push({
                id: id,
                username: usersname,
                prayers: 0,
                churchnum: 0,
                communitynum: 0,
                citynum: 0,
                provincenum: 0,
                countrynum: 0,
                lastpraydate: Date.now() - 900001,
                lastcursedate: Date.now(),
                laststealdate: Date.now(),
                lastgambledate: Date.now(),
                lastcrusadedate: Date.now(),
                item: "No Item",
                ascension: "0"
            }).write();
            return;
        } else {
            return;
        }
    }

    getDB() {
        return db;
    }



}

module.exports = DatabaseHandler;