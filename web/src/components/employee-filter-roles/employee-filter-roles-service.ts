import { Employee } from "../../models/employee"

const BASE_URL = "/api"
const role_id = new URLSearchParams(window.location.search).get("role_id")

export async function loadEmployeesFilteredByRole(role_name: string) { 
   console.log("###################################")
   console.log("Role ID: "+role_id)  
   console.log("Role Name: "+role_name)
   const response = await fetch(`${BASE_URL}/employees/role/1`)
   const employees: Employee[] = await response.json()
   
   console.log(role_name);
   console.log(employees);
   return employees
}
