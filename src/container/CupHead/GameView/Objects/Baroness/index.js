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
			...config,
		};

		this.scene.add.existing(this);
		this.scene.physics.add.existing(this);

		this.body.setImmovable(true);

		const groundTexture = this.scene.textures.get("bg_ground");
		this.groundHeight = groundTexture.getSourceImage().height;
		this.y = window.innerHeight - this.groundHeight - this.height / 2;

		this.projectiles = this.scene.physics.add.group();

		this.setupAnimations();

		this.attackTimer = this.scene.time.addEvent({
			delay: this.config.attackInterval,
			callback: () => this.attack(this.scene.plane),
			callbackScope: this,
			loop: true,
		});

		this.play("baroness_shoot");
	}

	setupAnimations() {
		if (!this.scene.anims.exists("baroness_shoot")) {
			const frames = Array.from({ length: 35 }, (_, i) => ({
				key: `baroness_shoot_${i + 1}`,
			}));

			this.scene.anims.create({
				key: "baroness_shoot",
				frames: frames,
				frameRate: 15,
				repeat: -1,
			});
		}

		this.on("animationcomplete", this.onAnimComplete, this);
	}

	onAnimComplete(animation) {
		if (animation.key === "baroness_shoot") {
			this.scene.time.delayedCall(300, () => {
				this.play("baroness_shoot");
			});
		}
	}

	attack(target) {
		if (!target || !target.active) return;

		const projectile = new Projectile(
			this.scene,
			this.x - 150,
			this.y - this.height / 3 + 150,
			{
				isEnemy: true,
				speed: this.config.projectileSpeed,
				scale: this.config.projectileScale,
				damage: 10,
			}
		);

		this.projectiles.add(projectile);

		const angle = Phaser.Math.Angle.Between(
			projectile.x,
			projectile.y,
			target.x,
			target.y
		);

		const velocity = new Phaser.Math.Vector2(
			Math.cos(angle) * this.config.projectileSpeed,
			Math.sin(angle) * this.config.projectileSpeed
		);
		projectile.setVelocity(velocity.x, velocity.y);

		projectile.on("destroy", () => {
			this.projectiles.remove(projectile);
		});
	}

	update() {
		this.projectiles.getChildren().forEach((projectile) => {
			if (
				!projectile.active ||
				projectile.x < 0 ||
				projectile.y < 0 ||
				projectile.x > this.scene.game.config.width ||
				projectile.y > this.scene.game.config.height
			) {
				projectile.destroy();
			}
		});
	}

	takeDamage(amount) {
		this.config.health = Math.max(0, this.config.health - amount);

		this.scene.tweens.add({
			targets: this,
			alpha: 0.5,
			duration: 100,
			yoyo: true,
			repeat: 2,
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
}
