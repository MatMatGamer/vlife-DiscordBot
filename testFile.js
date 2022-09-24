const Discord = require("discord.js");
const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const Canvas = require("canvas");

require("dotenv").config(); // .env
const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
  ],
});
const { MessageEmbed } = require("discord.js");

client.on("ready", async (client) => {
  console.log(`${client.user.tag} est prêt !`);
});
client.on("interactionCreate", (interaction) => {
  if (interaction.isModalSubmit()) {
    interaction.fields.getTextInputValue("");
  }
  if (interaction.isButton()) {
    if (interaction.customId == "validateEntry") {
      var délitsR = interaction.message.embeds[0].fields
        .filter((field) => field.name == "Délits Routiers:")
        .map((field) => field.value);
    }
  }
  if (!interaction.isSelectMenu()) return;
  if (interaction.customId === "délitsR") {
    var armes = interaction.message.embeds[0].fields
      .filter((field) => field.name == "Armes:")
      .map((field) => field.value)[0]
      .replace(/-\s/g, "")
      .split("\n");
    armes[0] == "Aucun" ? (armes = null) : (armes = armes);
    armes.find((n) => n == "");

    embed.fields[0].value = interaction.values.join("\n");
    interaction.update({
      embeds: [embed],
    });
  }
});

client.login(process.env.TOKEN);
