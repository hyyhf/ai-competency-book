<script setup>
import { ref, reactive, onMounted, onUnmounted, nextTick, watch } from 'vue'

const props = defineProps({
  phrases: {
    type: Array,
    default: () => ['True', 'Focus']
  },
  manualMode: {
    type: Boolean,
    default: false
  },
  blurAmount: {
    type: Number,
    default: 2
  },
  borderColor: {
    type: String,
    default: '#B98945'
  },
  glowColor: {
    type: String,
    default: 'rgba(185, 137, 69, 0.5)'
  },
  animationDuration: {
    type: Number,
    default: 0.4
  },
  pauseBetweenAnimations: {
    type: Number,
    default: 2
  }
})

const currentIndex = ref(0)
const showBrackets = ref(!props.manualMode)
const containerRef = ref(null)
const phraseRefs = ref([])
const focusRect = reactive({ x: 0, y: 0, width: 0, height: 0 })
let intervalId = null

function updateRect() {
  const idx = currentIndex.value
  if (idx === null || idx < 0) return
  if (!phraseRefs.value[idx] || !containerRef.value) return

  const parentRect = containerRef.value.getBoundingClientRect()
  const activeRect = phraseRefs.value[idx].getBoundingClientRect()

  focusRect.x = activeRect.left - parentRect.left
  focusRect.y = activeRect.top - parentRect.top
  focusRect.width = activeRect.width
  focusRect.height = activeRect.height
}

function startAutoPlay() {
  if (props.manualMode) return
  intervalId = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % props.phrases.length
  }, (props.animationDuration + props.pauseBetweenAnimations) * 1000)
}

function handleMouseEnter(index) {
  if (props.manualMode) {
    currentIndex.value = index
    showBrackets.value = true
  }
}

function handleMouseLeave() {
  if (props.manualMode) {
    showBrackets.value = false
  }
}

watch(currentIndex, () => {
  nextTick(updateRect)
})

onMounted(() => {
  nextTick(() => {
    updateRect()
    startAutoPlay()
  })
  window.addEventListener('resize', updateRect)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
  window.removeEventListener('resize', updateRect)
})

function setPhraseRef(el, index) {
  if (el) phraseRefs.value[index] = el
}
</script>

<template>
  <div
    ref="containerRef"
    class="true-focus-container"
    :class="{ 'manual-mode': manualMode }"
    :style="{ '--blur': blurAmount + 'px', '--dur': animationDuration + 's' }"
    @mouseleave="handleMouseLeave"
  >
    <span
      v-for="(phrase, index) in phrases"
      :key="index"
      :ref="el => setPhraseRef(el, index)"
      class="focus-phrase"
      :class="{
        active: index === currentIndex && (manualMode ? showBrackets : true),
        'hover-target': manualMode
      }"
      @mouseenter="handleMouseEnter(index)"
    >{{ phrase }}</span>

    <!-- Animated focus brackets -->
    <div
      class="focus-brackets"
      :class="{ visible: manualMode ? showBrackets : true }"
      :style="{
        transform: `translate(${focusRect.x}px, ${focusRect.y}px)`,
        width: focusRect.width + 'px',
        height: focusRect.height + 'px',
        '--border-color': borderColor,
        '--glow-color': glowColor,
        transition: `transform ${animationDuration}s cubic-bezier(0.25, 0.46, 0.45, 0.94), width ${animationDuration}s ease, height ${animationDuration}s ease, opacity ${animationDuration}s ease`
      }"
    >
      <span class="bracket corner-tl"></span>
      <span class="bracket corner-tr"></span>
      <span class="bracket corner-bl"></span>
      <span class="bracket corner-br"></span>
    </div>
  </div>
</template>

<style scoped>
.true-focus-container {
  position: relative;
  display: flex;
  gap: 0;
  flex-wrap: wrap;
  align-items: baseline;
  user-select: none;
  line-height: 2.2;
}

.focus-phrase {
  position: relative;
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 1.05rem;
  color: var(--vp-c-text-2, #3d5a53);
  cursor: default;
  filter: blur(var(--blur));
  transition: filter var(--dur) ease;
  padding: 2px 0;
}

/* Auto mode: only active is clear */
.focus-phrase.active {
  filter: blur(0px);
}

/* Manual/hover mode: all clear by default, blur on container hover except active */
.manual-mode .focus-phrase {
  filter: blur(0px);
  cursor: pointer;
}

.manual-mode:hover .focus-phrase {
  filter: blur(var(--blur));
}

.manual-mode:hover .focus-phrase.active {
  filter: blur(0px);
}

/* Focus brackets container */
.focus-brackets {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 1;
  opacity: 0;
}

.focus-brackets.visible {
  opacity: 1;
}

/* Corner brackets */
.bracket {
  position: absolute;
  width: 14px;
  height: 14px;
  border-style: solid;
  border-color: var(--border-color);
  border-radius: 2px;
  filter: drop-shadow(0 0 5px var(--glow-color));
}

.corner-tl {
  top: -8px;
  left: -8px;
  border-width: 2.5px 0 0 2.5px;
}

.corner-tr {
  top: -8px;
  right: -8px;
  border-width: 2.5px 2.5px 0 0;
}

.corner-bl {
  bottom: -8px;
  left: -8px;
  border-width: 0 0 2.5px 2.5px;
}

.corner-br {
  bottom: -8px;
  right: -8px;
  border-width: 0 2.5px 2.5px 0;
}

/* Dark mode */
:deep(.dark) .focus-phrase {
  color: var(--vp-c-text-2, #c4bfb3);
}
</style>
