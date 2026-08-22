import { createContactFormFields, resetContactFormFields } from '@/components/main/contact/form/contactFormFields';
import { ContactFormFieldData } from '@/components/main/contact/form/types';

function getField(fields: ContactFormFieldData[], name: string): ContactFormFieldData {
    return fields.find((field) => field.name === name)!;
}

describe('contactFormFields', () => {
    describe('createContactFormFields()', () => {
        it('starts every field empty and untouched', () => {
            createContactFormFields().forEach((field) => {
                expect(field.value, field.name).toBe('');
                expect(field.touched, field.name).toBe(false);
            });
        });

        // An empty optional field is valid; an empty required one is not.
        it.each([
            ['name', true],
            ['email', false],
            ['phone', true],
            ['message', false],
        ])('starts %s with valid=%s', (name, valid) => {
            expect(getField(createContactFormFields(), name as string).valid).toBe(valid);
        });

        /**
         * The fields used to be a module-level `reactive([])`, so two forms shared one set of values and whatever
         * was typed outlived the component.
         */
        it('hands out an independent set each time', () => {
            const first = createContactFormFields();
            const second = createContactFormFields();

            getField(first, 'email').value = 'typed@example.com';

            expect(getField(second, 'email').value).toBe('');
        });
    });

    describe('resetContactFormFields()', () => {
        it('returns the fields to their initial state without replacing the array', () => {
            const fields = createContactFormFields();
            const emailField = getField(fields, 'email');

            emailField.value = 'typed@example.com';
            emailField.touched = true;
            emailField.valid = true;

            resetContactFormFields(fields);

            expect(emailField.value).toBe('');
            expect(emailField.touched).toBe(false);
            expect(emailField.valid).toBe(false);
            expect(getField(fields, 'email')).toBe(emailField);
        });
    });

    describe('patterns', () => {
        function expectMatches(name: string, cases: [string, boolean][]): void {
            const { pattern } = getField(createContactFormFields(), name);

            cases.forEach(([value, matches]) => {
                expect(Boolean(value.match(pattern!)), `${name}: ${JSON.stringify(value)}`).toBe(matches);
            });
        }

        it('accepts names with diacritics but not punctuation', () => {
            expectMatches('name', [
                ['Name Surname', true],
                ['Ňámě Śúřňämě', true],
                ['NameSurname', true],
                ['Name# Surname', false],
                ['Name__Surname', false],
                ['$$$$$$', false],
            ]);
        });

        it('accepts addresses with a dotted domain only', () => {
            expectMatches('email', [
                ['name.surname@email.com', true],
                ['namesurname123@email.com', true],
                ['email', false],
                ['name.surname@emailcom', false],
                ['name.surnameemailcom@', false],
            ]);
        });

        it('accepts phone numbers with spaces and a leading plus', () => {
            expectMatches('phone', [
                ['0123456789', true],
                ['0123 456 789', true],
                ['+0123456789', true],
                ['Phone Number', false],
            ]);
        });
    });
});
