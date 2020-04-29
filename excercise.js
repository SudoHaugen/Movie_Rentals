//import { func } from "joi";

//getUser(1, getRepositories2);


getUser(1)
    .then(user => getRepositories(user.gitHubUsername))
    .then (repos => getCommits(repos[0]))
    .then(commits => console.log('Commits', commits))
    .catch(err => console.log('Error', err.message));

function getRepositories2(user) {
    getRepositories(user.gitHubUsername, getCommits);
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Fetching GitHub API...');
            resolve(['commit']);
        }, 2000);
    });
}

function displayCommits(commits) {
    commits.forEach(element => {
        console.log(element);
    });
}

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user from the database...');
            resolve({ "id": id, "gitHubUsername": "SudoHaugen"});
        }, 2000);
    });
}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Fetching ${username}'s repositories...`);
            resolve(['repo1', 'repo2', 'repo3']);
        }, 2000);
    });
}