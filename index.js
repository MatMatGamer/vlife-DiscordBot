const { Collection } = require("discord.js");
const Discord = require("discord.js");
const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const ClientCommands = require("discord-slash-commands-client");
const activities = [
  { name: "Regarde le chief", type: "WATCHING" },
  { name: "Regarde la police", type: "WATCHING" },
  { name: "Fais un rapport", type: "PLAYING" },
  { name: "S'occupe de la paperasse", type: "PLAYING" },
];
var activityI = 0;
require("dotenv").config(); // .env
const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
    Discord.Intents.FLAGS.GUILDS,
  ],
  presence: {
    status: "dnd",
  },
});

setInterval(() => {
  client.user.setActivity(activities[activityI]);
  activityI++;
  if (activityI > 3) {
    activityI = 0;
  }
}, 15000);
const clientCmds = new ClientCommands.Client(
  process.env.TOKEN,
  "1001622361713426505"
);

const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);
client.commands = new Collection();
const loadCommands = async (dir = "./commands/") => {
  const commandsDataALL = [];
  const commandsDataRPD = [];
  fs.readdirSync(dir).forEach((dirs) => {
    const commands = fs
      .readdirSync(`${dir}/${dirs}/`)
      .filter((files) => files.endsWith(".js"));
    for (const file of commands) {
      const getFilename = require(`${dir}/${dirs}/${file}`);
      client.commands.set(getFilename.help.name, getFilename);

      if (getFilename.serv && getFilename.serv == "RPD") {
        commandsDataRPD.push(getFilename.cmd);
      } else {
        commandsDataALL.push(getFilename.cmd);
        commandsDataRPD.push(getFilename.cmd);
      }

      console.log(`Commande chargée | ${dirs} | ${getFilename.help.name}`);
    }
    console.log("\n");
  });

  await rest.put(
    Routes.applicationGuildCommands(
      "1001622361713426505",
      "970247031861948416"
    ),
    {
      body: commandsDataALL,
    }
  );
  await rest.put(
    Routes.applicationGuildCommands(
      "1001622361713426505",
      "909391088614256650"
    ),
    {
      body: commandsDataRPD,
    }
  );
};
console.log("\n");
const loadEvents = (dir = "./events//") => {
  fs.readdirSync(dir).forEach((dirs) => {
    const events = fs
      .readdirSync(`${dir}/${dirs}/`)
      .filter((files) => files.endsWith(".js"));
    for (const event of events) {
      const evt = require(`${dir}/${dirs}/${event}`);
      const evtName = event.split(".")[0];
      client.on(evtName, evt.bind(null, client));
      console.log(`Evenement chargé | ${dirs} | ${evtName}`);
    }
    console.log("\n");
  });
};

loadCommands();
loadEvents();

client.login(process.env.TOKEN);
