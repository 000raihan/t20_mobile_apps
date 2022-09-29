import {API_URL} from "../../../utils/BaseUrl";

export const CallApi = {
    player_list,
};

function player_list(user_id) {
    console.log(`${API_URL}/player_select/${user_id}`)
    return fetch(`${API_URL}/player_select/${user_id}`)
        .then(response => response.json())
        .then(result => {
            return result;
        });
}



