<template>
  <div class="flex items-center justify-between border-b-2 border-gray-100">
    <div class="text-sm truncate overflow-ellipsis w-6/12">
      {{ file.name }}
    </div>
    <div class="-mr-3 flex items-center">
      <app-file-link :file="file" />
      <a href="" class="inline-block text-sm p-3 text-pink-500 font-medium" @click.prevent="deleteFile">Delete</a>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import AppFileLink from '@/components/AppFileLink'

export default {
  components: {
    AppFileLink
  },
  
  props: {
    file: {
      required: true,
      type: Object
    }
  },

  methods: {
    ...mapActions({
      deleteFileAction: 'files/deleteFile',
      snack: 'snack/snack'
    }),

    ...mapMutations({
      decrementUsage: 'usage/DECREMENT_USAGE'
    }),

    async deleteFile () {
      if (window.confirm('Really delete this file?')) {
        await this.deleteFileAction(this.file.uuid)

        this.snack('File was deleted')
        this.decrementUsage(this.file.size)
      }
    }
  }
}
</script>