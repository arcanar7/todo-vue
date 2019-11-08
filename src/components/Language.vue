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
  name: 'locale-changer',
  data() {
    return {
      langs: [{ val: 'en', title: 'English' }, { val: 'ru', title: 'Русский' }],
      expand: false,
    }
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
  computed: {
    langTitle() {
      return this.$store.getters.langTitle
    },
  },
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
  transition: 1s box-shadow;
  box-shadow: none;
  width: 150px;
  height: 40px;

  &::after {
    content: '';
    position: absolute;
    right: 10%;
    top: 17px;
    border: 6px solid $primary;
    border-color: $primary transparent transparent transparent;
    transition: 0.5s all ease-in-out;
  }

  &__title {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: $primary;
    font-weight: 700;
    background-color: $background-input;
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
    z-index: 1;

    li {
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      background-color: $background-input;
      font-weight: 700;
      height: 0;
      padding: 0;
      margin: 0;
      color: hsla(0, 0, 0, 0);
      transition: 0.4s 0.1s height, 0.4s 0.1s padding, 0.4s 0.1s margin,
        0.2s color;

      &:hover {
        background-color: $background;
      }
    }
  }

  // &:hover {
  //   box-shadow: 0 0 5px hsla(0, 0, 0, 0.5);

  //   &::after {
  //     transform: rotate(-180deg);
  //     top: 11px;
  //   }

  //   li {
  //     height: 30px;
  //     padding: 5px 0;
  //     color: $primary;
  //     transition: 0.5s height cubic-bezier(0.73, 0.32, 0.34, 1.5),
  //       0.5s padding cubic-bezier(0.73, 0.32, 0.34, 1.5), 0.5s 0.2s color,
  //       0.2s background-color;
  //   }
  // }
}

.expanded {
  box-shadow: 0 0 5px hsla(0, 0, 0, 0.5);

  &::after {
    transform: rotate(-180deg);
    top: 11px;
  }

  li {
    height: 30px;
    padding: 5px 0;
    color: $primary;
    transition: 0.4s height ease-in-out, 0.4s padding ease-in-out,
      0.4s 0.2s color, 0.2s background-color;
  }
}
</style>
