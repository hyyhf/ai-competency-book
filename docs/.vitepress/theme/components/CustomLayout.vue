<script setup>
import { ref, provide } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import HomeFeatures from './HomeFeatures.vue'
import CustomHero from './CustomHero.vue'
import CinematicOverlay from './CinematicOverlay.vue'

const { Layout } = DefaultTheme
const { frontmatter } = useData()

// Shared cinematic overlay state
const showCinematic = ref(false)
const cinematicStartIndex = ref(0)
const cinematicMode = ref('slideshow')

function withBase(path) {
  return '/ai-competency-book' + path
}

const coverImages = [1,2,3,4,5,6,7].map(i => withBase(`/images/chapter_cover${i}.png`))
const coverTitles = [
  '重新认识AI', '学会提问', '学会学习', '学会判断',
  '学会组织信息', '学会使用工具', '学会安全行动'
]
const coverChapters = [
  '第 1-2 章', '第 3-5 章', '第 6-7 章', '第 8-9 章',
  '第 10-11 章', '第 12-13 章', '第 14-15 章'
]
const coverLinks = [
  '/part1/chapter1', '/part2/chapter3', '/part3/chapter6', '/part4/chapter8',
  '/part5/chapter10', '/part6/chapter12', '/part7/chapter14'
].map(p => withBase(p))

function openCinematic(startIndex = 0, mode = 'slideshow') {
  cinematicStartIndex.value = startIndex
  cinematicMode.value = mode
  showCinematic.value = true
}

function closeCinematic() {
  showCinematic.value = false
}

// Provide trigger function to child components
provide('openCinematic', openCinematic)
</script>

<template>
  <Layout>
    <template #home-hero-before>
      <CustomHero v-if="frontmatter.layout === 'home'" />
    </template>
    <template #home-features-after>
      <HomeFeatures v-if="frontmatter.layout === 'home'" />
    </template>
  </Layout>

  <!-- Global cinematic overlay -->
  <CinematicOverlay
    :show="showCinematic"
    :start-index="cinematicStartIndex"
    :mode="cinematicMode"
    :images="coverImages"
    :titles="coverTitles"
    :chapters="coverChapters"
    :links="coverLinks"
    @close="closeCinematic"
  />
</template>
