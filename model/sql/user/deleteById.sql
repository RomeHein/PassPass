SET search_path TO ${schema~};
DELETE FROM "user" u WHERE u.user_id = $1;