<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-semibold mb-6">Редактирование информации о компании</h1>

    <form @submit.prevent="submitForm" class="space-y-4 max-w-xl">
      <!-- Название компании -->
      <div>
        <label class="block mb-1 text-sm font-medium">Название компании</label>
        <input
          v-model="form.companyName"
          @input="form.companyName = form.companyName.replace(/[^а-яА-Яa-zA-Z0-9\s]/g, '')"
          type="text"
          class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        />
        <p v-if="errors.companyName" class="text-red-600 text-sm">{{ errors.companyName }}</p>
      </div>

      <!-- Адрес компании -->
      <div>
        <label class="block mb-1 text-sm font-medium">Адрес компании</label>
        <input
          v-model="form.companyAddress"
          @input="form.companyAddress = form.companyAddress.replace(/[^а-яА-Яa-zA-Z0-9\s.,-]/g, '')"
          type="text"
          class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        />
        <p v-if="errors.companyAddress" class="text-red-600 text-sm">{{ errors.companyAddress }}</p>
      </div>

      <!-- Должность -->
      <div>
        <label class="block mb-1 text-sm font-medium">Должность в компании</label>
        <input
          v-model="form.positionInCompany"
          @input="form.positionInCompany = form.positionInCompany.replace(/[^а-яА-Яa-zA-Z\s]/g, '')"
          type="text"
          class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        />
        <p v-if="errors.positionInCompany" class="text-red-600 text-sm">{{ errors.positionInCompany }}</p>
      </div>

      <!-- ИНН -->
      <div>
        <label class="block mb-1 text-sm font-medium">ИНН компании</label>
        <input
          v-model="form.companyINN"
          @input="form.companyINN = form.companyINN.replace(/\D/g, '')"
          maxlength="12"
          type="text"
          class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        />
        <p v-if="errors.companyINN" class="text-red-600 text-sm">{{ errors.companyINN }}</p>
      </div>

      <!-- ОКПО -->
      <div>
        <label class="block mb-1 text-sm font-medium">ОКПО</label>
        <input
          v-model="form.companyOKPO"
          @input="form.companyOKPO = form.companyOKPO.replace(/\D/g, '')"
          maxlength="10"
          type="text"
          class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        />
        <p v-if="errors.companyOKPO" class="text-red-600 text-sm">{{ errors.companyOKPO }}</p>
      </div>

      <!-- Общие ошибки -->
      <div v-if="errorMessage" class="text-red-600 text-sm">{{ errorMessage }}</div>
      <div v-if="successMessage" class="text-green-600 text-sm">{{ successMessage }}</div>

      <!-- Кнопка -->
      <button
        type="submit"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
        :disabled="loading"
      >
        {{ loading ? "Сохранение..." : "Сохранить" }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getApi } from "@/api";

const api = getApi();
const router = useRouter();

const loading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

const form = ref({
  companyName: "",
  companyAddress: "",
  positionInCompany: "",
  companyINN: "",
  companyOKPO: "",
});

const errors = ref({
  companyName: "",
  companyAddress: "",
  positionInCompany: "",
  companyINN: "",
  companyOKPO: "",
});

const validateForm = () => {
  let valid = true;
  errors.value = { companyName: "", companyAddress: "", positionInCompany: "", companyINN: "", companyOKPO: "" };

  if (!form.value.companyName.trim()) {
    errors.value.companyName = "Введите название компании";
    valid = false;
  }
  if (!form.value.companyAddress.trim()) {
    errors.value.companyAddress = "Введите адрес компании";
    valid = false;
  }
  if (!form.value.positionInCompany.trim()) {
    errors.value.positionInCompany = "Введите должность";
    valid = false;
  }
  if (!/^\d{10}(\d{2})?$/.test(form.value.companyINN)) {
    errors.value.companyINN = "ИНН должен содержать 10 или 12 цифр";
    valid = false;
  }
  if (!/^\d{8}(\d{2})?$/.test(form.value.companyOKPO)) {
    errors.value.companyOKPO = "ОКПО должен содержать 8 или 10 цифр";
    valid = false;
  }

  return valid;
};

const submitForm = async () => {
  if (!validateForm()) return;

  loading.value = true;
  errorMessage.value = "";
  successMessage.value = "";

  try {
    await api.post("/user/update-company-data", {
      company_name: form.value.companyName,
      company_address: form.value.companyAddress,
      position_in_company: form.value.positionInCompany,
      company_inn: form.value.companyINN,
      company_okpo: form.value.companyOKPO,
    });

    successMessage.value = "Данные успешно обновлены";
    setTimeout(() => router.push("/account"), 1500);
  } catch (err) {
    errorMessage.value = err.response?.data?.error || "Ошибка при обновлении данных";
  } finally {
    loading.value = false;
  }
};

useHead({
  title: "Редактирование информации о компании",
});
</script>
