const weakness = {
    Normal: ["Fight"],
    Fight: ["Flying", "Psychic", "Fairy"],
    Flying: ["Electric", "Ice", "Rock"],
    Poison: ["Ground", "Psychic"],
    Ground: ["Water", "Grass", "Ice"],
    Rock: ["Water", "Grass", "Fight", "Ground", "Steel"],
    Bug: ["Flying", "Rock", "Fire"],
    Ghost: ["Ghost", "Dark"],
    Steel: ["Fire", "Fight", "Ground"],
    Fire: ["Water", "Ground", "Rock"],
    Water: ["Grass", "Electric"],
    Grass: ["Fire", "Ice", "Poison", "Flying", "Bug"],
    Electric: ["Ground"],
    Psychic: ["Bug", "Ghost", "Dark"],
    Ice: ["Fire", "Fight", "Rock", "Steel"],
    Dragon: ["Dragon", "Ice", "Fairy"],
    Fairy: ["Poison", "Steel"],
    Dark: ["Fight", "Bug", "Fairy"]
}

export default weakness