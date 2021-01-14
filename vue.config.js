module.exports = {
	pwa: {
		name: 'Todo',
		themeColor: '#ffffff',
		msTileColor: '#000000',
		appleMobileWebAppCapable: 'yes',
		appleMobileWebAppStatusBarStyle: 'white',

		manifestOptions: {
			display: 'fullscreen',
			background_color: 'transparent',
			theme_color: 'transparent',
			icons: [
				{
					src: '/img/icons/android-chrome-192x192.png',
					sizes: '192x192',
					type: 'image/png',
				},
				{
					src: '/img/icons/android-chrome-512x512.png',
					sizes: '512x512',
					type: 'image/png',
				},
			],
		},
	},
};
