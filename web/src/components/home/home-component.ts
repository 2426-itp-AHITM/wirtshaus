import { html, render } from "lit-html";

const dashboardTemplate = () => {
   const cards = [
      {
         title: "Remove Shift",
         description: "Remove existing shifts",
         icon: "➖",
         link: "#/remove-shift",
         class: "small",
      },
      {
         title: "Add Shift",
         description: "Add new shifts",
         icon: "➕",
         link: "#/add-shift",
         class: "small",
      },
      {
         title: "Edit Employees",
         description: "Edit employee details",
         icon: "👤",
         link: "#/edit-employees",
         class: "small",
      },
      {
         title: "Employee List",
         description: "View all employees",
         icon: "👥",
         link: "#/employee-list",
         class: "small",
      },
      {
         title: "Calendar",
         description: "Check schedules",
         icon: "📅",
         link: "#/calendar",
         class: "wide",
      },
      {
         title: "Message Employees",
         description: "Communicate with employees",
         icon: "💬",
         link: "#/message-employees",
         class: "wide",
      },
   ];

   const cardTemplates = cards.map(
      (card) => html`
      <a href="${card.link}" class="card">
            <div class="icon">${card.icon}</div>
            <h3>${card.title}</h3>
            <p>${card.description}</p>
         </div>
      `
   );

   return html`
      <header>
         <h1>Alexander's Company</h1>
         <p class="manager">Manager: Alexander Hahn</p>
      </header>
      <main>
         <section class="dashboard">
            ${cardTemplates}
         </section>
      </main>
   `;
};

class HomeComponent extends HTMLElement {
   constructor() {
      super()
      this.attachShadow({mode: "open"})
   }

   async connectedCallback() {
      const cssResponse = await fetch("../../../style.css")
      const css = await cssResponse.text()

      const styleElement = document.createElement("style")
      styleElement.textContent = css

      this.shadowRoot.appendChild(styleElement)

      render(dashboardTemplate(), this.shadowRoot);
   }
}

customElements.define("home-component", HomeComponent);
