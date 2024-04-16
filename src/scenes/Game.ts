import { Scene } from 'phaser';
import { Targets } from '../objects/targets';
import { Player } from '../objects/player';
import { Zombie } from '../objects/zombie';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text : Phaser.GameObjects.Text;
    lives_text: Phaser.GameObjects.Text;
    targets: Targets;
    zombie: Zombie;
    player: Player;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    lives: number = 3;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(512, 384, 'background');
        this.background.setAlpha(0.5);

        this.msg_text = this.add.text(512, 384, 'Use cursor keys to move\nSpace bar to quit\nclick mouse to leave crosshair', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        });
        this.msg_text.setOrigin(0.5);

        this.lives_text = this.add.text( 20, 20, this.lives.toString(), {
            fontSize: 20, color: '#000000', 
            align: 'left'
        });

        if (this.input.keyboard) {
            this.cursors = this.input.keyboard.createCursorKeys();
            this.input.keyboard.once('keydown-SPACE', () => {
                this.scene.start('GameOver');
            });    
        }

        this.input.on('pointerdown', (pointer:Phaser.Input.Pointer) => {

            this.targets.add(pointer.worldX, pointer.worldY);

        });
        this.player = new Player(this, 400, 300);
        this.targets = new Targets(this);
        this.zombie = new Zombie(this, 600, 500);

        this.createAnimations();

    }

    lostLife = () => {
        this.lives -= 1;
        this.lives_text.setText(this.lives.toString());
    }

    // called every frame
    update = (time:number, delta:number) => {

        this.physics.collide(this.player.getGameObject(), this.zombie.getGameObject(), this.lostLife);
        this.player.update(this.cursors);
        this.zombie.update();
        this.targets.update();

    }

    createAnimations = () => {
    
        this.player.createAnimations();
        this.zombie.createAnimations();
    }

}
