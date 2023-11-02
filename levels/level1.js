let level1;

function initLevel() {
  level1 = new Level(
    [
      // Feinde
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(true),
      new Chicken(true),
      new Chicken(true),
    ],
    [new Cloud()],
    [
      new Background("img/5_background/layers/air.png", -719),
      new Background("img/5_background/layers/3_third_layer/2.png", -719),
      new Background("img/5_background/layers/2_second_layer/2.png", -719),
      new Background("img/5_background/layers/1_first_layer/2.png", -719),

      new Background("img/5_background/layers/air.png", 0),
      new Background("img/5_background/layers/3_third_layer/1.png", 0),
      new Background("img/5_background/layers/2_second_layer/1.png", 0),
      new Background("img/5_background/layers/1_first_layer/1.png", 0),

      new Background("img/5_background/layers/air.png", 719),
      new Background("img/5_background/layers/3_third_layer/2.png", 719),
      new Background("img/5_background/layers/2_second_layer/2.png", 719),
      new Background("img/5_background/layers/1_first_layer/2.png", 719),

      new Background("img/5_background/layers/air.png", 719 * 2),
      new Background("img/5_background/layers/3_third_layer/1.png", 719 * 2),
      new Background("img/5_background/layers/2_second_layer/1.png", 719 * 2),
      new Background("img/5_background/layers/1_first_layer/1.png", 719 * 2),

      new Background("img/5_background/layers/air.png", 719 * 3),
      new Background("img/5_background/layers/3_third_layer/2.png", 719 * 3),
      new Background("img/5_background/layers/2_second_layer/2.png", 719 * 3),
      new Background("img/5_background/layers/1_first_layer/2.png", 719 * 3),
    ],

    [new Coins(), new Coins(), new Coins(), new Coins(), new Coins()],

    [new Bottles(), new Bottles(), new Bottles(), new Bottles(), new Bottles()],
    [new Endboss()]
  );
}
