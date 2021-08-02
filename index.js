const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json');
const command = require('./command')  
client.commands = new Discord.Collection();
const firstMessage =  require('./first-message')
const skr = require('./skr')

client.on('ready', () => {
    console.log(`已登入 ${client.user.tag}!`)

    skr(client)
  })

  command(client, '條件', (message) => {
    const logo =
      'https://cdn.discordapp.com/attachments/851874299328856086/870336048566272031/85860f47-598b-4fb8-bd70-b0869a7ea7f5.png'
    const embed = new Discord.MessageEmbed()
      .setTitle('上分補習班條件')
      .setThumbnail(logo)
      .setColor('#9d84f1')
      .addFields(
        {
          name: '第一個條件',
          value: '訂閱prime',
          inline: true,
        },
        {
          name: '第二個條件',
          value: '乾爹身份組',
          inline: true,
        },
        {
          name: '第三個條件',
          value: '要接受裝水'
        }
      )
    message.channel.send(embed)
    message.delete().catch();
  })


command(client, 'status', (message) => {
  const content = message.content.replace('-status ', '')

  client.user.setPresence({
    activity: {
      name: content,
      type: 0,
    },
  })
  message.delete().catch();
  message.reply('已更改狀態')
})


command(client, 'serverinfo', (message) => {
  const { guild } = message

  const { name, region, memberCount, owner, afkTimeout } = guild
  const icon = guild.iconURL()

  const embed = new Discord.MessageEmbed()
    .setTitle(`"${name}"的資訊`)
    .setThumbnail(icon)
    .addFields(
      {
        name: 'Region',
        value: region,
      },
      {
        name: 'Members',
        value: memberCount,
      },
      {
        name: 'Owner',
        value: owner.user.tag,
      },
      {
        name: 'AFK Timeout',
        value: afkTimeout / 60,
      }
    )

  message.channel.send(embed)
})


  command(client, 'ban', (message) => {
    const { member, mentions } = message

    const tag = `<@${member.id}>`

    if (
      member.hasPermission('ADMINISTRATOR') ||
      member.hasPermission('BAN_MEMBERS')
    ) {
      const target = mentions.users.first()
      if (target) {
        const targetMember = message.guild.members.cache.get(target.id)
        targetMember.ban()
        message.channel.send(`${tag} 這位用戶被封鎖了`)
      } else {
        message.channel.send(`${tag} 請指定要封鎖的人`)
      }
    } else {
      message.channel.send(
        `${tag} 你沒權限執行此指令`
      )
    }
  })

  command(client, 'kick', (message) => {
    const { member, mentions } = message

    const tag = `<@${member.id}>`

    if (
      member.hasPermission('ADMINISTRATOR') ||
      member.hasPermission('KICK_MEMBERS')
    ) {
      const target = mentions.users.first()
      if (target) {
        const targetMember = message.guild.members.cache.get(target.id)
        targetMember.kick()
        message.channel.send(`${tag} 這位用戶被踢了`)
      } else {
        message.channel.send(`${tag} 請指定要踢的人`)
      }
    } else {
      message.channel.send(
        `${tag} 你沒權限執行此指令`
      )
    }
  })

client.login(config.token)
