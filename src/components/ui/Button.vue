<template>
    <button :class="['base__button', cssClass, buttonType]" @click="clicked">
        <slot />
    </button>
</template>

<script setup lang="ts">
    const emit = defineEmits(['click'])
    
    defineProps({
        text: {
            type: String,
            default: "Click me!"    
        },
        cssClass: {
            type: String,
            default: ""
        },
        buttonType: {
            type: String,
            default: "default"
        }
    });

    const clicked = (event: MouseEvent) => {
        emit("click", event);
        console.log("click")
    }
    
</script>

<style>
    .base__button {
        padding: 2px 15px;
        margin: 3px;
        font-size: 1rem;
        font-weight: 500;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        transition: background-color 0.2s ease-in-out;
        background-color: var(--primary-color);
        border: 1px solid var(--primary-color);
        color: var(--background-color);
    }
    
    .base__button:hover {
        background-color: var(--secondary-color);
        border-color: var(--secondary-color);
    }
    
    .outline {
        color: var(--primary-color);
        background-color: var(--background-color);
    }

    .outline:hover {
        color: var(--primary-color);
        background-color: var(--light-color);
        border-color: var(--primary-color);
    }
</style>