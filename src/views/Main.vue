<template>
    <Header></Header>
    <section class="main">
        <Sidebar></Sidebar>
        <Content></Content>
    </section>
    <Footer></Footer>
</template>

<script setup lang="ts">
    import Header from "../components/main/Header.vue";
    import Footer from "../components/main/Footer.vue";
    import Sidebar from "../components/main/Sidebar.vue";
    import Content from "../components/main/Content.vue";
</script>

<style scoped>
    .main {
        display: flex;
        justify-content: space-between;
    }
</style>