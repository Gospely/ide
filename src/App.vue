<template>

  <div id="app">
    <header>
      <div class="group photo-cover photo-2">
        <ui-toolbar
            type="default"
            text-color="black"
            brand="Gospel"
            title="Web可视化集成开发环境" 
            show-brand 
            :loading="isLoading" 
            preloader-top
            :hide-nav-icon="true"
            @nav-icon-clicked="setLoading"
        >
            <div slot="brand">
              <div class="ui-toolbar-title">
                <ui-icon-button
                    type="clear" color="black" icon="menu"
                    v-el:trigger-b
                ></ui-icon-button>
                <span style="top: 5px;;position: fixed;">Gospel</span>
              </div>
            </div>

            <div slot="actions">

                <ui-icon-button
                    type="clear" color="black" icon="mdi mdi-play" v-el:debug
                ></ui-icon-button>

                <ui-tooltip :trigger="$els.debug" content="启动调试"></ui-tooltip>

                <ui-icon-button
                    type="clear" color="black" icon="mdi mdi-cube-send" v-el:build
                ></ui-icon-button>

                <ui-tooltip :trigger="$els.build" content="构建"></ui-tooltip>

                <ui-icon-button
                    type="clear" color="black" icon="mdi mdi-onedrive" v-el:deploy
                ></ui-icon-button>

                <ui-tooltip :trigger="$els.deploy" content="部署"></ui-tooltip>

                <ui-icon-button
                    type="clear" color="black" icon="mdi mdi-view-dashboard" has-dropdown-menu :show-menu-secondary-text="true"
                    :menu-options="formMenu" :show-menu-icons="true" dropdown-position="bottom right" v-el:forms
                ></ui-icon-button>

                <ui-tooltip :trigger="$els.forms" content="窗口"></ui-tooltip>

                <ui-icon-button
                    type="clear" color="black" icon="more_vert" has-dropdown-menu
                    :menu-options="menu" dropdown-position="bottom right"
                ></ui-icon-button>
            </div>
        </ui-toolbar>
      </div>
      <ui-menu :options="mainMenuOptions" @option-selected="triggerMainMenuSelected" :trigger="$els.triggerB" show-icons show-secondary-text></ui-menu>
      <!-- <ui-button @click="setLoading()" color="primary">Google Material Design</ui-button> -->
      <section>

        <ui-modal
          :show.sync="modalShowingCtrl.newProjectModal" header="新建项目">
          <div slot="default">

            <ui-radio-group
                name="projectType"
                :options="projectTypeGroup" label="请选择项目类型" :value.sync="project.projectType" help-text="个人项目是免费的"
            ></ui-radio-group>

            <p></p>

            <ui-radio-group
                name="projectPlatform"
                :options="projectPlatformGroup" label="请选择项目平台" :value.sync="project.projectPlatform"
            ></ui-radio-group>

            <p></p>

            <ui-textbox
                label="项目名称" name="projectName" type="text" placeholder="请输入项目名称" :value.sync="project.projectName"
                validation-rules="required" :autocomplete="false"
                @keydown="projectNameChanged"
            ></ui-textbox>

          </div>
          <div slot="footer">
              <ui-button @click="modalShowingCtrl.newProjectModal = false">取消</ui-button>
              <ui-button color="primary" @click="confirmToCreateTheProject()" :disabled.sync="modalShowingCtrl.btnConfirmDisabled">新建</ui-button>
          </div>
        </ui-modal>

        <ui-confirm
            header="删除项目" type="danger" confirm-button-text="删除"
            confirm-button-icon="delete" deny-button-text="取消" @confirmed="deleteProjectConfirmed"
            @denied="deleteProjectDenied" :show.sync="confirmShowingCtrl.deleteProjectConfirm" close-on-confirm
        >
            你确认要删除此项目吗？（无法恢复）
        </ui-confirm>

        <ui-snackbar :show.sync="snckbarShowingCtrl.saveSucess" action="确认">保存成功</ui-snackbar>

      </section>
    </header>
    <section style="height:100%">
      <router-view></router-view>
    </section>
    <footer>
    </footer>
  </div>

</template>

<script>

export default {
  methods: {

    setLoading: function() {
      var btn = this.$els.triggerB;
    },

    triggerMainMenuSelected: function(selectedOption) {

      switch(selectedOption.id) {
        case 'new-project':
          this.modalShowingCtrl.newProjectModal = true;
          break;
        case 'save-project':
          this.snckbarShowingCtrl.saveSucess = true;
          break;
        case 'delete-project':
          this.confirmShowingCtrl.deleteProjectConfirm = true;
          break;
        default:
          break;
      }

    },

    confirmToCreateTheProject: function() {
      if(this.project.projectName != '') {
        this.modalShowingCtrl.newProjectModal = false;
      }
    },

    projectNameChanged: function() {
      if(this.project.projectName != '') {
        this.modalShowingCtrl.btnConfirmDisabled = false;
      }
    },

    deleteProjectConfirmed: function() {
      this.confirmShowingCtrl.deleteProjectConfirm = false;
    },

    deleteProjectDenied: function() {
      
    }
  },

  props: {
    isLoading: false
  },

  data() {
    return {

      menu: [{
          id: 'register',
          text: '注册'
      },{
          id: 'login',
          text: '登录'
      },{
        type: 'divider'
      },{
          id: 'settings',
          text: '设置'
      }, {
          id: 'about',
          text: '关于'
      }, {
          id: 'help',
          text: '帮助'
      }],

      mainMenuOptions: [{
          id: 'new-project',
          text: '新建项目',
          icon: 'edit',
          secondaryText: 'Ctrl+N'
      }, {
          id: 'save-project',
          text: '保存项目',
          icon: 'content_copy',
          secondaryText: 'Ctrl+S'
      },{
          type: 'divider'
      }, {
          id: 'delete-project',
          text: '删除项目 ',
          icon: 'delete',
          secondaryText: 'Del'
      }],

      formMenu: [{
        id: 'controls',
        text: '工具箱',
        icon: 'check'
      }, {
        id: 'attr',
        text: '属性',
        icon: 'check'
      }, {
        id: 'console',
        text: '终端',
        icon: 'check'
      }, {
        id: 'designer',
        text: '设计器',
        icon: 'check'
      }],

      modalShowingCtrl: {
        newProjectModal: false,
        btnConfirmDisabled: true
      },

      confirmShowingCtrl: {
        deleteProjectConfirm: false
      },

      snckbarShowingCtrl: {
        saveSucess: false
      },

      projectTypeGroup: [{
        value: 'personal',
        text: '个人项目'
      },{
        value: 'team',
        text: '团队项目'
      }],

      projectPlatformGroup: [{
        value: 'web',
        text: 'Web端'
      }, {
        value: 'WebApp',
        text: 'Web App'
      }, {
        value: 'HybirdApp',
        text: '混合App'
      }],

      project: {
        projectType: 'personal',
        projectPlatform: 'web',
        projectName: ''
      }
    }
  }
}

</script>

<style>

html {
  height: 100%;
}

body {
  height: 100%;
  margin: 0px;
  font-size: 12px!important;
}

.columns {
  height: 100%;
}

#app {
  color: #2c3e50;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  height: 100%;
}

#app a {
  color: #42b983;
  text-decoration: none;
}

.logo {
  width: 100px;
  height: 100px
}

.photo-cover {
  background-position: 50%;
  background-size: cover;
}

.ui-menu-item:not(.divider) {
  width: auto!important;
  max-width: 100%!important;
}

.sidebar {
  width: 272px;
  height: 100vh;
  -webkit-flex-shrink: 0;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  overflow-y: auto;
  position: fixed;
  background-color: #fff;
  box-shadow: 0 0 3px rgba(0,0,0,.35),0 2px 2px rgba(0,0,0,.2);
  z-index: 5;
}

.ui-collapsible-header .ui-icon {
  margin-top: -20px;
}

.toolbar {
  height: 100%;
}

.ui-modal-mask {
  z-index: 65535!important;
}

.ui-radio-input:checked ~ .ui-radio-inner-dot {
    margin-top: 2px;
    margin-left: 2px;
}

.ui-snackbar {
  z-index: 65535!important;
  transform: scale(1);
}

.ui-collapsible-header {
  font-size: 12px!important;
}

.ui-toolbar {
  height: 36px!important;
  font-size: 12px!important;
}

.ui-toolbar-title {
  line-height: 2;
}

.ui-toolbar .ui-icon-button {
    width: 33px!important;
    height: 33px!important;
}

.tooltip-element.ui-tooltip-theme {
    z-index: 65535!important;
}

.ui-toolbar-raised {
    box-shadow: 0 0 1px rgba(0,0,0,.1),0 1px 1px rgba(0,0,0,.1)!important;
}

.ui-collapsible-header {
  min-height: 30px!important;
}

.ui-collapsible {
    margin-bottom: 2px!important;
}

.ui-collapsible-body {
  padding: 0px!important;
  border: none!important;
}

.ui-form-container .form-title {
  height: 16px!important;
}

.ui-icon-button {
  width: 28px!important;
  height: 28px!important;
}

.form-title .ui-icon {
  font-size: 18px!important;
}

.ui-form-container .form-title h1 {
    height: 16px!important;
    line-height: 10px!important;
    margin: 0px;
}

.ui-tab-header-item {
  height: 30px!important;
  min-width: 40px!important;
}

.ui-menu-item:not(.divider) {
  font-size: 12px!important;
  padding-top: 0px!important;
  padding-bottom: 0px!important;
  height: 30px;
}

.ui-snackbar {
    padding: 2px 12px!important;
}

.ui-form-container .ui-tabs {
  margin-bottom: 0px!important;
}

.column {
  display: block;
  -ms-flex-preferred-size: 0;
      flex-basis: 0;
  -webkit-box-flex: 1;
      -ms-flex-positive: 1;
          flex-grow: 1;
  -ms-flex-negative: 1;
      flex-shrink: 1;
  padding: 10px;
}

.columns.is-mobile > .column.is-narrow {
  -webkit-box-flex: 0;
      -ms-flex: none;
          flex: none;
}

.columns.is-mobile > .column.is-full {
  -webkit-box-flex: 0;
      -ms-flex: none;
          flex: none;
  width: 100%;
}

.columns.is-mobile > .column.is-three-quarters {
  -webkit-box-flex: 0;
      -ms-flex: none;
          flex: none;
  width: 75%;
}

.columns.is-mobile > .column.is-two-thirds {
  -webkit-box-flex: 0;
      -ms-flex: none;
          flex: none;
  width: 66.6666%;
}

.columns.is-mobile > .column.is-half {
  -webkit-box-flex: 0;
      -ms-flex: none;
          flex: none;
  width: 50%;
}

.columns.is-mobile > .column.is-one-third {
  -webkit-box-flex: 0;
      -ms-flex: none;
          flex: none;
  width: 33.3333%;
}

.columns.is-mobile > .column.is-one-quarter {
  -webkit-box-flex: 0;
      -ms-flex: none;
          flex: none;
  width: 25%;
}

.columns.is-mobile > .column.is-offset-three-quarters {
  margin-left: 75%;
}

.columns.is-mobile > .column.is-offset-two-thirds {
  margin-left: 66.6666%;
}

.columns.is-mobile > .column.is-offset-half {
  margin-left: 50%;
}

.columns.is-mobile > .column.is-offset-one-third {
  margin-left: 33.3333%;
}

.columns.is-mobile > .column.is-offset-one-quarter {
  margin-left: 25%;
}

.columns.is-mobile > .column.is-1 {
  -webkit-box-flex: 0;
      -ms-flex: none;
          flex: none;
  width: 8.33333%;
}

.columns.is-mobile > .column.is-offset-1 {
  margin-left: 8.33333%;
}

.columns.is-mobile > .column.is-2 {
  -webkit-box-flex: 0;
      -ms-flex: none;
          flex: none;
  width: 16.66667%;
}

.columns.is-mobile > .column.is-offset-2 {
  margin-left: 16.66667%;
}

.columns.is-mobile > .column.is-3 {
  -webkit-box-flex: 0;
      -ms-flex: none;
          flex: none;
  width: 25%;
}

.columns.is-mobile > .column.is-offset-3 {
  margin-left: 25%;
}

.columns.is-mobile > .column.is-4 {
  -webkit-box-flex: 0;
      -ms-flex: none;
          flex: none;
  width: 33.33333%;
}

.columns.is-mobile > .column.is-offset-4 {
  margin-left: 33.33333%;
}

.columns.is-mobile > .column.is-5 {
  -webkit-box-flex: 0;
      -ms-flex: none;
          flex: none;
  width: 41.66667%;
}

.columns.is-mobile > .column.is-offset-5 {
  margin-left: 41.66667%;
}

.columns.is-mobile > .column.is-6 {
  -webkit-box-flex: 0;
      -ms-flex: none;
          flex: none;
  width: 50%;
}

.columns.is-mobile > .column.is-offset-6 {
  margin-left: 50%;
}

.columns.is-mobile > .column.is-7 {
  -webkit-box-flex: 0;
      -ms-flex: none;
          flex: none;
  width: 58.33333%;
}

.columns.is-mobile > .column.is-offset-7 {
  margin-left: 58.33333%;
}

.columns.is-mobile > .column.is-8 {
  -webkit-box-flex: 0;
      -ms-flex: none;
          flex: none;
  width: 66.66667%;
}

.columns.is-mobile > .column.is-offset-8 {
  margin-left: 66.66667%;
}

.columns.is-mobile > .column.is-9 {
  -webkit-box-flex: 0;
      -ms-flex: none;
          flex: none;
  width: 75%;
}

.columns.is-mobile > .column.is-offset-9 {
  margin-left: 75%;
}

.columns.is-mobile > .column.is-10 {
  -webkit-box-flex: 0;
      -ms-flex: none;
          flex: none;
  width: 83.33333%;
}

.columns.is-mobile > .column.is-offset-10 {
  margin-left: 83.33333%;
}

.columns.is-mobile > .column.is-11 {
  -webkit-box-flex: 0;
      -ms-flex: none;
          flex: none;
  width: 91.66667%;
}

.columns.is-mobile > .column.is-offset-11 {
  margin-left: 91.66667%;
}

.columns.is-mobile > .column.is-12 {
  -webkit-box-flex: 0;
      -ms-flex: none;
          flex: none;
  width: 100%;
}

.columns.is-mobile > .column.is-offset-12 {
  margin-left: 100%;
}

@media screen and (max-width: 768px) {
  .column.is-narrow-mobile {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
  }
  .column.is-full-mobile {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 100%;
  }
  .column.is-three-quarters-mobile {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 75%;
  }
  .column.is-two-thirds-mobile {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 66.6666%;
  }
  .column.is-half-mobile {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 50%;
  }
  .column.is-one-third-mobile {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 33.3333%;
  }
  .column.is-one-quarter-mobile {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 25%;
  }
  .column.is-offset-three-quarters-mobile {
    margin-left: 75%;
  }
  .column.is-offset-two-thirds-mobile {
    margin-left: 66.6666%;
  }
  .column.is-offset-half-mobile {
    margin-left: 50%;
  }
  .column.is-offset-one-third-mobile {
    margin-left: 33.3333%;
  }
  .column.is-offset-one-quarter-mobile {
    margin-left: 25%;
  }
  .column.is-1-mobile {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 8.33333%;
  }
  .column.is-offset-1-mobile {
    margin-left: 8.33333%;
  }
  .column.is-2-mobile {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 16.66667%;
  }
  .column.is-offset-2-mobile {
    margin-left: 16.66667%;
  }
  .column.is-3-mobile {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 25%;
  }
  .column.is-offset-3-mobile {
    margin-left: 25%;
  }
  .column.is-4-mobile {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 33.33333%;
  }
  .column.is-offset-4-mobile {
    margin-left: 33.33333%;
  }
  .column.is-5-mobile {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 41.66667%;
  }
  .column.is-offset-5-mobile {
    margin-left: 41.66667%;
  }
  .column.is-6-mobile {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 50%;
  }
  .column.is-offset-6-mobile {
    margin-left: 50%;
  }
  .column.is-7-mobile {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 58.33333%;
  }
  .column.is-offset-7-mobile {
    margin-left: 58.33333%;
  }
  .column.is-8-mobile {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 66.66667%;
  }
  .column.is-offset-8-mobile {
    margin-left: 66.66667%;
  }
  .column.is-9-mobile {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 75%;
  }
  .column.is-offset-9-mobile {
    margin-left: 75%;
  }
  .column.is-10-mobile {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 83.33333%;
  }
  .column.is-offset-10-mobile {
    margin-left: 83.33333%;
  }
  .column.is-11-mobile {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 91.66667%;
  }
  .column.is-offset-11-mobile {
    margin-left: 91.66667%;
  }
  .column.is-12-mobile {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 100%;
  }
  .column.is-offset-12-mobile {
    margin-left: 100%;
  }
}

@media screen and (min-width: 769px) {
  .column.is-narrow, .column.is-narrow-tablet {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
  }
  .column.is-full, .column.is-full-tablet {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 100%;
  }
  .column.is-three-quarters, .column.is-three-quarters-tablet {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 75%;
  }
  .column.is-two-thirds, .column.is-two-thirds-tablet {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 66.6666%;
  }
  .column.is-half, .column.is-half-tablet {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 50%;
  }
  .column.is-one-third, .column.is-one-third-tablet {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 33.3333%;
  }
  .column.is-one-quarter, .column.is-one-quarter-tablet {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 25%;
  }
  .column.is-offset-three-quarters, .column.is-offset-three-quarters-tablet {
    margin-left: 75%;
  }
  .column.is-offset-two-thirds, .column.is-offset-two-thirds-tablet {
    margin-left: 66.6666%;
  }
  .column.is-offset-half, .column.is-offset-half-tablet {
    margin-left: 50%;
  }
  .column.is-offset-one-third, .column.is-offset-one-third-tablet {
    margin-left: 33.3333%;
  }
  .column.is-offset-one-quarter, .column.is-offset-one-quarter-tablet {
    margin-left: 25%;
  }
  .column.is-1, .column.is-1-tablet {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 8.33333%;
  }
  .column.is-offset-1, .column.is-offset-1-tablet {
    margin-left: 8.33333%;
  }
  .column.is-2, .column.is-2-tablet {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 16.66667%;
  }
  .column.is-offset-2, .column.is-offset-2-tablet {
    margin-left: 16.66667%;
  }
  .column.is-3, .column.is-3-tablet {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 25%;
  }
  .column.is-offset-3, .column.is-offset-3-tablet {
    margin-left: 25%;
  }
  .column.is-4, .column.is-4-tablet {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 33.33333%;
  }
  .column.is-offset-4, .column.is-offset-4-tablet {
    margin-left: 33.33333%;
  }
  .column.is-5, .column.is-5-tablet {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 41.66667%;
  }
  .column.is-offset-5, .column.is-offset-5-tablet {
    margin-left: 41.66667%;
  }
  .column.is-6, .column.is-6-tablet {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 50%;
  }
  .column.is-offset-6, .column.is-offset-6-tablet {
    margin-left: 50%;
  }
  .column.is-7, .column.is-7-tablet {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 58.33333%;
  }
  .column.is-offset-7, .column.is-offset-7-tablet {
    margin-left: 58.33333%;
  }
  .column.is-8, .column.is-8-tablet {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 66.66667%;
  }
  .column.is-offset-8, .column.is-offset-8-tablet {
    margin-left: 66.66667%;
  }
  .column.is-9, .column.is-9-tablet {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 75%;
  }
  .column.is-offset-9, .column.is-offset-9-tablet {
    margin-left: 75%;
  }
  .column.is-10, .column.is-10-tablet {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 83.33333%;
  }
  .column.is-offset-10, .column.is-offset-10-tablet {
    margin-left: 83.33333%;
  }
  .column.is-11, .column.is-11-tablet {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 91.66667%;
  }
  .column.is-offset-11, .column.is-offset-11-tablet {
    margin-left: 91.66667%;
  }
  .column.is-12, .column.is-12-tablet {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 100%;
  }
  .column.is-offset-12, .column.is-offset-12-tablet {
    margin-left: 100%;
  }
}

@media screen and (min-width: 980px) {
  .column.is-narrow-desktop {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
  }
  .column.is-full-desktop {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 100%;
  }
  .column.is-three-quarters-desktop {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 75%;
  }
  .column.is-two-thirds-desktop {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 66.6666%;
  }
  .column.is-half-desktop {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 50%;
  }
  .column.is-one-third-desktop {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 33.3333%;
  }
  .column.is-one-quarter-desktop {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 25%;
  }
  .column.is-offset-three-quarters-desktop {
    margin-left: 75%;
  }
  .column.is-offset-two-thirds-desktop {
    margin-left: 66.6666%;
  }
  .column.is-offset-half-desktop {
    margin-left: 50%;
  }
  .column.is-offset-one-third-desktop {
    margin-left: 33.3333%;
  }
  .column.is-offset-one-quarter-desktop {
    margin-left: 25%;
  }
  .column.is-1-desktop {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 8.33333%;
  }
  .column.is-offset-1-desktop {
    margin-left: 8.33333%;
  }
  .column.is-2-desktop {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 16.66667%;
  }
  .column.is-offset-2-desktop {
    margin-left: 16.66667%;
  }
  .column.is-3-desktop {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 25%;
  }
  .column.is-offset-3-desktop {
    margin-left: 25%;
  }
  .column.is-4-desktop {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 33.33333%;
  }
  .column.is-offset-4-desktop {
    margin-left: 33.33333%;
  }
  .column.is-5-desktop {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 41.66667%;
  }
  .column.is-offset-5-desktop {
    margin-left: 41.66667%;
  }
  .column.is-6-desktop {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 50%;
  }
  .column.is-offset-6-desktop {
    margin-left: 50%;
  }
  .column.is-7-desktop {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 58.33333%;
  }
  .column.is-offset-7-desktop {
    margin-left: 58.33333%;
  }
  .column.is-8-desktop {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 66.66667%;
  }
  .column.is-offset-8-desktop {
    margin-left: 66.66667%;
  }
  .column.is-9-desktop {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 75%;
  }
  .column.is-offset-9-desktop {
    margin-left: 75%;
  }
  .column.is-10-desktop {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 83.33333%;
  }
  .column.is-offset-10-desktop {
    margin-left: 83.33333%;
  }
  .column.is-11-desktop {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 91.66667%;
  }
  .column.is-offset-11-desktop {
    margin-left: 91.66667%;
  }
  .column.is-12-desktop {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 100%;
  }
  .column.is-offset-12-desktop {
    margin-left: 100%;
  }
}

@media screen and (min-width: 1180px) {
  .column.is-narrow-widescreen {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
  }
  .column.is-full-widescreen {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 100%;
  }
  .column.is-three-quarters-widescreen {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 75%;
  }
  .column.is-two-thirds-widescreen {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 66.6666%;
  }
  .column.is-half-widescreen {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 50%;
  }
  .column.is-one-third-widescreen {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 33.3333%;
  }
  .column.is-one-quarter-widescreen {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 25%;
  }
  .column.is-offset-three-quarters-widescreen {
    margin-left: 75%;
  }
  .column.is-offset-two-thirds-widescreen {
    margin-left: 66.6666%;
  }
  .column.is-offset-half-widescreen {
    margin-left: 50%;
  }
  .column.is-offset-one-third-widescreen {
    margin-left: 33.3333%;
  }
  .column.is-offset-one-quarter-widescreen {
    margin-left: 25%;
  }
  .column.is-1-widescreen {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 8.33333%;
  }
  .column.is-offset-1-widescreen {
    margin-left: 8.33333%;
  }
  .column.is-2-widescreen {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 16.66667%;
  }
  .column.is-offset-2-widescreen {
    margin-left: 16.66667%;
  }
  .column.is-3-widescreen {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 25%;
  }
  .column.is-offset-3-widescreen {
    margin-left: 25%;
  }
  .column.is-4-widescreen {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 33.33333%;
  }
  .column.is-offset-4-widescreen {
    margin-left: 33.33333%;
  }
  .column.is-5-widescreen {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 41.66667%;
  }
  .column.is-offset-5-widescreen {
    margin-left: 41.66667%;
  }
  .column.is-6-widescreen {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 50%;
  }
  .column.is-offset-6-widescreen {
    margin-left: 50%;
  }
  .column.is-7-widescreen {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 58.33333%;
  }
  .column.is-offset-7-widescreen {
    margin-left: 58.33333%;
  }
  .column.is-8-widescreen {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 66.66667%;
  }
  .column.is-offset-8-widescreen {
    margin-left: 66.66667%;
  }
  .column.is-9-widescreen {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 75%;
  }
  .column.is-offset-9-widescreen {
    margin-left: 75%;
  }
  .column.is-10-widescreen {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 83.33333%;
  }
  .column.is-offset-10-widescreen {
    margin-left: 83.33333%;
  }
  .column.is-11-widescreen {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 91.66667%;
  }
  .column.is-offset-11-widescreen {
    margin-left: 91.66667%;
  }
  .column.is-12-widescreen {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 100%;
  }
  .column.is-offset-12-widescreen {
    margin-left: 100%;
  }
}

.columns {
  margin-left: -10px;
  margin-right: -10px;
  margin-top: -10px;
}

.columns:last-child {
  margin-bottom: -10px;
}

.columns:not(:last-child) {
  margin-bottom: 10px;
}

.columns.is-centered {
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
}

.columns.is-gapless {
  margin-left: 0;
  margin-right: 0;
  margin-top: 0;
}

.columns.is-gapless:last-child {
  margin-bottom: 0;
}

.columns.is-gapless:not(:last-child) {
  margin-bottom: 20px;
}

.columns.is-gapless > .column {
  margin: 0;
  padding: 0;
}

@media screen and (min-width: 769px) {
  .columns.is-grid {
    -ms-flex-wrap: wrap;
        flex-wrap: wrap;
  }
  .columns.is-grid > .column {
    max-width: 33.3333%;
    padding: 10px;
    width: 33.3333%;
  }
  .columns.is-grid > .column + .column {
    margin-left: 0;
  }
}

.columns.is-mobile {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.columns.is-multiline {
  -ms-flex-wrap: wrap;
      flex-wrap: wrap;
}

.columns.is-vcentered {
  -webkit-box-align: center;
      -ms-flex-align: center;
              -ms-grid-row-align: center;
          align-items: center;
}

@media screen and (min-width: 769px) {
  .columns:not(.is-desktop) {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
}

@media screen and (min-width: 980px) {
  .columns.is-desktop {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
}
</style>
