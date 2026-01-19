<template>
  <BreadcrumbsBlock
    :breadcrumbs="[{ name: 'Личный кабинет', url: '/account' }]"
    page="Редактирование информации о компании"
  />
  <div class="flex justify-center">
    <div class="rounded-xl bg-white p-6 shadow">
      <h1 class="title-2">Редактирование информации о компании</h1>

      <form @submit.prevent="submitForm" class="max-w-xl space-y-4">
        <!-- Название компании -->
        <div>
          <label class="mb-1 block text-sm font-medium"
            >Название компании</label
          >
          <input
            v-model="form.companyName"
            @input="
              form.companyName = form.companyName.replace(
                /[^а-яА-Яa-zA-Z0-9\s]/g,
                '',
              )
            "
            type="text"
            class="entry"
          />
          <p v-if="errors.companyName" class="text-sm text-red-600">
            {{ errors.companyName }}
          </p>
        </div>

        <!-- Адрес компании -->
        <div>
          <label class="mb-1 block text-sm font-medium">Адрес компании</label>
          <input
            v-model="form.companyAddress"
            @input="
              form.companyAddress = form.companyAddress.replace(
                /[^а-яА-Яa-zA-Z0-9\s.,-]/g,
                '',
              )
            "
            type="text"
            class="entry"
          />
          <p v-if="errors.companyAddress" class="text-sm text-red-600">
            {{ errors.companyAddress }}
          </p>
        </div>

        <!-- Должность -->
        <div>
          <label class="mb-1 block text-sm font-medium"
            >Должность в компании</label
          >
          <input
            v-model="form.positionInCompany"
            @input="
              form.positionInCompany = form.positionInCompany.replace(
                /[^а-яА-Яa-zA-Z\s]/g,
                '',
              )
            "
            type="text"
            class="entry"
          />
          <p v-if="errors.positionInCompany" class="text-sm text-red-600">
            {{ errors.positionInCompany }}
          </p>
        </div>

        <!-- ИНН -->
        <div>
          <label class="mb-1 block text-sm font-medium">ИНН компании</label>
          <input
            v-model="form.companyInn"
            @input="form.companyInn = form.companyInn.replace(/\D/g, '')"
            maxlength="12"
            type="text"
            class="entry"
          />
          <p v-if="errors.companyInn" class="text-sm text-red-600">
            {{ errors.companyInn }}
          </p>
        </div>

        <!-- ОКПО -->
        <div>
          <label class="mb-1 block text-sm font-medium">ОКПО</label>
          <input
            v-model="form.companyOkpo"
            @input="form.companyOkpo = form.companyOkpo.replace(/\D/g, '')"
            maxlength="10"
            type="text"
            class="entry"
          />
          <p v-if="errors.companyOkpo" class="text-sm text-red-600">
            {{ errors.companyOkpo }}
          </p>
        </div>

        <!-- Общие ошибки -->
        <div v-if="errorMessage" class="text-sm text-red-600">
          {{ errorMessage }}
        </div>
        <div v-if="successMessage" class="text-sm text-green-600">
          {{ successMessage }}
        </div>

        <!-- Кнопка -->
        <button type="submit" class="btn btn-accent" :disabled="loading">
          {{ loading ? "Сохранение..." : "Сохранить" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
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
  companyInn: "",
  companyOkpo: "",
});

const errors = ref({
  companyName: "",
  companyAddress: "",
  positionInCompany: "",
  companyInn: "",
  companyOkpo: "",
});
onMounted(async () => {
  try {
    const { data } = await api.post("/user/get-company-data");
    form.value.companyName = data.companyName || "";
    form.value.companyAddress = data.companyAddress || "";
    form.value.positionInCompany = data.positionInCompany || "";
    form.value.companyInn = data.companyInn || "";
    form.value.companyOkpo = data.companyOkpo || "";
  } catch (err) {
    console.error("Ошибка при получении данных компании", err);
  }
});

const validateForm = () => {
  let valid = true;
  errors.value = {
    companyName: "",
    companyAddress: "",
    positionInCompany: "",
    companyInn: "",
    companyOkpo: "",
  };

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
  if (!/^\d{10}(\d{2})?$/.test(form.value.companyInn)) {
    errors.value.companyInn = "ИНН должен содержать 10 или 12 цифр";
    valid = false;
  }
  if (!/^\d{8}(\d{2})?$/.test(form.value.companyOkpo)) {
    errors.value.companyOkpo = "ОКПО должен содержать 8 или 10 цифр";
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
      company_inn: form.value.companyInn,
      company_okpo: form.value.companyOkpo,
    });

    successMessage.value = "Данные успешно обновлены";
    setTimeout(() => router.push("/account"), 1500);
  } catch (err) {
    errorMessage.value =
      err.response?.data?.error || "Ошибка при обновлении данных";
  } finally {
    loading.value = false;
  }
};

usePageTitle("Редактирование информации о компании");
</script>
