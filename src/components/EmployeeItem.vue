<template>
  <div>
    <div class="schedule-team-employee">
      <v-list-item dense class="pa-1" :style="levelIdent">
        <v-list-item-icon class="mx-1">
          <v-icon color="orange darken-2" v-if="value.leader"
            >mdi-account</v-icon
          >
          <v-btn v-else-if="employes && employes.length" icon x-small>
            <v-icon color="gray darken-2" @click="toggle">{{
              showChild ? "mdi-chevron-down" : "mdi-chevron-right"
            }}</v-icon>
          </v-btn>
        </v-list-item-icon>
        <v-list-item-content class="py-0">
          <v-list-item-title
            :title="
              value.surname + ' ' + value.firstname + ' ' + value.middlename
            "
            >{{ value.surname }} {{ value.firstname }}
            {{ value.middlename }}</v-list-item-title
          >
          <v-list-item-subtitle :title="value.position">{{
            value.position
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </div>
    <div v-if="showChild">
      <employee-item
        v-model="item.data"
        v-for="item in employes"
        :key="item.data.id"
        :employes="item.employes"
        :level="level + 1"
        :showChild="item.isOpen"
        @toggle-child="item.isOpen = !item.isOpen"
      ></employee-item>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Schedule, ScheduleModel } from "../types/types";

@Component({
  name: "EmployeeItem",
})
export default class EmployeeItem extends Vue {
  @Prop({ default: null }) readonly value!: ScheduleModel;
  @Prop({ default: [] }) readonly employes!: Schedule[];
  @Prop({ default: true }) readonly showChild!: boolean;
  @Prop({ default: 0 }) readonly level!: number;

  /* computed */
  get levelIdent(): object {
    return { "margin-left": `${Number(this.level) * 20}px` };
  }

  /* methods */
  public toggle(): void {
    this.$emit("toggle-child", !this.showChild);
  }
}
</script>

<style scoped>
.schedule-team-employee {
  height: 48px;
  border-bottom: 1px dashed lightgray;
  background-color: white;
}
</style>
