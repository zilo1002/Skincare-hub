-- 验证 pg_cron 任务是否创建成功
SELECT 
  jobname,
  schedule,
  command,
  active
FROM cron.job;
