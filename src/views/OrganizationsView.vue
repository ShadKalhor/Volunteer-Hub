<template>
  <div class="py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="lg:text-center">
        <h2 class="text-base text-blue-600 font-semibold tracking-wide uppercase">Partners</h2>
        <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Our Organizations
        </p>
        <p class="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
          Connect with local organizations making a difference
        </p>
      </div>

      <div class="mt-10">
        <div class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
          <div v-for="n in 4" :key="n" class="relative">
            <div class="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <div class="text-center">
                <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white">Food Bank</h3>
                <p class="mt-2 text-base text-gray-500 dark:text-gray-400">
                  Supporting our community by providing food assistance to those in need.
                </p>
              </div>
              <div class="mt-4 flex justify-center">
                <a
                  href="#"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                  View Events
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>