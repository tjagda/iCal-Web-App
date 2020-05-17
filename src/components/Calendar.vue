<template>
    <transition>
        <b-container>
            <!-- <div v-for="item in jCalEvents" :key="item.id">
                {{ item }}
            </div> -->
            <!-- {{ currentDate }} -->
            <b-row>
                <b-col class=calendarCol>
                    {{ monthView }}
                </b-col>
            </b-row>
            <b-row>
                <b-col class=calendarCol>Sunday</b-col>
                <b-col class=calendarCol>Monday</b-col>
                <b-col class=calendarCol>Tuesday</b-col>
                <b-col class=calendarCol>Thursday</b-col>
                <b-col class=calendarCol>Friday</b-col>
                <b-col class=calendarCol>Saturday</b-col>
            </b-row>
            <b-row>
                <b-col class=calendarCol></b-col>
                <b-col class=calendarCol></b-col>
                <b-col class=calendarCol></b-col>
                <b-col class=calendarCol></b-col>
                <b-col class=calendarCol></b-col>
                <b-col class=calendarCol></b-col>
            </b-row>
            <b-row>
                <b-col class=calendarCol></b-col>
                <b-col class=calendarCol></b-col>
                <b-col class=calendarCol></b-col>
                <b-col class=calendarCol></b-col>
                <b-col class=calendarCol></b-col>
                <b-col class=calendarCol></b-col>
            </b-row>
            <b-row>
                <b-col class=calendarCol></b-col>
                <b-col class=calendarCol></b-col>
                <b-col class=calendarCol></b-col>
                <b-col class=calendarCol></b-col>
                <b-col class=calendarCol></b-col>
                <b-col class=calendarCol></b-col>
            </b-row>
            <b-row>
                <b-col class=calendarCol></b-col>
                <b-col class=calendarCol></b-col>
                <b-col class=calendarCol></b-col>
                <b-col class=calendarCol></b-col>
                <b-col class=calendarCol></b-col>
                <b-col class=calendarCol></b-col>
            </b-row>
            <b-row>
                <b-col class=calendarCol></b-col>
                <b-col class=calendarCol></b-col>
                <b-col class=calendarCol></b-col>
                <b-col class=calendarCol></b-col>
                <b-col class=calendarCol></b-col>
                <b-col class=calendarCol></b-col>
            </b-row>
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
            currentDate: null,
            dayView: null,
            monthView: null
        }
    },
    mounted() {
        this.jCalEvents = iCal.getAllComponents(this.iCalStr);
        this.currentDate = this.getCurrentDate();
        this.dayView = this.currentDate.getDay();
        this.monthView = iCal.monthArr[this.currentDate.getMonth()];
    },
    methods: {
        getCurrentDate() {
            let today = new Date();
            return today;
        }
    }
}
</script>

<style scoped>
.calendarCol {
    border-style: solid;
    min-height: 50px;
}

</style>