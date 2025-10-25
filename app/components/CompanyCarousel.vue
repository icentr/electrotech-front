<script setup>
import Company1 from "@/assets/Company1.jpg";
import Company2 from "@/assets/Company2.jpg";
import Company3 from "@/assets/Company3.jpg";
import Company4 from "@/assets/Company4.jpg";
import Company5 from "@/assets/Company5.jpg";

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

const gotoSlide = (slide) => {
    currentSlideIndex.value = slides.indexOf(slide);
};

const currentSlide = computed(() => slides[currentSlideIndex.value]);
</script>
<template>
    <div class="flex flex-col gap-4">
        <div class="flex justify-center">
            <img :src="currentSlide.image" alt="" />
        </div>
        <div class="flex gap-2 justify-center">
            <img
                @click="() => gotoSlide(slide)"
                class="w-20 h-20 rounded-md border-2"
                v-for="slide in slides"
                :src="slide.image"
                :alt="slide.alt"
                :class="currentSlide == slide ? 'border-black' : 'border-white'" />
        </div>
    </div>
</template>
