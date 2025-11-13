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
    employeeDetailedVisibility() {
        this.employeeDetailedVisible = !this.employeeDetailedVisible
    },
    addShiftVisibility() {
        this.addShiftVisible = !this.addShiftVisible
    },
    shiftDetailedVisibility() {
        this.shiftDetailedVisible = !this.shiftDetailedVisible
    },

    async getUserRole() {
        try {
            const adminCheck = await fetch(baseUrl + '/user', {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("userToken")}`,
                }
            })

            if (adminCheck.status === 200) {
                this.userRole = 'Администратор'
                return
            }

            else {
              const cookCheck = await fetch(baseUrl + '/order/taken/get', {
                method: "GET",
                headers: {
                  "Authorization": `Bearer ${localStorage.getItem("userToken")}`,
                }
              })

              if (cookCheck.status === 200) {
                this.userRole = 'Повар'
                return
              }
            }
        } catch(err) {
            console.log(1)
        }
    },
    async getEmployees() {
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
    // async getUser(id) {
    //     try {
    //         const res = await fetch(baseUrl + '/user/' + id, {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${localStorage.getItem("userToken")}`
    //             }
    //         })
    //
    //         if (!res.ok) throw "Something went wrong :("
    //
    //         const { data } = await res.json();
    //
    //         this.user.value = data
    //         this.employee.value = data
    //     } catch (err) {
    //         console.log(err)
    //     }
    //
    // }
})

