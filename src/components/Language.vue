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

  &__title {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 40px;
    background: #9dc852;
    color: #ffffff;
    font-weight: 700;
    transition: 0.3s background-color;

    &:hover {
      background: #8db842;
    }
  }

  &__dropdown {
    right: 0;
    width: 150px;
    padding: 15px 0;
    margin: 0;
    position: absolute;
    background: #ebebeb;
    z-index: 100;
    transition: 0.5s padding, 0.5s background;

    * {
      overflow: hidden;
      height: 30px;
      padding: 5px 10px;
      background: rgba(0, 0, 0, 0);
      white-space: nowrap;
      transition: 0.5s height cubic-bezier(0.73, 0.32, 0.34, 1.5),
        0.5s padding cubic-bezier(0.73, 0.32, 0.34, 1.5),
        0.5s margin cubic-bezier(0.73, 0.32, 0.34, 1.5), 0.5s 0.2s color,
        0.2s background-color;

      &:hover {
        background: rgba(0, 0, 0, 0.1);
      }
    }
  }

  &:not(:hover) {
    .lang__dropdown {
      padding: 4px 0;
      background: #dddddd;
      z-index: 99;

      * {
        visibility: hidden;
        height: 0;
        padding-top: 0;
        padding-bottom: 0;
        margin: 0;
        color: rgba(25, 25, 25, 0);
        transition: 0.5s 0.1s height, 0.5s 0.1s padding, 0.5s 0.1s margin,
          0.3s color, 0.6s visibility;
        z-index: 99;
      }
    }

    .lang__dropdown:after {
      border-top-color: #dddddd;
    }

    .lang__title:after {
      border-bottom-color: #dddddd;
    }
  }
}
</style>
