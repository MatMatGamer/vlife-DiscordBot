const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  MessageActionRow,
  MessageSelectMenu,
  MessageEmbed,
  MessageButton,
} = require("discord.js");
const fs = require("fs");

const data = {
  name: "plainte",
  description: "Permet de faire une plainte police",
};
module.exports = {
  help: {
    name: data.name,
    description: data.description,
  },
  cmd: new SlashCommandBuilder()
    .setName(data.name)
    .setDescription(data.description)
    .setDefaultPermission(false)
    .toJSON(),
  run: async (client, interaction) => {
    interaction.reply({
      content: "test",
      components: [
        new MessageActionRow().addComponents(
          new MessageButton()
            .setCustomId("plainte")
            .setLabel("Faire une plainte")
            .setStyle("DANGER")
        ),
      ],
    });
  },
};
