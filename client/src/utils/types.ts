import { mount } from '@vue/test-utils';

export type CreateWrapperComponent = Parameters<typeof mount>[0];

export type CreateWrapperBuiltComponent<ComponentType extends CreateWrapperComponent> = ReturnType<
    typeof mount<ComponentType>
>;

export type ComponentPropsWithModelValue<PropsType, ModelValueType> = PropsType & { modelValue: ModelValueType };
