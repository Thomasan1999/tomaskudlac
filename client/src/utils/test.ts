import { ComponentMountingOptions, mount, VueWrapper } from '@vue/test-utils';
import { DeepPartial } from 'ts-essentials';
import { merge } from 'lodash';
import { nextTick } from 'vue';
import { createPinia, setActivePinia } from 'pinia';
import { CreateWrapperBuiltComponent } from '@/utils/types';

function getTestingSelector(id: string): string {
    return `[data-testid="${id}"]`;
}

function buildCreateWrapper<ComponentType>(
    component: ComponentType,
): (options?: ComponentMountingOptions<ComponentType>) => CreateWrapperBuiltComponent<ComponentType>;
function buildCreateWrapper<ComponentType>(
    component: ComponentType,
): (
    props: Parameters<ReturnType<typeof mount<ComponentType>>['setProps']>[0],
    options?: ComponentMountingOptions<ComponentType>,
) => CreateWrapperBuiltComponent<ComponentType>;
function buildCreateWrapper<
    ComponentType,
    OptionsType extends ComponentMountingOptions<ComponentType> = ComponentMountingOptions<ComponentType>,
>(
    component: ComponentType,
    defaultProps?: undefined,
    defaultOptions?: OptionsType,
): (options?: ComponentMountingOptions<ComponentType>) => CreateWrapperBuiltComponent<ComponentType>;
function buildCreateWrapper<
    ComponentType,
    OptionsType extends ComponentMountingOptions<ComponentType> = ComponentMountingOptions<ComponentType>,
>(
    component: ComponentType,
    defaultProps?: undefined,
    defaultOptions?: OptionsType,
): (
    props: DeepPartial<Parameters<ReturnType<typeof mount<ComponentType>>['setProps']>[0]>,
    options?: ComponentMountingOptions<ComponentType>,
) => CreateWrapperBuiltComponent<ComponentType>;
function buildCreateWrapper<
    ComponentType,
    PropsType extends Parameters<ReturnType<typeof mount<ComponentType>>['setProps']>[0],
    OptionsType extends ComponentMountingOptions<ComponentType> = ComponentMountingOptions<ComponentType>,
>(
    component: ComponentType,
    defaultProps: PropsType,
    defaultOptions?: OptionsType,
): (
    props?: DeepPartial<Parameters<ReturnType<typeof mount<ComponentType>>['setProps']>[0]>,
    options?: ComponentMountingOptions<ComponentType>,
) => CreateWrapperBuiltComponent<ComponentType>;
function buildCreateWrapper<
    ComponentType,
    PropsType extends Parameters<ReturnType<typeof mount<ComponentType>>['setProps']>[0],
    OptionsType extends ComponentMountingOptions<ComponentType> = ComponentMountingOptions<ComponentType>,
>(
    component: ComponentType,
    defaultProps?: PropsType,
    defaultOptions?: OptionsType,
): (
    props?: DeepPartial<Parameters<ReturnType<typeof mount<ComponentType>>['setProps']>[0]>,
    options?: ComponentMountingOptions<ComponentType>,
) => CreateWrapperBuiltComponent<ComponentType> {
    return (props, options) =>
        mount(component, merge({}, defaultOptions, options, { props: { ...defaultProps, ...(props ?? {}) } } as never));
}

async function emitComponentEvent(wrapper: VueWrapper, eventName: string): Promise<void> {
    wrapper.vm.$emit(eventName);
    await nextTick();
}

function initPinia(): void {
    setActivePinia(createPinia());
}

export { getTestingSelector, buildCreateWrapper, emitComponentEvent, initPinia };
