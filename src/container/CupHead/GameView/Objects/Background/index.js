export class Background {
	constructor(scene) {
		this.scene = scene;
		this.layers = new Map();
		this.setupLayers();
	}

	setupLayers() {
		const width = window.innerWidth;
		const height = window.innerHeight;

		// this.layers.set('sky', {
		//     sprite: this.scene.add.tileSprite(0, 0, width, height, 'bg_sky')
		//         .setOrigin(0, 0)
		//         .setScrollFactor(0),
		//     speed: 0
		// });

		const groundTexture = this.scene.textures.get("bg_ground");
		const groundHeight = groundTexture.getSourceImage().height;

		const bgTexture = this.scene.textures.get("baroness_bg_loop");
		const bgHeight = bgTexture.getSourceImage().height;

		this.layers.set("ground", {
			sprite: this.scene.add
				.tileSprite(0, height - groundHeight, width, groundHeight, "bg_ground")
				.setOrigin(0, 0)
				.setScrollFactor(0),
			speed: 3,
		});

		this.layers.set("baronessBg", {
			sprite: this.scene.add
				.tileSprite(
					0,
					height - groundHeight - bgHeight + 70,
					width,
					bgHeight,
					"baroness_bg_loop"
				)
				.setOrigin(0, 0)
				.setScrollFactor(0),
			speed: 2,
		});

		// this.layers.get('sky').sprite.setDepth(-2);
		this.layers.get("baronessBg").sprite.setDepth(-1);
		this.layers.get("ground").sprite.setDepth(0);
	}

	update() {
		for (const layer of this.layers.values()) {
			layer.sprite.tilePositionX += layer.speed;
		}
	}

	resize() {
		const width = window.innerWidth;
		const height = window.innerHeight;

		// this.layers.get('sky').sprite.setSize(width, height);

		const groundSprite = this.layers.get("ground").sprite;
		const groundHeight = this.scene.textures
			.get("bg_ground")
			.getSourceImage().height;
		groundSprite.setSize(width, groundHeight);
		groundSprite.setPosition(0, height - groundHeight);

		const bgSprite = this.layers.get("baronessBg").sprite;
		const bgHeight = this.scene.textures
			.get("baroness_bg_loop")
			.getSourceImage().height;
		bgSprite.setSize(width, bgHeight);
		bgSprite.setPosition(0, height - groundHeight - bgHeight);
	}
}
