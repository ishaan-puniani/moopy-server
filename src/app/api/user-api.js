import axios from 'axios';
import store from '../store';
import { getUsersSuccess, deleteUserSuccess, userProfileSuccess, userMoodsSuccess, userLoginSuccess } from '../actions/user-actions';
import { cookiesSet, cookiesGet, cookiesExpire  } from 'redux-cookies';

/**
 * Get all users
 */

export function getUsers() {
  return axios.get('/api/users')
    .then(response => {
      store.dispatch(getUsersSuccess(response.data));
      return response;
    });
}

/**
 * Search users
 */

export function searchUsers(query = '') {
  return axios.get('http://localhost:3001/users?q='+ query)
    .then(response => {
      store.dispatch(getUsersSuccess(response.data));
      return response;
    });
}

/**
 * Delete a user
 */

export function deleteUser(userId) {
  return axios.delete('http://localhost:3001/users/' + userId)
    .then(response => {
      store.dispatch(deleteUserSuccess(userId));
      return response;
    });
}

/**
 * getProfile() is much more complex because it has to make
 * three XHR requests to get all the profile info.
 */

export function getProfile(userId) {

 /* // Start with an empty profile object and build it up
  // from multiple XHR requests.
  let profile = {};

  // Get the user data from our local database.
  return axios.get('http://localhost:3001/users/' + userId)
    .then(response => {

      let user = response.data;
      profile.name = user.name;
      profile.twitter = user.twitter;
      profile.worksOn = user.worksOn;

      // Then use the github attribute from the previous request to
      // sent two XHR requests to GitHub's API. The first for their
      // general user info, and the second for their repos.
      return Promise.all([
        axios.get('https://api.github.com/users/' + user.github),
        axios.get('https://api.github.com/users/' + user.github + '/repos')
      ]).then(results => {

        let githubProfile = results[0].data;
        let githubRepos = results[1].data;

        profile.imageUrl = githubProfile.avatar_url;
        profile.repos = githubRepos;

        store.dispatch(userProfileSuccess(profile));

        return;

      });

    });*/

}

export function getMood(userId,start, end){
    return axios.post('/api/moods/Vivek')
        .then(response => {
            store.dispatch(userMoodsSuccess(response.data));
            return response;
        });
}

export function login(userId,password){
    return axios.post('/api/users/login',{userId:userId, password:password})
        .then(response => {
            if(response.data.success){
                store.dispatch(cookiesSet('auth', response.data, { expires: 365 }));
                store.dispatch(userLoginSuccess(response.data.profile));
            }

            return response;
        });
}