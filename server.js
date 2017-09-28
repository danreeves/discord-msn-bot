const Eris = require('eris');
const { first, last } = require('lodash');

const bot = new Eris(process.env.DISCORD_BOT_TOKEN);

bot.on('ready', () => {
    console.log('Ready!');

    const server = last(bot.guilds.filter(g => g.name === 'MSN Messenger')); // This is the name of my Discord server, you should change this

    const voiceChannel = first(
        server.channels.filter(c => {
            if (typeof c.voiceMembers !== 'undefined') {
                const usersNotThisBot = c.voiceMembers.filter(
                    m => m.id !== bot.user.id
                );
                if (usersNotThisBot.length > 0) {
                    return true;
                }
            }
            return false;
        })
    );

    console.log('📞', voiceChannel.name);

    bot.joinVoiceChannel(voiceChannel.id).then(voiceConnection => {
        bot.on('messageCreate', msg => {
            voiceConnection.play(
                'https://cdn.glitch.com/60a14f49-0846-4bad-b84a-e5f018c2130d%2Fmsn_alert.mp3?1506640405402'
            );
        });
    });
});

bot.connect();
