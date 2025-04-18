<template>
    <section class="app">
        <router-view></router-view>
    </section>
</template>

<script setup lang="ts">
    

</script>

<style scoped>
    .app {
        width: calc(100vw - var(--sidebar-width));
        padding: 1rem;
    }
</style>