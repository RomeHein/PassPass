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
        FROM user_status s WHERE u.user_status_id = s.status_id) as user_status
FROM "user" u
WHERE u.user_id = $1;
