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

import { ensureScrollVerticalTo } from '../utils/scroll'

import CreateWalletForm from './../components/create-wallet-form'
import { CREATE_WALLET } from '../store/wallets/types'

export default {
  name: 'PageCreate',
  components: {
    CreateWalletForm
  },
  created () {
    if (!this.hasKey) this.$router.push('/pin')
  },
  data () {
    return {
      visibility: 0
    }
  },
  computed: {
    ...mapGetters([
      'coinByName',
      'hasKey'
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
    async onCreate ({ password, name }) {
      let res = await this.createWallet({
        password,
        name,
        coin: this.coinByName(this.$route.params.coin) })

      if (res) this.$router.push(`/wallets/${this.$route.params.coin}`)
      else this.$router.go(-1)
    }
  }
}
</script>
