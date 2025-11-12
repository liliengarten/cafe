import {reactive, ref} from "vue";
import {baseUrl} from "@/main";

export const store = reactive({
    user: {},
    userRole: '',

    employee: {},
    employees: {},

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
            this.employees = data
        } catch (err) {
            console.log(err)
        }
    },
    async getEmployee(id, currentUser){
        let userId = id

        if (currentUser) {
            for (let employee of this.employees) {
                if (employee.login === localStorage.getItem("userLogin")) {
                    userId = employee.id
                }
            }
        }

        try {
            const res = await fetch(baseUrl + '/user/' + userId, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("userToken")}`
                }
            })

            if (!res.ok) throw "Something went wrong :("

            const { data } = await res.json();

            if (currentUser) {
                this.user = data
                this.userRole = data.group
            }
            else this.employee = data

            console.log(this.userRole)
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
    }
})

