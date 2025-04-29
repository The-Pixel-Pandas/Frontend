import Phaser from "phaser";
import { Plane } from "../../Objects/Plane";
import { Baroness } from "../../Objects/Baroness";
import { Background } from "../../Objects/Background";

class GameScene extends Phaser.Scene {
	constructor() {
		super("GameScene");
		this.plane = null;
		this.baroness = null;
		this.background = null;
		this.cursors = null;
		this.gameOver = false;
		this.score = 0;
		this.lastScoreTime = 0;
	}

	create() {
		this.sound.add("theEndSound");
		this.sound.add("attackSound");
		this.sound.add("backGroundSound");
		this.sound.stopAll();
		this.sound.play("backGroundSound", { loop: true });
		this.background = new Background(this);

		this.cursors = this.input.keyboard.createCursorKeys();

		const groundTexture = this.textures.get("bg_ground");
		const groundHeight = groundTexture.getSourceImage().height;

		this.physics.world.setBounds(
			0,
			0,
			window.innerWidth,
			window.innerHeight - groundHeight
		);

		const planeX = this.cameras.main.centerX / 4;
		const planeY = this.cameras.main.centerY;
		this.plane = new Plane(this, planeX, planeY, {
			bodyWidth: 80,
			bodyHeight: 40,
			scale: 1,
		}).spawn();

		const bossX = this.cameras.main.width * 0.8;
		const bossY = this.cameras.main.height - groundHeight;
		this.baroness = new Baroness(this, bossX, bossY, {
			scale: 1,
			projectileSpeed: 300,
			attackInterval: 1000,
			projectilesPerAttack: 3,
			projectileSpread: 25,
		});

		this.cursors = this.input.keyboard.createCursorKeys();

		this.setupCollisions();

		this.gameOver = false;
		this.score = 0;
		this.lastScoreTime = 0;

		this.createHealthBars();
		this.createScoreText();

		this.time.addEvent({
			delay: 1000,
			callback: () => {
				if (!this.gameOver) {
					this.updateScore(1);
				}
			},
			loop: true,
		});
	}

	convertToFarsiNumbers = (num) => {
		const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
		return num.toString().replace(/\d/g, (x) => farsiDigits[x]);
	};

	setupCollisions() {
		this.physics.add.overlap(
			this.plane.projectiles,
			this.baroness,
			(baroness, projectile) => {
				projectile.destroy();
				const bossHealth = baroness.takeDamage(projectile.getDamage());
				this.updateHealthBars();

				if (bossHealth <= 0) {
					this.onBossDefeated();
				}
			}
		);

		this.physics.add.overlap(
			this.baroness.projectiles,
			this.plane,
			(plane, projectile) => {
				projectile.destroy();
				const playerHealth = plane.takeDamage(projectile.getDamage());
				this.updateHealthBars();

				if (playerHealth <= 0) {
					this.onGameOver(false);
				}
			}
		);
	}

	createHealthBars() {
		this.playerHealthBar = this.add.graphics();
		this.bossHealthBar = this.add.graphics();

		this.playerHealthBar.setScrollFactor(0);
		this.bossHealthBar.setScrollFactor(0);

		this.updateHealthBars();
	}

	updateHealthBars() {
		this.playerHealthBar.clear();
		this.bossHealthBar.clear();

		const playerHealth = this.plane.getHealth();
		const playerMaxHealth = this.plane.getMaxHealth();
		const playerHealthPercent = playerHealth / playerMaxHealth;

		this.playerHealthBar.fillStyle(0xff0000);
		this.playerHealthBar.fillRect(10, 50, 200, 20);
		this.playerHealthBar.fillStyle(0x00ff00);
		this.playerHealthBar.fillRect(10, 50, 200 * playerHealthPercent, 20);
		this.playerHealthBar.lineStyle(2, 0xffffff);
		this.playerHealthBar.strokeRect(10, 50, 200, 20);

		const bossHealth = this.baroness.getHealth();
		const bossMaxHealth = this.baroness.getMaxHealth();
		const bossHealthPercent = bossHealth / bossMaxHealth;

		const bossBarX = this.cameras.main.width - 210;
		this.bossHealthBar.fillStyle(0xff0000);
		this.bossHealthBar.fillRect(bossBarX, 50, 200, 20);
		this.bossHealthBar.fillStyle(0x00ff00);
		this.bossHealthBar.fillRect(bossBarX, 50, 200 * bossHealthPercent, 20);
		this.bossHealthBar.lineStyle(2, 0xffffff);
		this.bossHealthBar.strokeRect(bossBarX, 50, 200, 20);

		if (playerHealth <= 0 && !this.gameOver) {
			this.onGameOver(false);
		} else if (bossHealth <= 0 && !this.gameOver) {
			this.onGameOver(true);
		}
	}

	createScoreText() {
		this.scoreText = this.add.text(
			16,
			16,
			`امتیاز: ${this.convertToFarsiNumbers(this.score)}`,
			{
				fontSize: "26px",
				fill: "#fff",
				fontFamily: "morabbaFont",
			}
		);
		this.scoreText.setScrollFactor(0);
		this.scoreText.setDepth(1000);
	}

	updateScore(points) {
		this.score += points;
		this.scoreText.setText(`امتیاز: ${this.convertToFarsiNumbers(this.score)}`);
	}

	onPlayerHit(damage) {
		if (this.gameOver) return;

		const health = this.plane.takeDamage(damage);

		this.updateHealthBars();

		if (health <= 0) {
			this.gameOver = true;
			this.onGameOver(false);
		}
	}

	onBossDefeated() {
		if (this.gameOver) return;

		this.gameOver = true;
		this.updateScore(1000);
		this.updateHealthBars();
		this.onGameOver(true);
	}

	onGameOver(playerWon) {
		if (this.gameOver) return;
		this.gameOver = true;
		this.sound.play("theEndSound");

		this.plane.setVelocity(0);
		this.baroness.setVelocity(0);

		const overlay = this.add.graphics();
		overlay.fillStyle(0x000000, 0.7);
		overlay.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);
		overlay.setDepth(998);

		const text = playerWon ? "شما برنده شدید" : "شما باختید";
		const color = playerWon ? "#00ff00" : "#ff0000";

		const gameOverText = this.add
			.text(this.cameras.main.centerX, this.cameras.main.centerY - 100, text, {
				fontSize: "64px",
				fill: color,
				fontStyle: "bold",
				fontFamily: "morabbaFont",
			})
			.setOrigin(0.5);
		gameOverText.setDepth(999);

		const scoreText = this.add
			.text(
				this.cameras.main.centerX,
				this.cameras.main.centerY - 15,
				`امتیاز نهایی: ${this.convertToFarsiNumbers(this.score)}`,
				{
					fontSize: "32px",
					fill: "#ffffff",
					fontFamily: "morabbaFont",
				}
			)
			.setOrigin(0.5);
		scoreText.setDepth(999);

		if (localStorage.getItem("score") < this.score) {
			localStorage.setItem("score", this.score);
		}

		const recordText = this.add
			.text(
				this.cameras.main.centerX,
				this.cameras.main.centerY + 30,
				` رکورد شما: ${this.convertToFarsiNumbers(localStorage.getItem("score"))}`,
				{
					fontSize: "32px",
					fill: "#ffffff",
					fontFamily: "morabbaFont",
				}
			)
			.setOrigin(0.5);
		recordText.setDepth(999);

		const restartButton = this.add
			.text(
				this.cameras.main.centerX,
				this.cameras.main.centerY + 100,
				"بازی دوباره",
				{
					fontSize: "24px",
					fill: "#ffffff",
					backgroundColor: "#444444",
					padding: { x: 20, y: 10 },
					fontFamily: "morabbaFont",
				}
			)
			.setOrigin(0.5)
			.setInteractive()
			.on("pointerover", () => restartButton.setStyle({ fill: "#ffff00" }))
			.on("pointerout", () => restartButton.setStyle({ fill: "#ffffff" }))
			.on("pointerdown", () => this.scene.restart());

		restartButton.setDepth(999);

		const backButton = this.add
			.text(
				this.cameras.main.centerX,
				this.cameras.main.centerY + 180,
				"بازگشت به خانه",
				{
					fontSize: "24px",
					fill: "#ffffff",
					backgroundColor: "#444444",
					padding: { x: 20, y: 10 },
					fontFamily: "morabbaFont",
				}
			)
			.setOrigin(0.5)
			.setInteractive()
			.on("pointerover", () => backButton.setStyle({ fill: "#ffff00" }))
			.on("pointerout", () => backButton.setStyle({ fill: "#ffffff" }))
			.on("pointerdown", () => {
				window.location.href = "/";
			});

		backButton.setDepth(999);
	}

	update() {
		if (this.gameOver) return;

		if (this.cursors.left.isDown) {
			this.plane.moveLeft();
		} else if (this.cursors.right.isDown) {
			this.plane.moveRight();
		} else {
			this.plane.setVelocityX(0);
		}

		if (this.cursors.up.isDown) {
			this.plane.moveUp();
		} else if (this.cursors.down.isDown) {
			this.plane.moveDown();
		} else {
			this.plane.setVelocityY(0);
		}

		this.plane.update(this.cursors);
		this.baroness.update();
		this.background.update();

		this.updateHealthBars();
	}
}

export { GameScene };
