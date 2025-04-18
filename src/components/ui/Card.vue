<template>
    <div class="card">
        <div class="card__body">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
    .card {
        width: 100%;
        min-height: 100px;
        border: 1px solid var(--light-color);
        border-radius: 7px;
    }
    .card__body {
        padding: 1rem;
    }
</style>