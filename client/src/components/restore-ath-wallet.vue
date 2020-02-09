<template>
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
    <div>
      <q-input
        v-model="name"
        :label="constants._addWalletName"
        type="text"
      >
        <template v-if="name" v-slot:append>
          <q-icon name="cancel" @click.stop="name = null" class="cursor-pointer" />
        </template>
      </q-input>
      <q-input
          @input="val => { file = val[0] }"
          filled
          type="file"
      />
      <div class="row">
        <q-btn
          no-caps
          class="grey-button-2"
          @click="onRestoreFromKey"
        >
          <span id="send-button-text">{{constants._restoreWallet}}</span>
        </q-btn>
      </div>
    </div>
    <div>
      <q-input
        v-model="recoveryPhrase"
        :label="constants._mnemonicPhrase"
        type="textarea"
       :rules="[val => validatePhrase(val) || constants.fieldIsRequired]"
      />
      <q-input
        v-model="password"
        :label="constants._enterPass"
        type="password"
        >
        <template v-if="password" v-slot:append>
          <q-icon name="cancel" @click.stop="password = null" class="cursor-pointer" />
        </template>
      </q-input>
      <br />
      <q-input
        dense="false"
        v-model="repeatPassword"
        :label="constants._repeatPassword"
        type="password"
        :rules="[val => validatePasswordRepeat(val) || constants.passwordNotMatch]"
        >
        <template v-if="repeatPassword" v-slot:append>
          <q-icon name="cancel" @click.stop="repeatPassword = null" class="cursor-pointer" />
        </template>
      </q-input>
      <div class="row">
        <q-btn
          no-caps
          class="grey-button-2"
          :disabled="!isValid || !isValidPass"
          @click="onRestoreFromPhrase">
          <span id="send-button-text">{{constants._restoreWallet}}</span>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapActions,
  mapGetters } from 'vuex'

export default {
  name: 'RestoreWallet',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['constants'])
  },
  methods: {
    ...mapActions({
    }),
    onRestoreFromPhrase () {
    },
    onRestoreFromKey () {
    }
  }
}
</script>
