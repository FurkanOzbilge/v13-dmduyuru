const { Message } = require("discord.js");
const db = require("nrc.db");
const fetch = require("node-fetch");
const ayarlar = require("../ayarlar.json");
let aktiviteyazi = ayarlar.aktiviteyazi;
let aktivitetur = ayarlar.aktivitetur;
let durum = ayarlar.durum;


module.exports = async(client) => {

  
  client.user.setActivity(`${aktiviteyazi}`, { type: `${aktivitetur}` })
  client.user.setStatus(`${durum}`)
  console.log("Ayarlamalar: Durum Ayarlandı!")
  console.log("Ayarlamalar: Aktivite Ayarlandı!")
  
  console.log(" ")



  const kulsayi = []
  client.guilds.cache.forEach((item, i) => {
      kulsayi.push(item.memberCount)
  });
  var toplamkulsayi = 0
  for (var i = 0; i < kulsayi.length; i++) {
      if (isNaN(kulsayi[i])){
          continue;
      }

      toplamkulsayi += Number(kulsayi[i])
  }

  console.log("Bot İstatistiği")
  console.log(`Sunucu Sayısı: ${client.guilds.cache.size}`)
  console.log(`Kullanıcı Sayısı: ${toplamkulsayi}`)
  console.log(`Emoji Sayısı: ${client.emojis.cache.size}`)
  console.log(`Kanal Sayısı: ${client.channels.cache.size}`)

  console.log(" ")

  console.log(`${client.user.tag} olarak Discord'a giriş yaptım. Artık kullanmaya hazırım!`);

  


}
