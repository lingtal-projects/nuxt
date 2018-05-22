const path = require('path')

let _assetsRoot = '';
let _filenames = {};
let _link = [],_script = []
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

if(process.env.NODE_ENV !== 'dev'){
  _assetsRoot = 'res/';
  _filenames = {
    manifest : _assetsRoot+'js/[chunkhash].js',
    vendor   : _assetsRoot+'js/[chunkhash].js',
    app      : _assetsRoot+'js/[chunkhash].js',
    css      : _assetsRoot+'css/[chunkhash].css'
  }
  _link = [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
  ]
  _script = [
    {src:'https://cdn.bootcss.com/vue/2.5.17-beta.0/vue.min.js'},
    {src:'https://cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js'},
    {src:'https://cdn.bootcss.com/axios/0.18.0/axios.min.js'}
  ]
}else{
  _link = [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ]
}

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'demo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: _link,
    script:_script
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
        config.output.umdNamedDefine = true,
        config.output.chunkFilename = _assetsRoot+'js/[chunkhash:20].js'
      }
    }
  }
}
