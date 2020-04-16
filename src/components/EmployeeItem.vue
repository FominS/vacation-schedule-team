<template>
  <div>
    <div class="schedule-team-employee">
      <v-list-item dense class="pa-1" :style="levelIdent">
        <v-list-item-icon class="mx-1">
          <v-icon color="orange darken-2" v-if="leader">mdi-account</v-icon>
          <v-btn v-else-if="employes && employes.length" icon x-small>
            <v-icon color="gray darken-2" @click="showChild = !showChild">{{
              showChild ? "mdi-chevron-down" : "mdi-chevron-right"
            }}</v-icon>
          </v-btn>
        </v-list-item-icon>
        <v-list-item-content class="py-0">
          <v-list-item-title
            :title="surname + ' ' + firstname + ' ' + middlename"
            >{{ surname }} {{ firstname }} {{ middlename }}</v-list-item-title
          >
          <v-list-item-subtitle :title="position">{{
            position
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </div>
    <div v-if="showChild" class="">
      <employee-item
        v-for="item in employes"
        :key="item.id"
        :firstname="item.firstname"
        :surname="item.surname"
        :middlename="item.middlename"
        :position="item.position"
        :employes="item.employes"
        :leader="item.leader"
        :level="Number(level) + 1"
      ></employee-item>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Schedule } from "../types/types";

@Component({
  name: "EmployeeItem",
})
export default class EmployeeItem extends Vue {
  @Prop({ default: "" }) readonly firstname!: string;
  @Prop({ default: "" }) readonly surname!: string;
  @Prop({ default: "" }) readonly middlename!: string;
  @Prop({ default: "" }) readonly position!: string;
  @Prop({ default: [] }) readonly employes!: Array<Schedule>;
  @Prop({ default: false }) readonly leader!: boolean;
  @Prop({ default: 0 }) readonly level!: number;

  /* data */
  private showChild = true;
  
  /* computed */
  get levelIdent(): object {
    return { "margin-left": `${Number(this.level) * 20}px` };
  }

  /* methods */
  
}
</script>

<style scoped>
.schedule-team-employee {
  height: 48px;
  border-bottom: 1px dashed lightgray; 
}
</style>
