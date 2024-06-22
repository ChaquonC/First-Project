export const randomFighters = (max) => {
    const minimum = Math.ceil(0);
    const maximum = Math.floor(max);
    return Math.floor(Math.random() * (maximum - minimum) + minimum);
}

export const damageTaken = (move, attacker, defender) => {
    let damageTaken = attacker.stats.baseDamage * (100/(defender.stats.armorValue + 100))
    if (defender.stats.resistance === move.moveType) {
        damageTaken = damageTaken / 2;
    } else if (defender.stats.weakness === move.moveType) {
        damageTaken = damageTaken * 2;
    }
    return damageTaken;
}

export const heal = (character) => {
    return character.stats.hp * 0.33;
}

export const turnDelay = () => {
    return new Promise((resolve) => setTimeout(resolve, 500))
}
