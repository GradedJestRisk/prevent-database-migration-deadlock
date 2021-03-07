const core = require('@actions/core');
const errorMessage = 'If merged, this PR would cause 2 migration files to be shipped together in next release, which may cause a deadlock'

const nextReleaseWillContainsMigration = function() {
   // get last tag
   // git describe --tags `git rev-list --tags --max-count=1`

   // get diff (files to be released)
   // git diff --name-only main <TAG>

   // git diff --name-only main $(git describe --tags `git rev-list --tags --max-count=1`)

   // migrations/bar
   return true;
}

const branchContainsAMigration = function() {
   // git diff --name-only main
   // migrations/foobar
   return true;
}

const migrationDirectory = core.getInput('migration-directory');

console.log(`migrationDirectory ${migrationDirectory}`);
console.log(`nextReleaseWillContainsMigration ${nextReleaseWillContainsMigration()}`);
console.log(`branchContainsAMigration ${branchContainsAMigration()}`);

if (nextReleaseWillContainsMigration() && branchContainsAMigration()) {
   core.setFailed(errorMessage);
}
