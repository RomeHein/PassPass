SET search_path TO ${schema~};
SELECT 
    u.user_id,
    u.user_prm_status,
    u.user_telegram_id,
    u.user_telegram_name,
    u.user_messenger_id,
    u.user_messenger_name,
    u.user_country,
    u.user_city,
    u.user_mail_address,
    (SELECT jsonb_build_object('id',s.status_id, 'label', s.status_label)
        FROM user_status s WHERE u.user_status_id = s.status_id) as user_status,
    (SELECT jsonb_agg(jsonb_build_object('id',t.task_id,'type', t.task_type, 'label', t.task_label, 'defaultSeverity', t.task_default_severity))
        FROM task t INNER JOIN user_task ut ON ut.task_id = t.task_id WHERE ut.user_id = u.user_id) as user_tasks
FROM "user" u
INNER JOIN user_pool up ON up.user_id = u.user_id
INNER JOIN "pool" p ON p.pool_owner_id = $1;
