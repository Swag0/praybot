"use strict";

const schedule = require("node-schedule");
const util = require("util");
const Discord = require("discord.js");
const { IncrementPrays } = require ("./functions/actions/create/pray");
const { Buy } = require ("./functions/actions/create/build");
const { TimeUntilTick } = require ("./functions/misc");
const { Config } = require ('./functions/config');
const { Misc } = require ('./functions/misc');
const { Count } = require ('./functions/count/count')
const { GiftPrayers } = require ('./functions/actions/gift')
const { StealPrayers } = require ('./functions/actions/steal')
const { Curse } = require ('./functions/actions/curse')
const conf = require('dotenv').config();
const client = new Discord.Client();
const DatabaseHandler = require ("./database");

const dbHandler = new DatabaseHandler();

function AssignRole(member){
  
  console.log("Giving faithful supporters roles in their otherwise useless lives")
  let userstore = db.get('users')
  let usersprayers = userstore.find({ id: member.id}).value().prayers;
  /*if (usersprayers > 9) {
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
  }*/
}


client.on('ready', () => {
  var rule = new schedule.RecurrenceRule();
  rule.hour = [0, 6, 12, 18];
  rule.minute = 0;



  console.log(`Watching 3 Servers`)
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("you", { type: "WATCHING" });
  
  var incomeJob = schedule.scheduleJob(rule, IncomeNotification);
  var churchjob = schedule.scheduleJob(rule, AddChurchIncome);
  var communityjob = schedule.scheduleJob(rule, AddCommunityIncome);
  var cityjob = schedule.scheduleJob(rule, AddCityIncome);
  var provincejob = schedule.scheduleJob(rule, AddProvinceIncome);
});
//86400000 = 24 hrs.

client.on('error', err => {
  console.log(err.message);
  console.log("something maybe did sad")
});


client.on('message', msg => {
  if (!msg.author.bot) {
    if (msg.content.startsWith("†praycount") || msg.content.startsWith("†Praycount") || msg.content.startsWith("+praycount") || msg.content.startsWith("+Praycount")) {
      Count(msg.author.id, msg, dbHandler);
    }
    if (msg.content === "†pray" || msg.content === "+pray") {
      IncrementPrays(msg.author.id, msg, dbHandler);
    }
    else if (msg.content.startsWith("†curse") || msg.content.startsWith("+curse")) {
      if (msg.mentions.users.first()) {
        Curse(msg.author.id, msg, dbHandler);
      }
    }
    else if (msg.content.startsWith("†steal") || msg.content.startsWith("+steal")) {
      if (msg.mentions.users.first()) {
        StealPrayers(msg.author.id, msg, dbHandler);
      }
      //console.log("remember? stealing doesn't work...");
    }
    else if (msg.content === "†time" || msg.content === "+time") {
      TimeUntilTick(msg);
    }
    else if (msg.content === "†repose" || msg.content === "†help" || msg.content === "+help" || msg.content === "+repose") {
      msg.channel.send("Help is for the weak. ");
      //Help(msg);
    }
    else if (msg.content === "†buildchurch" || msg.content === "†church" || msg.content === "+buildchurch" || msg.content === "+church"){
      Buy(msg.author.id, msg, dbHandler, "church");
    }
    else if (msg.content === "†buildcommunity" || msg.content === "†community" || msg.content === "+buildcommunity" || msg.content === "+community"){
      Buy(msg.author.id, msg, dbHandler, "community");
    }
    else if (msg.content === "†buildcity" || msg.content === "†city" || msg.content === "+buildcity" || msg.content === "+city"){
      Buy(msg.author.id, msg, dbHandler, "city");
    }
    else if (msg.content === "†buildprovince" || msg.content === "†province" || msg.content === "+buildprovince" || msg.content === "+province" ){
      Buy(msg.author.id, msg, dbHandler, "province");
    }
    else if (msg.content.startsWith("†churchcount") || msg.content.startsWith("†Churchcount") || msg.content.startsWith("+churchcount") || msg.content.startsWith("+Churchcount")) {
      Count(msg.author.id, msg, dbHandler);
    }
    else if (msg.content.startsWith("†communitycount") || msg.content.startsWith("†Communitycount") || msg.content.startsWith("+communitycount") || msg.content.startsWith("+Communitycount")) {
      Count(msg.author.id, msg, dbHandler);
    }
    else if (msg.content.startsWith("†citycount") || msg.content.startsWith("†Citycount") || msg.content.startsWith("+citycount") || msg.content.startsWith("+Citycount")) {
      Count(msg.author.id, msg, dbHandler);
    }
    else if (msg.content.startsWith("†provincecount") || msg.content.startsWith("†Provincecount") || msg.content.startsWith("+provincecount") || msg.content.startsWith("+Provincecount")) {
      Count(msg.author.id, msg, dbHandler);
    }
    else if (msg.content === "†invite" || msg.content === "+invite") {
      msg.reply("To add me to your server, please click this. https://discordapp.com/oauth2/authorize?client_id=391015029379432448&scope=bot")
    }
    else if (msg.content.startsWith("†checkall") || msg.content.startsWith("+checkall") || msg.content.startsWith("+countall") || msg.content.startsWith("countall"))  {
      Count(msg.author.id, msg, dbHandler);
    }
    else if (msg.content.startsWith("†gift") || msg.content.startsWith("+gift")) {
      if (msg.mentions.users.first()) {
        GiftPrayers(msg.author.id, msg, dbHandler);
      }
    }
    else if (msg.content === "†BUBBLEWRAP") {
      msg.reply("Ok but why.");
      msg.channel.send("||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||");
    }
    else if (msg.content === "†levels") {
     msg.reply("Different levels are prayers, church, community, city, province - Coming soon: other stuff");
    }
    else if (msg.content === "†upcoming" || msg.content === "+upcoming" ) {
      msg.reply("Upcoming updates are: Cursing and Stealing, Fully online bot, upgrades, and extra levels.");
     }
     else if (msg.content === "†bugs" || msg.content === "+bugs" ) {
      msg.reply("Now why would I tell you what the bugs are? ||You fool, you thought something was here.||");
      //gifting negative prayers doesn't give to me, username is not applied when starting game
      //other stuff.
     }
    }
});

function IncomeNotification() {
  console.log("Income Added");
  /*
  client.guilds.forEach((guild) => {
   let channel = guild.channels.find("name", "church");
    if (channel !== null && channel !== undefined){
      channel.send("Income Recieved");
    }
  });*/
}

function AddChurchIncome() {
  dbHandler.getDB().get('users').value().forEach((user) => {
    user.prayers += user.churchnum * Config.churchPrice/10;

    dbHandler.getDB().get('users').find({id: user.id }).assign({ prayers: user.prayers }).write();
  });
}

function AddCommunityIncome() {
  dbHandler.getDB().get('users').value().forEach((user) => {

    user.prayers += user.communitynum * Config.communityPrice/10;

    dbHandler.getDB().get('users').find({id: user.id }).assign({ prayers: user.prayers }).write();
  });
}

function AddCityIncome() {
  dbHandler.getDB().get('users').value().forEach((user) => {

    user.prayers += user.citynum * Config.cityPrice/10;

    dbHandler.getDB().get('users').find({id: user.id }).assign({ prayers: user.prayers }).write();
  });
}

function AddProvinceIncome() {
  dbHandler.getDB().get('users').value().forEach((user) => {

    user.prayers += user.provincenum * Config.provincePrice/10;

    dbHandler.getDB().get('users').find({id: user.id }).assign({ prayers: user.prayers }).write();
  });
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
  Coming Soon: More levels.
  You don't get to know who created me.
  \`\`\``)
}

client.login(process.env.SECRETBOI);