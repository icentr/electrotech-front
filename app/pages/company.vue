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
  ADDRESS,
} from "~/data";
</script>
<template>
  <div class="bg-gray-50 antialiased">
    <!-- Верхняя панель с контактами -->

    <!-- О компании -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="mb-16 text-center">
          <h2 class="mb-4 text-4xl font-bold text-gray-900">
            О КОМПАНИИ {{ COMPANY_NAME }}
          </h2>
          <div class="bg-accent mx-auto h-1 w-20"></div>
        </div>

        <div class="flex items-center gap-12">
          <div>
            <h3 class="mb-6 text-2xl font-bold text-gray-900">Наша миссия</h3>
            <p class="mb-6 text-lg leading-relaxed text-gray-600">
              Компания <span class="font-semibold">{{ COMPANY_NAME }}</span> уже
              более 10 лет является надежным поставщиком электротехнических
              компонентов для промышленных предприятий. Мы специализируемся
              проектирование и сборка НКУ любой сложности и конфигурации.
              <a class="link-accent" href="https://icentr.pro/">Наш сайт</a>
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
          <div class="bg-accent mx-auto h-1 w-20"></div>
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
          <div class="bg-accent mx-auto h-1 w-20"></div>
        </div>

        <div class="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h3 class="mb-6 text-2xl font-bold text-gray-900">Контакты</h3>
            <div class="space-y-6">
              <div class="flex items-start">
                <div
                  class="text-accent mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100"
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
                  class="text-accent mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100"
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
                  class="text-accent mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100"
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
                  class="text-accent mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100"
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

          <div class="h-96 w-full overflow-hidden rounded-xl shadow-lg">
            <iframe
              class="h-full w-full"
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A2f57d74ae9e3bebc9d78f87bc8cfb77f24c313897c3ab5eaf13562d430075cfe&amp;source=constructor"
              frameborder="0"
            ></iframe>
          </div>
        </div>
      </div>
    </section>

    <!-- Форма обратной связи -->
    <section class="py-16">
      <ContactUsForm />
    </section>

    <!-- Плавающая кнопка "Позвонить" -->
    <div class="fixed right-8 bottom-24 z-50 md:bottom-8">
      <a
        :href="'tel:' + PHONE_NUMBER_NORMALIZED"
        class="btn btn-accent btn-circular h-16 w-16 border border-blue-400"
      >
        <PhoneIcon class="size-8" />
      </a>
    </div>
  </div>
</template>
