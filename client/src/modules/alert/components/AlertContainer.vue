<template>
    <div class="alert-container">
        <alert v-for="alert in alerts" :key="alert.id" :id="alert.id" :name="alert.name" :state="states[alert.name] || states.invalid" @destroy="alertDestroyOn"/>
    </div>
</template>

<script lang="ts">
    import {mixins}           from 'vue-class-component';
    import {Component, Watch} from 'vue-property-decorator';
    import MainMixin          from '@/mixins/Main';
    import Alert              from './Alert.vue';

    @Component({
        components: {
            Alert
        },
        name: `AlertContainer`
    })
    export default class AlertContainer extends mixins(MainMixin)
    {
        public alertDestroyOn(alertId: number): void
        {
            this.alerts = this.alerts.filter(({id}) =>
            {
                return id !== alertId;
            });
        }

        public alerts: { id: number, name: string }[] = [];
        public id: number = 0;
        public sectionsActiveLoaded: boolean = false;
        public readonly states: { [s: string]: AlertState } = {
            empty: {type: `fail`},
            invalid: {type: `fail`},
            success: {type: `success`}
        };
        public readonly stateTypes: { [s: string]: { backgroundColor: string, color: string } } = {
            fail: {backgroundColor: `#ff262b`, color: `#ffffff`},
            success: {backgroundColor: `#00d12a`, color: `#ffffff`}
        };

        @Watch('sectionsActive')
        public sectionsActiveChangeOn()
        {
            if (!this.sectionsActiveLoaded)
            {
                this.sectionsActiveLoaded = true;
                return;
            }

            this.alerts = [];
            this.id = 0;
        }

        public mounted()
        {
            Object.entries(this.states).forEach(([stateName, state]) =>
            {
                this.states[stateName] = {...this.stateTypes[state.type], type: state.type};
            });

            this.$root.$on(`alert-show`, (name: string) =>
            {
                this.alerts.push({id: this.id, name});
                this.id += 1;
            });
        }
    }
</script>

<style lang="stylus" scoped>
    .alert-container
        display flex
        flex-direction column
        opacity: .95
        position fixed
        right 17px
        top 60px
        width 367px
        z: 4

        @media (max-width 1023px)
            bottom 15px
            flex-direction column-reverse
            left 0
            margin auto
            right 0
            top auto
            width calc(100% - 30px)
</style>
