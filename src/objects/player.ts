import Phaser from 'phaser';


const animStop = 'playerStop';
const animLeft = 'playerLeft';
const animRight = 'playerRight';
const animUp = 'playerUp';
const animDown = 'playerDown';

const velocity = 200;
const frameRateDft = 8;
export class Player {

  private scene: Phaser.Scene;
  private player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  constructor (scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;
    this.player = scene.physics.add.sprite(x, y, 'character');
    this.player.setCollideWorldBounds(true);
    this.player.setBounce(0.2);
  }


  update = (cursors: Phaser.Types.Input.Keyboard.CursorKeys) => {
    let velocityX = 0;
    let velocityY = 0;

    if (cursors.left.isDown) {
      velocityX = -velocity;
    } else if (cursors.right.isDown) {
      velocityX = velocity;
    }

    if (cursors.up.isDown) {
      velocityY = -velocity;

    } else if (cursors.down.isDown) {
      velocityY = velocity;
    }

    const player = this.player;
    if (velocityX === 0 && velocityY === 0) {
      player.setVelocity(0);
      player.anims.play(animStop);
    } else {
      player.setVelocityX(velocityX);
      player.setVelocityY(velocityY);
      if (velocityX !== 0) {
        player.anims.play(velocityX < 0 ? animLeft : animRight, true);
      } else {
        player.anims.play(velocityY < 0 ? animUp : animDown, true);
      }
    }
  }

  createAnimations = () => {
    const anims = this.scene.anims;
    const configWalkDown = {
      key: animDown,
      frames: anims.generateFrameNumbers('character', { start: 0, end: 3}),
      frameRate: frameRateDft,
      repeat: -1
    }
    const configWalkLeft = {
      key: animLeft,
      frames: anims.generateFrameNumbers('character', { start: 4, end: 7}),
      frameRate: frameRateDft,
      repeat: -1
    }
    const configWalkRight = {
      key: animRight,
      frames: anims.generateFrameNumbers('character', { start: 8, end: 11}),
      frameRate: frameRateDft,
      repeat: -1
    }
    const configWalkUp = {
      key: animUp,
      frames: anims.generateFrameNumbers('character', { start: 12, end: 15}),
      frameRate: frameRateDft,
      repeat: -1
    }
    const configStop = {
      key: animStop,
      frames: anims.generateFrameNumbers('character', { start: 0, end: 0}),
      framerate: 1,
      repeat: 0
    }

    anims.create(configWalkDown);
    anims.create(configWalkLeft);
    anims.create(configWalkRight);
    anims.create(configWalkUp);
    anims.create(configStop)
  }

}

