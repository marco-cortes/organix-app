<template>
    <nav class="sidebar__app">
        <Link v-for="r in routes" :to="r.path" :text="r.name" :icon="r.name"></Link>
    </nav>
</template>

<script setup lang="ts">
    import { routes } from "../../router";
    import Link from "../ui/Link.vue";
</script>

<style scoped>
    .sidebar__app {
        width: var(--sidebar-width);
        height: calc(100vh - var(--header-height) - 1px);
        border-right: 1px solid var(--light-color);
    }
</style>