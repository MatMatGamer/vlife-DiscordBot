module.exports = (client) => {
  console.log(
    `Bot connected to user ${client.user.id} | ${client.user.username}#${client.user.discriminator}`
  );
};
