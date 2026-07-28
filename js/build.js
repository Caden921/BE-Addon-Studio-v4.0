// ===================================================
// BE Addon Studio v0.4 Alpha
// build.js
// ===================================================

const buildButton = document.getElementById("buildButton");

buildButton.addEventListener("click", buildAddon);

async function buildAddon() {

    if (!project.pack.name.trim()) {

        alert("Pack Name을 입력해주세요.");

        return;

    }

    buildButton.disabled = true;
    buildButton.textContent = "Building...";

    try {

        // -----------------------------
        // Behavior Pack
        // -----------------------------

        const bp = new JSZip();

        const bpManifest = {

            format_version: 2,

            header: {

                name: project.pack.name,

                description: project.pack.description || "",

                uuid: crypto.randomUUID(),

                version: [1, 0, 0],

                min_engine_version: [1, 21, 0]

            },

modules: [
    {
        type: "data",
        uuid: crypto.randomUUID(),
        version: [1, 0, 0]
    }
]

        };

        bp.file(
            "manifest.json",
            JSON.stringify(bpManifest, null, 4)
        );

        // -----------------------------
// Items
// -----------------------------

const itemsFolder = bp.folder("items");

for (const item of project.items) {

    const itemJson = {

        format_version: "1.21.0",

        "minecraft:item": {

            description: {

                identifier: `beas:${item.identifier}`

            },

            components: {

                "minecraft:icon": item.identifier,

                "minecraft:max_stack_size": item.stack

            }

        }

    };

    itemsFolder.file(

        item.identifier + ".json",

        JSON.stringify(itemJson, null, 4)

    );

}

        // -----------------------------
        // Resource Pack
        // -----------------------------

        const rp = new JSZip();

        const rpManifest = {

            format_version: 2,

            header: {

                name: project.pack.name + " RP",

                description: project.pack.description || "",

                uuid: crypto.randomUUID(),

                version: [1, 0, 0],

                min_engine_version: [1, 21, 0]

            },

            modules: [

                {

                    type: "resources",

                    uuid: crypto.randomUUID(),

                    version: [1, 0, 0]

                }

            ]

        };

        rp.file(
            "manifest.json",
            JSON.stringify(rpManifest, null, 4)
        );
        // -----------------------------
// Textures
// -----------------------------

const texturesFolder = rp.folder("textures");
const itemsTextureFolder = texturesFolder.folder("items");

const textureData = {};

for (const item of project.items) {

    if (item.texture) {

        itemsTextureFolder.file(

            item.identifier + ".png",

            item.texture

        );

    }

    textureData[item.identifier] = {

        textures: "textures/items/" + item.identifier

    };

}

rp.file(

    "textures/item_texture.json",

    JSON.stringify({

        resource_pack_name: project.pack.name,

        texture_name: "atlas.items",

        texture_data: textureData

    }, null, 4)

);

        // Pack Icon

        if (project.pack.icon) {

            bp.file("pack_icon.png", project.pack.icon);

            rp.file("pack_icon.png", project.pack.icon);

        }
        
        // -----------------------------
// Language files
// -----------------------------

const textsFolder = rp.folder("texts");

textsFolder.file(
    "languages.json",
    JSON.stringify(["en_US"], null, 4)
);

let lang = "";

for (const item of project.items) {

    lang += `item.beas:${item.identifier}=${item.name}\n`;

}

textsFolder.file(
    "en_US.lang",
    lang
);

        // -----------------------------
        // Generate MCPACKs
        // -----------------------------

        const bpBlob = await bp.generateAsync({

            type: "blob",

            compression: "DEFLATE"

        });

        const rpBlob = await rp.generateAsync({

            type: "blob",

            compression: "DEFLATE"

        });

        // -----------------------------
        // Generate MCADDON
        // -----------------------------

        const addon = new JSZip();

        addon.file("behavior_pack.mcpack", bpBlob);

        addon.file("resource_pack.mcpack", rpBlob);

        const addonBlob = await addon.generateAsync({

            type: "blob",

            compression: "DEFLATE"

        });

        const url = URL.createObjectURL(addonBlob);

        const a = document.createElement("a");

        a.href = url;

        a.download = project.pack.name + ".mcaddon";

        document.body.appendChild(a);

        a.click();

        a.remove();

        URL.revokeObjectURL(url);

        alert("MCADDON 생성 완료!");

    }

    catch (err) {

        console.error(err);

        alert("빌드 실패\n\n" + err);

    }

    finally {

        buildButton.disabled = false;

        buildButton.textContent = "Build MCADDON";

    }

}