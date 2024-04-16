import Phaser from 'phaser';

const velocity = 100;
const frameRateDft = 5;

const animStop = 'zombieStop';
const animLeft = 'zombieLeft';
const animRight = 'zombieRight';
const animUp = 'zombieUp';
const animDown = 'zombieDown';

export class Zombie {

  private scene: Phaser.Scene;
  private zombie: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private velocityX: number;
  private tCourseChange: number;
 
  constructor (scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;
    this.zombie = scene.physics.add.sprite(x, y, 'zombie')
    this.zombie.setCollideWorldBounds(true);
    this.zombie.setVelocityX(velocity);
    this.velocityX = velocity;
    this.tCourseChange = new Date().getTime() + 3000;
  }
  getGameObject = () => {
    return this.zombie;
  }

  update = () => {
    const now = new Date().getTime();
    if (now > this.tCourseChange) {
      this.velocityX = -this.velocityX;
      this.zombie.setVelocityX(this.velocityX);
      this.tCourseChange = now + 3000;
    }
    this.zombie.anims.play(this.velocityX > 0 ? animRight : animLeft, true);
  }

  createAnimations = () => {
    const anims = this.scene.anims;
    const configWalkDown = {
      key: animDown,
      frames: anims.generateFrameNumbers('zombie', { start: 0, end: 3}),
      frameRate: frameRateDft,
      repeat: -1
    }
    const configWalkLeft = {
      key: animLeft,
      frames: anims.generateFrameNumbers('zombie', { start: 4, end: 7}),
      frameRate: frameRateDft,
      repeat: -1
    }
    const configWalkRight = {
      key: animRight,
      frames: anims.generateFrameNumbers('zombie', { start: 8, end: 11}),
      frameRate: frameRateDft,
      repeat: -1
    }
    const configWalkUp = {
      key: animUp,
      frames: anims.generateFrameNumbers('zombie', { start: 12, end: 15}),
      frameRate: frameRateDft,
      repeat: -1
    }
    const configStop = {
      key: animStop,
      frames: anims.generateFrameNumbers('zombie', { start: 0, end: 0}),
      framerate: 1,
      repeat: 0
    }

    anims.create(configWalkDown);
    anims.create(configWalkLeft);
    anims.create(configWalkRight);
    anims.create(configWalkUp);
    anims.create(configStop);

  }
}