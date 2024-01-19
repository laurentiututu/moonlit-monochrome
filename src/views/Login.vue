<template>
  <div class="login">
  	<div v-if="formType === 'login'" class="login__container">
  	  <div class="header">
  	  	<h4>Login</h4>
  	  </div>
  	  <div class="login__inputs">
  	  	<SfInput
          v-model="form.email"
          name="email"
          placeholder="Your email"
          class="form__element"
          @keyup.enter="login()"
        />
  	  	<SfInput
	      v-model="form.password"
	      name="password"
	      placeholder="Password"
	      :has-show-password="true"
	      type="password"
	      class="form__element"
	      @keyup.enter="login()"
	    />
  	  </div>
  	  <span class="forgotPassword" @click="setFormType('forgotPassword')">Forgot your password?</span>
  	  <SfButton class="sf-button--full-width signInBtn" @click="login()" :disabled="!validForm">Sign In</SfButton>
  	  <span class="createAccount" @click="setFormType('register')">Create Account</span>
  	</div>
  	<div v-else-if="formType === 'register'" class="login__container">
  	  <div class="header">
  	  	<h4>Register</h4>
  	  </div>
  	  <div class="login__inputs">
  	  	<div class="fullName">
  	  	  <SfInput
            v-model="form.firstName"
            name="First Name"
            placeholder="First Name"
            class="form__element form__element--half"
          />
          <SfInput
            v-model="form.lastName"
            name="Last Name"
            placeholder="Last Name"
            class="form__element form__element--half-even"
          />
      	</div>
  	  	<SfInput
          v-model="form.email"
          name="email"
          placeholder="Your email"
          class="form__element"
        />
    	  <SfInput
  	      v-model="form.password"
  	      name="password"
  	      placeholder="Password"
  	      :has-show-password="true"
  	      type="password"
  	      class="form__element"
  	    />
  	    <SfInput
  	      v-model="form.confirmPassword"
  	      name="confirmPassword"
  	      placeholder="Confirm Password"
  	      :has-show-password="true"
  	      type="password"
  	      class="form__element"
  	    />
  	  </div>
  	  <SfButton
  	    class="sf-button--full-width signInBtn"
  	    @click="register()"
  	    :disabled="!validForm"
  	  >
  		Register
  	  </SfButton>
  	  <span class="createAccount"  @click="setFormType('login')">Already have an account? <b>Login</b></span>
  	</div>
  	<div v-else-if="formType === 'forgotPassword'" class="login__container">
  	  <div class="header">
  	  	<h4>Forgot Password</h4>
  	  </div>
  	  <div class="login__inputs">
  	  	<SfInput
          v-model="form.email"
          name="email"
          placeholder="Your email"
          class="form__element"
          :disabled="resetRequestSent"
        />
        <SfInput
          v-if="resetRequestSent"
          v-model="form.pin"
          name="pin"
          placeholder="PIN"
          class="form__element"
        />
        <SfInput
          v-if="resetRequestSent"
          v-model="form.password"
          name="password"
          placeholder="Password"
          :has-show-password="true"
          type="password"
          class="form__element"
        />
        <SfInput
          v-if="resetRequestSent"
          v-model="form.confirmPassword"
          name="confirmPassword"
          placeholder="Confirm Password"
          :has-show-password="true"
          type="password"
          class="form__element"
        />
  	  </div>
  	  <SfButton class="sf-button--full-width signInBtn" @click="resetRequestSent ? resetPassword() : forgotPassword()" :disabled="!validForm">Reset Password</SfButton>
  	  <span class="createAccount" @click="setFormType('login')">Login</span>
  	</div>
  </div>
</template>
<script>
import { SfInput, SfButton } from '@storefront-ui/vue'
import config from '../../config/local.json'
import axios from 'axios'

export default {
  components: {
  	SfInput,
  	SfButton
  },
  data () {
  	return {
      resetRequestSent: false,
  	  formType: 'login',
  	  matchingPasswords: false,
  	  form: {
  	  	firstName: '',
  	  	lastName: '',
  	  	email: '',
    	 	password: '',
    	 	confirmPassword: '',
        pin: ''
  	  }
  	}
  },
  watch: {
  	'form.confirmPassword' (newValue) {
  	  if (this.form.password == newValue) {
  	  	this.matchingPasswords = true
  	  } else {
  	  	this.matchingPasswords = false
  	  }
  	},
  	'form.password' (newValue) {
  	  if (this.form.confirmPassword == newValue) {
  	  	this.matchingPasswords = true
  	  } else {
  	  	this.matchingPasswords = false
  	  }
  	}
  },
  computed: {
  	validForm () {
  	  let isValid = false
  	  if (this.formType === 'login') {
  	  	if (this.form.email && this.form.password) {
  	  	  isValid = true
  	  	} else {
  	  	  isValid = false
  	  	}
  	  } else if (this.formType === 'register') {
  	  	let filledForm = false
  	  	if (!this.form.firstName) {
  	  	  filledForm = false
  	  	} else if (!this.form.lastName) {
  	  	  filledForm = false
  	  	} else if (!this.form.email) {
  	  	  filledForm = false
  	  	} else if (!this.form.password) {
  	  	  filledForm = false
  	  	} else if (!this.form.confirmPassword) {
  	  	  filledForm = false
  	  	} else {
  	  	  filledForm = true
  	  	}
  	  	if (filledForm && this.matchingPasswords) {
  	  	  isValid = true
  	  	} else {
  	  	  isValid = false
  	  	}
  	  } else if (this.formType === 'forgotPassword') {
        if (this.resetRequestSent) {
          if (!this.form.email) {
            isValid = false
          } else if (!this.form.pin) {
            isValid = false
          } else if (!this.form.password) {
            isValid = false
          } else if (!this.form.confirmPassword) {
            isValid = false
          } else {
            isValid = true
          }
        } else {
          if (!this.form.email) {
            isValid = false
          } else {
            isValid = true
          }
        }
  	  }
  	  return isValid
  	}
  },
  methods: {
  	setFormType (type) {
  	  this.formType = type;
  	},
  	login () {
  	  let data = {
  	  	email: this.form.email,
  	  	password: this.form.password
  	  }
  	  axios
  	  .post(config.api.url + config.auth.login_endpoint, data)
  	  .then(res => {
        localStorage.setItem('userToken', res.data.token)
        localStorage.setItem('refreshToken', res.data.refreshToken)
  	  	localStorage.setItem('userRole', res.data.data.user.role)
  	  	this.$store.dispatch('spawnNotification', {
  	  		type: 'success',
  	  		message: 'You have successfully logged in.',
  	  		action1: { label: 'OK' }
  	  	});
  	  	this.$router.push('/')
  	  })
  	  .catch(err => {
  	  	this.$store.dispatch('spawnNotification', {
  		  type: 'danger',
  		  message: err.response.data.message,
  		  action1: { label: 'OK' }
  	  	});
  	  })
  	},
  	register () {
  	  let data = {
  	  	name: this.form.firstName + ' ' + this.form.lastName,
  	  	email: this.form.email,
  	  	password: this.form.password,
  	  	passwordConfirm: this.form.confirmPassword
  	  }
  	  axios
  	  .post(config.api.url + config.auth.signup_endpoint, data)
  	  .then(res => {
	  	this.$store.dispatch('spawnNotification', {
  		  type: 'success',
  		  message: res.data.message,
  		  action1: { label: 'OK' }
  	  	});
  	  	this.$router.push('/')
  	  })
  	  .catch(err => {
  	  	this.$store.dispatch('spawnNotification', {
  		  type: 'danger',
  		  message: err.message,
  		  action1: { label: 'OK' }
  	  	});
  	  })
  	},
  	forgotPassword () {
  	  let data = {
  	  	email: this.form.email
  	  }
  	  axios
  	  .post(config.api.url + config.auth.forgotPassword_endpoint, data)
  	  .then(res => {
  	  	this.$store.dispatch('spawnNotification', {
    		  type: 'success',
    		  message: res.data.message,
    		  action1: { label: 'OK' }
  	  	});
        this.resetRequestSent = !this.resetRequestSent
  	  	// this.$router.push('/')
  	  })
  	},
    resetPassword () {
      let data = {
        email: this.form.email,
        pin: this.form.pin,
        password: this.form.password,
        passwordConfirm: this.form.confirmPassword
      }
      axios
      .patch(config.api.url + config.auth.resetPassword_endpoint, data)
      .then(res => {
        localStorage.setItem('userToken', res.data.token)
        localStorage.setItem('refreshToken', res.data.refreshToken)
        localStorage.setItem('userRole', res.data.data.user.role)
        this.$router.push('/my-account')
        this.$store.dispatch('spawnNotification', {
          type: 'success',
          message: 'Password reset successfully.',
          action1: { label: 'OK' }
        });
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  background: var(--c-light);
  padding: var(--spacer-2xl) 0;
  &__container {
  	max-width: 30rem;
    padding: var(--spacer-2xl);
    background: var(--c-white);
    margin: 0 auto;
  }
}
.header {
  h4 {
  	text-transform: uppercase;
    text-align: center;
    font-size: 2.25rem;
    font-weight: var(--font-semibold);
    margin-top: 0;
  }
}
.forgotPassword {
  text-align: right;
  display: block;
  text-transform: uppercase;
  font-size: var(--font-xs);
  cursor: pointer;

  &:hover {
  	text-decoration: underline;
  }
}
.signInBtn {
  --button-background: var(--c-black);
  --button-font-weight: var(--font-normal);
  margin: var(--spacer-lg) 0;
}
.createAccount {
  text-align: center;
  display: block;
  text-transform: uppercase;
  font-size: var(--font-xs);
  cursor: pointer;

  &:hover {
  	text-decoration: underline;
  }
}
.form {
  &__element {
  	&--half {
  	  --input-width: 46%;
  	  &-even {
  	  	--input-width: 46%;
  	  }
  	}
  }
}
.fullName {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacer-sm);
}
</style>