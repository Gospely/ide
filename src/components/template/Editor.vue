<template>

    <div id="editor">{{codes}}</div>

</template>

<script>
	
	export default {

		props: {
			codes: {
				type: String,
				default () {
					return '';
				}
			}	
		},

		ready () {

			var self = this;

			this.$nextTick(function() {
				self.$get('init')();
			});

			window.startCoding = self.$get('startCoding');

		},

		data () {

			return {

		      	editor: ''

			}

		},

		methods: {

			init: function() {

				var self = this;

	          	//初始化编辑器
	          	ace.require("ace/ext/language_tools");
	          	self.editor = ace.edit("editor");
	          	self.editor.setTheme("ace/theme/twilight");
	          	self.editor.setOptions({
	            	enableBasicAutocompletion: true
	          	});

	          	window.refreshDesignerCode = this.refreshDesignerCode;

	          	var HTMLMode = ace.require("ace/mode/html").Mode;
	          	var JavaScript = ace.require('ace/mode/javascript').Mode;
	          	this.editor.session.setMode(new HTMLMode());

	          	var editorBeforeChanged = new Date().getTime();

	          	this.editor.getSession().on('change', function(changed) {
	          		self.$dispatch('change', changed);
		        });

			},

		    refreshDesignerCode: function(codes) {
		      this.codes = codes;
		      this.editor.setValue(codes);
		      this.editor.clearSelection();
		    },

		    startCoding: function(designer) {
		      this.refreshDesignerCode($('.' + designer.class).contents().find('body').html());
		      this.editor.focus();
		      this.editor.gotoLine(this.editor.session.getLength());
		    }

		}

	}


</script>

<style>

</style>