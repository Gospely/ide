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

<!--     <forms :show-title="true" v-show="true" v-bind:styles="consoleStyles" fid="console">
      <span slot="title">控制台</span>
      <div slot="content">
        <terminal></terminal>
      </div>
    </forms> -->

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
        'width': '100%',
        'margin-right': '-1px'
      },

      attrStyles: {
        width: '100%'
      },

      consoleStyles: {
        width: '100%'
      },

      treeNode: []
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

    this.$nextTick(() => {

      $Model.FSService.ls().then( (res) => {

        var response = res.data,
            fileTree = response.data;

        if(response.code == 200) {

          var result = [];

          for (var i = 0; i < response.fields.length; i++) {
            var field = response.fields[i];

            var node = {
              id: field.id,
              name: field.name,
              open: false,
              path: field.path,
              pId: 0
            };

            result.push(node);

            if(field.sub.length != 0) {

              for (var j = 0; j < field.sub.length; j++) {
                var sub = field.sub[j];

                node = {
                  id: sub.id,
                  name: sub.name,
                  path: sub.path,
                  pId: field.id
                }

                result.push(node);

              };

            }

          };

          this.$set('treeNode', result);
          $.fn.zTree.init($("#treeDemo"), setting, this.$get('treeNode'));
          $("#callbackTrigger").bind("change", {}, setTrigger);  

        }else {
          util.alert(response.message);
        }

      }).catch( (error) => {
        util.alert('文件树请求失败');
      });

    });

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
  height: 100%;
}

.form-content {
  /*height: 100%;*/
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
