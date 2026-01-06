<script setup lang="ts">
    import { computed, h, useSlots, type VNodeChild } from 'vue';
    import { LocalesTextParserNode, LocalesTextParserNodeType } from '@/components/locales-text-parser/types';

    const { tag, text } = defineProps<{
        tag: string;
        text: string;
    }>();
    const slots = useSlots();

    const splitTextToNodes = (
        srcText: string,
        splitRegex: RegExp,
        matchNodeType: LocalesTextParserNodeType,
    ): LocalesTextParserNode[] => {
        const matches = [...srcText.matchAll(splitRegex)];
        let lastMatchEndIndex = 0;
        const out: LocalesTextParserNode[] = [];

        matches.forEach(({ index: matchStartIndex, 0: match, 1: expression }) => {
            const matchEndIndex = matchStartIndex + match.length;

            const textBeforeMatch = matchStartIndex > lastMatchEndIndex;
            if (textBeforeMatch) {
                const nonMatchedText = srcText.slice(lastMatchEndIndex, matchStartIndex);

                if (nonMatchedText) {
                    out.push({ type: LocalesTextParserNodeType.TEXT, text: nonMatchedText });
                }
            }

            out.push({ type: matchNodeType, text: expression });
            lastMatchEndIndex = matchEndIndex;
        });

        const textAfterMatchesExists = lastMatchEndIndex < srcText.length;
        if (textAfterMatchesExists) {
            const textAfterMatches = srcText.slice(lastMatchEndIndex);

            if (textAfterMatches) {
                out.push({ type: LocalesTextParserNodeType.TEXT, text: textAfterMatches });
            }
        }

        return out;
    };

    const splitTextToNodesByStrongMarkers = (): LocalesTextParserNode[] => {
        return splitTextToNodes(text, /\*([\s\S]+?)\*/g, LocalesTextParserNodeType.STRONG).map((node) => ({
            ...node,
            children: splitTextToNodesByPlaceholders(node.text),
        }));
    };

    const splitTextToNodesByPlaceholders = (srcText: string): LocalesTextParserNode[] => {
        return splitTextToNodes(srcText, /\{\{([\s\S]+?)}}/g, LocalesTextParserNodeType.SLOT);
    };

    const convertToVNodes = (nodes: LocalesTextParserNode[] = []): VNodeChild[] =>
        nodes.flatMap((node) => {
            switch (node.type) {
                case LocalesTextParserNodeType.SLOT:
                    return slots[node.text]?.();
                case LocalesTextParserNodeType.STRONG:
                    return h('strong', null, convertToVNodes(node.children));
                case LocalesTextParserNodeType.TEXT:
                    return node.children ? convertToVNodes(node.children) : node.text;
            }
        });

    const Content = computed(() => {
        return h(tag, null, convertToVNodes(splitTextToNodesByStrongMarkers()));
    });
</script>

<template>
    <Content />
</template>
