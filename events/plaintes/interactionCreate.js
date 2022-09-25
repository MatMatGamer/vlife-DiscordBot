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
        steamid: interaction.fields.getTextInputValue("textinput-steamid"),
        raison: interaction.fields.getTextInputValue("textinput-raison"),
        preuve: interaction.fields.getTextInputValue("textinput-preuve"),
      };

      var embed = new MessageEmbed()
        .setTitle(`👮 Plainte Police`)
        .setDescription(`Plainte police faite par <@${interaction.user.id}>`)
        .addField("Nom :", `${plainte.name}`)
        .addField("Grade :", `${plainte.grade}`)
        .addField("SteamID :", `${plainte.steamid}`)
        .addField("Raison :", `${plainte.raison}`)
        .addField("Preuve :", `${plainte.preuve}`)
        .setFooter("RPD Vlife")
        .setColor("RED")
        .setTimestamp(new Date());

      client.channels
        .fetch("1023292844389183558")
        .then((c) => c.send({ embeds: [embed] }));
    }
  }
};
