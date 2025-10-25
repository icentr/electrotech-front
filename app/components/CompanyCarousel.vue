<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/outline";

import Company1 from "@/assets/Company1.jpg";
import Company2 from "@/assets/Company2.jpg";
import Company3 from "@/assets/Company3.jpg";
import Company4 from "@/assets/Company4.jpg";
import Company5 from "@/assets/Company5.jpg";

const SLIDE_TIMEOUT = 10_000;

const slides = [
    {
        image: Company1,
        alt: "Company 1",
        description: "Description 1",
    },
    {
        image: Company2,
        alt: "Company 2",
        description: "Description 2",
    },
    {
        image: Company3,
        alt: "Company 3",
        description: "Description 3",
    },
    {
        image: Company4,
        alt: "Company 4",
        description: "Description 4",
    },
    {
        image: Company5,
        alt: "Company 5",
        description: "Description 5",
    },
];

const currentSlideIndex = ref(0);
let autoPlayInterval = null;

const gotoSlide = (slide) => {
    currentSlideIndex.value = slides.indexOf(slide);
};

const nextSlide = () => {
    currentSlideIndex.value = (currentSlideIndex.value + 1) % slides.length;
};

const prevSlide = () => {
    currentSlideIndex.value = (currentSlideIndex.value - 1 + slides.length) % slides.length;
};

const startAutoPlay = () => {
    autoPlayInterval = setInterval(nextSlide, SLIDE_TIMEOUT);
};

const stopAutoPlay = () => {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }
};

const currentSlide = computed(() => slides[currentSlideIndex.value]);

// Запускаем автоматическое пролистывание при монтировании компонента
onMounted(() => {
    startAutoPlay();
});

// Останавливаем при размонтировании
onUnmounted(() => {
    stopAutoPlay();
});
</script>

<template>
    <div class="flex flex-col gap-4 relative">
        <!-- Основное изображение с кнопками -->
        <div class="flex justify-center relative group">
            <img :src="currentSlide.image" :alt="currentSlide.alt" class="transition-opacity duration-300" @mouseenter="stopAutoPlay" @mouseleave="startAutoPlay" />

            <!-- Кнопка "Предыдущий" -->
            <button
                @click="prevSlide"
                class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                @mouseenter="stopAutoPlay"
                @mouseleave="startAutoPlay">
                <ChevronLeftIcon class="w-6 h-6 text-gray-800" />
            </button>

            <!-- Кнопка "Следующий" -->
            <button
                @click="nextSlide"
                class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                @mouseenter="stopAutoPlay"
                @mouseleave="startAutoPlay">
                <ChevronRightIcon class="w-6 h-6 text-gray-800" />
            </button>
        </div>

        <!-- Миниатюры -->
        <div class="flex gap-2 justify-center">
            <img
                @click="gotoSlide(slide)"
                class="w-20 h-20 rounded-md border-2 cursor-pointer transition-all hover:scale-105"
                v-for="slide in slides"
                :src="slide.image"
                :alt="slide.alt"
                :class="currentSlide == slide ? 'border-black scale-110' : 'border-white'"
                @mouseenter="stopAutoPlay"
                @mouseleave="startAutoPlay" />
        </div>
    </div>
</template>
