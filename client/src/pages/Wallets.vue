<template>
  <q-page class="flex flex-center light-background">
    <img
    :src="'./../statics/coins/' + coinByName($route.params.coin).logo"
    style="max-width:100px;max-height:100px;"
    >
    {{ wallets }}
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PageWallets',
  components: {
  },
  computed: {
    ...mapGetters([
      'constants',
      'coinByName',
      'wallets'
    ])
  },
  created () {
  },
  methods: {
  }
}
</script>
