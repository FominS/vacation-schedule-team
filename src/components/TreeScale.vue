<template>
  <div>
    <div
      v-if="value == scaleType[0]"
      class="schedule-team-scale schedule-team-scale-tree"
    ></div>
    <div v-else class="schedule-team-scale schedule-team-scale-tree pa-1">
      <v-btn icon dark :disabled="monthIndex < 1" @click="decrease"
        ><v-icon>mdi-chevron-left</v-icon></v-btn
      >
      <span class="white--text text-center subtitle-2">{{ monthName }}</span>
      <v-btn icon dark :disabled="monthIndex > 10" @click="increase"
        ><v-icon>mdi-chevron-right</v-icon></v-btn
      >
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ScaleTypes } from "../types/types";
import moment from "moment";
import "moment/locale/ru";

@Component
export default class TreeScale extends Vue {
  @Prop({ default: ScaleTypes[0], required: true }) readonly value!: ScaleTypes;
  @Prop({ default: new Date(2020, 3) }) readonly month!: Date;

  /* data */
  private scaleType: unknown = ScaleTypes;

  /* computed */
  get monthIndex(): number {
    return this.month.getMonth();
  }
  get monthName(): string {
    return moment(this.month).format("MMMM");
  }

  /* methods */
  public increase(): void {
    this.$emit("next-month");
  }
  public decrease(): void {
    this.$emit("previous-month");
  }
}
</script>
<style scoped>
.schedule-team-scale {
  background-color: #0088b2;
  height: 45px;
  border-bottom: 1px solid lightgray;
  border-right: 1px solid lightgray;
}
.schedule-team-scale-tree {
  width: 300px;
  min-width: 300px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  position: relative;
  
}
</style>
