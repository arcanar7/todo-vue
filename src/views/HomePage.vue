<template>
  <div class="app-wrapper">
    <header class="header-app">
      <div class="logout">
        {{ email }}
        <button class="exit" title="Log out" @click="onLogOut">
          <icon-base icon-name="exit">
            <icon-exit />
          </icon-base>
        </button>
      </div>
      <indicator />
      <language-select />
      <h1 class="title">{{ $t('title') }}</h1>
      <h4 class="offline-title" v-if="!isOnLine">{{ $t('offline') }}</h4>
    </header>
    <main class="app-inner">
      <todo-list />
    </main>
    <footer class="footer">
      <button class="app-install" :class="[{ isButtonVisible: 'app-install_show' }]" @click="installer">
        {{ $t('pwa') }}
      </button>
    </footer>
    <app-notify v-if="notification" />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import TodoList from '@/components/TodoList.vue';
import LanguageSelect from '@/components/LanguageSelect.vue';
import IconBase from '@/components/IconBase.vue';
import IconExit from '@/components/icons/IconExit.vue';
import Indicator from '@/components/Indicator.vue';
import AppNotify from '@/components/AppNotify.vue';

export default {
  name: 'HomePage',
  components: {
    TodoList,
    LanguageSelect,
    IconBase,
    IconExit,
    Indicator,
    AppNotify,
  },
  data() {
    return {
      isButtonVisible: false,
      installPrompt: null,
    };
  },
  created() {
    window.addEventListener('beforeinstallprompt', this.beforeInstallHandler);
  },
  mounted() {
    this.setOnline();
    window.addEventListener('online', this.setOnline);
    window.addEventListener('offline', this.setOnline);
  },
  destroyed() {
    window.removeEventListener('beforeinstallprompt', this.beforeInstallHandler);
    window.removeEventListener('online', this.setOnline);
    window.removeEventListener('offline', this.setOnline);
  },
  computed: {
    ...mapState('Auth', ['email']),
    ...mapState('Utils', ['notification']),
  },
  methods: {
    ...mapActions('Auth', ['logoutUser']),
    ...mapMutations('Utils', ['setIsOnLine']),

    onLogOut() {
      this.logoutUser();
      this.$router.push('/login');
    },
    setOnline() {
      this.setIsOnLine(navigator.onLine);
    },
    beforeInstallHandler(event) {
      event.preventDefault();
      this.installPrompt = event;
      this.isButtonVisible = true;
    },
    installer() {
      this.isButtonVisible = false;
      this.installPrompt.prompt();
      this.installPrompt.userChoice.then((result) => {
        if (result.outcome !== 'accepted') {
          this.isButtonVisible = true;
        }
        this.installPrompt = null;
      });
    },
  },
};
</script>

<style lang="scss">
.app-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}

.header-app {
  display: flex;
  flex-direction: column;
  width: 600px;
  margin-top: 20px;

  .logout {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 20px;
    color: $text-primary;

    .exit {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      margin-left: 10px;
      color: $text-primary;
      background-color: inherit;
      transition: color 0.3s;
    }
  }

  .title {
    font-weight: 900;
    color: $text-primary;
    text-align: center;
  }

  .offline-title {
    color: $error;
  }
}

.app-inner {
  display: flex;
  width: 588px;
  padding: 5px;
  background-color: $background;
  border: 1px solid $primary;
  border-radius: 10px;
  box-shadow: 0 0 10px $overlay-color;
}

.app-install {
  display: none;
  padding: 10px;
  margin-top: 30px;
  font-size: 14px;

  &_show {
    display: block;
  }
}

@media screen and (max-width: $screen) {
  .header-app,
  .app-inner {
    width: 90%;
  }

  .header-app,
  .indicator {
    margin-top: 5px;
  }

  .header-app {
    .locale-changer,
    .title {
      margin: 5px 0;
    }

    .logout {
      font-size: 16px;
    }
  }

  .indicator {
    position: absolute;
  }

  .notification {
    margin: 0 20px;
  }
}

@media (hover: hover) {
  .header-app {
    .logout {
      .exit:hover {
        color: $error;
      }
    }
  }
}
</style>
