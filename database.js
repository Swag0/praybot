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
                churchnum: 0,
                communitynum: 0,
                citynum: 0,
                provincenum: 0,
                //countrynum: 0,
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


    CheckifUserExists(id) {
        let userstore = db.get('users');
        if (util.isNullOrUndefined(userstore.find({ id: id }).value())) {
            userstore.push({
                id: id,
                prayers: 0,
                churchnum: 0,
                communitynum: 0,
                citynum: 0,
                provincenum: 0,
                lastpraydate: Date.now() - 900001,
                lastcursedate: Date.now(),
                laststealdate: Date.now(),
                lastgambledate: Date.now()
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