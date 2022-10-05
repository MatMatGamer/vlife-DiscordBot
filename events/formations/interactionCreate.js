const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = async (client, interaction) => {
  if (interaction.isModalSubmit()) {
    if (interaction.customId == "formation-create") {
      await interaction.reply({
        content: "Votre formation à été créé avec succès !",
        ephemeral: true,
      });
      var forma = {
        nom: interaction.fields.getTextInputValue("forma"),
        date: interaction.fields.getTextInputValue("date"),
        heure: interaction.fields.getTextInputValue("heure"),
        formateurs: `${interaction.user.id}${
          interaction.fields.getTextInputValue("formateurs") != ""
            ? "," + interaction.fields.getTextInputValue("formateurs")
            : ""
        }`,
      };

      forma.formateurs = forma.formateurs.replace(" ", "").split(",");
      var formateursMess = "";
      forma.formateurs.forEach((m) => {
        formateursMess += `<@${m}>`;
      });

      var messageFormation = `<@&909391088639410220> **Formation**

__Les formateurs :__
> ${formateursMess}
      
__Horaire, Date, et Lieu :__
> Le ${forma.date}
> À ${forma.heure}
> En salle de dispatch
      
__Formation délivré :__
> Badge ${forma.nom}`;

      client.channels
        .fetch("909391089478291470")
        .then((c) => c.send({ content: messageFormation }));

      interaction.guild.scheduledEvents.create({
        name: `Formation ${forma.nom}`,
        scheduledStartTime: new Date(forma.date).setHours(
          parseInt(forma.heure.split("h")[0]),
          parseInt(forma.heure.split("h")[1])
        ),
        scheduledEndTime: new Date(forma.date).setHours(
          parseInt(forma.heure.split("h")[0]) + 1,
          parseInt(forma.heure.split("h")[1])
        ),
        entityType: "EXTERNAL",
        privacyLevel: "GUILD_ONLY",
        description: `Formation ${forma.nom} \n\nRendez-vous au poste de police à l'horaire indiqué`,
        entityMetadata: { location: "Salle de Dispatch" },
        image: "https://temana.fr/wp-content/uploads/formationpro.png",
      });
    }
  }
};
