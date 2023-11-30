/**
 * Represents a bottle object in the game that extends the MoveableObject class.
 */
class Bottles extends MoveableObject {

    width = 60;
    height = 70;
    speed = 0;
    isCollected = false;

    IMAGES_Bottles = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    ];

    IMAGES_BOTTLE_SPLASH = [
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
      ];


    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.loadImages(this.IMAGES_Bottles);
        this.y = 350;
        this.x = 300  + Math.random() * 1500;
        this.isCollected = false;
    }


    bottleSplash(x, y) {
        console.log(`bottleSplash called with x: ${x}, y: ${y}`);
        this.x = x;
        this.y = y;
        this.playAnimation(this.IMAGES_BOTTLE_SPLASH, 200); // 200 ms delay between frames
    }

}