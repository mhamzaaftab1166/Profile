class ProductSection extends HTMLElement {
  static get observedAttributes() {
    return ["products", "menus"];
  }

  constructor() {
    super();
    this.menuTabs = [{ name: "Exclusive" }, { name: "Menu Items" }];
    this.activeTab = "Exclusive";
    this.products = [];
    this.menus = [];
  }

  setActiveTab(tabName) {
    this.activeTab = tabName;
    this.render();
  }

  connectedCallback() {
    this.addEventListener("productDataReceived", (event) => {
      this.products = event.detail.products;
      this.menus = event.detail.menus;
      console.log(this.products, 'products');
      console.log(this.menus, 'menussssssss');
      
      
      this.render();
    });
  }

  render() {
    const filterListing = this.activeTab === "Exclusive" ? this.products : this.menus;
    this.innerHTML = `
            <div class="position-relative product-card">
                <div class="d-flex justify-content-between align-items-center">
                    <header class="product-head-title">Products</header>
                </div>
                <div class="product-separator"></div>

                <div class="product-tab-wrapper">
                    <div class="product-tab">
                        ${this.menuTabs
                          .map(
                            (tab, index) => `
                            <div key="${index}">
                                <p class="${
                                  this.activeTab === tab.name
                                    ? "product-tab-active"
                                    : ""
                                }" 
                                   data-tab="${tab.name}">
                                    ${tab.name}
                                </p>
                            </div>
                        `
                          )
                          .join("")}
                    </div>
                    <div class="product-separator-line"></div>
                    </div>
                    
                    <div class="menu-wrapper">
                        <div class="menu-grid">
                            ${filterListing
                              .map(
                                (product, index) => `
                                      <div key="${index}">
                                        <div class="property-card">
                                            <div class="relative">
                                                <img src="${ product?.menu_image ? `${product.menu_image}` : `https://api.servehere.com/api/storage/image?path=${product.image}`}" alt="Property Image" class="property-image" />
                                                ${product?.status === "active" ? `
                                                <div class="menu-tag-wrapper">
                                                    <div class="relative">
                                                        <img class="menu-tag menu-tag-purple" src="assets/icons/tagline-purple.png" alt="Tag Two" />
                                                        <p class="tag-content-purple">${
                                                         product?.menu_status || product?.status ===
                                                          "active"
                                                            ? "Active"
                                                            : ""
                                                        }</p>
                                                    </div>
                                                </div>
                                               ` : ''}
                                            </div>
                                            <div>
                                                <div class="menu-details">
                                                    <h3 class="menu-title">${
                                                     product?.menu_name || product?.name
                                                    }</h3>
                                                    <div class="description-flex">
                                                        <p class="menu-decription">${
                                                          product?.menu_description || product?.description
                                                        }</p>
                                                    </div>
                                                    ${product?.menus_count ? `
                                                    <p class="menu-price">${
                                                      product?.menus_count
                                                    } Menu/s available</p>
                                                     `:`
                                                    <p class="menu-price">AED ${ product?.menu_price}</p>
                                                    `}
                                                 
                                                </div>
                                                <div class="product-separator-line"></div>
                                                <div class="addMail-wrapper">
                                                    <div class="addMail-inner-wrapper">
                                                        <img src="assets/icons/addMail.png" />
                                                        <span>KARACBAR</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                     ${
                                       (index + 1) % 2 === 0 &&
                                       index !== this.products.length - 1
                                         ? `<img src="assets/icons/menu-divider.png" alt="Menu Divider" class="menu-divider" />`
                                         : ""
                                     }
                            `
                              )
                              .join("")}
                             
                        </div>
                        <div class="menu-explore-button">
                            <button class="service-browse-button browseButton">
                              <span class="service-browse-text">Browse All</span>
                              <span class="separator-line"></span>
                              <img src="assets/profile/rightArrow.png" class="service-browse-icon" alt="Arrow" />
                             </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

    // Attach event listeners to tabs
    this.querySelectorAll(".product-tab p").forEach((tab) => {
      tab.addEventListener("click", () => this.setActiveTab(tab.dataset.tab));
    });
  }
}

customElements.define("product-section", ProductSection);
