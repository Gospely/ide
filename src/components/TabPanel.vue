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
          },
          extname: ''
        }, {
          title: 'form.vue',
          src: '',
          type: 'Editor',
          active: false,
          codes: '// TO DO',
          id: 'editor',
          extname: 'vue'
        }, {
          title: '控制台',
          src: '',
          type: 'Terminal',
          active: false,
          extname: ''
        }]
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

  events: {

    'new-tab-panels': function(tab) {

      console.log(tab);

      var tabExists = this.isTabExists(tab), 
          panelTab = this.$children[0];

      if(!tabExists.exist) {
        this.tabs.panels.push(tab);
        panelTab.toggleTab(this.tabs.panels.length - 1, tab);    
      }else {
        panelTab.toggleTab(tabExists.index, tab);
      }
    }

  },

  methods: {

    startCoding: function(designer) {
      window.startCoding(designer);
    },

    isTabExists: function(tab) {

      var flag = false,
          index = 0;

      for (var i = 0; i < this.tabs.panels.length; i++) {
        var panel = this.tabs.panels[i];

        if(tab.src == panel.src) {
          flag = true;
          index = i;
        }

      };

      return {
        exist: flag,
        index: index
      };

    },

    tabChanged: function(tab) {

      this.currentView = tab.type;

      if(this.currentView == 'Editor') {
        // this.startCoding({
        //     id: 'gospelDesignerArea',
        //     context: '',
        //     dom: '',
        //     class: 'designer',
        //     wrapper: '.designer-wrapper',
        //     container: '.gospel-designer-area',
        //     src: './static/designer.html',
        //     width: '375',
        //     height: '667',
        //     name: 'gder'
        // });
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
