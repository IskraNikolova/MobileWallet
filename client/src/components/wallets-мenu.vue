<template>
  <q-dialog
    v-model="ui.choiceWalletMenu.isOpen"
    transition-show="flip-down"
    transition-hide="flip-up">
    <q-card class="bg-primary" style="width: 700px; max-width: 80vw;">
      <q-card-section>
        <div class="text-h6">
          {{ constants._wallet }}
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-list v-for="coin in coins" v-bind:key="coin.name">
          <q-separator />
          <q-item
            clickable
            v-ripple
            @click.native="onClick(coin)"
          >
            <q-item-section thumbnail>
              <img
                :src="'./../statics/coins/' + coin.logo"
                style="max-width:350px;max-height:150px;"
              >
            </q-item-section>
            <q-item-section>
              {{ coin.abb }}
            </q-item-section>
          </q-item>
      </q-list>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import {
  mapGetters,
  mapActions } from 'vuex'

import { CLOSE_CHOICE_WALLET } from './../store/ui/types'

export default {
  name: 'WalletsMenu',
  computed: {
    ...mapGetters([
      'ui',
      'constants',
      'coins'
    ])
  },
  methods: {
    ...mapActions({
      close: CLOSE_CHOICE_WALLET
    }),
    onClick (coin) {
      this.$emit('click', coin)
    }
  }
}
</script>
