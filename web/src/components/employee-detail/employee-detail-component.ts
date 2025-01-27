import { html, render } from "lit-html";
import { Employee } from "../../interfaces/employee";
import { model } from "../../model/model";
import RoleMapper from "./../../mapper/role-mapper";
import { loadEmployeeDetails } from "../employee-edit/employee-edit-service";


class EmployeeDetailComponent extends HTMLElement {
   private _employeeId: string = "";
   private roleMapper = new RoleMapper();

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

   async renderEmployeeDetails() {
      if (!this._employeeId) return;

      const cssResponse = await fetch("../../../style.css");
      const css = await cssResponse.text();
      
      const styleElement = document.createElement("style");
      styleElement.textContent = css;
      this.shadowRoot.appendChild(styleElement);

      // Hole den Mitarbeiter entweder aus dem Modell oder von der API, wenn nicht im Modell
      let employee = model.employees.find(emp => emp.id === Number(this._employeeId));
      
      if (!employee) {
         await loadEmployeeDetails(Number(this._employeeId));
         model.employees.push(employee); // Speichere den Mitarbeiter im Modell
      }

      const roleNames = await this.roleMapper.mapRoleIdsToNames(employee.roles);

      render(this.detailTemplate(employee, roleNames.join(', ')), this.shadowRoot);
   }

   connectedCallback() {
      this.renderEmployeeDetails();
   }

   attributeChangedCallback(name: string, oldValue: string, newValue: string) {
      if (name === "employee-id") {
         this.employeeId = newValue;
      }
   }

   detailTemplate(employee: Employee, roleNames: string) {
      return html`
         <h2>${employee.firstname} ${employee.lastname}</h2> 
         <h3><i>${employee.company_name}</i></h3>
         <p><b>Employee ID:</b> ${employee.id}</p>
         <p><b>Birthdate:</b> ${employee.birthdate}</p>
         <p><b>Email:</b> ${employee.email}</p>
         <p><b>Telephone:</b> ${employee.telephone}</p>
         <p><b>Roles:</b> ${roleNames}</p>
      `;
   }
}

customElements.define("employee-detail-component", EmployeeDetailComponent);