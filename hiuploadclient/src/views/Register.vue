<template>
  <div class="w-10/12 md:w-6/12 mx-auto">
    <form action="#" @submit.prevent="login" class="mb-8">
      <div class="mb-6">

        <div class="mb-3">
          <label for="name" class="inline-block text-sm mb-2">Name</label>
          <input type="text" id="name" class="w-full border-2 border-gray-200 h-10 px-3 rounded-md" :class="{ 'border-red-500': errors.name }" v-model="form.name">

          <div v-if="errors.name" class="text-red-500 text-sm mt-2">
            {{ errors.name[0] }}
          </div>
        </div>

        <div class="mb-3">
          <label for="email" class="inline-block text-sm mb-2">Email address</label>
          <input type="text" id="email" class="w-full border-2 border-gray-200 h-10 px-3 rounded-md" :class="{ 'border-red-500': errors.email }" v-model="form.email">

          <div v-if="errors.email" class="text-red-500 text-sm mt-2">
            {{ errors.email[0] }}
          </div>
        </div>

        <div class="mb-3">
          <label for="password" class="inline-block text-sm mb-2">Password</label>
          <input type="password" id="password" class="w-full border-2 border-gray-200 h-10 px-3 rounded-md" :class="{ 'border-red-500': errors.password }" v-model="form.password">

          <div v-if="errors.password" class="text-red-500 text-sm mt-2">
            {{ errors.password[0] }}
          </div>
        </div>

        <div class="mb-3">
          <label for="password_confirmation" class="inline-block text-sm mb-2">Password confirmation</label>
          <input type="password" id="password_confirmation" class="w-full border-2 border-gray-200 h-10 px-3 rounded-md" :class="{ 'border-red-500': errors.password_confirmation }" v-model="form.password_confirmation">

          <div v-if="errors.password_confirmation" class="text-red-500 text-sm mt-2">
            {{ errors.password_confirmation[0] }}
          </div>
        </div>
      </div>

      <app-button type="submit" title="Create account" :disabled="loading" :loading="loading" />
    </form>

    <p class="text-sm text-gray-800">Already got an account? <router-link :to="{ name: 'login' }" class="text-indigo-500">Login</router-link></p>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'
import AppButton from '@/components/AppButton'

export default {
  components: {
    AppButton
  },

  data () {
    return {
      loading: false,
      errors: {},

      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      }
    }
  },

  methods: {
    ...mapActions({
      loginAction: 'auth/login'
    }),

    async login () {
      this.loading = true

      try {
        await axios.post('/api/register', this.form)

        await this.loginAction({
          email: this.form.email,
          password: this.form.password,
        })

        this.loading = false

        this.$router.replace({ name: 'home' })
      } catch (e) {
        this.loading = false

        if (e.response.status === 422) {
          this.errors = e.response.data.errors
        }
      }
    }
  }
}
</script>
