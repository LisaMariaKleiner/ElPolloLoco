class CoinBar extends DrawableObject {
  IMAGES_CoinCounter = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];

  coinCounter = 0;

  constructor() {
    super();
    this.loadImages(this.IMAGES_CoinCounter);
    this.x = 20;
    this.y = 30;
    this.width = 200;
    this.height = 50;
    this.setCoinCounter(this.coinCounter);
  }

  setCoinCounter(coinCounter) {
    this.coinCounter = coinCounter;
    let path = this.IMAGES_CoinCounter[this.resolveImageIndexCoins()];
    this.img = this.imageCache[path];
  }

  resolveImageIndexCoins() {
    if (this.coinCounter == 5) {
      return 5;
    } else if (this.coinCounter == 4) {
      return 4;
    } else if (this.coinCounter == 3) {
      return 3;
    } else if (this.coinCounter == 2) {
      return 2;
    } else if (this.coinCounter == 1) {
      return 1;
    } else {
      return 0;
    }
  }
}
