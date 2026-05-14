<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import HomeFeatures from './HomeFeatures.vue'
import CustomHero from './CustomHero.vue'

const { Layout } = DefaultTheme
const { frontmatter } = useData()
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
</template>
