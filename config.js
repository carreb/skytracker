import { @Vigilant, @TextProperty, @ColorProperty, @ButtonProperty, @SwitchProperty, Color } from 'Vigilance';


@Vigilant("skytracker")
class Settings {
    @SwitchProperty({
        name: "show skytracker bumper",
        description: "displays a little skytracker bumper sticker on your screen to spread the gospel of being a stat whore",
        category: "General"
    })
    skytrackerBumper = true

    @SwitchProperty({
        name: "enderman tracker",
        category: "General",
        description: "send eman slayer related stats to the api"
    })
    endermanTracker = true

    constructor() {
        this.initialize(this);
        this.setCategoryDescription("General", "Enable and disable trackers. https://skytracker.cc/")
    }
}

export default new Settings();