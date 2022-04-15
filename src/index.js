/*
 *
 *author-Yogesh Parihar
 *
 */

import "./styles.css";
import menu from "./menu";

const menuItems = menu.items;

console.log(menuItems);

/*## 1. Sorting

- In `index.js`, loop over `menuItems` and categorize them into sections based on each items assigned `type`
- Sort the items in each category by their `menuOrder` */

const itemCategory = menuItems.reduce((categorized, currItem) => {
  //reduce->
  //check for any array present ,if not ctreate one for menu item type
  categorized[currItem.type] = categorized[currItem.type] || [];
  //go to each element and enter them into an array
  categorized[currItem.type].push(currItem);
  //return the result

  return categorized;

  //sorting items in each catogry using menuOrder
}, {});
Object.values(itemCategory).forEach((category) =>
  category.sort((x, y) => x.menuOrder - y.menuOrder)
);

/*## 2. Rendering ## 4. BONUS: Filtering

- Add a checkbox to toggle spicy options. When the checkbox is checked, the spicy options should be visible. It should be checked by default.

- Render the sorted results into the appropriate container with `index.html`
- Format any prices. For example, 8.5 becomes \$8.50
- Render the "spicy" icon next to any menu items where `spicy` is `true` */

const createMenuItemEl = ({ name, price, description, spicy }) => {
  const menuItem = document.createElement("div");
  menuItem.setAttribute("id", name);

  // DOM nodes
  const itemName = document.createElement("h4");
  const menuItemName = document.createTextNode(name);
  const itemPrice = document.createElement("h4");
  const menuItemPrice = document.createTextNode("$" + price.toFixed(2)); //  8.0 -> 8.00
  const itemDesc = document.createElement("h5");
  const descText = document.createTextNode(description);

  //adding spicy class if spicy
  if (spicy) {
    menuItem.classList.add("disclaimer", "spicy");
  }

  itemName.classList.add("item-name");
  itemPrice.classList.add("item-price");
  itemDesc.classList.add("item-description");
  menuItem.classList.add("menu-item");

  //append DOM nodes
  itemName.appendChild(menuItemName);
  menuItem.appendChild(itemName);
  itemPrice.appendChild(menuItemPrice);
  menuItem.appendChild(itemPrice);
  itemDesc.appendChild(descText);
  menuItem.appendChild(itemDesc);

  return menuItem;
};

//Go through each category
Object.keys(itemCategory).forEach((category) =>
  //Go through each item in category
  itemCategory[category].forEach((item) =>
    //render formatted item in DOM
    document.getElementById(category).appendChild(createMenuItemEl(item))
  )
);

const filterMenuItems = (e) => {
  const spicyItems = Array.from(
    document.getElementsByClassName("spicy menu-item")
  );

  spicyItems.forEach((item) => item.classList.toggle("hidden"));
};

const spicyCheckbox = document.getElementById("spicy-checkbox");
spicyCheckbox.addEventListener("change", filterMenuItems);
