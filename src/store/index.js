import {reactive, ref} from "vue";
import {baseUrl} from "@/main";

export const store = reactive({
    user: ref({}),
    userRole: '',

    employee: ref({}),
    employees: ref({}),

    shift: ref({}),
    shifts: {},

    addWorkerVisible: false,
    addShiftVisible: false,
    shiftDetailedVisible: false,
    employeeDetailedVisible: false,


    addWorkerVisibility() {
        this.addWorkerVisible = !this.addWorkerVisible;
    },
    employeeDetailedVisiblity() { // опечатка!
        this.employeeDetailedVisible = !this.employeeDetailedVisible
    },
    addShiftVisibility() {
        this.addShiftVisible = !this.addShiftVisible
    },
    shiftDetailedVisibility() {
        this.shiftDetailedVisible = !this.shiftDetailedVisible
    },

    async getEmployees(){
        try {
            const res = await fetch(baseUrl + '/user', {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("userToken")}`,
                }
            })

            if (!res.ok) throw "Authorization failed :("

            const { data } = await res.json();
            this.employees.value = data
        } catch (err) {
            console.log(err)
        }
    },
    async getEmployee(id){
        try {
            const res = await fetch(baseUrl + '/user/' + id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("userToken")}`
                }
            })

            if (!res.ok) throw "Something went wrong :("

            const { data } = await res.json();
            this.employee.value = data
        } catch (err) {
            console.log(err)
        }
    },
    async getShifts () {
        try {
            const res = await fetch(baseUrl + '/work-shift', {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("userToken")}`
                }
            })

            if (!res.ok) throw "Authorization failed :("

            const data = await res.json();
            this.shifts = data
        } catch (err) {
            console.log(err)
        }
    },

    setShift(shift) {
        this.shift.value = shift
    },
    setEmployee(employee) {
        this.employee.value = employee
    },
    async getUser(login) {
        let id = 0

        for (let employee of this.employees) {
            if (employee.login === login) {
                id = employee.id;
            }
        }

        try {
            const res = await fetch(baseUrl + '/user/' + id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("userToken")}`
                }
            })

            if (!res.ok) throw "Something went wrong :("

            const { data } = await res.json();
            this.user.value = data
            this.employee.value = data
            this.userRole = data.group
        } catch (err) {
            console.log(err)
        }

    }
})

