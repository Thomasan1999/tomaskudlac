<script lang="ts" setup>
    import MainSection from '@/components/main/MainSection.vue';
    import Project from '@/components/main/projects/Project.vue';

    const projects = ['fifaManiaci', 'simonQ', 'villaRomaine', 'havranPub'];
</script>

<template>
    <MainSection
        data-testid="projects"
        class="pt-main-row-gap"
        heading
        name="projects"
    >
        <div class="project-container">
            <Project
                v-for="project in projects"
                :name="project"
            />
        </div>
    </MainSection>
</template>

<style lang="scss" scoped>
    .project-container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        width: 100%;

        @media (max-width: 1023px) {
            grid-template-columns: 1fr;
        }
    }
</style>
