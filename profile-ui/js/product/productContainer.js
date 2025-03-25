class ProductSection extends HTMLElement {
  constructor() {
    super();
    this.menuTabs = [{ name: "Exclusive" }, { name: "Menu Items" }];
    this.activeTab = "Exclusive"; // Default active tab
    this.products = [
      {
        product_image: "assets/profile/product1.png",
        product_name: "Bar BBQ",
        product_count: 5,
        product_description:
          "BBQ chicken, seasoned with an easy brown sugar rub",
        reference: "KARACBAR",
        status: "active",
      },
      {
        product_image: "assets/profile/product2.jpg",
        product_name: "Burgers and Sandwiche",
        product_count: 4,
        product_description: "Burgers and Sandwiche",
        reference: "KARACBAR",
        status: "active",
      },
      {
        product_image: "assets/profile/product3.jpg",
        product_name: "Moctail",
        product_count: 4,
        product_description: "Moctail",
        reference: "KARACBAR",
        status: "active",
      },
      {
        product_image: "assets/profile/product4.jpg",
        product_name: "Main Menu",
        product_count: 3,
        product_description: "Main Menu",
        reference: "KARACBAR",
        status: "active",
      },
    ];
  }

  setActiveTab(tabName) {
    this.activeTab = tabName;
    this.render(); // Re-render when the active tab changes
  }

  connectedCallback() {
    this.render();
  }

  render() {
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
                            ${this.products
                              .map(
                                (product, index) => `
                                      <div key="${index}">
                                        <div class="property-card">
                                            <div class="relative">
                                                <img src="${
                                                  product.product_image
                                                }" alt="Property Image" class="property-image" />
                                                <div class="menu-tag-wrapper">
                                                    <div class="relative">
                                                        <img class="menu-tag menu-tag-purple" src="assets/icons/tagline-purple.png" alt="Tag Two" />
                                                        <p class="tag-content-purple">${
                                                          product?.status ===
                                                          "active"
                                                            ? "Active"
                                                            : ""
                                                        }</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div class="menu-details">
                                                    <h3 class="menu-title">${
                                                      product?.product_name
                                                    }</h3>
                                                    <div class="description-flex">
                                                        <p class="menu-decription">${
                                                          product?.product_description
                                                        }</p>
                                                    </div>
                                                    <p class="menu-price">${
                                                      product?.product_count
                                                    } Menu/s available</p>
                                                 
                                                </div>
                                                <div class="product-separator-line"></div>
                                                <div class="addMail-wrapper">
                                                    <div class="addMail-inner-wrapper">
                                                        <img src="assets/icons/addMail.png" />
                                                        <span>${
                                                          product?.reference
                                                        }</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                     ${
                                (index + 1) % 2 === 0 && index !== this.products.length - 1
                                  ? `<img src="assets/icons/menu-divider.png" alt="Menu Divider" class="menu-divider" />`
                                  : ""
                              }
                            `
                              )
                              .join("")}
                             
                        </div>
                        <div class="menu-explore-button"></div>
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
