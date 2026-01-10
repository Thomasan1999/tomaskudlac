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
        <div class="grid w-full max-lg:grid-cols-1 lg:grid-cols-2">
            <Project
                v-for="project in projects"
                :name="project"
            />
        </div>
    </MainSection>
</template>
