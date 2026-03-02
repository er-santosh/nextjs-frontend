module.exports = {
  apps: [
    {
      name: "frontend",
      script: "pnpm",
      args: "start",
      interpreter: "none",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      kill_timeout: 5000,
      wait_ready: true,
      listen_timeout: 10000,
      env_staging: {
        NODE_ENV: "production",
        PORT: "3000",
        APP_ENV: "staging",
      },
      env_production: {
        NODE_ENV: "production",
        PORT: "3000",
        APP_ENV: "production",
      },
      error_file: "/var/log/pm2/frontend-error.log",
      out_file: "/var/log/pm2/frontend-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      merge_logs: true,
    },
  ],
};
