<template>
  <q-page class="light-background q-pt-xl">
    {{wallet}}
  </q-page>
</template>

<script>
import {
  mapGetters } from 'vuex'

export default {
  name: 'PageWallet',
  components: {
  },
  computed: {
    ...mapGetters([
      'wallet',
      'usedCoin',
      'constants'
    ])
  },
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style>
</style>
