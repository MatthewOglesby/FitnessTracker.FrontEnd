const baseURL = 'http://fitnesstrac-kr.herokuapp.com/api/'

export const registerUser = async (username, password) => {
  try {
    console.log(username, password)
    const response = await fetch(`${baseURL}users/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password
      })
    })

    const result = await response.json();
    console.log(result)
    return result;

  } catch (error) {
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

    console.log(username)

    const result = await response.json();
    return result;

  } catch (ex) {
    console.log(error)
  }
}

export const getUserDetails = async (token) => {
  try {
    const response = await fetch(`${baseURL}users/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })

    const result = await response.json();
    return result;

  } catch (ex) {
    console.log('error gettings user details')
  }
}

export const getMyRoutines = async (token, username) => {
  try {
    const response = await fetch(`${baseURL}users/${username}/routines`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const results = await response.json()
    // console.log('results in api: ', results)
    return results
  } catch (error) {
    console.log('error getting all routines')
  }

}

export const getAllActivities = async () => {
  try {
    const response = await fetch(`${baseURL}activities`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const results = await response.json();
    return results;

  } catch (ex) {
    console.error('error getting all activities')
  }
}

export const createActivity = async (token, { name, description }) => {
  try {
    const response = await fetch(`${baseURL}activities`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({

        name,
        description

      })
    })

    const result = await response.json();
    return result;

  } catch (ex) {
    console.error('error creating activity')
  }
}

export const updateActivity = async (token, {name, description, id }) => {
  try {
    const response = await fetch(`${baseURL}activities/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name,
        description,
      })
    })
    const result = await response.json();

    return result;

  } catch (error) {
    console.log('Unable to update activity')
  }
}

export const attachActivityToRoutine = async (routineId, {activityId, count, duration}) => {
  try {
    const response = await fetch(`${baseURL}routines/${routineId}/activities`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        activityId: activityId,
        count: count,
        duration: duration,
      })
    })
    const result = await response.json();

    return result;

  } catch (error) {
    console.log('error, unable to add activity to routine')
  }
}

export const updateActivityForRoutine = async (token, id, {count, duration}) => {
  try {
    const response = await fetch(`${baseURL}routine_activities/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        count,
        duration,
      })
    })
    const result = await response.json();

    return result

  } catch (error) {
    console.log('error, unable to update activity of routine')
  }
}

export const deleteActivityFromRoutine = async ( token, id) => {
  try {
    const response = await fetch(`${baseURL}routine_activities/${routineActivityId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token} `
      }
    })
    const result = await response.json();

    return result

  } catch (error) {
    console.log('error deleting routine')
  }
}

export const getAllRoutines = async () => {
  try {
    const response = await fetch(`${baseURL}routines`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const results = await response.json();
    return results;

  } catch (ex) {
    console.error('error getting all routines')
  }
}

export const createRoutine = async (token, { name, goal, isPublic }) => {
  try {
    const response = await fetch(`${baseURL}routines`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({

        name,
        goal,
        isPublic

      })
    })

    const result = await response.json();
    return result;

  } catch (ex) {
    console.error('error creating routine')
  }
}

export const updateRoutine = async ({token, id, name, goal, isPublic}) => {
  try {
    const response = await fetch(`${baseURL}routines/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name,
        goal,
        isPublic,
      })
    })
    const result = await response.json();

    return result;

  } catch (error) {
    console.log('error, unable to update routine')
  }
}

export const deleteRoutine = async ( token, id) => {
  try {
    const response = await fetch(`${baseURL}routines/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token} `
      }
    })
    const result = await response.json();

    return result;

  } catch (error) {
    console.log('error deleting routine')
  }
}



