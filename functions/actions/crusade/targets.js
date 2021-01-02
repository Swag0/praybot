const { Config } = require("../../config");
const { CheckifUserExists } = require("../../../bot");
const Discord = require("discord.js");
const client = new Discord.Client();

function Targets(msg) {

            /*
            Crusades:
            1. Crusade of the Faint-Hearted  (70% Success)
            2. Battle of Fariksfur (30% Per Person)
            3. Sack of Constantinople (20% Per Person)
            4. Siege of Acre (11% Per Person)
            5. Prince's Crusade (10% Per Person)
            6. Holy Land (8% Per Person)
            */

    const targets_embed = new Discord.MessageEmbed()
        .setTitle(`Crusade Targets`)
        .setDescription(`:person_walking: (Number of People), :white_check_mark: (Success per Person), :moneybag: (Reward in Prayers).`)
        .addFields(
            { name: 'Crusade of the Faint-Hearted', value: ':person_walking:: 1  |  :white_check_mark:: 50%  |  :moneybag:: 10 '},

            { name: 'Battle of Fariksfur', value: ':person_walking:: 2-5  |  :white_check_mark:: 30%  |  :moneybag:: 100 ' },

            { name: 'Sack of Constantinople', value: ':person_walking:: 4-5  |  :white_check_mark:: 20%  |  :moneybag:: 3000 ' },

            { name: 'Siege of Acre', value: ':person_walking:: 6-9  |  :white_check_mark:: 11%  |  :moneybag:: 15000'},
            
            { name: 'Prince\'s Crusade', value: ':person_walking:: 10  |  :white_check_mark:: 10%  |  :moneybag:: 100000' },

            { name: 'Battle for The Holy Land', value: ':person_walking:: 10+  |  :white_check_mark:: 8%  |  :moneybag:: 250000' },
        )
        .setFooter(`Possible Crusades`)
    msg.channel.send(targets_embed);

}
module.exports = { Targets };