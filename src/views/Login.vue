
<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{'Project_Name'| localizeFilter}}</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{
            invalid:
              ($v.email.$dirty && !$v.email.required) ||
              ($v.email.$dirty && !$v.email.email)
          }"
        />
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
          >{{'Message_EmailRequired'| localizeFilter}}</small
        >
        <small
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email"
          >{{'Message_EmailValid'| localizeFilter}}</small
        >
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{
            invalid:
              ($v.password.$dirty && !$v.password.required) ||
              ($v.password.$dirty && !$v.password.minLength)
          }"
        />
        <label for="password">Пароль</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
          >{{'Message_EnterPassword'| localizeFilter}}</small
        >
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.minLength"
          >{{'Message_MinLength'| localizeFilter}}
          {{ $v.password.$params.minLength.min }} символов. Введено
          {{ password.length }}</small
        >
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          {{'Login'|localizeFilter}}
          <i class="material-icons right">send</i>
        </button>
      </div>
      <p class="center">
        {{'NoAccount'|localizeFilter}}
        <router-link to="/register">{{'Register'|localizeFilter}}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
/* eslint-disable */
import {email, required, minLength} from 'vuelidate/lib/validators'
import messages from '../utils/message'
export default {
  name: "Login",
  metaInfo() {
    return {
      title: this.$title('Login')
    }
  },
  data: () => ({
    email: '',
    password: ''
  }),
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(6)}
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password
      }

      try {
        await this.$store.dispatch('login', formData)
        this.$router.push('/')
      } catch (e) {}
    }
  }
}
</script>
