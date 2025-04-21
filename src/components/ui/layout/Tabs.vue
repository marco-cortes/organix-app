<template>
    <div class="tabs">
        <ul class="tabs__navigation">
            <li :class="['tab__item', active === index ?'tab__active' : '']" v-for="(tab, index) of tabs" @click="setTab(index)">
                {{ tab.label }}
            </li>
        </ul>
        <div class="tabs__content">
            <slot :name="`tab-${active}`" />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { PropType, ref } from 'vue';
    import { Tab } from '../../../models/ui/tabs/Tabs';

    defineProps({
        tabs: {
            type: Object as PropType<Tab[]>,
            required: true
        }
    })

    const active = ref(0);

    const setTab = (index: number) => {
        active.value = index;
    }
    

</script>

<style scoped>
    .tabs__navigation {
        margin: 1rem 0;
        background-color: #f0f0f0;
        display: flex;
        width: max-content;
        list-style: none;
        padding: 6px;
        gap: 6px;
        border-radius: 4px;
    }

    .tab__item {
        background-color: #F4F4F5;
        padding: 8px 15px;
        font-size: 0.78rem;
        font-weight: 600;
        color: var(--muted-color);
        cursor: pointer;
        border-radius: 4px;
    }

    .tab__active {
        background-color: white;
        color: var(--primary-color);
    }
</style>