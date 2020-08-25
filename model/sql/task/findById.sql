SET search_path TO ${schema~};
SELECT 
    t.task_id,
    t.task_type,
    t.task_label,
    t.task_default_severity
FROM "task" t
WHERE t.task_id = $1;
