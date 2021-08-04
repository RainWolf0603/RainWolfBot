const Discord = require('discord.js')
Discord.Constants.DefaultOptions.ws.properties.$browser = "Discord Android"
const client = new Discord.Client()
const config = require('./config.json')
const roleClaim = require('./role-claim')
const command = require('./command')
const keepAlive = require('./server.js')
const electric = require('./electric')
const botinfo = require('./botinfo')
const uptime = require('./uptime')
const mySecret = process.env['token']

client.on('ready', () => {
    console.log(`已登入 ${client.user.tag}!`)

    roleClaim(client)
    electric(client)
    uptime(client)
    botinfo(client)
    keepAlive()
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

client.on('message', message => {
  let args = message.content.split(" ")
  
  switch (args[0]){
    case '?':
      message.react('❓')
      break;
    case '？':
      message.react('❓')
      break;
    case '早上好中國':
      message.channel.send('早上好中国\n现在我有冰淇淋\n我很喜欢冰淇淋\n但是\n速度与激情9\n比冰淇淋\n速度与激情\n速度与激情9\n我最喜欢\n所以…现在是音乐时间\n准备 1 2 3\n两个礼拜以后\n速度与激情9 速度与激情9 速度与激情9 \n不要忘记\n不要错过\n记得去电影院看速度与激情9\n因为非常好电影\n动作非常好\n差不多一样冰淇淋\n再见\nhttps://media.discordapp.net/attachments/812712169166733341/872081274012053524/video0.mp4').then(message.react('🍦'))
      break;
        case '早上好中国':
      message.channel.send('早上好中国\n现在我有冰淇淋\n我很喜欢冰淇淋\n但是\n速度与激情9\n比冰淇淋\n速度与激情\n速度与激情9\n我最喜欢\n所以…现在是音乐时间\n准备 1 2 3\n两个礼拜以后\n速度与激情9 速度与激情9 速度与激情9 \n不要忘记\n不要错过\n记得去电影院看速度与激情9\n因为非常好电影\n动作非常好\n差不多一样冰淇淋\n再见\nhttps://media.discordapp.net/attachments/812712169166733341/872081274012053524/video0.mp4').then(message.react('🍦'))
      break;
  }
})

client.on('message', message => {
 if(message.content === '林俊傑我愛你')
 message.channel.send('好')
})

client.login(mySecret)
