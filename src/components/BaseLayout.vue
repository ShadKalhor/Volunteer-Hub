<template>
  <Transition
    enter-active-class="transition-opacity duration-500"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-500"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="!isLoading" class="min-h-screen flex flex-col">
      <header class="bg-white dark:bg-gray-800 shadow-sm">
        <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex">
              <div class="flex-shrink-0 flex items-center">
                <router-link to="/" class="text-xl font-bold text-blue-600">
                  VolunteerHub
                </router-link>
              </div>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <router-link
                v-for="item in navigation"
                :key="item.name"
                :to="item.href"
                class="inline-flex items-center px-1 pt-1 text-sm font-medium"
                :class="[
                  $route.path === item.href
                    ? 'border-b-2 border-blue-500 text-gray-900 dark:text-white'
                    : 'text-gray-500 hover:border-b-2 hover:border-gray-300 dark:text-gray-300'
                ]"
              >
                {{ item.name }}
              </router-link>
            </div>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:items-center">
            <router-link
              to="/login"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </router-link>
          </div>
        </div>
      </nav>
    </header>

    <main class="flex-1">
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <router-view />
      </div>
    </main>

    <footer class="bg-white dark:bg-gray-800">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8 md:flex md:items-center md:justify-between">
          <div class="flex space-x-6 md:order-2">
            <a href="#" class="text-gray-400 hover:text-gray-500">
              <span class="sr-only">GitHub</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fill-rule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
          </div>
          <p class="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
            &copy; 2024 VolunteerHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
  </Transition>
  
  <div v-if="isLoading" class="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900">
    <LoadingSpinner size="large" text="Loading..." />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import LoadingSpinner from './LoadingSpinner.vue'

const isLoading = ref(true)

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Events', href: '/events' },
  { name: 'Organizations', href: '/organizations' },
]

onMounted(() => {
  // Simulate initial loading time
  setTimeout(() => {
    isLoading.value = false
  }, 1500) // 1.5 seconds delay
})
</script>