import { html, render } from "lit-html";

const dashboardTemplate = (handleClick) => {
   const cards = [
      {
         title: "Employee List",
         description: "View all employees",
         icon: "👥",
         link: "#/employee-list"
      },
      {
         title: "Message Employees",
         description: "Communicate with employees",
         icon: "🗣️",
         link: "#/message-employees"
      },
      {
         title: "Add Role",
         description: "Add new roles",
         icon: "➕",
         link: "#/add-role"
      },
      {
         title: "Calendar",
         description: "Look up the calendar",
         icon: "📅",
         link: "#/calendar"
      }
   ];

   const cardTemplates = cards.map(
      (card) => html`
      <div>
         <div class="card" @click="${() => handleClick(card.link)}">
            <div class="card-content">
               <div class="content">
                  <div class="is-flex is-align-items-bottom" style="">   
                     <p class="title">${card.icon}</p>
                     <p class="title">${card.title}</p>
                  </div>
                  <p class="subtitle">${card.description}</p>
               </div>
            </a>
         </div>
      </div>
      `
   );

   return html`
   <div class="is-flex mt-6">
      <div class="grid-container home-grid-element is-gap-1">
         ${cardTemplates}
      </div>
      <!-- old version with shift-list-component
      <shift-list-component class="home-grid-element"></shift-list-component>
      -->
      <calendar-component class="home-grid-element"></calendar-component>
   </div>
   
   
   
   `;
};

class HomeComponent extends HTMLElement {
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

      const handleClick = (link) => {
         window.location.href = link;
      };

      render(dashboardTemplate(handleClick), this.shadowRoot);
   }
}

customElements.define("home-component", HomeComponent);