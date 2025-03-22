import Phaser from "phaser";

export class PlaneAttack extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, config = {}) {
        super(scene, x, y, "planeAttack1");
        
        this.scene = scene;
        this.config = {
            scale: 0.7,
            speed: 400,
            damage: 10,
            ...config
        };

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        // Set up physics body
        this.setScale(this.config.scale);
        this.setVelocityX(this.config.speed); // Move right
       
        
        // Enable physics body and set size
        this.body.enable = true;
        this.body.setSize(30, 20); // Set a reasonable hitbox size
        
        // Create and play the animation
        this.createAnimation();
        this.play("plane_attack_anim");

        // Set up collision with baroness
        this.scene.physics.add.collider(
            this,
            this.scene.baroness,
            this.onHitBaroness,
            null,
            this
        );

        // Destroy when animation completes or when it goes off screen
        this.on('animationcomplete', () => {
            this.destroy();
        });
    }

    onHitBaroness(projectile, baroness) {
        baroness.takeDamage(this.config.damage);
        this.destroy();
    }

    getDamage() {
        return this.config.damage;
    }

    createAnimation() {
        if (!this.scene.anims.exists("plane_attack_anim")) {
            this.scene.anims.create({
                key: "plane_attack_anim",
                frames: [
                    { key: "planeAttack1" },
                    { key: "planeAttack2" },
                    { key: "planeAttack3" },
                    { key: "planeAttack4" },
                    { key: "planeAttack5" },
                    { key: "planeAttack6" },
                    { key: "planeAttack7" },
                    { key: "planeAttack8" },
                    { key: "planeAttack9" },
                    { key: "planeAttack10" },
                    { key: "planeAttack11" },
                    { key: "planeAttack12" }
                ],
                frameRate: 15,
                repeat: -1
            });
        }
        this.setVelocityX(this.config.speed); // Move right
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.setVelocityX(this.config.speed); 
        
        if (this.x > window.innerWidth || this.x < 0) {
            this.destroy();
        }
    }
}
