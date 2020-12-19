"use strict";

const schedule = require("node-schedule");
const util = require("util");
const Discord = require("discord.js");
const { IncrementPrays } = require("./functions/actions/create/pray");
const { Buy } = require("./functions/actions/create/build");
const { Sacrifice } = require("./functions/actions/create/sacrifice");
const { TimeUntilTick } = require("./functions/user/income");
const { Cooldown } = require("./functions/user/cooldown");
const { Item } = require("./functions/item/item");
const { Profile } = require("./functions/user/profile");
const { HelpPage } = require("./functions/help");
const { Config } = require('./functions/config');
const { Count } = require('./functions/count/count')
const { Gamble } = require('./functions/actions/gamble')
const { GiftPrayers } = require('./functions/actions/gift')
const { StealPrayers } = require('./functions/actions/steal')
const { Curse } = require('./functions/actions/curse')
const { Smite } = require('./functions/actions/smite')
const { IsAdmin } = require('./functions/admin/isAdmin')
const { SetUsername } = require('./functions/user/username')
const { Reroll } = require('./functions/item/reroll')
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

  var dailyrule = new schedule.RecurrenceRule();
  dailyrule.hour = 0;
  dailyrule.minute = 0;
  dailyrule.second = 1; //so that assign item happens after income

  var rule = new schedule.RecurrenceRule();
  rule.hour = [0, 6, 12, 18];
  rule.minute = 0;





  console.log(`Watching ${client.guilds.cache.size} Servers.`);
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("you | †help", { type: "WATCHING" }); //WATCHING you

  var churchjob = schedule.scheduleJob(rule, AddChurchIncome);
  var communityjob = schedule.scheduleJob(rule, AddCommunityIncome);
  var cityjob = schedule.scheduleJob(rule, AddCityIncome);
  var provincejob = schedule.scheduleJob(rule, AddProvinceIncome);
  var countryjob = schedule.scheduleJob(rule, AddCountryIncome);
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
    //if (msg.author.id == 686674122138189875) return; 
    //if blacklisted, they don't speak.
    if (msg.content.startsWith("†username") || msg.content.startsWith("+username")) {
      SetUsername(msg.author.id, msg, dbHandler);
    }
    else if (msg.content.startsWith("†praycount") || msg.content.startsWith("†Praycount") || msg.content.startsWith("+praycount") || msg.content.startsWith("+Praycount")) {
      Count(msg.author.id, msg, dbHandler);
    }
    else if (msg.content === "†pray" || msg.content === "+pray") {
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
    else if (msg.content.startsWith("†smite") || msg.content.startsWith("+smite")) {
      if (msg.mentions.users.first()) {
        Smite(msg.author.id, msg, dbHandler);
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
    else if (msg.content.startsWith("†countrycount") || msg.content.startsWith("†Countrycount") || msg.content.startsWith("+countrycount") || msg.content.startsWith("+Countrycount")) {
      Count(msg.author.id, msg, dbHandler);
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
    else if (msg.content.startsWith("†country") || msg.content.startsWith("+country")) {
      Buy(msg.author.id, msg, dbHandler, "country");
    }
    else if (msg.content.startsWith("†sacrifice") || msg.content.startsWith("+sacrifice")) {
      Sacrifice(msg.author.id, msg, dbHandler);
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
      msg.reply("Different levels are prayers, church, community, city, province, country - Coming soon: other stuff");
    }
    else if (msg.content === "†upcoming" || msg.content === "+upcoming") {
      msg.channel.send("Upcoming updates are: Ambrosia, achievements, upgrades, and extra levels.");
    }
    else if (msg.content === "†announcements" || msg.content === "+announcements") {
      Announcement(msg);
    }
    else if (msg.content.startsWith("test")) {
      if (IsAdmin(msg)) {
        Cleaning();
      }
    }
    else if (msg.content === "addincomee") {
      if (IsAdmin(msg)) {
        AddChurchIncome();
        AddCommunityIncome();
        AddCityIncome();
        AddProvinceIncome();
        AddCountryIncome();
        IncomeNotification();
      }
    }
    else if (msg.content === "additemm") {
      if (IsAdmin(msg)) {
        AssignItem();
      }
    }
    else if (msg.content.startsWith("†profile") || msg.content.startsWith("+profile") || msg.content.startsWith("+p") || msg.content.startsWith("†p")) {
      Profile(msg.author.id, msg, dbHandler)
    } //profile has to be last because it is p, and starts with p
    else if (msg.content.startsWith("†say")) {
      if (msg.author.id == 346758543489105941) {
        const args = msg.content.trim().split(/ +/g);
        const cmd = args[0].slice(1).toLowerCase(); // case INsensitive, without prefix

        msg.delete();

        if (cmd === 'say') {
          if (!args[1]) {
            return;
          }
        }

        let res;
        res = args.slice(1, args.length);
        var reqMessage = res.toString().replace(/,/g, " ");
        msg.channel.send(reqMessage)

      }
    } else if (msg.content.startsWith("†suggestion") || msg.content.startsWith("+suggestion")) {
      //787568059904425984
      const args = msg.content.trim().split(/ +/g);
      const cmd = args[0].slice(1).toLowerCase(); // case INsensitive, without prefix

      if (cmd === 'suggestion') {
        if (!args[1]) {
          msg.reply("Please specify your suggestion.")
          return;
        }
      }

      let res;
      res = args.slice(1, args.length);
      var reqMessage = res.toString().replace(/,/g, " ");
      let sugChannel = client.channels.cache.get(`787568059904425984`); //Suggestion Channel
      msg.channel.send("Suggestion Sent.")
      sugChannel.send("<@" + msg.author.id + "> says: " + reqMessage);
    }
  }
});

function Cleaning() {
  dbHandler.getDB().get('users').value().forEach((user) => {

    if (Date.now() - user.lastpraydate > 604800000) {
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

  //console.log(playerArr);
}

//780209511339655199 is church area.

function IncomeNotification() {
  console.log("Income Added at " + Date.now());
  let churchChannel = client.channels.cache.get(`780209511339655199`); //Study Group

  churchChannel.send("**Income Received**");

  churchChannel = client.channels.cache.get(`786422189490569256`); //NQARDR

  churchChannel.send("**Income Received**");

  dbHandler.getDB().get('users').value().forEach((user) => {

    if (user.item == "Altar") {
      user.item = "No Item";
    }

    dbHandler.getDB().get('users').find({ id: user.id }).assign({ item: user.item }).write();
  });
}

function AddChurchIncome() {
  dbHandler.getDB().get('users').value().forEach((user) => {

    if (user.item == "Bible" || user.item == "Altar") {
      user.prayers += user.churchnum * 2;
    } else {
      user.prayers += user.churchnum * 1;
    }

    dbHandler.getDB().get('users').find({ id: user.id }).assign({ prayers: user.prayers }).write();
  });
}

function AddCommunityIncome() {
  dbHandler.getDB().get('users').value().forEach((user) => {

    if (user.item == "Religious School" || user.item == "Altar") {
      user.prayers += (user.communitynum * 22)
    } else {
      user.prayers += (user.communitynum * 11);
    }

    dbHandler.getDB().get('users').find({ id: user.id }).assign({ prayers: user.prayers }).write();
  });
}

function AddCityIncome() {
  dbHandler.getDB().get('users').value().forEach((user) => {

    if (user.item == "Sistine Chapel" || user.item == "Altar") {
      user.prayers += user.citynum * 220;
    } else {
      user.prayers += user.citynum * 110;
    }

    dbHandler.getDB().get('users').find({ id: user.id }).assign({ prayers: user.prayers }).write();
  });
}

function AddProvinceIncome() {
  dbHandler.getDB().get('users').value().forEach((user) => {

    if (user.item == "Bible Belt" || user.item == "Altar") {
      user.prayers += user.provincenum * 2200;
    } else {
      user.prayers += user.provincenum * 1100;
    }

    dbHandler.getDB().get('users').find({ id: user.id }).assign({ prayers: user.prayers }).write();
  });
}

function AddCountryIncome() {
  dbHandler.getDB().get('users').value().forEach((user) => {

    if (user.item == "The Vatican" || user.item == "Altar") {
      user.prayers += user.countrynum * 22000;
    } else {
      user.prayers += user.countrynum * 11000;
    }

    dbHandler.getDB().get('users').find({ id: user.id }).assign({ prayers: user.prayers }).write();
  });
}

function AssignItem() {

  let churchChannel = client.channels.cache.get(`780209511339655199`);
  churchChannel.send("**Items Added**");

  churchChannel = client.channels.cache.get(`786422189490569256`); //NQARDR
  churchChannel.send("**Items Added**");

  /*
  Holy Grail: 2x prayers
  Blessed: You can not be cursed 
  Godspeed: 2x steal value 
  Zeus' Chosen: Increased backfire chance when stolen from.
  Atheist: Can't pray, but 15 minute gamble timer. 
  Priest: 7.5 minute pray timer 
  Devil's Advocate: 1.5x Curse Damage 
  Bible Change: 2x income on churches
  Religious School: 2x income on community
  Sistine Chapel: 2x income on city
  Bible Belt: 2x income on province
  The Vatican: 2x income on country
  Menorah: You can steal up to 7 prayers.
  Master Bolt: Usable once only -- Steals 10% of target prayers.
  Four Leaf Clover: There will only be 2 choices for gambling for the day
  Altar: Your pray day prayers doubles for ONE prayday
  */

  /*

  Coming:
  Sacred Bundle: You get to pick your item for the day

  */

  //Reroll cost will be next income + 5 prayers


  dbHandler.getDB().get('users').value().forEach((user) => {
    let randomArr = Math.floor(Math.random() * Config.itemArr.length);
    let givenItem = Config.itemArr[randomArr];

    if (givenItem == "Master Bolt") console.log(user.username + " received " + givenItem);

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