<script setup>
import { ref, inject, onMounted } from 'vue'

const visible = ref(false)
const openCinematic = inject('openCinematic', () => {})
let hoverTimer = null

onMounted(() => {
  setTimeout(() => { visible.value = true }, 100)
})

const parts = [
  {
    num: '01',
    title: '重新认识AI',
    desc: '先看清AI，再相信AI。它会像专家一样流畅，也会像骗子一样笃定。先辨认边界，再借它的锋利。',
    chapters: '第 1-2 章',
    link: '/part1/chapter1',
    icon: 'eye',
    cover: '/images/chapter_cover1.png'
  },
  {
    num: '02',
    title: '学会提问',
    desc: '会提问，才会协作。模糊想法要被整理成清晰任务。好的问题定义比任何Prompt技巧都更重要。',
    chapters: '第 3-5 章',
    link: '/part2/chapter3',
    icon: 'message',
    cover: '/images/chapter_cover2.png'
  },
  {
    num: '03',
    title: '学会学习',
    desc: '把AI当陪练，不当代练。它应逼你思考，而不是替你思考。用AI深化理解，而不是制造理解的幻觉。',
    chapters: '第 6-7 章',
    link: '/part3/chapter6',
    icon: 'book',
    cover: '/images/chapter_cover3.png'
  },
  {
    num: '04',
    title: '学会判断',
    desc: '生成越快，判断越要慢。看起来专业，不等于值得采纳。建立你自己的质量标准和评价框架。',
    chapters: '第 8-9 章',
    link: '/part4/chapter8',
    icon: 'scale',
    cover: '/images/chapter_cover4.png'
  },
  {
    num: '05',
    title: '学会组织信息',
    desc: '先整理信息，再期待答案。清晰结构是高质量协作的前提。让AI读得懂、找得到、用得对。',
    chapters: '第 10-11 章',
    link: '/part5/chapter10',
    icon: 'layers',
    cover: '/images/chapter_cover5.png'
  },
  {
    num: '06',
    title: '学会使用工具',
    desc: '学会选工具，而不是追新工具。知道何时用、为何用，比会不会用更重要。',
    chapters: '第 12-13 章',
    link: '/part6/chapter12',
    icon: 'tool',
    cover: '/images/chapter_cover6.png'
  },
  {
    num: '07',
    title: '学会安全行动',
    desc: '先设边界，再让AI行动。权限、隐私、版权与人工确认，是底线。',
    chapters: '第 14-15 章',
    link: '/part7/chapter14',
    icon: 'shield',
    cover: '/images/chapter_cover7.png'
  }
]

function withBase(path) {
  return '/ai-competency-book' + path
}

function onCardEnter(index) {
  clearTimeout(hoverTimer)
  hoverTimer = setTimeout(() => {
    openCinematic(index)
  }, 600)
}

function onCardLeave() {
  clearTimeout(hoverTimer)
}
</script>

<template>
  <section class="home-features-section">
    <div class="section-header">
      <div class="section-label">CONTENTS</div>
      <h2 class="section-title">七个维度，构建AI时代的核心素养</h2>
      <p class="section-subtitle">从认知到行动，从提问到判断，系统性地建立与AI协作的能力框架</p>
    </div>

    <div class="features-grid" :class="{ visible }">
      <a
        v-for="(part, index) in parts"
        :key="part.num"
        :href="withBase(part.link)"
        class="feature-card"
        :style="{ '--delay': index * 80 + 'ms' }"
        @mouseenter="onCardEnter(index)"
        @mouseleave="onCardLeave"
      >
        <!-- Floating cover image: breaks out of card on hover -->
        <div class="card-cover-float">
          <img :src="withBase(part.cover)" :alt="part.title" loading="lazy" />
        </div>

        <div class="card-content">
          <div class="card-top">
            <div class="card-num">{{ part.num }}</div>
            <div class="card-icon" :class="'icon-' + part.icon">
              <svg v-if="part.icon === 'eye'" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
              <svg v-if="part.icon === 'message'" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
              <svg v-if="part.icon === 'book'" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/></svg>
              <svg v-if="part.icon === 'scale'" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>
              <svg v-if="part.icon === 'layers'" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>
              <svg v-if="part.icon === 'tool'" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
              <svg v-if="part.icon === 'shield'" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>
            </div>
          </div>

          <h3 class="card-title">{{ part.title }}</h3>
          <p class="card-desc">{{ part.desc }}</p>

          <div class="card-footer">
            <span class="card-chapters">{{ part.chapters }}</span>
            <span class="card-arrow">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </span>
          </div>
        </div>
      </a>
    </div>
  </section>
</template>

<style scoped>
.home-features-section {
  max-width: 1152px;
  margin: 0 auto;
  padding: 2rem 24px 5rem;
}

.section-header {
  text-align: center;
  margin-bottom: 3.5rem;
}

.section-label {
  display: inline-block;
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  color: var(--ai-color-zhe, #B98945);
  background: rgba(185, 137, 69, 0.1);
  padding: 0.35rem 1rem;
  border-radius: 100px;
  margin-bottom: 1.25rem;
}

.section-title {
  font-family: 'Noto Serif SC', serif !important;
  font-size: 1.85rem;
  font-weight: 900;
  color: var(--ai-color-mo, #253B36);
  margin: 0 0 0.8rem;
  letter-spacing: 0.04em;
  line-height: 1.4;
}

.section-subtitle {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 1rem;
  color: var(--vp-c-text-2, #3d5a53);
  margin: 0;
  line-height: 1.6;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.25rem;
}

.feature-card:nth-child(1) { grid-column: 1 / span 3; }
.feature-card:nth-child(2) { grid-column: 4 / span 3; }
.feature-card:nth-child(3) { grid-column: 7 / span 3; }
.feature-card:nth-child(4) { grid-column: 10 / span 3; }
.feature-card:nth-child(5) { grid-column: 1 / span 4; }
.feature-card:nth-child(6) { grid-column: 5 / span 4; }
.feature-card:nth-child(7) { grid-column: 9 / span 4; }

/* ========================================
   Card base
   ======================================== */
.feature-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--vp-c-bg-elv, #fff);
  border: 1px solid var(--ai-color-wu, #D7D2C6);
  border-radius: 16px;
  text-decoration: none !important;
  color: inherit;
  /* overflow visible so the image can break out */
  overflow: visible;
  transition: transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              box-shadow 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              border-color 0.35s ease,
              z-index 0s;
  opacity: 0;
  transform: translateY(24px);
  width: 100%;
  z-index: 1;
}

.features-grid.visible .feature-card {
  opacity: 1;
  transform: translateY(0);
  transition-delay: var(--delay);
}

.feature-card:hover {
  border-color: var(--ai-color-zhe, #B98945);
  transform: translateY(-6px);
  box-shadow:
    0 24px 48px rgba(37, 59, 54, 0.1),
    0 0 0 1px rgba(185, 137, 69, 0.12);
  z-index: 100;
}

/* ========================================
   Floating cover image
   Breaks out of card, floats above
   ======================================== */
.card-cover-float {
  position: absolute;
  /* centered horizontally, floats above the card */
  left: 50%;
  bottom: 100%;
  transform: translateX(-50%);
  /* wider than the card */
  width: 500px;
  margin-bottom: 10px;
  pointer-events: none;
  z-index: 101;
  /* clip-path circle: starts from icon area (top-right of card) */
  clip-path: circle(0% at 80% 100%);
  transition: clip-path 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.feature-card:hover .card-cover-float {
  clip-path: circle(150% at 50% 50%);
}

.card-cover-float img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 14px;
  box-shadow:
    0 20px 60px rgba(37, 59, 54, 0.22),
    0 8px 24px rgba(37, 59, 54, 0.12),
    0 0 0 1px rgba(185, 137, 69, 0.1);
  background: var(--vp-c-bg-elv, #fff);
}

/* ========================================
   Card content
   ======================================== */
.card-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1.75rem 1.5rem 1.5rem;
  /* clip the content to respect border-radius */
  border-radius: 16px;
  overflow: hidden;
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
}

.card-num {
  font-family: 'Noto Serif SC', serif;
  font-size: 2rem;
  font-weight: 900;
  line-height: 1;
  background: linear-gradient(135deg, var(--ai-color-mo, #253B36) 0%, rgba(37, 59, 54, 0.25) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: rgba(185, 137, 69, 0.08);
  color: var(--ai-color-zhe, #B98945);
  transition: all 0.35s ease;
}

.feature-card:hover .card-icon {
  background: var(--ai-color-zhe, #B98945);
  color: #fff;
  transform: scale(1.05);
  box-shadow: 0 4px 14px rgba(185, 137, 69, 0.35);
}

.card-title {
  font-family: 'Noto Serif SC', serif !important;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--ai-color-mo, #253B36);
  margin: 0 0 0.65rem;
  letter-spacing: 0.03em;
  line-height: 1.4;
}

.card-desc {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 0.875rem;
  line-height: 1.75;
  color: var(--vp-c-text-2, #3d5a53);
  margin: 0;
  flex: 1;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(215, 210, 198, 0.5);
}

.card-chapters {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--ai-color-zhe, #B98945);
  letter-spacing: 0.02em;
}

.card-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(185, 137, 69, 0.08);
  color: var(--ai-color-zhe, #B98945);
  transition: all 0.3s ease;
}

.feature-card:hover .card-arrow {
  background: var(--ai-color-zhe, #B98945);
  color: #fff;
  transform: translateX(2px);
}

/* ========================================
   Dark mode
   ======================================== */
.dark .card-num {
  background: linear-gradient(135deg, #d4a85a 0%, rgba(212, 168, 90, 0.25) 100%);
  -webkit-background-clip: text;
  background-clip: text;
}

.dark .card-title {
  color: var(--vp-c-text-1, #e8e4da);
}

.dark .section-title {
  color: var(--vp-c-text-1, #e8e4da);
}

.dark .card-footer {
  border-top-color: rgba(61, 79, 73, 0.5);
}

.dark .card-cover-float img {
  background: var(--vp-c-bg-elv, #1f2e2a);
}

/* ========================================
   Responsive
   ======================================== */
@media (max-width: 960px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .feature-card:nth-child(1),
  .feature-card:nth-child(2),
  .feature-card:nth-child(3),
  .feature-card:nth-child(4),
  .feature-card:nth-child(5),
  .feature-card:nth-child(6),
  .feature-card:nth-child(7) {
    grid-column: auto;
  }
  .section-title {
    font-size: 1.5rem;
  }
  .card-cover-float {
    width: 110%;
  }
}

@media (max-width: 640px) {
  .features-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  .home-features-section {
    padding: 1.5rem 16px 3rem;
  }
  .section-title {
    font-size: 1.35rem;
  }
  .section-header {
    margin-bottom: 2.5rem;
  }
  .card-cover-float {
    width: 100%;
  }
}
</style>
