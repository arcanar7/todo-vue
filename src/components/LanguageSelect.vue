<template>
  <div class="locale-changer">
    <span class="lang" :class="[{ expanded: expand }]" @click="onExpand" v-click-outside="onExpandHide">
      <span class="lang__title">{{ langTitle }}</span>
      <ul class="lang__dropdown">
        <li v-for="(lang, i) in langs" :key="`Lang${i}`" @click="onChangeLang(lang)">
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
        el.addEventListener('click', (e) => e.stopPropagation());
        document.body.addEventListener('click', binding.value);
      },
      unbind(el, binding) {
        document.body.removeEventListener('click', binding.value);
      },
    },
  },
  data() {
    return {
      langs: [
        { val: 'en', title: 'English' },
        { val: 'ru', title: 'Русский' },
      ],
      expand: false,
    };
  },
  computed: {
    langTitle() {
      return this.$store.getters.langTitle;
    },
  },
  methods: {
    onChangeLang(lang) {
      this.$store.dispatch('setLang', lang);
    },
    onExpand() {
      this.expand = !this.expand;
    },
    onExpandHide() {
      this.expand = false;
    },
  },
};
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
    z-index: 3;
    content: '';
    border: 6px solid $primary;
    border-color: $primary transparent transparent transparent;
    transition: transform 0.3s ease-in-out, border-color 0.3s;
  }

  &__title {
    position: absolute;
    top: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-weight: 700;
    color: $text-primary;
    user-select: none;
    background-color: $background-input;
    border-radius: 5px;
    transition: background-color 0.3s, border-radius 0.4s linear, color 0.3s;
  }

  &__dropdown {
    position: absolute;
    top: 40px;
    z-index: 1;
    width: 100%;
    padding: 0;
    margin: 0;
    list-style: none;
    border-radius: 0 0 5px 5px;
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
      color: $tap-highlight-color;
      user-select: none;
      background-color: $background-input;
      transition: 0.3s padding ease-in-out, 0.3s height ease-in-out, 0.3s color ease-in-out;
    }

    :last-child {
      border-radius: 0 0 5px 5px;
    }
  }
}

.expanded {
  border-radius: 5px 5px 0 0;
  box-shadow: 0 0 5px $overlay-color;

  .lang__title {
    border-radius: 5px 5px 0 0;
    transition: background-color 0.3s, color 0.3s;
  }

  .lang__dropdown {
    box-shadow: 0 0 5px $overlay-color;
  }

  &::after {
    transform: rotate(-180deg) translateY(6px);
  }

  li {
    height: 30px;
    padding: 5px 0;
    color: $text-primary;
  }
}

@media (hover: hover) {
  .lang__title:hover,
  .lang__dropdown > li:hover {
    color: $text-primary;
    background-color: $background;
  }

  .lang:hover {
    &::after {
      border-color: $text-primary transparent transparent transparent;
    }
  }
}

@media (pointer: coarse) {
  .lang__dropdown > li {
    &:active {
      background-color: $background-dark;
    }
  }
}
</style>
