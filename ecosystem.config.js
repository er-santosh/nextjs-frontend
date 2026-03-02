module.exports = {
  apps: [
    {
      name: "frontend",
      script: "pnpm",
      args: "start",
      interpreter: "none",
      watch: false,
      max_restarts: 10,
      restart_delay: 5000,
      env: {
        NODE_ENV: "production",
        PORT: "3000",
      },
    },
  ],
};
