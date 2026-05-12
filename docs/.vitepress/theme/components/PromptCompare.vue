<template>
  <div class="compare-container">
    <div class="compare-header">
      <span class="compare-icon">&harr;</span>
      <span class="compare-label">{{ title || '对比实验' }}</span>
    </div>
    <div class="compare-tabs">
      <button
        class="compare-tab"
        :class="{ active: activeTab === 'bad' }"
        @click="activeTab = 'bad'"
      >
        {{ badLabel || '普通写法' }}
      </button>
      <button
        class="compare-tab"
        :class="{ active: activeTab === 'good' }"
        @click="activeTab = 'good'"
      >
        {{ goodLabel || '优化写法' }}
      </button>
    </div>
    <div class="compare-content">
      <transition name="fade" mode="out-in">
        <div v-if="activeTab === 'bad'" key="bad" class="compare-panel bad">
          <slot name="bad" />
        </div>
        <div v-else key="good" class="compare-panel good">
          <slot name="good" />
        </div>
      </transition>
    </div>
    <p class="compare-hint" v-if="activeTab === 'good' && hint">
      {{ hint }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  title: String,
  badLabel: String,
  goodLabel: String,
  hint: String
})

const activeTab = ref('bad')
</script>

<style scoped>
.compare-container {
  border: 1px solid rgba(37, 59, 54, 0.15);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 2rem 0;
  background: linear-gradient(135deg, rgba(37, 59, 54, 0.03), rgba(185, 137, 69, 0.04));
}
.compare-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 1rem;
}
.compare-icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: #253B36;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1rem;
}
.compare-label {
  font-family: 'Noto Serif SC', serif;
  font-weight: 600;
  color: #253B36;
  font-size: 1rem;
}
.dark .compare-label { color: #e8e4da; }
.compare-tabs {
  display: flex;
  gap: 0;
  margin-bottom: 1rem;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #D7D2C6;
}
.compare-tab {
  flex: 1;
  padding: 0.55rem 1rem;
  border: none;
  background: rgba(247, 243, 234, 0.5);
  cursor: pointer;
  font-size: 0.9rem;
  color: #666;
  font-family: 'Noto Sans SC', sans-serif;
  transition: all 0.2s ease;
}
.dark .compare-tab {
  background: rgba(37, 59, 54, 0.3);
  color: #aaa;
}
.compare-tab.active {
  background: #253B36;
  color: #fff;
  font-weight: 600;
}
.compare-content {
  min-height: 80px;
}
.compare-panel {
  padding: 1rem;
  border-radius: 8px;
  font-size: 0.95rem;
  line-height: 1.8;
}
.compare-panel.bad {
  background: rgba(196, 78, 78, 0.06);
  border: 1px dashed rgba(196, 78, 78, 0.3);
}
.compare-panel.good {
  background: rgba(74, 140, 111, 0.06);
  border: 1px dashed rgba(74, 140, 111, 0.3);
}
.compare-hint {
  margin-top: 0.8rem;
  font-size: 0.88rem;
  color: #2d6a4f;
  padding: 0.5rem 0.8rem;
  background: rgba(74, 140, 111, 0.08);
  border-radius: 6px;
}
.dark .compare-hint { color: #7bc9a4; }
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
