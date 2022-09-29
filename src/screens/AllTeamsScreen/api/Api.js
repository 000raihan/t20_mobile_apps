import {API_URL} from "../../../utils/BaseUrl";

export const CallApi = {
    country_list,
};

function country_list() {
    return fetch(`${API_URL}/country_list`)
        .then(response => response.json())
        .then(result => {
            return result;
        });
}



