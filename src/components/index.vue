<template>

  <div class="columns">
    <div class="column is-2">

      <forms v-bind:styles="styles" fid="controls">
        <span slot="title">工具箱</span>
        <div slot="content" id="tools">
          <ui-tabs type="text" :fullwidth="true">
              <ui-tab header="控件">
                <controls-panel></controls-panel>
              </ui-tab>
              <ui-tab header="内容">

              </ui-tab>
              <ui-tab header="文件">

              </ui-tab>
          </ui-tabs>
        </div>
      </forms>

    </div>
    <div class="column">
      <forms v-bind:styles="designStyles" fid="form">
        <span slot="title">设计与编码</span>
        <div slot="content">
          <section class="design">
            <design-panel></design-panel>
          </section>
        </div>
      </forms>
    </div>
    <div class="column is-2" style="margin-right: 2px;">
      <forms v-bind:styles="attrStyles" fid="attributes">
        <span slot="title">属性</span>
        <div slot="content">
          <attr-panel></attr-panel>
        </div>
      </forms>
    </div>
  </div>
<!-- 
  <forms v-show="true" v-bind:styles="consoleStyles" fid="console">
    <span slot="title">控制台</span>
    <div slot="content">
      <terminal></terminal>
    </div>
  </forms> -->

</template>

<script>

import controlsPanel from './controls.vue';
import designPanel from './design.vue';
import attrPanel from './attr.vue';
import store from '../vuex.js';
import forms from './forms/form.vue';
import terminal from './terminal.vue';

export default {
  data () {
    return {
      msg: 'Hello Index!',
      isCoding: false,
      fuck: 'fuck111',
      fuckshit: 'fuckshi111t',

      styles: {
        width: '100%'
      },

      designStyles: {
        width: '100%'
      },

      attrStyles: {
        width: '100%'
      },

      consoleStyles: {
        width: '100%'
      }
    }
  },

  ready() {
  },

  components: {
    controlsPanel,
    designPanel,
    forms,
    attrPanel,
    terminal
  },

  methods: {

  },

  store
}

</script>

<style>

.design {
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}

.ui-snackbar {
  padding: 8px 24px;
}

.ui-tabs-body {
  padding: 0px;
}

#tools .ui-tabs-body {
  margin-top: 1px;
}

</style>
