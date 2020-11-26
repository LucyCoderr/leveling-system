const Discord = require('discord.js')
const db = require('quick.db')
const client = new Discord.Client()
const prefix = "" // ur bot prefix
client.on('ready', () => {console.log('running on the shit')})

 


   client.commands = new Discord.Collection();
 
// Command Handler.
   const { join } = require('path');
   const { readdirSync, createWriteStream, promises } = require('fs');
const { flip } = require('jimp')
const { create } = require('jimp')

   const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));

   for (const file of commandFiles) {
       const command = require(join(__dirname, "commands", `${file}`));
 
       client.commands.set(command.name, command);
    }
   
   client.on("message", async message => {
          if(message.author.bot) return;
         if(message.channel.type === 'dm') return;
          if(message.content.startsWith(prefix)) {
             
    
             const args = message.content.slice(prefix.length).trim().split(/ +/);
     
             const command = args.shift().toLowerCase();
     
             if(!client.commands.has(command)) return;
     
     
             try {
                client.commands.get(command).run(client, message, args, db , prefix)
             } catch (error){
                 console.error(error);
             }
          }
     })

 client.on('message', message => {
 if(!message.guild) return;
 if(message.author.bot) return;
let xp = Math.floor(Math.random() * Math.floor(15))
let user = db.get(`user_${message.guild.id}_${message.author.id}`)
if(!user) {
  let data = {
    xp: 0,
   level: 0,
   upgrade: 0
  }
  db.set(`user_${message.guild.id}_${message.author.id}`, data)
return;
}
let xpdata = {
  xp: user.xp+xp,
  level: user.level,
  upgrade: user.upgrade
}
console.log(xpdata , " < Xp DATA")
db.set(`user_${message.guild.id}_${message.author.id}`, xpdata)
if(user.xp > user.upgrade+100) {
let upchannel = db.get(`levelup_${message.guild.id}`) || `${message.channel.id}`
try {
message.guild.channels.cache.get(upchannel)
} catch(err) {
  console.log(err)
}
message.guild.channels.cache.get(upchannel).send(`${message.author.username} Congrats You Leveled up to **${user.level || '1'}**`)
let levelup = {
  xp: 0,
  level: user.level+1,
  upgrade: user.upgrade+100
  }
  db.set(`user_${message.guild.id}_${message.author.id}`, levelup)
  let roles = db.get(`roles_${message.guild.id}`)
  if(!roles) return;
  console.log(roles)
  if(roles && roles.length) {
    roles.forEach(x => {
    if(user.level > x.level-1) {
      console.log(message.author.username)
    if(message.member.roles.cache.has(x.role)) return;
    message.member.roles.add(x.role, { reason: `Reached Required level`})  
  }
  if(user.level < x.level) {
    if(!message.member.roles.cache.has(x.role)) return;
    message.member.roles.cache.remove(x.role)
  }
})
  }
}
})
