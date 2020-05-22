<template>
  <div
    v-on:mousewheel="wheel" 
    class="schedule-team-vertical-scroll">
    <div
      class="vertical-scroll"
      v-on:mousedown="scrollStart"
      :style="{ width: widthPx, left: leftPx }"
    ></div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Watch, Vue, Emit } from "vue-property-decorator";

@Component
export default class VerticalScroll extends Vue {
  @Prop({ required: true }) readonly width!: number;
  @Prop({default: 0}) readonly offsetY!: number;

  scrollWidth = 0;
  ratio = 0;
  positionX = 0;
  left = 0;
  maxLeft = 0;

  mounted() {
    this.init();
  }

  /* computed */
  get leftPx(): string{
    return this.left + 'px';
  }
  get widthPx(): string{
    return this.scrollWidth + 'px';
  }

  /* methods */
  public init(): void {
    if (this.$el) {
      const elWidth = (this.$el as HTMLElement).offsetWidth;
      this.ratio = (this.width / elWidth);
      this.scrollWidth = (elWidth / this.width) * elWidth;
      this.maxLeft = elWidth - this.scrollWidth - 2;
    }
  }

  public scrollStart(event: MouseEvent): void {
    this.positionX = event.clientX - this.left;
    document.onmouseup = this.scrollEnd;
    document.onmousemove = this.scrollMove;
  }
  public scrollEnd(): void {
    document.onmouseup = null;
    document.onmousemove = null;
  }

  public scrollMove(event: MouseEvent): void {
    const diff = event.clientX - this.positionX;
    if(diff >=0){
      this.left = (event.clientX - this.positionX)
    }
    if(this.left >= this.maxLeft){
      this.left = this.maxLeft;
    }
    this.$emit('move-scroll', this.left * this.ratio);
  }

  public wheel(event: WheelEvent): void{
    this.left += event.deltaX;
  }

  /* watch */
  @Watch("width")
  widthChange() {
    this.init();
  }

  @Watch("offset")
  offsetChange() {
    this.left += this.offsetY;
  }
}
</script>

<style scoped>
.schedule-team-vertical-scroll {
  position: relative;
  bottom: 0px;
  left: 0px;
  height: 14px;
  width: 100%;
  z-index: 10;
  background-color: #bcbcbc;

  /* -webkit-box-shadow: inset 2px -2px 4px 0px rgb(95, 94, 94);
  -moz-box-shadow: inset 2px -2px 4px 0px rgb(95, 94, 94);
  box-shadow: inset 2px -2px 4px 0px rgb(95, 94, 94); */
}
.schedule-team-vertical-scroll > div {
  position: relative;
  top: 2px;
  height: 10px;
  margin-top: 1px;
  margin-left: 1px;
  background-color: gray;
  border-radius: 5px;
  cursor: pointer;
}
</style>
