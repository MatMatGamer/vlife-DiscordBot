const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = async (client, interaction) => {
  if (interaction.isButton()) {
    switch (interaction.customId) {
      case "validate-sanction":
        var form;
        break;
      default:
        break;
    }
  }
  if (interaction.isModalSubmit()) {
    if (interaction.customId == "sanction-form-joueur") {
      await interaction.reply({
        content: "Votre demande de sanction à été envoyé avec succès !",
        ephemeral: true,
      });

      var plainte = {
        name: interaction.fields.getTextInputValue("sanction-form-name"),
        grade: interaction.fields.getTextInputValue("sanction-form-rank"),
        steamid: interaction.fields.getTextInputValue("sanction-form-steamid"),
        raison: interaction.fields.getTextInputValue("sanction-form-raison"),
        preuve: interaction.fields.getTextInputValue("sanction-form-preuve"),
      };

      var embed = new MessageEmbed()
        .setTitle(`👮 Demande De Sanction`)
        .setDescription(
          `Demande de sanction faite par <@${interaction.user.id}>`
        )
        .addField("Nom :", `${plainte.name}`)
        .addField("Grade :", `${plainte.grade}`)
        .addField("SteamID :", `${plainte.steamid}`)
        .addField("Raison :", `${plainte.raison}`)
        .addField("Preuve :", `${plainte.preuve}`)
        .setFooter("RPD Vlife")
        .setColor("RED")
        .setTimestamp(new Date());

      var buttons = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId("validate-sanction")
          .setEmoji({ name: "✅" })
          .setLabel("Appliquer la sanction")
          .setStyle("SUCCESS"),
        new MessageButton()
          .setCustomId("modify-sanction")
          .setEmoji({ name: "➖" })
          .setLabel("Modifier la sanction")
          .setStyle("SECONDARY"),
        new MessageButton()
          .setCustomId("cancel-sanction")
          .setEmoji({ name: "❌" })
          .setLabel("Refuser la sanction")
          .setStyle("DANGER")
      );

      client.channels
        .fetch("967844574615732274")
        .then((c) => c.send({ embeds: [embed], components: [buttons] }));
    }
  }
};
