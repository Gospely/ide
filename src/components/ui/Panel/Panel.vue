<template>

	<div class="panel">
		<div class="panel-header">
			<div v-for="(key, tab) in tabs" @click="toggleTab(key, tabs)" class="panel-header-item" v-bind:class="{'active': tab.header.active}">
				<div class="label">{{tab.header.title}}</div>
				<div class="close">
					<ui-icon-button @click="closeThisTab(key)" v-if="tab.header.active" type="clear" icon="close" color="white"></ui-icon-button>
					<ui-icon-button @click="closeThisTab(key)" v-else type="clear" icon="close" color="danger"></ui-icon-button>
				</div>
			</div>
		</div>
		<div class="panel-body">
			<div class="panel-item active">
				<span>fucku</span>
			</div>
			<div class="panel-item">
				<p>bitch</p>
			</div>
		</div>
	</div>

</template>

<style>

.panel-header {
	transition: transform 0.2s ease;
	width: 100%;
	height: 32px;
}

.panel-item {
	display: none;
}

.panel-item.active {
	display: block;
}

.panel-header-item {
    position: relative;
    float: left;
    height: 32px;
    display: inline-block;
    cursor: pointer;
    color: rgb(85,85,85);
    background-color: #eeeeee!important;
    box-shadow: none;
    width: 250px;
    overflow: hidden;
    z-index: 0;
    /*transition: color .2s ease,background .1s ease,width .1s ease;*/
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.panel-header-item .label {
	display: block;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	margin: 0 30px 0 10px;
	width: 100%;
	width: calc(100% - 43px);
	z-index: -11;
	position: relative;
	height: 100%;
	line-height: 2.5;
}

.panel-header-item .close {
	position: absolute;
	top: 5px;
	right: 2px;
}

.panel-header-item .close .ui-icon-button {
    width: 18px!important;
    height: 18px!important;
}

.panel-header-item .close .ui-icon {
	font-size: 14px;
	line-height: 0.7;
}

.panel-header-item.active {
	background: #2196f3!important;
	color: #ffffff;
}

</style>

<script>

	export default {

		props: {

			tabs: {
				type: Array,
				default () {
					return [{
						header: {
							title: 'form.vue [设计]',
							src: '',
							type: 'designer',
							active: true
						}
					}, {
						header: {
							title: 'form.vue',
							src: '',
							type: 'code',
							active: false
						}
					}]
				}
			}

		},

		ready () {

			for (var i = 0; i < this.tabs.length; i++) {
				var tab = this.tabs[i];
				if(tab.header.active) {
					this.$set('currentTab', i);
					break;
				}
			};

		},

		data: function() {
			return {
				currentTab: 0
			}
		},

		methods: {

			toggleTab: function(key, tab) {

				if(key === this.currentTab) {
					return false;
				}

				this.isTabClear();

				console.log(this.currentTab);

				this.tabs[key].header.active = true;

				var prevTab = this.tabs[this.currentTab];

				if(prevTab) {
					prevTab.header.active = false;
				}

				this.currentTab = key;

				if(tab) {
					this.$dispatch('tabChanged', tab);
				}
			},

			isTabClear: function() {
				var isClear = this.tabs.length <= 0;

				if(isClear) {
					this.$dispatch('tabClear');
					return;					
				}
			},

			closeThisTab: function(key) {
				this.tabs.splice(key, 1);

				this.isTabClear();

				var prevTab = key - 1 < 0 ? 0 : key - 1;

				this.toggleTab(prevTab, this.tabs[prevTab]);
			}

		}

	}

</script>