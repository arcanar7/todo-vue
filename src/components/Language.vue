<template>
  <div class="locale-changer">
    <select v-model="$i18n.locale">
      <option
        v-for="(lang, i) in langs"
        :key="`Lang${i}`"
        :value="lang"
        @click="onChangeLang(lang)"
      >
        {{ lang }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'locale-changer',
  data() {
    return { langs: ['en', 'ru'] }
  },
  methods: {
    onChangeLang(lang) {
      this.$store.dispatch('setLang', lang)
    },
  },
}
</script>

<style lang="scss">
.locale-changer {
  margin-bottom: 20px;
  text-align: end;
}
</style>
