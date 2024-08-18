import {mount, MountingOptions, VueWrapper} from '@vue/test-utils';
import HomeTextProgrammingLanguage from '@/components/main/home/HomeTextProgrammingLanguage.vue';

describe('HomeTextProgrammingLanguage', () =>
{
    function createHomeTextProgrammingLanguageWrapper(props: MountingOptions<any>['props'] = {}): VueWrapper
    {
        const defaultProps = {
            programmingLanguage: ''
        };

        return mount(HomeTextProgrammingLanguage, {
            props: {
                ...defaultProps,
                ...props
            }
        });
    }

    it('shows whole programming language', async () =>
    {
        let programmingLanguage = 'n HTML';

        const wrapper = createHomeTextProgrammingLanguageWrapper({programmingLanguage});

        // use 'textContent' instead of 'text' to include spaces
        expect(wrapper.element.textContent).toBe(programmingLanguage);

        programmingLanguage = 'PostgreSQL';

        await wrapper.setProps({programmingLanguage});

        expect(wrapper.element.textContent).toBe(programmingLanguage);
    });
});
