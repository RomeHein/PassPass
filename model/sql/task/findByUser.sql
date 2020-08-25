SET search_path TO ${schema~};
SELECT 
    t.task_id,
    t.task_type,
    t.task_label,
    t.task_default_severity
FROM "task" t
LEFT JOIN user_task ut ON ut.task_id = t.task_id
WHERE ut.user_id = $1;
