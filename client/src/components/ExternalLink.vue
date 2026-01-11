<template>
    <a
        data-testid="external-link"
        rel="noopener noreferrer"
        target="_blank"
        v-bind="$attrs"
    >
        <slot />
    </a>
</template>
