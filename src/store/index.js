import {reactive, ref} from "vue";
import {baseUrl} from "@/main";

export const store = reactive({
    employee: {},
    employees: {},

    addWorkerVisible: false,

    addWorkerVisibility() {
        this.addWorkerVisible = !this.addWorkerVisible;
    },
})

