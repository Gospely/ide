<template>

  <panel @tabchanged="tabChanged" :panels.sync="tabs.panels">
    
<!--     <panel-tab :active="true" title="form.vue [设计]">
      <designer :designer.sync="designer"></designer>
    </panel-tab>

    <panel-tab :active="false" title="form.vue">
      <editor :codes.sync="codes"></editor>
    </panel-tab>-->

  </panel>

</template>

<script>

import Vue from 'Vue';
import { incrementCounter } from '../vuex/actions.js';

export default {

  components: {
  },

  data () {
    return {

      tabs: {
        panels: [{
          title: 'form.vue [设计]',
          src: '',
          type: 'Designer',
          active: true,
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
            name: 'gder'
          }
        }, {
          title: 'form.vue',
          src: '',
          type: 'Editor',
          active: false,
          codes: '// TO DO'
        }, {
          title: '控制台',
          src: '',
          type: 'Terminal',
          active: false
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

      codes: '// TO DO',

      currentView: 'Designer'

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
    },

    tabChanged: function(tab) {

      this.currentView = tab.type;

      if(this.currentView == 'Editor') {
        this.startCoding();
      }

      console.log(this.currentView);

    }

  }
}

</script>

<style>

  .drop {
    z-index: 65535;
  }

  .design {
    
  }

  .ui-select-option-content {
    min-height: 30px!important;
  }
  
</style>
