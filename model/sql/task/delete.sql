SET search_path TO ${schema~};
DELETE FROM user_task WHERE user_task.task_id = $1 AND user_task.user_id = $2;