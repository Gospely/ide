<template>

  <div class="columns">
    <div class="column">

      <forms :show-title="false" v-bind:styles="styles" fid="controls">
        <div slot="content" id="tools">
          <ui-tabs type="text" :fullwidth="true">
              <ui-tab header="控件" @on-selected="">
                <controls-panel></controls-panel>
              </ui-tab>
              <ui-tab header="内容">
                  <div id="tree"></div>
              </ui-tab>
              <ui-tab header="文件">
                <ul id="file-tree" class="ztree"></ul>
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
  var zTree = $.fn.zTree.getZTreeObj("file-tree");
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

      treeNode: [],
      fileTreeSelector: 'file-tree'
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
        // addHoverDom: this.$get('addHoverDom'),
        // removeHoverDom: this.$get('removeHoverDom')
      }
    };

    this.$nextTick(() => {

      $('#tree')
        .jstree({
          'core' : {
            'data' : {
              'url' : 'http://localhost:8089/fs/list/optional/',
              'data' : function (node) {
                console.log('node', node);
                return { 'id' : node.id == '#' ? '' : node.id };
              }
            },
            'check_callback' : function(o, n, p, i, m) {
              if(m && m.dnd && m.pos !== 'i') { return false; }
              if(o === "move_node" || o === "copy_node") {
                if(this.get_node(n).parent === this.get_node(p).id) { return false; }
              }
              return true;
            },
            'themes' : {
              'responsive' : false,
              'variant' : 'small',
              'stripes' : true
            }
          },
          'sort' : function(a, b) {
            return this.get_type(a) === this.get_type(b) ? (this.get_text(a) > this.get_text(b) ? 1 : -1) : (this.get_type(a) >= this.get_type(b) ? 1 : -1);
          },
          'contextmenu' : {
            'items' : function(node) {
              var tmp = $.jstree.defaults.contextmenu.items();
              delete tmp.create.action;
              tmp.create.label = "新建";
              tmp.create.submenu = {
                "create_folder" : {
                  "separator_after" : true,
                  "label"       : "文件夹",
                  "action"      : function (data) {
                    var inst = $.jstree.reference(data.reference),
                      obj = inst.get_node(data.reference);
                    inst.create_node(obj, { type : "default" }, "last", function (new_node) {
                      setTimeout(function () { inst.edit(new_node); },0);
                    });
                  }
                },
                "create_file" : {
                  "label"       : "文件",
                  "action"      : function (data) {
                    var inst = $.jstree.reference(data.reference),
                      obj = inst.get_node(data.reference);
                    inst.create_node(obj, { type : "file" }, "last", function (new_node) {
                      setTimeout(function () { inst.edit(new_node); },0);
                    });
                  }
                }
              };
              if(this.get_type(node) === "file") {
                delete tmp.create;
              }
              return tmp;
            }
          },
          'types' : {
            'default' : { 'icon' : 'folder' },
            'file' : { 'valid_children' : [], 'icon' : 'file' }
          },
          'unique' : {
            'duplicate' : function (name, counter) {
              return name + ' ' + counter;
            }
          },
          'plugins' : ['state','dnd','sort','types','contextmenu','unique']
        })
        .on('delete_node.jstree', function (e, data) {
          $.get('?operation=delete_node', { 'id' : data.node.id })
            .fail(function () {
              data.instance.refresh();
            });
        })
        .on('create_node.jstree', function (e, data) {
          $.get('?operation=create_node', { 'type' : data.node.type, 'id' : data.node.parent, 'text' : data.node.text })
            .done(function (d) {
              data.instance.set_id(data.node, d.id);
            })
            .fail(function () {
              data.instance.refresh();
            });
        })
        .on('rename_node.jstree', function (e, data) {
          $.get('?operation=rename_node', { 'id' : data.node.id, 'text' : data.text })
            .done(function (d) {
              data.instance.set_id(data.node, d.id);
            })
            .fail(function () {
              data.instance.refresh();
            });
        })
        .on('move_node.jstree', function (e, data) {
          $.get('?operation=move_node', { 'id' : data.node.id, 'parent' : data.parent })
            .done(function (d) {
              //data.instance.load_node(data.parent);
              data.instance.refresh();
            })
            .fail(function () {
              data.instance.refresh();
            });
        })
        .on('copy_node.jstree', function (e, data) {
          $.get('?operation=copy_node', { 'id' : data.original.id, 'parent' : data.parent })
            .done(function (d) {
              //data.instance.load_node(data.parent);
              data.instance.refresh();
            })
            .fail(function () {
              data.instance.refresh();
            });
        })
        .on('changed.jstree', function (e, data) {
          if(data && data.selected && data.selected.length) {
            $.get('http://localhost:8089/fs/list/optional/' + data.selected, function (d) {
              if(d && typeof d.type !== 'undefined') {
                $('#data .content').hide();
                switch(d.type) {
                  case 'text':
                  case 'txt':
                  case 'md':
                  case 'htaccess':
                  case 'log':
                  case 'sql':
                  case 'php':
                  case 'js':
                  case 'json':
                  case 'css':
                  case 'html':
                    $('#data .code').show();
                    $('#code').val(d.content);
                    break;
                  case 'png':
                  case 'jpg':
                  case 'jpeg':
                  case 'bmp':
                  case 'gif':
                    $('#data .image img').one('load', function () { $(this).css({'marginTop':'-' + $(this).height()/2 + 'px','marginLeft':'-' + $(this).width()/2 + 'px'}); }).attr('src',d.content);
                    $('#data .image').show();
                    break;
                  default:
                    $('#data .default').html(d.content).show();
                    break;
                }
              }
            });
          }
          else {
            $('#data .content').hide();
            $('#data .default').html('Select a file from the tree.').show();
          }
        });

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
          $.fn.zTree.init($("#" + this.$get('fileTreeSelector')), setting, this.$get('treeNode'));
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
      var zTree = $.fn.zTree.getZTreeObj(this.fileTreeSelector);
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
        var zTree = $.fn.zTree.getZTreeObj(this.fileTreeSelector);
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

  #data { margin-left:320px; }
  #data textarea { margin:0; padding:0; height:100%; width:100%; border:0; background:white; display:block; line-height:18px; resize:none; }
  #data, #code { font: normal normal normal 12px/18px 'Consolas', monospace !important; }

  #tree .folder { background:url('https://www.jstree.com/demo_filebrowser/file_sprite.png') right bottom no-repeat; }
  #tree .file { background:url('https://www.jstree.com/demo_filebrowser/file_sprite.png') 0 0 no-repeat; }
  #tree .file-pdf { background-position: -32px 0 }
  #tree .file-as { background-position: -36px 0 }
  #tree .file-c { background-position: -72px -0px }
  #tree .file-iso { background-position: -108px -0px }
  #tree .file-htm, #tree .file-html, #tree .file-xml, #tree .file-xsl { background-position: -126px -0px }
  #tree .file-cf { background-position: -162px -0px }
  #tree .file-cpp { background-position: -216px -0px }
  #tree .file-cs { background-position: -236px -0px }
  #tree .file-sql { background-position: -272px -0px }
  #tree .file-xls, #tree .file-xlsx { background-position: -362px -0px }
  #tree .file-h { background-position: -488px -0px }
  #tree .file-crt, #tree .file-pem, #tree .file-cer { background-position: -452px -18px }
  #tree .file-php { background-position: -108px -18px }
  #tree .file-jpg, #tree .file-jpeg, #tree .file-png, #tree .file-gif, #tree .file-bmp { background-position: -126px -18px }
  #tree .file-ppt, #tree .file-pptx { background-position: -144px -18px }
  #tree .file-rb { background-position: -180px -18px }
  #tree .file-text, #tree .file-txt, #tree .file-md, #tree .file-log, #tree .file-htaccess { background-position: -254px -18px }
  #tree .file-doc, #tree .file-docx { background-position: -362px -18px }
  #tree .file-zip, #tree .file-gz, #tree .file-tar, #tree .file-rar { background-position: -416px -18px }
  #tree .file-js { background-position: -434px -18px }
  #tree .file-css { background-position: -144px -0px }
  #tree .file-fla { background-position: -398px -0px }

</style>
