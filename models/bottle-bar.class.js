class BottleBar extends DrawableObject {

    IMAGES_Bottlebar = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
    ];

    bottleCounter = 0; //Initialisiere den BottleCounter auf 0
    
    constructor(collectedBottles) {
        super();
        this.collectedBottles = collectedBottles;
        this.loadImages(this.IMAGES_Bottlebar);
        this.x = 20;
        this.y = 70;
        this.width = 200;
        this.height = 50;
        this.setBottleCounter();
        
    }


    setBottleCounter(counter){
        this.bottleCounter = counter;
        let path = this.IMAGES_Bottlebar[this.resolveImageIndexBottle(counter)];
        this.img = this.imageCache[path];
    } 


    resolveImageIndexBottle(bottleCounter) {
        //console.log(BottleCounter);
    if (bottleCounter >= 5) {
        return 5;
      } else if (bottleCounter === 4) {
        return 4;
      } else if (bottleCounter === 3) {
        return 3;
      } else if (bottleCounter === 2) {
        return 2;
      } else if (bottleCounter === 1) {
        return 1;
      } else {
        return 0;
      }
    }









}