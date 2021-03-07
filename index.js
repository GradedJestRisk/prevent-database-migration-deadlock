const core = require('@actions/core');
const github = require('@actions/github');
const simpleGit = require('simple-git');
const git = simpleGit();
const migrationDirectory = core.getInput('migration-directory');
const errorMessage = 'If merged, this PR  would cause 2 migration files to be shipped together in next release, which may cause a deadlock'

const nextReleaseWillContainsMigration = function() {
   return true;
}

const branchContainsAMigration = function() {
   return true;
}

console.log(`migrationDirectory ${migrationDirectory()}`);
console.log(`nextReleaseWillContainsMigration ${nextReleaseWillContainsMigration()}`);
console.log(`branchContainsAMigration ${branchContainsAMigration()}`);

if (nextReleaseWillContainsMigration() && branchContainsAMigration()) {
   core.setFailed(errorMessage);
}
