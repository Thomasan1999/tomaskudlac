import { ComponentMountingOptions, mount, VueWrapper } from '@vue/test-utils';
import { DeepPartial } from 'ts-essentials';
import { merge } from 'lodash';
import { nextTick } from 'vue';
import { createPinia, setActivePinia } from 'pinia';
import { CreateWrapperBuiltComponent } from '@/utils/types';

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
    PropsType extends undefined,
    ComponentType extends Parameters<typeof mount>[0] = Parameters<typeof mount>[0],
    OptionsType extends ComponentMountingOptions<ComponentType> = ComponentMountingOptions<ComponentType>,
>(component: ComponentType): (options?: OptionsType) => CreateWrapperBuiltComponent<ComponentType>;
function buildCreateWrapper<
    PropsType extends Record<string, any>,
    ComponentType extends Parameters<typeof mount>[0] = Parameters<typeof mount>[0],
    OptionsType extends ComponentMountingOptions<ComponentType> = ComponentMountingOptions<ComponentType>,
>(component: ComponentType): (props: PropsType, options?: OptionsType) => CreateWrapperBuiltComponent<ComponentType>;
function buildCreateWrapper<
    PropsType extends undefined,
    ComponentType extends Parameters<typeof mount>[0] = Parameters<typeof mount>[0],
    OptionsType extends ComponentMountingOptions<ComponentType> = ComponentMountingOptions<ComponentType>,
>(
    component: ComponentType,
    defaultProps?: undefined,
    defaultOptions?: OptionsType,
): (options?: OptionsType) => CreateWrapperBuiltComponent<ComponentType>;
function buildCreateWrapper<
    PropsType extends Record<string, any>,
    ComponentType extends Parameters<typeof mount>[0] = Parameters<typeof mount>[0],
    OptionsType extends ComponentMountingOptions<ComponentType> = ComponentMountingOptions<ComponentType>,
>(
    component: ComponentType,
    defaultProps?: undefined,
    defaultOptions?: OptionsType,
): (props: PropsType, options?: OptionsType) => CreateWrapperBuiltComponent<ComponentType>;
function buildCreateWrapper<
    PropsType extends Record<string, any>,
    ComponentType extends Parameters<typeof mount>[0] = Parameters<typeof mount>[0],
    OptionsType extends ComponentMountingOptions<ComponentType> = ComponentMountingOptions<ComponentType>,
>(
    component: ComponentType,
    defaultProps: PropsType,
    defaultOptions?: OptionsType,
): (props?: DeepPartial<PropsType>, options?: OptionsType) => CreateWrapperBuiltComponent<ComponentType>;
function buildCreateWrapper<
    PropsType extends Record<string, any> | undefined = undefined,
    ComponentType extends Parameters<typeof mount>[0] = Parameters<typeof mount>[0],
    OptionsType extends ComponentMountingOptions<ComponentType> = ComponentMountingOptions<ComponentType>,
>(
    component: ComponentType,
    defaultProps?: PropsType,
    defaultOptions?: OptionsType,
): (props?: DeepPartial<PropsType>, options?: OptionsType) => CreateWrapperBuiltComponent<ComponentType> {
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

export { getTestingSelector, buildSetProps, buildCreateWrapper, emitComponentEvent, initPinia };
