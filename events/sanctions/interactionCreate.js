const { Modal, TextInputComponent, showModal } = require("discord-modals");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = async (client, interaction) => {
  if (interaction.isButton()) {
    switch (interaction.customId) {
      case "validate-sanction":
        var form = new Modal()
          .setTitle("Sanction - Appliquer")
          .setCustomId("applicate-sanction-form")
          .addComponents(
            new TextInputComponent()
              .setCustomId("sanction")
              .setLabel("Sanction (MaP/Blacklist ou BL)")
              .setMaxLength(8)
              .setMinLength(2)
              .setRequired(true)
              .setStyle("SHORT")
              .setPlaceholder("BL ou Blacklist ou MaP"),
            new TextInputComponent()
              .setCustomId("duree")
              .setDefaultValue("0")
              .setLabel("Durée de la mise à pied en J (0 si Blacklist)")
              .setRequired(true)
              .setStyle("SHORT")
          );
        showModal(form, { interaction: interaction, client: client });
        break;
      case "modify-sanction":
        var embed = new MessageEmbed(interaction.message.embeds[0]);
        var form = new Modal()
          .setTitle("Informations De La Sanction")
          .setCustomId("sanction-form-modify")
          .addComponents(
            new TextInputComponent()
              .setCustomId("sanction-form-name")
              .setLabel("Nom de la personne")
              .setPlaceholder("Exemple: Eric Durand")
              .setDefaultValue(embed.fields[0].value)
              .setStyle("SHORT")
              .setRequired(true),
            new TextInputComponent()
              .setCustomId("sanction-form-rank")
              .setLabel("Grade de la personne")
              .setDefaultValue(embed.fields[1].value)
              .setPlaceholder("Exemple: Chief")
              .setStyle("SHORT")
              .setRequired(true),
            new TextInputComponent()
              .setCustomId("sanction-form-steamid")
              .setLabel("Nom de la personne")
              .setDefaultValue(embed.fields[2].value)
              .setPlaceholder("Exemple: STEAM_0:0:233859207")
              .setStyle("SHORT")
              .setRequired(true),
            new TextInputComponent()
              .setCustomId("sanction-form-raison")
              .setLabel("Raison de la sanction")
              .setDefaultValue(embed.fields[3].value)
              .setStyle("LONG")
              .setPlaceholder("Détaillez au maximum celle ci")
              .setRequired(true),
            new TextInputComponent()
              .setCustomId("sanction-form-preuve")
              .setLabel("Preuves (Rec sur youtube)")
              .setDefaultValue(embed.fields[4].value)
              .setStyle("SHORT")
              .setPlaceholder("Liens de la vidéo en non repertorié")
              .setRequired(true)
          );

        showModal(form, { interaction: interaction, client: client });
        break;
      default:
        break;
    }
  }
  if (interaction.isModalSubmit()) {
    if (interaction.customId == "applicate-sanction-form") {
      var embed = new MessageEmbed(interaction.message.embeds[0]);

      var infos = {
        name: embed.fields[0].value,
        grade: embed.fields[1].value,
        steamid: embed.fields[2].value,
        raison: embed.fields[3].value,
        duree: interaction.fields.getTextInputValue("duree"),
      };
      infos.raison = infos.raison.split("\n").join("\n> ");

      if (
        interaction.fields.getTextInputValue("sanction").toLowerCase() ==
          "bl" ||
        interaction.fields.getTextInputValue("sanction").toLowerCase() ==
          "blacklist"
      ) {
        interaction.reply("ok");

        var message = `**[Police / ACU]** ${infos.grade} - ${infos.name} *(${infos.steamid})*:
> ${infos.raison}`;

        client.channels
          .fetch("974381611615395840")
          .then((c) => c.send({ content: message }));
      } else if (
        interaction.fields.getTextInputValue("sanction").toLowerCase() == "map"
      ) {
        interaction.reply("ok");

        var message = `**De :** État-Major@rpd-vlife.fr
**À :** ${infos.name}
**Objet :** __Mise à pied__
        
**Contenue du mail :**
        
Suite à certains de vos agissements et sur présentation de preuves, vous êtes mis à pied ${infos.duree} jours avec effet immédiat pour les raisons suivantes:
        
> ${infos.raison}
        
Pour toutes autres informations, je vous prie de m'envoyer un mail.
        
Pendant cette mise à pied, votre tenue devras rester au placard, si nous voyons avec celle-ci, je serais contraint de vous retirer votre insigne de police ainsi que votre arme de service. 
        
__Cordialement,__
__L'État Major RPD.__`;

        client.channels
          .fetch("974381611615395840")
          .then((c) => c.send({ content: message }));
      } else {
        interaction.reply({
          content: "Une erreur est survenue !",
          ephemeral: true,
        });
      }
    }
    if (interaction.customId == "sanction-form-modify") {
      var embed = new MessageEmbed(interaction.message.embeds[0]);
      embed.fields[0].value =
        interaction.fields.getTextInputValue("sanction-form-name");
      embed.fields[1].value =
        interaction.fields.getTextInputValue("sanction-form-rank");
      embed.fields[2].value = interaction.fields.getTextInputValue(
        "sanction-form-steamid"
      );
      embed.fields[3].value = interaction.fields.getTextInputValue(
        "sanction-form-raison"
      );
      embed.fields[4].value = interaction.fields.getTextInputValue(
        "sanction-form-preuve"
      );

      interaction.update({ embeds: [embed] });
    }
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
