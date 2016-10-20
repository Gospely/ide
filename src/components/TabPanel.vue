<template>

  <panel @tabchanged="tabChanged" :panels.sync="tabs.panels"></panel>

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

    startCoding: function(designer) {
      window.startCoding(designer);
    },

    tabChanged: function(tab) {

      this.currentView = tab.type;

      if(this.currentView == 'Editor') {
        this.startCoding({
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
        });
      }

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
