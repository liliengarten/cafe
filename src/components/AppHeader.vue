<script setup>
import {baseUrl} from "@/main";
import {store} from "@/store";
import { useRouter} from "vue-router";

const router = useRouter();

let logout = async() => {
  try {
    const res = await fetch(baseUrl + '/logout', {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("userToken")}`,
      }
    })

    if (!res.ok) throw 'Something went wrong'

    localStorage.setItem("userToken", '')
    localStorage.setItem("userLogin", '')

    router.push('/')
  } catch(err) {
    console.log(err)
  }
}

</script>

<template>
  <header>
    <article>
      <img src="@/assets/img/logo.png" alt="logo">
    </article>
    <nav>
      <router-link to="employees">Сотрудники</router-link>
      <router-link to="shifts">Смены</router-link>
      <router-link to="orders">Заказы</router-link>
      <button @click="logout" class="cancel_button">Выход</button>
    </nav>
  </header>
</template>

<style scoped>

</style>