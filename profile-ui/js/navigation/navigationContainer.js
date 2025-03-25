class NavigationSection extends HTMLElement {
  constructor() {
    super();
    this.navigation = [
      { id: 1, title: "Full Page", activeIcon: "assets/icons/fullPage-white.png", defaultIcon: "assets/icons/fullpage.png" },
      { id: 2, title: "Menus", activeIcon: "assets/icons/inventory-white.png", defaultIcon: "assets/icons/inventory-black.png" },
      { id: 3, title: "Services", activeIcon: "assets/icons/services-white.png", defaultIcon: "assets/icons/services-black.png" },
      { id: 4, title: "News", activeIcon: "assets/icons/news-white.png", defaultIcon: "assets/icons/news-black.png" },
      { id: 5, title: "Locations", activeIcon: "assets/icons/location-white.png", defaultIcon: "assets/icons/location-black.png" },
      { id: 6, title: "Management", activeIcon: "assets/icons/management-white.png", defaultIcon: "assets/icons/management-black.png" },
      { id: 7, title: "About", activeIcon: "assets/icons/about-white.png", defaultIcon: "assets/icons/about-black.png" }
    ];
    this.activeNavBar = null;
  }

  connectedCallback() {
    if (!this.activeNavBar && this.navigation.length) {
      this.activeNavBar = this.navigation[0].title;
    }
    this.render();
  }

  setActiveNavBar(title) {
    this.activeNavBar = title;
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="navigation-flex">
        ${this.navigation
          .map(nav => `
          <div class="${this.activeNavBar === nav.title ? "navigation-active-wrapper" : "navigation-wrapper"}" data-title="${nav.title}">
            <img class="navigation-img" src="${this.activeNavBar === nav.title ? nav.activeIcon : nav.defaultIcon}" alt="Navigation Sign" />
            <p class="${this.activeNavBar === nav.title ? "navigation-active-title" : "navigation-title"}">${nav.title}</p>
          </div>
        `)
          .join("")}
      </div>
    `;

    // Attach click event listeners to each navigation item.
    const navItems = this.querySelectorAll(".navigation-wrapper, .navigation-active-wrapper");
    navItems.forEach(item => {
      item.addEventListener("click", () => {
        const title = item.getAttribute("data-title");
        this.setActiveNavBar(title);

        // Scroll to the section with the corresponding ID.
        const section = document.getElementById(title);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  }
}

customElements.define("navigation-section", NavigationSection);
