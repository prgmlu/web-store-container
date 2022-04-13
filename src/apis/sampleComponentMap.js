import config from 'config';

const modulesBase = config.MODULES_BASE_URL;

const componentConfig = {
	'60468dbdfa6880c812fc8584': {
		modules: {
			getProductData: {
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/modules-library/product-data/variant/american-girl/remoteEntry.js`,
					// url: `http://localhost:3007/remoteEntry.js`,
					scope: 'product_data_module',
					module: './product_modules',
				},
			},
			cartController: {
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/modules-library/cart-controller/main/remoteEntry.js`,
					// url: `http://localhost:3014/remoteEntry.js`,
					scope: 'cart_controller_module',
					module: './cart_modules',
				},
			},
		},
		overlayComponents: {
			kind: 'container',
			components: [
				{
					kind: 'container',
					containerStyling: {
						display: 'inline',
					},
					components: [
						{
							name: 'store_logo',
							kind: 'component',
							remoteConfig: {
								url: `${modulesBase}/ObsessVR/v2/component-library/feature-components/store-logo/main/remoteEntry.js`,
								scope: 'store_logo',
								module: './StoreLogo',
							},
							styling: {
								width: '17rem',
								height: 'auto',
								padding: '16px',
								borderRadius: '10px',
							},
						},
					],
				},
				{
					kind: 'container',
					containerStyling: {
						position: 'fixed',
						right: 0,
						top: 0,
						display: 'flex',
						padding: '8px',
					},
					components: [
						{
							name: 'cart_component',
							kind: 'component',
							remoteConfig: {
								url: `${modulesBase}/ObsessVR/v2/component-library/feature-components/cart-component/main/remoteEntry.js`,
								// url: `http://localhost:3016/remoteEntry.js`,
								scope: 'cart_component',
								module: './CartComponent',
							},
							styling: {
								alignItems: 'center',
								display: 'flex',
								flexDirection: 'column',
								marginRight: '1em',
							},
							iconStyling: {
								height: '2em',
								width: 'auto',
							},
						},
						{
							name: 'navigation_menu',
							kind: 'component',
							remoteConfig: {
								url: `${modulesBase}/ObsessVR/v2/component-library/feature-components/navigation-menu/variant/american-girl/remoteEntry.js`,
								scope: 'navigation_menu',
								module: './NavigationMenu',
							},
							styling: {
								alignItems: 'center',
								display: 'flex',
								flexDirection: 'column',
							},
							iconStyling: {
								height: '2em',
								width: 'auto',
								color: 'red',
							},
							menuStyling: {
								paddingTop: '20px',
								paddingBottom: '30px',
								paddingLeft: '20px',
								paddingRight: '20px',
								width: '10vw',
								borderRadius: '0px 0px 0px 30px',
								border: 'none',
							},
							primaryTextStyle: {
								color: '#000000',
								fontWeight: 1,
							},
							secondaryTextStyle: {
								color: '#00000050',
								fontWeight: 5,
							},
							navItems: [
								{
									logoUrl:
										'https://cdn.obsess-vr.com/american-girl/AGPlace_Logo.svg',
									links: [
										{
											name: 'Store entrance',
											isLink: true,
											path: '',
										},
										{
											name: 'First floor',
											subLinks: [
												{
													name: 'World By Us',
													path: 'world-by-us-ny',
												},
												{
													name: 'Cultural Celebrations',
													path: 'view-5',
												},
												{
													name: 'Girl of the year: Kira Bailey',
													path: 'view-7',
												},
												{
													name: 'Julie Albright 1974',
													path: 'julie',
												},
												{
													name: 'Courtney Moore 1986',
													path: 'courtney',
												},
												{
													name: 'Holiday Shop',
													path: 'view-16',
												},
												{
													name: 'Truly Me',
													path: 'truly-me',
												},
												{
													name: 'Dolled Up Salon',
													path: 'salon',
												},
												{
													name: 'Doll Hospital',
													path: 'view-39',
												},
											],
										},
										{
											name: 'Lower level',
											subLinks: [
												{
													name: 'Historical characters',
													path: 'historical-character',
												},
												{
													name: 'The Corner Book Shop',
													path: 'bookshop',
												},
												{
													name: 'WellieWishers',
													path: 'view-84',
												},
												{
													name: 'Bitty Baby',
													path: 'view-86',
												},
												{
													name: 'American Girl Caf\u00e9',
													path: 'cafe',
												},
												{
													name: 'Personal shopping',
													path: 'view-75',
												},
											],
										},
									],
								},
								{
									logoUrl:
										'https://cdn.obsess-vr.com/american-girl/AGMuseum_logo.svg',
									path: 'museum',
									isLink: true,
									links: [
										{
											name: 'First floor',
											isLink: false,
											subLinks: [
												{
													name: 'Entrance',
													path: 'museum-entry',
												},
												{
													name: 'Felicity Merriman 1774',
													path: 'museum-felicity',
												},
												{
													name: 'Josefina Montoya 1824',
													path: 'museum-josefina',
												},
												{
													name: 'Kirsten Larson 1854',
													path: 'museum-kirsten',
												},
												{
													name: 'Addy Walker 1864',
													path: 'museum-addy',
												},
												{
													name: 'Samantha Parkington 1904',
													path: 'museum-samantha',
												},
												{
													name: 'Molly McIntire 1944',
													path: 'museum-molly',
												},
												{
													name: 'American Girl garage',
													path: 'museum-garage',
												},
												{
													name: 'Historical character archives',
													path: 'museum-hc',
												},
											],
										},
										{
											name: 'Second floor',
											subLinks: [
												{
													name: 'Kaya 1764',
													path: 'museum-kaya',
												},
												{
													name: 'Rebecca Rubin 1914',
													path: 'museum-rebecca',
												},
												{
													name: 'Kit Kittredge 1934',
													path: 'museum-kit',
												},
												{
													name: 'Nanea Mitchell 1941',
													path: 'museum-nanea',
												},
												{
													name: 'Maryellen Larkin 1954',
													path: 'museum-maryellen',
												},
												{
													name: 'Melody Ellison 1964',
													path: 'museum-melody',
												},
												{
													name: 'Courtney Moore 1986',
													path: 'museum-courtney',
												},
												{
													name: 'Girl of the Year archives',
													path: 'museum-goty',
												},
											],
										},
										{
											name: 'Third floor',
											subLinks: [
												{
													name: 'Kira Bailey 2021',
													path: 'museum-kira',
												},
												{
													name: 'World by Us',
													path: 'world-by-us',
												},
												{
													name: 'American Girl play lounge',
													path: 'museum-play',
												},
											],
										},
										{
											name: 'Gift shop',
											isLink: true,
											path: 'museum-gifts',
										},
									],
								},
							],
						},
					],
				},
				{
					kind: 'container',
					containerStyling: {
						position: 'fixed',
						right: 0,
						bottom: 0,
						padding: '4px',
					},
					components: [
						{
							name: 'music_controller',
							kind: 'component',
							remoteConfig: {
								url: `${modulesBase}/ObsessVR/v2/component-library/feature-components/music-controller/main/remoteEntry.js`,
								// url: `http://localhost:3006/remoteEntry.js`,
								scope: 'music_controller',
								module: './MusicController',
							},
						},
						{
							name: 'powered_by_obsess',
							kind: 'component',
							remoteConfig: {
								url: `${modulesBase}/ObsessVR/v2/component-library/feature-components/powered-by-obsess/main/remoteEntry.js`,
								scope: 'powered_by_obsess',
								module: './PoweredByObsess',
							},
							textStyling: { color: 'white', fontSize: '0.9rem' },
						},
					],
				},
				{
					kind: 'container',
					containerStyling: {
						position: 'fixed',
						top: '40%',
						display: 'flex',
					},
					components: [
						{
							name: 'some_component',
							kind: 'action_component',
							remoteConfig: {
								url: `${modulesBase}/ObsessVR/v2/component-library/pure-components/clickable-image/main/remoteEntry.js`,
								// url: `http://localhost:3010/remoteEntry.js`,
								scope: 'clickable_image',
								module: './ClickableImage',
							},
							imageStyling: {
								width: '40px',
								height: 'auto',
							},
							imageUrl:
								'https://cdn.obsess-vr.com/american-girl/AG_write_review.png',
							actionType: 'triggerModal',
							actionProps: {
								selector: 'image',
								// link: 'https://obsessar.com',
							},
						},
					],
				},
			],
		},
		modals: [
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/product-modal/main/remoteEntry.js`,
					// url: `http://localhost:3002/remoteEntry.js`,
					scope: 'product_modal',
					module: './ProductModal',
				},
				modalConfig: {
					selector: 'product',

					centered: true,
					animation: true,
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/video-modal/main/remoteEntry.js`,
					// url: `http://localhost:3008/remoteEntry.js`,
					scope: 'video_modal',
					module: './VideoModal',
				},
				modalConfig: {
					selector: 'video',

					centered: true,
					animation: true,
					size: 'sm',
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/video-with-button-modal/main/remoteEntry.js`,
					// url: `http://localhost:3011/remoteEntry.js`,
					scope: 'video_with_button_modal',
					module: './VideoWithButtonModal',
				},
				modalConfig: {
					selector: 'video_with_button',

					centered: true,
					animation: true,
					size: 'sm',
				},
			},

			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/text-with-button-modal/main/remoteEntry.js`,
					// url: `http://localhost:3009/remoteEntry.js`,
					scope: 'text_with_button_modal',
					module: './TextWithButtonModal',
				},
				modalConfig: {
					selector: 'text_with_button',

					centered: true,
					animation: true,
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/image-modal/main/remoteEntry.js`,
					// url: `http://localhost:3012/remoteEntry.js`,
					scope: 'image_modal',
					module: './ImageModal',
				},
				modalConfig: {
					selector: 'image',

					centered: true,
					animation: true,
					size: 'md',
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/image-carousel-modal/main/remoteEntry.js`,
					// url: `http://localhost:3013/remoteEntry.js`,
					scope: 'image_carousel_modal',
					module: './ImageCarouselModal',
				},
				modalConfig: {
					selector: 'image_carousel',

					centered: true,
					animation: true,
					size: 'sm',
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/iframe-modal/main/remoteEntry.js`,
					// url: `http://localhost:3014/remoteEntry.js`,
					scope: 'iframe_modal',
					module: './IFrameModal',
				},
				modalConfig: {
					selector: 'iframe',

					centered: true,
					animation: true,
					size: 'lg',
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/quiz-modal/main/remoteEntry.js`,
					// url: `http://localhost:3015/remoteEntry.js`,
					scope: 'quiz_modal',
					module: './QuizModal',
				},
				modalConfig: {
					selector: 'quiz',

					centered: true,
					animation: true,
					size: 'sm',
				},
			},
		],
		analyticsModules: [
			{
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/modules-library/analytics/ga-module/main/remoteEntry.js`,
					// url: `http://localhost:3016/remoteEntry.js`,
					scope: 'ga_module',
					module: './ga_module',
				},
				betaAnalyticsID: 'UA-91780857-16',
				prodAnalyticsID: 'UA-91780857-16',
				additionalAnalyticsIDs: [],
			},
		],
	},
	'61eee2727cc889e000268652': {
		modules: {
			getProductData: {
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/modules-library/product-data/variant/charlotte-tilbury/remoteEntry.js`,
					// url: `http://localhost:3007/remoteEntry.js`,
					scope: 'product_data_module',
					module: './product_modules',
				},
			},
			cartController: {
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/modules-library/cart-controller/variant/charlotte-tilbury/remoteEntry.js`,
					// url: `http://localhost:3014/remoteEntry.js`,
					scope: 'cart_controller_module',
					module: './cart_modules',
				},
			},
		},
		sceneOverlays: {
			'6242242a42f102f9875fa895': {
				kind: 'container',
				components: [
					{
						kind: 'container',
						containerStyling: {
							position: 'absolute',
							top: 0,
							left: 0,
							height: '100%',
							width: '100%',
							pointerEvents: 'none',
						},
						components: [
							{
								name: 'tooltip_overlay',
								kind: 'component',
								remoteConfig: {
									url: `${modulesBase}/ObsessVR/v2/component-library/feature-components/tooltip-overlay/main/remoteEntry.js`,
									// url: `http://localhost:3030/remoteEntry.js`,
									scope: 'tooltip_overlay',
									module: './TooltipOverlay',
								},
								styling: {
									width: '20vh',
								},
								delayInSeconds: 3,
								assets: {
									desktopTooltip:
										'https://cdn.obsessvr.com/charlotte-tilbury/pillow-talk-party/drag-tooltip-desktop.gif',
									mobileTooltip:
										'https://cdn.obsessvr.com/charlotte-tilbury/pillow-talk-party/drag-tooltip-mobile.gif',
								},
							},
						],
					},
				],
			},
		},
		overlayComponents: {
			kind: 'container',
			components: [
				{
					kind: 'container',
					containerStyling: {
						position: 'fixed',
						left: 1,
						right: 1,
						bottom: '0px',
						textAlign: 'center',
						pointerEvents: 'none',
					},
					containerStylingMobile: {
						position: 'fixed',
						left: 1,
						right: 1,
						bottom: '1.5rem',
						textAlign: 'center',
						pointerEvents: 'none',
					},
					components: [
						{
							name: 'gem_collection_game_component',
							kind: 'component',
							remoteConfig: {
								url: `${modulesBase}/ObsessVR/v2/component-library/feature-components/gem-collection-game/main/remoteEntry.js`,
								// url: `http://localhost:3009/remoteEntry.js`,
								scope: 'gem_collection_game_component',
								module: './GemsCollectionStatusUI',
							},
							gemAssets: {
								filled: 'https://cdn.obsess-vr.com/charlotte-tilbury/pillow-talk-party/diamondFilled.png',
								empty: 'https://cdn.obsess-vr.com/charlotte-tilbury/pillow-talk-party/diamondEmpty.png',
							},
							gemCollectionStatusModal: {
								background:
									'https://cdn.obsess-vr.com/charlotte-tilbury/pillow-talk-party/countdown-event/masterclass_event_background.png',
								gemCount: 4,
							},
							virtualConsultationLinks: {
								uk: 'https://www.charlottetilbury.com/product/free-pillow-talk-party',
								us: 'https://www.charlottetilbury.com/product/free-pillow-talk-party-na',
								de: 'https://www.charlottetilbury.com/product/free-pillow-talk-party',
								it: 'https://www.charlottetilbury.com/product/free-pillow-talk-party',
								fr: 'https://www.charlottetilbury.com/product/free-pillow-talk-party',
								es: 'https://www.charlottetilbury.com/product/free-pillow-talk-party',
							},
						},
					],
				},
				{
					kind: 'container',
					containerStyling: {
						position: 'fixed',
						right: 0,
						top: 0,
						display: 'flex',
						padding: '8px',
					},
					components: [
						{
							name: 'cart_component',
							kind: 'component',
							remoteConfig: {
								url: `${modulesBase}/ObsessVR/v2/component-library/feature-components/cart-component/variant/charlotte-tilbury/remoteEntry.js`,
								// url: `http://localhost:3016/remoteEntry.js`,
								scope: 'cart_component',
								module: './CartComponent',
							},
							styling: {
								alignItems: 'center',
								display: 'flex',
								flexDirection: 'column',
							},
							iconStyling: {
								height: '2em',
								width: 'auto',
							},
							translations: {
								us: {
									removeFromBag: 'Remove from bag',
									noBagItem: 'THERE ARE NO ITEMS IN YOUR BAG',
									placeOrder: 'Place order',
									bagHeading2:
										'Once you have added items to your bag, they will appear here',
								},
								uk: {
									noBagItem: 'THERE ARE NO ITEMS IN YOUR BAG',
									placeOrder: 'Place order',
									removeFromBag: 'Remove from bag',
									bagHeading2:
										'Once you have added items to your bag, they will appear here',
								},
								fr: {
									placeOrder: 'Passer à la caisse',
									noBagItem:
										"IL N'Y A PAS D'ARTICLES DANS VOTRE SAC",
									removeFromBag: 'Supprimer',
									bagHeading2:
										'Une fois que vous avez ajouté des articles à votre panier, ils apparaitront ici.',
								},
								it: {
									placeOrder: 'Procedi al pagamento',
									noBagItem: 'LA TUA SHOPPING BAG È VUOTA',
									removeFromBag: 'Elimina',
									bagHeading2:
										'Una volta aggiunto un articolo alla shopping bag, verrà mostrato qui',
								},
								de: {
									noBagItem: 'DEIN WARENKORB IST LEER',
									bagHeading2:
										'Alle Artikel in deinem Warenkorb werden hier angezeigt',
									removeFromBag: 'Entfernen',
									placeOrder: 'Warenkorb ansehen',
								},
								es: {
									placeOrder: 'Ver bolsa y pagar',
									noBagItem: 'NO HAY ARTÍCULOS EN TU BOLSA',
									removeFromBag: 'Eliminar',
									bagHeading2:
										'Cuando añadas artículos a tu bolsa, aparecerán aquí',
								},
							},
						},
					],
				},
				{
					kind: 'container',
					containerStyling: {
						// display: 'flex',
						// flexDirection: 'column',
						// alignItems: 'end',
						position: 'fixed',
						textAlign: 'end',
						right: 0,
						bottom: 0,
						padding: '4px',
					},
					components: [
						{
							name: 'shop_with_friends',
							kind: 'component',
							remoteConfig: {
								url: `${modulesBase}/ObsessVR/v2/component-library/feature-components/shop-with-friends/main/remoteEntry.js`,
								// url: `http://localhost:30014/remoteEntry.js`,
								scope: 'shop_with_friends',
								module: './ShopWithFriends',
							},
							textStyling: { color: 'white', fontSize: '0.9rem' },
							showButton: false,
						},
						{
							name: 'powered_by_obsess',
							kind: 'component',
							remoteConfig: {
								url: `${modulesBase}/ObsessVR/v2/component-library/feature-components/powered-by-obsess/main/remoteEntry.js`,
								scope: 'powered_by_obsess',
								module: './PoweredByObsess',
							},
							textStyling: { color: 'white', fontSize: '0.9rem' },
						},
					],
				},
			],
		},
		modals: [
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/welcome-modal/main/remoteEntry.js`,
					// url: `http://localhost:3006/remoteEntry.js`,
					scope: 'welcome_modal',
					module: './WelcomeModal',
				},
				modalConfig: {
					selector: 'welcome_modal',
					centered: true,
					animation: true,
					bgImageUrl:
						'https://cdn.obsess-vr.com/charlotte-tilbury/pillow-talk-party/welcome-popup/uk/welcomeAsset.png',
					translations: {
						us: {
							bgImageUrl:
								'https://cdn.obsess-vr.com/charlotte-tilbury/pillow-talk-party/welcome-popup/us/welcomeAsset.png',
						},
						uk: {
							bgImageUrl:
								'https://cdn.obsess-vr.com/charlotte-tilbury/pillow-talk-party/welcome-popup/uk/welcomeAsset.png',
						},
						fr: {
							bgImageUrl:
								'https://cdn.obsess-vr.com/charlotte-tilbury/pillow-talk-party/welcome-popup/fr/welcomeAsset.png',
						},
						de: {
							bgImageUrl:
								'https://cdn.obsess-vr.com/charlotte-tilbury/pillow-talk-party/welcome-popup/de/welcomeAsset.png',
						},
						it: {
							bgImageUrl:
								'https://cdn.obsess-vr.com/charlotte-tilbury/pillow-talk-party/welcome-popup/it/welcomeAsset.png',
						},
						es: {
							bgImageUrl:
								'https://cdn.obsess-vr.com/charlotte-tilbury/pillow-talk-party/welcome-popup/es/welcomeAsset.png',
						},
					},
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/product-modal/variant/charlotte-tilbury/remoteEntry.js`,
					// url: `http://localhost:3002/remoteEntry.js`,
					scope: 'product_modal',
					module: './ProductModal',
				},
				modalConfig: {
					selector: 'product',
					centered: true,
					animation: true,
					translations: {
						us: {
							readMore: 'Read more',
							addToBag: 'Add to bag',
							productInformation: 'Product information',
							tryItOnMe: 'Try it on me',
							addedToBag: 'Added to bag',
							removeFromBag: 'Remove from bag',
						},
						uk: {
							readMore: 'Read more',
							addToBag: 'Add to bag',
							productInformation: 'Product information',
							tryItOnMe: 'Try it on me',
							addedToBag: 'Added to bag',
							removeFromBag: 'Remove from bag',
						},
						de: {
							readMore: 'Weiterlesen',
							addToBag: 'IN DEN WARENKORB',
							productInformation: 'PRODUKTINFORMATIONEN',
							tryItOnMe: 'An Mir Testen',
							addedToBag: 'Zum Warenkorb hinzugefügt',
							removeFromBag: 'Entfernen',
						},
						fr: {
							readMore: 'En savoir plus',
							addToBag: 'Ajouter au panier',
							productInformation: 'DÉTAILS DU PRODUIT',
							tryItOnMe: 'Mon test personnalisé',
							addedToBag: 'Ajouté au panier',
							removeFromBag: 'Supprimer',
						},
						it: {
							readMore: 'Leggi di più',
							addToBag: 'AGGIUNGI ALLA SHOPPING BAG',
							productInformation: 'DETTAGLI PRODOTTO',
							tryItOnMe: 'Provalo su di me',
							addedToBag: 'Aggiunto alla shopping bag',
							removeFromBag: 'Elimina',
						},
						es: {
							readMore: 'Más información',
							addToBag: 'AÑADIR A LA CESTA',
							productInformation: 'INFORMACIÓN DEL PRODUCTO',
							tryItOnMe: 'Prueba personalizada',
							addedToBag: 'AÑADIDO DE LA Bolsa',
							removeFromBag: 'Eliminar',
						},
					},
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/video-modal/main/remoteEntry.js`,
					// url: `http://localhost:3008/remoteEntry.js`,
					scope: 'video_modal',
					module: './VideoModal',
				},
				modalConfig: {
					selector: 'video',

					centered: true,
					animation: true,
					size: 'lg',
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/feature-components/gem-collection-game/main/remoteEntry.js`,
					// url: `http://localhost:3009/remoteEntry.js`,
					scope: 'gem_collection_game_component',
					module: './GemsVideoModal',
				},
				modalConfig: {
					selector: 'gem_game',

					centered: true,
					animation: true,
					size: 'sm',
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/feature-components/wall-of-fame-game/main/remoteEntry.js`,
					// url: `http://localhost:3019/remoteEntry.js`,
					scope: 'wall_of_fame_game_component',
					module: './WallofFameGameModal',
				},
				modalConfig: {
					selector: 'wall_of_fame_game',

					centered: true,
					animation: true,
					size: 'sm',
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/video-with-button-modal/main/remoteEntry.js`,
					// url: `http://localhost:3011/remoteEntry.js`,
					scope: 'video_with_button_modal',
					module: './VideoWithButtonModal',
				},
				modalConfig: {
					selector: 'video_with_button',

					centered: true,
					animation: true,
					size: 'sm',
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/text-with-button-modal/main/remoteEntry.js`,
					// url: `http://localhost:3009/remoteEntry.js`,
					scope: 'text_with_button_modal',
					module: './TextWithButtonModal',
				},
				modalConfig: {
					selector: 'text_with_button',

					centered: true,
					animation: true,
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/image-modal/main/remoteEntry.js`,
					// url: `http://localhost:3012/remoteEntry.js`,
					scope: 'image_modal',
					module: './ImageModal',
				},
				modalConfig: {
					selector: 'image',

					centered: true,
					animation: true,
					size: 'md',
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/image-carousel-modal/main/remoteEntry.js`,
					// url: `http://localhost:3013/remoteEntry.js`,
					scope: 'image_carousel_modal',
					module: './ImageCarouselModal',
				},
				modalConfig: {
					selector: 'image_carousel',

					centered: true,
					animation: true,
					size: 'sm',
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/iframe-modal/main/remoteEntry.js`,
					// url: `http://localhost:3014/remoteEntry.js`,
					scope: 'iframe_modal',
					module: './IFrameModal',
				},
				modalConfig: {
					selector: 'iframe',

					centered: true,
					animation: true,
					size: 'lg',
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/quiz-modal/main/remoteEntry.js`,
					// url: `http://localhost:3015/remoteEntry.js`,
					scope: 'quiz_modal',
					module: './QuizModal',
				},
				modalConfig: {
					selector: 'quiz',

					centered: true,
					animation: true,
					size: 'sm',
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/youtube-embed-modal/main/remoteEntry.js`,
					// url: `http://localhost:3006/remoteEntry.js`,
					scope: 'youtube_embed_modal',
					module: './YoutubeEmbedModal',
				},
				modalConfig: {
					selector: 'youtube_embed',

					centered: true,
					animation: true,
					size: 'lg',
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/event-countdown-modal/main/remoteEntry.js`,
					// url: `http://localhost:3022/remoteEntry.js`,
					scope: 'event_countdown_modal',
					module: './EventCountdownModal',
				},
				modalConfig: {
					selector: 'masterclass_schedule_modal',

					centered: true,
					animation: true,
					size: 'sm',
				},
			},
		],
		analyticsModules: [
			{
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/modules-library/analytics/ga-module/main/remoteEntry.js`,
					// url: `http://localhost:3016/remoteEntry.js`,
					scope: 'ga_module',
					module: './ga_module',
				},
				betaAnalyticsID: 'UA-91780857-16',
				prodAnalyticsID: 'UA-91780857-58',
				additionalAnalyticsIDs: [],
			},
		],
		preSceneComponent: {
			remoteConfig: {
				url: `${modulesBase}/ObsessVR/v2/component-library/feature-components/entrance-video/main/remoteEntry.js`,
				// url: `http://localhost:3007/remoteEntry.js`,
				scope: 'entrance_video',
				module: './EntranceVideo',
			},
			overlayBg:
				'https://cdn.obsess-vr.com/charlotte-tilbury/pillow-talk-party/entrance_bg_desktop.jpg',
			overlayBgMobile:
				'https://cdn.obsess-vr.com/charlotte-tilbury/pillow-talk-party/entrance_bg_mobile.jpg',
			translations: {
				uk: {
					welcomeMessage:
						'DARLINGS! JOIN MY NEW! VIRTUAL PILLOW TALK PARTY',
				},
				us: {
					welcomeMessage:
						'DARLINGS! JOIN MY NEW! VIRTUAL PILLOW TALK PARTY',
				},
				fr: {
					welcomeMessage:
						'DARLINGS! REJOIGNEZ MA NOUVELLE PILLOW TALK PARTY VIRTUELLE',
				},
				de: {
					welcomeMessage:
						'DARLING! SEI BEI MEINER NEUEN! VIRTUELLEN PILLOW TALK PARTY DABEI',
				},
				it: {
					welcomeMessage:
						'DARLING! PARTECIPA AL MIO NUOVO PILLOW TALK PARTY VIRTUALE',
				},
				es: {
					welcomeMessage:
						'¡DARLING! ÚNETE A MI NUEVA PILLOW TALK PARTY',
				},
			},
		},
		sceneTransition: [
			{
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/feature-components/scene-transition/main/remoteEntry.js`,
					// url: `http://localhost:3006/remoteEntry.js`,
					scope: 'scene_transition',
					module: './SceneTransition',
				},
				selector: 'scene_transition_1',
				data: {
					sceneName: 'disco-game',
					videoUrl:
						'https://cdn.obsess-vr.com/charlotte-tilbury/pillow-talk-party/PT_PARTY_VS_WORMHOLE_LANDSCAPE.mp4',
					videoUrlMobile:
						'https://cdn.obsess-vr.com/charlotte-tilbury/pillow-talk-party/PT_PARTY_VS_WORMHOLE_PORTRAIT.mp4',
				},
			},
		],
	},
	'620169c8af3260eeddbbf2de': {
		modules: {
			getProductData: {
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/modules-library/product-data/main/remoteEntry.js`,
					// url: `http://localhost:3007/remoteEntry.js`,
					scope: 'product_data_module',
					module: './product_modules',
				},
			},
			cartController: {
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/modules-library/cart-controller/main/remoteEntry.js`,
					// url: `http://localhost:3014/remoteEntry.js`,
					scope: 'cart_controller_module',
					module: './cart_modules',
				},
			},
		},
		overlayComponents: {
			kind: 'container',
			components: [
				{
					kind: 'container',
					containerStyling: {
						display: 'inline',
					},
					components: [
						{
							name: 'store_logo',
							kind: 'component',
							remoteConfig: {
								url: `${modulesBase}/ObsessVR/v2/component-library/feature-components/store-logo/main/remoteEntry.js`,
								// url: `http://localhost:3006/remoteEntry.js`,
								scope: 'store_logo',
								module: './StoreLogo',
							},
							styling: {
								width: '10rem',
								height: 'auto',
								padding: '16px',
								borderRadius: '10px',
							},
						},
					],
				},
				// {
				// 	kind: 'container',
				// 	containerStyling: {
				// 		position: 'fixed',
				// 		right: 0,
				// 		top: 0,
				// 		display: 'flex',
				// 		padding: '8px',
				// 	},
				// 	components: [
				// 		{
				// 			name: 'cart_component',
				// 			kind: 'component',
				// 			remoteConfig: {
				// 				url: `${modulesBase}/ObsessVR/v2/component-library/feature-components/cart-component/main/remoteEntry.js`,
				// 				scope: 'cart_component',
				// 				module: './CartComponent',
				// 			},
				// 			styling: {
				// 				alignItems: 'center',
				// 				display: 'flex',
				// 				flexDirection: 'column',
				// 				marginRight: '1em',
				// 			},
				// 			iconStyling: {
				// 				height: '2em',
				// 				width: 'auto',
				// 			},
				// 		},
				// 	],
				// },
				{
					kind: 'container',
					containerStyling: {
						position: 'fixed',
						right: 0,
						bottom: 0,
						padding: '4px',
					},
					components: [
						{
							name: 'powered_by_obsess',
							kind: 'component',
							remoteConfig: {
								url: `${modulesBase}/ObsessVR/v2/component-library/feature-components/powered-by-obsess/main/remoteEntry.js`,
								scope: 'powered_by_obsess',
								module: './PoweredByObsess',
							},
							textStyling: { color: 'white', fontSize: '0.9rem' },
						},
					],
				},
			],
		},
		modals: [
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/product-modal/main/remoteEntry.js`,
					// url: `http://localhost:3002/remoteEntry.js`,
					scope: 'product_modal',
					module: './ProductModal',
				},
				modalConfig: {
					selector: 'product',

					centered: true,
					animation: true,
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/video-modal/main/remoteEntry.js`,
					// url: `http://localhost:3008/remoteEntry.js`,
					scope: 'video_modal',
					module: './VideoModal',
				},
				modalConfig: {
					selector: 'video',

					centered: true,
					animation: true,
					size: 'sm',
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/video-with-button-modal/main/remoteEntry.js`,
					// url: `http://localhost:3011/remoteEntry.js`,
					scope: 'video_with_button_modal',
					module: './VideoWithButtonModal',
				},
				modalConfig: {
					selector: 'video_with_button',

					centered: true,
					animation: true,
					size: 'sm',
				},
			},

			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/text-with-button-modal/main/remoteEntry.js`,
					// url: `http://localhost:3009/remoteEntry.js`,
					scope: 'text_with_button_modal',
					module: './TextWithButtonModal',
				},
				modalConfig: {
					selector: 'text_with_button',

					centered: true,
					animation: true,
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/image-modal/main/remoteEntry.js`,
					// url: `http://localhost:3012/remoteEntry.js`,
					scope: 'image_modal',
					module: './ImageModal',
				},
				modalConfig: {
					selector: 'image',

					centered: true,
					animation: true,
					size: 'md',
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/image-carousel-modal/main/remoteEntry.js`,
					// url: `http://localhost:3013/remoteEntry.js`,
					scope: 'image_carousel_modal',
					module: './ImageCarouselModal',
				},
				modalConfig: {
					selector: 'image_carousel',

					centered: true,
					animation: true,
					size: 'sm',
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/iframe-modal/main/remoteEntry.js`,
					// url: `http://localhost:3014/remoteEntry.js`,
					scope: 'iframe_modal',
					module: './IFrameModal',
				},
				modalConfig: {
					selector: 'iframe',

					centered: true,
					animation: true,
					size: 'lg',
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/quiz-modal/main/remoteEntry.js`,
					// url: `http://localhost:3015/remoteEntry.js`,
					scope: 'quiz_modal',
					module: './QuizModal',
				},
				modalConfig: {
					selector: 'quiz',

					centered: true,
					animation: true,
					size: 'sm',
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/youtube-embed-modal/main/remoteEntry.js`,
					// url: `http://localhost:3006/remoteEntry.js`,
					scope: 'youtube_embed_modal',
					module: './YoutubeEmbedModal',
				},
				modalConfig: {
					selector: 'youtube_embed',

					centered: true,
					animation: true,
					size: 'sm',
				},
			},
		],
		analyticsModules: [
			{
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/modules-library/analytics/ga-module/main/remoteEntry.js`,
					// url: `http://localhost:3016/remoteEntry.js`,
					scope: 'ga_module',
					module: './ga_module',
				},
				betaAnalyticsID: 'UA-91780857-16',
				prodAnalyticsID: 'UA-91780857-16',
				additionalAnalyticsIDs: [],
			},
		],
	},
	'62268e6fb452e0eb474fd20c': {
		modules: {
			getProductData: {
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/modules-library/product-data/main/remoteEntry.js`,
					// url: `http://localhost:3007/remoteEntry.js`,
					scope: 'product_data_module',
					module: './product_modules',
				},
			},
			cartController: {
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/modules-library/cart-controller/main/remoteEntry.js`,
					// url: `http://localhost:3014/remoteEntry.js`,
					scope: 'cart_controller_module',
					module: './cart_modules',
				},
			},
		},
		overlayComponents: {
			kind: 'container',
			components: [
				{
					kind: 'container',
					containerStyling: {
						display: 'inline',
					},
					components: [
						{
							name: 'store_logo',
							kind: 'component',
							remoteConfig: {
								url: `${modulesBase}/ObsessVR/v2/component-library/feature-components/store-logo/main/remoteEntry.js`,
								// url: `http://localhost:3006/remoteEntry.js`,
								scope: 'store_logo',
								module: './StoreLogo',
							},
							styling: {
								width: '10rem',
								height: 'auto',
								padding: '16px',
								borderRadius: '10px',
							},
						},
					],
				},
				{
					kind: 'container',
					containerStyling: {
						position: 'fixed',
						right: 0,
						bottom: 0,
						padding: '4px',
					},
					components: [
						{
							name: 'shop_with_friends',
							kind: 'component',
							remoteConfig: {
								url: `${modulesBase}/ObsessVR/v2/component-library/feature-components/shop-with-friends/main/remoteEntry.js`,
								// url: `http://localhost:30014/remoteEntry.js`,
								scope: 'shop_with_friends',
								module: './ShopWithFriends',
							},
							textStyling: { color: 'white', fontSize: '0.9rem' },
							showButton: true,
						},
						{
							name: 'powered_by_obsess',
							kind: 'component',
							remoteConfig: {
								url: `${modulesBase}/ObsessVR/v2/component-library/feature-components/powered-by-obsess/main/remoteEntry.js`,
								scope: 'powered_by_obsess',
								module: './PoweredByObsess',
							},
							textStyling: { color: 'white', fontSize: '0.9rem' },
						},
					],
				},
			],
		},
		modals: [
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/product-modal/main/remoteEntry.js`,
					// url: `http://localhost:3002/remoteEntry.js`,
					scope: 'product_modal',
					module: './ProductModal',
				},
				modalConfig: {
					selector: 'product',

					centered: true,
					animation: true,
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/video-modal/main/remoteEntry.js`,
					// url: `http://localhost:3008/remoteEntry.js`,
					scope: 'video_modal',
					module: './VideoModal',
				},
				modalConfig: {
					selector: 'video',

					centered: true,
					animation: true,
					size: 'sm',
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/video-with-button-modal/main/remoteEntry.js`,
					// url: `http://localhost:3011/remoteEntry.js`,
					scope: 'video_with_button_modal',
					module: './VideoWithButtonModal',
				},
				modalConfig: {
					selector: 'video_with_button',

					centered: true,
					animation: true,
					size: 'sm',
				},
			},

			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/text-with-button-modal/main/remoteEntry.js`,
					// url: `http://localhost:3009/remoteEntry.js`,
					scope: 'text_with_button_modal',
					module: './TextWithButtonModal',
				},
				modalConfig: {
					selector: 'text_with_button',

					centered: true,
					animation: true,
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/image-modal/main/remoteEntry.js`,
					// url: `http://localhost:3012/remoteEntry.js`,
					scope: 'image_modal',
					module: './ImageModal',
				},
				modalConfig: {
					selector: 'image',

					centered: true,
					animation: true,
					size: 'md',
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/image-carousel-modal/main/remoteEntry.js`,
					// url: `http://localhost:3013/remoteEntry.js`,
					scope: 'image_carousel_modal',
					module: './ImageCarouselModal',
				},
				modalConfig: {
					selector: 'image_carousel',

					centered: true,
					animation: true,
					size: 'sm',
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/iframe-modal/main/remoteEntry.js`,
					// url: `http://localhost:3014/remoteEntry.js`,
					scope: 'iframe_modal',
					module: './IFrameModal',
				},
				modalConfig: {
					selector: 'iframe',

					centered: true,
					animation: true,
					size: 'lg',
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/quiz-modal/main/remoteEntry.js`,
					// url: `http://localhost:3015/remoteEntry.js`,
					scope: 'quiz_modal',
					module: './QuizModal',
				},
				modalConfig: {
					selector: 'quiz',

					centered: true,
					animation: true,
					size: 'sm',
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/youtube-embed-modal/main/remoteEntry.js`,
					// url: `http://localhost:3006/remoteEntry.js`,
					scope: 'youtube_embed_modal',
					module: './YoutubeEmbedModal',
				},
				modalConfig: {
					selector: 'youtube_embed',

					centered: true,
					animation: true,
					size: 'sm',
				},
			},
		],
		analyticsModules: [
			{
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/modules-library/analytics/ga-module/main/remoteEntry.js`,
					// url: `http://localhost:3016/remoteEntry.js`,
					scope: 'ga_module',
					module: './ga_module',
				},
				betaAnalyticsID: 'UA-91780857-16',
				prodAnalyticsID: 'UA-91780857-16',
				additionalAnalyticsIDs: [],
			},
		],
	},
	'623099e7d9db4c9fd43717e0': {
		modules: {
			getProductData: {
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/modules-library/product-data/main/remoteEntry.js`,
					// url: `http://localhost:3007/remoteEntry.js`,
					scope: 'product_data_module',
					module: './product_modules',
				},
			},
			cartController: {
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/modules-library/cart-controller/main/remoteEntry.js`,
					// url: `http://localhost:3014/remoteEntry.js`,
					scope: 'cart_controller_module',
					module: './cart_modules',
				},
			},
		},
		overlayComponents: {
			kind: 'container',
			components: [
				{
					kind: 'container',
					containerStyling: {
						display: 'inline',
					},
					components: [
						{
							name: 'store_logo',
							kind: 'component',
							remoteConfig: {
								url: `${modulesBase}/ObsessVR/v2/component-library/feature-components/store-logo/main/remoteEntry.js`,
								// url: `http://localhost:3006/remoteEntry.js`,
								scope: 'store_logo',
								module: './StoreLogo',
							},
							styling: {
								width: '10rem',
								height: 'auto',
								padding: '16px',
								borderRadius: '10px',
							},
						},
					],
				},
				{
					kind: 'container',
					containerStyling: {
						position: 'fixed',
						right: 0,
						bottom: 0,
						padding: '4px',
					},
					components: [
						{
							name: 'powered_by_obsess',
							kind: 'component',
							remoteConfig: {
								url: `${modulesBase}/ObsessVR/v2/component-library/feature-components/powered-by-obsess/main/remoteEntry.js`,
								scope: 'powered_by_obsess',
								module: './PoweredByObsess',
							},
							textStyling: { color: 'white', fontSize: '0.9rem' },
						},
					],
				},
				{
					kind: 'container',
					containerStyling: {
						position: 'fixed',
						right: 0,
						top: 0,
						padding: '0.5em',
					},
					components: [
						{
							name: 'navigation_menu',
							kind: 'component',
							remoteConfig: {
								url: `${modulesBase}/ObsessVR/v2/component-library/feature-components/navigation-menu/main/remoteEntry.js`,
								scope: 'navigation_menu',
								module: './NavigationMenu',
							},
						},
					],
				},
			],
		},
		modals: [
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/product-modal/main/remoteEntry.js`,
					// url: `http://localhost:3002/remoteEntry.js`,
					scope: 'product_modal',
					module: './ProductModal',
				},
				modalConfig: {
					selector: 'product',

					centered: true,
					animation: true,
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/video-modal/main/remoteEntry.js`,
					// url: `http://localhost:3008/remoteEntry.js`,
					scope: 'video_modal',
					module: './VideoModal',
				},
				modalConfig: {
					selector: 'video',

					centered: true,
					animation: true,
					size: 'sm',
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/video-with-button-modal/main/remoteEntry.js`,
					// url: `http://localhost:3011/remoteEntry.js`,
					scope: 'video_with_button_modal',
					module: './VideoWithButtonModal',
				},
				modalConfig: {
					selector: 'video_with_button',

					centered: true,
					animation: true,
					size: 'sm',
				},
			},

			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/text-with-button-modal/main/remoteEntry.js`,
					// url: `http://localhost:3009/remoteEntry.js`,
					scope: 'text_with_button_modal',
					module: './TextWithButtonModal',
				},
				modalConfig: {
					selector: 'text_with_button',

					centered: true,
					animation: true,
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/image-modal/main/remoteEntry.js`,
					// url: `http://localhost:3012/remoteEntry.js`,
					scope: 'image_modal',
					module: './ImageModal',
				},
				modalConfig: {
					selector: 'image',

					centered: true,
					animation: true,
					size: 'md',
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/image-carousel-modal/main/remoteEntry.js`,
					// url: `http://localhost:3013/remoteEntry.js`,
					scope: 'image_carousel_modal',
					module: './ImageCarouselModal',
				},
				modalConfig: {
					selector: 'image_carousel',

					centered: true,
					animation: true,
					size: 'sm',
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/iframe-modal/main/remoteEntry.js`,
					// url: `http://localhost:3014/remoteEntry.js`,
					scope: 'iframe_modal',
					module: './IFrameModal',
				},
				modalConfig: {
					selector: 'iframe',

					centered: true,
					animation: true,
					size: 'lg',
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/quiz-modal/main/remoteEntry.js`,
					// url: `http://localhost:3015/remoteEntry.js`,
					scope: 'quiz_modal',
					module: './QuizModal',
				},
				modalConfig: {
					selector: 'quiz',

					centered: true,
					animation: true,
					size: 'sm',
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/youtube-embed-modal/main/remoteEntry.js`,
					// url: `http://localhost:3006/remoteEntry.js`,
					scope: 'youtube_embed_modal',
					module: './YoutubeEmbedModal',
				},
				modalConfig: {
					selector: 'youtube_embed',

					centered: true,
					animation: true,
					size: 'sm',
				},
			},
		],
		analyticsModules: [
			{
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/modules-library/analytics/ga-module/main/remoteEntry.js`,
					// url: `http://localhost:3016/remoteEntry.js`,
					scope: 'ga_module',
					module: './ga_module',
				},
				betaAnalyticsID: 'UA-91780857-16',
				prodAnalyticsID: 'UA-91780857-16',
				additionalAnalyticsIDs: [],
			},
		],
	},
	'624b14c4d6c4aea460779506': {
		modules: {
			getProductData: {
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/modules-library/product-data/main/remoteEntry.js`,
					// url: `http://localhost:3007/remoteEntry.js`,
					scope: 'product_data_module',
					module: './product_modules',
				},
			},
			cartController: {
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/modules-library/cart-controller/main/remoteEntry.js`,
					// url: `http://localhost:3014/remoteEntry.js`,
					scope: 'cart_controller_module',
					module: './cart_modules',
				},
			},
		},
		overlayComponents: {
			kind: 'container',
			components: [
				{
					kind: 'container',
					containerStyling: {
						display: 'inline',
					},
					components: [
						{
							name: 'store_logo',
							kind: 'component',
							remoteConfig: {
								url: `${modulesBase}/ObsessVR/v2/component-library/feature-components/store-logo/main/remoteEntry.js`,
								// url: `http://localhost:3006/remoteEntry.js`,
								scope: 'store_logo',
								module: './StoreLogo',
							},
							styling: {
								width: '10rem',
								height: 'auto',
								padding: '16px',
								borderRadius: '10px',
							},
						},
					],
				},
				{
					kind: 'container',
					containerStyling: {
						position: 'fixed',
						right: 0,
						bottom: 0,
						padding: '4px',
						display: 'flex',
						alignItems: 'end',
						flexDirection: 'column',
					},
					components: [
						{
							name: 'share_buttoons_component',
							kind: 'component',
							remoteConfig: {
								url: `${modulesBase}/ObsessVR/v2/component-library/feature-components/share-buttons-component/main/remoteEntry.js`,
								// url: `http://localhost:3006/remoteEntry.js`,
								scope: 'share_buttoons_component',
								module: './ShareButtonsComponent',
							},
							dimension: 'width',
							iconSize: '1.2rem',
							style: {
								paddingBottom: '5px',
							},
							links: [
								{
									name: 'mail',
									url: 'mailto:?body=https://raos.obsessvr.com/virtual-saucery/',
									imageUrl:
										'https://cdn.obsessvr.com/mail.svg',
								},
								{
									name: 'tiktok',
									url: 'https://www.tiktok.com/@raoshomemade',
									imageUrl:
										'https://cdn.obsessvr.com/tiktok.svg',
								},
								{
									name: 'facebook',
									url: 'https://www.facebook.com/raoshomemade',
									imageUrl:
										'https://cdn.obsessvr.com/facebook.svg',
								},

								{
									name: 'instagram',
									url: 'https://www.instagram.com/raoshomemade/',
									imageUrl:
										'https://cdn.obsess-vr.com/instagram.svg',
								},
							],
						},
						{
							name: 'powered_by_obsess',
							kind: 'component',
							remoteConfig: {
								url: `${modulesBase}/ObsessVR/v2/component-library/feature-components/powered-by-obsess/main/remoteEntry.js`,
								scope: 'powered_by_obsess',
								module: './PoweredByObsess',
							},
							textStyling: {
								color: 'white',
								fontSize: '0.9rem',
							},
						},
					],
				},
				{
					kind: 'container',
					containerStyling: {
						position: 'fixed',
						bottom: '10px',
						left: '10px',
					},
					components: [
						{
							name: 'spotify_modal',
							kind: 'component',
							remoteConfig: {
								url: `${modulesBase}/ObsessVR/v2/component-library/feature-components/spotify-integration/main/remoteEntry.js`,
								scope: 'spotify_modal',
								module: './SpotifyModal',
							},
						},
					],
				},
				{
					kind: 'container',
					containerStyling: {
						position: 'fixed',
						top: 0,
						left: 0,
						height: '100%',
						width: '100%',
						pointerEvents: 'none',
					},
					components: [
						{
							name: 'tooltip_overlay',
							kind: 'component',
							remoteConfig: {
								url: `${modulesBase}/ObsessVR/v2/component-library/feature-components/tooltip-overlay/variant/descriptive/remoteEntry.js`,
								// url: `http://localhost:3030/remoteEntry.js`,
								scope: 'tooltip_overlay',
								module: './TooltipOverlay',
							},
							btnStyling: {
								width: '180px',
								height: '45px',
								color: 'white',
								backgroundColor: '#B5252C',
							},
							delayInSeconds: 10,
							tooltipLogo:
								'https://cdn.obsessvr.com/raos/tooltip-logo.png',
							tooltipBody: "Welcome to The Saucery by Rao's Homemade ™",
							tooltipItems: [
								{
									imageUrl:
										'https://cdn.obsessvr.com/tooltip-browse.png',
									title: 'Browse',
									body: 'Click and drag the screen or use the arrows on the floor to explore',
								},
								{
									imageUrl:
										'https://cdn.obsessvr.com/tooltip-product.png',
									title: 'Product',
									body: 'Click on icon to see product details and shop',
								},
								{
									imageUrl:
										'https://cdn.obsessvr.com/tooltip-info.png',
									title: 'Image/Text Hotspot',
									body: 'Click on icon to view exclusive content',
								},
								{
									imageUrl:
										'https://cdn.obsessvr.com/tooltip-play.png',
									title: 'Video',
									body: 'Click on icon to view exclusive videos',
								},
							],
						},
					],
				},
			],
		},
		modals: [
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/product-modal/main/remoteEntry.js`,
					// url: `http://localhost:3002/remoteEntry.js`,
					scope: 'product_modal',
					module: './ProductModal',
				},
				modalConfig: {
					selector: 'product',

					centered: true,
					animation: true,
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/video-modal/main/remoteEntry.js`,
					// url: `http://localhost:3008/remoteEntry.js`,
					scope: 'video_modal',
					module: './VideoModal',
				},
				modalConfig: {
					selector: 'video',

					centered: true,
					animation: true,
					size: 'lg',
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/video-with-button-modal/main/remoteEntry.js`,
					// url: `http://localhost:3011/remoteEntry.js`,
					scope: 'video_with_button_modal',
					module: './VideoWithButtonModal',
				},
				modalConfig: {
					selector: 'video_with_button',

					centered: true,
					animation: true,
					size: 'lg',
				},
			},

			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/text-with-button-modal/main/remoteEntry.js`,
					// url: `http://localhost:3009/remoteEntry.js`,
					scope: 'text_with_button_modal',
					module: './TextWithButtonModal',
				},
				modalConfig: {
					selector: 'text_with_button',

					centered: true,
					animation: true,
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/image-modal/main/remoteEntry.js`,
					// url: `http://localhost:3012/remoteEntry.js`,
					scope: 'image_modal',
					module: './ImageModal',
				},
				modalConfig: {
					selector: 'image',

					centered: true,
					animation: true,
					size: 'md',
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/image-carousel-modal/main/remoteEntry.js`,
					// url: `http://localhost:3013/remoteEntry.js`,
					scope: 'image_carousel_modal',
					module: './ImageCarouselModal',
				},
				modalConfig: {
					selector: 'image_carousel',

					centered: true,
					animation: true,
					size: 'md',
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/iframe-modal/main/remoteEntry.js`,
					// url: `http://localhost:3014/remoteEntry.js`,
					scope: 'iframe_modal',
					module: './IFrameModal',
				},
				modalConfig: {
					selector: 'iframe',

					centered: true,
					animation: true,
					size: 'lg',
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/quiz-modal/main/remoteEntry.js`,
					// url: `http://localhost:3015/remoteEntry.js`,
					scope: 'quiz_modal',
					module: './QuizModal',
				},
				modalConfig: {
					selector: 'quiz',

					centered: true,
					animation: true,
					size: 'md',
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/youtube-embed-modal/main/remoteEntry.js`,
					// url: `http://localhost:3006/remoteEntry.js`,
					scope: 'youtube_embed_modal',
					module: './YoutubeEmbedModal',
				},
				modalConfig: {
					selector: 'youtube_embed',

					centered: true,
					animation: true,
					size: 'md',
				},
			},
		],
		analyticsModules: [
			{
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/modules-library/analytics/ga-module/main/remoteEntry.js`,
					// url: `http://localhost:3016/remoteEntry.js`,
					scope: 'ga_module',
					module: './ga_module',
				},
				betaAnalyticsID: 'UA-91780857-16',
				prodAnalyticsID: 'UA-91780857-16',
				additionalAnalyticsIDs: [],
			},
		],
	},
	'623cef271fe3baec4183d1e6': {
		modules: {
			getProductData: {
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/modules-library/product-data/main/remoteEntry.js`,
					// url: `http://localhost:3007/remoteEntry.js`,
					scope: 'product_data_module',
					module: './product_modules',
				},
			},
			cartController: {
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/modules-library/cart-controller/main/remoteEntry.js`,
					// url: `http://localhost:3014/remoteEntry.js`,
					scope: 'cart_controller_module',
					module: './cart_modules',
				},
			},
		},
		overlayComponents: {
			kind: 'container',
			components: [
				{
					kind: 'container',
					containerStyling: {
						display: 'inline',
					},
					components: [
						{
							name: 'store_logo',
							kind: 'component',
							remoteConfig: {
								url: `${modulesBase}/ObsessVR/v2/component-library/feature-components/store-logo/main/remoteEntry.js`,
								// url: `http://localhost:3006/remoteEntry.js`,
								scope: 'store_logo',
								module: './StoreLogo',
							},
							styling: {
								width: '10rem',
								height: 'auto',
								padding: '16px',
								borderRadius: '10px',
							},
						},
					],
				},
				{
					kind: 'container',
					containerStyling: {
						position: 'fixed',
						right: 0,
						bottom: 0,
						padding: '4px',
					},
					components: [
						{
							name: 'powered_by_obsess',
							kind: 'component',
							remoteConfig: {
								url: `${modulesBase}/ObsessVR/v2/component-library/feature-components/powered-by-obsess/main/remoteEntry.js`,
								scope: 'powered_by_obsess',
								module: './PoweredByObsess',
							},
							textStyling: { color: 'white', fontSize: '0.9rem' },
						},
					],
				},
			],
		},
		modals: [
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/product-modal/main/remoteEntry.js`,
					// url: `http://localhost:3002/remoteEntry.js`,
					scope: 'product_modal',
					module: './ProductModal',
				},
				modalConfig: {
					selector: 'product',

					centered: true,
					animation: true,
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/video-modal/main/remoteEntry.js`,
					// url: `http://localhost:3008/remoteEntry.js`,
					scope: 'video_modal',
					module: './VideoModal',
				},
				modalConfig: {
					selector: 'video',

					centered: true,
					animation: true,
					size: 'sm',
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/video-with-button-modal/main/remoteEntry.js`,
					// url: `http://localhost:3011/remoteEntry.js`,
					scope: 'video_with_button_modal',
					module: './VideoWithButtonModal',
				},
				modalConfig: {
					selector: 'video_with_button',

					centered: true,
					animation: true,
					size: 'sm',
				},
			},

			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/text-with-button-modal/main/remoteEntry.js`,
					// url: `http://localhost:3009/remoteEntry.js`,
					scope: 'text_with_button_modal',
					module: './TextWithButtonModal',
				},
				modalConfig: {
					selector: 'text_with_button',

					centered: true,
					animation: true,
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/image-modal/main/remoteEntry.js`,
					// url: `http://localhost:3012/remoteEntry.js`,
					scope: 'image_modal',
					module: './ImageModal',
				},
				modalConfig: {
					selector: 'image',

					centered: true,
					animation: true,
					size: 'md',
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/image-carousel-modal/main/remoteEntry.js`,
					// url: `http://localhost:3013/remoteEntry.js`,
					scope: 'image_carousel_modal',
					module: './ImageCarouselModal',
				},
				modalConfig: {
					selector: 'image_carousel',

					centered: true,
					animation: true,
					size: 'sm',
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/iframe-modal/main/remoteEntry.js`,
					// url: `http://localhost:3014/remoteEntry.js`,
					scope: 'iframe_modal',
					module: './IFrameModal',
				},
				modalConfig: {
					selector: 'iframe',

					centered: true,
					animation: true,
					size: 'lg',
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/quiz-modal/main/remoteEntry.js`,
					// url: `http://localhost:3015/remoteEntry.js`,
					scope: 'quiz_modal',
					module: './QuizModal',
				},
				modalConfig: {
					selector: 'quiz',

					centered: true,
					animation: true,
					size: 'sm',
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/youtube-embed-modal/main/remoteEntry.js`,
					// url: `http://localhost:3006/remoteEntry.js`,
					scope: 'youtube_embed_modal',
					module: './YoutubeEmbedModal',
				},
				modalConfig: {
					selector: 'youtube_embed',

					centered: true,
					animation: true,
					size: 'sm',
				},
			},
		],
		analyticsModules: [
			{
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/modules-library/analytics/ga-module/main/remoteEntry.js`,
					// url: `http://localhost:3016/remoteEntry.js`,
					scope: 'ga_module',
					module: './ga_module',
				},
				betaAnalyticsID: 'UA-91780857-16',
				prodAnalyticsID: 'UA-91780857-16',
				additionalAnalyticsIDs: [],
			},
		],
	},
	'623a3a6fe344ed25cd9bf349': {
		modules: {
			getProductData: {
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/modules-library/product-data/main/remoteEntry.js`,
					// url: `http://localhost:3007/remoteEntry.js`,
					scope: 'product_data_module',
					module: './product_modules',
				},
			},
			cartController: {
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/modules-library/cart-controller/main/remoteEntry.js`,
					// url: `http://localhost:3014/remoteEntry.js`,
					scope: 'cart_controller_module',
					module: './cart_modules',
				},
			},
		},
		overlayComponents: {
			kind: 'container',
			components: [
				{
					kind: 'container',
					containerStyling: {
						display: 'inline',
					},
					components: [
						{
							name: 'store_logo',
							kind: 'component',
							remoteConfig: {
								url: `${modulesBase}/ObsessVR/v2/component-library/feature-components/store-logo/main/remoteEntry.js`,
								// url: `http://localhost:3006/remoteEntry.js`,
								scope: 'store_logo',
								module: './StoreLogo',
							},
							styling: {
								width: '10rem',
								height: 'auto',
								padding: '16px',
								borderRadius: '10px',
							},
						},
					],
				},
				{
					kind: 'container',
					containerStyling: {
						position: 'fixed',
						right: 0,
						bottom: 0,
						padding: '4px',
					},
					components: [
						{
							name: 'powered_by_obsess',
							kind: 'component',
							remoteConfig: {
								url: `${modulesBase}/ObsessVR/v2/component-library/feature-components/powered-by-obsess/main/remoteEntry.js`,
								scope: 'powered_by_obsess',
								module: './PoweredByObsess',
							},
							textStyling: { color: 'white', fontSize: '0.9rem' },
						},
					],
				},
			],
		},
		modals: [
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/product-modal/main/remoteEntry.js`,
					// url: `http://localhost:3002/remoteEntry.js`,
					scope: 'product_modal',
					module: './ProductModal',
				},
				modalConfig: {
					selector: 'product',

					centered: true,
					animation: true,
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/video-modal/main/remoteEntry.js`,
					// url: `http://localhost:3008/remoteEntry.js`,
					scope: 'video_modal',
					module: './VideoModal',
				},
				modalConfig: {
					selector: 'video',

					centered: true,
					animation: true,
					size: 'sm',
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/video-with-button-modal/main/remoteEntry.js`,
					// url: `http://localhost:3011/remoteEntry.js`,
					scope: 'video_with_button_modal',
					module: './VideoWithButtonModal',
				},
				modalConfig: {
					selector: 'video_with_button',

					centered: true,
					animation: true,
					size: 'sm',
				},
			},

			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/text-with-button-modal/main/remoteEntry.js`,
					// url: `http://localhost:3009/remoteEntry.js`,
					scope: 'text_with_button_modal',
					module: './TextWithButtonModal',
				},
				modalConfig: {
					selector: 'text_with_button',

					centered: true,
					animation: true,
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/image-modal/main/remoteEntry.js`,
					// url: `http://localhost:3012/remoteEntry.js`,
					scope: 'image_modal',
					module: './ImageModal',
				},
				modalConfig: {
					selector: 'image',

					centered: true,
					animation: true,
					size: 'md',
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/image-carousel-modal/main/remoteEntry.js`,
					// url: `http://localhost:3013/remoteEntry.js`,
					scope: 'image_carousel_modal',
					module: './ImageCarouselModal',
				},
				modalConfig: {
					selector: 'image_carousel',

					centered: true,
					animation: true,
					size: 'sm',
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/iframe-modal/main/remoteEntry.js`,
					// url: `http://localhost:3014/remoteEntry.js`,
					scope: 'iframe_modal',
					module: './IFrameModal',
				},
				modalConfig: {
					selector: 'iframe',

					centered: true,
					animation: true,
					size: 'lg',
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/quiz-modal/main/remoteEntry.js`,
					// url: `http://localhost:3015/remoteEntry.js`,
					scope: 'quiz_modal',
					module: './QuizModal',
				},
				modalConfig: {
					selector: 'quiz',

					centered: true,
					animation: true,
					size: 'sm',
				},
			},
			{
				kind: 'modal',
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/component-library/webstore-modals/youtube-embed-modal/main/remoteEntry.js`,
					// url: `http://localhost:3006/remoteEntry.js`,
					scope: 'youtube_embed_modal',
					module: './YoutubeEmbedModal',
				},
				modalConfig: {
					selector: 'youtube_embed',

					centered: true,
					animation: true,
					size: 'sm',
				},
			},
		],
		analyticsModules: [
			{
				remoteConfig: {
					url: `${modulesBase}/ObsessVR/v2/modules-library/analytics/ga-module/main/remoteEntry.js`,
					// url: `http://localhost:3016/remoteEntry.js`,
					scope: 'ga_module',
					module: './ga_module',
				},
				betaAnalyticsID: 'UA-91780857-16',
				prodAnalyticsID: 'UA-91780857-16',
				additionalAnalyticsIDs: [],
			},
		],
	},
};

export default componentConfig;
