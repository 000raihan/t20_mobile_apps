import {API_URL} from "../../../utils/BaseUrl";

export const CallApi = {
    register,
};

function register(full_name,mobile_number,pin_number) {
    let data = {
        "full_name": full_name,
        "mobile_number": mobile_number,
        "pin_number": pin_number,
    };
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    return fetch(`${API_URL}/register`, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result;
        });
}



