const firstMessage =  require('./first-message')

module.exports = (client) => {
    const channelId = '861644462887665664'

    const getEmoji = (emojiName) => 
        client.emojis.cache.find((emoji) => emoji.name === emojiName)

     const emojis = {
        minecraft: 'Minecraft',
        forza: 'Forza Horizon 4',
        apex: 'Apex Legends',
        r6: 'Rainbow Six Siege',
        gtav: 'Grand Theft Auto V'
    }

    const reactions = []

    let emojiText = '點擊表情符號來獲得相對應的身分組\n\n'
    for (const key in emojis) {
        const emoji = getEmoji(key)
        reactions.push(emoji)

        const role = emojis[key]
        emojiText += `${emoji} = ${role}\n`
    }
    firstMessage(client, channelId, emojiText, reactions)

    const handleReaction = (reaction, user, add) => {
        if (user.id === '557859298600943616') {
            return
        }

        const emoji = reaction._emoji.name
        
        const { guild } = reaction.message

        const roleName = emojis[emoji]
        if (!roleName) {
            return
        }
        const role = guild.roles.cache.find((role) => role.name === roleName)
        const member = guild.members.cache.find((member) => member.id === user.id)
    
        if (add) {
          member.roles.add(role)
        } else {
          member.roles.remove(role)
        }
      }

    client.on('messageReactionAdd', (reaction, user) => {
        if (reaction.message.channel.id === channelId) {
            handleReaction(reaction, user, true)
        }
    })

    client.on('messageReactionRemove', (reaction, user) => {
        if (reaction.message.channel.id === channelId) {
          handleReaction(reaction, user, false)
        }
      })
    }
