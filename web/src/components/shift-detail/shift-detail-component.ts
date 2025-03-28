import { html, render } from "lit-html"
import { Shift } from "../../interfaces/shift"
import { loadShiftDetailed } from "./shift-detail-service"
import RoleMapper from "../../mapper/role-mapper"
import EmployeeMapper from "../../mapper/employee-mapper"
import { DateTime } from "luxon"
import { model, subscribe } from "../../model/model"

class ShiftDetailComponent extends HTMLElement {
   private roleMapper = new RoleMapper()
   private employeeMapper = new EmployeeMapper()
   private _shiftId: number | null = null

   constructor() {
      super()
      this.attachShadow({ mode: "open" })
   }

   static get observedAttributes() {
      return ['shift-id']
   }

   get shiftId() {
      return this._shiftId
   }

   set shiftId(value: number | null) {
      if (this._shiftId === value) {
         this.renderShiftDetails();
      } else {
         this._shiftId = value;
         this.renderShiftDetails();
      }
   }

   async connectedCallback() {
      subscribe(() => {
         this.shiftId = model.activeShiftId
      })
   }

   closeModal() {
      this.shadowRoot.getElementById('shiftModal')?.classList.remove('is-active')
      model.activeShiftId = null
   }

   async renderShiftDetails() {
      if (!this._shiftId) return;
   
      const cssResponse = await fetch("../../../style.css");
      const css = await cssResponse.text();
      const styleElement = document.createElement("style");
      styleElement.textContent = css;
      this.shadowRoot.appendChild(styleElement);
   
      const shift = await loadShiftDetailed(this._shiftId);
      const assignments = await this.loadAssignments(this._shiftId);
      const employeeRoleData = await this.mapAssignmentsToEmployeeRoles(assignments);
   
      render(this.modalTemplate(shift, employeeRoleData), this.shadowRoot);
      this.shadowRoot.getElementById("shiftModal")?.classList.add("is-active");
   }

   async loadAssignments(shiftId: number) {
      const response = await fetch(`/api/assignments/shift/${shiftId}`)
      return await response.json()
   }

   async mapAssignmentsToEmployeeRoles(assignments: { employee: number; role: number; confirmed: boolean }[]) {
      const employeeIds = [...new Set(assignments.map(a => a.employee))]
      const roleIds = [...new Set(assignments.map(a => a.role))]
      const confirmed = [...new Set(assignments.map(a => a.confirmed))]

      const employeeNames = await this.employeeMapper.mapEmployeeIdsToNames(employeeIds)
      const roleNames = await this.roleMapper.mapRoleIdsToNames(roleIds)

      const employeeMap = Object.fromEntries(employeeIds.map((id, index) => [id, employeeNames[index]]))
      const roleMap = Object.fromEntries(roleIds.map((id, index) => [id, roleNames[index]]))

      return assignments.map(a => ({
         employeeName: employeeMap[a.employee],
         roleName: roleMap[a.role],
         confirmed: a.confirmed
      }))
   }

   modalTemplate(shift: Shift, employeeRoleData: { employeeName: string; roleName: string; confirmed: boolean}[]) {
      const shiftStart = DateTime.fromISO(shift.startTime);
      const shiftEnd = DateTime.fromISO(shift.endTime);

      let formattedDate: string;

      if (shiftStart.hasSame(shiftEnd, "day") && shiftStart.hasSame(shiftEnd, "month") && shiftStart.hasSame(shiftEnd, "year")) {
         formattedDate = shiftStart.toLocaleString(DateTime.DATE_HUGE) + ` ${shiftStart.toFormat("HH:mm")}` +
            " - " +
            shiftEnd.toFormat("HH:mm");      
      } else {
         formattedDate = shiftStart.toLocaleString(DateTime.DATE_MID) + ` ${shiftStart.toFormat("HH:mm")}` +
            " - " +
            shiftEnd.toLocaleString(DateTime.DATE_MID) + ` ${shiftEnd.toFormat("HH:mm")}`;
      }

      
      console.log(formattedDate);

      return html`
         <div class="modal" id="shiftModal">
            <div class="modal-background"></div>
            <div class="modal-card">
               <header class="modal-card-head">
                  <p class="modal-card-title">
                     <time datetime="${shift.startTime}">${formattedDate}</time>
                  </p>
                  <button class="delete" aria-label="close" @click=${() => this.closeModal()}></button>
               </header>
               <section class="modal-card-body">
                  <h3 class="">${shift.company_name}</h3>
                  <h2 style="font-weight: bold">Employees:</h2>
                  <table class="styled-table">
                     <tbody>
                        ${employeeRoleData.map(
                           data => html`
                              <tr>
                                 <td>${data.employeeName}</td>
                                 <td>${data.roleName}</td>
                                 <td>${data.confirmed === true ? html`
                                    <p class="subtitle is-6 my-1 has-text-success">Confirmed</p>
                                  ` : data.confirmed === false ? html`
                                    <p class="subtitle is-6 my-1 has-text-danger">Dismissed</p>
                                  ` : html`
                                    <p class="subtitle is-6 my-1 has-text-warning">Not confirmed yet</p>
                                  `
                                }</td>
                              </tr>
                           `
                        )}
                     </tbody>
                  </table>
                  <br>
                  <p>This is a hard coded to show the idea<p>
                  <table class="styled-table">
                     <tbody>
                        <tr>
                           <td>
                              <div class="select">
                                 <select>
                                    <option value="1" selected>Emp 1</option>
                                    <option value="2">Emp 2</option>
                                 </select>
                              </div>
                           </td>
                           <td>
                              <div class="select">
                                 <select>
                                    <option value="1" selected>Koch</option>
                                    <option value="2">Kellner</option>
                                 </select>
                              </div>
                           </td>
                           <td>
                              
                           </td>
                           <td>
                              <p>Manager View</p>
                           </td> 
                        </tr>

                        <tr>
                           <td>
                              <p>John Doe</p>
                           </td>
                           <td>
                              <p>Koch</p>
                           </td>
                           <td>
                              <div class="select">
                                 <select>
                                    <option value="1" selected>Confirmed</option>
                                    <option value="2">Dismissed</option>
                                 </select>
                              </div>
                           </td>
                           <td>
                              <p>Employee View</p>
                           </td>  
                        </tr>
                     </tbody>
                  </table>
               </section>
               <footer class="modal-card-foot">
                  <button class="button" @click=${() => this.closeModal()}>Close</button>
               </footer>
            </div>
         </div>
      `
   }
}

customElements.define("shift-detail-component", ShiftDetailComponent)