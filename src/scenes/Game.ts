import { Scene } from 'phaser';
import { Targets } from '../objects/targets';
import { Player } from '../objects/player';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text : Phaser.GameObjects.Text;
    targets: Targets;
    player: Player;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;

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

        this.msg_text = this.add.text(512, 384, 'Make something fun!\nand share it with us:\nsupport@phaser.io', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        });
        this.msg_text.setOrigin(0.5);

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

        this.createAnimations();

    }

    // called every frame
    update = (time:number, delta:number) => {

        this.player.update(this.cursors);
        this.targets.update();

    }

    createAnimations = () => {
    
        this.player.createAnimations();
    }

}
