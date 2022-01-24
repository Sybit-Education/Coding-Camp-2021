<template>
  <div v-if="target.description">
    <hr />
    <h2 class="mt-5" v-text="target.name" />
    <markdown-wrapper class="mt-5" :source="target.description" />
  </div>
</template>
<script>
import MarkdownWrapper from '@/components/MarkdownWrapper.vue'

export default {
  name: 'MaterialTargetDetail',
  components: {
    MarkdownWrapper
  },
  props: {
    target: {
      type: Object,
      required: true
    }
  }
}
</script>
