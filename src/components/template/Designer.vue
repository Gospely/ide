<template>
    <div class="designer-wrapper" v-bind:style="designerStyle">
        <div class="loader">
          <ui-progress-circular :show="loading" color="multi-color">
          </ui-progress-circular>
        </div>
    </div>
</template>

<script>
	
	export default {

		props: {

			designer: {
				type: Object,
				default () {
					return {
				        id: 'gospelDesignerArea',
				        context: '',
				        dom: '',
				        class: 'designer',
				        wrapper: '.designer-wrapper',
				        container: '.gospel-designer-area',
				        src: './static/designer.html',
				        width: '375',
				        height: '667',
				        name: 'gder',
				    }
				}
			}

		},

		data () {

			return {

			    loading: true,

			    designerStyle: {
			    	width: '100%'
			    }

			}

		},

		ready () {
			this.$get('init')();

			var editorHeight = $('#form').height();

			var self = this;

			this.$nextTick(function() {
				self.$set('designerStyle.height', (editorHeight - 30) + 'px');
				console.log(self.$get('designerStyle').height);
			});
		},

		methods: {

			init: function() {

		      var self = this;

		      var iframe = document.createElement("iframe");
		      iframe.src = this.designer.src;
		      iframe.setAttribute('class', this.designer.class);
		      iframe.setAttribute('id', this.designer.id)
		      iframe.setAttribute('width', this.designer.width);
		      iframe.setAttribute('height', this.designer.height);
		      iframe.setAttribute('name', this.designer.name);

		      this.designer.context = $('.' + self.designer.class).contents();

		      var designerOnload = function() {
		        self.loading = false;
		        $('.loader').hide();
		        var designerCode = self.designer.context.find('body').html();
		        self.designer.dom = iframe;

		      }

		      if (iframe.attachEvent){

		        iframe.attachEvent("onload", function(){
		          designerOnload();
		        });

		      } else {

		        iframe.onload = function(){
		          designerOnload();
		        };

		      }

		      $('.designer-wrapper').append(iframe);

			},

			refreshIframe: function() {
		      $('.' + this.designer.class).contents().find('body').html(this.editor.getValue());

		      var self = this;

		      setTimeout(function() {
		        var Designer = document.getElementById(self.designer.id).contentWindow.designer;
		        Designer.init(self.designer.container);
		      }, 1);
		    }

		}

	}

</script>

<style>

  .designer-wrapper {
    background: -webkit-linear-gradient(left top, #dde9f2 , #efefef); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(bottom right, #dde9f2, #efefef); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(bottom right, #dde9f2, #efefef); /* Firefox 3.6 - 15 */
    background: linear-gradient(to bottom right, #dde9f2 , #efefef); /* 标准的语法 */
    display: flex;
	justify-content: center;
	align-items: center;
  }

  .designer-wrapper .designer {
    border: 1px solid #dde1e4;
    box-shadow: 0 1px 6px rgba(0,0,0,.33);
    background: rgb(255, 255, 255);
    line-height: 50%;
  }

  .loader {
    position: absolute;
    top: 50%;
    width: 100px;
    height: 100px;
    left: 50%;
  }

</style>
