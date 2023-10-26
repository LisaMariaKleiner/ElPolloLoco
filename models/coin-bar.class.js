class CoinBar extends DrawableObject {
  IMAGES_CoinCounter = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];

  percentageCoin = 0;

  constructor() {
    super();
    this.loadImages(this.IMAGES_CoinCounter);
    this.x = 20;
    this.y = 30;
    this.width = 200;
    this.height = 50;
    this.setPercentageCoin(0);
  }

  setPercentageCoin(percentageCoin) {
    this.percentageCoin = percentageCoin;
    let path = this.IMAGES_CoinCounter[this.resolveImageIndexCoins()];
    this.img = this.imageCache[path];
  }

  resolveImageIndexCoins() {
    if (this.percentageCoin == 0) {
      return 0;
    } else if (this.percentageCoin > 20) {
      return 1;
    } else if (this.percentageCoin > 40) {
      return 2;
    } else if (this.percentageCoin > 60) {
      return 3;
    } else if (this.percentageCoin > 80) {
        return 4;
    } else {
      return 5;
    }
  }



}
