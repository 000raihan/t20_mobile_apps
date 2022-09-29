import {API_URL} from "../../../utils/BaseUrl";

export const CallApi = {
    login,
};

function login(mobile_number) {
    let data = {
        "mobile_number": "88"+mobile_number,
    };
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    return fetch(`${API_URL}/login`, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result;
        });
}



