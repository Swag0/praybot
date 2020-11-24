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
  
  var churchjob = schedule.scheduleJob(rule, AddChurchIncome);
  var communityjob = schedule.scheduleJob(rule, AddCommunityIncome);
  var cityjob = schedule.scheduleJob(rule, AddCityIncome);
  var provincejob = schedule.scheduleJob(rule, AddProvinceIncome);
  var incomeJob = schedule.scheduleJob(rule, IncomeNotification);


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
    }
    else if (msg.content === "†time" || msg.content === "+time") {
      TimeUntilTick(msg);
    }
    else if (msg.content === "†repose" || msg.content === "†help" || msg.content === "+help" || msg.content === "+repose") {
      Help(msg);
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
      msg.reply("Upcoming updates are: Fully online bot, daily announcements, upgrades, and extra levels.");
     }
     else if (msg.content === "†bugs" || msg.content === "+bugs" ) {
      msg.reply("Now why would I tell you what the bugs are? ||You fool, you thought something was here.||");
      //gifting negative prayers doesn't give to me, username is not applied when starting game
      //other stuff.
     }
    }
});

//780209511339655199 is church area.

function IncomeNotification() {
  console.log("Income Added");
  //This may or may not work. client.channels.get(`780209511339655199`).send(`Income Added.`);
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
  const helpEmbed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Help Page')
      .setAuthor('Swag#7947', 'https://i.pinimg.com/originals/19/0f/d7/190fd7f6d541af4262516cb3d9a7bc3f.png')
      .addFields(
        { name: 'Pray', value: '†pray' },
        //
        { name: 'Build', value: 'All Functions' },
        { name: 'Church', value: '†church', inline: true },
        { name: 'Community', value: '†community', inline: true },
        { name: 'City', value: '†city', inline: true },
        { name: 'Province', value: '†province', inline: true },
        //
        { name: 'Actions', value: 'All Functions' },
        { name: 'Curse', value: '†curse @target', inline: true },
        { name: 'Steal', value: '†steal @target', inline: true },
        { name: 'Gift', value: '†gift @target', inline: true },
        //
        { name: 'Count or Count @target', value: 'All Functions' },
        { name: 'Prayers', value: '†praycount', inline: true },
        { name: 'Church', value: '†churchcount', inline: true },
        { name: 'Community', value: '†communitycount', inline: true },
        { name: 'City', value: '†citycount', inline: true },
        { name: 'Province', value: '†provincecount', inline: true },
        { name: 'All', value: '†checkall', inline: true },
        //
        { name: 'Time Until Prayday', value: '†time' },
        { name: 'Upcoming Updates', value: '†upcoming' },
        { name: 'Invite', value: '†invite' },
        { name: 'Help Command', value: '†repose' },
      )
      .setTimestamp()
      .setFooter('Prefix is † or +', 'https://i.pinimg.com/originals/19/0f/d7/190fd7f6d541af4262516cb3d9a7bc3f.png');
      msg.channel.send(helpEmbed);
}

client.login(process.env.SECRETBOI);