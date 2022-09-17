const { Collection } = require("discord.js");
const Discord = require("discord.js");
const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const ClientCommands = require("discord-slash-commands-client");

require("dotenv").config(); // .env
const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
    Discord.Intents.FLAGS.GUILDS,
  ],
});
const clientCmds = new ClientCommands.Client(
  process.env.TOKEN,
  "1001622361713426505"
);

const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);
client.commands = new Collection();
const loadCommands = async (dir = "./commands/") => {
  const commandsData = [];
  fs.readdirSync(dir).forEach((dirs) => {
    const commands = fs
      .readdirSync(`${dir}/${dirs}/`)
      .filter((files) => files.endsWith(".js"));
    for (const file of commands) {
      const getFilename = require(`${dir}/${dirs}/${file}`);
      client.commands.set(getFilename.help.name, getFilename);

      commandsData.push(getFilename.cmd);

      console.log(`Commande chargée | ${getFilename.help.name}`);
    }
  });

  await rest.put(
    Routes.applicationGuildCommands(
      "1001622361713426505",
      "970247031861948416"
    ),
    {
      body: commandsData,
    }
  );
  await rest.put(
    Routes.applicationGuildCommands(
      "1001622361713426505",
      "909391088614256650"
    ),
    {
      body: commandsData,
    }
  );
};

clientCmds.getCommands({ guildID: "970247031861948416" }).then((cmds) => {
  cmds.forEach(async (cmd) => {
    if (client.commands.get(cmd.name).perms) {
      client.api
        .applications("1001622361713426505")
        .guilds("970247031861948416")
        .commands(cmd.id)
        .permissions.put({
          data: {
            permissions: client.commands.get(cmd.name).perms,
          },
        });
    }
  });
});

const loadEvents = (dir = "./events//") => {
  fs.readdirSync(dir).forEach((dirs) => {
    const events = fs
      .readdirSync(`${dir}/${dirs}/`)
      .filter((files) => files.endsWith(".js"));
    for (const event of events) {
      const evt = require(`${dir}/${dirs}/${event}`);
      const evtName = event.split(".")[0];
      client.on(evtName, evt.bind(null, client));
      console.log(`Evenement chargé | ${evtName}`);
    }
  });
};

loadCommands();
loadEvents();

client.login(process.env.TOKEN);
