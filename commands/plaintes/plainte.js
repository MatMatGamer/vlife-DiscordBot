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
    var form = new Modal()
      .setCustomId("plainteForm")
      .setTitle("Plainte Police")
      .addComponents(
        new TextInputComponent()
          .setCustomId("textinput-name")
          .setLabel("Nom De La Personne")
          .setStyle("SHORT")
          .setPlaceholder("Exemple: Eric Durand")
          .setRequired(true),
        new TextInputComponent()
          .setCustomId("textinput-grade")
          .setLabel("Grade De La Personne")
          .setStyle("SHORT")
          .setPlaceholder("Exemple: Chief")
          .setRequired(true),
        new TextInputComponent()
          .setCustomId("textinput-steamid")
          .setLabel("SteamID De La Personne")
          .setStyle("SHORT")
          .setPlaceholder("Exemple: STEAM_0:0:233859207")
          .setRequired(true),
        new TextInputComponent()
          .setCustomId("textinput-raison")
          .setLabel("Raison de la plainte")
          .setStyle("LONG")
          .setPlaceholder("Détaillez au maximum")
          .setRequired(true),
        new TextInputComponent()
          .setCustomId("textinput-preuve")
          .setLabel("Preuves (Rec sur youtube)")
          .setStyle("SHORT")
          .setPlaceholder("Liens de la vidéo en non repertorié")
          .setRequired(true)
      );

    await showModal(form, { client: client, interaction: interaction });
  },
};
