<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/useAuthStore'
import api from '../api'

const router = useRouter()
const auth = useAuthStore()

const form = ref({
  surname: '',
  first_name: '',
  last_name: '',
  email: '',
  phone_number: '',
  old_password: '',
  new_password: '',
  confirm_password: ''
})

const initialData = ref({}) // для сравнения
const errorMessage = ref('')
const success = ref(false)

onMounted(async () => {
  try {
    const res = await api.post('/user/get-data', {}, {
      headers: { Authorization: `Bearer ${auth.token}` }
    })
    Object.assign(form.value, res.data)
    Object.assign(initialData.value, res.data)
  } catch (err) {
    errorMessage.value = 'Ошибка загрузки данных'
  }
})

function validate() {
  if (!form.value.surname.trim()) {
    errorMessage.value = 'Фамилия обязательна'
    return false
  }
  if (!form.value.first_name.trim()) {
    errorMessage.value = 'Имя обязательно'
    return false
  }
  if (!form.value.email) {
    errorMessage.value = 'Email обязателен'
    return false
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.value.email)) {
    errorMessage.value = 'Введите корректный email'
    return false
  }
  if (!form.value.phone_number.trim()) {
    errorMessage.value = 'Телефон обязателен'
    return false
  }

  // Если хочет изменить пароль
  if (form.value.new_password || form.value.old_password || form.value.confirm_password) {
    if (!form.value.old_password) {
      errorMessage.value = 'Введите старый пароль'
      return false
    }
    if (!form.value.new_password || form.value.new_password.length < 8) {
      errorMessage.value = 'Новый пароль должен быть не менее 8 символов'
      return false
    }
    if (form.value.new_password !== form.value.confirm_password) {
      errorMessage.value = 'Пароли не совпадают'
      return false
    }
  }

  errorMessage.value = ''
  return true
}

const updateProfile = async () => {
  if (!validate()) return

  try {
    const headers = { Authorization: `Bearer ${auth.token}` }

    // Меняем email
    if (form.value.email !== initialData.value.email) {
      await api.post('/user/change-email', { email: form.value.email }, { headers })
    }

    // Меняем телефон
    if (form.value.phone_number !== initialData.value.phone_number) {
      await api.post('/user/change-phone', { phone_number: form.value.phone_number }, { headers })
    }

    // Меняем пароль
    if (form.value.new_password && form.value.old_password) {
      await api.post('/user/change-password', {
        old_password: form.value.old_password,
        new_password: form.value.new_password
      }, { headers })
    }

    success.value = true
    setTimeout(() => router.push('/account'), 1500)
  } catch (err) {
    errorMessage.value = err.response?.data?.error || 'Ошибка обновления'
  }
}
</script>
