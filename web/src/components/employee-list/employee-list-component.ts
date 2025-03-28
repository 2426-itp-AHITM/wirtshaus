import { html, render } from "lit-html";
import { Employee } from "../../interfaces/employee";
import { loadAllEmployees } from "./employee-list-service";
import { model, subscribe } from "../../model/model";

class EmployeeListComponent extends HTMLElement {
   constructor() {
      super();
      this.attachShadow({ mode: "open" });
   }

   async connectedCallback() {
      const cssResponse = await fetch("../../../style.css");
      const css = await cssResponse.text();

      const styleElement = document.createElement("style");
      styleElement.textContent = css;

      this.shadowRoot.appendChild(styleElement);

      subscribe(model => {
         console.log("Model updated:", model);
         this.render(model.employees, model.activeEmployeeId);
      });

      await loadAllEmployees();
   }

   render(employees: Employee[], activeEmployeeId: number) {
      render(this.template(employees, activeEmployeeId), this.shadowRoot);
   }

   template(employees: Employee[], activeEmployeeId: number) {
      const rows = employees.map(employee =>
         html`
            <tr @click=${() => this.showEmployeeDetail(employee.id)} class="is-clickable">
               <td>${employee.firstname}</td>
               <td>${employee.lastname}</td>
            </tr>
         `
      );

      return html`
         <div class="container">
            <h2 class="title is-3">Employees</h2>
            <table class="table is-fullwidth is-bordered is-hoverable">
               <thead>
                  <tr>
                     <th>Firstname</th>
                     <th>Lastname</th>
                  </tr>
               </thead>
               <tbody>
                  ${rows}
               </tbody>
            </table>
            ${activeEmployeeId
               ? html`
                   <employee-detail-component .employeeId=${activeEmployeeId}></employee-detail-component>
                 `
               : html`<p class="subtitle">Select an employee to view details</p>`
            }
         </div>
      `;
   }

   showEmployeeDetail(id: number) {
      console.log("Selected Employee ID:", id);
      model.activeEmployeeId = id; // Update the model with the selected employee ID
   }
}

customElements.define("employee-list-component", EmployeeListComponent);