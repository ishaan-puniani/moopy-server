/**
 * Created by ishaan.puniani on 2016-11-29.
 */
import axios from 'axios';
import store from '../store';
import {
    createDashboardSuccess,
    updateDashboardSuccess,
    getAllDashboardsSuccess,
    getDashboardSuccess,
    setDashboardUsersForMoodSynch,
    getUsersMoodSynchSucess,
    dashboardMoodDetailsSuccess
} from '../actions/dashboard-actions';

/**
 * Dashboard People
 */
export function createDashboard(data) {
    return axios.post('/api/dashboard/create', data)
        .then(response => {
            store.dispatch(createDashboardSuccess(response.data));
            return response;
        });
}
export function updateDashboard(data) {
    return axios.post('/api/dashboard/update', data)
        .then(response => {
            store.dispatch(updateDashboardSuccess(response.data));
            return response;
        });
}

export function getAllDashboards(query) {
    var url = '/api/dashboard' + (query ? '?q=' + query : '');
    return axios.get(url)
        .then(response => {
            store.dispatch(getAllDashboardsSuccess(response.data));
            if (response.data) {
                let toTrack = response.data.map(function (dashboard) {
                    return dashboard.name;
                });
                if (toTrack) {
                    store.dispatch(setDashboardUsersForMoodSynch(toTrack));
                }
            }
            return response;
        });
}
export function getDashboard(name) {
    return axios.get('/api/dashboard/' + name)
        .then(response => {
            store.dispatch(getDashboardSuccess(response.data));
            if (response.data) {
                let toTrack = [response.data.name];
                if (response.data.children) {
                    toTrack = toTrack.concat(response.data.children);
                }
                store.dispatch(setDashboardUsersForMoodSynch(toTrack));
            }
            return response;
        });
}

export function getMoods(names) {
    return axios.post('/api/moods', names)
        .then(response => {
            store.dispatch(getUsersMoodSynchSucess(response.data));
            return response;
        });
}

export function askForMood(dashboardName) {
    return axios.get('/api/dashboard/ask/' + dashboardName)
        .then(response => {
            return response;
        });
}

export function searchDashboard(query) {
    return getAllDashboards(query);
}

export function getMoodOverDuration(dashboardName, start, end, old) {
    return axios.post('/api/dashboard/details/' + dashboardName, {start: start, end: end, old: old})
        .then(response => {
            if (response.data && response.data.success) {
                store.dispatch(dashboardMoodDetailsSuccess(response.data.moods));
            }
            return response;
        });
}


export function getDashboardInCallback(dashboardName, callback) {
    return axios.get('/api/dashboard/' + dashboardName)
        .then(response => {
            if (response.data) {
                callback(response.data);
            }
            return response;
        });
}