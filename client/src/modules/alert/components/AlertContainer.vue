<template>
    <div class="alert-container">
        <alert
            v-for="alert in alerts"
            :key="alert.id"
            :id="alert.id"
            :type="alert.type"
            v-bind="alertStateGet(alert)"
            @destroy="alertDestroy"
        />
    </div>
</template>

<script lang="ts">
    import {mixins}    from 'vue-class-component';
    import {Component} from 'vue-property-decorator';
    import MainMixin   from '@/mixins/Main';
    import Alert       from './Alert.vue';

    /** @description The component containing all custom alerts. */
    @Component({
        components: {
            Alert
        },
        name: `AlertContainer`
    })
    export default class AlertContainer extends mixins(MainMixin)
    {
        /**
         * @description Runs on an attempt to destroy an alert.
         * @param alertId Id of the alert to destroy.
         * */
        public alertDestroy(alertId: number): void
        {
            this.alerts = this.alerts.filter(({id}) =>
            {
                return id !== alertId;
            });
        }

        /**
         * Gets the data for an alert.
         * @parma alert The alert to get the data for.
         * @returns The alert data.
         * */
        public alertStateGet(alert: { id: number, type: string }): AlertState
        {
            return this.statesStore[alert.type] ?? this.statesStore.invalid;
        }

        /**
         * @description Creates an alert.
         * @param type The type of the alert.
         * */
        public alertShow(type: string): void
        {
            this.alerts.push({id: this.id, type});
            this.id += 1;
        }

        /** @description Array of all alerts of the container. */
        public alerts: { id: number, type: string }[] = [];

        /** @description Id of the next alert which will be created. */
        public id: number = 0;

        /** @description Object containing all alert types which corresponding state type. */
        public readonly statesStore: Record<string, AlertState> = {
            empty: {type: `fail`},
            invalid: {type: `fail`},
            success: {type: `success`}
        };

        /**
         * @description Object containing all possible state types of the alerts with all the parameters needed
         * to differentiate the alerts visually.
         *  */
        public readonly stateTypes: Record<string, {backgroundColor: string, color: string }> = {
            fail: {backgroundColor: `#ff262b`, color: `#ffffff`},
            success: {backgroundColor: `#00d12a`, color: `#ffffff`}
        };

        /** @description Initializes the alert data store. */
        public statesStoreInit(): void
        {
            /** @description Assigns the parameters of the state types to the alert types. */
            Object.entries(this.statesStore).forEach(([stateName, state]) =>
            {
                this.statesStore[stateName] = {...this.stateTypes[state.type], type: state.type};
            });
        }

        public mounted()
        {
            this.statesStoreInit();

            this.$root.$on(`alert-show`, this.alertShow);
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
