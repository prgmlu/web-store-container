const modulesBase = 'https://modules.obsess-vr.com/beta';

const componentConfig = {
	modules: {
		getProductData: {
			remoteConfig: {
				url: `${modulesBase}/ObsessVR/v2/modules-library/product-data/main/remoteEntry.js`,
				// url: `http://localhost:3007/remoteEntry.js`,
				scope: 'product_data_module',
				module: './modules',
			},
		},
	},
	overlayComponents: {
		kind: 'container',
		components: [
			{
				kind: 'container',
				containerStyling: {
					backgroundColor: 'blue',
					display: 'inline',
				},
				components: [
					{
						kind: 'component',
						name: 'store_logo',
						remoteConfig: {
							url: `${modulesBase}/ObsessVR/v2/component-library/feature-components/store-logo/main/remoteEntry.js`,
							scope: 'store_logo',
							module: './StoreLogo',
						},
						componentProps: {
							imageUrl:
								'https://cdn.obsess-vr.com/obsess-cms-beta/clients/Ralph_Lauren/5f176763135089517fd8a1c6/images/RL-logo-White.png',
							redirectUrl:
								'https://www.ralphlauren.com/?utm_source=milan-spiga',
						},
						styling: {
							width: '20%',
							height: 'auto',
						},
					},
				],
			},
			{
				kind: 'container',
				containerStyling: {
					backgroundColor: 'green',
					bottom: '0',
					right: '0',
					position: 'fixed',
				},
				components: [
					{
						kind: 'component',
						name: 'store_logo',
						remoteConfig: {
							url: `${modulesBase}/ObsessVR/v2/component-library/feature-components/store-logo/main/remoteEntry.js`,
							scope: 'store_logo',
							module: './StoreLogo',
						},
						componentProps: {
							imageUrl:
								'https://cdn.obsess-vr.com/obsess-cms-beta/clients/Ralph_Lauren/5f176763135089517fd8a1c6/images/RL-logo-White.png',
							redirectUrl:
								'https://www.ralphlauren.com/?utm_source=milan-spiga',
						},
						styling: {
							width: '20%',
							height: 'auto',
						},
					},
				],
			},
		],
	},
	modals: {
		productModal: {
			kind: 'modal',
			remoteConfig: {
				url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/product-modal/main/remoteEntry.js`,
				// url: `http://localhost:3002/remoteEntry.js`,
				scope: 'product_modal',
				module: './ProductModal',
			},
			modalConfig: {
				selector: 'product',
				defaultOpen: false,
				centered: true,
				animation: true,
			},
			controllerSubscriptions: ['axios', 'getProductData'],
		},
		videoModal: {
			kind: 'modal',
			remoteConfig: {
				url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/video-modal/main/remoteEntry.js`,
				// url: `http://localhost:3008/remoteEntry.js`,
				scope: 'video_modal',
				module: './VideoModal',
			},
			modalConfig: {
				selector: 'video',
				defaultOpen: false,
				centered: true,
				animation: true,
				size: 'sm',
			},
			controllerSubscriptions: [],
		},
		videoWithButtonModal: {
			kind: 'modal',
			remoteConfig: {
				url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/video-with-button-modal/main/remoteEntry.js`,
				// url: `http://localhost:3011/remoteEntry.js`,
				scope: 'video_with_button_modal',
				module: './VideoWithButtonModal',
			},
			modalConfig: {
				selector: 'video_with_button',
				defaultOpen: false,
				centered: true,
				animation: true,
				size: 'sm',
			},
			controllerSubscriptions: [],
		},
		textModal: {
			kind: 'modal',
			remoteConfig: {
				url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/text-modal/main/remoteEntry.js`,
				scope: 'text_modal',
				module: './TextModal',
			},
			modalConfig: {
				selector: 'textbox',
				defaultOpen: false,
				centered: true,
				animation: true,
			},
			controllerSubscriptions: [],
		},
		textWithButtonModal: {
			kind: 'modal',
			remoteConfig: {
				url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/text-with-button-modal/main/remoteEntry.js`,
				// url: `http://localhost:3009/remoteEntry.js`,
				scope: 'text_with_button_modal',
				module: './TextWithButtonModal',
			},
			modalConfig: {
				selector: 'text_with_button',
				defaultOpen: false,
				centered: true,
				animation: true,
			},
			controllerSubscriptions: [],
		},
		imageModal: {
			kind: 'modal',
			remoteConfig: {
				url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/image-modal/main/remoteEntry.js`,
				// url: `http://localhost:3012/remoteEntry.js`,
				scope: 'image_modal',
				module: './ImageModal',
			},
			modalConfig: {
				selector: 'image',
				defaultOpen: false,
				centered: true,
				animation: true,
				size: 'md',
			},
			controllerSubscriptions: [],
		},
	},
};

export default componentConfig;
