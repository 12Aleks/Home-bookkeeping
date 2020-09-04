<template>
<div id="app">
    <component :is="layout">
        <router-view />
    </component>
</div>
</template>

<script>
import EmptyLayout from '@/layouts/EmptyLayout'
import MainLayout from '@/layouts/MainLayout'
import TestLayout from '@/layouts/TestLayout'

export default {
    name: 'App',
    computed: {
        layout() {
            console.log(this.$route.meta.layout + '-layout')
            return (this.$route.meta.layout || 'empty') + '-layout'
        }
    },
    components: {
        EmptyLayout,
        MainLayout,
        TestLayout
    }
}
</script>

<style lang="scss">
@import '~materialize-css/dist/css/materialize.min.css';
@import 'assets/styles/index.css';
</style>
