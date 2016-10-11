<template>

  <panel @tabchanged="startCoding" :tabs-header.sync="tabs.tabsHeader">
    
    <panel-tab :active="true">
      <designer :designer.sync="designer"></designer>
    </panel-tab>

    <panel-tab :active="false">
      <editor :codes.sync="codes"></editor>
    </panel-tab>

  </panel>

</template>

<script>

import Vue from 'Vue';
import { incrementCounter } from '../vuex/actions.js';

import Designer from './template/Designer.vue';
import Editor from './template/Editor.vue';

export default {

  components: {
    Designer,
    Editor
  },

  data () {
    return {

      tabs: {
        tabsHeader: [{
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
        }],

        tabsPanel: {

        }
      },

      designer: {
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
      },

      codes: '// TO DO'

    }
  },

  ready() {

    var self = this;

    self.$nextTick(function() {

      //可拖拽组件初始化
      $('.cpList li').each(function(){  
          $(this).attr("draggable", "true");
      });

      //初始化设计器

      // self.$get('initDesignerWrapper')();

      // var Tabs = Vue.extend({
      //   template: '      <ui-tab header="form.vue"> \
      //              <ui-icon-button class="panel-close" type="flat" icon="close" color="danger"></ui-icon-button> \
      //               <div>fuck{{firstName}}{{lastName}}{{alias}}</div> \
      //             </ui-tab>'
      // })
      // // 创建一个 Profile 实例
      // var tabs = new Tabs({
      //   data: {
      //     firstName: 'Walter',
      //     lastName: 'White',
      //     alias: 'Heisenberg'
      //   }
      // })
      // // 挂载到元素上
      // tabs.$mount('#fuckub')

    });

  },

  watch: {

  },

  vuex: {
    actions: {
      increment: incrementCounter
    }
  },

  methods: {

    startCoding: function() {
      window.startCoding(this.designer);
    }

  }
}

</script>

<style>

  #editor {
    width: 100%;
    height: 100vh;
    /*height: 100%;*/
  }

  .drop {
    z-index: 65535;
  }

  .designer-wrapper {
    text-align: center;
    line-height: 50%;
    background: -webkit-linear-gradient(left top, #dde9f2 , #efefef); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(bottom right, #dde9f2, #efefef); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(bottom right, #dde9f2, #efefef); /* Firefox 3.6 - 15 */
    background: linear-gradient(to bottom right, #dde9f2 , #efefef); /* 标准的语法 */
    padding: 16px;
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

  .design {
    
  }

  .ui-select-option-content {
    min-height: 30px!important;
  }
  
</style>
