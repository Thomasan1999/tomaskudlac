import { mount } from '@vue/test-utils';

export type CreateWrapperBuiltComponent<ComponentType> = ReturnType<typeof mount<ComponentType>>;

export type ComponentPropsWithModelValue<PropsType, ModelValueType> = PropsType & { modelValue: ModelValueType };
