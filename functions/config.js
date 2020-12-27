const Config = {
    prayCooldown: 900000, //15 minutes
    gambleCooldown: 3600000, //1 hour
    curseCooldown: 14400000, //4 hours
    stealCooldown: 1800000, //30 minutes
    tickRate: 3600000, //hour
    incomeRate: 21600000, //6 hours

    churchPrice: 10,
    communityPrice: 100,
    cityPrice: 1000,
    provincePrice: 10000,
    countryPrice: 100000,

    itemArr:
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
      "The Vatican",
      "Menorah",
      "Master Bolt",
      "Four Leaf Clover",
      "Altar"
    ],

    ascensionArr:
    [
     "Free Will", //Choose when rerolling
     "Percent Pray", //% of prayers when praying
     "Attack Upgrade", //Upgraded Actions
     "Income Upgrade", //Income Multiplied
     "Item Upgrade" //Upgraded Items
    ]
}

module.exports = { Config };