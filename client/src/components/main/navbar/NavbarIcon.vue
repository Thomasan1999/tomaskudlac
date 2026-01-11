<script lang="ts" setup>
    import { computed } from 'vue';
    import useStore from '@/store';
    import { NavbarIconMode, NavbarIconProps } from '@/components/main/navbar/types';
    import NavbarIconLine from '@/components/main/navbar/NavbarIconLine.vue';

    defineProps<NavbarIconProps>();
    const emit = defineEmits<{ (event: 'click'): void }>();

    const store = useStore();

    const onClick = () => {
        emit('click');
    };

    const locales = computed(() => store.locales.navbar);
</script>

<template>
    <div
        data-testid="navbar-icon"
        class="relative z-3 flex h-full w-14 cursor-pointer items-center justify-center pr-4 pl-4"
        :title="mode === NavbarIconMode.BARS ? locales.show : locales.hide"
        @click="onClick"
    >
        <div class="relative h-6 w-full">
            <NavbarIconLine
                :class="mode === NavbarIconMode.CROSS ? '-rotate-45' : 'top-0'"
                :mode="mode"
            />
            <NavbarIconLine
                :class="mode === NavbarIconMode.CROSS ? '-rotate-45' : 'top-[calc(50%-1.5px)]'"
                :mode="mode"
            />
            <NavbarIconLine
                :class="mode === NavbarIconMode.CROSS ? 'rotate-45' : 'top-[calc(100%-3px)]'"
                :mode="mode"
            />
        </div>
    </div>
</template>
