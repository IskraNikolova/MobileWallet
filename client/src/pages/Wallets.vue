<template>
  <q-page class="flex flex-center light-background">
    <div class="q-pa-md" v-for="(wallet, i) in walletsWithBalance" v-bind:key="i">
      <q-card
        class="my-card text-white"
        style='background: radial-gradient(circle, #9c9fa1 0%, #474c4f 100%);width: 320px;'
      >
        <q-card-section>
          <div class="text-h6" :style="'color: ' + colors[color]">{{ wallet.name }}</div>
          <div class="text-subtitle2">Balance: {{wallet.balance}} {{ usedCoin.abb }}</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          {{ wallet.address.substr(0, 10)}}...{{wallet.address.substr(18)}}
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

import { getBalance } from '../utils/commons'

export default {
  name: 'PageWallets',
  components: {
  },
  computed: {
    ...mapGetters([
      'constants',
      'wallets',
      'usedCoin'
    ])
  },
  data () {
    return {
      color: 0,
      colors: ['#c2fff3', '#97cdde', 'pink', '#9debb2', '#ebdcfa'],
      walletsWithBalance: [],
      interval: {}
    }
  },
  async created () {
    this.color = Math.floor(Math.random() * 4)
    this.walletsWithBalance = await Promise.all(this.wallets[this.usedCoin.abb]
      .map(async (wallet) => {
        let balance = await getBalance(wallet.address, this.usedCoin.abb)

        return {
          address: wallet.address,
          balance,
          name: wallet.name
        }
      }))
    this.interval = setInterval(async () => {
      this.getWalletsInfo()
    }, 500)
  },
  methods: {
    async getWalletsInfo () {
      this.walletsWithBalance = await Promise.all(this.walletsWithBalance
        .map(async (wallet) => {
          wallet.balance = await getBalance(wallet.address, this.usedCoin.abb)
          return wallet
        }))
    }
  },
  beforeDestroy () {
    clearInterval(this.interval)
  }
}
</script>
