<!-- eslint-disable vue/no-v-html -->
<template>
  <div
    class="markdown"
    linkify
    typographer
    v-html="markdown.render(source)"
  />
</template>

<script setup lang="ts">
// see https://dev.to/matijanovosel/rendering-markdown-in-vue-3-3maj
import MarkdownIt from 'markdown-it'
const markdown = new MarkdownIt()

defineProps({
  source: {
    type: String,
    required: true
  }
})
</script>
<style lang="scss">

.markdown {
  a {
    color: rgb(var(--v-theme-primary));
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  ol {
    list-style-type: decimal;
    padding-left: 1.5rem;
  }
  ul {
    list-style-type: disc;
    padding-left: 1.5rem;
  }
}
</style>
