const config = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // New feature
        "fix", // Bug fix
        "docs", // Documentation
        "style", // Formatting
        "refactor", // Code restructuring
        "perf", // Performance
        "test", // Tests
        "build", // Build system
        "ci", // CI/CD
        "chore", // Maintenance
        "revert", // Revert commit
        "setup", // Setup
        "upgrade", // Upgrade dependencies
        "downgrade", // Downgrade dependencies
      ],
    ],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "header-max-length": [2, "always", 100],
  },
};

export default config;
