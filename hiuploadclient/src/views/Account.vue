<template>
  <div>
    <h2 class="font-medium pb-3 border-b-2 border-gray-100 text-gray-800">
      Subscription
    </h2>

    <div class="mt-3 text-sm">
      <p class="mb-2">You're on the {{ user.plan.name }} plan. <template v-if="user.ends_at">Your current subscription ends {{ user.ends_at }} </template></p>

      <router-link :to="{ name: 'swap' }" class="text-indigo-500" v-if="user.subscribed">Swap plan</router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  }
}
</script>
