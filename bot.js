"use strict";

const util = require("util");
const Discord = require("discord.js");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const conf = require('dotenv').config();
const client = new Discord.Client();

const adapter = new FileSync("db.json");
const db = low(adapter);

db.defaultsDeep({
  users: [{
    id: 0,
    username: "",
    prayers: 0,
    lastpraydate: 0,
    lastcursedate: 0,
    laststealdate: 0,
    churchnum: 0,
    communitynum: 0,
    citynum: 0,
    provincenum: 0,
    countrynum: 0,
    continentnum: 0,
    planetnum: 0,
    solarsystemnum: 0,
    galaxynum: 0,
    universenum: 0,
    dimensionnum: 0,
    multiversenum: 0,
    cryingbabynum: 0
  }]
}).write();

function GetRoleID(rolename, member) {
  let roles = member.guild.roles
  
  let role = roles.find("name", rolename).id;

  return role;
}

function AssignRole(member){
  
  console.log("Giving faithful supporters roles in their otherwise useless lives")
  let userstore = db.get('users')
  let usersprayers = userstore.find({ id: member.id}).value().prayers;
  if (usersprayers > 9) {
    member.addRole(GetRoleID("Prayer", member));
  }
  if (usersprayers > 49) {
    member.addRole(GetRoleID("Extremist", member));
  }
  if (usersprayers > 99) {
    member.addRole(GetRoleID("Priest", member));
  }
  if (usersprayers > 249) {
    member.addRole(GetRoleID("Prophet", member));
  }
  if (usersprayers > 499) {
    member.addRole(GetRoleID("God", member));
  }
}


client.on('ready', () => {
  console.log(`Watching 3 Servers`)
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("you", { type: "WATCHING" });

  setInterval(AddChurchIncome, 8640200);
  setInterval(AddCommunityIncome, 86400100);
  setInterval(AddCityIncome, 86400000);
  setInterval(AddProvinceIncome, 86499900);
  
});
//86400000 = 24 hrs.

client.on('error', err => {
  console.log(err.message);
  console.log("something maybe did sad")
});


client.on('message', msg => {
  if (!msg.author.bot) {
    if (msg.content === "how many prays do i have" || msg.content === "pray number" || msg.content === "!praynumber" || msg.content === "how many prays do I have?" || msg.content === "how many prays do I have" || msg.content === "praycount") {
      let userstore = db.get('users');
      msg.reply("You have " + userstore.find({ id: msg.author.id }).value().prayers + " prayers");
    }

    if (msg.content === "!pray" || msg.content === "pray" || msg.content === "Pray" || msg.content === "!Pray" || msg.content === "PRAY") {
      IncrementUserPrayers(msg);
    }
    else if (msg.content.startsWith("!curse") || msg.content.startsWith("swear") || msg.content.startsWith("curse")) {
      if (msg.mentions.users.first() && msg.mentions.users.first()) {
        CurseAtUser(msg);
      }
    }
    else if (msg.content.startsWith("steal") || msg.content.startsWith("!take")) {
      if (msg.mentions.users.first() && msg.mentions.users.first()) {
        StealPrayers(msg);
      }
    }
    else if (msg.content === "repose" || msg.content === "help") {
      Help(msg);
    }
    else if (msg.content === "buildchurch" || msg.content === "church" || msg.content === "build me a church" ){
      BuyChurch(msg);
    }
    else if (msg.content === "buildcommunity" || msg.content === "community" || msg.content === "build me a community" ){
      BuyCommunity(msg);
    }
    else if (msg.content === "buildcity" || msg.content === "city" || msg.content === "build me a city" ){
      BuyCity(msg);
    }
    else if (msg.content === "buildprovince" || msg.content === "province" || msg.content === "build me a province" ){
      BuyProvince(msg);
    }
    else if (msg.content === "churchnum" || msg.content === "churchcount" || msg.content === "how many churches do i have"){
      let userstore = db.get('users');
      msg.reply("You have " + userstore.find({ id: msg.author.id }).value().churchnum + " churches");
    }
    else if (msg.content === "communitynum" || msg.content === "communitycount" || msg.content === "how many communities do i have"){
      let userstore = db.get('users');
      msg.reply("You have " + userstore.find({ id: msg.author.id }).value().communitynum + " communities");
    }
    else if (msg.content === "citynum" || msg.content === "citycount" || msg.content === "how many cities do i have"){
      let userstore = db.get('users');
      msg.reply("You have " + userstore.find({ id: msg.author.id }).value().citynum + " cities");
    }
    else if (msg.content === "provincenum" || msg.content === "provincecount" || msg.content === "how many provinces do i have"){
      let userstore = db.get('users');
      msg.reply("You have " + userstore.find({ id: msg.author.id }).value().provincenum + " provinces");
    }
    else if (msg.content === "invite" || msg.content === "invite bot") {
      msg.reply("To add me to your server, please click this. https://discordapp.com/oauth2/authorize?client_id=391015029379432448&scope=bot")
    }
    else if (msg.content.startsWith("checkchurch") || msg.content.startsWith("checkchurches")) {
      if (msg.mentions.users.first() && msg.mentions.users.first()) {
        CheckChurches(msg);   
    }}
    else if (msg.content.startsWith("checkprayers") || msg.content.startsWith("checkpray")) {
      if (msg.mentions.users.first() && msg.mentions.users.first()) {
        CheckPrayers(msg);
    }}
    else if (msg.content.startsWith("checkcommunities") || msg.content.startsWith("checkcommunity")) {
      if (msg.mentions.users.first() && msg.mentions.users.first()) {
        CheckCommunity(msg);
    }}
    else if (msg.content.startsWith("checkcities") || msg.content.startsWith("checkcity")) {
      if (msg.mentions.users.first() && msg.mentions.users.first()) {
        CheckCity(msg);
    }}
    else if (msg.content.startsWith("checkprovinces") || msg.content.startsWith("checkprovince")) {
      if (msg.mentions.users.first() && msg.mentions.users.first()) {
        CheckProvince(msg);
    }}
    else if (msg.content.startsWith("checkall")) {
      if (msg.mentions.users.first() && msg.mentions.users.first()) {
        CheckPrayers(msg);
        CheckChurches(msg);
        CheckCommunity(msg);
        CheckCity(msg);
        CheckProvince(msg);
    }}
    else if (msg.content.startsWith("gift")) {
      if (msg.mentions.users.first() && msg.mentions.users.first()) {
        GiftPrayers(msg);
      }
    }
    else if (msg.content === "levels") {
     msg.reply("Different levels are prayers, church, community, city, province - Coming soon: country, continent, planet, solarsystem, galaxy, universe, dimension, multiverse, and then crying babies.")
    }
    }
});

function BuyChurch(msg) {
  let userstore = db.get('users');
  CheckifUserExists(msg.author.id);

  let usersprayers = userstore.find({id: msg.author.id}).value().prayers;
  let currentChurchNum = userstore.find({ id: msg.author.id}).value().churchnum;
  const ChurchPrice = 10;


  if (currentChurchNum === null || currentChurchNum === NaN || currentChurchNum === undefined) {
    currentChurchNum = 0;
  }

  if (usersprayers >= ChurchPrice) {
    userstore.find({id: msg.author.id})
    .assign({churchnum: currentChurchNum + 1})
      .write();

      userstore.find({id: msg.author.id }).assign({ prayers: usersprayers - ChurchPrice }).write();
    

      msg.reply("You bought a church for only 10 prayers. NOW STOP TALKING TO ME! I HAVE TO MAKE IT!")
      msg.reply("You now have " + (currentChurchNum + 1) + " churches. But is that enough?")
      console.log(msg.author.username + " has bought a church.")
  } else {
      msg.reply("Ouch, get your head in the game. Get 10 prayers or be a dissapointment.")
      msg.reply("You have " + (currentChurchNum) + " churches. Get more or lose in the game of praying.")
  }
}

function AddChurchIncome() {
  db.get('users').value().forEach((user)  => {
    let userChurches = user.churchnum;
    let usersprayers = user.prayers;

    user.prayers = usersprayers + userChurches;

    db.get('users').find({id: user.id }).assign({ prayers: user.prayers }).write();
  });
  console.log("Church Income");
  client.guilds.forEach((guild) => {
   let channel = guild.channels.find("name", "church");
    if (channel !== null && channel !== undefined){
      channel.send("Church Income Recieved");
    }
  });
}

function AddCommunityIncome() {
  db.get('users').value().forEach((user)  => {
    let userCommunities = user.communitynum;
    let userChurches = user.churches;

    user.prayers = usersprayers + userCommunities;

    db.get('users').find({id: user.id }).assign({ churchnum: user.churches }).write();
  });
  console.log("Community Income");
  client.guilds.forEach((guild) => {
   let channel = guild.channels.find("name", "church");
    if (channel !== null && channel !== undefined){
      channel.send("Community Income Recieved");
    }
  });
}

function CheckifUserExists(id) {
  let userstore = db.get('users');
  if (util.isNullOrUndefined(userstore.find({ id: id }).value())) {
    userstore.push({
      id: id,
      prayers: 1,
      lastpraydate: Date.now(),
      lastcursedate: Date.now(),
      laststealdate: Date.now()
    }).write();
    return;
  } else {
    return;
  }
}

function BuyCommunity(msg) {
  let userstore = db.get('users');
  CheckifUserExists(msg.author.id);

  let usersprayers = userstore.find({id: msg.author.id}).value().prayers;
  let currentCommunityNum = userstore.find({ id: msg.author.id}).value().communitynum;
  const CommunityPrice = 1000;


  if (currentCommunityNum === null || currentCommunityNum === NaN || currentCommunityNum === undefined) {
    currentCommunityNum = 0;
  }

  if (usersprayers >= CommunityPrice) {
    userstore.find({id: msg.author.id})
    .assign({communitynum: currentCommunityNum + 1})
      .write();

      userstore.find({id: msg.author.id }).assign({ prayers: usersprayers - CommunityPrice }).write();
    

      msg.reply("You bought a community for only 1,000 prayers. NOW STOP TALKING TO ME! I HAVE TO LAUGH AT HOW MANY PRAYERS YOU WASTED!")
      msg.reply("You now have " + (currentCommunityNum + 1) + " communities. But is that enough?")
      console.log(msg.author.username + " has bought a community.")
  } else {
      msg.reply("Ouch, get your head in the game. Get 1,000 prayers or be a dissapointment.")
      msg.reply("You have " + (currentCommunityNum) + " communities. Get more or lose in the game of praying.")
  }
}


function CheckPrayers(msg) {

  let checkedmemberpray = msg.mentions.users.first().id;

  console.log("Someone is checking someone out");
  CheckifUserExists(checkedmemberpray);
  let userstore = db.get('users');

  msg.channel.send(msg.mentions.users.first().username + " has " + userstore.find({ id: checkedmemberpray }).value().prayers + " prayers.") 

}

function CheckChurches (msg) {

  let checkedmemberchurch = msg.mentions.users.first().id;

  console.log("Someone is checking if the churches are legal.");
  CheckifUserExists(checkedmemberchurch);
  let userstore = db.get('users');

  msg.channel.send(msg.mentions.users.first().username + " has " + userstore.find({ id: checkedmemberchurch }).value().churchnum + " churches.") 

}

function CheckCommunity (msg) {

  let checkedmembercommunity = msg.mentions.users.first().id;

  console.log("Someone is checking if the communities are legal.");
  CheckifUserExists(checkedmembercommunity);
  let userstore = db.get('users');

  msg.channel.send(msg.mentions.users.first().username + " has " + userstore.find({ id: checkedmembercommunity }).value().communitynum + " communities.") 

}

function CurseAtUser(msg) {

  let target = msg.mentions.users.first().id;
  let curser = msg.author.id;

  console.log(msg.author.username + " is sabotaging " + msg.mentions.users.first().username);

  CheckifUserExists(target);
  CheckifUserExists(curser);
  let userstore = db.get('users');
  if (Date.now() - userstore.find({ id: msg.author.id }).value().lastcursedate > 7200000) {
  msg.reply("The gods do not intervene with your petty fights. You shall be punished, but you can complete your petty battle.");

    let prayerlosst = Math.floor(Math.random() * 3) + 1; 
    let prayerlossc = Math.floor(Math.random() * 3);
  

  let targetcurrentprayers = userstore.find({
    id: target
  }).value().prayers;
  userstore.find({
    id: target
  }).assign({
      prayers: targetcurrentprayers - prayerlosst,
    })
    .write();
    msg.channel.send(msg.mentions.users.first().username + " lost " + prayerlosst + " prayers.");

  let cursercurrentprayers = userstore.find({
    id: curser
  }).value().prayers;
  userstore.find({
    id: curser
  }).assign({
    prayers: cursercurrentprayers - prayerlossc,
    lastcursedate: Date.now()
  })
  .write();
  msg.reply("You lost " + prayerlossc + " prayers.")

  msg.channel.send("You have " + userstore.find({ id: msg.author.id }).value().prayers + " prayers");

  AssignRole(msg.member);
} else {
  msg.channel.send("You have annoyed us far too much. Continue your petty arguement later.")
}}

function GiftPrayers(msg) {

  console.log(msg.author.username + " is being kind to " + msg.mentions.users.first().username + " for some reason.");

  let userstore = db.get('users');

  let target = msg.mentions.users.first().id;
  let gifter = msg.author.id;

  CheckifUserExists(target);
  CheckifUserExists(gifter);


  let num = 0;

  if (!isNaN(Number(msg.content.split(" ").pop()))) {
num = Number(msg.content.split(" ").pop());
  }


  let giftnum = num;

  let targetcurrentprayers = userstore.find({
    id: target
  }).value().prayers;
  userstore.find({
    id: target
  }).assign({
      prayers: targetcurrentprayers + giftnum,
    })
    .write();
 
    msg.channel.send(msg.mentions.users.first().username + " recieved " + giftnum + " prayers.");
    
  let giftercurrentprayers = userstore.find({
    id: gifter
  }).value().prayers;
  userstore.find({
    id: gifter
  }).assign({
    prayers: giftercurrentprayers - giftnum,
  })
  .write();
}

function StealPrayers(msg) {

  console.log(msg.author.username + " is pickpocketing " + msg.mentions.users.first().username + " at the church.");

  let target = msg.mentions.users.first().id;
  let robber = msg.author.id;

  CheckifUserExists(target);
  CheckifUserExists(robber);
  let userstore = db.get('users');
  if (Date.now() - userstore.find({ id: msg.author.id }).value().laststealdate > 21600000) {
  msg.reply("You have slipped under the gods watch for now. Be wary of stealing in the next few hours.");

  let num = Math.floor(Math.random()*3) + 1; // *3 means highest is 3 
  num *= Math.floor(Math.random()*4) == 1 ? -1 : 1; // this makes 75/25 positive


  let prayersteal = num

  let positivesteal = Math.abs(num)

  let targetcurrentprayers = userstore.find({
    id: target
  }).value().prayers;
  userstore.find({
    id: target
  }).assign({
      prayers: targetcurrentprayers - prayersteal,
    })
    .write();
    if  (prayersteal > 0){
    msg.channel.send(msg.mentions.users.first().username + " lost " + prayersteal + " prayers.");
    } else {
      msg.channel.send(msg.mentions.users.first().username + " gained " + positivesteal + " prayers")
    }
  let robbercurrentprayers = userstore.find({
    id: robber
  }).value().prayers;
  userstore.find({
    id: robber
  }).assign({
    prayers: robbercurrentprayers + prayersteal,
    laststealdate: Date.now()
  })
  .write();
  if (prayersteal > 0) {
     msg.reply("You gained " + prayersteal + " prayers.")
     AssignRole(msg.member);
     AssignRole(msg.mentions.members.first());
  } else {
     msg.reply("You didn't honor the kindness of the gods. You lost " + positivesteal + " prayers")
  }
 

  msg.channel.send("You have " + userstore.find({ id: msg.author.id }).value().prayers + " prayers");
} else {
  msg.channel.send("The gods have been watching you. Prepare for a tough ordeal.")
}}



function BuyCity(msg) {
  let userstore = db.get('users');
  CheckifUserExists(msg.author.id);

  let usersprayers = userstore.find({id: msg.author.id}).value().prayers;
  let currentCityNum = userstore.find({ id: msg.author.id}).value().citynum;
  const CityPrice = 10000;


  if (currentCityNum === null || currentCityNum === NaN || currentCityNum === undefined) {
    currentCityNum = 0;
  }

  if (usersprayers >= CityPrice) {
    userstore.find({id: msg.author.id})
    .assign({citynum: currentCityNum + 1})
      .write();

      userstore.find({id: msg.author.id }).assign({ prayers: usersprayers - CityPrice }).write();
    

      msg.reply("You bought a city for only 10,000 prayers. NOW STOP TALKING TO ME! I HAVE TO LAUGH AT HOW MANY PRAYERS YOU WASTED!")
      msg.reply("You now have " + (currentCityNum + 1) + " city. But is that enough?")
      console.log(msg.author.username + " has bought a city.")
  } else {
      msg.reply("Ouch, get your head in the game. Get 10,000 prayers or be a dissapointment.")
      msg.reply("You have " + (currenCityNum) + " city. Get more or lose in the game of praying.")
  }
}

function CheckCity(msg) {

  let checkedmembercity = msg.mentions.users.first().id;
  let currentCityNum = userstore.find({ id: checkedmembercity}).value().citynum;

  if (currentCityNum !== null && currenCityNum !== undefined){
    currentCityNum = 0;
  }

  console.log("Someone is running for municipality thing");
  CheckifUserExists(checkedmembercity);
  let userstore = db.get('users');

  msg.channel.send(msg.mentions.users.first().username + " has " + userstore.find({ id: checkedmembercity }).value().city + " cities.") 

}

function AddCityIncome() {
  db.get('users').value().forEach((user)  => {
    let userCity = user.citynum;
    let userCommunities = user.communities;

    user.prayers = usersprayers + userCity;

    db.get('users').find({id: user.id }).assign({ communitynum: user.communities }).write();
  });
  console.log("City Income");
  client.guilds.forEach((guild) => {
   let channel = guild.channels.find("name", "church");

  });
}


function BuyProvince(msg) {
  let userstore = db.get('users');
  CheckifUserExists(msg.author.id);

  let usersprayers = userstore.find({id: msg.author.id}).value().prayers;
  let currentProvinceNum = userstore.find({ id: msg.author.id}).value().provincenum;
  const ProvincePrice = 100000;


  if (currentProvinceNum === null || currentProvinceNum === NaN || currentProvinceNum === undefined) {
    currentProvinceNum = 0;
  }

  if (usersprayers >= ProvincePrice) {
    userstore.find({id: msg.author.id})
    .assign({provincenum: currentProvinceNum + 1})
    .write();

      userstore.find({id: msg.author.id }).assign({ prayers: usersprayers - ProvincePrice }).write();
    

      msg.reply("You bought a province for only 100,000 prayers. NOW STOP TALKING TO ME! I HAVE TO LAUGH AT HOW MANY PRAYERS YOU WASTED!")
      msg.reply("You now have " + (currentProvinceNum + 1) + " provinces. But is that enough?")
      console.log(msg.author.username + " has bought a province.")
  } else {
      msg.reply("Ouch, get your head in the game. Get 100,000 prayers or be a dissapointment.")
      msg.reply("You have " + (currentProvinceNum) + " provinces. Get more or lose in the game of praying.")
  }
}

function CheckProvince(msg) {

  let checkedmemberprovince = msg.mentions.users.first().id;
  let currentProvinceNum = userstore.find({ id: checkedmemberprovince}).value().citynum;

  if (currentProvinceNum !== null && currentProvinceNum !== undefined){
    currentProvinceNum = 0;
  }

  console.log("Someone is trying to be premier of PRAYTOPIA");
  CheckifUserExists(checkedmemberprovince);
  let userstore = db.get('users');

  msg.channel.send(msg.mentions.users.first().username + " has " + userstore.find({ id: checkedmemberprovince }).value().province + " prayers.") 

}

function AddProvinceIncome() {
  db.get('users').value().forEach((user)  => {
    let userProvince = user.provincenum;
    let userCities = user.cities;

    user.prayers = usersprayers + userProvince;

    db.get('users').find({id: user.id }).assign({ citynum: user.cities }).write();
  });
  console.log("Province Income");
  client.guilds.forEach((guild) => {
   let channel = guild.channels.find("name", "church");
    if (channel !== null && channel !== undefined){
      channel.send("Province Income Recieved");
    }
  });
}



function IncrementUserPrayers(msg) {
  console.log("Incrementing user prayers");
  let userstore = db.get('users');
  //check first if user is a new user

  CheckifUserExists(msg.author.id);
  if (Date.now() - userstore.find({ id: msg.author.id }).value().lastpraydate > 3600000) {
    msg.reply("You have been acknowledged for praying to your gods. Without them, there would be no fweinds, and there would be no wee. Do not pray again for an hour for fear of angering the gods.");

    let currentprayers = userstore.find({
      id: msg.author.id
    }).value().prayers;
    userstore.find({
      id: msg.author.id
    })
      .assign({
        prayers: currentprayers + 1,
        lastpraydate: Date.now(),
        username: msg.author.username
      })
      .write();

  console.log(msg.author.username + " has " + userstore.find({ id: msg.author.id }).value().prayers + " prayers ");
    msg.reply("You have " + userstore.find({ id: msg.author.id }).value().prayers + " prayers");
    AssignRole(msg.member);
  } else {
    msg.channel.send("You are an insignificant being. Please pray later.");
  }

}



function Help(msg) {
  msg.channel.send(`\`\`\`
  Help:
  Type pray to pray
  Type swear @target to make the target lose 1-3 prayers and you lose 0-3.
  Type steal @target to steal 0-2 prayers from your target or to lose 0-2 prayers to the target
  Type praycount to check how many prayers you have.
  --------------------------------------Churches--------------------------------
  Type buildchurch to build a church for 10 prayers that will provide you with 1 prayer every 24 hours.
  Type churchcount to check how many churches you own.
  --------------------------------------Communities-----------------------------
  Type buildcommunity to build a community for 1,000 prayers that will provide you with 1 church every 24 hours.
  Type communitycount to check how many communities you own.
  ----------------------------------------Cities----------------------------------
  Type buildcity to build a city for 10,000 prayers that will provide you with 1 community every 24 hours.
  Type citycount to check how many cities you own.
  --------------------------------------Provinces--------------------------------
  Type buildprovince to build a province for 100,000 prayers that will provide you with 1 city every 24 hours.
  Type provincecount to check how many provinces you own.
  \`\`\``)

  msg.channel.send(`\`\`\`
  --------------------------------------Checking-Other's-Prayers----------------
  Type checkchurch @target to check how many churches the target has.
  Type checkpray @target to check how many prayers the target has.
  Type checkcommunities @target to check how many communities the target has
  Type checkcities @target to check how many cities the target has
  Type checkprovinces @target to check how many provinces the target has
  Type checkall @target to check how many prayers, churches, communities, cities, and provinces the target is enslaving.
  --------------------------------------Rewards--------------------------------
  10 prayers for @Prayer role. 50 prayers for @Exstremist role. 100 prayers for @Priest role. 250 prayers for @Prophet role. 500 prayers for @God role.
  ---------------------------------------Gift----------------------------------
  Type "gift @target *num*" to give *num* prayers to @target
  --------------------------------------Others---------------------------------
  Type repose for this help page.
  Type invite to invite Praybot to your server.
  Type levels to check levels currently and soon to be in the game.
  Coming Soon: More levels like: countries, continents, planets, solar systems, galaxies, universes, dimensions, multiverses, and CRYING BABIES! **THE ULTIMATE POWER**
  My amazing creator is Swag#7947. Please DM him if you have any questions or concerns.
  \`\`\``)
}


client.login(process.env.SECRETBOI);