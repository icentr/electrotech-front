<template>
  <div class="max-w-md mx-auto mt-10 bg-white rounded-xl shadow p-6 space-y-6 h-fit">
    <h2 class="text-xl font-semibold text-gray-800">Изменить номер телефона</h2>

    <form @submit.prevent="submitPhone">
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Новый номер телефона</label>
          <input
            v-model="phone"
            type="tel"
            placeholder="+7..."
            class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        <div class="flex justify-end">
          <button
            type="submit"
            class="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md text-white hover:bg-blue-700"
            :disabled="loading"
          >
            Сохранить
          </button>
        </div>

        <div v-if="error" class="text-red-600 text-sm mt-2">{{ error }}</div>
        <div v-if="success" class="text-green-600 text-sm mt-2">Номер успешно обновлён</div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api'

const phone = ref('')
const loading = ref(false)
const error = ref('')
const success = ref(false)

const router = useRouter()

const submitPhone = async () => {
  error.value = ''
  success.value = ''
  loading.value = true

  try {
    await api.post('/user/change-phone', {
      phone_number: phone.value,
      
    })
    success.value = true
    setTimeout(() => router.push('/account'), 1500)
  } catch (err) {
    error.value = err.response?.data?.error || 'Ошибка при обновлении номера'
  } finally {
    loading.value = false
  }
}
</script>
