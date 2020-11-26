const Discord = require("discord.js")
 
 module.exports = {
    name: "rank",
    description: "Check your rank level omg WOW",
     run: async (client, message, args, db, prefix) => {
let user = message.mentions.users.first() ||  message.author;
if(user.bot === true) return message.channel.send(`Bots cant have lvls + xp`)

let xp = db.get(`user_${message.guild.id}_${user.id}`)
if(!xp) {
    let data = {
        xp: 0,
       level: 0,
       upgrade: 0
      }
      db.set(`user_${message.guild.id}_${user.id}`, data)
      let embed = new Discord.MessageEmbed()
      .setAuthor(user.username , user.displayAvatarURL())
      .setDescription(`
      **User Level**: 0
      **User XP**: 0
      
      Needed xp for next level 200 xp left
      `)
      .setFooter(message.author.username , message.author.displayAvatarURL())
      .setTimestamp()
      message.channel.send(embed)
      
      return;
    }
let embed = new Discord.MessageEmbed()
.setAuthor(user.username , user.displayAvatarURL())
.setDescription(`
**User Level**: ${xp.level}
**User XP**: ${xp.xp}
Needed xp for next level: ${xp.upgrade+100-xp.xp} xp left
`)
.setFooter(message.author.username , message.author.displayAvatarURL())
.setTimestamp()
message.channel.send(embed)
}}