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
              </ui-tab>
              <ui-tab header="文件">
                <div v-bind:id="fileTreeSelector"></div>
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

      files: [],
      fileTreeSelector: 'file-tree'
    }
  },

  ready() {

    this.$nextTick(() => {

      $Model.FSService.ls().then( (res) => {

        var response = res.data,
            fileTree = response.data;

        if(response.code == 200) {

          this.$set('files', fileTree);
          this.$get('initFileTree')(); 

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

    initFileTree: function() {

      $('#' + this.fileTreeSelector)
        .jstree({
          'core' : {
            'data' : {
              'url' : 'http://api.gospely.com/fs/list/optional/',
              'data' : function (node) {
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
            $.get('http://api.gospely.com/fs/list/optional/' + data.selected, function (d) {
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
        } else {
          $('#data .content').hide();
          $('#data .default').html('Select a file from the tree.').show();
        }
      });

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
