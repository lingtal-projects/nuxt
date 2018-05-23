const path = require('path')

let _assetsRoot = '';
let _filenames = {};
let _link = [
	{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
],
_script = [
	{ innerHTML:`
		if ( typeof $CONFIG == "undefined" || !$CONFIG ) {
			var $CONFIG = {

			}
		}
	`, type: 'text/javascript'}
];

function resolve (dir) {
	return path.join(__dirname, '..', dir)
}

if(process.env.NODE_ENV !== 'dev'){
	_assetsRoot = 'res/';
	_filenames = {
		manifest : _assetsRoot+'js/[hash].js',
		vendor   : _assetsRoot+'js/[chunkhash].js',
		app      : _assetsRoot+'js/[chunkhash].js',
		css      : _assetsRoot+'css/[contenthash].css',
		chunk    : _assetsRoot+'js/[chunkhash].js'
	}
}

module.exports = {
	/*
	** Headers of the page
	*/
	head: {
		title : '凌拓',
		titleTemplate : '%s - 凌拓科技',
		meta : [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no' },
			{ name: 'renderer', content: 'webkit'},
			{ 'http-equiv': "X-UA-Compatible", content:"IE=edge,chrome=1"},
			{ hid: 'description', name: 'description', content: 'LingTal' }
		],
		link   : _link,
		script : _script,
		style  : [
			{ cssText: 'body {}', type: 'text/css' }
		]
	},
	/*
	** Customize the progress bar color
	*/
	loading: './components/loading.vue',
	/*
	** Build configuration
	*/
	build: {
		//vendor: ['axios'],
		extractCSS : {allChunks: true },
		publicPath : 'https://m.lingtal.com/dist/',
		filenames  : _filenames,
		/*
		** Run ESLint on save
		*/
		extend (config, { isDev, isClient }) {
			if (isDev && isClient) {
				config.module.rules.push({
					enforce: 'pre',
					test: /\.(js|vue)$/,
					loader: 'eslint-loader',
					exclude: /(node_modules)/
				})
			}
			if(!isDev && isClient){
				config.externals = {
					"vue": "Vue",
					"axios" : "axios",
					"vue-router" : "VueRouter"
				},
				config.output.library = 'LingTal',
				config.output.libraryTarget = 'umd',
				config.output.umdNamedDefine = true
				//config.output.chunkFilename = _assetsRoot+'js/[chunkhash:20].js'
			}
		}
	},
	extensions: [],
	generate: {
		dir: 'demoooooo'
	},
	ErrorPage: null,
	dir: {
    assets: 'assets',
    layouts: 'layouts',
    middleware: 'middleware',
    pages: 'pages',
    static: 'static',
    store: 'store'
  },
  router: {
    mode: 'history',
    base: '/',
    routes: [],
    middleware: [],
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    extendRoutes: null,
    scrollBehavior: null,
    parseQuery: false,
    stringifyQuery: false,
    fallback: false
  },
  messages: {
    error_404: '悲剧了！页面找不到了……',
    server_error: '服务器错误',
    nuxtjs: 'LingTal',
    back_to_home: '返回首页',
    server_error_details:'应用程序出现错误',
    client_error: '错误',
    client_error_details: '页面发生错误.'
  }
}
