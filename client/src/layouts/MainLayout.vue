<template>
  <div class="q-pa-md">
    <q-layout view="lHh Lpr lFf">
      <q-header bordered class="text-dark">
        <div class="row" style="margin-top:10px;margin-bottom:-23px;">
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
      <q-footer bordered class="bg-white text-primary">
        <q-tabs no-caps active-color="black" indicator-color="accent" class="text-grey">
          <q-route-tab to="/send"><img src="./../statics/send.png" style="width: 45px;"></q-route-tab>
          <q-separator vertical />
          <q-route-tab :to="'/wallets/' + usedCoin.abb"><img src="./../statics/wallets.png" style="width: 75px;"></q-route-tab>
          <q-separator vertical />
          <q-route-tab to="/receive"><img src="./../statics/receive.png" style="width: 58px;margin-top:-4px;"></q-route-tab>
        </q-tabs>
      </q-footer>
      <q-page-container v-touch-pan.horizontal.prevent.mouse="goBack">
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
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
    width:22%;
    height:54px;
    border-bottom: 1px solid #7F7F7F;
    border-radius:50%;
    left: 39%;
    margin-top:-8%;
    background-color: white;
    z-index: 1;
  }
  #logo {
    width:35vw;
    max-width:35px;
    margin-left: 35px;
  }
</style>
