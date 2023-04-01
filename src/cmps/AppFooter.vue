<template>
  <footer class="bottom flex align-center space-between">
    <div class="left">
      <span class="fs24">fiveairr</span>
      <small class="fs14">© Fiveairr International Ltd. 2023</small>
    </div>
    <div class="right">
      <ul class="social flex align-center space-between clean-list">
        <li>
          <div v-html="getSvg('twitter')"></div>
        </li>
        <li>
          <div v-html="getSvg('facebook')"></div>
        </li>
        <li>
          <div v-html="getSvg('linkedIn')"></div>
        </li>
        <li>
          <div v-html="getSvg('pinterest')"></div>
        </li>
        <li>
          <div v-html="getSvg('instagram')"></div>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
import { svgService } from "@/services/svg.service.js";
export default {
  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName);
    }
  }
};
</script>