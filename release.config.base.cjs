module.exports = {
  branches: ["main", "beta", "release-*", { name: "*", prerelease: true }],
  extends: "semantic-release-npm-github-publish",
};
