const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  MessageActionRow,
  MessageSelectMenu,
  MessageEmbed,
  MessageButton,
} = require("discord.js");
const fs = require("fs");

const data = {
  name: "casier",
  description: "Permet de gérer le casier d'une personne",
};
module.exports = {
  help: {
    name: data.name,
    description: data.description,
  },
  cmd: new SlashCommandBuilder()
    .setName(data.name)
    .setDescription(data.description)
    .addSubcommand((subcmd) =>
      subcmd
        .setName("add")
        .setDescription("Permet d'ajouter une entrée dans un casier judiciaire")
        .addStringOption((opt) =>
          opt
            .setName("prenom")
            .setDescription("Prénom de la personne")
            .setRequired(true)
        )
        .addStringOption((opt) =>
          opt
            .setName("nom")
            .setDescription("Nom de la personne")
            .setRequired(true)
        )
    )
    .addSubcommand((subcmd) =>
      subcmd
        .setName("get")
        .setDescription(
          "Permet d'obtenir des informations d'un casier judiciaire"
        )
        .addStringOption((opt) =>
          opt
            .setName("prenom")
            .setDescription("Prénom de la personne")
            .setRequired(true)
        )
        .addStringOption((opt) =>
          opt
            .setName("nom")
            .setDescription("Nom de la personne")
            .setRequired(true)
        )
        .addStringOption((opt) =>
          opt
            .setName("information")
            .setDescription(
              "Information du casier judiciaire que vous souhaitez avoir"
            )
            .addChoice("All", "All")
            .addChoice("Total Amendes", "Total Amendes")
            .addChoice("Reste à payer", "Reste à payer")
            .setRequired(true)
        )
    )
    .toJSON(),
  run: async (client, interaction) => {
    switch (interaction.options.getSubcommand()) {
      case "get":
        var prenom = interaction.options.getString("prenom");
        var nom = interaction.options.getString("nom");
        if (interaction.options.getString("information") == "Total Amendes") {
          await interaction.reply("Calcul en cours...");
          require("../../events/casier/modules/get.js").TotalAmendes(
            prenom,
            nom,
            (total) => {
              if (total != "ErreurCasier") {
                var embed = new MessageEmbed()
                  .setTitle(
                    "Casier de " +
                      interaction.options.getString("prenom").toLowerCase() +
                      " " +
                      interaction.options.getString("nom").toLowerCase()
                  )
                  .setDescription(
                    `Cette personne à eu un total d'amende s'élevant à ${total}`
                  );
                interaction.editReply({ content: " ", embeds: [embed] });
              } else {
                var embed = new MessageEmbed()
                  .setTitle(
                    "Casier de " +
                      interaction.options.getString("prenom").toLowerCase() +
                      " " +
                      interaction.options.getString("nom").toLowerCase()
                  )
                  .setDescription(
                    `<:non:1003661150715650098> Cette personne ne posséde pas de casier judiciaire ici`
                  );
                interaction.editReply({ content: " ", embeds: [embed] });
              }
            }
          );
        } else if (
          interaction.options.getString("information") == "Reste à payer"
        ) {
          await interaction.reply("Calcul en cours...");
          require("../../events/casier/modules/get.js").TotalAmendesImpayé(
            prenom,
            nom,
            (total) => {
              if (total != "ErreurCasier") {
                var embed = new MessageEmbed()
                  .setTitle(
                    "Casier de " +
                      interaction.options.getString("prenom").toLowerCase() +
                      " " +
                      interaction.options.getString("nom").toLowerCase()
                  )
                  .setDescription(
                    `Cette personne à un total d'amende impayé s'élevant à ${total}`
                  );
                interaction.editReply({ content: " ", embeds: [embed] });
              } else {
                var embed = new MessageEmbed()
                  .setTitle(
                    "Casier de " +
                      interaction.options.getString("prenom").toLowerCase() +
                      " " +
                      interaction.options.getString("nom").toLowerCase()
                  )
                  .setDescription(
                    `<:non:1003661150715650098> Cette personne ne posséde pas de casier judiciaire ici`
                  );
                interaction.editReply({ content: " ", embeds: [embed] });
              }
            }
          );
        } else if (interaction.options.getString("information") == "All") {
          await interaction.reply("Calcul en cours...");
          require("../../events/casier/modules/get.js").TotalAmendes(
            prenom,
            nom,
            (total) => {
              require("../../events/casier/modules/get.js").TotalAmendesImpayé(
                prenom,
                nom,
                (totalImpayé) => {
                  if (total != "ErreurCasier") {
                    var embed = new MessageEmbed()
                      .setTitle(
                        "Casier de " +
                          interaction.options
                            .getString("prenom")
                            .toLowerCase() +
                          " " +
                          interaction.options.getString("nom").toLowerCase()
                      )
                      .setDescription(
                        `Cette personne à un total d'amende s'élevant à ${total} avec une somme impayé qui s'éléve à ${totalImpayé}`
                      );
                    interaction.editReply({ content: " ", embeds: [embed] });
                  } else {
                    var embed = new MessageEmbed()
                      .setTitle(
                        "Casier de " +
                          interaction.options
                            .getString("prenom")
                            .toLowerCase() +
                          " " +
                          interaction.options.getString("nom").toLowerCase()
                      )
                      .setDescription(
                        `<:non:1003661150715650098> Cette personne ne posséde pas de casier judiciaire ici`
                      );
                    interaction.editReply({ content: " ", embeds: [embed] });
                  }
                }
              );
            }
          );
        }
        break;
      case "add":
        var delitsR = new MessageActionRow().addComponents(
          new MessageSelectMenu()
            .setCustomId("délitsR")
            .setPlaceholder("Délits Routiers")
            .setOptions([
              { label: "Délit de fuite", value: "Délit de fuite" },
              { label: "Conduite dangereuse", value: "Conduite dangereuse" },
              { label: "Excès de vitesse", value: "Excès de vitesse" },
              {
                label: "Stationnement interdit",
                value: "Stationnement interdit",
              },
              { label: "Refus de priorité", value: "Refus de priorité" },
              {
                label: "Dépassement non autorisé",
                value: "Dépassement non autorisé",
              },
              {
                label: "Autre délits routiers (Cumulable Soon)",
                value: "Autre délits routiers (Cumulable)",
              },
            ])
            .setMinValues(0)
            .setMaxValues(7)
        );
        var armes = new MessageActionRow().addComponents(
          new MessageSelectMenu()
            .setCustomId("armes")
            .setPlaceholder("Armes / Meurtres / Tentative de meurtre")
            .setOptions([
              {
                label: "Possession d'arme lourde (Cumulable)",
                value: "Possession d'arme lourde (Cumulable)",
              },
              {
                label: "Possession d'arme de poing (Cumulable)",
                value: "Possession d'arme de poing (Cumulable)",
              },
              { label: "Tir sur agent", value: "Tir sur agent" },
              { label: "Tir sur civil", value: "Tir sur civil" },
              {
                label: "Meurtre sur haut fonctionnaire de l'état",
                value: "Meurtre sur haut fonctionnaire de l'état",
              },
              { label: "Meurtre sur agent", value: "Meurtre sur agent" },
              { label: "Meurtre sur civil", value: "Meurtre sur civil" },
              {
                label: "Tentative de meurtre sur haut fonctionnaire de l'état",
                value: "Tentative de meurtre sur haut fonctionnaire de l'état",
              },
              {
                label: "Tentative de meurtre sur agent",
                value: "Tentative de meurtre sur agent",
              },
              {
                label: "Tentative de meurtre sur civil",
                value: "Tentative de meurtre sur civil",
              },
            ])
            .setMinValues(0)
            .setMaxValues(10)
        );
        var braquage = new MessageActionRow().addComponents(
          new MessageSelectMenu()
            .setCustomId("braquage")
            .setPlaceholder("Braquages / Prise D'otage")
            .setOptions([
              {
                label: "Assaut du poste de police",
                value: "Assaut du poste de police",
              },
              { label: "Braquage de banque", value: "Braquage de banque" },
              {
                label: "Braquage de Bijouterie",
                value: "Braquage de Bijouterie",
              },
              {
                label: "Braquage de Superette",
                value: "Braquage de Superette",
              },
              { label: "Racket", value: "Racket" },
              { label: "Cambriolage", value: "Cambriolage" },
              { label: "Vol de véhicule", value: "Vol de véhicule" },
              {
                label: "Prise d'otage sur haut fonctionnaire de l'état",
                value: "Prise d'otage sur haut fonctionnaire de l'état",
              },
              {
                label: "Prise d'otage sur agent",
                value: "Prise d'otage sur agent",
              },
              {
                label: "Prise d'otage sur civil",
                value: "Prise d'otage sur civil",
              },
            ])
            .setMinValues(0)
            .setMaxValues(10)
        );
        var divers = new MessageActionRow().addComponents(
          new MessageSelectMenu()
            .setCustomId("divers")
            .setPlaceholder("Drogue / Printers / Divers")
            .setOptions([
              {
                label: "Fabrication de drogue",
                value: "Fabrication de drogue",
              },
              {
                label: "Vente de drogue",
                value: "Vente de drogue",
              },
              {
                label: "Possession de Printers",
                value: "Possession de Printers",
              },
              {
                label: "Coup et blessure",
                value: "Coup et blessure",
              },
              {
                label: "Menace de mort",
                value: "Menace de mort",
              },
              {
                label: "Entrave à une intervention de Police",
                value: "Entrave à une intervention de Police",
              },
              {
                label: "Tentative de corruption",
                value: "Tentative de corruption",
              },
              {
                label: "Refus D'obtempérer",
                value: "Refus D'obtempérer",
              },
              {
                label: "Entrée en zone interdite",
                value: "Entrée en zone interdite",
              },
              {
                label: "Outrage à agent",
                value: "Outrage à agent",
              },
            ])
            .setMinValues(0)
            .setMaxValues(10)
        );
        var buttons = new MessageActionRow().addComponents(
          new MessageButton()
            .setCustomId("validateEntry")
            .setLabel("Valider")
            .setStyle("SUCCESS"),
          new MessageButton()
            .setCustomId("cancelEntry")
            .setLabel("Annuler")
            .setStyle("DANGER")
        );
        var embed = new MessageEmbed()
          .setTitle(
            "Casier de " +
              interaction.options.getString("prenom").toLowerCase() +
              " " +
              interaction.options.getString("nom").toLowerCase()
          )
          .setDescription(
            "Pour ajouter une entrée dans le casier, séléctionnez les infractions dans les menus puis appuyer sur le bouton pour valider.\n\n**Infractions Séléctionner :**"
          )
          .addField("Délits Routiers:", "Aucun", true)
          .addField("Armes:", "Aucun", true)
          .addField("Meurtres:", "Aucun", true)
          .addField("Braquages:", "Aucun", true)
          .addField("Prise D'otage:", "Aucun", true)
          .addField("Drogue / Printers:", "Aucun", true)
          .addField("Divers:", "Aucun", true);
        var embed2 = new MessageEmbed()
          .setTitle("Informations sur la personne:")
          .addField(
            "Prénom:",
            interaction.options.getString("prenom").toLowerCase(),
            true
          )
          .addField(
            "Nom:",
            interaction.options.getString("nom").toLowerCase(),
            true
          );
        var casiers = fs.readdirSync("./casiers");
        embed2
          .addField(
            "Posséde déjà un casier:",
            casiers.includes(
              `${interaction.options
                .getString("nom")
                .toLowerCase()}_${interaction.options
                .getString("prenom")
                .toLowerCase()}.json`
            )
              ? "<:oui:994536507840933978> Oui"
              : "<:non:1003661150715650098> Non"
          )
          .addField("Sécurité Informatique n°", `${interaction.user.id}`);
        interaction.reply({
          embeds: [embed, embed2],
          components: [delitsR, armes, braquage, divers, buttons],
        });
        break;

      default:
        break;
    }
  },
};
