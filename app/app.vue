<script setup>
useHead({
  meta: [
    {
      name: "mailru-domain",
      content: "wxnnsnigYdZwQSET",
    },
  ],
});
</script>

<template>
  <div class="flex h-svh flex-col bg-gray-50">
    <Header class="sticky top-0 z-50 bg-white shadow-md"></Header>

    <div class="flex grow flex-col overflow-y-auto">
      <main class="container mx-auto grow py-2 md:px-4 md:py-6">
        <NuxtPage />
      </main>
      <TheFooter />
    </div>

    <MobileNav />
  </div>
</template>
