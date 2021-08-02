module.exports = (client) => {
    const channelIds = [
      '871658778095927307', 
    ]
  
    const addReactions = (message) => {
      message.react('⚡')

    }
  
    client.on('message', async (message) => {
      if (channelIds.includes(message.channel.id)) {
        addReactions(message)
      } else if (message.content.toLowerCase() === '!poll') {
        await message.delete()
  
        const fetched = await message.channel.messages.fetch({ limit: 1 })
        if (fetched && fetched.first()) {
          addReactions(fetched.first())
        }
      }
    })
  }