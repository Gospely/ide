<template>

  <forms v-bind:styles="styles" fid="controls">
    <span slot="title">工具箱</span>
    <div slot="content">
      <controls-panel></controls-panel>
    </div>
  </forms>

  <forms v-bind:styles="designStyles" fid="form">
    <span slot="title">设计与编码</span>
    <div slot="content">
      <section class="design">
        <design-panel></design-panel>
      </section>
    </div>
  </forms>

  <forms v-bind:styles="attrStyles" fid="attributes">
    <span slot="title">属性</span>
    <div slot="content">
      <attr-panel></attr-panel>
    </div>
  </forms>

  <forms v-show="true" v-bind:styles="consoleStyles" fid="console">
    <span slot="title">控制台</span>
    <div slot="content">
      <terminal></terminal>
    </div>
  </forms>

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
        width: '250px',
        height: 'calc(100% - 40px)',
        left: '0px',
        top: '36px'
      },

      designStyles: {
        left: '251px',
        top: '36px',
        width: 'calc(100% - 504px)',
        height: 'calc(100% - 40px)'
      },

      attrStyles: {
        left: 'calc(100% - 252px)',
        top: '36px',
        width: '250px',
        height: 'calc(100% - 40px)'
      },

      consoleStyles: {
        left: '251px',
        // top: 'calc(100% - 250px)',
        width: 'calc(100% - 504px)',
        // height: '250px'
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

</style>
