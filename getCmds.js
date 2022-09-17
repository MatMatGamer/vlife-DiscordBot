const Discord = require("discord.js");
const test = require("discord-slash-commands-client");
require("dotenv").config(); // .env
const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
    Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
  ],
});
const client2 = new test.Client(process.env.TOKEN, "919949773769961522");
client2
  .getCommands({ guildID: "919660204164005938" })
  .then(console.log)
  .catch(console.error);
client.login(process.env.TOKEN);
