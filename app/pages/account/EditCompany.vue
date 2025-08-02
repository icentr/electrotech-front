<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-semibold mb-6">Редактирование информации о компании</h1>

    <form @submit.prevent="submitForm" class="space-y-4 max-w-xl">
      <div>
        <label class="block mb-1 text-sm font-medium">Название компании</label>
        <input
          v-model="form.companyName"
          type="text"
          class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          required
        />
      </div>

      <div>
        <label class="block mb-1 text-sm font-medium">Адрес компании</label>
        <input
          v-model="form.companyAddress"
          type="text"
          class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          required
        />
      </div>

      <div>
        <label class="block mb-1 text-sm font-medium">Должность в компании</label>
        <input
          v-model="form.positionInCompany"
          type="text"
          class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          required
        />
      </div>

      <div>
        <label class="block mb-1 text-sm font-medium">ИНН компании</label>
        <input
          v-model="form.companyINN"
          type="text"
          class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          required
        />
      </div>

      <div v-if="errorMessage" class="text-red-600 text-sm">{{ errorMessage }}</div>
      <div v-if="successMessage" class="text-green-600 text-sm">{{ successMessage }}</div>

      <button
        type="submit"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
        :disabled="loading"
      >
        {{ loading ? 'Сохранение...' : 'Сохранить' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api'

const router = useRouter()
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const form = ref({
  companyName: '',
  companyAddress: '',
  positionInCompany: '',
  companyINN: '',
})

const submitForm = async () => {
  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    await api.post('/user/update-company-data', {
      company_name: form.value.companyName,
      company_address: form.value.companyAddress,
      position_in_company: form.value.positionInCompany,
      company_inn: form.value.companyINN,
    })

    successMessage.value = 'Данные успешно обновлены'
    setTimeout(() => router.push('/account'), 1500)
  } catch (err) {
    errorMessage.value = err.response?.data?.error || 'Ошибка при обновлении данных'
  } finally {
    loading.value = false
  }
}
useHead({
  title:"Редактирование информации о компании"
})
</script>
