import request from "../requestV2"
import PogObject from "../PogData"
import { Promise } from "../PromiseV2"
import Settings from "./config"
import { Color } from "Vigilance"


// skytracker bumper
const bumper = new Display();
bumper.addLine("&askytracker.cc");
bumper.setBackground(DisplayHandler.Background.FULL);
bumper.setRenderLoc(10, 10);
bumper.setBackgroundColor(Renderer.BLACK);

// actual important stuff
const pog = new PogObject("skytracker", {
    loaded: 0
})

const API_URL = "https://api.skytracker.cc"

// create user in database
register("worldLoad", () => {
    if (pog.loaded < 1) {
        let postuuid = Player.getUUID();
        postuuid = postuuid.replace(/-/g, "");
        ChatLib.chat(`&a[skytracker] &2&l(first time setup) &7attempting to create user ${postuuid}`);
        request({
            url: `${API_URL}/slayer/eman/createuser`,
            method: "POST",
            resolveWithFullResponse: true,
            headers: {
                "User-Agent": "Mozilla/5.0"
            },
            body: {
                uuid: postuuid
            },
            connectTimeout: 5000
        })
        .then((response) => {
            let data = JSON.parse(response``)
            if (data.success == true) {
                ChatLib.chat("&a[skytracker] &7successfully created user! welcome to skytracker :^)")
                pog.loaded = 1
                pog.save()
            }
        })
        .catch((error) => {
            let e = JSON.parse(error)
            if (e.message == "That player already exists.") {
                ChatLib.chat("&a[skytracker] &7welcome back to skytracker, looks like we forgot you existed for a second (or your configs reset! yikes...)")
                pog.loaded = 1
                pog.save()
            } else {
                ChatLib.chat(`&a[skytracker] &cuh oh, we ran into an error while trying to create your user, here's some information about that...`)
                ChatLib.chat(`\n&4error code ${data.error}:\n&c${data.message}`)
            }
        })
    }
})

register("command", () => Settings.openGUI()).setName("skytracker").setAliases("sky", "tracker") // gui command

Settings.registerListener("show skytracker bumper", () => {
    if (!Settings.skytrackerBumper) {
        bumper.show()
    } else {
        bumper.hide()
    }
})


