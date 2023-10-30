class BossBar extends DrawableObject {
  IMAGES_BOSSENERGY = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png",
  ];

  bossPercentage = 100;

  constructor() {
    super();
    this.loadImages(this.IMAGES_BOSSENERGY); //greift auf die Bilder im Array zu (IMAGES_WALKING)

    this.x = 2000;
    this.y = -5;
    this.width = 200;
    this.height = 50;
    this.setBossPercentage(100);
  }


  setBossPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_BOSSENERGY[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }


  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
        return 1;
    } else {
      return 0;
    }
  }
}

