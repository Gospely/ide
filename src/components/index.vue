<template>

  <div class="columns">
    <div class="column">

      <forms :show-title="false" v-bind:styles="styles" fid="controls">
        <div slot="content" id="tools">
          <ui-tabs type="text" :fullwidth="true">
              <ui-tab header="控件">
                <controls-panel></controls-panel>
              </ui-tab>
              <ui-tab header="内容">

              </ui-tab>
              <ui-tab header="文件">
                <ul id="treeDemo" class="ztree"></ul>
              </ui-tab>
          </ui-tabs>
        </div>
      </forms>

    </div>
    <forms :show-title="false" v-bind:styles="designStyles" fid="form">
      <section slot="content" class="design">
        <design-panel></design-panel>
      </section>
    </forms>
    <div class="column is-2" style="margin-right: 2px;">
      <forms v-bind:styles="attrStyles" fid="attributes">
        <span slot="title">属性</span>
          <attr-panel slot="content"></attr-panel>
      </forms>
    </div>

  <forms v-show="true" v-bind:styles="consoleStyles" fid="console">
    <span slot="title">控制台</span>
    <div slot="content">
      <!-- <terminal></terminal> -->
      <panel></panel>
    </div>
  </forms>

  </div>

</template>

<script>

import controlsPanel from './controls.vue';
import designPanel from './design.vue';
import attrPanel from './attr.vue';
import store from '../vuex.js';
import forms from './forms/form.vue';
import terminal from './terminal.vue';

function setTrigger() {
  var zTree = $.fn.zTree.getZTreeObj("treeDemo");
  zTree.setting.edit.drag.autoExpandTrigger = $("#callbackTrigger").attr("checked");
}

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

    var self = this;

    var setting = {
      edit: {
        enable: true,
        showRemoveBtn: true,
        showRenameBtn: true
      },

      data: {
        simpleData: {
          enable: true
        }
      },

      callback: {
        onExpand: this.$get('onExpand'),
        onClick: this.$get('treeNodeOnClick')
      },

      view: {
        dblClickExpand: false,
        addHoverDom: this.$get('addHoverDom'),
        removeHoverDom: this.$get('removeHoverDom')
      }
    };

    var zNodes =[
      { id:1, pId:0, name:"随意拖拽 1", open:true},
      { id:11, pId:1, name:"随意拖拽 1-1"},
      { id:12, pId:1, name:"随意拖拽 1-2"},
      { id:121, pId:12, name:"随意拖拽 1-2-1"},
      { id:122, pId:12, name:"随意拖拽 1-2-2"},
      { id:123, pId:12, name:"随意拖拽 1-2-3"},
      { id:13, pId:1, name:"禁止拖拽 1-3", open:true, drag:false},
      { id:131, pId:13, name:"禁止拖拽 1-3-1", drag:false},
      { id:132, pId:13, name:"禁止拖拽 1-3-2", drag:false},
      { id:132, pId:13, name:"禁止拖拽 1-3-3", drag:false},
      { id:2, pId:0, name:"禁止子节点移走 2", open:true, childOuter:false},
      { id:21, pId:2, name:"我不想成为父节点 2-1", dropInner:false},
      { id:22, pId:2, name:"我不要成为根节点 2-2", dropRoot:false},
      { id:23, pId:2, name:"拖拽试试看 2-3"},
      { id:3, pId:0, name:"禁止子节点排序/增加 3", open:true, childOrder:false, dropInner:false},
      { id:31, pId:3, name:"随意拖拽 3-1"},
      { id:32, pId:3, name:"随意拖拽 3-2"},
      { id:33, pId:3, name:"随意拖拽 3-3"}
    ];

    $.fn.zTree.init($("#treeDemo"), setting, zNodes);
    $("#callbackTrigger").bind("change", {}, setTrigger);  
  },

  components: {
    controlsPanel,
    designPanel,
    forms,
    attrPanel,
    terminal
  },

  methods: {

    onExpand: function(event, treeId, treeNode) {
      if (treeNode === autoExpandNode) {
        className = (className === "dark" ? "":"dark");
      }
    },

    treeNodeOnClick: function(e,treeId, treeNode) {
      var zTree = $.fn.zTree.getZTreeObj("treeDemo");
      zTree.expandNode(treeNode);
    },

    addHoverDom: function(treeId, treeNode) {
      var sObj = $("#" + treeNode.tId + "_span");
      if (treeNode.editNameFlag || $("#addBtn_"+treeNode.tId).length>0) return;
      var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
        + "' title='add node' onfocus='this.blur();'></span>";
      sObj.after(addStr);
      var btn = $("#addBtn_"+treeNode.tId);
      if (btn) btn.bind("click", function(){
        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        zTree.addNodes(treeNode, {id:(100 + newCount), pId:treeNode.id, name:"new node" + (newCount++)});
        return false;
      });
    },

    removeHoverDom: function(treeId, treeNode) {
      $("#addBtn_"+treeNode.tId).unbind().remove();
    }

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
