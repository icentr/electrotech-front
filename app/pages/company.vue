<script setup>
useHead({
  title: "О Компании",
});

import {
  ArchiveBoxIcon,
  ClockIcon,
  DocumentDuplicateIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  MapPinIcon,
  PercentBadgeIcon,
  PhoneIcon,
  TruckIcon,
  UserGroupIcon,
} from "@heroicons/vue/16/solid";
import {
  PHONE_NUMBER,
  PHONE_NUMBER_NORMALIZED,
  EMAIL,
  COMPANY_NAME,
  COMPANY_INN,
  COMPANY_KPP,
  ADDRESS,
} from "~/data";
</script>
<template>
  <div class="bg-gray-50 antialiased">
    <!-- Верхняя панель с контактами -->

    <!-- О компании -->
    <section class="bg-white py-16">
      <div class="container mx-auto px-4">
        <div class="mb-16 text-center">
          <h2 class="mb-4 text-4xl font-bold text-gray-900">
            О КОМПАНИИ {{ COMPANY_NAME }}
          </h2>
          <div class="mx-auto h-1 w-20 bg-blue-600"></div>
        </div>

        <div class="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div>
            <h3 class="mb-6 text-2xl font-bold text-gray-900">Наша миссия</h3>
            <p class="mb-6 text-lg leading-relaxed text-gray-600">
              Компания <span class="font-semibold">{{ COMPANY_NAME }}</span> уже
              более 10 лет является надежным поставщиком электротехнических
              компонентов для промышленных предприятий. Мы специализируемся
              проектирование и сборка НКУ любой сложности и конфигурации.
              <a
                class="text-blue-600 hover:text-blue-800 hover:underline active:underline"
                href="https://icentr.pro/"
                >Наш сайт</a
              >
            </p>
            <p class="mb-6 text-lg leading-relaxed text-gray-600">
              Наша цель - обеспечить предприятия качественными
              электротехническими компонентами, сократив их затраты на поиск и
              закупку оборудования.
            </p>
            <div class="flex flex-wrap gap-4">
              <div
                class="bg-accent rounded-full px-4 py-2 font-medium text-white"
              >
                Собственный склад
              </div>
              <div
                class="bg-accent rounded-full px-4 py-2 font-medium text-white"
              >
                Оригинальные компоненты
              </div>
              <div
                class="bg-accent rounded-full px-4 py-2 font-medium text-white"
              >
                Техническая поддержка
              </div>
              <a
                href="https://icentr.pro"
                class="bg-accent rounded-full px-4 py-2 font-medium text-white"
                >Собственное производство
              </a>
            </div>
            <!-- <div class="relative">
                    <div class="bg-gray-100 rounded-xl overflow-hidden shadow-lg">
                        <img src="https://icentr.pro/images/about-1.jpg" alt="О компании ICENTR.PRO" class="w-full h-auto">
                    </div>
                    <div class="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                        <div class="text-blue-600 text-4xl font-bold">10+</div>
                        <div class="text-gray-700 font-medium">лет на рынке</div>
                    </div>
                </div> -->
          </div>
        </div>
      </div>
    </section>

    <!-- Наши преимущества -->
    <section class="bg-gray-50 py-16">
      <div class="container mx-auto px-4">
        <div class="mb-16 text-center">
          <h2 class="mb-4 text-4xl font-bold text-gray-900">
            НАШИ ПРЕИМУЩЕСТВА
          </h2>
          <div class="mx-auto h-1 w-20 bg-blue-600"></div>
        </div>

        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div
            class="rounded-xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
          >
            <div class="text-accent mb-4 text-4xl">
              <ArchiveBoxIcon class="size-8" />
            </div>
            <h3 class="mb-3 text-xl font-bold text-gray-900">
              Собственный склад
            </h3>
            <p class="text-gray-600">
              Более 5000 наименований товаров в наличии на собственном складе в
              Москве
            </p>
          </div>

          <div
            class="rounded-xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
          >
            <div class="text-accent mb-4 text-4xl">
              <DocumentTextIcon class="size-8" />
            </div>
            <h3 class="mb-3 text-xl font-bold text-gray-900">
              Оригинальная продукция
            </h3>
            <p class="text-gray-600">
              Работаем только с официальными поставщиками, гарантируем
              подлинность продукции
            </p>
          </div>

          <div
            class="rounded-xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
          >
            <div class="text-accent mb-4 text-4xl">
              <TruckIcon class="size-8" />
            </div>
            <h3 class="mb-3 text-xl font-bold text-gray-900">
              Быстрая доставка
            </h3>
            <p class="text-gray-600">
              Доставка по Москве в день заказа, по России - от 1 дня
            </p>
          </div>

          <div
            class="rounded-xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
          >
            <div class="text-accent mb-4 text-4xl">
              <PercentBadgeIcon class="size-8" />
            </div>
            <h3 class="mb-3 text-xl font-bold text-gray-900">Гибкие условия</h3>
            <p class="text-gray-600">
              Индивидуальные условия для оптовых покупателей и постоянных
              клиентов
            </p>
          </div>

          <div
            class="rounded-xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
          >
            <div class="text-accent mb-4 text-4xl">
              <UserGroupIcon class="size-8" />
            </div>
            <h3 class="mb-3 text-xl font-bold text-gray-900">
              Техническая поддержка
            </h3>
            <p class="text-gray-600">
              Консультации по подбору оборудования и технические консультации
            </p>
          </div>

          <div
            class="rounded-xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
          >
            <div class="text-accent mb-4 text-4xl">
              <DocumentDuplicateIcon class="size-8" />
            </div>
            <h3 class="mb-3 text-xl font-bold text-gray-900">
              Полный пакет документов
            </h3>
            <p class="text-gray-600">
              Предоставляем все необходимые документы, включая сертификаты и
              декларации
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Карта с местоположением -->
    <section class="bg-gray-50 py-16">
      <div class="container mx-auto px-4">
        <div class="mb-16 text-center">
          <h2 class="mb-4 text-4xl font-bold text-gray-900">КАК НАС НАЙТИ</h2>
          <div class="mx-auto h-1 w-20 bg-blue-600"></div>
        </div>

        <div class="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h3 class="mb-6 text-2xl font-bold text-gray-900">Контакты</h3>
            <div class="space-y-6">
              <div class="flex items-start">
                <div
                  class="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600"
                >
                  <MapPinIcon class="text-accent size-6" />
                </div>
                <div>
                  <h4 class="mb-1 font-bold text-gray-900">Адрес</h4>
                  <p class="text-gray-600">
                    {{ ADDRESS }}
                  </p>
                </div>
              </div>

              <div class="flex items-start">
                <div
                  class="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600"
                >
                  <PhoneIcon class="text-accent size-6" />
                </div>
                <div>
                  <h4 class="mb-1 font-bold text-gray-900">Телефон</h4>
                  <a
                    :href="'tel:' + PHONE_NUMBER_NORMALIZED"
                    class="text-gray-600"
                    >{{ PHONE_NUMBER }}</a
                  >
                </div>
              </div>

              <div class="flex items-start">
                <div
                  class="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600"
                >
                  <EnvelopeIcon class="text-accent size-6" />
                </div>
                <div>
                  <h4 class="mb-1 font-bold text-gray-900">Email</h4>
                  <p class="text-gray-600">{{ EMAIL }}</p>
                </div>
              </div>

              <div class="flex items-start">
                <div
                  class="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600"
                >
                  <ClockIcon class="text-accent size-6" />
                </div>
                <div>
                  <h4 class="mb-1 font-bold text-gray-900">Режим работы</h4>
                  <p class="text-gray-600">
                    Пн-Пт: 9:00-18:00<br />Сб-Вс: выходной
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="h-96 overflow-hidden rounded-xl shadow-lg">
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A2f57d74ae9e3bebc9d78f87bc8cfb77f24c313897c3ab5eaf13562d430075cfe&amp;source=constructor"
              width="653"
              height="506"
              frameborder="0"
            ></iframe>
          </div>
        </div>
      </div>
    </section>

    <!-- Форма обратной связи -->
    <section class="bg-white py-16">
      <div class="container mx-auto px-4">
        <div
          class="mx-auto max-w-4xl overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md"
        >
          <div class="md:flex">
            <div class="bg-accent p-10 text-white md:w-1/2">
              <h2 class="mb-4 text-2xl font-bold">ОСТАЛИСЬ ВОПРОСЫ?</h2>
              <p class="mb-6 opacity-90">
                Напишите нам, и мы свяжемся с вами в ближайшее время
              </p>

              <div class="space-y-5">
                <div class="flex items-start">
                  <div
                    class="bg-opacity-30 mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-white"
                  >
                    <PhoneIcon class="text-accent size-5" />
                  </div>
                  <div>
                    <h3 class="text-sm font-bold text-blue-200">Телефон</h3>
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
                    <i class="fas fa-envelope"></i>
                    <EnvelopeIcon class="text-accent size-5" />
                  </div>
                  <div>
                    <h3 class="text-sm font-bold text-blue-200">Email</h3>
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
                    <MapPinIcon class="text-accent size-5" />
                  </div>
                  <div>
                    <h3 class="text-sm font-bold text-blue-200">Адрес</h3>
                    <p class="text-sm font-medium">
                      {{ ADDRESS }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="p-10 md:w-1/2">
              <form>
                <div class="mb-5">
                  <label for="name" class="mb-2 block font-medium text-gray-700"
                    >Ваше имя*</label
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
                <div class="mb-5">
                  <label
                    for="email"
                    class="mb-2 block font-medium text-gray-700"
                    >Email</label
                  >
                  <input
                    type="email"
                    id="email"
                    class="focus:ring-opacity-50 w-full rounded-lg border border-gray-300 px-4 py-3 transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                <div class="mb-6">
                  <label
                    for="message"
                    class="mb-2 block font-medium text-gray-700"
                    >Сообщение</label
                  >
                  <textarea
                    id="message"
                    rows="3"
                    class="focus:ring-opacity-50 w-full rounded-lg border border-gray-300 px-4 py-3 transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                    placeholder="Ваш вопрос..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  class="bg-accent w-full rounded-lg px-8 py-4 font-bold text-white shadow-md transition duration-300 hover:bg-blue-700 hover:shadow-lg"
                >
                  Отправить сообщение
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Плавающая кнопка "Позвонить" -->
    <a
      :href="'tel:' + PHONE_NUMBER_NORMALIZED"
      class="group fixed right-8 bottom-8 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl transition duration-300 hover:bg-blue-700"
    >
      <i class="fas fa-phone-alt text-xl"></i>
    </a>
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
