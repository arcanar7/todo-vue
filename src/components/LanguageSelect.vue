<template>
  <div class="locale-changer">
    <span
      class="lang"
      :class="[{ expanded: expand }]"
      @click="onExpand"
      v-click-outside="onExpandHide"
    >
      <span class="lang__title">{{ langTitle }}</span>
      <ul class="lang__dropdown">
        <li
          v-for="(lang, i) in langs"
          :key="`Lang${i}`"
          @click="onChangeLang(lang)"
        >
          {{ lang.title }}
        </li>
      </ul>
    </span>
  </div>
</template>

<script>
export default {
  name: 'LanguageSelect',
  directives: {
    'click-outside': {
      bind(el, binding) {
        el.addEventListener('click', e => e.stopPropagation())
        document.body.addEventListener('click', binding.value)
      },
      unbind(el, binding) {
        document.body.removeEventListener('click', binding.value)
      },
    },
  },
  data() {
    return {
      langs: [{ val: 'en', title: 'English' }, { val: 'ru', title: 'Русский' }],
      expand: false,
    }
  },
  computed: {
    langTitle() {
      return this.$store.getters.langTitle
    },
  },
  methods: {
    onChangeLang(lang) {
      this.$store.dispatch('setLang', lang)
    },
    onExpand() {
      this.expand = !this.expand
    },
    onExpandHide() {
      this.expand = false
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
  position: relative;
  display: inline-block;
  width: 150px;
  height: 40px;
  cursor: pointer;
  box-shadow: none;
  transition: 0.4s box-shadow ease-out, 0.4s border-radius ease-in-out;

  &::after {
    position: absolute;
    top: 17px;
    right: 10%;
    content: '';
    border: 6px solid $primary;
    border-color: $primary transparent transparent transparent;
    transition: 0.3s all ease-in-out;
  }

  &__title {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-weight: 700;
    color: $primary;
    user-select: none;
    background-color: $background-input;
    transition: 0.3s background-color, 0.4s border-radius linear;
  }

  &__dropdown {
    position: absolute;
    right: 0;
    z-index: 1;
    width: 100%;
    padding: 0;
    margin: 0;
    list-style: none;
    border-radius: 0 0 10px 10px;
    box-shadow: none;
    transition: 0.4s box-shadow ease-out;

    li {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 0;
      padding: 0;
      margin: 0;
      overflow: hidden;
      font-weight: 700;
      color: hsla(0, 0, 0, 0);
      user-select: none;
      background-color: $background-input;
      transition: 0.3s 0.1s padding, 0.3s 0.1s height, 0.3s 0.1s margin,
        0.2s color;
    }

    :last-child {
      border-radius: 0 0 10px 10px;
    }
  }
}

.expanded {
  border-radius: 10px 10px 0 0;
  box-shadow: 0 0 5px hsla(0, 0, 0, 0.5);

  .lang__title {
    border-radius: 10px 10px 0 0;
  }

  .lang__dropdown {
    box-shadow: 0 0 5px hsla(0, 0, 0, 0.5);
  }

  &::after {
    top: 11px;
    transform: rotate(-180deg);
  }

  li {
    height: 30px;
    padding: 5px 0;
    color: $primary;
    transition: 0.3s height ease-in-out, 0.3s padding ease-in-out,
      0.3s 0.2s color, 0.2s background-color;
  }
}

@media (hover: hover) {
  .lang__title:hover,
  .lang__dropdown > li:hover {
    background-color: $background;
  }
}
</style>
