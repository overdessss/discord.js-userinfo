const strftime = require('strftime');
const Discord = require('discord.js');
const prefix = "!";
const token = "YOUR TOKEN";
const client = new Discord.Client();

client.on('message', (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    let messageArray = message.content.split(' ');
    let command = messageArray[0].slice(prefix.length);
    let args = messageArray.slice(1);
    if (command === "usrinfo") {
    
    let member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[1]));
            let user;
    if (member) user = member.user;
    else user = message.author;
 
    let avatar = user.avatarURL({size: 2048, dynamic: true});
    let status = {
        online: 'Online',
        idle: 'Not active',
        dnd: 'do not disturb',
        offline: 'Offline'
    };
    let bot = {
        "true": "Yes",
        "false": "No"
    };
    
 
    let day = 1000 * 60 * 60 * 24;
    let date1 = new Date(message.createdTimestamp);
    let date2 = new Date(user.createdTimestamp);
    let date3 = new Date(message.guild.member(user).joinedTimestamp);
    let diff1 = Math.round(Math.abs((date1.getTime() - date2.getTime()) / day));
    let diff2 = Math.round(Math.abs((date1.getTime() - date3.getTime()) / day));
 
    let embed = new Discord.MessageEmbed()
    .setAuthor(user.tag, avatar)
    .addFields(
      {name: 'General', value: `**Name:** ${user.tag}\n**Status:** ${status[user.presence.status]}\n**Bot:** ${bot[user.bot]}`},
      {name: 'Dates', value: `**Registration date:** ${strftime('%d.%m.%Y %H:%M:%S', new Date(user.createdTimestamp))} (${diff1} days ago)\n**The date of entry:** ${strftime('%d.%m.%Y %H:%M:%S', new Date(message.guild.member(user).joinedTimestamp))} (${diff2} days ago)`}
    )
    .setColor('9f5f80')
    .setTimestamp()
    .setThumbnail(avatar)
    .setFooter(`ID: ${user.id}`);
    message.channel.send(embed);
    }
});

client.login(token);