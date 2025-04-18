<template>
    <div :class="['list__item', cssActive, cssHover]">
        <Icon class="list__img" :src="icon"></Icon>
        <span class="list__text">{{ text }}</span>
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue';
    import Icon from './Icon.vue';

    const props = defineProps({
        text: {
            type: String,
            required: true
        },
        icon: {
            type: String,
        },
        active: {
            type: Boolean,
            default: false
        },
        hover: {
            type: Boolean,
            default: true
        }
    })
    const cssActive = computed(() => props.active ? 'active' : '')
    const cssHover = computed(() => props.hover ? 'hover' : '')
</script>

<style scoped>
    .list__item {
        display: flex;
        align-items: center;
        padding: 5px 20px;
        gap: 10px;
        border-radius: 7px;
    }
    .list__img {
        height: 20px;
        color: white;
    }

    .list__text {
        font-size: 0.9rem;
    }

    .active, .active * {
        background-color: var(--primary-color);
        color: white;
    }

    .hover {
        cursor: pointer;
    }

    .active:hover, .active:hover * {
        background-color: var(--secondary-color);
    }
</style>