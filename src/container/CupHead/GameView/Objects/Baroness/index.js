import Phaser from "phaser";
import { Projectile } from "../Projectile";

export class Baroness extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, config = {}) {
        super(scene, x, y, "baroness_shoot_1");

        this.scene = scene;
        this.config = {
            scale: 1,
            health: 100,
            attackInterval: 0,
            projectileSpeed: 0,
            projectileScale: 0.5,
            ...config
        };

        // Add to scene and enable physics
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        // Set up physics body
        this.body.setImmovable(true);
        
        // Position at ground level
        const groundTexture = this.scene.textures.get('bg_ground');
        this.groundHeight = groundTexture.getSourceImage().height;
        this.y = window.innerHeight - this.groundHeight - this.height/2;

        // Create projectiles group
        this.projectiles = this.scene.physics.add.group();

        // Set up animations
        this.setupAnimations();
        
        // Start attack timer
        this.attackTimer = this.scene.time.addEvent({
            delay: this.config.attackInterval,
            callback: () => this.attack(this.scene.plane),
            callbackScope: this,
            loop: true
        });

        // Play shoot animation on loop
        this.play("baroness_shoot");
    }

    setupAnimations() {
        if (!this.scene.anims.exists("baroness_shoot")) {
            // Create array of frame objects for all 35 frames
            const frames = Array.from({ length: 35 }, (_, i) => ({
                key: `baroness_shoot_${i + 1}`
            }));

            this.scene.anims.create({
                key: "baroness_shoot",
                frames: frames,
                frameRate: 15,
                repeat: -1 // Don't repeat, we'll handle this manually
            });
        }

        // Listen for animation complete
        this.on('animationcomplete', this.onAnimComplete, this);
    }

    onAnimComplete(animation) {
        if (animation.key === 'baroness_shoot') {
            // Start the animation again after a short delay
            this.scene.time.delayedCall(300, () => {
                this.play("baroness_shoot");
            });
        }
    }

    attack(target) {
        if (!target || !target.active) return;

        // Create a single candy projectile
        const projectile = new Projectile(
            this.scene,
            this.x - 150 , // Spawn slightly in front of baroness
            this.y - this.height/3 + 150, // Spawn from mouth area
            {
                isEnemy: true,
                speed: this.config.projectileSpeed,
                scale: this.config.projectileScale,
                damage: 10
            }
        );

        this.projectiles.add(projectile);
        
        // Calculate direction to plane
        const angle = Phaser.Math.Angle.Between(
            projectile.x,
            projectile.y,
            target.x,
            target.y
        );

        // Set velocity towards plane
        const velocity = new Phaser.Math.Vector2(
            Math.cos(angle) * this.config.projectileSpeed,
            Math.sin(angle) * this.config.projectileSpeed
        );
        projectile.setVelocity(velocity.x, velocity.y);

        // Add event listener for when projectile is destroyed
        projectile.on('destroy', () => {
            this.projectiles.remove(projectile);
        });
    }

    update() {
        // Clean up off-screen projectiles
        this.projectiles.getChildren().forEach(projectile => {
            if (!projectile.active || projectile.x < 0 || projectile.y < 0 || 
                projectile.x > this.scene.game.config.width || 
                projectile.y > this.scene.game.config.height) {
                projectile.destroy();
            }
        });
    }

    takeDamage(amount) {
        this.config.health = Math.max(0, this.config.health - amount);
        
        // Flash red when hit
        this.scene.tweens.add({
            targets: this,
            alpha: 0.5,
            duration: 100,
            yoyo: true,
            repeat: 2
        });

        if (this.config.health <= 0) {
            this.emit('defeated');
        }

        return this.config.health;
    }

    getHealth() {
        return this.config.health;
    }

    getMaxHealth() {
        return 100; // Return the max health value
    }
}
