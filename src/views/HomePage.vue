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
      <h4 class="offline-title" v-if="!isOnline">{{ $t('offline') }}</h4>
    </header>
    <main class="app-inner">
      <todo-list />
    </main>
    <footer class="footer">
      <button class="app-install" @click="installer" :style="{ display: installBtn }">
        {{ $t('pwa') }}
      </button>
    </footer>
    <AppNotify v-if="notification" />
  </div>
</template>

<script>
import TodoList from '@/components/TodoList.vue';
import LanguageSelect from '@/components/LanguageSelect.vue';
import IconBase from '@/components/IconBase.vue';
import IconExit from '@/components/icons/IconExit.vue';
import Indicator from '@/components/Indicator.vue';
import AppNotify from '@/components/AppNotify.vue';

const DISPLAY = {
  block: 'block',
  none: 'none',
};

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
      installBtn: DISPLAY.none,
      installer: null,
    };
  },
  created() {
    let installPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      installPrompt = e;
      this.installBtn = DISPLAY.block;
    });

    this.installer = () => {
      this.installBtn = 'none';
      installPrompt.prompt();
      installPrompt.userChoice.then((result) => {
        if (result.outcome !== 'accepted') {
          this.installBtn = DISPLAY.block;
        }
        installPrompt = null;
      });
    };
  },
  mounted() {
    this.setOnline();
    window.addEventListener('online', this.setOnline);
    window.addEventListener('offline', this.setOnline);
  },
  computed: {
    email() {
      return this.$store.getters.email;
    },
    notification() {
      return this.$store.getters.notification;
    },
  },
  methods: {
    onLogOut() {
      this.$store.dispatch('logoutUser').catch(() => {});
      this.$router.push('/login');
    },
    setOnline() {
      this.$store.dispatch('setIsOnLine', navigator.onLine);
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
    justify-content: flex-end;
    font-size: 20px;
    color: $text-primary;

    .exit {
      padding: 0;
      margin-left: 10px;
      color: $text-primary;
      background-color: inherit;
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
  box-shadow: 0 0 10px hsla(0, 0, 0, 0.5);
}

.app-install {
  padding: 10px;
  margin-top: 30px;
  font-size: 14px;
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
  }

  .indicator {
    position: absolute;
  }

  .notification {
    margin: 0 20px;
  }
}
</style>
