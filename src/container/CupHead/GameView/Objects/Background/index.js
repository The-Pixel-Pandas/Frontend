export class Background {
    constructor(scene) {
        this.scene = scene;
        this.layers = new Map();
        this.setupLayers();
    }

    setupLayers() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        // Sky (static background) - covers full screen
        // this.layers.set('sky', {
        //     sprite: this.scene.add.tileSprite(0, 0, width, height, 'bg_sky')
        //         .setOrigin(0, 0)
        //         .setScrollFactor(0),
        //     speed: 0
        // });

        // Get the ground image dimensions first
        const groundTexture = this.scene.textures.get('bg_ground');
        const groundHeight = groundTexture.getSourceImage().height;

        // Get the baroness background image dimensions
        const bgTexture = this.scene.textures.get('baroness_bg_loop');
        const bgHeight = bgTexture.getSourceImage().height;
        
        // Ground layer (scrolling) - positioned at very bottom
        this.layers.set('ground', {
            sprite: this.scene.add.tileSprite(
                0,                          // x position
                height - groundHeight,      // y position (bottom aligned)
                width,                      // width (full screen width)
                groundHeight,               // height (original image height)
                'bg_ground'
            )
                .setOrigin(0, 0)
                .setScrollFactor(0),
            speed: 3
        });

        // Baroness background loop (scrolling) - positioned directly above ground
        this.layers.set('baronessBg', {
            sprite: this.scene.add.tileSprite(
                0,                          // x position
                height - groundHeight - bgHeight + 70, // position exactly above ground
                width,                      // width (full screen width)
                bgHeight,                   // height (original image height)
                'baroness_bg_loop'
            )
                .setOrigin(0, 0)
                .setScrollFactor(0),
            speed: 2
        });

        // Set depths to ensure proper layering
        // this.layers.get('sky').sprite.setDepth(-2);
        this.layers.get('baronessBg').sprite.setDepth(-1);
        this.layers.get('ground').sprite.setDepth(0);
    }

    update() {
        // Update each layer's position
        for (const layer of this.layers.values()) {
            layer.sprite.tilePositionX += layer.speed;
        }
    }

    resize() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        // Resize sky to full screen
        // this.layers.get('sky').sprite.setSize(width, height);

        // Get ground dimensions
        const groundSprite = this.layers.get('ground').sprite;
        const groundHeight = this.scene.textures.get('bg_ground').getSourceImage().height;
        groundSprite.setSize(width, groundHeight);
        groundSprite.setPosition(0, height - groundHeight);

        // Resize baroness background and position it above ground
        const bgSprite = this.layers.get('baronessBg').sprite;
        const bgHeight = this.scene.textures.get('baroness_bg_loop').getSourceImage().height;
        bgSprite.setSize(width, bgHeight);
        bgSprite.setPosition(0, height - groundHeight - bgHeight);
    }
}
