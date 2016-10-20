import Vue from 'vue';
import App from './App';
import Keen from 'keen-ui';
import KeenStyle from '../node_modules/keen-ui/dist/min/keen-ui.min.css';
//加载AJAX Service库
import Service from './models/index.js';
//加载vue-router
import VueRouter from 'vue-router';
import routerConfig from './routers.js';
import Vuex from 'vuex';
import stores from './vuex/stores.js';

import $ from 'jquery';

import 'animate.css';

import Panel from './components/ui/Panel/Panel.vue';
import PanelTab from './components/ui/Panel/PanelTab.vue';

import Designer from './components/template/Designer.vue';
import Editor from './components/template/Editor.vue';

import Terminal from './components/terminal.vue';

import util from './util/index.js';

window.util = util;

//加载keen-ui
Vue.use(Keen);
Vue.use(Vuex);

Vue.component('panel', Panel);
Vue.component('panel-tab', PanelTab);

Vue.component('Designer', Designer);
Vue.component('Editor', Editor);
Vue.component('Terminal', Terminal);

//----------------------------初始化AJAX----------------------------

//加载AJAX请求库
Vue.use(require('vue-resource'));

//初始化AJAX头
Vue.http.options.root = 'http://api.gospely.com';
Vue.http.headers.common['Authorization'] = 'Basic YXBpOnBhc3N3b3Jk';

//----------------------------初始化AJAX----------------------------

//----------------------------初始化路由----------------------------

Vue.use(VueRouter);

var router = new VueRouter();

routerConfig(router);

router.start(App, '#main');

//路由请求开始时调用
router.beforeEach(function () {

});

//路由请求结束后调用
router.afterEach(function () {
	
});

router.redirect({
  '*': '/index'
});

//----------------------------初始化路由----------------------------

Service.init(Vue);
