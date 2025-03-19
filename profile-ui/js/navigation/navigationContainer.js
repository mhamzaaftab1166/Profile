class NavigationSection extends HTMLElement {
    constructor() {
      super();
      // Define your navigation items here.
      // The require() calls assume you are using a bundler that supports them.
      this.navigation = [
        {
          id: 1,
          title: "Full Page",
          activeIcon: "assets/icons/fullPage-white.png",
          defaultIcon: "assets/icons/fullpage.png"
        },
        {
          id: 2,
          title: "Menus",
          activeIcon: "assets/icons/inventory-white.png",
          defaultIcon: "assets/icons/inventory-black.png"
        },
        {
          id: 3,
          title: "Services",
          activeIcon: "assets/icons/services-white.png",
          defaultIcon: "assets/icons/services-black.png"
        },
        {
          id: 4,
          title: "News",
          activeIcon: "assets/icons/news-white.png",
          defaultIcon: "assets/icons/news-black.png"
        },
        {
          id: 5,
          title: "Locations",
          activeIcon: "assets/icons/location-white.png",
          defaultIcon: "assets/icons/location-black.png"
        },
        {
          id: 6,
          title: "Management",
          activeIcon: "assets/icons/management-white.png",
          defaultIcon: "assets/icons/management-black.png"
        },
        {
          id: 7,
          title: "About",
          activeIcon: "assets/icons/about-white.png",
          defaultIcon: "assets/icons/about-black.png"
        }
      ];
      // Set an initial active navigation item.
      this.activeNavBar = null;
    }
  
    connectedCallback() {
      // Set a default active nav item, e.g., the first one.
      if (!this.activeNavBar && this.navigation.length) {
        this.activeNavBar = this.navigation[0].title;
      }
      this.render();
    }
  
    setActiveNavBar(title) {
      this.activeNavBar = title;
      this.render(); // re-render to update the view with new active state
    }
  
    render() {
      // Build the HTML using the navigation items.
      this.innerHTML = `
        <div class="navigation-flex">
          ${this.navigation
            .map(
              nav => `
            <div class="${
              this.activeNavBar === nav.title
                ? "navigation-active-wrapper"
                : "navigation-wrapper"
            }" data-title="${nav.title}">
              <img
                class="navigation-img"
                src="${
                  this.activeNavBar === nav.title ? nav.activeIcon : nav.defaultIcon
                }"
                alt="Navigation Sign"
              />
              <p class="${
                this.activeNavBar === nav.title
                  ? "navigation-active-title"
                  : "navigation-title"
              }">
                ${nav.title}
              </p>
            </div>
          `
            )
            .join("")}
        </div>
      `;
  
      // Attach click event listeners to each navigation item.
      const navItems = this.querySelectorAll(
        ".navigation-wrapper, .navigation-active-wrapper"
      );
      navItems.forEach(item => {
        item.addEventListener("click", () => {
          const title = item.getAttribute("data-title");
          this.setActiveNavBar(title);
        });
      });
    }
  }
  
  customElements.define("navigation-section", NavigationSection);
  