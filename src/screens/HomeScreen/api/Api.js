import {API_URL} from "../../../utils/BaseUrl";

export const CallApi = {
    player_list,
    getMatch,
    fatchPreviousMatch,
    fatchMatchHighligh,
    fatchNextMatch,
    fatchStandings,
    fatchFixtures
};

function fatchStandings() {
    return fetch(`${API_URL}/standings`)
        .then(response => response.json())
        .then(result => {
            console.log("RESULD IS : ", result)
            return result;
        });
}

function fatchFixtures() {
    return fetch(`${API_URL}/fixtures`)
        .then(response => response.json())
        .then(result => {
            console.log("RESULD IS : ", result)
            return result;
        });
}

function fatchMatchHighligh() {
    return fetch(`${API_URL}/highligh_match`)
        .then(response => response.json())
        .then(result => {
            console.log("RESULD IS : ", result)
            return result;
        });
}

function fatchPreviousMatch() {
    console.log(`${API_URL}/previous_match`)
    return fetch(`${API_URL}/previous_match`)
        .then(response => response.json())
        .then(result => {
            console.log("RESULD IS : ", result)
            return result;
        });
}

function fatchNextMatch() {
    return fetch(`${API_URL}/next_match`)
        .then(response => response.json())
        .then(result => {
            console.log("RESULD IS : ", result)
            return result;
        });
}

function player_list(user_id) {
    console.log(`${API_URL}/player_select/${user_id}`)
    return fetch(`${API_URL}/player_select/${user_id}`)
        .then(response => response.json())
        .then(result => {
            return result;
        });
}
function getMatch() {
    console.log("I'M CALLED")
    console.log(`${API_URL}/live_match`)
    return fetch(`${API_URL}/live_match`)
        .then(response => response.json())
        .then(result => {
            console.log("RESULD IS : ", result)
            return result;
        });
}



