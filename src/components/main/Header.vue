<template>
    <header class="header__app">
        <div class="header__logo">
            <img class="header__img" :src="logo" alt="organix_logo">
            <h1 class="header__title">{{ $t('project_name') }} {{ $t('header') }}</h1>
        </div>
        <div class="header__options">
            <Button button-type="outline"> {{ $t('header_help') }} </Button>
            <Button> {{ $t('header_settings') }} </Button>
        </div>
    </header>
</template>

<script setup lang="ts">
    import logo from "../../assets/icons/logo.svg";
    import Button from '../ui/Button.vue';
</script>

<style scoped>
    .header__app {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        height: var(--header-height);
        border-bottom: 1px solid var(--light-color);
    }

    .header__logo {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.8rem;
    }

    .header__img {
        color: var(--primary-color);
    }

    .header__title {
        color: var(--primary-color);
        font-size: 1.1rem;
    }

</style>