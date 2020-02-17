<template>
  <q-page class="flex-center">
    <div>{{ constants._welcome }}</div>
    <br/>
    <div style="margin-top: 5%;">
      <div v-for="row in 4" class="row justify-center" :key="row">
        <div v-for="col in 3" class="col-auto" :key="col">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <q-btn
            size="xl"
            flat
            v-if="row !== 4"
            @click="handleClick((row-1) * 3 + col)"
            outline
            class="pin-button-color"
            style="margin-bottom: 20%;"
          >
            {{ (row-1) * 3 + col }}
          </q-btn>
          <q-btn
            flat
            size="xl"
            v-if="row === 4 && col === 2"
            @click="handleClick(0)"
            outline
            class="pin-button-color"
          >
            0
          </q-btn>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import { SET_KEY, VALIDATE_KEY } from './../store/app/types'
const { notify } = require('./../modules/notify')

export default {
  name: 'PagePin',
  data () {
    return {
      key: '',
      index: 0
    }
  },
  computed: {
    ...mapGetters(['constants', 'hasWallets'])
  },
  methods: {
    ...mapActions({
      setKey: SET_KEY,
      validateKey: VALIDATE_KEY
    }),
    async onConfirmClick () {
      if (!this.hasWallets) {
        await this.setKey({ key: this.key })
        this.$router.go(-1)
        console.log(0)
      } else {
        console.log(1)
        let isCorrect = await this.validateKey({ key: this.key })
        if (isCorrect) {
          this.$router.go(-1)
        } else {
          notify.createError(
            'notify-error',
            this.constants._wrongPin
          )
          this.index = 0
          this.key = ''
        }
      }
    },
    async handleClick (digit) {
      this.key += digit
      this.index++
      if (this.index === 4) {
        await this.onConfirmClick()
      }
    }
  }
}
</script>
