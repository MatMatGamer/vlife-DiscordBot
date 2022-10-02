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
  name: "say",
  description: "Permet de faire une demande de sanction police",
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
      .setTitle("Envoyer une annonce")
      .setCustomId("form-announce")
      .addComponents(
        new TextInputComponent()
          .setCustomId("mentions-announceForm")
          .setLabel("ID des mentions séparés par des virgules")
          .setPlaceholder("Exemple: 909391088639410220,909391088639410220")
          .setStyle("SHORT")
          .setRequired(true),
        new TextInputComponent()
          .setCustomId("channel-announceForm")
          .setLabel("ID du channel de l'annonce")
          .setPlaceholder("Exemple: 974381611615395840")
          .setStyle("SHORT")
          .setRequired(true),
        new TextInputComponent()
          .setCustomId("message-announceForm")
          .setLabel("Message")
          .setPlaceholder("Message à faire envoyer")
          .setStyle("LONG")
          .setRequired(true)
      );

    await showModal(form, { client: client, interaction: interaction });
  },
};
