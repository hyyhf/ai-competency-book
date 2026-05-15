<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  typeSpeed: {
    type: Number,
    default: 120
  },
  deleteSpeed: {
    type: Number,
    default: 60
  },
  pauseAfterType: {
    type: Number,
    default: 2000
  },
  pauseAfterDelete: {
    type: Number,
    default: 500
  }
})

const displayText = ref('')
const isTyping = ref(true)
let timerId = null
let charIndex = 0
let deleting = false

function tick() {
  if (!deleting) {
    // Typing
    charIndex++
    displayText.value = props.text.slice(0, charIndex)

    if (charIndex >= props.text.length) {
      // Finished typing, pause then start deleting
      deleting = true
      timerId = setTimeout(tick, props.pauseAfterType)
      return
    }
    timerId = setTimeout(tick, props.typeSpeed)
  } else {
    // Deleting
    charIndex--
    displayText.value = props.text.slice(0, charIndex)

    if (charIndex <= 0) {
      // Finished deleting, pause then start typing
      deleting = false
      timerId = setTimeout(tick, props.pauseAfterDelete)
      return
    }
    timerId = setTimeout(tick, props.deleteSpeed)
  }
}

onMounted(() => {
  charIndex = 0
  displayText.value = ''
  deleting = false
  timerId = setTimeout(tick, props.pauseAfterDelete)
})

onUnmounted(() => {
  if (timerId) clearTimeout(timerId)
})
</script>

<template>
  <span class="typewriter">
    <span class="typewriter-text">{{ displayText }}</span>
    <span class="typewriter-cursor">_</span>
  </span>
</template>

<style scoped>
.typewriter {
  display: inline;
}

.typewriter-text {
  font: inherit;
  color: inherit;
  letter-spacing: inherit;
}

.typewriter-cursor {
  display: inline-block;
  font-weight: 600;
  color: var(--ai-color-zhe, #B98945);
  animation: cursorBlink 0.8s steps(2) infinite;
  margin-left: 0;
  font-size: 1.2em;
  vertical-align: baseline;
  line-height: 1;
}

@keyframes cursorBlink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>
