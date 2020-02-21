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
          <q-icon name="dehaze" size="sm" style="color: #9A9A9A;"/>
        </div>
      </div>
      <!--<img src="./../statics/line.png" style="width: 100%;margin-top: -23px;">-->
      <div id="curve"></div>
    </q-header>
    <q-footer elevated class="bg-white text-primary">
      <q-tabs no-caps active-color="black" indicator-color="accent" class="text-grey">
        <q-route-tab to="/send"><img src="./../statics/send.png" style="width: 45px;"></q-route-tab>
        <q-route-tab :to="'/wallets/' + usedCoin.abb"><img src="./../statics/wallets.png" style="width: 75px;"></q-route-tab>
        <q-route-tab to="/receive"><img src="./../statics/receive.png" style="width: 58px;margin-top:-4px;"></q-route-tab>
      </q-tabs>
    </q-footer>
    <q-page-container v-touch-pan.horizontal.prevent.mouse="goBack" class="q-pt-md">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
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
      leftDrawerOpen: false
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
</style>
