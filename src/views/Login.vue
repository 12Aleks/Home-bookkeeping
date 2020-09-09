<template>
<form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
        <span class="card-title">Домашняя бухгалтерия</span>
        <div class="input-field">
            <input id="email" type="text" v-model.trim="email" :class="{
            invalid:
              ($v.email.$dirty && !$v.email.required) ||
              ($v.email.$dirty && !$v.email.email)
          }" />
            <label for="email">Email</label>
            <small class="helper-text invalid" v-if="$v.email.$dirty && !$v.email.required">Введите данные в поле Email</small>
            <small class="helper-text invalid" v-else-if="$v.email.$dirty && !$v.email.email">Введите корректный Email</small>
        </div>
        <div class="input-field">
            <input id="password" type="password" v-model.trim="password" :class="{
            invalid:
              ($v.password.$dirty && !$v.password.required) ||
              ($v.password.$dirty && !$v.password.minLength)
          }" />
            <label for="password">Пароль</label>
            <small class="helper-text invalid" v-if="$v.password.$dirty && !$v.password.required">Введите данные в поле Password</small>
            <small class="helper-text invalid" v-else-if="$v.password.$dirty && !$v.password.minLength">Минимальная длина пароля {{$v.password.$params.minLength.min}} символов. Введено {{password.length}}</small>
        </div>
    </div>
    <div class="card-action">
        <div>
            <button class="btn waves-effect waves-light auth-submit" type="submit">
                Войти
                <i class="material-icons right">send</i>
            </button>
        </div>
        <!-- <p v-colored:background.font="'blue'">Test</p> -->
        <p class="center">
            Нет аккаунта?
            <router-link to="/register">Зарегистрироваться</router-link>
        </p>
    </div>
</form>
</template>

<script>
import {
    email,
    required,
    minLength
} from "vuelidate/lib/validators";
export default {
    name: "Login",
    data: () => ({
        email: "",
        password: ""
    }),
    validations: {
        password: {
            required,
            minLength: minLength(6)
        },
        email: {
            email,
            required
        }
    },
    mounted() {
        this.$message('Test');
        this.$styleCorrectly('red')
    },
    methods: {
        submitHandler() {
            if (this.$v.$invalid) {
                this.$v.$touch();
                return;
            }
            const formData = {
                eamil: this.email,
                password: this.password
            }

            console.log(formData)
            this.$router.push("/");
        }
    }
};
</script>
