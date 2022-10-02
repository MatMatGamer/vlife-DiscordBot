const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = async (client, interaction) => {
  if (interaction.isModalSubmit()) {
    if (interaction.customId == "form-announce") {
      await interaction.reply({
        content: "Votre annonce à été envoyé avec succès !",
        ephemeral: true,
      });

      var mess = {
        mentions: interaction.fields.getTextInputValue("mentions-announceForm"),
        channel: interaction.fields.getTextInputValue("channel-announceForm"),
        message: interaction.fields.getTextInputValue("message-announceForm"),
      };

      var message = "";
      mess.mentions = mess.mentions.replace(" ", "").split(",");
      mess.mentions.forEach((m) => {
        message += `<@&${m}>,`;
      });

      message = `${message}
      
**Bonjour à tous et à toutes,**

${mess.message}

**__Cordialement,__**
**__L'État Major RPD.__**`;

      client.channels
        .fetch(mess.channel)
        .then((c) => c.send({ content: message }));
    }
  }
};
