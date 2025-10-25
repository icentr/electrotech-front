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
    },
    {
        image: Company2,
        alt: "Company 2",
    },
    {
        image: Company3,
        alt: "Company 3",
    },
    {
        image: Company4,
        alt: "Company 4",
    },
    {
        image: Company5,
        alt: "Company 5",
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

onMounted(() => {
    startAutoPlay();
});

onUnmounted(() => {
    stopAutoPlay();
});
</script>

<template>
    <div class="flex flex-col gap-6 relative max-w-4xl mx-auto p-4">
        <!-- Основное изображение с кнопками -->
        <div class="relative group rounded-2xl overflow-hidden shadow-2xl bg-gray-100">
            <div class="aspect-video relative">
                <img :src="currentSlide.image" :alt="currentSlide.alt" class="w-full h-full object-cover" @mouseenter="stopAutoPlay" @mouseleave="startAutoPlay" />

                <!-- Затемнение для текста -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>

                <!-- Номер слайда -->
                <div class="absolute top-4 right-6 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">{{ currentSlideIndex + 1 }} / {{ slides.length }}</div>

                <!-- Кнопка "Предыдущий" -->
                <button
                    @click="prevSlide"
                    class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-xl shadow-2xl transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 hover:shadow-xl active:scale-95"
                    @mouseenter="stopAutoPlay"
                    @mouseleave="startAutoPlay">
                    <ChevronLeftIcon class="w-6 h-6" />
                </button>

                <!-- Кнопка "Следующий" -->
                <button
                    @click="nextSlide"
                    class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-xl shadow-2xl transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 hover:shadow-xl active:scale-95"
                    @mouseenter="stopAutoPlay"
                    @mouseleave="startAutoPlay">
                    <ChevronRightIcon class="w-6 h-6" />
                </button>
            </div>
        </div>

        <!-- Миниатюры -->
        <div class="flex gap-3 justify-center px-4">
            <div v-for="(slide, index) in slides" :key="index" class="relative group cursor-pointer" @click="gotoSlide(slide)" @mouseenter="stopAutoPlay" @mouseleave="startAutoPlay">
                <img
                    class="w-16 h-16 rounded-xl object-cover border-3 transition-all duration-300 hover:scale-110 active:scale-105 shadow-lg"
                    :src="slide.image"
                    :alt="slide.alt"
                    :class="currentSlideIndex === index ? 'border-accent scale-110 shadow-blue-500/20 ring-2 ring-accent' : 'border-gray-200 hover:border-gray-300'" />
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Плавные переходы для изображений */
img {
    transition: transform 0.5s ease, opacity 0.5s ease;
}

/* Кастомная тень */
.shadow-2xl {
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Градиент для улучшения читаемости текста */
.bg-gradient-to-t {
    background: linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, transparent 50%, transparent 100%);
}

/* Анимация для прогресс-бара */
@keyframes progress {
    from {
        width: 100%;
    }
    to {
        width: 0%;
    }
}

.progress-animation {
    animation: progress 10s linear;
}
</style>
