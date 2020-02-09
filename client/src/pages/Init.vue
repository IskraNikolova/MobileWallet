<template>
  <q-page class="flex flex-center light-background">
    <img
      src="~assets/ava-black.png"
      style="width:200vw;max-width:250px;"
    >
    <div>
      <q-btn
        no-caps
        style="margin-bottom: 11px;"
        size="1.1rem"
        class="red-pink-button full-width"
        text-color="white"
        @click="submit"
        :label="constants._createWallet"
      />
      <q-btn
        no-caps
        size="1.1rem"
        class="purple-blue-button full-width"
        text-color="white"
        @click="submit"
        :label="constants._restoreWallet"
      />
    </div>

    <wallets-menu @click="init" ref="wm"/>
  </q-page>
</template>

<script>
import {
  mapGetters,
  mapActions } from 'vuex'

import { SET_ACTION } from './../store/app/types'

import WalletsMenu from './../components/wallets-мenu'

export default {
  name: 'PageInit',
  components: {
    WalletsMenu
  },
  computed: {
    ...mapGetters([
      'constants',
      'action',
      'coinByName'
    ])
  },
  methods: {
    ...mapActions({
      setAction: SET_ACTION
    }),
    submit (e) {
      this.setAction({ action: e.target.innerText })
    },
    init (coin) {
      this.$refs.wm.close()
      this.$router.push(`/${this.action}-wallet/${coin.name}`)
    }
  }
}
</script>
