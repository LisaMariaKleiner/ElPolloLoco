class BossBar extends DrawableObject {
  

  IMAGES_BOSSENERGY = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png",
  ];

  //IMAGE_BOSS = ["img/7_statusbars/3_icons/icon_health_endboss.png"];

  bossPercentage = 100;

  constructor() {
    super();
    this.loadImages(this.IMAGES_BOSSENERGY); //greift auf die Bilder im Array zu (IMAGES_WALKING)
    //this.loadImages(this.IMAGE_BOSS);

    this.x = 300;//2000;
    this.y = -5;
    this.width = 200;
    this.height = 50;
    this.setBossPercentage(100);
  }

  setBossPercentage(bossPercentage) {
    this.bossPercentage = bossPercentage;
    let path = this.IMAGES_BOSSENERGY[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.bossPercentage == 100) {
      return 5;
    } else if (this.bossPercentage > 80) {
      return 4;
    } else if (this.bossPercentage > 60) {
      return 3;
    } else if (this.bossPercentage > 40) {
      return 2;
    } else if (this.bossPercentage > 20) { 
      return 1;
    } else {
      return 0;
    }
  }
}
