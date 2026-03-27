<template>
  <div class="flex h-svh flex-col bg-gray-50">
    <TheHeader class="sticky top-0 z-50 bg-white shadow-md" />

    <div class="flex grow flex-col overflow-y-auto">
      <main class="container mx-auto grow py-2 md:px-4 md:py-6">
        <NuxtPage />
      </main>
      <TheFooter />
    </div>

    <MobileNav />
  </div>

  <!-- Yandex.Metrika counter -->
  <noscript
    ><div>
      <img
        src="https://mc.yandex.ru/watch/108255404"
        style="position: absolute; left: -9999px"
        alt=""
      /></div
  ></noscript>
  <!-- /Yandex.Metrika counter -->
</template>
