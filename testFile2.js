var armes = [
  "Possession d'arme lourde (Cumulable)",
  "Possession d'arme légéres (Cumulable)",
];

if (armes.includes("Possession d'arme légéres (Cumulable)")) {
  armes = armes.map((map) => {
    return map.replace(
      "Possession d'arme légéres (Cumulable)",
      "Possession d'arme légéres (x 5)"
    );
  });
}
console.log(armes);
