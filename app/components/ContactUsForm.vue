<script setup>
import {
  DocumentTextIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/vue/16/solid";
import {
  COMPANY_PHONE,
  COMPANY_PHONE_NORMALIZED,
  COMPANY_EMAIL,
  COMPANY_ADDRESS,
  COMPANY_INN,
  COMPANY_KPP,
} from "~/data";
const form = ref({
  name: "",
  phone: "",
  email: "",
  message: "",
});

import { useApi } from "@/api";

const validationErrors = ref(null);

const formValid = computed(() => {
  validationErrors.value = [];
  if (!form.value.name) {
    validationErrors.value.push("Необходимо указать контактное лицо");
    return false;
  }
  if (!form.value.phone && !form.value.email) {
    validationErrors.value.push("Укажите телефон или email");
    return false;
  }
  if (!form.value.message) {
    validationErrors.value.push("Необходимо указать сообщение");
    return false;
  }
  return true;
});

const {
  isLoading,
  execute: executeRequest,
  catch: cathError,
} = useApi(
  "/contact-us",
  {
    method: "POST",
  },
  { immediate: false },
);

cathError((err) => {
  console.error("Error sending request", err);
});

const onSubmit = () => {
  if (!formValid.value) {
    console.error("Form is not valid", validationErrors.value);
    return;
  }
  isLoading.value = true;
  executeRequest({
    data: form.value,
  });
};
</script>

<template>
  <div class="container mx-auto px-4">
    <div
      class="mx-auto max-w-4xl overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md"
    >
      <div class="md:flex">
        <div class="bg-accent p-4 text-white md:w-1/2 md:p-10">
          <h2 class="mb-4 text-2xl font-bold">КОНТАКТЫ</h2>
          <p class="mb-6 opacity-90">
            Оставьте заявку для получения коммерческого предложения, задайте
            вопрос или просто предоставьте обратную связь
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
                  :href="'tel:' + COMPANY_PHONE_NORMALIZED"
                  class="text-lg font-medium hover:underline"
                  >{{ COMPANY_PHONE }}</a
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
                  :href="'mailto:' + COMPANY_EMAIL"
                  class="text-lg hover:underline"
                  >{{ COMPANY_EMAIL }}</a
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
                <p class="text-lg">
                  ИНН {{ COMPANY_INN }}, КПП {{ COMPANY_KPP }}
                </p>
              </div>
            </div>
            <div class="flex items-start">
              <div
                class="bg-opacity-30 mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-white"
              >
                <MapPinIcon class="text-accent size-6" />
              </div>
              <div>
                <h3 class="text-sm font-bold text-blue-200">Адрес</h3>
                <p class="font-medium">
                  {{ COMPANY_ADDRESS }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="p-4 md:w-1/2 md:p-10">
          <div
            v-if="isLoading"
            class="flex h-full grow items-center justify-center"
          >
            <div class="text-accent text-xl font-semibold">Отправка...</div>
          </div>
          <form @submit.prevent="onSubmit" v-if="!isLoading">
            <div class="mb-5">
              <label for="name" class="mb-2 block font-medium text-gray-700"
                >Контактное лицо*</label
              >
              <input
                type="text"
                v-model="form.name"
                id="name"
                class="entry"
                required
              />
            </div>
            <div class="mb-5">
              <label for="phone" class="mb-2 block font-medium text-gray-700"
                >Телефон</label
              >
              <input type="tel" v-model="form.phone" id="phone" class="entry" />
            </div>
            <div class="mb-5">
              <label for="email" class="mb-2 block font-medium text-gray-700"
                >Почта</label
              >
              <input
                type="email"
                v-model="form.email"
                id="email"
                class="entry"
              />
            </div>
            <div class="mb-6">
              <label for="message" class="mb-2 block font-medium text-gray-700"
                >Сообщение *</label
              >
              <textarea
                required
                v-model="form.message"
                id="message"
                rows="3"
                class="entry"
                placeholder="Например: контроллеры ABB, клеммы WAGO..."
              ></textarea>
            </div>
            <p v-if="validationErrors?.length" class="mb-6 text-red-500">
              <span v-for="error in validationErrors">
                {{ error }}
              </span>
            </p>
            <button type="submit" class="btn btn-accent btn-lg">
              Отправить сообщение
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
