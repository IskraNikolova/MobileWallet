<template>
  <q-page class="light-background q-pt-xl">
    <div class="row text-h4 q-pl-md" style>
      <div>{{ total }}</div>
      <q-btn flat size="md" label="Add" no-caps @click="$router.push('/create-wallet/' + usedCoin.abb )"/>
    </div>
    <div class="text-h8 q-pl-md">Total Balance</div>
    <div class="q-pa-sm q-pl-md text-center" v-for="(wallet, i) in viewWallets" v-bind:key="i">
      <q-card
        class="my-card text-white"
        @click="onViewWallet(wallet)"
      >
        <q-card-section>
          <div class="text-h6">
            {{Number(wallet.balance).toFixed(2)}} {{ usedCoin.abb }}
          </div>
          <div class="text-subtitle2">
            Balance
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none" :style="'color: ' + colors[color]">
          {{ wallet.address.substr(0, 10)}}...{{wallet.address.substr(29)}}
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import {
  mapGetters } from 'vuex'

// import { getBalance } from '../utils/commons'
import { SET_DETAILS_WALLET } from '../store/wallets/types'

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
    this.color = Math.floor(Math.random() * this.colors.length)

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
          let balance = 0 // await getBalance(wallet.address, this.usedCoin.abb)
          newTotal += Number(balance)
          return {
            address: wallet.address,
            balance,
            name: wallet.name
          }
        }))

      this.total = newTotal
    },
    onViewWallet (wallet) {
      this.$store.commit(SET_DETAILS_WALLET, { wallet })
      this.$router.push('/wallet')
    }
  },
  beforeDestroy () {
    clearInterval(this.interval)
  }
}
</script>

<style>
  .my-card {
    background: radial-gradient(circle, #9c9fa1 0%, #474c4f 100%);
    width: 320px;
    border-radius: 13%;
  }
</style>
