<template>

    <div v-bind:id="id" v-bind:style="editorStyle">{{codes}}</div>

</template>

<script>
	
	export default {

		props: {
			codes: {
				type: String,
				default () {
					return '';
				}
			},

			id: {
				type: String,
				required: true,
				default () {
					return '';
				}
			},

			details: {
				type: Object,
				required: true,
				default () {
					return {};
				}
			}
		},

		ready () {

			var self = this;

			this.$nextTick(function() {
				self.$get('init')();
			});

			window.startCoding = self.$get('startCoding');

			var editorHeight = $('#form').height();

			this.$nextTick(function() {
				self.$set('editorStyle.height', (editorHeight - 30) + 'px');
				console.log(self.$get('editorStyle').height);
			});

		},

		data () {

			return {

		      	editor: '',

		      	editorStyle: {
		      		width: '100%',
		      		height: ''
		      	}

			}

		},

		methods: {

			init: function() {

				var self = this;

	          	//初始化编辑器
	          	ace.require("ace/ext/language_tools");
	          	self.editor = ace.edit(self.id);
	          	self.editor.setTheme("ace/theme/twilight");
	          	self.editor.setOptions({
	            	enableBasicAutocompletion: true
	          	});

	          	window.refreshDesignerCode = this.refreshDesignerCode;

	          	var initSyntaxHighlight = () => {

		          	var modes = {},
		          		modeNames = ['html', 'javascript', 'css'];

		          	for (var i = 0; i < modeNames.length; i++) {
		          		var mode = modeNames[i];
		          		modes[mode] = ace.require('ace/mode/' + mode).Mode;
		          	};

		          	var transferExtName = function(name) {

		          		var extnameTransferList = {
		          			'': 'html',
		          			'vue': 'html',
		          			'json': 'javascript',
		          			'js': 'javascript'
		          		}

		          		name = name.replace('.', '');

		          		return extnameTransferList[name] || name;
		          	}

		          	this.details.extname = transferExtName(this.details.extname);

		          	try {
			          	this.editor.session.setMode(new modes[this.details.extname]);
		          	}catch(error) {
		          		util.alert('尚不支持的文件类型');
		          	}

				};

				initSyntaxHighlight();

	          	var editorBeforeChanged = new Date().getTime();

	          	this.editor.$blockScrolling = Infinity;

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