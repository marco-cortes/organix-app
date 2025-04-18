<template>
    <i class="icon" v-if="src" 
        v-html="styledSvg">
    </i>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';


    const props = defineProps({
        src: {
            type: String,
        },
        width: {
            type: [String, Number],
            default: '17px'
        },
        height: {
            type: [String, Number],
            default: '17px'
        },
    })

    const svgContent = ref<string>("")

    const buildIcon = (src: string) => src.toLowerCase().replace(' ', '_')
    

    watchEffect(async () => {
        if (!props.src) return

        try {
            const svgPath = await import(`../../assets/icons/${buildIcon(props.src)}.svg`);
            const response = await fetch(svgPath.default)
            const text = await response.text()
            svgContent.value = text
        } catch (err) {
            console.error('Failed to load SVG:', err)
            svgContent.value = '<!-- Error loading SVG -->'
        }
    })

    const styledSvg = computed(() => {
        if (!svgContent.value) return '';

        let svg = svgContent.value;

        const svgTagMatch = svg.match(/<svg[^>]*>/);
        if (!svgTagMatch) return svg;

        let svgTag = svgTagMatch[0];
        svgTag = setAttr(svgTag, 'width', typeof props.width === 'number' ? `${props.width}px` : props.width);
        svgTag = setAttr(svgTag, 'height', typeof props.height === 'number' ? `${props.height}px` : props.height);
        svg = svg.replace(/<svg[^>]*>/, svgTag);
        return svg
    })

    const setAttr = (tag: string, attr: string, value: string) => {
        const regex = new RegExp(`${attr}="[^"]*"`);
        if (regex.test(tag)) {
            return tag.replace(regex, `${attr}="${value}"`);
        } else {
            return tag.replace('<svg', `<svg ${attr}="${value}"`);
        }
    }

</script>

<style scoped>

</style>