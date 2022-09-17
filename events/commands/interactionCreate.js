module.exports = async (client, interaction) => {
  if (interaction.isCommand()) {
    client.commands.get(interaction.commandName).run(client, interaction);
  }
};
