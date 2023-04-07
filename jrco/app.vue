<template>
<div class="flex flex-col h-screen ">
  <header class="fixed top w-full z-[100]">
    <NavigationNavbar/>
  </header>
  <main class="flex-grow mt-24">
    <NuxtPage/>
  </main>
  <footer class="">
    <LazyNavigationFooter/>
  </footer>
</div>
</template>