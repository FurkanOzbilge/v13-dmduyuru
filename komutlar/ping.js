const Discord = require("discord.js");



module.exports = {
    calistir: async(client, message, args) => {

const ping = new Discord.MessageEmbed()
.setColor("#0099ff")
.setTitle("🏓  Pong!")
.setDescription(`Mesaj Ping: ` + "``" + `${Date.now() - message.createdTimestamp}ms` + "``")
.setFooter(`${message.author.tag} tarafından istendi.`, message.author.displayAvatarURL({dymaic: true}) )

message.channel.send({embeds: [ping]})

},

name: "ping",
description: "",
aliases: ["lag","bot-ping"],
kategori: "",
usage: "",
}