const {
  MessageActionRow,
  MessageSelectMenu,
  MessageEmbed,
  MessageButton,
} = require("discord.js");

var AmendeList = {
  "Délit de fuite": 4000,
  "Conduite dangereuse": 3000,
  "Excès de vitesse": 2000,
  "Stationnement interdit": 2000,
  "Refus de priorité": 2000,
  "Dépassement non autorisé": 2000,
  "Autre délits routiers (Cumulable)": 2000,

  "Possession d'arme lourde (Cumulable)": 15000,
  "Possession d'arme de poing (Cumulable)": 10000,
  "Tir sur agent": 20000,
  "Tir sur civil": 15000,

  "Meurtre sur haut fonctionnaire de l'état": 300000,
  "Meurtre sur agent": 200000,
  "Meurtre sur civil": 100000,
  "Tentative de meurtre sur haut fonctionnaire de l'état": 200000,
  "Tentative de meurtre sur agent": 100000,
  "Tentative de meurtre sur civil": 80000,
  "Assaut du poste de police": 150000,
  "Braquage de banque": 50000,
  "Braquage de Bijouterie": 30000,
  "Braquage de Superette": 30000,
  Racket: 15000,
  Cambriolage: 15000,
  "Vol de véhicule": 10000,
  "Prise d'otage sur haut fonctionnaire de l'état": 50000,
  "Prise d'otage sur agent": 40000,
  "Prise d'otage sur civil": 30000,
  "Possession de Printers": 15000,
  "Vente de drogue": 15000,
  "Fabrication de drogue": 25000,
  "Menace de mort": 7000,
  "Coup et blessure": 7000,
  "Entrave à une intervention de Police": 7000,
  "Tentative de corruption": 7000,
  "Refus D'obtempérer": 7000,
  "Entrée en zone interdite": 7000,
  "Outrage à agent": 7000,
};
module.exports = async (client, interaction) => {
  if (interaction.isButton()) {
    if (
      interaction.customId.startsWith("armeLeg+") ||
      interaction.customId.startsWith("armeLeg-")
    ) {
      var sécu = new MessageEmbed(interaction.message.embeds[1]).fields
        .filter((field) => field.name == "Sécurité Informatique n°")
        .map((field) => field.value)[0];
      if (sécu != interaction.user.id)
        return interaction.reply({
          content: "La sécurité informatique vous empêche de faire cela !",
          ephemeral: true,
        });
      var embed = new MessageEmbed(interaction.message.embeds[0]);
      var nb = parseInt(
        embed.fields
          .filter((field) => field.name == "Nombre d'armes Légéres:")
          .map((field) => field.value)[0]
      );
      embed.fields.find(
        (field) => field.name == "Nombre d'armes Légéres:"
      ).value = interaction.customId.startsWith("armeLeg+")
        ? `${nb + 1}`
        : `${nb - 1}`;

      interaction.update({
        embeds: [embed, new MessageEmbed(interaction.message.embeds[1])],
      });
    }
    if (
      interaction.customId.startsWith("armeLourde+") ||
      interaction.customId.startsWith("armeLourde-")
    ) {
      var sécu = new MessageEmbed(interaction.message.embeds[1]).fields
        .filter((field) => field.name == "Sécurité Informatique n°")
        .map((field) => field.value)[0];
      if (sécu != interaction.user.id)
        return interaction.reply({
          content: "La sécurité informatique vous empêche de faire cela !",
          ephemeral: true,
        });
      var embed = new MessageEmbed(interaction.message.embeds[0]);
      var nb = parseInt(
        embed.fields
          .filter((field) => field.name == "Nombre d'armes Lourdes:")
          .map((field) => field.value)[0]
      );
      embed.fields.find(
        (field) => field.name == "Nombre d'armes Lourdes:"
      ).value = interaction.customId.startsWith("armeLourde+")
        ? `${nb + 1}`
        : `${nb - 1}`;

      interaction.update({
        embeds: [embed, new MessageEmbed(interaction.message.embeds[1])],
      });
    }
    if (
      interaction.customId.startsWith("autreDelitR+") ||
      interaction.customId.startsWith("autreDelitR-")
    ) {
      var sécu = new MessageEmbed(interaction.message.embeds[1]).fields
        .filter((field) => field.name == "Sécurité Informatique n°")
        .map((field) => field.value)[0];
      if (sécu != interaction.user.id)
        return interaction.reply({
          content: "La sécurité informatique vous empêche de faire cela !",
          ephemeral: true,
        });
      var embed = new MessageEmbed(interaction.message.embeds[0]);
      var nb = parseInt(
        embed.fields
          .filter((field) => field.name == "Nombre d'autres délits routiers:")
          .map((field) => field.value)[0]
      );
      embed.fields.find(
        (field) => field.name == "Nombre d'autres délits routiers:"
      ).value = interaction.customId.startsWith("autreDelitR+")
        ? `${nb + 1}`
        : `${nb - 1}`;

      interaction.update({
        embeds: [embed, new MessageEmbed(interaction.message.embeds[1])],
      });
    }
    if (
      interaction.customId.startsWith("Amende+") ||
      interaction.customId.startsWith("Amende-")
    ) {
      var sécu = new MessageEmbed(interaction.message.embeds[1]).fields
        .filter((field) => field.name == "Sécurité Informatique n°")
        .map((field) => field.value)[0];
      if (sécu != interaction.user.id)
        return interaction.reply({
          content: "La sécurité informatique vous empêche de faire cela !",
          ephemeral: true,
        });
      var row = new MessageActionRow(interaction.message.components[0]);
      var row2 = new MessageActionRow(interaction.message.components[1]);
      var embed = new MessageEmbed(interaction.message.embeds[0]);
      var embed2 = new MessageEmbed(interaction.message.embeds[1]);
      var embed3 = new MessageEmbed(interaction.message.embeds[2]);
      var buttons = new MessageActionRow(interaction.message.components[2]);

      if (
        interaction.message.embeds[2].fields.filter(
          (field) => field.name == "Reste à payer:"
        ).length == 0
      ) {
        var amende = parseInt(embed3.fields[1].value);
        if (interaction.customId.startsWith("Amende+")) {
          amende += parseInt(interaction.customId.replace("Amende+", ""));
        } else {
          amende -= parseInt(interaction.customId.replace("Amende-", ""));
        }
        embed3.fields[1].value = `${amende}`;
        var max = parseInt(embed3.fields[0].value);

        amende + 10000 > max
          ? row.components[0].setDisabled(true)
          : row.components[0].setDisabled(false);
        amende + 1000 > max
          ? row.components[1].setDisabled(true)
          : row.components[1].setDisabled(false);
        amende + 100 > max
          ? row.components[2].setDisabled(true)
          : row.components[2].setDisabled(false);
        amende + 10 > max
          ? row.components[3].setDisabled(true)
          : row.components[3].setDisabled(false);
        amende + 1 > max
          ? row.components[4].setDisabled(true)
          : row.components[4].setDisabled(false);

        amende - 10000 < 0
          ? row2.components[0].setDisabled(true)
          : row2.components[0].setDisabled(false);
        amende - 1000 < 0
          ? row2.components[1].setDisabled(true)
          : row2.components[1].setDisabled(false);
        amende - 100 < 0
          ? row2.components[2].setDisabled(true)
          : row2.components[2].setDisabled(false);
        amende - 10 < 0
          ? row2.components[3].setDisabled(true)
          : row2.components[3].setDisabled(false);
        amende - 1 < 0
          ? row2.components[4].setDisabled(true)
          : row2.components[4].setDisabled(false);
      } else {
        var amende = parseInt(embed3.fields[3].value);
        if (interaction.customId.startsWith("Amende+")) {
          amende += parseInt(interaction.customId.replace("Amende+", ""));
        } else {
          amende -= parseInt(interaction.customId.replace("Amende-", ""));
        }
        embed3.fields[3].value = `${amende}`;
        var max = parseInt(embed3.fields[1].value);

        amende + 10000 > max
          ? row.components[0].setDisabled(true)
          : row.components[0].setDisabled(false);
        amende + 1000 > max
          ? row.components[1].setDisabled(true)
          : row.components[1].setDisabled(false);
        amende + 100 > max
          ? row.components[2].setDisabled(true)
          : row.components[2].setDisabled(false);
        amende + 10 > max
          ? row.components[3].setDisabled(true)
          : row.components[3].setDisabled(false);
        amende + 1 > max
          ? row.components[4].setDisabled(true)
          : row.components[4].setDisabled(false);

        amende - 10000 < 0
          ? row2.components[0].setDisabled(true)
          : row2.components[0].setDisabled(false);
        amende - 1000 < 0
          ? row2.components[1].setDisabled(true)
          : row2.components[1].setDisabled(false);
        amende - 100 < 0
          ? row2.components[2].setDisabled(true)
          : row2.components[2].setDisabled(false);
        amende - 10 < 0
          ? row2.components[3].setDisabled(true)
          : row2.components[3].setDisabled(false);
        amende - 1 < 0
          ? row2.components[4].setDisabled(true)
          : row2.components[4].setDisabled(false);
      }

      interaction.update({
        embeds: [embed, embed2, embed3],
        components: [row, row2, buttons],
      });
    }
    if (interaction.customId == "validateEntry") {
      var sécu = new MessageEmbed(interaction.message.embeds[1]).fields
        .filter((field) => field.name == "Sécurité Informatique n°")
        .map((field) => field.value)[0];
      if (sécu != interaction.user.id)
        return interaction.reply({
          content: "La sécurité informatique vous empêche de faire cela !",
          ephemeral: true,
        });
      var nom = interaction.message.embeds[1].fields[1].value;
      var prenom = interaction.message.embeds[1].fields[0].value;

      var délitsR = interaction.message.embeds[0].fields
        .filter((field) => field.name == "Délits Routiers:")
        .map((field) => field.value)[0]
        .replace(/-\s/g, "")
        .split("\n");
      délitsR[0] == "Aucun" ? (délitsR = null) : (délitsR = délitsR);
      if (
        délitsR &&
        délitsR.includes("Autre délits routiers (Cumulable)") &&
        interaction.message.embeds[0].fields.filter(
          (field) => field.name == "Nombre d'autres délits routiers:"
        ).length == 0
      ) {
        var buttons = new MessageActionRow().addComponents(
          new MessageButton()
            .setCustomId("autreDelitR+1")
            .setLabel("1 délit routier")
            .setEmoji({ name: "➕" })
            .setStyle("SUCCESS"),
          new MessageButton()
            .setCustomId("autreDelitR-1")
            .setLabel("1 délit routier")
            .setEmoji({ name: "➖" })
            .setStyle("DANGER")
        );

        var buttons2 = new MessageActionRow().addComponents(
          new MessageButton()
            .setCustomId("validateEntry")
            .setLabel("Valider")
            .setStyle("SUCCESS"),
          new MessageButton()
            .setCustomId("cancelEntry")
            .setLabel("Annuler")
            .setStyle("DANGER")
        );
        interaction.update({
          embeds: [
            new MessageEmbed(interaction.message.embeds[0]).addField(
              "Nombre d'autres délits routiers:",
              "1",
              true
            ),
            new MessageEmbed(interaction.message.embeds[1]),
          ],
          components: [buttons, buttons2],
        });
        return;
      }

      var armes = interaction.message.embeds[0].fields
        .filter((field) => field.name == "Armes:")
        .map((field) => field.value)[0]
        .replace(/-\s/g, "")
        .split("\n");
      armes[0] == "Aucun" ? (armes = null) : (armes = armes);
      if (
        armes &&
        armes.includes("Possession d'arme de poing (Cumulable)") &&
        interaction.message.embeds[0].fields.filter(
          (field) => field.name == "Nombre d'armes Légéres:"
        ).length == 0
      ) {
        var buttons = new MessageActionRow().addComponents(
          new MessageButton()
            .setCustomId("armeLeg+1")
            .setLabel("1 arme légére")
            .setEmoji({ name: "➕" })
            .setStyle("SUCCESS"),
          new MessageButton()
            .setCustomId("armeLeg-1")
            .setLabel("1 arme légére")
            .setEmoji({ name: "➖" })
            .setStyle("DANGER")
        );

        var buttons2 = new MessageActionRow().addComponents(
          new MessageButton()
            .setCustomId("validateEntry")
            .setLabel("Valider")
            .setStyle("SUCCESS"),
          new MessageButton()
            .setCustomId("cancelEntry")
            .setLabel("Annuler")
            .setStyle("DANGER")
        );
        interaction.update({
          embeds: [
            new MessageEmbed(interaction.message.embeds[0]).addField(
              "Nombre d'armes Légéres:",
              "1",
              true
            ),
            new MessageEmbed(interaction.message.embeds[1]),
          ],
          components: [buttons, buttons2],
        });
        return;
      }

      if (
        armes &&
        armes.includes("Possession d'arme lourde (Cumulable)") &&
        interaction.message.embeds[0].fields.filter(
          (field) => field.name == "Nombre d'armes Lourdes:"
        ).length == 0
      ) {
        var buttons = new MessageActionRow().addComponents(
          new MessageButton()
            .setCustomId("armeLourde+1")
            .setLabel("1 arme Lourde")
            .setEmoji({ name: "➕" })
            .setStyle("SUCCESS"),
          new MessageButton()
            .setCustomId("armeLourde-1")
            .setLabel("1 arme Lourde")
            .setEmoji({ name: "➖" })
            .setStyle("DANGER")
        );

        var buttons2 = new MessageActionRow().addComponents(
          new MessageButton()
            .setCustomId("validateEntry")
            .setLabel("Valider")
            .setStyle("SUCCESS"),
          new MessageButton()
            .setCustomId("cancelEntry")
            .setLabel("Annuler")
            .setStyle("DANGER")
        );

        interaction.update({
          embeds: [
            new MessageEmbed(interaction.message.embeds[0]).addField(
              "Nombre d'armes Lourdes:",
              "1",
              true
            ),
            new MessageEmbed(interaction.message.embeds[1]),
          ],
          components: [buttons, buttons2],
        });
        return;
      }
      var meurtres = interaction.message.embeds[0].fields
        .filter((field) => field.name == "Meurtres:")
        .map((field) => field.value)[0]
        .replace(/-\s/g, "")
        .split("\n");
      meurtres[0] == "Aucun" ? (meurtres = null) : (meurtres = meurtres);

      var braquages = interaction.message.embeds[0].fields
        .filter((field) => field.name == "Braquages:")
        .map((field) => field.value)[0]
        .replace(/-\s/g, "")
        .split("\n");
      braquages[0] == "Aucun" ? (braquages = null) : (braquages = braquages);

      var po = interaction.message.embeds[0].fields
        .filter((field) => field.name == "Prise D'otage:")
        .map((field) => field.value)[0]
        .replace(/-\s/g, "")
        .split("\n");
      po[0] == "Aucun" ? (po = null) : (po = po);

      var droguePrinter = interaction.message.embeds[0].fields
        .filter((field) => field.name == "Drogue / Printers:")
        .map((field) => field.value)[0]
        .replace(/-\s/g, "")
        .split("\n");
      droguePrinter[0] == "Aucun"
        ? (droguePrinter = null)
        : (droguePrinter = droguePrinter);

      var divers = interaction.message.embeds[0].fields
        .filter((field) => field.name == "Divers:")
        .map((field) => field.value)[0]
        .replace(/-\s/g, "")
        .split("\n");
      divers[0] == "Aucun" ? (divers = null) : (divers = divers);

      var amende = 0;
      if (délitsR) {
        délitsR.forEach((delit) => {
          if (delit != "Autre délits routiers (Cumulable)") {
            amende += AmendeList[delit];
          } else if (delit == "Autre délits routiers (Cumulable)") {
            amende +=
              AmendeList[delit] *
              parseInt(
                interaction.message.embeds[0].fields
                  .filter(
                    (field) => field.name == "Nombre d'autres délits routiers:"
                  )
                  .map((field) => field.value)[0]
              );
          }
        });
      }
      if (armes) {
        armes.forEach((arme) => {
          if (
            arme != "Possession d'arme lourde (Cumulable)" &&
            arme != "Possession d'arme de poing (Cumulable)"
          ) {
            amende += AmendeList[arme];
          } else if (arme == "Possession d'arme lourde (Cumulable)") {
            amende +=
              AmendeList[arme] *
              parseInt(
                interaction.message.embeds[0].fields
                  .filter((field) => field.name == "Nombre d'armes Lourdes:")
                  .map((field) => field.value)[0]
              );
          } else if (arme == "Possession d'arme de poing (Cumulable)") {
            amende +=
              AmendeList[arme] *
              parseInt(
                interaction.message.embeds[0].fields
                  .filter((field) => field.name == "Nombre d'armes Légéres:")
                  .map((field) => field.value)[0]
              );
          }
        });
      }
      if (meurtres) {
        meurtres.forEach((meurtre) => {
          amende += AmendeList[meurtre];
        });
      }
      if (braquages) {
        braquages.forEach((braquage) => {
          amende += AmendeList[braquage];
        });
      }
      if (po) {
        po.forEach((po) => {
          amende += AmendeList[po];
        });
      }
      if (droguePrinter) {
        droguePrinter.forEach((droguePrinter) => {
          amende += AmendeList[droguePrinter];
        });
      }
      if (divers) {
        divers.forEach((divers) => {
          amende += AmendeList[divers];
        });
      }
      var embed = new MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Amende")
        .setDescription(
          "Vous pouvez règuler l'amende à l'aide des boutons en dessous."
        )
        .addField("Maximum:", `${amende}`, true)
        .addField("Actuel:", `${amende}`, true);

      var row = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId("Amende+10000")
          .setLabel("+10000")
          .setStyle("SUCCESS")
          .setDisabled(true),
        new MessageButton()
          .setCustomId("Amende+1000")
          .setLabel("+1000")
          .setStyle("SUCCESS")
          .setDisabled(true),
        new MessageButton()
          .setCustomId("Amende+100")
          .setLabel("+100")
          .setStyle("SUCCESS")
          .setDisabled(true),
        new MessageButton()
          .setCustomId("Amende+10")
          .setLabel("+10")
          .setStyle("SUCCESS")
          .setDisabled(true),
        new MessageButton()
          .setCustomId("Amende+1")
          .setLabel("+1")
          .setStyle("SUCCESS")
          .setDisabled(true)
      );
      var row2 = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId("Amende-10000")
          .setLabel("-10000")
          .setStyle("DANGER")
          .setDisabled(amende - 10000 < 0),
        new MessageButton()
          .setCustomId("Amende-1000")
          .setLabel("-1000")
          .setStyle("DANGER")
          .setDisabled(amende - 1000 < 0),
        new MessageButton()
          .setCustomId("Amende-100")
          .setLabel("-100")
          .setStyle("DANGER")
          .setDisabled(amende - 100 < 0),
        new MessageButton()
          .setCustomId("Amende-10")
          .setLabel("-10")
          .setStyle("DANGER")
          .setDisabled(amende - 10 < 0),
        new MessageButton()
          .setCustomId("Amende-1")
          .setLabel("-1")
          .setStyle("DANGER")
          .setDisabled(amende - 1 < 0)
      );
      var buttons = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId("validateEntryAmende")
          .setLabel("Valider")
          .setStyle("SUCCESS"),
        new MessageButton()
          .setCustomId("cancelEntry")
          .setLabel("Annuler")
          .setStyle("DANGER")
      );

      interaction.update({
        embeds: [
          new MessageEmbed(interaction.message.embeds[0]),
          new MessageEmbed(interaction.message.embeds[1]),
          embed,
        ],
        components: [row, row2, buttons],
      });
    } else if (interaction.customId.startsWith("AmendeStatus")) {
      var sécu = new MessageEmbed(interaction.message.embeds[1]).fields
        .filter((field) => field.name == "Sécurité Informatique n°")
        .map((field) => field.value)[0];
      if (sécu != interaction.user.id)
        return interaction.reply({
          content: "La sécurité informatique vous empêche de faire cela !",
          ephemeral: true,
        });
      var embed = new MessageEmbed(interaction.message.embeds[2]);
      if (interaction.customId == "AmendeStatusPaye") {
        embed.fields[2].value = "Payé";
      } else if (interaction.customId == "AmendeStatusPayePartie") {
        embed.fields[2].value = "Payé en partie";
      } else if (interaction.customId == "AmendeStatusImpaye") {
        embed.fields[2].value = "Impayé";
      }
      interaction.update({
        embeds: [
          new MessageEmbed(interaction.message.embeds[0]),
          new MessageEmbed(interaction.message.embeds[1]),
          embed,
        ],
      });
    } else if (interaction.customId == "validateEntryAmende") {
      var sécu = new MessageEmbed(interaction.message.embeds[1]).fields
        .filter((field) => field.name == "Sécurité Informatique n°")
        .map((field) => field.value)[0];
      if (sécu != interaction.user.id)
        return interaction.reply({
          content: "La sécurité informatique vous empêche de faire cela !",
          ephemeral: true,
        });
      if (
        interaction.message.embeds[2].fields.filter(
          (field) => field.name == "Status:"
        ).length == 0
      ) {
        interaction.update({
          embeds: [
            new MessageEmbed(interaction.message.embeds[0]),
            new MessageEmbed(interaction.message.embeds[1]),
            new MessageEmbed(interaction.message.embeds[2]).addField(
              "Status:",
              "Impayé",
              true
            ),
          ],
          components: [
            new MessageActionRow().addComponents(
              new MessageButton()
                .setCustomId("AmendeStatusPaye")
                .setLabel("Payé")
                .setStyle("SUCCESS"),
              new MessageButton()
                .setCustomId("AmendeStatusPayePartie")
                .setLabel("Payé en partie")
                .setStyle("SECONDARY"),
              new MessageButton()
                .setCustomId("AmendeStatusImpaye")
                .setLabel("Impayé")
                .setStyle("DANGER")
            ),
            interaction.message.components[2],
          ],
        });
        return;
      } else if (
        interaction.message.embeds[2].fields[2].value == "Payé en partie" &&
        interaction.message.embeds[2].fields.filter(
          (field) => field.name == "Reste à payer:"
        ).length == 0
      ) {
        var sécu = new MessageEmbed(interaction.message.embeds[1]).fields
          .filter((field) => field.name == "Sécurité Informatique n°")
          .map((field) => field.value)[0];
        if (sécu != interaction.user.id)
          return interaction.reply({
            content: "La sécurité informatique vous empêche de faire cela !",
            ephemeral: true,
          });
        var amende = parseInt(interaction.message.embeds[2].fields[1].value);
        var row = new MessageActionRow().addComponents(
          new MessageButton()
            .setCustomId("Amende+10000")
            .setLabel("+10000")
            .setStyle("SUCCESS")
            .setDisabled(true),
          new MessageButton()
            .setCustomId("Amende+1000")
            .setLabel("+1000")
            .setStyle("SUCCESS")
            .setDisabled(true),
          new MessageButton()
            .setCustomId("Amende+100")
            .setLabel("+100")
            .setStyle("SUCCESS")
            .setDisabled(true),
          new MessageButton()
            .setCustomId("Amende+10")
            .setLabel("+10")
            .setStyle("SUCCESS")
            .setDisabled(true),
          new MessageButton()
            .setCustomId("Amende+1")
            .setLabel("+1")
            .setStyle("SUCCESS")
            .setDisabled(true)
        );
        var row2 = new MessageActionRow().addComponents(
          new MessageButton()
            .setCustomId("Amende-10000")
            .setLabel("-10000")
            .setStyle("DANGER")
            .setDisabled(amende - 10000 < 0),
          new MessageButton()
            .setCustomId("Amende-1000")
            .setLabel("-1000")
            .setStyle("DANGER")
            .setDisabled(amende - 1000 < 0),
          new MessageButton()
            .setCustomId("Amende-100")
            .setLabel("-100")
            .setStyle("DANGER")
            .setDisabled(amende - 100 < 0),
          new MessageButton()
            .setCustomId("Amende-10")
            .setLabel("-10")
            .setStyle("DANGER")
            .setDisabled(amende - 10 < 0),
          new MessageButton()
            .setCustomId("Amende-1")
            .setLabel("-1")
            .setStyle("DANGER")
            .setDisabled(amende - 1 < 0)
        );
        var buttons = new MessageActionRow().addComponents(
          new MessageButton()
            .setCustomId("validateEntryAmende")
            .setLabel("Valider")
            .setStyle("SUCCESS"),
          new MessageButton()
            .setCustomId("cancelEntry")
            .setLabel("Annuler")
            .setStyle("DANGER")
        );
        interaction.update({
          embeds: [
            new MessageEmbed(interaction.message.embeds[0]),
            new MessageEmbed(interaction.message.embeds[1]),
            new MessageEmbed(interaction.message.embeds[2]).addField(
              "Reste à payer:",
              `${amende}`,
              true
            ),
          ],
          components: [row, row2, buttons],
        });
        return;
      }

      var nom = interaction.message.embeds[1].fields[1].value;
      var prenom = interaction.message.embeds[1].fields[0].value;

      var délitsR = interaction.message.embeds[0].fields
        .filter((field) => field.name == "Délits Routiers:")
        .map((field) => field.value)[0]
        .replace(/-\s/g, "")
        .split("\n");
      délitsR[0] == "Aucun" ? (délitsR = null) : (délitsR = délitsR);
      if (délitsR && délitsR.includes("Autre délits routiers (Cumulable)")) {
        délitsR = délitsR.map((map) => {
          return map.replace(
            "Autre délits routiers (Cumulable)",
            `Autre délits routiers (x ${
              interaction.message.embeds[0].fields.find(
                (field) => field.name == "Nombre d'autres délits routiers:"
              ).value
            })`
          );
        });
      }

      var armes = interaction.message.embeds[0].fields
        .filter((field) => field.name == "Armes:")
        .map((field) => field.value)[0]
        .replace(/-\s/g, "")
        .split("\n");
      armes[0] == "Aucun" ? (armes = null) : (armes = armes);
      if (armes && armes.includes("Possession d'arme de poing (Cumulable)")) {
        armes = armes.map((map) => {
          return map.replace(
            "Possession d'arme de poing (Cumulable)",
            `Possession d'arme de poing (x ${
              interaction.message.embeds[0].fields.find(
                (field) => field.name == "Nombre d'armes Légéres:"
              ).value
            })`
          );
        });
      }
      if (armes && armes.includes("Possession d'arme lourde (Cumulable)")) {
        armes = armes.map((map) => {
          return map.replace(
            "Possession d'arme lourde (Cumulable)",
            `Possession d'arme lourde (x ${
              interaction.message.embeds[0].fields.find(
                (field) => field.name == "Nombre d'armes Lourdes:"
              ).value
            })`
          );
        });
      }

      var meurtres = interaction.message.embeds[0].fields
        .filter((field) => field.name == "Meurtres:")
        .map((field) => field.value)[0]
        .replace(/-\s/g, "")
        .split("\n");
      meurtres[0] == "Aucun" ? (meurtres = null) : (meurtres = meurtres);

      var braquages = interaction.message.embeds[0].fields
        .filter((field) => field.name == "Braquages:")
        .map((field) => field.value)[0]
        .replace(/-\s/g, "")
        .split("\n");
      braquages[0] == "Aucun" ? (braquages = null) : (braquages = braquages);

      var po = interaction.message.embeds[0].fields
        .filter((field) => field.name == "Prise D'otage:")
        .map((field) => field.value)[0]
        .replace(/-\s/g, "")
        .split("\n");
      po[0] == "Aucun" ? (po = null) : (po = po);

      var droguePrinter = interaction.message.embeds[0].fields
        .filter((field) => field.name == "Drogue / Printers:")
        .map((field) => field.value)[0]
        .replace(/-\s/g, "")
        .split("\n");
      droguePrinter[0] == "Aucun"
        ? (droguePrinter = null)
        : (droguePrinter = droguePrinter);

      var divers = interaction.message.embeds[0].fields
        .filter((field) => field.name == "Divers:")
        .map((field) => field.value)[0]
        .replace(/-\s/g, "")
        .split("\n");
      divers[0] == "Aucun" ? (divers = null) : (divers = divers);

      var amende = interaction.message.embeds[2].fields[1].value;
      var resteAPayer = 0;
      if (interaction.message.embeds[2].fields[2].value == "Impayé") {
        resteAPayer = amende;
      } else if (
        interaction.message.embeds[2].fields[2].value == "Payé en partie"
      ) {
        resteAPayer = interaction.message.embeds[2].fields[3].value;
      }

      require("./modules/add.js").run(
        nom,
        prenom,
        délitsR,
        armes,
        meurtres,
        braquages,
        po,
        droguePrinter,
        divers,
        parseInt(amende),
        parseInt(resteAPayer)
      );

      var logEmbed = new MessageEmbed()
        .setTitle("Ajout d'une entrée dans le casier judiciaire")
        .setDescription(
          `**<@${interaction.user.id}>** viens d'ajouter une entrée dans le casier judiciaire de **${prenom} ${nom}**`
        )
        .addFields([
          {
            name: "Délits Routiers:",
            value: délitsR == null ? "Aucun" : délitsR.join("\n"),
            inline: true,
          },
          {
            name: "Armes:",
            value: armes == null ? "Aucun" : armes.join("\n"),
            inline: true,
          },
          {
            name: "Meurtres:",
            value: meurtres == null ? "Aucun" : meurtres.join("\n"),
            inline: true,
          },
          {
            name: "Braquages:",
            value: braquages == null ? "Aucun" : braquages.join("\n"),
            inline: true,
          },
          {
            name: "Prise D'otage:",
            value: po == null ? "Aucun" : po.join("\n"),
            inline: true,
          },
          {
            name: "Drogue / Printers:",
            value: droguePrinter == null ? "Aucun" : droguePrinter.join("\n"),
            inline: true,
          },
          {
            name: "Divers:",
            value: divers == null ? "Aucun" : divers.join("\n"),
            inline: true,
          },
        ])
        .addField("Total de l'amende:", `${parseInt(amende)}`, true)
        .addField("Reste à payer:", `${parseInt(resteAPayer)}`, true)
        .setFooter({ text: `${interaction.guild.name}` });

      client.channels
        .fetch("1015382007854944297")
        .then((c) => c.send({ embeds: [logEmbed] }));

      interaction.update({
        embeds: [
          new MessageEmbed()
            .setTitle("Casier de " + prenom + " " + nom)
            .setDescription("Le casier du suspect à bien été modifié / créé !"),
        ],
        components: [],
      });
    } else if (interaction.customId == "cancelEntry") {
      var sécu = new MessageEmbed(interaction.message.embeds[1]).fields
        .filter((field) => field.name == "Sécurité Informatique n°")
        .map((field) => field.value)[0];
      if (sécu != interaction.user.id)
        return interaction.reply({
          content: "La sécurité informatique vous empêche de faire cela !",
          ephemeral: true,
        });
      interaction.guild.channels
        .fetch(interaction.channelId)
        .then((channel) => {
          channel.messages.fetch(interaction.message.id).then((message) => {
            message.delete();
          });
        });
    }
  }
  if (interaction.isSelectMenu()) {
    if (interaction.customId === "délitsR") {
      var sécu = new MessageEmbed(interaction.message.embeds[1]).fields
        .filter((field) => field.name == "Sécurité Informatique n°")
        .map((field) => field.value)[0];
      if (sécu != interaction.user.id)
        return interaction.reply({
          content: "La sécurité informatique vous empêche de faire cela !",
          ephemeral: true,
        });
      var delitsR = interaction.values;
      var delitsRText = "";
      delitsR.forEach((delit) => {
        delitsRText += `- ${delit}\n`;
      });
      if (delitsRText === "") {
        delitsRText = "Aucun";
      }

      var embed = new MessageEmbed(interaction.message.embeds[0]);

      embed.fields[0].value = delitsRText;
      interaction.update({
        embeds: [embed, new MessageEmbed(interaction.message.embeds[1])],
      });
    } else if (interaction.customId === "armes") {
      var sécu = new MessageEmbed(interaction.message.embeds[1]).fields
        .filter((field) => field.name == "Sécurité Informatique n°")
        .map((field) => field.value)[0];
      if (sécu != interaction.user.id)
        return interaction.reply({
          content: "La sécurité informatique vous empêche de faire cela !",
          ephemeral: true,
        });
      var armes = interaction.values;
      var armesText = "";
      var meurtreText = "";
      armes.forEach((arme) => {
        if (arme.startsWith("Meurtre") || arme.startsWith("Tentative")) {
          meurtreText += `- ${arme}\n`;
        } else {
          armesText += `- ${arme}\n`;
        }
      });
      if (armesText === "") {
        armesText = "Aucun";
      }
      if (meurtreText === "") {
        meurtreText = "Aucun";
      }
      var embed = new MessageEmbed(interaction.message.embeds[0]);

      embed.fields[1].value = armesText;
      embed.fields[2].value = meurtreText;
      interaction.update({
        embeds: [embed, new MessageEmbed(interaction.message.embeds[1])],
      });
    } else if (interaction.customId == "braquage") {
      var sécu = new MessageEmbed(interaction.message.embeds[1]).fields
        .filter((field) => field.name == "Sécurité Informatique n°")
        .map((field) => field.value)[0];
      if (sécu != interaction.user.id)
        return interaction.reply({
          content: "La sécurité informatique vous empêche de faire cela !",
          ephemeral: true,
        });
      var braquage = interaction.values;
      var braquageText = "";
      var POText = "";
      braquage.forEach((braquage) => {
        if (braquage.startsWith("Prise")) {
          POText += `- ${braquage}\n`;
        } else {
          braquageText += `- ${braquage}\n`;
        }
      });
      if (braquageText === "") {
        braquageText = "Aucun";
      }
      if (POText === "") {
        POText = "Aucun";
      }
      var embed = new MessageEmbed(interaction.message.embeds[0]);

      embed.fields[3].value = braquageText;
      embed.fields[4].value = POText;
      interaction.update({
        embeds: [embed, new MessageEmbed(interaction.message.embeds[1])],
      });
    } else if (interaction.customId == "divers") {
      var sécu = new MessageEmbed(interaction.message.embeds[1]).fields
        .filter((field) => field.name == "Sécurité Informatique n°")
        .map((field) => field.value)[0];
      if (sécu != interaction.user.id)
        return interaction.reply({
          content: "La sécurité informatique vous empêche de faire cela !",
          ephemeral: true,
        });
      var divers = interaction.values;
      var diversText = "";
      var DroguePrinterText = "";
      divers.forEach((divers) => {
        if (
          divers.startsWith("Vente") ||
          divers.startsWith("Possession") ||
          divers.startsWith("Fabrication")
        ) {
          DroguePrinterText += `- ${divers}\n`;
        } else {
          diversText += `- ${divers}\n`;
        }
      });
      if (diversText === "") {
        diversText = "Aucun";
      }
      if (DroguePrinterText === "") {
        DroguePrinterText = "Aucun";
      }
      var embed = new MessageEmbed(interaction.message.embeds[0]);

      embed.fields[5].value = DroguePrinterText;
      embed.fields[6].value = diversText;
      interaction.update({
        embeds: [embed, new MessageEmbed(interaction.message.embeds[1])],
      });
    }
  }
};
