import AuthService from './AuthService.js';
import FSService from './FSService.js';
import AppService from './AppService.js';

module.exports = {
	init: function(Vue) {

		window.$resource = Vue.resource;
		
		window.$Model = {};

		$Model.AuthService = AuthService;
		$Model.FSService = FSService;
		$Model.AppService = AppService;
	}
}