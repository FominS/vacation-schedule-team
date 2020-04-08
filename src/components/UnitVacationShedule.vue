<template>
  <GSTC :config="config" @state="onState" />
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import GSTC from 'vue-gantt-schedule-timeline-calendar';

class row {
    
}
class Config {
    height: string;

}

@Component({
    components: {
        GSTC
    }
})
export default class UnitVacationShedule extends Vue {
    private config 
}
</script>
