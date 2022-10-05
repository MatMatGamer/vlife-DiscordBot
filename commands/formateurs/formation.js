const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  MessageActionRow,
  MessageSelectMenu,
  MessageEmbed,
  MessageButton,
} = require("discord.js");
const {
  Modal,
  TextInputComponent,
  SelectMenuComponent,
  showModal,
} = require("discord-modals");
const fs = require("fs");

const data = {
  name: "formation",
  description: "Permet de lancer une formation",
};

module.exports = {
  serv: "RPD",
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
    var form = new Modal()
      .setCustomId("formation-create")
      .setTitle("Lancer une Formation")
      .addComponents(
        new TextInputComponent()
          .setCustomId("forma")
          .setLabel("Formation ?")
          .setStyle("SHORT")
          .setRequired(true)
          .setPlaceholder("Exemple: Connaissance"),
        new TextInputComponent()
          .setCustomId("date")
          .setLabel("Date ?")
          .setStyle("SHORT")
          .setRequired(true)
          .setPlaceholder("Exemple: 01/01/2022"),
        new TextInputComponent()
          .setCustomId("heure")
          .setLabel("Heure ?")
          .setStyle("SHORT")
          .setRequired(true)
          .setPlaceholder("Exemple: 18h02"),
        new TextInputComponent()
          .setCustomId("formateurs")
          .setLabel("Formateurs ? (id séparé par des virgules)")
          .setStyle("SHORT")
          .setRequired(false)
          .setPlaceholder("Exemple: 263723195784364042,394096450444853249")
      );

    await showModal(form, { client: client, interaction: interaction });
  },
};
