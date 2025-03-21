import Phaser from "phaser";

export class Projectile extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, config = {}) {
        super(scene, x, y, "candy_projectile_1");

        this.scene = scene;
        this.config = {
            scale: 0.5,
            speed: 200,
            damage: 10,
            angle: 0,
            bodyScale: 0.5,
            idleDamageMultiplier: 1.5,
            spinSpeed: 5
        };
        Object.assign(this.config, config);

        // Add to scene and enable physics
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        // Set up candy animation and start it
        this.setupAnimation();
        
        // Configure physics and display
        this.setScale(this.config.scale);
        this.setupPhysics();
        
        // Add spawn effect
        this.spawnEffect();
    }

    setupAnimation() {
        // Create candy spin animation if it doesn't exist
        if (!this.scene.anims.exists("candy_spin")) {
            // Create frames array for candy animation
            const frames = [];
            for (let i = 1; i <= 4; i++) {
                frames.push({ key: `candy_projectile_${i}` });
            }

            this.scene.anims.create({
                key: "candy_spin",
                frames: frames,
                frameRate: 12,
                repeat: -1
            });
        }

        // Play the spinning animation
        this.play("candy_spin");
    }

    spawnEffect() {
        // Add scale up effect when spawning
        this.setScale(0);
        this.scene.tweens.add({
            targets: this,
            scale: this.config.scale,
            duration: 200,
            ease: 'Back.easeOut'
        });

        // Add a small particle effect
        const particles = this.scene.add.particles('candy_projectile_1');
        const emitter = particles.createEmitter({
            speed: 20,
            scale: { start: 0.2, end: 0 },
            alpha: { start: 0.5, end: 0 },
            lifespan: 200,
            maxParticles: 5
        });

        // Emit particles at spawn point
        emitter.explode(5, this.x, this.y);
        
        // Destroy particle system after effect
        this.scene.time.delayedCall(300, () => {
            particles.destroy();
        });
    }

    setupPhysics() {
        // Set circular hitbox
        const diameter = Math.min(this.width, this.height) * this.config.bodyScale;
        this.body.setCircle(diameter / 2);
        
        // Center the physics body
        const offsetX = (this.width - diameter) / 2;
        const offsetY = (this.height - diameter) / 2;
        this.body.setOffset(offsetX, offsetY);
        
        // Set velocity based on angle
        const radians = Phaser.Math.DegToRad(this.config.angle);
        const velocityX = Math.cos(radians) * this.config.speed;
        const velocityY = Math.sin(radians) * this.config.speed;
        this.body.setVelocity(velocityX, velocityY);

        // Add angular velocity for spinning effect
        this.body.setAngularVelocity(this.config.spinSpeed * 100);
    }

    getDamage(target) {
        // Check if target is idle (not moving)
        const isIdle = target && target.body && 
            target.body.velocity.x === 0 && 
            target.body.velocity.y === 0;

        // Apply extra damage if target is idle
        return isIdle ? 
            this.config.damage * this.config.idleDamageMultiplier : 
            this.config.damage;
    }

    update() {
        // Check if out of bounds
        if (this.x < 0 || this.x > this.scene.game.config.width ||
            this.y < 0 || this.y > this.scene.game.config.height) {
            this.destroy();
        }
    }
}
