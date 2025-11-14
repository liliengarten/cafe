import { reactive, ref } from "vue";
import { baseUrl } from "@/main";

export const store = reactive({
  user: ref({}),
  userRole: ref({}),

  photoPath: ref(''),

  employee: ref({}),
  employees: ref({}),

  shift: ref({}),
  employeeShift: ref({}),
  shifts: {},

  menu: ref({}),
  orders: ref({}),
  order: ref({}),

  addWorkerVisible: false,
  addShiftVisible: false,
  addOrderVisible: false,
  shiftDetailedVisible: false,
  employeeDetailedVisible: false,
  orderDetailedVisible: false,

  addWorkerVisibility() {
    this.addWorkerVisible = !this.addWorkerVisible;
  },
  employeeDetailedVisibility() {
    this.employeeDetailedVisible = !this.employeeDetailedVisible;
  },
  addShiftVisibility() {
    this.addShiftVisible = !this.addShiftVisible;
  },
  shiftDetailedVisibility() {
    this.shiftDetailedVisible = !this.shiftDetailedVisible;
  },
  orderDetailedVisibility() {
    this.orderDetailedVisible = !this.orderDetailedVisible;
  },
  addOrderVisibility() {
    this.addOrderVisible = !this.addOrderVisible;
  },

  async getUserRole() {
    try {
      const adminCheck = await fetch(baseUrl + "/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });

      if (adminCheck.status === 200) {
        this.userRole.value = "Администратор";
        return;
      } else {
        const cookCheck = await fetch(baseUrl + "/order/taken/get", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        });

        if (cookCheck.status === 200) {
          this.userRole.value = "Повар";
          return;
        }
      }

      this.userRole.value = "Официант";
    } catch (err) {
      console.log(err);
    }
  },
  async getEmployees() {
    try {
      const res = await fetch(baseUrl + "/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });

      if (!res.ok) throw "Authorization failed :(";

      const { data } = await res.json();
      this.employees.value = data;
    } catch (err) {
      console.log(err);
    }
  },
  async getEmployee(id) {
    try {
      const res = await fetch(baseUrl + "/user/" + id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });

      if (!res.ok) throw "Something went wrong :(";

      const { data } = await res.json();
      this.employee.value = data;
      this.photoPath.value = data.photo_file
      console.log(this.photoPath.value)
    } catch (err) {
      console.log(err);
    }
  },
  async getShifts() {
    try {
      const res = await fetch(baseUrl + "/work-shift", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });

      if (!res.ok) throw "Authorization failed :(";

      const data = await res.json();
      this.shifts = data;
    } catch (err) {
      console.log(err);
    }
  },
  async getOrders() {
    try {
      const res = await fetch(baseUrl + "/order/taken/get", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });

      if (!res.ok) throw "Can't get orders";

      const { data } = await res.json();
      this.orders.value = data;
      this.order.value = data;
    } catch (err) {
      console.log(err);
    }
  },
  setShift(shift) {
    this.shift.value = shift;
  },
  setEmployee(employee) {
    this.employee.value = employee;
  },
  setOrder(order) {
    this.order.value = order;
  },
  async getEmployeeShift() {
    try {
      const res = await fetch(baseUrl + "/work-shift/active/get", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });

      if (!res.ok) throw "Can't get orders";

      const { data } = await res.json();
      this.employeeShift.value = data.id;
    } catch (err) {
      console.log(err);
    }
  },
  async getWaiterOrders() {
    await this.getEmployeeShift();
    try {
      const res = await fetch(
        baseUrl + `/work-shift/${this.employeeShift.value}/order`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      if (!res.ok) throw "Can't get orders";

      const { data } = await res.json();

      const login = localStorage.getItem("userLogin");
      let orders = [];

      for (let order of data.orders) {
        if (order.shift_workers === login) orders.push(order);
      }

      this.orders.value = orders;
    } catch (err) {
      console.log(err);
    }
  },
  async getMenu() {
    try {
      const res = await fetch(baseUrl + `/menu`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          "content-type": "application/json",
        },
      });

      if (!res.ok) throw "can't change order status :(";

      const data = await res.json();
      this.menu.value = data;
    } catch (err) {
      console.log(err);
    }
  },
});
