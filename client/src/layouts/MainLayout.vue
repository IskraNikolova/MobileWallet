<template>
  <q-layout view="lHh Lpr lFf">
    <q-header bordered class="text-dark">
      <div class="row" style="margin: 2%;">
        <div class="col-2"></div>
        <div class="col-7" style="z-index: 2;margin-bottom: -44px;">
          <q-tabs no-caps indicator-color="transparent">
              <q-route-tab
                to="/"
                exact
              >
              <img
                id="logo"
                src="./../statics/coins/ath-pink.png">
              </q-route-tab>
            </q-tabs>
        </div>
        <div class="col-3" style="text-align: right;">
          <q-icon name="dehaze" size="sm" style="color: #9A9A9A;"/>
        </div>
      </div>
      <div id="curve"></div>
    </q-header>
    <q-footer bordered class="bg-white text-primary">
      <q-tabs no-caps active-color="black" indicator-color="transparent" class="text-grey">
        <q-route-tab label="Send" to="/send"/>
        <q-separator vertical />
        <q-route-tab label="Wallets" :to="'/wallets/' + coin"/>
        <q-separator vertical />
        <q-route-tab label="Receive" to="/receive"/>
      </q-tabs>
    </q-footer>
    <q-page-container v-touch-pan.horizontal.prevent.mouse="goBack">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',

  data () {
    return {
      leftDrawerOpen: false,
      coin: 'ATH'
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
    height:100px;
    border-bottom:1px solid grey;
    border-radius:50%;
    left: 35%;
    margin-top:-14%;
    background-color: white;
    z-index: 1;
  }
  #logo {
    width:50vw;
    max-width:50px;
    margin-left: 35px;
  }
</style>
