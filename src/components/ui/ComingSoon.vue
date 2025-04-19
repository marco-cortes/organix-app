<template>
    <div class="coming-soon__container text__center">
        <Card class="coming-soon__card">
            <h1 class="text__title font__bold"> {{ title }} {{ $t('ui_coming_soon') }}</h1>
            <p class="text__light">{{ $t('ui_coming_soon_text') }}</p>
            <img class="coming-soon__img mt" :src="coming__soon" alt="coming__soon">
        </Card>
    </div>
</template>

<script setup lang="ts">
    import coming__soon from "../../assets/images/ui/coming__soon.svg";
    import Card from "./Card.vue";

    import { defineProps } from "vue";
    
    defineProps({
        title: {
            type: String,
            required: true
        }
    })
</script>

<style scoped>
    .coming-soon__container {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .coming-soon__card {
        max-width: 900px;
    }

    .coming-soon__img {
        width: 500px;
    }
</style>