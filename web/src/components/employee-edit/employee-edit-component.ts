import { html, render } from "lit-html";
import { Employee } from "../../models/employee";
import { loadEmployeeDetails } from "./employee-edit-service";
import RoleMapper from "../../mapper/role-mapper";

class EmployeeEditComponent extends HTMLElement {
   private _employeeId: string = "";
   private roleMapper = new RoleMapper();

   employee = {
      firstname : "",
      lastname : "",
      birthdate : "",
      email : "",
      telephone : ""
   }

   roleNames: String[] = [];

   constructor() {
      super();
      this.attachShadow({ mode: "open" });
   }

   static get observedAttributes() {
      return ['employee-id'];
   }

   get employeeId() {
      return this._employeeId;
   }

   set employeeId(value: string) {
      const newValue = value || '';
      if (newValue !== this._employeeId) {
         this._employeeId = newValue;
         this.renderEmployeeDetails();
      }
   }

   connectedCallback() {
      this.renderEmployeeDetails();
   }

   attributeChangedCallback(name: string, oldValue: string, newValue: string) {
      if (name === "employee-id") {
         this.employeeId = newValue;
      }
   }
   
   async renderEmployeeDetails() {
      if (!this._employeeId) return;

      const cssResponse = await fetch("../../../style.css");
      const css = await cssResponse.text();

      const styleElement = document.createElement("style");
      styleElement.textContent = css;
      this.shadowRoot.appendChild(styleElement);

      console.log(this._employeeId);

      const employee = await loadEmployeeDetails(Number(this._employeeId));

      const roleNames = await this.roleMapper.mapRoleIdsToNames(employee.roles);

      render(this.detailTemplate(employee, roleNames.join(', ')), this.shadowRoot);
   }

   

   detailTemplate(employee: Employee, roleNames: string) {
      return html`
         <h2>
            <input type="text"
            value=${employee.firstname} />
            <input type="text"
            value=${employee.lastname} />
         </h2>
         <h3><i>${employee.company_name}</i></h3>
         <p><b>Employee ID:</b> ${employee.id}</p>
         <p>
            <b>Birthdate:</b>
            <input type="date"
              value=${employee.birthdate}
            />
         </p>
         <p>
            <b>Email:</b>
            <input type="email"
               value=${employee.email}
            />
         </p>
         <p>
            <b>Telephone:</b>
            <input type="text"
               value=${employee.telephone}
            />
         </p>
         <p><b>Roles:</b> ${roleNames}</p>

         <button>Edit Employee</button>
      `;
   }
}

customElements.define("employee-edit-component", EmployeeEditComponent);