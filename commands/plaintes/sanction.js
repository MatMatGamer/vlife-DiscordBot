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
  name: "sanction",
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
      .setTitle("Informations De La Sanction")
      .setCustomId("sanction-form-joueur")
      .addComponents(
        new TextInputComponent()
          .setCustomId("sanction-form-name")
          .setLabel("Nom de la personne")
          .setPlaceholder("Exemple: Eric Durand")
          .setStyle("SHORT")
          .setRequired(true),
        new TextInputComponent()
          .setCustomId("sanction-form-rank")
          .setLabel("Grade de la personne")
          .setPlaceholder("Exemple: Chief")
          .setStyle("SHORT")
          .setRequired(true),
        new TextInputComponent()
          .setCustomId("sanction-form-steamid")
          .setLabel("Nom de la personne")
          .setPlaceholder("Exemple: STEAM_0:0:233859207")
          .setStyle("SHORT")
          .setRequired(true),
        new TextInputComponent()
          .setCustomId("sanction-form-raison")
          .setLabel("Raison de la sanction")
          .setStyle("LONG")
          .setPlaceholder("Détaillez au maximum celle ci")
          .setRequired(true),
        new TextInputComponent()
          .setCustomId("sanction-form-preuve")
          .setLabel("Preuves (Rec sur youtube)")
          .setStyle("SHORT")
          .setPlaceholder("Liens de la vidéo en non repertorié")
          .setRequired(true)
      );

    await showModal(form, { client: client, interaction: interaction });
  },
};
