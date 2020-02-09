<template>
  <div>
    AVA methods
  </div>
</template>

<script>
import {
  mapActions,
  mapGetters } from 'vuex'

export default {
  name: 'RestoreAvaWallet',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['constants'])
  },
  methods: {
    ...mapActions({
    })
  }
}
</script>
