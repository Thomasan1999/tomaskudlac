<template lang="pug">
section.main-section(:id="id" :class="{background}" ref="root")
    div.text-content
        h2.main-section-name(v-if="heading") {{title}}
    slot
</template>

<script lang="ts">
import {computed, ref} from 'vue';
import mainSections from '@/components/main/mainSections';

export default {
    name: 'MainSection',
    props: {
        background: {
            default: false,
            type: Boolean
        },
        heading: {
            default: false,
            type: Boolean
        },
        name: {
            required: true,
            type: String
        }
    },
    setup(props)
    {
        const root = ref<HTMLDivElement | null>(null);

        const activeSection = computed(() => mainSections[props.name]);

        const id = computed(() => activeSection.value.id);

        const title = computed(() => activeSection.value.title);

        return {
            id,
            root,
            title
        };
    }
};
</script>

<style lang="scss" scoped>
.main-section
{
    align-items: center;
    display: flex;
    flex-direction: column;
    row-gap: var(--main-row-gap);
    z-index: 1;
}

.main-section-name
{
    font-size: var(--main-section-name-font-size)
}
</style>
