import Phaser from "phaser";
import { PlaneAttack } from "../PlaneAttack";

export class Plane extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, config = {}) {
        super(scene, x, y, "plane1");

        this.scene = scene;
        this.config = {
            speed: 200,           // Reduced from 300 for smoother control
            bodyWidth: 60,
            bodyHeight: 30,
            scale: 1,
            health: 100,
            invulnerableTime: 1000,
            projectileSpeed: 400,
            projectileScale: 0.5,
            shootDelay: 250, // Delay between shots in ms
            ...config
        };

        // Add to scene and enable physics
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        // Set up physics body
        this.body.setSize(this.config.bodyWidth, this.config.bodyHeight);
        this.setCollideWorldBounds(true);
        this.setScale(this.config.scale);

        // Center the physics body
        this.body.setOffset(
            (this.width - this.config.bodyWidth) / 2,
            (this.height - this.config.bodyHeight) / 2
        );

        // Store ground height for boundary checks
        const groundTexture = this.scene.textures.get('bg_ground');
        this.groundHeight = groundTexture.getSourceImage().height;
        this.groundY = window.innerHeight - this.groundHeight;

        this.isInvulnerable = false;
        this.lastShootTime = 0;
        
        // Create projectiles group with physics
        this.projectiles = this.scene.physics.add.group({
            classType: PlaneAttack,
            runChildUpdate: true
        });

        this.setupAnimations();
        this.play("plane_idle");
    }

    setupAnimations() {
        if (!this.scene.anims.exists("plane_idle")) {
            this.scene.anims.create({
                key: "plane_idle",
                frames: [
                    { key: "plane1" },
                    { key: "plane2" },
                    { key: "plane3" },
                    { key: "plane4" },
                ],
                frameRate: 10,
                repeat: -1,
            });
        }

        if (!this.scene.anims.exists("plane_up")) {
            this.scene.anims.create({
                key: "plane_up",
                frames: [
                    { key: "cuphead_idle_up_1" },
                    { key: "cuphead_idle_up_2" },
                    { key: "cuphead_idle_up_3" },
                    { key: "cuphead_idle_up_4" },
                ],
                frameRate: 10,
                repeat: -1,
            });
        }

        if (!this.scene.anims.exists("plane_down")) {
            this.scene.anims.create({
                key: "plane_down",
                frames: [
                    { key: "cuphead_idle_down_1" },
                    { key: "cuphead_idle_down_2" },
                    { key: "cuphead_idle_down_3" },
                    { key: "cuphead_idle_down_4" },
                ],
                frameRate: 10,
                repeat: -1,
            });
        }

        // Add candy projectile animation
        if (!this.scene.anims.exists("candy_projectile")) {
            this.scene.anims.create({
                key: "candy_projectile",
                frames: [
                    { key: "candy1" },
                    { key: "candy2" },
                    { key: "candy3" },
                    { key: "candy4" },
                ],
                frameRate: 10,
                repeat: -1,
            });
        }

        // Add plane attack animation
        if (!this.scene.anims.exists("plane_attack")) {
            this.scene.anims.create({
                key: "plane_attack",
                frames: [
                    { key: "plane1" },
                    { key: "plane2" },
                    { key: "plane3" },
                ],
                frameRate: 15,
                repeat: 0
            });
        }
    }

    spawn() {
        this.play("plane_idle");
        
        // Add spawn animation
        this.scene.tweens.add({
            targets: this,
            scaleX: { from: 0, to: this.config.scale },
            scaleY: { from: 0, to: this.config.scale },
            alpha: { from: 0, to: 1 },
            duration: 1000,
            ease: "Power2"
        });

        return this;
    }

    moveUp() {
        this.setVelocityY(-this.config.speed);
        this.play("plane_up", true);
    }

    moveDown() {
        // Check if moving down would put us below ground
        if (this.y + this.height/2 + this.config.speed/60 < this.groundY) {
            this.setVelocityY(this.config.speed);
            this.play("plane_down", true);
        } else {
            // Stop at ground level
            this.setVelocityY(0);
            this.y = this.groundY - this.height/2;
            this.play("plane_idle", true);
        }
    }

    moveLeft() {
        this.setVelocityX(-this.config.speed);
    }

    moveRight() {
        this.setVelocityX(this.config.speed);
    }

    idle() {
        this.setVelocity(0);
        this.play("plane_idle", true);
    }

    takeDamage(amount) {
        if (this.isInvulnerable) return this.config.health;

        this.config.health = Math.max(0, this.config.health - amount);
        
        // Flash red and become temporarily invulnerable
        this.scene.tweens.add({
            targets: this,
            alpha: 0.5,
            duration: 100,
            yoyo: true,
            repeat: 3
        });

        this.isInvulnerable = true;
        this.scene.time.delayedCall(this.config.invulnerableTime, () => {
            this.isInvulnerable = false;
        });

        // Emit event if health reaches 0
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

    shoot() {
        const currentTime = this.scene.time.now;
        if (currentTime - this.lastShootTime < this.config.shootDelay) {
            return;
        }

        // Create plane attack projectile
        const attack = new PlaneAttack(
            this.scene,
            this.x + this.width / 2,
            this.y,
            {
                scale: this.config.projectileScale,
                speed: this.config.projectileSpeed,
                damage: 10
            }
        );
        
        // Add to projectiles group
        this.projectiles.add(attack);
        
        // Play attack animation
        this.play("plane_attack", true);
        
        this.lastShootTime = currentTime;
    }

    update(cursors) {
        // Handle movement
        if (this.y + this.height/2 > this.groundY) {
            this.y = this.groundY - this.height/2;
        }

        // Clean up destroyed projectiles
        this.projectiles.children.each(projectile => {
            if (!projectile.active) {
                this.projectiles.remove(projectile, true, true);
            }
        });

        // Handle shooting with spacebar
        if (cursors?.space?.isDown) {
            this.shoot();
        }
    }
}
