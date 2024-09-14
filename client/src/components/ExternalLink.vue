<script lang="ts" setup></script>

<template>
    <a
        class="external-link"
        rel="noopener noreferrer"
        target="_blank"
        v-bind="$attrs"
    >
        <slot />
    </a>
</template>
