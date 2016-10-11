<template>
    <div class="designer-wrapper">
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

			    loading: true

			}

		},

		ready () {
			this.$get('init')();
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

</style>
