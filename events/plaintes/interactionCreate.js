const { Modal, TextInputComponent, showModal } = require("discord-modals");

module.exports = async (client, interaction) => {
  if (interaction.isButton()) {
    if (interaction.customId == "plainte") {
      var form = new Modal()
        .setCustomId("plainteForm")
        .setTitle("Plainte Police")
        .addComponents(
          new TextInputComponent()
            .setCustomId("textinput-namep")
            .setLabel("Nom De La Personne")
            .setStyle("SHORT")
            .setPlaceholder("Exemple: Eric Durand")
            .setRequired(true)
        );

      await showModal(form, { client: client, interaction: interaction });
    }
  }
};
