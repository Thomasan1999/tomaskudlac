<template lang="pug">
div.about-myself-column
    h3.about-myself-column-title(data-testid="title") {{title}}
    p.about-myself-column-text(data-testid="text" v-html="text")
</template>

<script lang="ts">
import {computed} from 'vue';
import useStore from '@/store';

export default {
    name: 'AboutMyselfColumn',
    props: {
        title: {
            required: true,
            type: String
        },
        text: {
            required: true,
            type: String
        }
    },
    setup(props)
    {
        const store = useStore();

        const text = computed(() =>
            props.text
                .replace(/\*[^*]+\*/g, (text) =>
                    `<strong>${text.slice(1, -1)}</strong>`)
                .replace(/{{age}}/, store.age)
                .replace(/{{programmingLanguages}}/, store.programmingLanguagesString)
        );

        return {
            text
        };
    }
};
</script>

<style lang="scss" scoped>
.about-myself-column
{
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 25px;
    max-width: 420px;
}

.about-myself-column-title
{
    font-size: 30px;
    font-weight: 700;
}
</style>
