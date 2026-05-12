<template>
  <div class="quiz-container">
    <div class="quiz-header">
      <span class="quiz-icon">?</span>
      <span class="quiz-label">章节自测</span>
    </div>
    <p class="quiz-question">{{ question }}</p>
    <div class="quiz-options">
      <button
        v-for="(opt, i) in options"
        :key="i"
        class="quiz-option"
        :class="{
          'correct': revealed && opt === answer,
          'wrong': revealed && selected === opt && opt !== answer,
          'selected': selected === opt && !revealed
        }"
        @click="select(opt)"
        :disabled="revealed"
      >
        <span class="option-letter">{{ letters[i] }}</span>
        {{ opt }}
      </button>
    </div>
    <div v-if="revealed" class="quiz-explain">
      <p class="explain-status" :class="isCorrect ? 'correct' : 'wrong'">
        {{ isCorrect ? 'Correct!' : 'Not quite.' }}
      </p>
      <p class="explain-text">{{ explain }}</p>
    </div>
    <button v-if="selected && !revealed" class="quiz-submit" @click="reveal">
      确认答案
    </button>
    <button v-if="revealed" class="quiz-reset" @click="reset">
      重新作答
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  question: String,
  options: Array,
  answer: String,
  explain: { type: String, default: '' }
})

const letters = ['A', 'B', 'C', 'D', 'E']
const selected = ref(null)
const revealed = ref(false)
const isCorrect = computed(() => selected.value === props.answer)

function select(opt) {
  if (!revealed.value) selected.value = opt
}
function reveal() {
  revealed.value = true
}
function reset() {
  selected.value = null
  revealed.value = false
}
</script>

<style scoped>
.quiz-container {
  border: 1px solid rgba(185, 137, 69, 0.25);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 2rem 0;
  background: linear-gradient(135deg, rgba(185, 137, 69, 0.06), rgba(37, 59, 54, 0.04));
}
.quiz-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 1rem;
}
.quiz-icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: #B98945;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
}
.quiz-label {
  font-family: 'Noto Serif SC', serif;
  font-weight: 600;
  color: #B98945;
  font-size: 1rem;
}
.quiz-question {
  font-size: 1.05rem;
  font-weight: 500;
  color: #253B36;
  margin-bottom: 1rem;
  line-height: 1.7;
}
.dark .quiz-question { color: #e8e4da; }
.quiz-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.quiz-option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0.7rem 1rem;
  border: 1px solid #D7D2C6;
  border-radius: 8px;
  background: rgba(247, 243, 234, 0.6);
  cursor: pointer;
  font-size: 0.95rem;
  color: #253B36;
  transition: all 0.2s ease;
  text-align: left;
  font-family: 'Noto Sans SC', sans-serif;
}
.dark .quiz-option {
  background: rgba(37, 59, 54, 0.3);
  border-color: rgba(215, 210, 198, 0.2);
  color: #e8e4da;
}
.quiz-option:hover:not(:disabled) {
  border-color: #B98945;
  background: rgba(185, 137, 69, 0.1);
}
.quiz-option.selected {
  border-color: #B98945;
  background: rgba(185, 137, 69, 0.12);
  font-weight: 500;
}
.quiz-option.correct {
  border-color: #4a8c6f;
  background: rgba(74, 140, 111, 0.12);
  color: #2d6a4f;
}
.dark .quiz-option.correct { color: #7bc9a4; }
.quiz-option.wrong {
  border-color: #c44e4e;
  background: rgba(196, 78, 78, 0.08);
  color: #a33;
  text-decoration: line-through;
}
.dark .quiz-option.wrong { color: #e88; }
.option-letter {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #D7D2C6;
  color: #253B36;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
  flex-shrink: 0;
}
.quiz-explain {
  margin-top: 1rem;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  background: rgba(247, 243, 234, 0.8);
  border: 1px solid #D7D2C6;
}
.dark .quiz-explain {
  background: rgba(37, 59, 54, 0.3);
  border-color: rgba(215, 210, 198, 0.15);
}
.explain-status {
  font-weight: 700;
  margin-bottom: 0.3rem;
}
.explain-status.correct { color: #2d6a4f; }
.explain-status.wrong { color: #a33; }
.dark .explain-status.correct { color: #7bc9a4; }
.dark .explain-status.wrong { color: #e88; }
.explain-text {
  font-size: 0.93rem;
  line-height: 1.7;
  color: #555;
}
.dark .explain-text { color: #bbb; }
.quiz-submit, .quiz-reset {
  margin-top: 1rem;
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  font-family: 'Noto Sans SC', sans-serif;
  transition: all 0.2s ease;
}
.quiz-submit {
  background: #B98945;
  color: #fff;
}
.quiz-submit:hover { background: #a87a3d; }
.quiz-reset {
  background: transparent;
  border: 1px solid #D7D2C6;
  color: #666;
}
.quiz-reset:hover { border-color: #B98945; color: #B98945; }
</style>
