// ===================================================
// BE Addon Studio v0.4 Alpha
// build.js
// ===================================================

const buildButton=document.getElementById("buildButton");

buildButton.addEventListener("click",buildAddon);

async function buildAddon(){

    if(!project.pack.name){

        alert("Pack Name을 입력해주세요.");

        return;

    }

    const addon=new JSZip();

    const bp=addon.folder("behavior_pack");
    const rp=addon.folder("resource_pack");

    const bpHeader=crypto.randomUUID();
    const bpModule=crypto.randomUUID();

    const rpHeader=crypto.randomUUID();
    const rpModule=crypto.randomUUID();

    bp.file("manifest.json",JSON.stringify({

        format_version:2,

        header:{
            name:project.pack.name,
            description:project.pack.description,
            uuid:bpHeader,
            version:[1,0,0],
            min_engine_version:[1,21,0]
        },

        modules:[{

            type:"script",

            language:"javascript",

            uuid:bpModule,

            version:[1,0,0],

            entry:"scripts/main.js"

        }]

    },null,4));

    rp.file("manifest.json",JSON.stringify({

        format_version:2,

        header:{
            name:project.pack.name+" RP",
            description:project.pack.description,
            uuid:rpHeader,
            version:[1,0,0],
            min_engine_version:[1,21,0]
        },

        modules:[{

            type:"resources",

            uuid:rpModule,

            version:[1,0,0]

        }]

    },null,4));

    bp.folder("scripts")
      .file("main.js","");

    const blob=await addon.generateAsync({

        type:"blob"

    });

    const a=document.createElement("a");

    a.href=URL.createObjectURL(blob);

    a.download=project.pack.name+".mcaddon";

    a.click();

    URL.revokeObjectURL(a.href);

}