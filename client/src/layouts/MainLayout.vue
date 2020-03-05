<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="text-dark q-pt-sm">
      <div class="row">
        <div class="col-2"></div>
        <div class="col-7">
          <q-tabs no-caps indicator-color="transparent" style="z-index:2;">
              <q-route-tab
                to="/"
                exact
              >
              <img
                id="logo"
                :src="'./../statics/coins/' + usedCoin.logo">
              </q-route-tab>
          </q-tabs>
        </div>
        <div class="col-3" style="text-align: right;padding-right:10px;">
          <q-btn flat style="color: #9A9A9A;" icon="dehaze">
            <q-menu fit anchor="bottom left" self="top left" content-class="my-class">
              <q-list dense style="min-width: 180px;padding:10px;">
                <q-item clickable v-close-popup style="padding: 12px;">
                  <q-item-section side>
                     <img src="./../statics/coins2.png" style="width: 25px;height:25px;">
                  </q-item-section>
                  <q-item-section>Assets</q-item-section>
                </q-item>
                <q-item clickable v-close-popup style="padding: 12px;">
                  <q-item-section side>
                    <img src="./../statics/settings.png" style="width: 20px;height:20px;">
                  </q-item-section>
                  <q-item-section>Settings</q-item-section>
                </q-item>
                <q-item clickable v-close-popup style="padding: 12px;">
                  <q-item-section side>
                    <img src="./../statics/help.png" style="width: 20px;height:20px;">
                  </q-item-section>
                  <q-item-section>Help</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </div>
      <div id="curve"></div>
    </q-header>
      <q-drawer
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="500"
        bordered
        side="right"
      >
        <q-scroll-area class="fit">
          <q-list v-for="(menuItem, index) in menuList" :key="index">

            <q-item clickable :active="menuItem.label === 'Outbox'" v-ripple>
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>

           <q-separator v-if="menuItem.separator" />

          </q-list>
        </q-scroll-area>
      </q-drawer>
    <q-footer elevated class="bg-white text-primary">
      <q-tabs no-caps active-color="black" indicator-color="accent" class="text-grey">
        <q-route-tab to="/send"><img src="./../statics/send512.png" style="width: 25px;">Send</q-route-tab>
        <q-route-tab :to="'/wallets/' + usedCoin.abb"><img src="./../statics/wallet2.png" style="width: 25px;">Wallets</q-route-tab>
        <q-route-tab to="/receive"><img src="./../statics/receive512.png" style="width: 25px;">Receive</q-route-tab>
      </q-tabs>
    </q-footer>
    <q-page-container v-touch-pan.horizontal.prevent.mouse="goBack" class="q-pt-md">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
const menuList = [
  {
    icon: 'inbox',
    label: 'Inbox',
    separator: true
  },
  {
    icon: 'send',
    label: 'Outbox',
    separator: false
  },
  {
    icon: 'delete',
    label: 'Trash',
    separator: false
  },
  {
    icon: 'error',
    label: 'Spam',
    separator: true
  },
  {
    icon: 'settings',
    label: 'Settings',
    separator: false
  },
  {
    icon: 'feedback',
    label: 'Send Feedback',
    separator: false
  },
  {
    icon: 'help',
    iconColor: 'primary',
    label: 'Help',
    separator: false
  }
]
import {
  mapGetters } from 'vuex'

export default {
  name: 'MainLayout',
  computed: {
    ...mapGetters([
      'usedCoin'
    ])
  },
  data () {
    return {
      drawer: false,
      menuList
    }
  },
  methods: {
    goBack ({ evt, ...info }) {
      if (info.direction === 'right') {
        this.$router.go(-1)
      }
    }
  }
}
</script>
<style>
  #curve{
    margin:0 auto;
    position:absolute;
    width:30%;
    height:54px;
    border-radius:50%;
    left: 35%;
    margin-top:-11%;
    background-color: white;
    z-index: 1;
    -webkit-box-shadow: -1px 17px 16px -14px rgba(135,125,135,1);
    -moz-box-shadow: -1px 17px 16px -14px rgba(135,125,135,1);
    box-shadow: -1px 17px 16px -14px rgba(135,125,135,1);
  }
  #logo {
    width:35vw;
    max-width:35px;
    margin-left: 35px;
  }
  .my-class {
    border-radius:12%;
  }
</style>
