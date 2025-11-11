<script setup>
import {store} from "@/store/index"
</script>

<template>
  <section class="employees">
    <article>
      <span>Имя</span>
      <span>Статус</span>
      <span>Должность</span>
      <button @click="store.addWorkerVisibility">+</button>
    </article>
    <article>
      <span>Ariane</span>
      <span class="working">Работает</span>
      <span>Администратор</span>
      <button>Подробнее</button>
    </article>
    <article>
      <span>John</span>
      <span class="fired">Уволен</span>
      <span>Администратор</span>
      <button>Подробнее</button>
    </article>
    <article>
      <span>Ariane</span>
      <span class="working">Работает</span>
      <span>Администратор</span>
      <button>Подробнее</button>
    </article>
    <article>
      <span>Ariane</span>
      <span class="working">Работает</span>
      <span>Официант</span>
      <button>Подробнее</button>
    </article>
    <article>
      <span>John</span>
      <span class="fired">Уволен</span>
      <span>Повар</span>
      <button>Подробнее</button>
    </article>
  </section>
</template>

<style scoped>

</style>