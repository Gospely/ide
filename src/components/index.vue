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
                <div v-bind:id="fileTreeSelector" class="tree-cls"></div>

                <ui-confirm
                    header="删除文件" type="danger" confirm-button-text="删除"
                    confirm-button-icon="delete" deny-button-text="取消" @confirmed="deleteFileConfirmed"
                    @denied="deleteFileDenied" :show.sync="deleteFileConfirm" close-on-confirm
                >
                    你确认要删除此文件吗？（无法恢复）
                </ui-confirm>

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

      fileTreeSelector: 'file-tree',

      apiBase: 'http://api.gospely.com/',

      deleteFileConfirm: false,

      fileToRemove: {
        e: {},
        data: {}
      }
    }
  },

  ready() {

    this.$nextTick(() => {

      // $Model.FSService.ls().then( (res) => {

      //   var response = res.data,
      //       fileTree = response.data;

      //   if(response.code == 200) {


      //   }else {
      //     util.alert(response.message);
      //   }

      // }).catch( (error) => {
      //   util.alert('文件树请求失败');
      // });
//
      this.$get('initFileTree')(); 

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

    deleteFileConfirmed: function() {
      this.removeFile(this.fileToRemove.e, this.fileToRemove.data);
    },

    deleteFileDenied: function() {

    },

    removeFile: function(e, data) {

      var parent = data.node.parents.length > 2 ? data.node.parent : '',
          self = this;

      $.post(self.apiBase + 'fs/rmdir', { 'dirName' : parent + '/' + data.node.text })
      .fail(function () {
        data.instance.refresh();
        util.alert('删除文件夹失败');
      }).done(function (d) {
        data.instance.set_id(data.node, d.id);
      });

      this.deleteFileConfirm = true;
    },

    initFileTree: function() {

      var self = this;

      $('#' + this.fileTreeSelector)
        .jstree({
          'core' : {
            'data' : {
              'url' : self.apiBase + 'fs/list/optional/',
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
            'default' : { 'icon' : 'folder', 'text': 'new_folder'},
            'file' : { 'valid_children' : [], 'icon' : 'file', 'text': 'untitled' }
          },
          'unique' : {
            'duplicate' : function (name, counter) {
              return name + ' ' + counter;
            }
          },
          'plugins' : ['state','dnd','sort','types','contextmenu','unique']
        })
        .on('delete_node.jstree', function (e, data) {
          self.deleteFileConfirm = true;
          self.fileToRemove.e = e;
          self.fileToRemove.data = data;
        })
        .on('create_node.jstree', function (e, data) {
          var type = data.node.type;
          var parent = data.node.parents.length > 2 ? data.node.parent : '';

          var typeObj = {

            default: function() {

              $.post(self.apiBase + 'fs/mkdir/', {
                dirName: parent + '/' + data.node.text
              })
              .done(function (d) {
                data.instance.set_id(data.node, d.id);
              })
              .fail(function () {
                data.instance.refresh();
                util.alert('创建文件夹失败');
              });
            },

            file: function() {
              $.post(self.apiBase + 'fs/write', { 'fileName' : parent + '/' + data.node.text })
              .done(function (d) {
                data.instance.set_id(data.node, d.id);
              })
              .fail(function () {
                data.instance.refresh();
                util.alert('创建文件失败');
              });
            }

          }
          typeObj[type]();
        })
        .on('rename_node.jstree', function (e, data) {
          $.post(self.apiBase + 'fs/rename', {
              fileName: data.node.id,
              newFileName: data.node.original.folder + data.text
            })
            .done(function (d) {
              data.instance.set_id(data.node, d.fields.id);
            })
            .fail(function () {
              data.instance.refresh();
              util.alert('重命名文件失败');
            });
        })
        .on('move_node.jstree', function (e, data) {
          $.post(self.apiBase + 'fs/move', { 'fileName' : data.node.id, 'newFileName' : data.parent, 'move': true })
            .done(function (d) {
              //data.instance.load_node(data.parent);
              data.instance.refresh();
            })
            .fail(function () {
              data.instance.refresh();
              util.alert('移动文件失败');
            });
        })
        .on('copy_node.jstree', function (e, data) {
          console.log(e, data);
          $.post(self.apiBase + 'fs/copy', { 'file' : data.original.id, 'newFile' : data.parent })
            .done(function (d) {
              //data.instance.load_node(data.parent);
              data.instance.refresh();
            })
            .fail(function () {
              data.instance.refresh();
              util.alert('复制文件失败');
            });
        })
        .on('changed.jstree', function (e, data) {
          if(data && data.selected && data.selected.length) {
            $.get(self.apiBase + 'fs/list/optional/' + data.selected, function (d) {
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

  #data { margin-left:320px; }
  #data textarea { margin:0; padding:0; height:100%; width:100%; border:0; background:white; display:block; line-height:18px; resize:none; }
  #data, #code { font: normal normal normal 12px/18px 'Consolas', monospace !important; }

  .tree-cls .folder { background:url(../assets/file_sprite.png) right bottom no-repeat; }
  .tree-cls .file { background:url(../assets/file_sprite.png) 0 0 no-repeat; }
  .tree-cls .file-pdf { background-position: -32px 0 }
  .tree-cls .file-as { background-position: -36px 0 }
  .tree-cls .file-c { background-position: -72px -0px }
  .tree-cls .file-iso { background-position: -108px -0px }
  .tree-cls .file-htm, .tree-cls .file-html, .tree-cls .file-xml, .tree-cls .file-xsl { background-position: -126px -0px }
  .tree-cls .file-cf { background-position: -162px -0px }
  .tree-cls .file-cpp { background-position: -216px -0px }
  .tree-cls .file-cs { background-position: -236px -0px }
  .tree-cls .file-sql { background-position: -272px -0px }
  .tree-cls .file-xls, .tree-cls .file-xlsx { background-position: -362px -0px }
  .tree-cls .file-h { background-position: -488px -0px }
  .tree-cls .file-crt, .tree-cls .file-pem, .tree-cls .file-cer { background-position: -452px -18px }
  .tree-cls .file-php { background-position: -108px -18px }
  .tree-cls .file-jpg, .tree-cls .file-jpeg, .tree-cls .file-png, .tree-cls .file-gif, .tree-cls .file-bmp { background-position: -126px -18px }
  .tree-cls .file-ppt, .tree-cls .file-pptx { background-position: -144px -18px }
  .tree-cls .file-rb { background-position: -180px -18px }
  .tree-cls .file-text, .tree-cls .file-txt, .tree-cls .file-md, .tree-cls .file-log, .tree-cls .file-htaccess { background-position: -254px -18px }
  .tree-cls .file-doc, .tree-cls .file-docx { background-position: -362px -18px }
  .tree-cls .file-zip, .tree-cls .file-gz, .tree-cls .file-tar, .tree-cls .file-rar { background-position: -416px -18px }
  .tree-cls .file-js { background-position: -434px -18px }
  .tree-cls .file-css { background-position: -144px -0px }
  .tree-cls .file-fla { background-position: -398px -0px }

</style>
