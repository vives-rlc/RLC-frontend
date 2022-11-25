const path = require('path')
module.exports = {
	async headers() {
		return [
			{
				source: '/(.*).jpg',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable',
					},
				],
			},
		]
	},
	env:{
		// AUTHENTICATION_SERVER_PORT: process.env.AUTHENTICATION_SERVER_PORT,
		RESERVATION_SERVER_PORT: process.env.RESERVATION_SERVER_PORT,
		// GUACD_SERVER_PORT : process.env.GUACD_SERVER_PORT,
		BACKEND_URL: process.env.BACKEND_URL,
		CRYPT_SECRET: process.env.CRYPT_SECRET,
		CYPHER: process.env.CYPHER
	},
	compiler: {
		styledComponents: true,
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
		prependData: '@import "/styles/variables.scss";',
	},
	//this made dynamic routes impossible
	//assetPrefix: './'
}