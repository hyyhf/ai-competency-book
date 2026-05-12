<template>
  <div class="think-container">
    <div class="think-header">
      <span class="think-icon">&#9672;</span>
      <span class="think-label">{{ title || '思考练习' }}</span>
    </div>
    <p class="think-question">{{ question }}</p>
    <div v-if="!showHint" class="think-actions">
      <button class="think-btn" @click="showHint = true">
        {{ btnText || '看看提示' }}
      </button>
    </div>
    <transition name="slide">
      <div v-if="showHint" class="think-hint">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  title: String,
  question: String,
  btnText: String
})

const showHint = ref(false)
</script>

<style scoped>
.think-container {
  border: 1px solid rgba(37, 59, 54, 0.18);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 2rem 0;
  background: linear-gradient(135deg, rgba(37, 59, 54, 0.04), rgba(185, 137, 69, 0.03));
}
.think-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 1rem;
}
.think-icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, #253B36, #3a5a52);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
}
.think-label {
  font-family: 'Noto Serif SC', serif;
  font-weight: 600;
  color: #253B36;
  font-size: 1rem;
}
.dark .think-label { color: #e8e4da; }
.think-question {
  font-size: 1.05rem;
  line-height: 1.8;
  color: #333;
  margin-bottom: 1rem;
}
.dark .think-question { color: #ccc; }
.think-btn {
  padding: 0.5rem 1.5rem;
  border: 1px solid #253B36;
  border-radius: 8px;
  background: transparent;
  color: #253B36;
  font-size: 0.9rem;
  cursor: pointer;
  font-family: 'Noto Sans SC', sans-serif;
  transition: all 0.2s ease;
}
.dark .think-btn {
  border-color: #7bc9a4;
  color: #7bc9a4;
}
.think-btn:hover {
  background: #253B36;
  color: #fff;
}
.think-hint {
  padding: 1rem;
  border-radius: 8px;
  background: rgba(37, 59, 54, 0.06);
  border: 1px solid rgba(37, 59, 54, 0.12);
  font-size: 0.95rem;
  line-height: 1.8;
  color: #444;
}
.dark .think-hint {
  background: rgba(37, 59, 54, 0.25);
  color: #ccc;
  border-color: rgba(215, 210, 198, 0.15);
}
.slide-enter-active {
  transition: all 0.3s ease;
}
.slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
