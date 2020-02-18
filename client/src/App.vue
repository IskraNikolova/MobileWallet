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
    window.StatusBar.styleDefault()
    window.document.addEventListener('deviceready', onDeviceReady, false)

    function onDeviceReady () {
      window.NavigationBar.hide()
    }
    await this.$store.dispatch(INIT_APP)
  }
}
</script>
