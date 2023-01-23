class Game{
    constructor(name, kind, agents, weapons){
        this.kind = kind // its in array so it can be iterated thru
        this.name = name
        this.agents = agents // 2d dictionary
        this.weapons = weapons // 2d dictionary
    }

    choose(type, typeclass){ // returns a randomly chosen thingamabobber based on parameters
        if (type == this.kind[0]){
            let range = []
            for (let i of typeclass){
                for (let j of this.agents[i]){
                    range.push(j)
                }
            }
            let r = randomizer(0, range.length)
            console.log(range)
            console.log(r)
            return range[r]
        } else if (type == this.kind[1]){
            let range = []
            for (let i of typeclass){
                for (let j of this.weapons[i]){
                    range.push(j)
                }
            }
            let r = randomizer(0, range.length)
            return range[r]
        }
    }
}

let currg = "" // chosen game
let gameselect = document.getElementById("gameselect")
let currt = "" // chosen type
let typeselect = document.getElementById("typeselect")
let cbcontainer = document.getElementById("cbcontainer")
let currc = [] // array of chosen classes
let roll = document.getElementById("roll")
let choice = document.getElementById("choice")

//all the games!
let games = {
    "valorant":new Game("valorant", ["agent", "gun"],
    {
        "duelist":["raze", "reyna", "jett", "yoru", "neon"],
        "controller":["astra", "brimstone", "harbor", "omen", "viper"],
        "initiator":["sova", "fade", "breach", "skye", "kay/o"],
        "support":["killjoy", "cypher", "sage", "chamber"]
    },
    {
        "sidearm":["classic", "shorty", "frenzy", "ghost", "sheriff"],
        "smg":["stinger", "spectre"],
        "rifle":["bulldog", "guardian", "phantom", "vandal"],
        "shotgun":["bucky", "judge"],
        "heavy":["ares", "odin"],
        "armor":["light shield", "heavy shield"]
    }),
    "overwatch":new Game("overwatch", ["hero", null], //indicate that its agent-only
    {
        "tank":["d.va", "doomfist", "orisa", "reinhardt", "zarya", "junker queen", "roadhog", "sigma", "ramattra", "winston", "wrecking ball"],
        "dps":["ashe", "cassidy", "sombra", "genji", "hanzo", "junkrat", "mei", "bastion", "pharah", "reaper", "soldier: 76", "symmetra", "tracer", "widowmaker", "echo", "sojourn", "torbjorn"],
        "support":["ana", "baptise", "kiriko", "lucio", "brigitte", "mercy", "moira", "zenyatta"]
    },
    {

    }),
    "btd6":new Game("btd6", ["tower", "upgrades"],
    {
        "primary":["dart monkey", "boomerang monkey", "bomb shooter", "tack shooter", "ice monkey", "glue gunner"],
        "military":["sniper monkey", "monkey sub", "monkey buccaneer", "monkey ace", "heli pilot", "mortar monkey", "dartling gunner"],
        "magic":["wizard monkey", "super monkey", "ninja monkey", "alchemist", "druid"],
        "support":["banana farm", "spike factory", "monkey village", "engineer monkey"],
        "hero":["quincy", "gwendolin", "striker jones", "obyn greenfoot", "captain churchill", "benjamin", "ezili", "pat fusty", "adora", "admiral brickell", "etienne", "sauda", "psi", "geraldo"]
    },
    {
        "path":["5-2-0", "5-0-2", "2-5-0", "2-0-5", "0-5-2", "0-2-5"]
    }),
    "rocket league":new Game("rocket league", ["hitbox", null],
    {
        "breakout":[
            "Animus GP",
            "Breakout",
            "Breakout Type S",
            "Cyclone",
            "Emperor",
            "Emperor II",
            "Komodo",
            "Nexus",
            "Nexus SC",
            "Samurai"],
        "dominus":[
            "‘89 Batmobile",
            "007’s Aston Martin DBS",
            "007's Aston Martin Valhalla",
            "Aftershock",
            "Batmobile (2022)",
            "BMW M240i",
            "Chikara",
            "Chikara G1",
            "Chikara GXT",
            "DeLorean Time Machine",
            "Diestro",
            "Dominus",
            "Dominus GT",
            "Ecto-1 (Ghostbusters)",
            "Fast and Furious Dodge Charger",
            "Ferrari 296 GTB",
            "Ford Mustang Shelby GT350R RLE",
            "Formula 1 2021",
            "Formula 1 2022",
            "Gazella GT (Hot Wheels)",
            "Guardian",
            "Guardian G1",
            "Guardian GXT",
            "Hotshot",
            "Ice Charger",
            "Imperator DT5",
            "K.I.T.T. (Knight Rider)",
            "Lamborghini Countach LPI 800-4",
            "Lamborghini Huracán STO",
            "Maestro",
            "Mamba",
            "Masamune",
            "Maverick",
            "Maverick G1",
            "Maverick GXT",
            "McLaren 570S",
            "McLaren 765LT",
            "MR11 (Hot Wheels)",
            "NASCAR Chevrolet Camaro",
            "NASCAR Ford Mustang",
            "NASCAR Toyota Camry",
            "NASCAR Next Gen Chevrolet Camaro (2022)",
            "NASCAR Next Gen Ford Mustang (2022)",
            "NASCAR Next Gen Toyota Camry (2022)",
            "Nemesis",
            "Nissan Z Performance Car",
            "Peregrine TT",
            "Ripper",
            "Ronin",
            "Ronin G1",
            "Ronin GXT",
            "Samus’ Gunship",
            "Tyranno",
            "Tyranno GXT",
            "Werewolf"
        ],
        "hybrid":[
            "Endo",
            "Esper",
            "Fast and Furious Nissan Skyline",
            "Fast and Furious Pontiac Fiero",
            "Insidio",
            "Jäger 619 RS",
            "Nimbus",
            "R3MX",
            "R3MX GXT",
            "Tygris",
            "Venom",
            "X-Devil",
            "X-Devil MK2"
        ],
        "merc":[
            "Battle Bus",
            "Ford Bronco Raptor RLE",
            "Merc",
            "Nomad",
            "Nomad GXT"
        ],
        "octane":[
            "007’s Aston Martin DB5",
            "Armadillo",
            "Backfire",
            "Bone Shaker",
            "Dingo",
            "Fast 4WD (Hot Wheels)",
            "Fennec",
            "Ford F-150 RLE",
            "Ford Mustang Mach-E RLE",
            "Gizmo",
            "Grog",
            "Harbinger/Harbinger GXT",
            "Hogsticker",
            "Honda Civic Type R",
            "Honda Civic Type R-LE",
            "Jackal",
            "Jurassic Jeep Wrangler",
            "Luigi NSR",
            "Marauder",
            "Mario NSR",
            "Mudcat",
            "Mudcat G1",
            "Mudcat GXT",
            "Octane",
            "Octane ZSR",
            "Outlaw",
            "Outlaw GXT",
            "Proteus",
            "Road Hog",
            "Road Hog XL",
            "Scarab",
            "Sweet Tooth",
            "Takumi",
            "Takumi RX-T",
            "Triton",
            "The Dark Knight Tumbler",
            "Twinzer",
            "Vulcan",
            "Zippy"
        ],
        "plank":[
            "‘16 Batmobile",
            "Artemis",
            "Artemis G1",
            "Artemis GXT",
            "Centio",
            "Mantis",
            "Paladin",
            "Sentinel",
            "Twin Mill III"
        ],
    },
    {

    })
}

function randomizer(min, max){ //gets an integer between min (inc.) and max (exc.)
    return Math.floor((max - min) * Math.random() + min)
}

function resettype(){ //resets typeselect
    while (typeselect.firstChild) {
        typeselect.removeChild(typeselect.firstChild)
    }

    // add back the default option thing
    //<option disabled selected value>-- select an option --</option>
    let def = document.createElement("option")
    def.setAttribute("disabled", "")
    def.setAttribute("selected", "")
    def.setAttribute("value", "")
    def.innerText = "-- select an option --"

    typeselect.appendChild(def)

    currt = ""
}

function resetclass(){
    while (cbcontainer.firstChild) {
        cbcontainer.removeChild(cbcontainer.firstChild);
    }

    currc = ""
}

function checkroll(){ //checks to see if roll button can be enabled
    roll.disabled = !(currg != "" && currt != "" && currc != "")
}

function resetchoice(){ //deletes prev choice text
    choice.innerText = ""
}

function update_game(){
    currg = gameselect.options[gameselect.selectedIndex].value

    resettype()
    resetclass()

    let game = games[currg] //retrieve from dictionary

    //update type select
    // we want to add <option>xxx</option> for each type
    if (game != null){
        for (let i of game.kind){
            if (i != null){
                let temp = document.createElement("option")
                temp.innerText = i //set text
                typeselect.appendChild(temp)
            }
        }
    }
    
    checkroll()
}

function update_type(){
    currt = typeselect.options[typeselect.selectedIndex].value

    resetclass()

    let game = games[currg]
    let keys = []

    if (currt == game.kind[0]){
        keys = Object.keys(game.agents)
    } else if (currt == game.kind[1]){
        keys = Object.keys(game.weapons)
    }

    //update class select
    // we want to add <input type="checkbox" title="xxx" id="xxx"> and <label for="xxx">xxx</label>
    for (let i of keys){
        let container = document.createElement("span")
        container.setAttribute("id", i)
        container.setAttribute("class", "inline")

        let temp = document.createElement("input")
        temp.setAttribute("type", "checkbox")
        temp.setAttribute("class", "cb")
        temp.setAttribute("onclick", "update_class()")
        temp.setAttribute("name", i)

        let label = document.createElement("label")
        label.setAttribute("for", i)
        label.innerText = i
        
        container.appendChild(temp)
        container.appendChild(label)
        cbcontainer.appendChild(container)
    }

    checkroll()
}

function update_class(){
    currc = []

    cbs = document.getElementsByClassName("cb")
    for (let i of cbs){
        if (i.checked){
            currc.push(i.getAttribute("name"))
        }
    }

    checkroll()
}

function roulette(){
    let result = games[currg].choose(currt, currc)
    choice.innerText = result
}