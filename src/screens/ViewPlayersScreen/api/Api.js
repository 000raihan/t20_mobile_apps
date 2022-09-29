import {API_URL} from "../../../utils/BaseUrl";

export const CallApi = {
    player_list,
    save_update_player_select,
    player_select_list
};


function save_update_player_select(data) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    return fetch(`${API_URL}/save_update_player_select`, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result;
        });
}

function player_select_list(user_id) {
    return fetch(`${API_URL}/player_select/${user_id}`)
        .then(response => response.json())
        .then(result => {
            return result;
        });
}

function player_list(country_id) {
    return fetch(`${API_URL}/player_list_by_id/${country_id}`)
        .then(response => response.json())
        .then(result => {
            return result;
        });
}
