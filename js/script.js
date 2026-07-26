// ===================================================
// BE Addon Studio v0.4 Alpha
// script.js
// ===================================================

// -------------------------
// Elements
// -------------------------

const packName=document.getElementById("packName");
const packDescription=document.getElementById("packDescription");
const packVersion=document.getElementById("packVersion");
const packIcon=document.getElementById("packIcon");

const addItemButton=document.getElementById("addItem");

// -------------------------
// Pack Info
// -------------------------

packName.addEventListener("input",()=>{

    project.pack.name=packName.value;

});

packDescription.addEventListener("input",()=>{

    project.pack.description=packDescription.value;

});

packVersion.addEventListener("input",()=>{

    project.pack.version=packVersion.value;

});

packIcon.addEventListener("change",()=>{

    project.pack.icon=packIcon.files[0]||null;

});

// -------------------------
// Add Item
// -------------------------

addItemButton.addEventListener("click",()=>{

    addItem();

    renderItems();

});

// -------------------------
// Init
// -------------------------

renderItems();