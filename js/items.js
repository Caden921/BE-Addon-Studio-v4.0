// ===================================================
// BE Addon Studio v0.4 Alpha
// items.js
// ===================================================

// -------------------------
// Project
// -------------------------

const project={

    pack:{

        name:"",

        description:"",

        version:"1.0.0",

        icon:null

    },

    items:[]

};

// -------------------------
// Create Item
// -------------------------

function createItem(){

    return{

        id:crypto.randomUUID(),

        type:"item",

        name:"New Item",

        identifier:"new_item",

        stack:64,

        texture:null

    };

}

// -------------------------
// Add Item
// -------------------------

function addItem(){

    project.items.push(

        createItem()

    );

}

// -------------------------
// Delete Item
// -------------------------

function deleteItem(id){

    project.items=

        project.items.filter(

            item=>item.id!==id

        );

}

// -------------------------
// Duplicate Item
// -------------------------

function duplicateItem(id){

    const item=

        project.items.find(

            i=>i.id===id

        );

    if(!item) return;

    const copy=

        structuredClone(item);

    copy.id=

        crypto.randomUUID();

    copy.name+=" Copy";

    project.items.push(copy);

}

// -------------------------
// Get Item
// -------------------------

function getItem(id){

    return project.items.find(

        item=>item.id===id

    );

}

// -------------------------
// Update Item
// -------------------------

function updateItem(id,data){

    const item=

        getItem(id);

    if(!item) return;

    Object.assign(

        item,

        data

    );

}