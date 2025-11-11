import {reactive, ref} from "vue";

export const store = reactive({
    user: ref({}),
    users: ref({}),
    addWorkerVisible: false,

    addWorkerVisibility() {
        this.addWorkerVisible = !this.addWorkerVisible;
    }
})

