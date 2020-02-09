<template>
  <q-dialog
    v-model="ui.restoreWallet.ath.isOpen"
    transition-show="flip-down"
    transition-hide="flip-up">
    <q-card class="bg-primary" style="width: 700px; max-width: 80vw;">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">
          {{ constants._restoreWallet }}
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div>
          <q-btn
            no-caps
            style="margin-bottom: 11px;"
            size="1.1rem"
            class="outline-button full-width"
            outline
            @click="submit"
            label="import via mnemonic"
          />
          <q-btn
            no-caps
            size="1.1rem"
            class="outline-button full-width"
            outline
            @click="submit"
            label="import keystore"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import {
  mapGetters } from 'vuex'

import { CLOSE_RESTORE_WALLET } from './../store/ui/types'

export default {
  name: 'RestoreAthWallet',
  computed: {
    ...mapGetters(['ui', 'constants'])
  },
  methods: {
    onClick () {
      this.$emit('click')
    },
    close () {
      this.$store.dispatch(
        CLOSE_RESTORE_WALLET,
        { abb: this.ui.restoreWallet.ath.abb }
      )
    }
  }
}
</script>
