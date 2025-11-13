<script setup>
import {store} from "@/store/index"
import {baseUrl} from "@/main";
import {reactive} from "vue";
const shiftInfo = reactive({
  start: '',
  end: ''
})

const emit = defineEmits(['shiftCreated'])

const addShift = async () => {
  console.log(shiftInfo)

  try {
    const res = await fetch(baseUrl + '/work-shift', {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("userToken")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        start: shiftInfo.start.replace(/T/g, ' '),
        end: shiftInfo.end.replace(/T/g, ' ')
      })
    })

    if (!res.ok) throw "Authorization failed :("

    emit('shiftCreated')
  } catch (err) {
    console.log(err)
  }
}



</script>

<template>
  <div class="modal">
    <div class="modalWrapper">
      <form>
        <h2>Добавление смены</h2>
        <div>
          <label for="start">Начало</label>
          <input type="datetime-local" name="login" id="start" v-model="shiftInfo.start">
        </div>
        <div>
          <label for="end">Конец</label>
          <input type="datetime-local" name="password" id="end" v-model="shiftInfo.end">
        </div>
        <div class="buttonSection">
          <button class="cancel_button" @click="store.addShiftVisibility">Отмена</button>
          <button class="approve_button" @click="addShift">Отправить</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>