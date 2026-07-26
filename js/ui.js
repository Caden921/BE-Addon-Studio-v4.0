// ===================================================
// BE Addon Studio v0.4 Alpha
// ui.js
// ===================================================

const itemList=document.getElementById("itemList");

// -------------------------
// Render
// -------------------------

function renderItems(){

    itemList.innerHTML="";

    project.items.forEach(item=>{

        itemList.appendChild(

            createItemCard(item)

        );

    });

}

// -------------------------
// Card
// -------------------------

function createItemCard(item){

    const card=document.createElement("div");

    card.className="item";

    card.innerHTML=`

<h3>${item.name}</h3>

<label>Item Name</label>

<input
type="text"
class="name"
value="${item.name}">

<label>Identifier</label>

<input
type="text"
class="identifier"
value="${item.identifier}">

<label>Max Stack Size</label>

<select class="stack">

<option value="1">1</option>

<option value="16">16</option>

<option value="64">64</option>

</select>

<label>Texture</label>

<label class="fileButton">

Choose PNG

<input
type="file"
class="texture"
accept=".png">

</label>

<div class="itemButtons">

<button class="copy">

Duplicate

</button>

<button class="deleteButton">

Delete

</button>

</div>

`;

    card.querySelector(".stack").value=item.stack;

    // -------------------------
    // Name
    // -------------------------

    card.querySelector(".name").addEventListener("input",e=>{

        item.name=e.target.value;

        card.querySelector("h3").textContent=item.name;

    });

    // -------------------------
    // Identifier
    // -------------------------

    card.querySelector(".identifier").addEventListener("input",e=>{

        item.identifier=e.target.value;

    });

    // -------------------------
    // Stack
    // -------------------------

    card.querySelector(".stack").addEventListener("change",e=>{

        item.stack=Number(e.target.value);

    });

    // -------------------------
    // Texture
    // -------------------------

    card.querySelector(".texture").addEventListener("change",e=>{

        item.texture=e.target.files[0];

    });

    // -------------------------
    // Duplicate
    // -------------------------

    card.querySelector(".copy").addEventListener("click",()=>{

        duplicateItem(item.id);

        renderItems();

    });

    // -------------------------
    // Delete
    // -------------------------

    card.querySelector(".deleteButton").addEventListener("click",()=>{

        deleteItem(item.id);

        renderItems();

    });

    return card;

}