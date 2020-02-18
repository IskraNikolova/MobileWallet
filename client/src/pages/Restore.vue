<template>
  <q-page padding class="q-layout-page page-container" >
    <div style="padding: 8px;padding-top: 42px;">
      <img
        :src="'./../statics/coins/' + coinByName($route.params.coin).logo"
        style="max-width:100px;max-height:100px;"
      >
      <restore-ava-wallet v-if="abb === 'AVA'"/>
      <restore-ath-wallet v-else-if="abb === 'ATH'"/>
    </div>
  </q-page>
</template>

<script>
import {
  mapGetters } from 'vuex'

import RestoreAvaWallet from './../components/restore-ava-wallet'
import RestoreAthWallet from './../components/restore-ath-wallet'

export default {
  name: 'PageRestore',
  components: {
    RestoreAvaWallet,
    RestoreAthWallet
  },
  created () {
    // if (!this.hasWallets) this.$router.push('/pin')

    this.abb = this.coinByName(this.$route.params.coin)
  },
  data () {
    return {
      abb: ''
    }
  },
  computed: {
    ...mapGetters([
      'coinByName',
      'hasWallets'
    ])
  }
}
</script>
