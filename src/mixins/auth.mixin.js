class ValidField {
  constructor(title) {
    this.title = title;
    this.touched = false;
  }

  touch() {
    this.touched = true;
  }
}

export default {
  data() {
    return {
      email: new ValidField(null),
      password: new ValidField(null),
      repeatPassword: new ValidField(null),
      emailRegex: /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/,
    };
  },
  computed: {
    isError() {
      return this.$store.getters.error;
    },
    isSuccess() {
      return this.$store.getters.success;
    },
    isRequiredEmail() {
      return this.isRequired(this.email.title);
    },
    isRequiredPassword() {
      return this.isRequired(this.password.title);
    },
    isRequiredRepeatPassword() {
      return this.isRequired(this.repeatPassword.title);
    },
    isEmail() {
      return this.email.title ? this.emailRegex.test(this.email.title) : false;
    },
    isMinLength() {
      return this.password.title.length >= 6;
    },
    isSameAs() {
      return this.password.title === this.repeatPassword.title;
    },
    isInvalidEmail() {
      return !this.isRequiredEmail || !this.isEmail;
    },
    isInvalidPassword() {
      return !this.isRequiredPassword || !this.isMinLength;
    },
    isInvalidRepeatPassword() {
      return !this.isRequiredRepeatPassword || !this.isSameAs;
    },
    isValidErrorEmail() {
      return this.email.touched && this.isInvalidEmail;
    },
    isValidErrorPassword() {
      return this.password.touched && this.isInvalidPassword;
    },
    isValidErrorRepeatPassword() {
      return this.repeatPassword.touched && this.isInvalidRepeatPassword;
    },
    isLoginValid() {
      return this.isInvalidEmail || this.isInvalidPassword;
    },
    isRegistrationValid() {
      return this.isInvalidEmail || this.isInvalidPassword || this.isInvalidRepeatPassword;
    },
  },
  beforeCreate() {
    this.$store.dispatch('clearError');
    this.$store.dispatch('clearSuccess');
  },
  methods: {
    isRequired(field) {
      return Boolean(field);
    },
    onSubmit(act, query = '') {
      if (!this.isLoginValid) {
        const user = {
          email: this.email.title,
          password: this.password.title,
        };
        this.$store
          .dispatch(act, user)
          .then(() => {
            this.$router.push(`/${query}`);
          })
          .catch(() => {});
      }
    },
    onResetPass() {
      const email = this.email.title;
      this.$store
        .dispatch('resetPassword', email)
        .then(() => {
          this.$store.dispatch(
            'setSuccess',
            'Please check your email and click on the provided link to reset your password.',
          );
        })
        .catch(() => {});
    },
  },
};
