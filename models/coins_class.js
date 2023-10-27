class Coins extends MoveableObject {
   
    width = 90;
    height = 90;
    speed = 0;
    isCollected = false;// Neue Eigenschaft, die anzeigt, ob die Münze eingesammelt wurde

    IMAGES_COINS = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COINS);
        this.x = 200 + Math.random() * 2000;
        this.y = 50 + Math.random() * 300;
        this.isCollected = false;
        this.animate();
    }

    animate() {

          setInterval(() => {
             
             this.playAnimation(this.IMAGES_COINS);
             }, 150);
        
    }

   

}