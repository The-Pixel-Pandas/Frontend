import Phaser from "phaser";
import { PlaneAttack } from "../PlaneAttack";

export class Plane extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, config = {}) {
		super(scene, x, y, "plane1");

		this.scene = scene;
		this.config = {
			speed: 200,
			bodyWidth: 60,
			bodyHeight: 30,
			scale: 1,
			health: 100,
			invulnerableTime: 1000,
			projectileSpeed: 400,
			projectileScale: 0.5,
			shootDelay: 250,
			...config,
		};

		this.scene.add.existing(this);
		this.scene.physics.add.existing(this);

		this.body.setSize(this.config.bodyWidth, this.config.bodyHeight);
		this.setCollideWorldBounds(true);
		this.setScale(this.config.scale);

		this.body.setOffset(
			(this.width - this.config.bodyWidth) / 2,
			(this.height - this.config.bodyHeight) / 2
		);

		const groundTexture = this.scene.textures.get("bg_ground");
		this.groundHeight = groundTexture.getSourceImage().height;
		this.groundY = window.innerHeight - this.groundHeight;

		this.isInvulnerable = false;
		this.lastShootTime = 0;

		this.projectiles = this.scene.physics.add.group({
			classType: PlaneAttack,
			runChildUpdate: true,
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

		if (!this.scene.anims.exists("plane_attack")) {
			this.scene.anims.create({
				key: "plane_attack",
				frames: [{ key: "plane1" }, { key: "plane2" }, { key: "plane3" }],
				frameRate: 15,
				repeat: 0,
			});
		}
	}

	spawn() {
		this.play("plane_idle");

		this.scene.tweens.add({
			targets: this,
			scaleX: { from: 0, to: this.config.scale },
			scaleY: { from: 0, to: this.config.scale },
			alpha: { from: 0, to: 1 },
			duration: 1000,
			ease: "Power2",
		});

		return this;
	}

	moveUp() {
		this.setVelocityY(-this.config.speed);
		this.play("plane_up", true);
	}

	moveDown() {
		if (this.y + this.height / 2 + this.config.speed / 60 < this.groundY) {
			this.setVelocityY(this.config.speed);
			this.play("plane_down", true);
		} else {
			this.setVelocityY(0);
			this.y = this.groundY - this.height / 2;
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

		this.scene.tweens.add({
			targets: this,
			alpha: 0.5,
			duration: 100,
			yoyo: true,
			repeat: 3,
		});

		this.isInvulnerable = true;
		this.scene.time.delayedCall(this.config.invulnerableTime, () => {
			this.isInvulnerable = false;
		});

		if (this.config.health <= 0) {
			this.emit("defeated");
		}

		return this.config.health;
	}

	getHealth() {
		return this.config.health;
	}

	getMaxHealth() {
		return 100;
	}

	shoot() {
		const currentTime = this.scene.time.now;
		if (currentTime - this.lastShootTime < this.config.shootDelay) {
			return;
		}

		const attack = new PlaneAttack(
			this.scene,
			this.x + this.width / 2,
			this.y,
			{
				scale: this.config.projectileScale,
				speed: this.config.projectileSpeed,
				damage: 10,
			}
		);

		this.projectiles.add(attack);

		this.play("plane_attack", true);

		this.lastShootTime = currentTime;
	}

	update(cursors) {
		if (this.y + this.height / 2 > this.groundY) {
			this.y = this.groundY - this.height / 2;
		}

		this.projectiles.children.each((projectile) => {
			if (!projectile.active) {
				this.projectiles.remove(projectile, true, true);
			}
		});

		if (cursors?.space?.isDown) {
			this.shoot();
			// this.scene.sound.play("attackSound");
		}
	}
}
