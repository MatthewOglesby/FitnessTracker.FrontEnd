const baseURL = 'http://fitnesstrac-kr.herokuapp.com/api/'

export const registerUser = async (username, password) => {
    try {
        const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/users/register', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: username,
              password: password
            })
          }).then(response => response.json())
            .then(result => {
              console.log(result.message);
              console.log(result);
            console.log(username, password);
            })} catch (error) {
                console.error(error)
            }
}

export const loginUser = async (username, password) => {
    try {
        const response = await fetch(`${baseURL}users/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })

        const result = await response.json();
        return result;

    } catch(ex) {
        console.log('error logging in user')
    }
}

export const getUserDetails = async(token) => {
    try {
        const response = await fetch(`${baseURL}users/me`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          })

          const result = await response.json();
          return result;

    } catch(ex){
        console.log('error gettings user details')
    }
}

export const getAllActivities = async() => {
    try {
        const response = await fetch(`${baseURL}activities`, {
            headers: {
              'Content-Type': 'application/json',
            },
          }).then(response => response.json())
            .then(result => {
              console.log(result);
            })
    } catch (ex) {
        console.error(error)
    }
}