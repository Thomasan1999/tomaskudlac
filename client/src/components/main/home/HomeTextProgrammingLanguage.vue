<template lang="pug">
span.home-programming-language-an-prefix {{anPrefix}}
span.home-programming-language-base {{base}}
</template>

<script lang="ts">
import {computed} from 'vue';

export default {
    name: 'HomeTextProgrammingLanguage',
    props: {
        programmingLanguage: {
            required: true,
            type: String
        }
    },
    setup(props)
    {
        const anPrefix = computed(() =>
        {
            const programmingLanguage = props.programmingLanguage;

            const textHasAnPrefix = programmingLanguage.match(/^n$|^n /);

            return textHasAnPrefix ? props.programmingLanguage[0] : '';
        });

        const base = computed(() => (
            anPrefix.value.length ? props.programmingLanguage.slice(1) : props.programmingLanguage
        ));

        return {
            anPrefix,
            base
        };
    }
};
</script>

<style lang="scss" scoped>
.home-programming-language-base
{
    font-weight: 700;
}
</style>
