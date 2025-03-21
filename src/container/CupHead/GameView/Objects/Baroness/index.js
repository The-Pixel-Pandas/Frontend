import Phaser from "phaser";
import { Projectile } from "../Projectile";

export class Baroness extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, config = {}) {
        super(scene, x, y, "baroness_shoot_1");

        this.scene = scene;
        this.config = {
            scale: 1,
            health: 100,
            attackInterval: 2000,
            projectileSpeed: 300,
            projectileScale: 0.3,
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
        this.projectiles = this.scene.add.group({
            classType: Projectile,
            runChildUpdate: true
        });

        // Set up animations
        this.setupAnimations();
        
        // Start attack timer
        this.attackTimer = this.scene.time.addEvent({
            delay: this.config.attackInterval,
            callback: this.attack,
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
                frameRate: 24,
                repeat: 0 // Don't repeat, we'll handle this manually
            });
        }

        // Listen for animation complete
        this.on('animationcomplete', this.onAnimComplete, this);
    }

    onAnimComplete(animation) {
        if (animation.key === 'baroness_shoot') {
            // Start the animation again after a short delay
            this.scene.time.delayedCall(500, () => {
                this.play("baroness_shoot");
            });
        }
    }

    attack(target) {
        if (!target) return;

        // Create multiple candy projectiles with different angles
        const angles = [-30, -15, 0, 15, 30]; // Spread pattern
        angles.forEach(angleOffset => {
            // Calculate base angle to target
            const baseAngle = Phaser.Math.Angle.Between(
                this.x, this.y,
                target.x, target.y
            );
            
            // Add offset to create spread pattern
            const finalAngle = baseAngle + Phaser.Math.DegToRad(angleOffset);

            // Create projectile at the correct frame of animation (frame 20 is when mouth is open)
            const projectile = new Projectile(this.scene, 
                this.x - 20, // Adjust spawn position
                this.y - this.height/3, // Spawn from mouth area
                {
                    angle: Phaser.Math.RadToDeg(finalAngle),
                    speed: this.config.projectileSpeed,
                    damage: 10,
                    scale: this.config.projectileScale
                }
            );

            // Add to group for tracking
            this.projectiles.add(projectile);

            // Set up collision with player
            this.scene.physics.add.overlap(
                projectile,
                target,
                (proj, player) => this.onProjectileHit(proj, player),
                null,
                this
            );
        });

        // Restart shooting animation
        this.play("baroness_shoot", true);
    }

    onProjectileHit(projectile, target) {
        // Create hit effect
        const hitEffect = this.scene.add.sprite(projectile.x, projectile.y, 'candy_1');
        hitEffect.setScale(projectile.scale * 1.5);
        hitEffect.alpha = 0.8;
        
        // Add hit animation
        this.scene.tweens.add({
            targets: hitEffect,
            alpha: 0,
            scale: projectile.scale * 2,
            duration: 200,
            onComplete: () => hitEffect.destroy()
        });

        // Emit hit event with damage amount, passing target for idle check
        this.emit('projectileHit', projectile.getDamage(target));
        
        // Destroy projectile
        projectile.destroy();
    }

    update(target) {
        // Attack the target if it exists and timer is ready
        if (target && this.attackTimer.getProgress() === 1) {
            this.attack(target);
        }

        // Clean up projectiles that are out of bounds
        this.projectiles.getChildren().forEach(projectile => {
            if (projectile.active) {
                projectile.update();
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
