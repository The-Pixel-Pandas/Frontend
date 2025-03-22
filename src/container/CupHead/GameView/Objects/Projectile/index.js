import Phaser from "phaser";

export class Projectile extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, config = {}) {
        super(scene, x, y, config.isEnemy ? 'candy_projectile_1' : 'candy1');

        this.config = {
            speed: 400,
            scale: 0.5,
            damage: 10,
            isEnemy: false, // determines direction and appearance
            ...config
        };

        // Add to scene and enable physics
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        // Set up physics body
        this.setScale(this.config.scale);
        this.body.setSize(this.width * 0.7, this.height * 0.7);

        // Auto-destroy when off screen
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;

        this.setupAnimation();
        this.fire();
    }

    setupAnimation() {
        const prefix = this.config.isEnemy ? 'candy_projectile_' : 'candy';
        const animKey = `${prefix}_anim_${this.config.isEnemy ? 'enemy' : 'player'}`;

        if (!this.scene.anims.exists(animKey)) {
            this.scene.anims.create({
                key: animKey,
                frames: [
                    { key: `${prefix}1` },
                    { key: `${prefix}2` },
                    { key: `${prefix}3` },
                    { key: `${prefix}4` },
                ],
                frameRate: 12,
                repeat: -1
            });
        }

        this.play(animKey);
    }

    fire() {
        // Enemy projectiles move left, player projectiles move right
        const direction = this.config.isEnemy ? -1 : 1;
        this.setVelocityX(this.config.speed * direction);
    }

    getDamage() {
        return this.config.damage;
    }
}
