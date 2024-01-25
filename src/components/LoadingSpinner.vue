<template>
  <v-container class="loading-canvas">
    <v-row style="height: calc(75vh)">
      <v-col
        class="d-flex align-center justify-center"
        cols="12"
      >
        <v-progress-circular
          :size="60"
          :width="6"
          color="primary"
          indeterminate
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<style lang="scss" scoped>
.loading-canvas {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
