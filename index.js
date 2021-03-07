const core = require('@actions/core');
const execSync = require('child_process').execSync;

const errorMessage = 'If merged, this PR would cause 2 migration files to be shipped together in next release, which may cause a deadlock'

const migrationDirectory = core.getInput('migration-directory');

const nextReleaseWillContainsMigration = function() {

   const rawCount = execSync('git diff --name-only origin/main $(git describe --tags `git rev-list --tags --max-count=1`) | grep --count ' + migrationDirectory ).toString().trim();
   const count = parseInt(rawCount);
   // migrations/bar => 1

   console.log(`In next release: count ${count}`);
   return (count !== 0);
}

const branchContainsMigration = function() {

   const rawCount = execSync('git diff --name-only origin/main | grep --count ' + migrationDirectory).toString().trim();
   // migrations/foobar => 1
   const count = parseInt(rawCount);
   
   console.log(`To be merged migration count: ${count}`);
   return (count !== 0);
}

if (nextReleaseWillContainsMigration() && branchContainsMigration()) {
   core.setFailed(errorMessage);
}
