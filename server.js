const Eris = require('eris');
const { last } = require('lodash');

const bot = new Eris(process.env.DISCORD_BOT_TOKEN);

bot.on('ready', () => {
    console.log('🤖 Ready');

    const server = last(bot.guilds.filter(g => g.name === 'MSN Messenger')); // This is the name of my Discord server, 
                                                                             // because bots can be members of multiple "guilds"
                                                                             // You should change this to the name of your server

    const voiceChannel = last(server.channels.filter(c => c.name === 'MSN Notification')); // This is the name of the channel I want the bot to join

  
    bot.joinVoiceChannel(voiceChannel.id).then(voiceConnection => {
        console.log('📞 Joined', voiceChannel.name);
        console.log('👀 Watching for messages');
      
        bot.on('messageCreate', msg => {
            console.log('🔊 Playing notification sound')
            voiceConnection.play(
                'https://cdn.glitch.com/60a14f49-0846-4bad-b84a-e5f018c2130d%2Fmsn_alert.mp3?1506640405402'
            );
        });
    });
});

bot.connect();
