const strenghts = {
    Normal: [],
    Fight: ["Steel", "Ice", "Normal", "Rock", "Dark"],
    Flying: ["Bug", "Fight", "Grass"],
    Poison: ["Fairy", "Grass"],
    Ground: ["Steel", "Electric", "Fire", "Rock", "Poison"],
    Rock: ["Bug", "Fire", "Ice", "Flying"],
    Bug: ["Grass", "Psychic", "Dark"],
    Ghost: ["Ghost", "Psychic"],
    Steel: ["Fairy", "Ice", "Rock"],
    Fire: ["Steel", "Bug", "Ice", "Grass"],
    Water: ["Fire", "Rock", "Ground"],
    Grass: ["Water", "Ground", "Rock"],
    Electric: ["Water", "Flying"],
    Psychic: ["Fire", "Poison"],
    Ice: ["Dragon", "Grass", "Ground", "Flying"],
    Dragon: ["Dragon"],
    Fairy: ["Dragon", "Fight", "Dark"],
    Dark: ["Ghost", "Psychic"],
};

export default strenghts;
