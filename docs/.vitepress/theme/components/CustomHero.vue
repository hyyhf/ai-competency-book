<script setup>
import { ref, onMounted } from 'vue'

const loaded = ref(false)

onMounted(() => {
  requestAnimationFrame(() => {
    loaded.value = true
  })
})

function withBase(path) {
  return '/ai-competency-book' + path
}
</script>

<template>
  <section class="custom-hero" :class="{ loaded }">
    <!-- Ambient background blobs -->
    <div class="hero-bg">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="blob blob-3"></div>
    </div>

    <div class="hero-inner">
      <!-- Left: Text -->
      <div class="hero-text">
        <h1 class="hero-name">
          <span class="name-char" style="--i:0">A</span><span class="name-char" style="--i:1">I</span><span class="name-char" style="--i:2">素</span><span class="name-char" style="--i:3">养</span>
        </h1>
        <p class="hero-subtitle">大学生的第一本人工智能启蒙书</p>
        <p class="hero-tagline">AI时代，答案不再稀缺。真正稀缺的是提出好问题、组织好信息、判断好结果、承担好责任的人。</p>
        <div class="hero-actions">
          <a :href="withBase('/preface')" class="btn-primary">开始阅读</a>
          <a :href="withBase('/part1/chapter1')" class="btn-secondary">查看目录</a>
        </div>
      </div>

      <!-- Right: Book cover -->
      <div class="hero-visual">
        <div class="book-stage">
          <!-- Decorative ring -->
          <div class="orbit-ring"></div>
          <!-- The book image with animated gradient border -->
          <div class="book-frame">
            <img :src="withBase('/images/book_cover3.png')" alt="AI素养" />
          </div>
          <!-- Floating accent particles -->
          <div class="particle p1"></div>
          <div class="particle p2"></div>
          <div class="particle p3"></div>
          <div class="particle p4"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.custom-hero {
  position: relative;
  overflow: hidden;
  padding: 80px 24px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ========================================
   Ambient background
   ======================================== */
.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0;
  transition: opacity 1.5s ease;
}

.loaded .blob {
  opacity: 1;
}

.blob-1 {
  width: 600px;
  height: 600px;
  top: -15%;
  right: -5%;
  background: radial-gradient(circle, rgba(185, 137, 69, 0.12) 0%, transparent 70%);
  animation: blobDrift1 18s ease-in-out infinite;
}

.blob-2 {
  width: 500px;
  height: 500px;
  bottom: -10%;
  left: -8%;
  background: radial-gradient(circle, rgba(37, 59, 54, 0.08) 0%, transparent 70%);
  animation: blobDrift2 22s ease-in-out infinite;
}

.blob-3 {
  width: 350px;
  height: 350px;
  top: 40%;
  left: 45%;
  background: radial-gradient(circle, rgba(185, 137, 69, 0.06) 0%, transparent 70%);
  animation: blobDrift3 15s ease-in-out infinite;
}

@keyframes blobDrift1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(-40px, 30px) scale(1.05); }
  66% { transform: translate(20px, -20px) scale(0.95); }
}

@keyframes blobDrift2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -25px) scale(1.08); }
  66% { transform: translate(-20px, 15px) scale(0.96); }
}

@keyframes blobDrift3 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-30px, 20px) scale(1.1); }
}

/* ========================================
   Layout
   ======================================== */
.hero-inner {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 60px;
}

/* ========================================
   Text side
   ======================================== */
.hero-text {
  flex: 1;
  min-width: 0;
}

.hero-name {
  font-family: 'Noto Serif SC', serif;
  font-size: 5rem;
  font-weight: 900;
  line-height: 1.1;
  margin: 0 0 1rem;
  letter-spacing: 0.06em;
}

.name-char {
  display: inline-block;
  background: linear-gradient(135deg, #253B36 0%, #B98945 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0;
  transform: translateY(30px) rotateX(40deg);
  transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transition-delay: calc(var(--i) * 0.1s + 0.3s);
}

.loaded .name-char {
  opacity: 1;
  transform: translateY(0) rotateX(0deg);
}

.hero-subtitle {
  font-family: 'Noto Serif SC', serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--ai-color-mo, #253B36);
  margin: 0 0 1.25rem;
  letter-spacing: 0.04em;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.7s ease 0.7s;
}

.loaded .hero-subtitle {
  opacity: 1;
  transform: translateY(0);
}

.hero-tagline {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 1.05rem;
  line-height: 1.9;
  color: var(--vp-c-text-2, #3d5a53);
  margin: 0 0 2rem;
  max-width: 460px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.7s ease 0.9s;
}

.loaded .hero-tagline {
  opacity: 1;
  transform: translateY(0);
}

.hero-actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.7s ease 1.1s;
}

.loaded .hero-actions {
  opacity: 1;
  transform: translateY(0);
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 46px;
  padding: 0 30px;
  background: linear-gradient(135deg, var(--ai-color-zhe, #B98945) 0%, #a87a3d 100%);
  color: #fff !important;
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  border-radius: 10px;
  text-decoration: none !important;
  box-shadow: 0 4px 16px rgba(185, 137, 69, 0.3);
  transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  border-bottom: none !important;
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 28px rgba(185, 137, 69, 0.4);
  background: linear-gradient(135deg, #a87a3d 0%, #976c35 100%);
  border-bottom: none !important;
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 46px;
  padding: 0 30px;
  background: transparent;
  color: var(--ai-color-mo, #253B36) !important;
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  border-radius: 10px;
  border: 1.5px solid var(--ai-color-mo, #253B36);
  text-decoration: none !important;
  transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  border-bottom: 1.5px solid var(--ai-color-mo, #253B36) !important;
}

.btn-secondary:hover {
  background: var(--ai-color-mo, #253B36);
  color: #fff !important;
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(37, 59, 54, 0.2);
  border-bottom: 1.5px solid var(--ai-color-mo, #253B36) !important;
}

/* ========================================
   Visual side - Book stage
   ======================================== */
.hero-visual {
  flex-shrink: 0;
  width: 580px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.book-stage {
  position: relative;
  width: 580px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Orbit ring */
.orbit-ring {
  position: absolute;
  width: 560px;
  height: 560px;
  top: 50%;
  left: 50%;
  margin-top: -280px;
  margin-left: -280px;
  border: 1.5px dashed rgba(185, 137, 69, 0.15);
  border-radius: 50%;
  animation: orbitSpin 40s linear infinite;
  opacity: 0;
  transition: opacity 1s ease 0.5s;
}

.loaded .orbit-ring {
  opacity: 1;
}

@keyframes orbitSpin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Book frame - animated gradient border */
.book-frame {
  position: relative;
  z-index: 2;
  padding: 3px;
  border-radius: 18px;
  background: linear-gradient(135deg, var(--ai-color-wu, #D7D2C6), var(--ai-color-wu, #D7D2C6));
  opacity: 0;
  transform: translateY(40px) scale(0.9);
  transition: opacity 0.8s ease 0.4s, transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s;
  animation: none;
}

.loaded .book-frame {
  opacity: 1;
  transform: translateY(0) scale(1);
  animation: bookFloat 5s ease-in-out 1.5s infinite;
}

/* Spinning gradient glow behind the book */
.book-frame::before {
  content: '';
  position: absolute;
  inset: -3px;
  border-radius: 20px;
  background: conic-gradient(
    from 0deg,
    var(--ai-color-zhe, #B98945),
    var(--ai-color-mo, #253B36),
    var(--ai-color-wu, #D7D2C6),
    var(--ai-color-zhe, #B98945),
    transparent,
    var(--ai-color-mo, #253B36),
    var(--ai-color-zhe, #B98945)
  );
  animation: borderSpin 6s linear infinite;
  z-index: -1;
  opacity: 0.7;
  transition: opacity 0.4s ease;
}

.book-frame:hover::before {
  opacity: 1;
}

/* Soft outer glow pulse */
.book-frame::after {
  content: '';
  position: absolute;
  inset: -8px;
  border-radius: 24px;
  background: conic-gradient(
    from 180deg,
    var(--ai-color-zhe, #B98945),
    transparent,
    var(--ai-color-mo, #253B36),
    transparent,
    var(--ai-color-zhe, #B98945)
  );
  animation: borderSpin 6s linear infinite reverse;
  z-index: -2;
  opacity: 0.15;
  filter: blur(12px);
}

@keyframes borderSpin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.book-frame img {
  display: block;
  width: 540px;
  max-width: none;
  height: auto;
  object-fit: contain;
  border-radius: 16px;
  position: relative;
  z-index: 1;
  transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.book-frame:hover img {
  transform: scale(1.02);
}

@keyframes bookFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-14px); }
}

/* Floating particles */
.particle {
  position: absolute;
  border-radius: 50%;
  z-index: 1;
  opacity: 0;
  transition: opacity 1s ease 1.2s;
}

.loaded .particle {
  opacity: 1;
}

.p1 {
  width: 8px;
  height: 8px;
  background: var(--ai-color-zhe, #B98945);
  top: 12%;
  right: 10%;
  animation: particleFloat1 6s ease-in-out infinite;
}

.p2 {
  width: 6px;
  height: 6px;
  background: var(--ai-color-mo, #253B36);
  opacity: 0.5;
  bottom: 18%;
  left: 8%;
  animation: particleFloat2 8s ease-in-out infinite;
}

.p3 {
  width: 10px;
  height: 10px;
  border: 2px solid var(--ai-color-zhe, #B98945);
  background: transparent;
  top: 30%;
  left: 5%;
  animation: particleFloat3 7s ease-in-out infinite;
}

.p4 {
  width: 5px;
  height: 5px;
  background: var(--ai-color-zhe, #B98945);
  opacity: 0.4;
  bottom: 30%;
  right: 5%;
  animation: particleFloat1 9s ease-in-out 2s infinite;
}

@keyframes particleFloat1 {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(10px, -15px); }
  50% { transform: translate(-5px, -25px); }
  75% { transform: translate(8px, -10px); }
}

@keyframes particleFloat2 {
  0%, 100% { transform: translate(0, 0); }
  33% { transform: translate(-12px, -18px); }
  66% { transform: translate(8px, -8px); }
}

@keyframes particleFloat3 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  50% { transform: translate(15px, -20px) rotate(180deg); }
}

/* ========================================
   Dark mode
   ======================================== */
.dark .hero-name .name-char {
  background: linear-gradient(135deg, #d4a85a 0%, #e8e4da 100%);
  -webkit-background-clip: text;
  background-clip: text;
}

.dark .hero-subtitle {
  color: var(--vp-c-text-1, #e8e4da);
}

.dark .btn-secondary {
  border-color: var(--vp-c-text-1, #e8e4da);
  color: var(--vp-c-text-1, #e8e4da) !important;
}

.dark .btn-secondary:hover {
  background: var(--vp-c-text-1, #e8e4da);
  color: var(--ai-color-mo, #253B36) !important;
}

.dark .orbit-ring {
  border-color: rgba(212, 168, 90, 0.12);
}

/* ========================================
   Responsive
   ======================================== */
@media (max-width: 960px) {
  .custom-hero {
    padding: 80px 24px 24px;
  }

  .hero-inner {
    flex-direction: column;
    text-align: center;
    gap: 30px;
  }

  .hero-tagline {
    max-width: 100%;
  }

  .hero-actions {
    justify-content: center;
  }

  .hero-visual {
    width: 100%;
    max-width: 460px;
  }

  .book-stage {
    width: 100%;
    height: auto;
  }

  .book-frame img {
    width: 380px;
  }

  .hero-name {
    font-size: 3.5rem;
  }

  .orbit-ring {
    width: 420px;
    height: 420px;
    margin-top: -210px;
    margin-left: -210px;
  }
}

@media (max-width: 640px) {
  .custom-hero {
    padding: 72px 16px 16px;
  }

  .hero-name {
    font-size: 2.8rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .book-frame img {
    width: 280px;
  }

  .orbit-ring {
    width: 320px;
    height: 320px;
    margin-top: -160px;
    margin-left: -160px;
  }
}
</style>
