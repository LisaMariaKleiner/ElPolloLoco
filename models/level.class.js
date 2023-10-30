class Level {
    enemies;
    clouds;
    endBoss;
    backgrounds;
    coins;
    bottles;
    level_end_x = 2200;


    constructor(enemies, clouds, backgrounds, coins, bottles, endboss) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgrounds = backgrounds;
        this.coins = coins;
        this.bottles = bottles;
        this.endBoss = endboss;
    }
}