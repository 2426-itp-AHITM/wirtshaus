import { html, render } from "lit-html"
import "./employee-list"
<<<<<<< HEAD
import "./activity-list"
=======
import "./role-list"
<<<<<<< HEAD
>>>>>>> 25f0048dfe0bc72b7bff1abf04eb511d013b793e
=======
import "./manager-list"
>>>>>>> 2e055d1f88d460897b585225a24904300bb19df4

const content = html`
    <div class="container">
        <button onclick="document.getElementById('employee-list-component').style.display = 'inline'; document.getElementById('role-list-component').style.display = 'none';">Employee List</button>
        <button onclick="document.getElementById('role-list-component').style.display = 'inline'; document.getElementById('employee-list-component').style.display = 'none';">Role List</button>
        
        <employee-list-component style="display: none" id="employee-list-component"></employee-list-component>
        <role-list-component style="display: none" id="role-list-component"></role-list-component>
        <manager-list-component style="display: inline" id="manager-list-component"></manager-list-component>
    </div>
<<<<<<< HEAD


=======
>>>>>>> 25f0048dfe0bc72b7bff1abf04eb511d013b793e
`

class AppComponent extends HTMLElement {
    connectedCallback() {
        render(content, this)
    }
}
customElements.define("app-component", AppComponent)