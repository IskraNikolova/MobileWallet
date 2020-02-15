<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import {
  INIT_APP
} from './store/app/types'

export default {
  name: 'App',
  async created () {
    await this.$store.dispatch(INIT_APP)
  }
}
</script>
