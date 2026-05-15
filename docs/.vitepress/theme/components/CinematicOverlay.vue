<script setup>
import { ref, watch, onUnmounted, nextTick } from 'vue'

const props = defineProps({
  show: Boolean,
  startIndex: { type: Number, default: 0 },
  mode: { type: String, default: 'slideshow' }, // 'slideshow' | 'mosaic'
  images: { type: Array, default: () => [] },
  titles: { type: Array, default: () => [] },
  chapters: { type: Array, default: () => [] },
  links: { type: Array, default: () => [] }
})

const emit = defineEmits(['close'])
const active = ref(false)
const current = ref(0)
let autoTimer = null
const SLIDE_DURATION = 4000

// Mosaic presets - asymmetric grid positions
const mosaicPresets = [
  { top: '3%',  left: '2%',  w: '30%', h: '44%' },
  { top: '2%',  left: '28%', w: '26%', h: '40%' },
  { top: '3%',  left: '48%', w: '26%', h: '42%' },
  { top: '2%',  left: '72%', w: '26%', h: '40%' },
  { top: '50%', left: '3%',  w: '28%', h: '44%' },
  { top: '48%', left: '30%', w: '32%', h: '46%' },
  { top: '50%', left: '60%', w: '38%', h: '44%' }
]

function startSlideshow() {
  current.value = props.startIndex
  scheduleNext()
}

function scheduleNext() {
  clearTimeout(autoTimer)
  autoTimer = setTimeout(() => {
    current.value = (current.value + 1) % props.images.length
    scheduleNext()
  }, SLIDE_DURATION)
}

function goTo(index) {
  clearTimeout(autoTimer)
  current.value = index
  scheduleNext()
}

function close() {
  clearTimeout(autoTimer)
  active.value = false
  setTimeout(() => emit('close'), 500)
}

function navigate(index) {
  if (props.links[index]) {
    close()
    setTimeout(() => {
      window.location.href = props.links[index]
    }, 20)
  }
}

watch(() => props.show, (val) => {
  if (val && props.images.length) {
    nextTick(() => {
      active.value = true
      if (props.mode === 'slideshow') {
        startSlideshow()
      }
    })
  } else if (!val) {
    clearTimeout(autoTimer)
    active.value = false
  }
})

onUnmounted(() => clearTimeout(autoTimer))
</script>

<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="cine-overlay"
      :class="{ active }"
      @click.self="close"
    >
      <div class="cine-backdrop"></div>

      <!-- Close button -->
      <button class="cine-close" @click="close">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>

      <!-- ===== MOSAIC MODE ===== -->
      <template v-if="mode === 'mosaic'">
        <div class="mosaic-stage">
          <div
            v-for="(img, i) in images"
            :key="'m'+i"
            class="mosaic-frame"
            :class="'kb-' + i"
            :style="{
              top: mosaicPresets[i]?.top,
              left: mosaicPresets[i]?.left,
              width: mosaicPresets[i]?.w,
              height: mosaicPresets[i]?.h,
              transitionDelay: (i * 0.1) + 's',
              animationDelay: (i * 0.12) + 's'
            }"
            @click.stop="navigate(i)"
          >
            <img :src="img" :alt="titles[i]" />
            <div class="mosaic-label">
              <span class="label-num">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="label-title">{{ titles[i] }}</span>
              <span class="label-chap">{{ chapters[i] }}</span>
              <span class="label-go">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </span>
            </div>
          </div>
        </div>
      </template>

      <!-- ===== SLIDESHOW MODE ===== -->
      <template v-else>
        <div class="cine-stage">
          <div
            v-for="(img, i) in images"
            :key="'s'+i"
            class="cine-slide"
            :class="{ 'is-active': i === current }"
          >
            <div class="slide-img-wrap" :class="'kb-' + i">
              <img :src="img" :alt="titles[i]" />
            </div>
          </div>
        </div>

        <!-- Info panel -->
        <div class="cine-info" :key="current">
          <div class="info-num">{{ String(current + 1).padStart(2, '0') }}</div>
          <div class="info-divider"></div>
          <h3 class="info-title">{{ titles[current] }}</h3>
          <p class="info-chap">{{ chapters[current] }}</p>
          <button class="info-go" @click.stop="navigate(current)">
            <span>开始阅读</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>
        </div>

        <!-- Progress dots -->
        <div class="cine-progress">
          <button
            v-for="(_, i) in images"
            :key="i"
            class="dot"
            :class="{ active: i === current }"
            @click.stop="goTo(i)"
          >
            <span class="dot-fill" :style="i === current ? { animationDuration: SLIDE_DURATION + 'ms' } : {}"></span>
          </button>
        </div>
      </template>
    </div>
  </Teleport>
</template>

<style scoped>
.cine-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  opacity: 0;
  transition: opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.cine-overlay.active {
  opacity: 1;
}

.cine-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(15, 22, 20, 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.cine-close {
  position: absolute;
  top: 28px;
  right: 32px;
  z-index: 20;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255,255,255,0.7);
  cursor: pointer;
  transition: all 0.3s ease;
}
.cine-close:hover {
  background: rgba(255,255,255,0.15);
  color: #fff;
  transform: rotate(90deg);
}

/* ========================================
   MOSAIC MODE - all images visible
   ======================================== */
.mosaic-stage {
  position: absolute;
  inset: 32px;
}

.mosaic-frame {
  position: absolute;
  border-radius: 12px;
  overflow: hidden;
  opacity: 0;
  transform: scale(0.88) translateY(20px);
  transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              box-shadow 0.4s ease;
  box-shadow: 0 8px 30px rgba(0,0,0,0.3);
  cursor: pointer;
}

.active .mosaic-frame {
  opacity: 1;
  transform: scale(1) translateY(0);
}

.mosaic-frame:hover {
  z-index: 10;
  box-shadow:
    0 16px 60px rgba(185, 137, 69, 0.3),
    0 0 0 2px rgba(185, 137, 69, 0.5);
}

.mosaic-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.6s ease;
}

.mosaic-frame:hover img {
  transform: scale(1.05);
}

/* Ken Burns for mosaic */
.mosaic-frame.kb-0 img { animation: kb0 20s ease-in-out infinite alternate; }
.mosaic-frame.kb-1 img { animation: kb1 22s ease-in-out infinite alternate; }
.mosaic-frame.kb-2 img { animation: kb2 18s ease-in-out infinite alternate; }
.mosaic-frame.kb-3 img { animation: kb3 24s ease-in-out infinite alternate; }
.mosaic-frame.kb-4 img { animation: kb4 19s ease-in-out infinite alternate; }
.mosaic-frame.kb-5 img { animation: kb5 21s ease-in-out infinite alternate; }
.mosaic-frame.kb-6 img { animation: kb6 23s ease-in-out infinite alternate; }

/* Mosaic labels */
.mosaic-label {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 28px 14px 12px;
  background: linear-gradient(to top, rgba(15, 22, 20, 0.85) 0%, transparent 100%);
  display: flex;
  align-items: baseline;
  gap: 6px;
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.mosaic-frame:hover .mosaic-label {
  opacity: 1;
  transform: translateY(0);
}

.label-num {
  font-family: 'Noto Serif SC', serif;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--ai-color-zhe, #B98945);
}
.label-title {
  font-family: 'Noto Serif SC', serif;
  font-size: 0.9rem;
  font-weight: 700;
  color: #fff;
}
.label-chap {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 0.7rem;
  color: rgba(255,255,255,0.5);
  margin-left: auto;
}
.label-go {
  display: flex;
  align-items: center;
  color: var(--ai-color-zhe, #B98945);
  margin-left: 6px;
  opacity: 0.8;
  transition: transform 0.25s ease;
}
.mosaic-frame:hover .label-go {
  transform: translateX(3px);
  opacity: 1;
}

/* ========================================
   SLIDESHOW MODE - one at a time
   ======================================== */
.cine-stage {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cine-slide {
  position: absolute;
  inset: 5vh 8vw;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: scale(1.06);
  transition: opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  pointer-events: none;
}

.cine-slide.is-active {
  opacity: 1;
  transform: scale(1);
  pointer-events: auto;
}

.slide-img-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 16px;
}

.slide-img-wrap img {
  max-width: 85%;
  max-height: 80vh;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 30px 100px rgba(0,0,0,0.4);
}

/* Shared Ken Burns */
.kb-0 img { animation: kb0 20s ease-in-out infinite alternate; }
.kb-1 img { animation: kb1 22s ease-in-out infinite alternate; }
.kb-2 img { animation: kb2 18s ease-in-out infinite alternate; }
.kb-3 img { animation: kb3 24s ease-in-out infinite alternate; }
.kb-4 img { animation: kb4 19s ease-in-out infinite alternate; }
.kb-5 img { animation: kb5 21s ease-in-out infinite alternate; }
.kb-6 img { animation: kb6 23s ease-in-out infinite alternate; }

@keyframes kb0 { 0% { transform: scale(1); } 100% { transform: scale(1.08) translate(-1%, 1%); } }
@keyframes kb1 { 0% { transform: scale(1.05) translate(1%, 0); } 100% { transform: scale(1) translate(-1%, 1%); } }
@keyframes kb2 { 0% { transform: scale(1); } 100% { transform: scale(1.1) translate(1.5%, -1%); } }
@keyframes kb3 { 0% { transform: scale(1.06) translate(-1%, -0.5%); } 100% { transform: scale(1) translate(1%, 1%); } }
@keyframes kb4 { 0% { transform: scale(1); } 100% { transform: scale(1.07) translate(-1.5%, 0.5%); } }
@keyframes kb5 { 0% { transform: scale(1.08) translate(0.5%, 1%); } 100% { transform: scale(1) translate(-0.5%, -1%); } }
@keyframes kb6 { 0% { transform: scale(1); } 100% { transform: scale(1.09) translate(1%, -1.5%); } }

/* Info panel */
.cine-info {
  position: absolute;
  bottom: 10vh;
  left: 8vw;
  z-index: 10;
  animation: infoEnter 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

@keyframes infoEnter {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

.info-num {
  font-family: 'Noto Serif SC', serif;
  font-size: 3.5rem;
  font-weight: 900;
  line-height: 1;
  background: linear-gradient(135deg, var(--ai-color-zhe, #B98945) 0%, rgba(185, 137, 69, 0.4) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
}

.info-divider {
  width: 48px;
  height: 2px;
  background: linear-gradient(to right, var(--ai-color-zhe, #B98945), transparent);
  margin-bottom: 1rem;
}

.info-title {
  font-family: 'Noto Serif SC', serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 0.5rem;
  letter-spacing: 0.04em;
}

.info-chap {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 0.85rem;
  color: rgba(255,255,255,0.45);
  margin: 0;
}

.info-go {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 1.2rem;
  padding: 8px 20px;
  background: var(--ai-color-zhe, #B98945);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.04em;
}

.info-go:hover {
  background: #a07838;
  transform: translateX(4px);
  box-shadow: 0 4px 20px rgba(185, 137, 69, 0.4);
}

/* Progress dots */
.cine-progress {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
}

.dot {
  width: 32px;
  height: 3px;
  border-radius: 2px;
  background: rgba(255,255,255,0.15);
  border: none;
  padding: 0;
  cursor: pointer;
  overflow: hidden;
  position: relative;
}

.dot:hover {
  background: rgba(255,255,255,0.25);
}

.dot-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 0;
  background: var(--ai-color-zhe, #B98945);
  border-radius: 2px;
}

.dot.active .dot-fill {
  width: 100%;
  animation: dotProgress linear forwards;
}

@keyframes dotProgress {
  0% { width: 0; }
  100% { width: 100%; }
}

/* Responsive */
@media (max-width: 768px) {
  .cine-overlay { display: none; }
}
</style>
