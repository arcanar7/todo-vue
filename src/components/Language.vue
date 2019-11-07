<template>
  <div class="locale-changer">
    <!-- <select v-model="$i18n.locale" class="select">
      <option
        class="option"
        v-for="(lang, i) in langs"
        :key="`Lang${i}`"
        :value="lang.val"
        @click="onChangeLang(lang.val)"
      >
        {{ lang.title }}
      </option>
    </select> -->
    <!-- <span class="select">
      <div class="option" v-for="(lang, i) in langs" :key="`Lang${i}`">
        <input
          type="radio"
          name="sortType"
          :value="lang.val"
          v-model="$i18n.locale"
          :id="lang.val"
        />
        <label :for="lang.val" class="option-label">{{ lang.title }}</label>
      </div>
    </span> -->
    <span class="lang">
      <span class="lang__title">Language</span>
      <ul class="lang__dropdown">
        <li v-for="(lang, i) in langs" :key="`Lang${i}`">{{ lang.title }}</li>
      </ul>
    </span>
  </div>
</template>

<script>
export default {
  name: 'locale-changer',
  data() {
    return {
      langs: [{ val: 'en', title: 'English' }, { val: 'ru', title: 'Русский' }],
    }
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
  margin: 20px 0;
  text-align: end;
}

.lang {
  display: inline-block;
  position: relative;
  cursor: pointer;
  transition: 0.2s box-shadow;
  box-shadow: 0 0 5px hsla(0, 0, 0, 0.5);

  &__title {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 40px;
    background-color: $background-input;
    color: $primary;
    font-weight: 700;
    transition: 0.3s background-color;

    &:hover {
      background-color: $background;
    }
  }

  &__dropdown {
    right: 0;
    width: 100%;
    list-style: none;
    padding: 0;
    margin: 0;
    position: absolute;
    box-shadow: inherit;
    // box-shadow: 0 5px 5px hsla(0, 0, 0, 0.5);
    // background: #ebebeb;
    z-index: 2;
    // transition: 0.5s padding, 0.5s background;

    li {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 30px;
      padding: 5px 0;
      background-color: $background-input;
      color: $primary;
      font-weight: 700;
      transition: 0.5s height cubic-bezier(0.73, 0.32, 0.34, 1.5),
        0.5s padding cubic-bezier(0.73, 0.32, 0.34, 1.5), 0.5s 0.2s color,
        0.2s background-color;

      &:hover {
        background-color: $background;
        // background-color: hsla(0, 0, 0, 0.1);
      }
    }
  }

  &:not(:hover) {
    box-shadow: none;

    .lang__dropdown {
      li {
        visibility: hidden;
        height: 0;
        padding: 0;
        margin: 0;
        color: hsla(0, 0, 0, 0);
        transition: 0.5s 0.1s height, 0.5s 0.1s padding, 0.5s 0.1s margin,
          0.3s color, 0.6s visibility;
        z-index: 1;
      }
    }
  }
}
</style>
