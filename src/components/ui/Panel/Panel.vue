<template>

	<div class="panel">
		<div class="panel-header">
			<div title="{{tab.title}}" v-for="(key, tab) in tabsHeader" @click="toggleTab(key, tab)" class="panel-header-item" v-bind:class="{'active': tab.active}">
				<div class="label">{{tab.title}}</div>
				<div class="close">
					<ui-icon-button @click="closeTab(key)" v-if="tab.active" type="clear" icon="close" color="white"></ui-icon-button>
					<ui-icon-button @click="closeTab(key)" v-else type="clear" icon="close" color="danger"></ui-icon-button>
				</div>
			</div>
		</div>
		<div class="panel-body">
			<slot></slot>
		</div>
	</div>

</template>

<script>

	import PanelTab from './PanelTab.vue';

	export default {

		components: {
			PanelTab
		},

		props: {

			tabsHeader: {
				type: Array,
				default () {
					return [];
				}
			}

		},

		ready () {

			for (var i = 0; i < this.tabsHeader.length; i++) {
				var tab = this.tabsHeader[i];
				if(tab.active) {
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

				this.tabsHeader[key].active = true;

				var prevTab = this.tabsHeader[this.currentTab];

				if(prevTab) {
					prevTab.active = false;
				}

				this.currentTab = key;

				this.$children.forEach(t => {
					t.active = false;
					if(t.title == tab.title) {
						t.active = true;
					}
		        });

				if(tab) {
					this.$dispatch('tabchanged', tab);
				}
			},

			isTabClear: function() {
				var isClear = this.tabsHeader.length <= 0;

				if(isClear) {
					this.$dispatch('tabClear');
					return;					
				}
			},

			closeTab: function(key) {
				this.tabsHeader.splice(key, 1);

				this.isTabClear();

				console.log(key);

				if(key === 0) {
					key = 1;
				}
					
				var prevTab = key - 1 < 0 ? 0 : key - 1;

				console.log(prevTab, this.tabsHeader);

				this.toggleTab(prevTab, this.tabsHeader[prevTab]);
			}
		}

	}

</script>

<style>

.panel {
	width: 100%;
}

.panel-header {
	transition: transform 0.2s ease;
	width: 100%;
	height: 30px;
	display: inline-flex;
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
    height: 30px;
    display: inline-block;
    cursor: pointer;
    color: rgb(85,85,85);
    background-color: #eeeeee!important;
    box-shadow: none;
    width: 200px;
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
