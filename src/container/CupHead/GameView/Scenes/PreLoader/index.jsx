import Phaser from "phaser";
import { assets } from "../../../Constants/Asset/index";

class PreLoader extends Phaser.Scene {
	constructor() {
		super("PreLoader");
		this.progressWidth = 0;
		this.progressHeight = 0;
		this.progressBar = null;
		this.loadingText = null;
		this.targetProgress = 0;
		this.currentProgress = 0;
		this.progressSpeed = 0.01;
	}

	preload() {
		this.loadAssets();
		this.setupProgressBar();
	}

	setupProgressBar = () => {
		const { centerX, centerY } = this.cameras.main;
		this.progressWidth = window.innerWidth / 2;
		this.progressHeight = window.innerHeight / 50;

		this.add
			.graphics()
			.lineStyle(3, 0xffffff)
			.strokeRoundedRect(
				centerX - this.progressWidth / 2,
				centerY - this.progressHeight / 2,
				this.progressWidth,
				this.progressHeight,
				10
			);

		this.progressBar = this.add.graphics();

		this.loadingText = this.add
			.text(
				centerX,
				centerY + this.progressHeight / 2 + 50,
				"در حال بارگذاری",
				{
					fontSize: `${(this.progressHeight * 3) / 2}px`,
					color: "#ffffff",
					fontFamily: "Arial",
				}
			)
			.setOrigin(0.5);

		this.load.on("progress", this.updateTargetProgress, this);
		this.load.on("complete", this.onLoadComplete, this);
		this.load.on("loaderror", this.onLoadError, this);

		this.time.addEvent({
			delay: 16,
			callback: this.updateProgressBar,
			callbackScope: this,
			loop: true,
		});
	};

	updateTargetProgress = (progress) => {
		this.targetProgress = progress;
	};

	updateProgressBar = () => {
		const { centerX, centerY } = this.cameras.main;

		if (this.currentProgress < this.targetProgress) {
			this.currentProgress = Math.min(
				this.currentProgress + this.progressSpeed,
				this.targetProgress
			);
		}

		this.progressBar.clear();

		this.progressBar.fillStyle(0xffffff, 1);
		this.progressBar.fillRoundedRect(
			centerX - this.progressWidth / 2,
			centerY - this.progressHeight / 2,
			this.progressWidth * this.currentProgress,
			this.progressHeight,
			10
		);

		if (this.currentProgress >= 1) {
			this.loadingText.setText("بارگذاری تکمیل شد");
		}
	};

	onLoadComplete = () => {
		console.log("Assets fully loaded");

		this.time.delayedCall(1000, () => {
			this.time.delayedCall(500, () => {
				this.scene.start("GameScene");
			});
		});
	};

	onLoadError = (file) => {
		console.error(`Failed to load asset: ${file.key}`);
		this.loadingText.setText(`Failed to load: ${file.key}`);
	};

	loadAssets = () => {
		assets.forEach((asset) => {
			if (
				asset.path.endsWith(".png") ||
				asset.path.endsWith(".jpg") ||
				asset.path.endsWith(".jpeg")
			) {
				this.load.image(asset.key, asset.path);
			} else if (asset.path.endsWith(".wav") || asset.path.endsWith(".mp3")) {
				this.load.audio(asset.key, asset.path);
			} else if (asset.path.endsWith(".ttf") || asset.path.endsWith(".otf")) {
				this.loadFont(asset.key, asset.path);
			}
		});
	};

	loadFont = (name, url) => {
		const newFont = new FontFace(name, `url(${url})`);
		newFont
			.load()
			.then((loaded) => {
				document.fonts.add(loaded);
				this.fontLoaded = true;
			})
			.catch((error) => {
				console.error(`Failed to load font: ${name}`, error);
			});
	};
}

export { PreLoader };
