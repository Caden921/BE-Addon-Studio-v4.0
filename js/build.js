// ===================================================
// BE Addon Studio v0.4 Alpha
// build.js
// ===================================================

const buildButton=document.getElementById("buildButton");

buildButton.addEventListener("click",buildAddon);

async function buildAddon(){

    if(!project.pack.name.trim()){

        alert("Pack Name을 입력해주세요.");

        return;

    }

    const bp=new JSZip();

    bp.file("manifest.json",JSON.stringify({

        format_version:2,

        header:{
            name:project.pack.name,
            description:project.pack.description,
            uuid:crypto.randomUUID(),
            version:[1,0,0],
            min_engine_version:[1,21,0]
        },

        modules:[{

            type:"script",
            language:"javascript",
            uuid:crypto.randomUUID(),
            version:[1,0,0],
            entry:"scripts/main.js"

        }]

    },null,4));

    bp.folder("scripts").file("main.js","");

    const rp=new JSZip();

    rp.file("manifest.json",JSON.stringify({

        format_version:2,

        header:{
            name:project.pack.name+" RP",
            description:project.pack.description,
            uuid:crypto.randomUUID(),
            version:[1,0,0],
            min_engine_version:[1,21,0]
        },

        modules:[{

            type:"resources",
            uuid:crypto.randomUUID(),
            version:[1,0,0]

        }]

    },null,4));

    const bpBlob=await bp.generateAsync({type:"blob"});
    const rpBlob=await rp.generateAsync({type:"blob"});

    const addon=new JSZip();

    addon.file("behavior_pack.mcpack",bpBlob);
    addon.file("resource_pack.mcpack",rpBlob);

    const blob=await addon.generateAsync({type:"blob"});

    const a=document.createElement("a");

    a.href=URL.createObjectURL(blob);
    a.download=project.pack.name+".mcaddon";
    a.click();

    URL.revokeObjectURL(a.href);

}