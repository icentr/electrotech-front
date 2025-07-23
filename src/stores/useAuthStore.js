import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // Состояние токена
  const token = ref(localStorage.getItem('token') || null)

  // Проверка валидности токена (JWT)
  const isAuthenticated = computed(() => {
    if (!token.value) return false
    try {
      const payload = JSON.parse(atob(token.value.split('.')[1]))
      return payload.exp * 1000 > Date.now()
    } catch {
      return false
    }
  })

  // Вход — сохраняем токен и обновляем состояние
  function login(newToken) {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  // Выход — очищаем токен и состояние
  function logout() {
    token.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('refresh_token')
  }

  return { token, isAuthenticated, login, logout }
})
