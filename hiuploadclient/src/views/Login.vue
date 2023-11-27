<template>
  <div class="w-10/12 md:w-6/12 mx-auto">
    <form action="#" @submit.prevent="login" class="mb-8">
      <div class="mb-6">

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
      </div>

      <app-button type="submit" title="Login" :disabled="loading" :loading="loading" />
    </form>

    <p class="text-sm text-gray-800">Not joined yet? <router-link :to="{ name: 'register' }" class="text-indigo-500">Create an account</router-link></p>
  </div>
</template>

<script>
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
        email: '',
        password: '',
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
        await this.loginAction(this.form)

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
