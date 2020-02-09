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
  created () {
    this.$store.dispatch(INIT_APP)
  }
}
</script>
