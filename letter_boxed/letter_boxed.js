
var letters = [] //2d array of given letters

var all_letters = [] // 1d array of all letters

// split up words by starting letter
var words_by_letter = [ // only 12 possible starting letters
    [ // side 1
        [],
        [],
        []
    ],
    [ // side 2
        [],
        [],
        []
    ],
    [ // side 3
        [],
        [],
        []
    ],
    [ // side 4
        [],
        [],
        []
    ],
]

var words = []

document.getElementById("inputfile").addEventListener("change", function () {
    let fr = new FileReader();
    fr.onload = function () {
        words = fr.result.split("\n")
    }

    if (this.files[0] != null) {
        fr.readAsText(this.files[0]);
    }
})

document.getElementById("submit").addEventListener("mousedown", function () {

    let valid = true //check if all forms are filled

    if (words.length == 0) { //check step 1
        valid = false
    }

    sides = [
        document.getElementById("side1"),
        document.getElementById("side2"),
        document.getElementById("side3"),
        document.getElementById("side4")
    ]

    for (let i of sides) { // check step 2
        if (i.value.length != 3) {
            valid = false
        } else {
            letters.push(i.value.split("")) // add values
        }
    }

    if (valid) {
        main()
    }
})

function check_word(word, sq) { // check to make sure a word can be made with the given box
    let side = -1

    for (let letter of word) {
        let s = get_side(letter, sq)
        if (s == side) {
            return false
        } else if (s == -1) {
            return false
        } else {
            side = s
        }

        let valid = false

        for (let k of all_letters) {
            if (letter == k) {
                valid = true
            }
        }

        if (!valid) {
            return false
        }
    }

    return true
}

function get_side(li, sq) { // returns index of side or -1 if not found
    let rtn = 0
    for (let side of sq) {
        for (let l of side) {
            if (String(li).toLowerCase() == String(l).toLowerCase()) {
                return rtn
            }
        }
        rtn += 1
    }

    return -1
}

function get_side_letter(li) { // gets [side, letter index] for indexing given a letter
    for (let s = 0; s < letters.length; s++) {
        for (let l = 0; l < letters[s].length; l++) {
            if (String(letters[s][l]).toLowerCase() == String(li).toLowerCase()) {
                return [s, l]
            }
        }
    }
    return null
}

function remove_duplicates(arr) { //removes duplicates from array
    let arr2 = [] // list of all unique letters in array
    let rtn = [] // the final array with no duplicates
    for (let i of arr) {
        let valid = true
        for (let j of arr2) { // check if the letter is already in the list of unique letters
            if (i == j) {
                valid = false
            }
        }
        if (valid) {
            rtn.push(i) // if its a new letter, add to return array and list of unique letters
            arr2.push(i)
        }
    }
    return rtn
}

function main() { // executes sequence

    for (let i of letters) {
        for (let j of i) {
            all_letters.push(j)
        }
    }

    // get the words
    var words2temp = []
    for (let i of words) {
        if (check_word(i, letters)) {
            words2temp.push(i) // temp will be destroyed to make words by letter later
        }
    }

    var total = 0

    // put valid words (i.e. letters on different sides) into 3d arr to sort by start letter
    for (let s = 0; s < letters.length; s++) {
        let tside = letters[s]
        for (let l = 0; l < tside.length; l++) {
            let tlet = letters[s][l]
            for (let i of words2temp) {
                if (String(i[0]).toLowerCase() == String(tlet).toLowerCase()) { // check for 1st letter
                    words_by_letter[s][l].push(i)
                    words2temp.pop(i)
                    total++
                }
            }
        }
    }

    var count = 0


    for (let s = 0; s < letters.length; s++) {
        let tside = letters[s]
        for (let l = 0; l < tside.length; l++) {
            let tlet = letters[s][l]
            let words1 = words_by_letter[s][l] // this would be easier with recursion but it crashes

            for (let i of words1) { // aka for every word, check with EVERY possible combo
                let end1loc = get_side_letter(String(i).charAt(i.length - 1)) // gets [s, l] of last letter
                let words2 = words_by_letter[end1loc[0]][end1loc[1]]

                for (let j of words2) {
                    let end2loc = get_side_letter(String(j).charAt(j.length - 1))
                    let words3 = words_by_letter[end2loc[0]][end2loc[1]]

                    for (let k of words3) {
                        let end3loc = get_side_letter(String(k).charAt(k.length - 1))
                        let words4 = words_by_letter[end3loc[0]][end3loc[1]]

                        for (let m of words4) { // always try to make a 4 word combo (just to flex)
                            // see if the current path [i --> j --> k --> m] uses all letters
                            let path = [i, j, k, m]

                            let temp = []
                            for (let p of path) {
                                for (let n of p) {
                                    temp.push(n)
                                }
                            }
                            temp = remove_duplicates(temp) // get a list (no dupes) of every letter used

                            if (temp.length >= 12) { // we found one!!
                                let txt = ""
                                for (let n of path) {
                                    txt += n + " "
                                }

                                //add to html
                                let newsolution = document.createElement("p")
                                newsolution.innerText = txt
                                document.getElementById("solutions").appendChild(newsolution)

                            }
                        }
                    }
                }
                count += 1
                console.clear()
                let w = Math.floor((count / total) * 100).toString() + "%"
                console.log(w)
            }
        }
    }

}