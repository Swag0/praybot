const { CheckifUserExists } = require("../../../bot");

function Count(userId, msg, dbHandler) {
    let userstore = dbHandler.getDB().get('users');
    //check first if user is a new user

    dbHandler.CheckifUserExists(userId);

    let checkedmemberpray = msg.mentions.users.first().id;

    

    if (checkedmemberpray) {

        dbHandler.CheckifUserExists(checkedmemberpray);

        let targetuser = userstore.find({
            id: checkedmemberpray
        }).value();

        console.log("Someone is checking someone out");
        let userstore = db.get('users');
      
        msg.channel.send(msg.mentions.users.first().username + " has " + targetuser.prayers + " prayers.") 
    }

    let user = userstore.find({
        id: userId
    }).value();
    


    msg.reply("You have " + user.prayers + " prayers");  

    
    


    

    

}


module.exports = { Count };