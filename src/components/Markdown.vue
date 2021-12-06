<template>
  <vue-markdown
    class="markdown"
    linkify
    typographer
  >{{ source }}</vue-markdown>
</template>

<script>
import VueMarkdown from '@adapttive/vue-markdown'

export default {
  name: 'Markdown',
  props: {
    source: {
      type: String,
      required: true
    }
  },
  components: {
    VueMarkdown
  }
}
</script>
