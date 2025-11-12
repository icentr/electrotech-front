<script setup>
useHead({
  title: "ЭлектроТех",
});
import {
  ArrowRightIcon,
  BoltIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  CpuChipIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  LinkIcon,
  ListBulletIcon,
  PhoneIcon,
  PowerIcon,
} from "@heroicons/vue/16/solid";
import {
  PHONE_NUMBER,
  PHONE_NUMBER_NORMALIZED,
  EMAIL,
  COMPANY_INN,
  COMPANY_KPP,
  ADVANTAGES,
} from "~/data";

const PREVIEW_CATEGORIES = [
  {
    title: "Выключатели",
    description: "Защита электроцепей от перегрузок и КЗ",
    icon: PowerIcon,
  },
  {
    title: "Блоки питания",
    description: "Стабилизированные источники питания",
    icon: BoltIcon,
  },
  {
    title: "Клеммы и соединители",
    description: "Надёжные решения для монтажа",
    icon: LinkIcon,
  },
  {
    title: "Промышленные контроллеры",
    description: "Широкий выбор для автоматизации",
    icon: CpuChipIcon,
  },
];
</script>
<template>
  <div class="bg-gray-50">
    <!-- Герой-секция с акцентом на ваши товары -->
    <section class="hero-gradient text-white">
      <div class="container mx-auto px-4 py-20 md:py-28">
        <div class="flex flex-col items-center md:flex-row">
          <div class="mb-12 md:mb-0 md:w-1/2">
            <div
              class="bg-opacity-20 mb-6 inline-block rounded-full bg-white px-5 py-1.5"
            >
              <span class="text-accent text-sm font-medium tracking-wide"
                >БЕСПЛАТНАЯ ДОСТАВКА ДО ТК</span
              >
            </div>
            <h1 class="mb-6 text-4xl leading-tight font-bold md:text-5xl">
              КОМПЛЕКТУЮЩИЕ ДЛЯ ПРОМЫШЛЕННОЙ ЭЛЕКТРОТЕХНИКИ
            </h1>
            <p class="mb-8 max-w-lg text-xl opacity-90">
              Автоматические выключатели, блоки питания, клеммы, контроллеры и
              другие электротехнические компоненты для предприятий
            </p>

            <div
              class="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
            >
              <a
                href="#contact-form"
                class="text-accent flex items-center justify-center rounded-lg bg-white px-8 py-4 font-bold shadow-md transition duration-300 hover:bg-gray-100 hover:shadow-lg"
              >
                <PhoneIcon class="me-3 size-6" />
                ЗАКАЗАТЬ ЗВОНОК
              </a>
              <RouterLink
                to="catalog"
                class="hover:text-accent flex items-center justify-center rounded-lg border-2 border-white bg-transparent px-8 py-4 font-bold text-white transition duration-300 hover:bg-white hover:shadow-lg"
              >
                <ListBulletIcon class="mr-3 size-6" />
                СМОТРЕТЬ КАТАЛОГ
              </RouterLink>
            </div>

            <div class="mt-10 flex flex-wrap gap-3">
              <div
                class="bg-opacity-20 flex items-center gap-2 rounded-full bg-white px-4 py-2 backdrop-blur-sm"
              >
                <CheckCircleIcon class="text-accent size-6" />
                <span class="text-accent text-sm">Собственный склад</span>
              </div>
              <div
                class="bg-opacity-20 flex items-center gap-2 rounded-full bg-white px-4 py-2 backdrop-blur-sm"
              >
                <CheckCircleIcon class="text-accent size-6" />
                <span class="text-accent text-sm">Оригинальные компоненты</span>
              </div>
              <div
                class="bg-opacity-20 flex items-center gap-2 rounded-full bg-white px-4 py-2 backdrop-blur-sm"
              >
                <CheckCircleIcon class="text-accent size-6" />
                <span class="text-accent text-sm"
                  >Техническая консультация</span
                >
              </div>
            </div>
          </div>

          <div class="relative md:w-1/2">
            <div
              class="bg-opacity-20 rounded-2xl bg-white p-3 shadow-2xl backdrop-blur-sm"
            >
              <div
                class="flex h-80 w-full items-center justify-center rounded-xl border-2 border-gray-200 bg-gray-100"
              >
                <img
                  src="assets/Logo_Index.PNG"
                  alt="Электротехника"
                  class="h-full w-full rounded-lg object-cover"
                />
              </div>
            </div>
            <div
              class="m-x-4 shadow-hard floating-phone absolute w-max rounded-xl border border-gray-100 bg-white p-4 text-gray-900 md:-right-6 md:-bottom-6 md:min-w-48 md:p-6"
            >
              <div class="mb-2 flex items-center">
                <div class="pulse-animation bg-accent mr-3 rounded-full p-2">
                  <PhoneIcon class="size-6 text-white" />
                </div>
                <span class="text-sm font-bold">Отдел продаж</span>
              </div>
              <a
                :href="'tel:' + PHONE_NUMBER_NORMALIZED"
                class="hover:text-accent text-lg font-bold"
                >{{ PHONE_NUMBER }}</a
              >
              <div class="mt-1 text-xs text-gray-500">Пн-Пт: 9:00-18:00</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Преимущества с вашими условиями -->
    <section class="bg-white py-16">
      <div class="container mx-auto px-4">
        <h2 class="mb-4 text-center text-3xl font-bold text-gray-900">
          НАШИ ПРЕИМУЩЕСТВА
        </h2>
        <p class="mx-auto mb-12 max-w-2xl text-center text-gray-600">
          Работаем с юридическими лицами по безналичному расчету
        </p>

        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div
            v-for="adv in ADVANTAGES"
            class="feature-card rounded-xl border border-gray-100 bg-gray-50 p-8 transition-all duration-300 hover:border-blue-200"
          >
            <div
              class="bg-opacity-10 bg-accent mb-6 flex h-14 w-14 items-center justify-center rounded-full"
            >
              <component :is="adv.icon" class="size-8 text-white" />
              <!-- <TruckIcon class="size-9 text-white" /> -->
            </div>
            <h3 class="mb-3 text-xl font-bold text-gray-900">
              {{ adv.title }}
            </h3>
            <p class="text-gray-600">
              {{ adv.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Популярные категории с вашими товарами -->
    <section class="bg-gray-50 py-16">
      <div class="container mx-auto px-4">
        <div
          class="mb-12 flex flex-col items-center justify-between md:flex-row"
        >
          <div>
            <h2 class="mb-2 text-3xl font-bold text-gray-900">
              КАТЕГОРИИ ТОВАРОВ
            </h2>
            <p class="text-gray-600">
              Широкий ассортимент электротехнических компонентов
            </p>
          </div>
          <a
            href="catalog"
            class="group text-accent hover:text-accent/80 mt-4 flex items-center font-medium md:mt-0"
          >
            <span
              class="group-hover:border-accent/80 border-b border-transparent transition-colors"
              >Весь каталог</span
            >
            <ArrowRightIcon
              class="ml-2 size-6 transition-transform group-hover:translate-x-1"
            />
          </a>
        </div>

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <a
            v-for="category in PREVIEW_CATEGORIES"
            href="catalog"
            class="group rounded-xl border border-transparent bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border hover:border-blue-600 hover:shadow-md"
          >
            <div
              class="text-accent group-hover:bg-accent bg-accent/20 mb-4 flex h-12 w-12 items-center justify-center rounded-lg transition-colors group-hover:text-white"
            >
              <component :is="category.icon" class="size-6" />
              <!-- <PowerIcon class="size-6" /> -->
            </div>
            <h3
              class="group-hover:text-accent mb-2 text-lg font-bold text-gray-900 transition-colors"
            >
              {{ category.title }}
            </h3>
            <p class="text-sm text-gray-600">
              {{ category.description }}
            </p>
            <div
              class="text-accent mt-4 flex items-center text-sm font-medium transition-colors"
            >
              Смотреть товары
              <ChevronRightIcon
                class="ml-2 size-5 transition-transform group-hover:translate-x-1"
              />
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- Баннер с призывом -->
    <section
      class="bg-gradient-to-r from-[#006699] to-[#0081b6] py-16 text-white"
    >
      <div class="container mx-auto px-4 text-center">
        <div class="mx-auto max-w-4xl">
          <h2 class="mb-6 text-3xl font-bold">
            НУЖНА КОНСУЛЬТАЦИЯ ПО ПОДБОРУ КОМПЛЕКТУЮЩИХ?
          </h2>
          <p class="mb-8 text-xl opacity-90">
            Наши специалисты помогут подобрать оптимальные решения для вашего
            предприятия
          </p>

          <div
            class="flex flex-col justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
          >
            <a
              :href="'tel:' + PHONE_NUMBER_NORMALIZED"
              class="text-accent flex items-center justify-center rounded-lg bg-white px-8 py-4 font-bold shadow-md transition duration-300 hover:bg-gray-100 hover:shadow-lg"
            >
              <PhoneIcon class="mr-3 size-6" />
              Позвонить сейчас
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Форма обратной связи -->
    <section id="contact-form" class="bg-white py-16">
      <div class="container mx-auto px-4">
        <div
          class="mx-auto max-w-4xl overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md"
        >
          <div class="md:flex">
            <div class="bg-accent p-4 text-white md:w-1/2 md:p-10">
              <h2 class="mb-4 text-2xl font-bold">КОНТАКТЫ</h2>
              <p class="mb-6 opacity-90">
                Оставьте заявку для получения коммерческого предложения
              </p>

              <div class="space-y-5">
                <div class="flex items-start">
                  <div
                    class="bg-opacity-30 mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-white"
                  >
                    <PhoneIcon class="text-accent size-6" />
                  </div>
                  <div>
                    <h3 class="text-sm font-bold text-blue-200">
                      Телефон отдела продаж
                    </h3>
                    <a
                      :href="'tel:' + PHONE_NUMBER_NORMALIZED"
                      class="text-lg font-medium hover:underline"
                      >{{ PHONE_NUMBER }}</a
                    >
                  </div>
                </div>
                <div class="flex items-start">
                  <div
                    class="bg-opacity-30 mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-white"
                  >
                    <EnvelopeIcon class="text-accent size-6" />
                  </div>
                  <div>
                    <h3 class="text-sm font-bold text-blue-200">
                      Email для заявок
                    </h3>
                    <a
                      :href="'mailto:' + EMAIL"
                      class="text-lg font-medium hover:underline"
                      >{{ EMAIL }}</a
                    >
                  </div>
                </div>
                <div class="flex items-start">
                  <div
                    class="bg-opacity-30 mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-white"
                  >
                    <DocumentTextIcon class="text-accent size-6" />
                  </div>
                  <div>
                    <h3 class="text-sm font-bold text-blue-200">Реквизиты</h3>
                    <p class="text-sm font-medium">
                      ИНН {{ COMPANY_INN }}, КПП {{ COMPANY_KPP }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="p-4 md:w-1/2 md:p-10">
              <form>
                <div class="mb-5">
                  <label
                    for="company"
                    class="mb-2 block font-medium text-gray-700"
                    >Название компании*</label
                  >
                  <input
                    type="text"
                    id="company"
                    class="focus:ring-opacity-50 w-full rounded-lg border border-gray-300 px-4 py-3 transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                    required
                  />
                </div>
                <div class="mb-5">
                  <label for="name" class="mb-2 block font-medium text-gray-700"
                    >Контактное лицо*</label
                  >
                  <input
                    type="text"
                    id="name"
                    class="focus:ring-opacity-50 w-full rounded-lg border border-gray-300 px-4 py-3 transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                    required
                  />
                </div>
                <div class="mb-5">
                  <label
                    for="phone"
                    class="mb-2 block font-medium text-gray-700"
                    >Телефон*</label
                  >
                  <input
                    type="tel"
                    id="phone"
                    class="focus:ring-opacity-50 w-full rounded-lg border border-gray-300 px-4 py-3 transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                    required
                  />
                </div>
                <div class="mb-6">
                  <label
                    for="message"
                    class="mb-2 block font-medium text-gray-700"
                    >Интересующие товары</label
                  >
                  <textarea
                    id="message"
                    rows="3"
                    class="focus:ring-opacity-50 w-full rounded-lg border border-gray-300 px-4 py-3 transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                    placeholder="Например: контроллеры ABB, клеммы WAGO..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  class="bg-accent hover:bg-accent/90 w-full rounded-lg px-8 py-4 font-bold text-white shadow-md transition duration-300 hover:shadow-lg"
                >
                  Получить коммерческое предложение
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");

body {
  font-family: "Inter", sans-serif;
}

.hero-gradient {
  background: linear-gradient(135deg, #006699 0%, #0081b6 100%);
}

.floating-phone {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-15px);
  }

  100% {
    transform: translateY(0px);
  }
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.pulse-animation {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
  }

  70% {
    box-shadow: 0 0 0 12px rgba(59, 130, 246, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
  }
}

.shadow-hard {
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.2),
    0 4px 6px -2px rgba(0, 0, 0, 0.1);
}
</style>
