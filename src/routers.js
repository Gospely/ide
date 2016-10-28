module.exports = function(router){
	router.transitionOnLoad = true;
	router.map({
		'/index': {
			component: require('./components/index.vue'),
			name: 'index',
			subRoutes: {

			}
		},

		'archive/:appId': {
			component: require('./components/index.vue'),
			name: 'archive'
		},

		'/404': {
			component: require('./404.vue'),
			name: '404'
		}
	});
};