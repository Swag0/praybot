const { Config } = require("./config");
const { CheckifUserExists } = require("../bot");
const Discord = require("discord.js");
const client = new Discord.Client();

function HelpPage(userId, msg, dbHandler) {
    let userstore = dbHandler.getDB().get('users');
    //check first if user is a new user
    dbHandler.CheckifUserExists(userId);

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
                .addField("Page 6: ", 'Miscellaneous Commands')
                .setFooter("Page " + page + " of 6", 'https://i.pinimg.com/originals/19/0f/d7/190fd7f6d541af4262516cb3d9a7bc3f.png');
            message.edit(helpEmbed);
        } else if (page == 1) {
            const helpEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("Action Commands")
                .addField("Praying", 'Use †pray to gain a prayer')
                .addField("Gambling", 'Use †gamble to gamble your prayers. If correct, you will gain 3 prayers. If incorrect, you will lose 1.')
                .addField("Stealing", 'Use †steal @target to steal prayers from your target. You will steal a random number from 1-3. There is a chance to backfire.')
                .addField("Cursing", 'Use †curse @target to curse your target. Your target will lose 1-3 prayers. You will lose 0-2.')
                .addField("Gifting", 'Use †gift @target to give your prayers to someone else.')
                .setFooter("Page " + page + " of 6", 'https://i.pinimg.com/originals/19/0f/d7/190fd7f6d541af4262516cb3d9a7bc3f.png');
            message.edit(helpEmbed);
        } else if (page == 2) {
            const helpEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("Building Commands")
                .addField("Building Churches", 'Use †church to build a church. On prayday, you will gain 1 prayer.')
                .addField("Building Communities", 'Use †community to build a community. On prayday, you will gain 11 prayers.')
                .addField("Building Cities", 'Use †city to build a city. On prayday, you will gain 110 prayers.')
                .addField("Building Provinces", 'Use †province to build a province. On prayday, you will gain 1100 prayers.')
                .setFooter("Page " + page + " of 6", 'https://i.pinimg.com/originals/19/0f/d7/190fd7f6d541af4262516cb3d9a7bc3f.png');
            message.edit(helpEmbed);
        } else if (page == 3) {
            const helpEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("Counting Commands")
                .addField("Counting Prayers", 'Use †praycount to count your prayers. You can also choose to mention someone else and count their prayers.')
                .addField("Counting Churches", 'Use †churchcount to count your churches. You can also choose to mention someone else and count their churches.')
                .addField("Counting Communities", 'Use †communitycount to count your communities. You can also choose to mention someone else and count their communities.')
                .addField("Counting Cities", 'Use †citycount to count your cities. You can also choose to mention someone else and count their cities.')
                .addField("Counting Provinces", 'Use †provincecount to count your provinces. You can also choose to mention someone else and count their provinces.')
                .addField("Counting Everything", 'Use †checkall to count all of your possessions. You can also choose to mention someone else and count their possessions.')
                .setFooter("Page " + page + " of 6", 'https://i.pinimg.com/originals/19/0f/d7/190fd7f6d541af4262516cb3d9a7bc3f.png');
            message.edit(helpEmbed);
        } else if (page == 4) {
            const helpEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("Prayday Commands")
                .addField("Time Until Prayday", 'Use †time to return how long until the next prayday.')
                .addField("Income at Prayday", 'Use †income to return how much income you will receive on your next prayday.')
                .addField("All Prayday Functions", 'Use †prayday to return †time and †income.')
                .setFooter("Page " + page + " of 6", 'https://i.pinimg.com/originals/19/0f/d7/190fd7f6d541af4262516cb3d9a7bc3f.png');
            message.edit(helpEmbed);
        } else if (page == 5) {
            const helpEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("Item Commands")
                .addField("Check Item", 'Use †item to return your item and its functions.')
                .addField("Reroll", 'Use †reroll to reroll your item. The formula for cost is *income + 5 prayers*.')
                .setFooter("Page " + page + " of 6", 'https://i.pinimg.com/originals/19/0f/d7/190fd7f6d541af4262516cb3d9a7bc3f.png');
            message.edit(helpEmbed);
        } else if (page == 6) {
            const helpEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("Miscellanous Commands")
                .addField("Profile", 'Use †p to return your possessions and your item.')
                .addField("Leaderboard", 'Use †leaderboard to return the 5 users with the most prayers.')
                .addField("Cooldown", 'Use †cd to return your cooldowns on praying, gambling, stealing, and cursing.')
                .addField("Invite", 'Use †invite to return the invite link for this bot.')
                .setFooter("Page " + page + " of 6", 'https://i.pinimg.com/originals/19/0f/d7/190fd7f6d541af4262516cb3d9a7bc3f.png');
            message.edit(helpEmbed);
        }
        message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
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
        .addField("Page 6: ", 'Miscellaneous Commands')
        .setFooter("Page 0 of 6", 'https://i.pinimg.com/originals/19/0f/d7/190fd7f6d541af4262516cb3d9a7bc3f.png');
    msg.channel.send(helpEmbed)

        .then(function (message) {

            message.react('1️⃣').then(r => {
                message.react('2️⃣').then(r => {
                    message.react('3️⃣').then(r => {
                        message.react('4️⃣').then(r => {
                            message.react('5️⃣').then(r => {
                            })
                            message.react('6️⃣').then(r => {
                            });
                        })
                    })
                })
            });


            // First argument is a filter function
            message.awaitReactions((reaction, user) => user.id == msg.author.id && (reaction.emoji.name == '1️⃣' || reaction.emoji.name == '2️⃣' || reaction.emoji.name == '3️⃣' || reaction.emoji.name == '4️⃣' || reaction.emoji.name == '5️⃣' || reaction.emoji.name == '6️⃣'),
                { max: 1, time: 30000 }).then(collected => {
                    if (collected.first().emoji.name == '1️⃣') {
                        swapPage(1, message);
                    }
                    else if (collected.first().emoji.name == '2️⃣') {
                        msg.channel.send("2");
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
                }).catch(() => {
                    swapPage(0, message)
                    message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                });

        }).catch(function () {
            console.log("something maybe did sad");
        });

}

module.exports = { HelpPage };