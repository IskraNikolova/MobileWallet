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

import { SET_ACTION } from './../store/ui/types'
import { SET_USED_COIN } from './../store/app/types'

import WalletsMenu from './../components/wallets-мenu'

export default {
  name: 'PageInit',
  components: {
    WalletsMenu
  },
  computed: {
    ...mapGetters([
      'constants',
      'ui',
      'wallets'
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
      this.$store.commit(SET_USED_COIN, { coin })
      this.$router.push(`/${this.ui.action}-wallet/${coin.abb}`)
    }
  }
}
</script>
