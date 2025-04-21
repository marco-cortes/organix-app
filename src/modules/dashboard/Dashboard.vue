<template>
    <h1 class="text__title">{{ $t('dashboard_welcome') }}</h1>
    <p class="text__gray font__light">{{ $t('dashboard_text') }}</p>
    <Grid :cols="4" gap="1rem" class="mt">
        <Card>
            <div class="resume__container">
                <h2 class="text__sm font__semibold">{{ $t('dashboard_card_employees') }}</h2>
                <Icon src="employees" width="15px" class="text__light"></Icon>
            </div>
            <p class="text__primary text__title font__bold">42</p>
            <p class="text__light text__mn">+4 from last month</p>
        </Card>
        <Card>
            <div class="resume__container">
                <h2 class="text__sm font__semibold">{{ $t('dashboard_card_attendance') }}</h2>
                <Icon src="attendance" width="15px" class="text__light"></Icon>
            </div>
            <p class="text__primary text__title font__bold">96.3%</p>
            <p class="text__light text__mn">+2.1% from last month</p>
        </Card>
        <Card>
            <div class="resume__container">
                <h2 class="text__sm font__semibold">{{ $t('dashboard_card_leaves') }}</h2>
                <Icon src="calendar" width="15px" class="text__light"></Icon>
            </div>
            <p class="text__primary text__title font__bold">8</p>
            <p class="text__light text__mn">Requires approval</p>
        </Card>
        <Card>
            <div class="resume__container">
                <h2 class="text__sm font__semibold">{{ $t('dashboard_card_hires') }}</h2>
                <Icon src="new_employee" width="15px" class="text__light"></Icon>
            </div>
            <p class="text__primary text__title font__bold">4</p>
            <p class="text__light text__mn">This month</p>
        </Card>
    </Grid>
    <Tabs :tabs="tabs">
        <template #tab-0>
            <h2>Employees</h2>
            <p>Here’s your employee directory.</p>
            <Table></Table>
        </template>

        <template #tab-1>
            <h2>Recent Activity</h2>
            <p>Recent logins, changes, and more...</p>
        </template>
    </Tabs>
</template>

<script setup lang="ts">
    import Card from '../../components/ui/Card.vue';
    import Icon from '../../components/ui/Icon.vue';
    import Grid from '../../components/ui/layout/Grid.vue';
    import Tabs from "../../components/ui/layout/Tabs.vue";
    import Table from '../../components/ui/Table.vue';
    import { Tab } from '../../models/ui/tabs/Tabs';

    const tabs: Tab[] = [
        { label: 'Employees', title: 'Employee Directory' },
        { label: 'Recent Activity', title: 'Recent Activity' },
        { label: 'Hires', title: 'New Hires' }
    ]
</script>

<style scoped>
    .resume__container {
        display: flex;
        justify-content: space-between;
    }
</style>