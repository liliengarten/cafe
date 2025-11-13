<script setup>
import { baseUrl } from "@/main";
import { store } from "@/store";
import { useRouter } from "vue-router";

const router = useRouter();

let logout = async () => {
  try {
    const res = await fetch(baseUrl + "/logout", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });

    if (!res.ok) throw "Something went wrong";

    localStorage.setItem("userToken", "");
    localStorage.setItem("userLogin", "");

    router.push("/");
  } catch (err) {
    console.log(err);
  }
};
</script>

<template>
  <header>
    <router-link to="/home">
      <img src="@/assets/img/logo.png" alt="logo" />
    </router-link>
    <nav>
      <router-link to="employees">Сотрудники</router-link>
      <router-link v-show="store.userRole === 'Администратор'" to="shifts"
        >Смены</router-link>
      <router-link to="orders">Заказы</router-link>
      <a href="#" @click="logout" class="cancel_button">Выход</a>
    </nav>
  </header>
</template>

<style scoped></style>
