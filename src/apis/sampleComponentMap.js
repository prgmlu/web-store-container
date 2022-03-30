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
							styling: {
								iconWidth: '30rem',
							},
							gemCollectionIconsInOrder: [
								'https://cdn.obsess-vr.com/charlotte-tilbury/pillow-talk-party/VS_PT_Party_Map_Stage5_toolbar_0-removebg.png',
								'https://cdn.obsess-vr.com/charlotte-tilbury/pillow-talk-party/VS_PT_Party_Map_Stage5_toolbar_1-removebg.png',
								'https://cdn.obsess-vr.com/charlotte-tilbury/pillow-talk-party/VS_PT_Party_Map_Stage5_toolbar_2-removebg.png',
								'https://cdn.obsess-vr.com/charlotte-tilbury/pillow-talk-party/VS_PT_Party_Map_Stage5_toolbar_3-removebg.png',
								'https://cdn.obsess-vr.com/charlotte-tilbury/pillow-talk-party/VS_PT_Party_Map_Stage5_toolbar_4-removebg.png',
							],
							gemAssets: {
								filled: 'https://cdn.obsess-vr.com/charlotte-tilbury/pillow-talk-party/diamondFilled.png',
								empty: 'https://cdn.obsess-vr.com/charlotte-tilbury/pillow-talk-party/diamondEmpty.png',
							},
							gemCollectionStatusModalInOrder: [
								'https://cdn.obsess-vr.com/charlotte-tilbury/pillow-talk-party/gem-game/openingModal.png',
								'https://cdn.obsess-vr.com/charlotte-tilbury/pillow-talk-party/gem-game/firstDiamondModal.png',
								'',
								'',
								'https://cdn.obsess-vr.com/charlotte-tilbury/pillow-talk-party/gem-game/allDiamondModal.png',
							],
							toolbarBackground:
								'https://cdn.obsess-vr.com/charlotte-tilbury/pillow-talk-party/barBackground.png',
							toolbarCtaAssets: [
								{
									icon: 'https://cdn.obsess-vr.com/charlotte-tilbury/pillow-talk-party/boudoirIcon.png',
									category: 'boudoir',
									route: 'entrance',
								},
								{
									icon: 'https://cdn.obsess-vr.com/charlotte-tilbury/pillow-talk-party/partyIcon.png',
									category: 'party',
									route: 'disco-game',
								},
								{
									icon: 'https://cdn.obsess-vr.com/charlotte-tilbury/pillow-talk-party/swfIcon.png',
									category: 'swf',
								},
								{
									icon: 'https://cdn.obsess-vr.com/charlotte-tilbury/pillow-talk-party/consultationIcon.png',
									category: 'consultation',
									href: 'https://www.charlottetilbury.com/us/virtual-consultations-with-team-tilbury?&nst=0&gclid=EAIaIQobChMIh8q0sviW7AIVjsDACh05uwDEEAAYASAAEgKUbPD_BwE&gclsrc=aw.ds',
								},
							],
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
						'https://cdn.obsess-vr.com/charlotte-tilbury/pillow-talk-party/welcome-modal-bg.png',
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
				prodAnalyticsID: 'UA-91780857-16',
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
		},
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
