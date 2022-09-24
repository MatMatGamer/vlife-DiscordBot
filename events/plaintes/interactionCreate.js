const {
  Modal,
  TextInputComponent,
  SelectMenuComponent,
  showModal,
} = require("discord-modals");
const { MessageEmbed } = require("discord.js");

module.exports = async (client, interaction) => {
  if (interaction.isModalSubmit()) {
    if (interaction.customId === "plainteForm") {
      await interaction.reply({
        content: "Votre plainte à été envoyé avec succès !",
        ephemeral: true,
      });

      var plainte = {
        name: interaction.fields.getTextInputValue("textinput-name"),
        grade: interaction.fields.getTextInputValue("textinput-grade"),
        raison: interaction.fields.getTextInputValue("textinput-raison"),
        preuve: interaction.fields.getTextInputValue("textinput-preuve"),
      };

      var embed = new MessageEmbed()
        .setTitle(`👮 Plainte Police`)
        .setDescription(`Plainte police faite par <@${interaction.user.id}>`)
        .addField("Nom :", `${plainte.name}`)
        .addField("Grade :", `${plainte.grade}`)
        .addField("Raison :", `${plainte.raison}`)
        .addField("Preuve :", `${plainte.preuve}`)
        .setFooter("RPD Vlife")
        .setColor("DARK_RED")
        .setTimestamp(new Date());

      client.channels
        .fetch("1023292844389183558")
        .then((c) => c.send({ embeds: [embed] }));
    }
  }
  if (interaction.isButton()) {
    if (interaction.customId == "plainte") {
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
    }
  }
};
