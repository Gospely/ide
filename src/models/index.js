import AuthService from './AuthService.js';
import FSService from './FSService.js';

module.exports = {
	init: function(Vue) {

		window.$resource = Vue.resource;
		
		window.$Model = {};

		$Model.AuthService = AuthService;
		$Model.FSService = FSService;
	}
}