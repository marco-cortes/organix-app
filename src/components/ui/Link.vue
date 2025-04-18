<template>
    <router-link :to="to">
        <Item :active="isActive" class="link__item" :text="text" :icon="icon"></Item>
    </router-link>
</template>

<script setup lang="ts">
    import { computed } from 'vue';
    import { useRoute } from 'vue-router';

    import Item from './Item.vue';

    const route = useRoute();

    const props = defineProps({
        to: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            required: true
        },
    })

    const isActive = computed(() => props.to === route.path);
</script>

<style scoped>
    .link__item {
        margin: 15px;
    }
</style>