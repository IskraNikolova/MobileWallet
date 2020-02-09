<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="text-dark">
      <q-toolbar>
        <q-toolbar-title>
          <img
            src="~assets/ava-outline-black.png"
            style="width:50vw;max-width:50px;"
          >
        </q-toolbar-title>
        <div>
          <q-icon name="dehaze" size="sm"/>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container v-touch-pan.horizontal.prevent.mouse="goBack">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',

  data () {
    return {
      leftDrawerOpen: false
    }
  },
  methods: {
    goBack ({ evt, ...info }) {
      if (info.direction === 'right') {
        this.$router.go(-1)
      }
    }
  }
}
</script>
