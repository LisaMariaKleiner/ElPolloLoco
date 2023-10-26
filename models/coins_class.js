class Coins extends MoveableObject {
   
    width = 90;
    height = 90;
    speed = 0;

    IMAGES_COINS = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];

    constructor() {
        super().loadImage(this.IMAGES_COINS[0]);
        this.loadImages(this.IMAGES_COINS);
        this.x = 200 + Math.random() * 2000;
        this.y = 100 + Math.random() * 300;
        this.animate();
    }

    animate() {

          setInterval(() => {
             
             this.playAnimation(this.IMAGES_COINS);
             }, 150);
        
    }

}