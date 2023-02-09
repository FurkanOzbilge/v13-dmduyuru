const { Client, Intents, Collection, MessageAttachment, MessageEmbed, Permissions, Constants, ApplicationCommandPermissionsManager } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MEMBERS,Intents.FLAGS.GUILD_BANS,Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,Intents.FLAGS.GUILD_INTEGRATIONS,Intents.FLAGS.GUILD_WEBHOOKS,Intents.FLAGS.GUILD_INVITES,Intents.FLAGS.GUILD_VOICE_STATES,Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.GUILD_MESSAGE_REACTIONS,Intents.FLAGS.GUILD_MESSAGE_TYPING,Intents.FLAGS.DIRECT_MESSAGES,Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,Intents.FLAGS.DIRECT_MESSAGE_TYPING] });
const ayarlar = require("./ayarlar.json");
const db = require("nrc.db")
const message = require("./events/message");
let prefix = ayarlar.prefix;
const Discord = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');


let sunucuID = ayarlar.sunucuID;




client.commands = new Collection();
client.aliases = new Collection();

["command"].forEach(handler => {
  require(`./komutcalistirici`)(client);
}); 

client.on("ready", () => {
  require("./events/eventLoader")(client);
  let commands = client.guilds.cache.get(sunucuID).commands;

  commands.create({
    name:"duyuru",
    description:"Sunucu üyelerine dm üzerinden duyuru gönderir.",
    options:[{
      name:"mesaj",
      description:"Üyelere gönderilecek mesajı girmelisin.",
      type:"STRING",
      required:true
    }]
  })
  commands.create({
    name:"duyuru-embed",
    description:"Embed şeklinde duyuru mesajı gönderirsin.",
    options:[{
      name:"mesaj",
      description:"Duyurusunu yapıcağın mesajı girmelisin.",
      type:"STRING",
      required:true
    }]
  })
  
});

client.on("interactionCreate", async(interaction) => {
  const { commandName, options } = interaction;


  
  if(commandName == "duyuru-embed") {
    if(!interaction.member.permissions.has("ADMINISTRATOR")) {return interaction.reply({content:"Bu komutu uygulayabilmek için gerekli yetkiye sahip değilsin.", ephemeral:true})}
    
    let mesaj = options.getString("mesaj")
    interaction.guild.members.fetch().then(members =>
      {
          // Loop through every members,
          console.log("")
          console.log(`${interaction.member.user.username} Bir duyuru mesajı gönderdi:`)
          console.log(`"${mesaj}"`)
          console.log("一一一一一一一一一一一一")
          let uyesayisi = interaction.guild.members.cache.filter(member => !member.user.bot).size;
        members.forEach(member =>
          {
            if(!member.user.bot) {
              const embed = new Discord.MessageEmbed()
              .setColor("WHITE")
              .setDescription(mesaj)
              .setAuthor({name:`${interaction.guild.name} Sunucusundan Duyuru`,iconURL: interaction.guild.iconURL()})
              .setTimestamp()
              .setFooter({text:interaction.member.user.username, iconURL:interaction.member.displayAvatarURL()})
              member.send({embeds:[embed]}).catch(console.error)
              
              console.log(member.user.username +" ✔️")
              
              
              return 
            }

          })
          console.log("一一一一一一一一一一一一")
          interaction.reply({content:`Duyuru mesajı başarıyla **${uyesayisi}** kişiye gönderildi.`})
      });
  }



  if(commandName == "duyuru") {
    if(!interaction.member.permissions.has("ADMINISTRATOR")) {return interaction.reply({content:"Bu komutu uygulayabilmek için gerekli yetkiye sahip değilsin.", ephemeral:true})}
    
    let mesaj = options.getString("mesaj")
    interaction.guild.members.fetch().then(members =>
      {
          // Loop through every members,
          console.log("")
          console.log(`${interaction.member.user.username} Bir duyuru mesajı gönderdi:`)
          console.log(`"${mesaj}"`)
          console.log("一一一一一一一一一一一一")
          let uyesayisi = interaction.guild.members.cache.filter(member => !member.user.bot).size;
        members.forEach(member =>
          {
            if(!member.user.bot) {
              member.send(mesaj).catch(console.error)
              
              console.log(member.user.username +" ✔️")
              
              
              return 
            }

          })
          console.log("一一一一一一一一一一一一")
          interaction.reply({content:`Duyuru mesajı başarıyla **${uyesayisi}** kişiye gönderildi.`})
      });
  }
})


client.login(ayarlar.token);
