<template>
    <div :style="gridStyle">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

    
    const props = defineProps({
        cols: {
            type: Number,
            default: 1
        },
        type: {
            type: String,
            default: "row"
        },
        gap: {
            type: String,
            default: "0rem"
        }
    })

    const gridStyle = computed(() => ({
        display: 'grid',
        gridTemplateColumns: `repeat(${props.cols}, 1fr)`,
        gap: props.gap,
        // width: '100%',
        justifyItems: 'center'
    }));

</script>

<style scoped>

</style>