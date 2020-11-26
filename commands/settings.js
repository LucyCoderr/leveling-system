const Discord = require("discord.js")
const code = require('@codedipper/random-code')
 module.exports = {
    name: "settings",
    description: "settings of level system",
    run: async (client, message, args, db, prefix) => {
if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(`❌`)
let command = args[0] 
if(!command) return message.channel.send(`
Keys:
${prefix}settings channel [channel]
-Level Rewards
${prefix}settings roles add [role] [lvl]
ex: ${prefix}settings roles add @LEVEl-5 5
${prefix}settings roles delete [id]
${prefix}settings roles list
`)
if(command.toLowerCase() === 'channel') {
    let channel = message.mentions.channels.first()
    if(!channel) return message.channel.send(`you must mention an vaild channel`)
    db.set(`levelup_${message.guild.id}`, channel.id)
    message.channel.send(`✅`)
}
if(command.toLowerCase() === 'roles') {
let first = args[1]
if(!first) return message.channel.send(`missing key
add | list | remove
`)
if(first.toLowerCase() === 'add') {
let role = message.mentions.roles.first()
if(!role) return message.channel.send(`Missing Role`)
if(!args[3]) return message.channel.send(`Missing Level`)
if(isNaN(args[3])) return message.channel.send(`words are not numbers :clown:`)
let data = {
  id: code(10).toLowerCase(),
  role: role.id,
  level: args[3]
}
console.log(data)
db.push(`roles_${message.guild.id}`, data)
message.channel.send(`Created!`)
}
if(first.toLowerCase() === 'list') {
    let data = db.get(`roles_${message.guild.id}`)
    if(!data) return message.channel.send(`Guild roles data is empty`)
    if(data === null) return message.channel.send(`Guild roles data is empty`)
    if(data && data.length) {
        let roles = []
        data.forEach(x => {
       roles.push(`Role: ${message.guild.roles.cache.get(x.role).name}(${x.role})
       Level: ${x.level}
       ID: ${x.id}
       `)
        })
    let embed = new Discord.MessageEmbed()
    .setAuthor(message.author.username , message.author.displayAvatarURL())
    .setDescription(roles.join("\n"))
    .setFooter(message.guild.name , message.guild.iconURL())
    .setTimestamp()
    message.channel.send(embed)
    }
}

if(first.toLowerCase() === 'remove') {
    if(!args[2]) return message.channel.send(`Missing ID`)
    let database = db.get(`roles_${message.guild.id}`)
    if(!database) return message.channel.send(`guild roles database is empty :clown:`)
    let data = database.find(x => x.id === args[2].toLowerCase())
    if(!data) return message.channel.send(`thats invaild ID`)
    let value = database.indexOf(data)
    delete database[value]
  
    var filter = database.filter(x => {
      return x != null && x != ''
    })
  
db.set(`roles_${message.guild.id}`, filter)  
message.channel.send(`Succsesfully Removed.`)
  }
}
    }}
 