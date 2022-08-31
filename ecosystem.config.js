module.exports = {
  apps: [
    {
      script: 'bin/www',
      // log_date_format: 'YYYY-MM-DD HH:mm Z', // 日志日期格式，Z 为时区
      // error_file: 'log/testError.log', // 错误日志目录
      // out_file: 'log/test.log', // 普通日志目录
      // pid_file: 'pid/test.pid', // 项目pid文件
      watch: true,
      // 监控时间间隔
      ignore_watch: [
        // 从监控目录中排除
        'node_modules',
        'logs',
        'public'
      ]
    }
  ],

  deploy: {
    production: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/master',
      repo: 'GIT_REPOSITORY',
      path: 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
