<template lang="pug">
a.external-link(
    rel="noopener noreferrer"
    target="_blank"
    v-bind="$attrs"
)
    slot
</template>

<script lang="ts">
export default {
    name: 'ExternalLink'
};
</script>
