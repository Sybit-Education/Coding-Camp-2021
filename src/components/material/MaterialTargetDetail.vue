<template>
  <div v-if="target">
    <hr>
    <h2
      class="mt-5"
      v-text="target.name"
    />
    <markdown-wrapper
      class="mt-5"
      :source="target.description"
    />
  </div>
</template>
<script lang="ts">
import MarkdownWrapper from '@/components/MarkdownWrapper.vue'
import { useTargetStore } from '@/store/target.store';

export default {
  components: {
    MarkdownWrapper
  },
  props: {
    targetId: {
      type: String,
      required: true
    }
  },
  computed: {
    target () {
      const target = useTargetStore().getTargetById(this.targetId)
      return target
    }
  }
}
</script>
