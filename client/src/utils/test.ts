import { mount, VueWrapper } from '@vue/test-utils';
import { DeepPartial } from 'ts-essentials';
import { merge } from 'lodash';
import { nextTick } from 'vue';
import { createPinia, setActivePinia } from 'pinia';

function getTestingSelector(id: string): string {
    return `[data-testid="${id}"]`;
}

function buildSetProps<PropsType extends Record<string, any>>(): (
    wrapper: VueWrapper,
    props: Partial<PropsType>,
) => Promise<void> {
    return (wrapper: VueWrapper, props: Partial<PropsType>) => wrapper.setProps(props);
}

function buildCreateWrapper<
    PropsType extends Record<string, any>,
    ComponentType extends Parameters<typeof mount>[0] = Parameters<typeof mount>[0],
>(
    component: ComponentType,
    defaultProps: undefined,
    options?: Parameters<typeof mount<ComponentType>>[1],
): (props: PropsType) => ReturnType<typeof mount<ComponentType>>;
function buildCreateWrapper<
    PropsType extends Record<string, any>,
    ComponentType extends Parameters<typeof mount>[0] = Parameters<typeof mount>[0],
>(
    component: ComponentType,
    defaultProps: PropsType,
    options?: Parameters<typeof mount<ComponentType>>[1],
): (props?: DeepPartial<PropsType>) => ReturnType<typeof mount<ComponentType>>;
function buildCreateWrapper<
    PropsType extends Record<string, any>,
    ComponentType extends Parameters<typeof mount>[0] = Parameters<typeof mount>[0],
>(
    component: ComponentType,
    defaultProps?: PropsType,
    options?: Parameters<typeof mount<ComponentType>>[1],
): (props?: DeepPartial<PropsType>) => ReturnType<typeof mount<ComponentType>> {
    return (props) =>
        mount(component, {
            ...options,
            props: merge({}, defaultProps, props) as never,
        });
}

async function emitComponentEvent(wrapper: VueWrapper, eventName: string): Promise<void> {
    wrapper.vm.$emit(eventName);
    await nextTick();
}

function initPinia(): void {
    setActivePinia(createPinia());
}

export { getTestingSelector, buildSetProps, buildCreateWrapper, emitComponentEvent, initPinia };
