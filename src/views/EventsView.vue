<template>
  <Transition
    enter-active-class="transition-opacity duration-500"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-500"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="!isLoading" class="py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
          <h2 class="text-base text-blue-600 font-semibold tracking-wide uppercase">Opportunities</h2>
          <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Upcoming Events
          </p>
        <p class="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
          Find and sign up for volunteer events in your area
        </p>
      </div>

      <!-- Event Grid -->
      <div class="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
        <div v-for="n in 3" :key="n" class="flex flex-col rounded-lg shadow-lg overflow-hidden">
          <div class="flex-shrink-0">
            <img class="h-48 w-full object-cover" src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" alt="" />
          </div>
          <div class="flex-1 bg-white dark:bg-gray-800 p-6 flex flex-col justify-between">
            <div class="flex-1">
              <p class="text-sm font-medium text-blue-600">
                <a href="#" class="hover:underline">
                  Food Bank
                </a>
              </p>
              <a href="#" class="block mt-2">
                <p class="text-xl font-semibold text-gray-900 dark:text-white">Food Drive</p>
                <p class="mt-3 text-base text-gray-500 dark:text-gray-300">
                  Help sort and distribute food to families in need.
                </p>
              </a>
            </div>
            <div class="mt-6 flex items-center">
              <div class="flex-shrink-0">
                <span class="sr-only">Date</span>
                <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Nov 15, 2024
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </Transition>

  <div v-if="isLoading" class="flex items-center justify-center min-h-[60vh]">
    <LoadingSpinner size="large" text="Loading events..." />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'

const isLoading = ref(true)

onMounted(async () => {
  // Simulate loading events
  await new Promise(resolve => setTimeout(resolve, 1000))
  isLoading.value = false
})
</script>