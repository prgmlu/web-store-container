const modulesBase = 'https://modules.obsess-vr.com/beta';

const componentConfig = {
	topUILayer: {
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
							redirectUrl: 'https://www.ralphlauren.com/?utm_source=milan-spiga',
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
							redirectUrl: 'https://www.ralphlauren.com/?utm_source=milan-spiga',
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
	productModal: {
		kind: 'modal',
		remoteConfig: {
			url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/product-modal/main/remoteEntry.js`,
			scope: 'product_modal',
			module: './ProductModal',
		},
		modalConfig: {
			selector: 'productModal',
			defaultOpen: false,
			centered: true,
		},
		controllerSubscriptions: ['getProductData'],
	},
	videoModal: {
		kind: 'modal',
		remoteConfig: {
			url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/video-modal/main/remoteEntry.js`,
			scope: 'video_modal',
			module: './VideoModal',
		},
		modalConfig: {
			selector: 'videoModal',
			defaultOpen: false,
			centered: true,
		},
		controllerSubscriptions: [],
	},
};

export const modalKeys = {
	product: 'productModal',
	video: 'videoModal',
};

export default componentConfig;
