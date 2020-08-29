SET search_path TO ${schema~};
SELECT 
    e.event_id,
    e.task_id,
    e.user_prm_id,
    e.user_helper_id,
    e.event_status,
    e.event_severity
FROM "task_event" e
WHERE e.event_status=0 AND e.user_prm_id = $1;
