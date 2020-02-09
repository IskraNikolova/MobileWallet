<template>
  <q-form
    @submit="onSubmit"
    class="q-gutter-md"
  >
    <q-input
      filled
      v-model="name"
      :label="constants._addWalletName"
      lazy-rules
      @focus="onFocus"
    >
      <template v-if="name" v-slot:append>
        <q-icon
          name="cancel"
          @click.stop="name = null"
          class="cursor-pointer"
        />
      </template>
    </q-input>

    <q-input
      filled
      type="password"
      v-model="password"
      :label="constants._enterPass"
      @focus="onFocus"
      lazy-rules
      :rules="[
        val => val !== null && val !== '' || constants._typeYPass,
        val => isValid(val) || constants._passwordNotValid
      ]"
    >
      <template v-if="password" v-slot:append>
        <q-icon
          name="cancel"
          @click.stop="password = null"
          class="cursor-pointer"
        />
      </template>
    </q-input>

    <q-input
      filled
      v-model="repeatPassword"
      :label="constants._repeatPassword"
      type="password"
      @focus="onFocus"
      lazy-rules
      :rules="[val => isRepeat(val) || constants._passwordNotMatch]"
      >
      <template v-if="repeatPassword" v-slot:append>
        <q-icon
          name="cancel"
          @click.stop="repeatPassword = null"
          class="cursor-pointer"
        />
      </template>
    </q-input>
    <div>
      <q-btn
       no-caps
       size="1.2rem"
       class="red-pink-button full-width"
       text-color="white"
       :label="constants._submit"
       type="submit"
      />
    </div>
  </q-form>
</template>

<script>
import {
  mapActions,
  mapGetters } from 'vuex'

import { notify } from './../modules/notify'
import { validatePassFormat } from './../utils/commons'

import { CREATE_WALLET } from '../store/wallets/types'

export default {
  name: 'CreateWalletForm',
  data () {
    return {
      name: '',
      password: '',
      repeatPassword: ''
    }
  },
  computed: {
    ...mapGetters(['constants'])
  },
  methods: {
    ...mapActions({
      createWallet: CREATE_WALLET
    }),
    isValid (pass) {
      return validatePassFormat({ password: pass })
    },
    isRepeat (pass) {
      return this.password === pass
    },
    onFocus () {
      this.$emit('focus')
    },
    onSubmit () {
      this.createWallet({
        password: this.password,
        name: this.name
      })
        .then((res) => {
          this.phrase = res
        }).catch((err) => {
          notify.createError('notify-error', err.message)
        })
    }
  }
}
</script>
