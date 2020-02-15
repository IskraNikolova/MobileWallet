<template>
  <q-page padding class="q-layout-page page-container" >
    <div style="padding: 8px;padding-top: 42px;">
      CREATE <img
        :src="'./../statics/coins/' + coinByName($route.params.coin).logo"
        style="max-width:100px;max-height:100px;"
      >
      <div style="padding-top: 42px;">
        <create-wallet-form @focus="scroll" @click="onCreate"/>
      </div>
    </div>
  </q-page>
</template>

<script>
import {
  mapGetters,
  mapActions } from 'vuex'

// import { notify } from './../modules/notify'

import { ensureScrollVerticalTo } from '../utils/scroll'

import CreateWalletForm from './../components/create-wallet-form'
import { CREATE_WALLET } from '../store/wallets/types'

export default {
  name: 'PageCreate',
  components: {
    CreateWalletForm
  },
  created () {
    // if (!this.hasWallets) this.$router.push('/pin')
  },
  data () {
    return {
      visibility: 0
    }
  },
  computed: {
    ...mapGetters([
      'coinByName',
      'hasWallets'
    ])
  },
  methods: {
    ...mapActions({
      createWallet: CREATE_WALLET
    }),
    scroll () {
      this.visibility = ensureScrollVerticalTo({
        yCoordinate: document.body.scrollHeight,
        retryCount: 0
      })
    },
    onCreate ({ password, name }) {
      this.createWallet({
        password,
        name,
        coin: this.coinByName(this.$route.params.coin) })
    }
  }
}
</script>
