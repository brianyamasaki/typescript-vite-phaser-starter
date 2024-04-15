import Phaser from 'phaser';

type TargetInfo = {
  image: Phaser.GameObjects.Image;
  timeCreated: number;
  toDestroy: boolean;
};

export class Targets {

  private scene: Phaser.Scene;
  private targets : TargetInfo[];

  constructor (scene: Phaser.Scene) {
    this.scene = scene;
    this.targets = [];
  }

  add = (x: number, y: number) => {
    this.targets.push({
      image: this.scene.add.image(x, y, 'crosshair'),
      timeCreated: new Date().getTime(),
      toDestroy: false
    });
  }

  update = () => {
    const now = new Date().getTime();
    let i = 0;
    let iMax = this.targets.length;
    for (let i = 0; i < iMax; i += 1) {
      const target = this.targets[i];
      const alpha = fadeTarget(now - target.timeCreated)
      target.image.setAlpha(alpha);
      if (alpha === 0) target.toDestroy = true;
    }

    // filter out destroyed items;
    this.targets = this.targets.filter((target) => target.toDestroy === false);
  }

}

// following numbers are milliseconds
const minTargetLife = 1000;
const maxTargetLife = 3000;
const fadeTarget = (timeAlive: number): number => {
  if (timeAlive < minTargetLife) return 1;
  if (timeAlive > maxTargetLife) return 0;
  return Math.abs(timeAlive - maxTargetLife) / minTargetLife;
}