"use strict";

const schedule = require("node-schedule");
const util = require("util");
const Discord = require("discord.js");
const { IncrementPrays } = require("./functions/actions/create/pray");
const { Buy } = require("./functions/actions/create/build");
const { TimeUntilTick } = require("./functions/misc");
const { Cooldown } = require("./functions/cooldown");
const { Item } = require("./functions/item");
const { Profile } = require("./functions/profile");
const { HelpPage } = require("./functions/help");
const { Config } = require('./functions/config');
const { Misc } = require('./functions/misc');
const { Count } = require('./functions/count/count')
const { Gamble } = require('./functions/actions/gamble')
const { GiftPrayers } = require('./functions/actions/gift')
const { StealPrayers } = require('./functions/actions/steal')
const { Curse } = require('./functions/actions/curse')
const { Test } = require('./functions/test')
const { Reroll } = require('./functions/reroll')
const conf = require('dotenv').config();
const client = new Discord.Client();
const DatabaseHandler = require("./database");

const dbHandler = new DatabaseHandler();

//FYI: Super important link https://discordjs.guide/popular-topics/embeds.html

function AssignRole(member) {

  console.log("Giving faithful supporters roles in their otherwise useless lives")
  let userstore = db.get('users')
  let usersprayers = userstore.find({ id: member.id }).value().prayers;
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


  var dailyrule = new schedule.RecurrenceRule();
  dailyrule.hour = 0;
  dailyrule.minute = 0;


  console.log(`Watching ${client.guilds.cache.size} Servers.`);
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("you", { type: "WATCHING" });

  var churchjob = schedule.scheduleJob(rule, AddChurchIncome);
  var communityjob = schedule.scheduleJob(rule, AddCommunityIncome);
  var cityjob = schedule.scheduleJob(rule, AddCityIncome);
  var provincejob = schedule.scheduleJob(rule, AddProvinceIncome);
  var incomeJob = schedule.scheduleJob(rule, IncomeNotification);

  var itemJob = schedule.scheduleJob(dailyrule, AssignItem);
  //var dailyJob = schedule.scheduleJob(dailyrule, Announcement);


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
    else if (msg.content === "†time" || msg.content === "+time" || msg.content === "+prayday" || msg.content === "†prayday" || msg.content === "+income" || msg.content === "†income") {
      TimeUntilTick(msg, dbHandler);
    }
    else if (msg.content === "†gamble" || msg.content === "+gamble") {
      Gamble(msg.author.id, msg, dbHandler);
    }
    else if (msg.content === "†repose" || msg.content === "†help" || msg.content === "+help" || msg.content === "+repose") {
      HelpPage(msg.author.id, msg, dbHandler);
    }
    else if (msg.content.startsWith("†church") || msg.content.startsWith("+church")) {
      Buy(msg.author.id, msg, dbHandler, "church");
    }
    else if (msg.content.startsWith("†community") || msg.content.startsWith("+community")) {
      Buy(msg.author.id, msg, dbHandler, "community");
    }
    else if (msg.content.startsWith("†city") || msg.content.startsWith("+city")) {
      Buy(msg.author.id, msg, dbHandler, "city");
    }
    else if (msg.content.startsWith("†province") || msg.content.startsWith("+province")) {
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
      msg.reply("To add me to your server, please click this. https://discordapp.com/oauth2/authorize?client_id=391015029379432448&scope=bot&permissions=74816")
    }
    else if (msg.content.startsWith("†checkall") || msg.content.startsWith("+checkall") || msg.content.startsWith("+countall") || msg.content.startsWith("countall")) {
      Count(msg.author.id, msg, dbHandler);
    }
    else if (msg.content.startsWith("†gift") || msg.content.startsWith("+gift")) {
      if (msg.mentions.users.first()) {
        GiftPrayers(msg.author.id, msg, dbHandler);
      }
    }
    else if (msg.content.startsWith("†cooldown") || msg.content.startsWith("+cooldown") || msg.content.startsWith("+cd") || msg.content.startsWith("†cd")) {
      Cooldown(msg.author.id, msg, dbHandler)
    }
    else if (msg.content.startsWith("†item") || msg.content.startsWith("+item")) {
      Item(msg.author.id, msg, dbHandler)
    }
    else if (msg.content.startsWith("†reroll") || msg.content.startsWith("+reroll")) {
      Reroll(msg.author.id, msg, dbHandler)
    }
    else if (msg.content === "†leaderboard" || msg.content === "+leaderboard") {
      Leaderboard(msg);
    }
    else if (msg.content === "†BUBBLEWRAP") {
      msg.reply("Ok but why.");
      msg.channel.send("||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||");
    }
    else if (msg.content === "†levels") {
      msg.reply("Different levels are prayers, church, community, city, province - Coming soon: other stuff");
    }
    else if (msg.content === "†upcoming" || msg.content === "+upcoming") {
      msg.channel.send("Upcoming updates are: Fully online bot, ambrosia, achievements, upgrades, and extra levels.");
    }
    else if (msg.content === "†bugs" || msg.content === "+bugs") {
      msg.reply("Now why would I tell you what the bugs are? ||You fool, you thought something was here.||");
      //username is not applied when starting game
      //other stuff.
    }
    else if (msg.content === "†announcements" || msg.content === "+announcements") {
      Announcement(msg);
    }
    else if (msg.content === "test") {
      if (Test(msg.author.id, msg, dbHandler)) {
        Cleaning();
        //msg.channel.send("*Manually pinging*" + " <@" + msg.author.id + ">")
        msg.channel.send("*Manually pinging* <@" + msg.author.id + ">")
        .then(function (message) {
          msg.channel.send("Their username is " + message.mentions.users.first().username + ".");
          console.log("<@767818830134247444>".id)
        });
        
      }
    }
    else if (msg.content === "ADDINCOMEE") {
      if (Test(msg.author.id, msg, dbHandler)) {
        AddChurchIncome();
        AddCommunityIncome();
        AddCityIncome();
        AddProvinceIncome();
        IncomeNotification();
      }
    }
    else if (msg.content.startsWith("†profile") || msg.content.startsWith("+profile") || msg.content.startsWith("+p") || msg.content.startsWith("†p")) {
      Profile(msg.author.id, msg, dbHandler)
    } //profile has to be last because it is p, and starts with p
  }
});

function Cleaning() {
  dbHandler.getDB().get('users').value().forEach((user) => {

    if (user.prayers == 0 && (user.laststealdate === user.lastgambledate)) {

      console.log(user.id + " is not active.");
    }
  });
}

function Leaderboard(msg) {

  let playerArr =
    [

    ]


  dbHandler.getDB().get('users').value().forEach((user) => {

    if (user.username) {

      playerArr.push(user.prayers + ": " + user.username);
    }
  });

  const sortAlphaNum = (a, b) => a.localeCompare(b, 'en', { numeric: true })
  playerArr = playerArr.sort(sortAlphaNum);
  playerArr = playerArr.reverse();

  const leaderEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Leaderboard')
    .addField("1. ", playerArr[0])
    .addField("2. ", playerArr[1])
    .addField("3. ", playerArr[2])
    .addField("4. ", playerArr[3])
    .addField("5. ", playerArr[4])
    .setTimestamp()
  msg.channel.send(leaderEmbed);
}

//780209511339655199 is church area.

function IncomeNotification() {
  console.log("Income Added at " + Date.now());
  //This may or may not work. 
  let churchChannel = client.channels.cache.get(`780209511339655199`);

  churchChannel.send("**Income Received**");
}

function AddChurchIncome() {
  dbHandler.getDB().get('users').value().forEach((user) => {

    if (user.item == "Bible") {
      user.prayers = user.churchnum * 2;
    } else {
      user.prayers += user.churchnum * 1;
    }

    dbHandler.getDB().get('users').find({ id: user.id }).assign({ prayers: user.prayers }).write();
  });
}

function AddCommunityIncome() {
  dbHandler.getDB().get('users').value().forEach((user) => {

    if (user.item == "Religious School") {
      user.prayers += (user.communitynum * 22)
    } else {
      user.prayers += (user.communitynum * 11);
    }

    dbHandler.getDB().get('users').find({ id: user.id }).assign({ prayers: user.prayers }).write();
  });
}

function AddCityIncome() {
  dbHandler.getDB().get('users').value().forEach((user) => {

    if (user.item == "Sistine Chapel") {
      user.prayers += user.citynum * 220;
    } else {
      user.prayers += user.citynum * 110;
    }

    dbHandler.getDB().get('users').find({ id: user.id }).assign({ prayers: user.prayers }).write();
  });
}

function AddProvinceIncome() {
  dbHandler.getDB().get('users').value().forEach((user) => {

    if (user.item == "Bible Belt") {
      user.prayers += user.provincenum * 2200;
    } else {
      user.prayers += user.provincenum * 1100;
    }

    dbHandler.getDB().get('users').find({ id: user.id }).assign({ prayers: user.prayers }).write();
  });
}

function AssignItem() {

  let churchChannel = client.channels.cache.get(`780209511339655199`);

  churchChannel.send("**Items Added**");

  /*
  Holy Grail: 2x prayers (pray.js) 
  Blessed: You can not be cursed (curse.js) (maybe also make steal as well)
  Godspeed: 2x steal value (steal.js) 
  Zeus' Chosen: Increased backfire chance when stolen from. (steal.js) 
  Atheist: Can't pray, but 15 minute gamble timer. (pray.js and gamble.js) 
  Priest: 10 minute pray timer (pray.js)
  Devil's Advocate: 1.5x Curse Damage (rounded up) for 0.5x Curse Price (rounded down)
  Bible Change: 2x income on churches
  Religious School: 2x income on community
  Sistine Chapel: 2x income on city
  Bible Belt: 2x income on province
  Menorah: You can steal up to 7 prayers.
  */

  //Reroll cost will be next income + 5 prayers
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


  dbHandler.getDB().get('users').value().forEach((user) => {
    let randomArr = Math.floor(Math.random() * itemArr.length);
    let givenItem = itemArr[randomArr];

    if (user.prayers > 0) {
      user.item = givenItem;
    }

    dbHandler.getDB().get('users').find({ id: user.id }).assign({ item: user.item }).write();
  });
}

function Announcement(msg) {
  const announceEmbed = new Discord.MessageEmbed()

    .setColor('#0099ff')
    .setTitle('Announcements:')
    .setAuthor('Swag#7947', 'https://i.pinimg.com/originals/19/0f/d7/190fd7f6d541af4262516cb3d9a7bc3f.png')
    .addFields(
      { name: 'No New Announcements', value: "\u200b" },
    )
    .setFooter('Check the announcements tomorrow for more news.', 'https://i.pinimg.com/originals/19/0f/d7/190fd7f6d541af4262516cb3d9a7bc3f.png');
  msg.channel.send(announceEmbed);
}

client.login(process.env.SECRETBOI);