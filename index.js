const Discord = require('discord.js');
const bot = new Discord.Client();
const prefix = "&";

bot.login("");

bot.on('message', message => {
    if (!message.channel.guild) return;
    if (message.content.startsWith('/bc')) {
        if (!message.channel.guild) return message.channel.send('**This command only for servers**').then(m => m.delete(5000));
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('**you dont have the permession** `ADMINISTRATOR`');
        let args = message.content.split(" ").join(" ").slice(2 + prefix.length);
        let copy = "CATENA";
        let request = `Requested By ${message.author.username}`;
        if (!args) return message.reply('**You must write a word or sentence to send the Broadcast**');
        message.channel.send(`**Are you sure you want to send your Broadcast?** \` ${args}\``).then(msg => {
            msg.react(':white_check_mark:')
                .then(() => msg.react(':x:'))
                .then(() => msg.react(':white_check_mark:'))

            let reaction1Filter = (reaction, user) => reaction.emoji.name === ':white_check_mark:' && user.id === message.author.id;
            let reaction2Filter = (reaction, user) => reaction.emoji.name === ':x:' && user.id === message.author.id;

            let reaction1 = msg.createReactionCollector(reaction1Filter, { time: 12000 });
            let reaction2 = msg.createReactionCollector(reaction2Filter, { time: 12000 });
            reaction1.on("collect", r => {
                message.channel.send(`☑ | Done ... The Broadcast Message Has Been Sent For ${message.guild.members.size} Members`).then(m => m.delete(5000));
                message.guild.members.forEach(m => {
                    var bc = new
                    Discord.RichEmbed()
                        .setColor('#FFFB00')
                        .setTitle('Broadcast')
                        .addField('Server', message.guild.name)
                        .addField('Sender', message.author.username)
                        .addField('Message', args)
                        .setThumbnail(message.author.avatarURL)
                        .setFooter(copy, bot.user.avatarURL)
                        .setTimestamp();
                    m.send({ embed: bc })
                    msg.delete();
                })
            })
            reaction2.on("collect", r => {
                message.channel.send(`**Broadcast Canceled.**`).then(m => m.delete(5000));
                msg.delete();
            })
        })
    }
});
