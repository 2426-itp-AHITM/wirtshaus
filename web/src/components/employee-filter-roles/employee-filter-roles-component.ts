import { html, render } from "lit-html"
import { Employee } from "../../models/employee"
import { loadEmployeesFilteredByRole } from "./employee-filter-roles-service"

class EmployeeFilterRolesComponent extends HTMLElement {
   inputValue: string = ""
   employees: Employee[] = []

   async connectedCallback() {
      this.renderComponent();
   }

   renderComponent() {
      render(
         this.tableTemplate(
            this.employees
         ),
         this
      );
   }

   handleFilter = async () => { // Arrow function ensures `this` is correct
      if (true) {
         this.employees = await loadEmployeesFilteredByRole(this.inputValue);
         this.renderComponent();
      }
   }

   tableTemplate(employees: Employee[]) {
      const rows = employees.map(employee =>
         html`<tr>
               <td>${employee.firstname}</td>
               <td>${employee.lastname}</td>
               <td>${employee.email}</td>
               <td>${employee.telephone}</td>
               <td>${employee.birthdate}</td>
               <td>${employee.company_name}</td>
            </tr>`
      )
      //TODO: suche direkt nach eingabe debounce
      return html`
         <h2>Filter employees after roles</h2>
         
            <label for="role_name">Role Name</label>
            <input type="text" id="role_name" name="role_name" 
            />
            <button @click=${()=>this.onButtonClicked()}>Filter</button>
   
         <table>
            <thead>
               <tr>
                  <td>Firstname</td>
                  <td>Lastname</td>
                  <td>E-mail</td>
                  <td>Tel</td>
                  <td>Birthdate</td>
                  <td>Company Name</td>
               </tr>
            </thead>
            <tbody>
               ${rows}
            </tbody>
         </table>
      `
   }
   
   async onButtonClicked() {
      const input = this.querySelector("input")
      this.employees = await loadEmployeesFilteredByRole(input?.value)
      this.connectedCallback()
   }

   
}
customElements.define("employee-filter-roles-component", EmployeeFilterRolesComponent)