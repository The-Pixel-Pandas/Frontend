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
	}

	create() {
		// Set up the background
		this.background = new Background(this);

		// Initialize keyboard cursors
		this.cursors = this.input.keyboard.createCursorKeys();

		// Get ground height for plane boundaries
		const groundTexture = this.textures.get('bg_ground');
		const groundHeight = groundTexture.getSourceImage().height;
		
		// Set up world bounds with ground consideration
		this.physics.world.setBounds(
			0, 
			0, 
			window.innerWidth, 
			window.innerHeight - groundHeight
		);

		// Create player plane
		const planeX = this.cameras.main.centerX / 4;
		const planeY = this.cameras.main.centerY;
		this.plane = new Plane(this, planeX, planeY, {
			bodyWidth: 80,
			bodyHeight: 40,
			scale: 1
		}).spawn();

		// Create Baroness boss at ground level
		const bossX = this.cameras.main.width * 0.8; 
		const bossY = this.cameras.main.height - groundHeight;
		this.baroness = new Baroness(this, bossX, bossY, {
			scale: 1,
			projectileSpeed: 250,
			attackInterval: 2000,
			projectilesPerAttack: 3,
			projectileSpread: 25
		});

		// Set up input
		this.cursors = this.input.keyboard.createCursorKeys();

		// Set up collision handling
		this.setupCollisions();

		// Initialize game state
		this.gameOver = false;
		this.score = 0;

		// Create UI elements
		this.createHealthBars();
		this.createScoreText();
	}

	setupCollisions() {
		// Handle collisions between player projectiles and baroness
		this.physics.add.overlap(
			this.plane.projectiles,
			this.baroness,
			(baroness, projectile) => {
				projectile.destroy();
				baroness.takeDamage(projectile.getDamage());
				this.updateHealthBars();
			}
		);

		// Handle collisions between baroness projectiles and player
		this.physics.add.overlap(
			this.baroness.projectiles,
			this.plane,
			(plane, projectile) => {
				projectile.destroy();
				plane.takeDamage(projectile.getDamage());
				this.updateHealthBars();
			}
		);
	}

	createHealthBars() {
        // Create graphics objects for health bars
        this.playerHealthBar = this.add.graphics();
        this.bossHealthBar = this.add.graphics();
        
        // Set fixed scroll factor to keep UI elements on screen
        this.playerHealthBar.setScrollFactor(0);
        this.bossHealthBar.setScrollFactor(0);
        
        // Initial update
        this.updateHealthBars();
	}

	updateHealthBars() {
        // Clear previous graphics
        this.playerHealthBar.clear();
        this.bossHealthBar.clear();

        // Update player health bar
        const playerHealth = this.plane.getHealth();
        const playerMaxHealth = this.plane.getMaxHealth();
        const playerHealthPercent = playerHealth / playerMaxHealth;

        // Draw player health bar (left side)
        this.playerHealthBar.fillStyle(0xff0000); // Red background
        this.playerHealthBar.fillRect(10, 50, 200, 20);
        this.playerHealthBar.fillStyle(0x00ff00); // Green health
        this.playerHealthBar.fillRect(10, 50, 200 * playerHealthPercent, 20);
        this.playerHealthBar.lineStyle(2, 0xffffff); // White border
        this.playerHealthBar.strokeRect(10, 50, 200, 20);

        // Update boss health bar
        const bossHealth = this.baroness.getHealth();
        const bossMaxHealth = this.baroness.getMaxHealth();
        const bossHealthPercent = bossHealth / bossMaxHealth;

        // Draw boss health bar (right side)
        const bossBarX = this.cameras.main.width - 210;
        this.bossHealthBar.fillStyle(0xff0000); // Red background
        this.bossHealthBar.fillRect(bossBarX, 50, 200, 20);
        this.bossHealthBar.fillStyle(0x00ff00); // Green health
        this.bossHealthBar.fillRect(bossBarX, 50, 200 * bossHealthPercent, 20);
        this.bossHealthBar.lineStyle(2, 0xffffff); // White border
        this.bossHealthBar.strokeRect(bossBarX, 50, 200, 20);
	}

	createScoreText() {
        // Add score text with fixed position
        this.scoreText = this.add.text(16, 16, 'Score: 0', {
            fontSize: '32px',
            fill: '#fff',
            fontFamily: 'Arial'
        });
        this.scoreText.setScrollFactor(0);
        this.scoreText.setDepth(1000); // Ensure it's always on top
    }

    updateScore(points) {
        this.score += points;
        this.scoreText.setText('Score: ' + this.score);
    }

	onPlayerHit(damage) {
        if (this.gameOver) return;

        // Apply damage to player
        const health = this.plane.takeDamage(damage);
        
        // Update health bars
        this.updateHealthBars();
        
        if (health <= 0) {
            this.gameOver = true;
            this.onGameOver(false); // Player lost
        }
	}

	onBossDefeated() {
        if (this.gameOver) return;
        
        this.gameOver = true;
        this.updateScore(1000); // Add score for defeating boss
        this.updateHealthBars(); // Update health bars one last time
        this.onGameOver(true); // Player won
	}

	onGameOver(playerWon) {
		// Stop all movement
		this.plane.setVelocity(0);
		
		// Display game over text
		const text = playerWon ? 'Victory!' : 'Game Over';
		const color = playerWon ? '#00ff00' : '#ff0000';
		
		this.add.text(
			this.cameras.main.centerX,
			this.cameras.main.centerY,
			text,
			{
				fontSize: '64px',
				fill: color
			}
		).setOrigin(0.5);

		// Add restart button
		const restartButton = this.add.text(
			this.cameras.main.centerX,
			this.cameras.main.centerY + 100,
			'Click to Restart',
			{
				fontSize: '32px',
				fill: '#ffffff'
			}
		)
		.setOrigin(0.5)
		.setInteractive();

		restartButton.on('pointerdown', () => {
			this.scene.restart();
		});
	}

	update() {
        if (this.gameOver) return;

        // Update player movement based on input
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

        // Auto-shoot
        // this.plane.shoot();

        // Update game objects
        this.plane.update(this.cursors);
        this.baroness.update();
        this.background.update();

        // Update UI
        this.updateHealthBars();
	}
}

export { GameScene };
