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
          >{{'Message_EmailRequired'|localizeFilter}}</small
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
        <label for="password">{{'Password'|localizeFilter}}</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
          >{{'Message_EnterPassword'|localizeFilter}}</small
        >
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.minLength"
          >{{'Message_MinLength'|localizeFilter}}
          {{ $v.password.$params.minLength.min }} </small
        >
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{ invalid: $v.name.$dirty && !$v.name.required }"
        />
        <label for="name">{{'Name'|localizeFilter}}</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
          >{{'Message_EnterName'|localizeFilter}}</small
        >
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>{{'AcceptRules'| localizeFilter}}</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          {{'Register'|localizeFilter}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{'HasAccount'|localizeFilter}}
        <router-link to="/login">{{'Login'| localizeFilter}}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
/* eslint-disable */
import { required, minLength, email } from "vuelidate/lib/validators";
export default {
  name: "Register",
  metaInfo() {
    return {
      title: this.$title('Register')
    }
  },
  data: () => ({
    email: "",
    password: "",
    name: "",
    agree: false
  }),
  validations: {
    password: {
      required,
      minLength: minLength(6)
    },
    email: {
      email,
      required
    },
    name: {
      required
    },
    agree: {
      checked: v => v
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      };
      try {
        await this.$store.dispatch("register", formData);
        this.$router.push("/");
      } catch (e) {}
    }
  }
};
</script>
