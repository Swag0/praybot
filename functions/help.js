const { Config } = require("./config");
const { CheckifUserExists } = require("../bot");
const Discord = require("discord.js");
const client = new Discord.Client();

function HelpPage(userId, msg, dbHandler) {
    let userstore = dbHandler.getDB().get('users');
    //check first if user is a new user
    dbHandler.CheckifUserExists(userId, msg);

    let user = userstore.find({
        id: userId
    }).value();


    function swapPage(page, message) {
        if (page == 0) { //Main Help
            const helpEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("Help Commands")
                .addField("Page 0: ", 'Table of Contents')
                .addField("Page 1: ", 'Action Commands')
                .addField("Page 2: ", 'Building Commands')
                .addField("Page 3: ", 'Counting Commands')
                .addField("Page 4: ", 'Prayday Commands')
                .addField("Page 5: ", 'Item Commands')
                .addField("Page 6: ", 'Ascension Commands')
                .addField("Page 7: ", 'Miscellaneous Commands')
                .setFooter("Page " + page + " of 7", 'https://i.pinimg.com/originals/19/0f/d7/190fd7f6d541af4262516cb3d9a7bc3f.png');
            message.edit(helpEmbed);
        } else if (page == 1) {
            const helpEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("Action Commands")
                .addField("Praying", 'Use *†pray* to gain a prayer.')
                .addField("Gambling", 'Use *†gamble* to gamble your prayers. If correct, you will gain 3 prayers. If incorrect, you will lose 1.')
                .addField("Stealing", 'Use *†steal @target* to steal prayers from your target. You will steal a random number from 1-3. There is a chance to backfire.')
                .addField("Cursing", 'Use *†curse @target* to curse your target. You and your target will lose 1% of your/their prayers.')
                .addField("Gifting", 'Use *†gift @target* to give your prayers to someone else.')
                .addField("Smiting", 'Usable only if you have the **Master Bolt**. Use *†smite @target* to steal 10% of their prayers.')
                .setFooter("Page " + page + " of 7", 'https://i.pinimg.com/originals/19/0f/d7/190fd7f6d541af4262516cb3d9a7bc3f.png');
            message.edit(helpEmbed);
        } else if (page == 2) {
            const helpEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("Building Commands")
                .addField("Building Churches", 'Use *†church* *x* to build *x* churches. On prayday, you will gain 1 prayer per church.')
                .addField("Building Communities", 'Use *†community* *x* to build *x* communities. On prayday, you will gain 11 prayers per community.')
                .addField("Building Cities", 'Use *†city* *x* to build *x* cities. On prayday, you will gain 110 prayers per city.')
                .addField("Building Provinces", 'Use *†province* *x* to build *x* provinces. On prayday, you will gain 1100 prayers per province.')
                .addField("Building Countries", 'Use *†country* *x* to build *x* countries. On prayday, you will gain 11000 prayers per country.')
                .addField("Sacrificing", 'Use *†sacrifice* *x* building to destroy *x* buildings. You will gain 20% of the buildings cost.')
                .setFooter("Page " + page + " of 7", 'https://i.pinimg.com/originals/19/0f/d7/190fd7f6d541af4262516cb3d9a7bc3f.png');
            message.edit(helpEmbed);
        } else if (page == 3) {
            const helpEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("Counting Commands")
                .addField("Counting Prayers", 'Use *†praycount* to count your prayers. You can also choose to mention someone else and count their prayers.')
                .addField("Counting Churches", 'Use *†churchcount* to count your churches. You can also choose to mention someone else and count their churches.')
                .addField("Counting Communities", 'Use *†communitycount* to count your communities. You can also choose to mention someone else and count their communities.')
                .addField("Counting Cities", 'Use *†citycount* to count your cities. You can also choose to mention someone else and count their cities.')
                .addField("Counting Provinces", 'Use *†provincecount* to count your provinces. You can also choose to mention someone else and count their provinces.')
                .addField("Counting Countries", 'Use *†countrycount* to count your countries. You can also choose to mention someone else and count their countries.')
                .addField("Counting Everything", 'Use *†checkall* to count all of your possessions. You can also choose to mention someone else and count their possessions.')
                .setFooter("Page " + page + " of 7", 'https://i.pinimg.com/originals/19/0f/d7/190fd7f6d541af4262516cb3d9a7bc3f.png');
            message.edit(helpEmbed);
        } else if (page == 4) {
            const helpEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("Prayday Commands")
                .addField("Time Until Prayday", 'Use *†time* to return how long until the next prayday.')
                .addField("Income at Prayday", 'Use *†income* to return how much income you will receive on your next prayday.')
                .addField("All Prayday Functions", 'Use *†prayday* to return both †time and †income.')
                .setFooter("Page " + page + " of 7", 'https://i.pinimg.com/originals/19/0f/d7/190fd7f6d541af4262516cb3d9a7bc3f.png');
            message.edit(helpEmbed);
        } else if (page == 5) {
            const helpEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("Item Commands")
                .addField("Item List", 'Use *†itemlist* to show all items and their functions.')
                .addField("Check Your Item", 'Use *†item* to return your item and its functions.')
                .addField("Check Specific Item", 'Use *†item* [possible item] to return a specific item and its functions.')
                .addField("Reroll", 'Use *†reroll* to reroll your item. The formula for cost is *income + 5 prayers*.')
                .setFooter("Page " + page + " of 7", 'https://i.pinimg.com/originals/19/0f/d7/190fd7f6d541af4262516cb3d9a7bc3f.png');
            message.edit(helpEmbed);
        } else if (page == 6) {
            const helpEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("Ascension Commands")
                .addField("Ascend", 'Use *†ascend* [possible ascension] to ascend, which will make you lose all buildings and give you an ascension.')
                .addField("Ascend Help", 'Use *†ascend help* to show all possible ascensions.')
                .setFooter("Page " + page + " of 7", 'https://i.pinimg.com/originals/19/0f/d7/190fd7f6d541af4262516cb3d9a7bc3f.png');
            message.edit(helpEmbed);
        } else if (page == 7) {
            const helpEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("Miscellaneous Commands")
                .addField("Profile", 'Use *†p* to return your possessions and your item.')
                .addField("Leaderboard", 'Use *†leaderboard* to return the 5 users with the most prayers.')
                .addField("Cooldown", 'Use *†cd* to return your cooldowns on praying, gambling, stealing, and cursing.')
                .addField("Renaming", 'Use *†username* and your new username to rename yourself')
                .addField("Suggestions", 'Use *†suggestion* to give a suggestion for this bot. You will be messaged when your suggestion is implemented.')
                .addField("Invite", 'Use *†invite* to return the invite link for this bot.')
                .addField("Help", 'Use *†help* or *†repose* to access this help menu.')
                .setFooter("Page " + page + " of 7", 'https://i.pinimg.com/originals/19/0f/d7/190fd7f6d541af4262516cb3d9a7bc3f.png');
            message.edit(helpEmbed);
        }
        setTimeout(function () {
            message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
        }, 5000);
    }


    const helpEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Help Commands")
        .addField("Page 0: ", 'Table of Contents')
        .addField("Page 1: ", 'Action Commands')
        .addField("Page 2: ", 'Building Commands')
        .addField("Page 3: ", 'Counting Commands')
        .addField("Page 4: ", 'Prayday Commands')
        .addField("Page 5: ", 'Item Commands')
        .addField("Page 6: ", 'Ascension Commands')
        .addField("Page 7: ", 'Miscellaneous Commands')
        .setFooter("Page 0 of 7", 'https://i.pinimg.com/originals/19/0f/d7/190fd7f6d541af4262516cb3d9a7bc3f.png');
    msg.channel.send(helpEmbed)

        .then(function (message) {

            message.react('1️⃣').then(r => {
                message.react('2️⃣').then(r => {
                    message.react('3️⃣').then(r => {
                        message.react('4️⃣').then(r => {
                            message.react('5️⃣').then(r => {
                                message.react('6️⃣').then(r => {
                                    message.react('7️⃣').then(r => {
                                    });
                                })
                            })
                        })
                    })
                })
            });


            // First argument is a filter function
            message.awaitReactions((reaction, user) => user.id == msg.author.id && (reaction.emoji.name == '1️⃣' || reaction.emoji.name == '2️⃣' || reaction.emoji.name == '3️⃣' || reaction.emoji.name == '4️⃣' || reaction.emoji.name == '5️⃣' || reaction.emoji.name == '6️⃣' || reaction.emoji.name == '7️⃣'),
                { max: 1, time: 30000 }).then(collected => {
                    if (collected.first().emoji.name == '1️⃣') {
                        swapPage(1, message);
                    }
                    else if (collected.first().emoji.name == '2️⃣') {
                        swapPage(2, message);
                    }
                    else if (collected.first().emoji.name == '3️⃣') {
                        swapPage(3, message);
                    }
                    else if (collected.first().emoji.name == '4️⃣') {
                        swapPage(4, message);
                    }
                    else if (collected.first().emoji.name == '5️⃣') {
                        swapPage(5, message);
                    }
                    else if (collected.first().emoji.name == '6️⃣') {
                        swapPage(6, message);
                    }
                    else if (collected.first().emoji.name == '7️⃣') {
                        swapPage(7, message);
                    }
                }).catch(() => {
                    swapPage(0, message)
                    message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                });

        }).catch(function () {
            console.log("something maybe did sad");
        });

}

module.exports = { HelpPage };