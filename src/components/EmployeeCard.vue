<script setup>
  import {baseUrl} from "@/main";
  import {onMounted, reactive, ref} from "vue";

  const props = defineProps({
    user: {
      type: Number,
      required: true
    }
  })

  let currentUser = reactive({})

  let getUser = async() => {
    try {
      const res = await fetch(baseUrl + '/user/' + props.user, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("userToken")}`
        }
      })

      if (!res.ok) throw "Something went wrong :("

      const { data } = await res.json();
      Object.assign(currentUser, data)
    } catch(err) {
      console.log(err)
    }
  }

  onMounted(() => {
    getUser()
  })
</script>

<template>
  <div class="worker">
    <div class="d-f">
      <p>ФИО: </p>
      <p>{{ currentUser.name }}</p>
      <p>{{ currentUser.surname }}</p>
      <p>{{ currentUser.patronymic }}</p>
    </div>
    <div class="d-f">
      <p>Логин:</p>
      <p>{{currentUser.login}}</p>
    </div>

    <p>{{currentUser.group}}</p>
    <img v-if="currentUser.photo_file" :src="baseUrl + currentUser.photo_file" alt="worker photo">
  </div>
</template>

<style scoped>
.d-f {
  display: flex;
}
</style>