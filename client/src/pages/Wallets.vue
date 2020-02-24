<template>
  <q-page class="flex flex-center light-background q-pt-xl">
    +   Total Balance: {{ total }} ATH
    <div class="q-pa-sm" v-for="(wallet, i) in viewWallets" v-bind:key="i">
      <q-card
        id="card"
        class="my-card text-white"
      >
        <q-card-section>
          <div class="text-h6" :style="'color: ' + colors[color]">
            {{ wallet.name }}
          </div>
          <div class="text-subtitle2">
            Balance: {{wallet.balance}} {{ usedCoin.abb }}
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          {{ wallet.address.substr(0, 10)}}...{{wallet.address.substr(18)}}
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import {
  mapGetters } from 'vuex'

import {
  getBalance } from '../utils/commons'

export default {
  name: 'PageWallets',
  components: {
  },
  computed: {
    ...mapGetters([
      'wallets',
      'usedCoin',
      'constants'
    ])
  },
  data () {
    return {
      color: 0,
      total: 0,
      colors: [
        '#c2fff3',
        '#97cdde',
        'pink',
        '#9debb2',
        '#ebdcfa'],
      interval: {},
      viewWallets: []
    }
  },
  async created () {
    this.color = Math.floor(Math.random() * 4)

    await this.getWalletsInfo()
    this.interval = setInterval(async () => {
      await this.getWalletsInfo()
    }, 500)
  },
  methods: {
    async getWalletsInfo () {
      let newTotal = 0
      this.viewWallets = await Promise.all(this.wallets[this.usedCoin.abb]
        .map(async (wallet) => {
          let balance = await getBalance(wallet.address, this.usedCoin.abb)
          newTotal += Number(balance)
          return {
            address: wallet.address,
            balance,
            name: wallet.name
          }
        }))

      this.total = newTotal
    }
  },
  beforeDestroy () {
    clearInterval(this.interval)
  }
}
</script>

<style>
  #card {
    background: radial-gradient(circle, #9c9fa1 0%, #474c4f 100%);
    width: 320px;
  }
</style>
