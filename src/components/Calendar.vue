<template>
    <transition>
        <b-container>
            <div v-for="item in jCalEvents" :key="item.id">
                {{ item }}
            </div>
        </b-container>
    </transition>
</template>

<script>
import * as iCal from '../assets/calendar';

export default {
    name: 'Calendar',
    props: {
        iCalStr: String
    },
    data() {
        return {
            jCal: null,
            jCalEvents: null,
        }
    },
    mounted() {
        this.jCalEvents = iCal.getAllComponents(this.iCalStr);
    },
    methods: {

    }
}
</script>

<style scoped>

</style>