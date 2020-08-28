-- Returns 10 if tables are not set, 20 if columns are not set, 30 if data is missing
CREATE OR REPLACE FUNCTION test () RETURNS INTEGER AS 
$$
DECLARE test int;
BEGIN
-- Check tables presence
select COUNT(*)
from pg_tables
where tablename = 'migration' OR tablename = 'pool' OR tablename = 'user_pool' OR tablename = 'user' OR tablename = 'user_status' OR tablename = 'task' OR tablename = 'user_task' OR tablename = 'schedule' OR tablename = 'task_event' into test;
IF (test != 9) THEN RETURN 10;
END IF;
-- Check if all columns for each tables are present
select COUNT(*) from INFORMATION_SCHEMA.COLUMNS 
where table_name = 'migration' and (column_name = 'migration_name' OR column_name = 'migration_date') into test;
IF (test != 2) THEN RETURN 21;
END IF;
select COUNT(*) from INFORMATION_SCHEMA.COLUMNS 
where table_name = 'pool' and (column_name = 'pool_id' OR column_name = 'pool_owner_id' OR column_name = 'pool_label' OR column_name = 'pool_qrcode_label' OR column_name = 'pool_qrcode_theme_id') into test;
IF (test != 5) THEN RETURN 22;
END IF;
select COUNT(*) from INFORMATION_SCHEMA.COLUMNS 
where table_name = 'user_pool' and (column_name = 'user_id' OR column_name = 'pool_id') into test;
IF (test != 2) THEN RETURN 23;
END IF;
select COUNT(*) from INFORMATION_SCHEMA.COLUMNS 
where table_name = 'user' and (column_name = 'user_id' OR column_name = 'user_prm_status' OR column_name = 'user_telegram_id' OR column_name = 'user_telegram_name' OR column_name = 'user_messenger_name' OR column_name = 'user_messenger_id' OR column_name = 'user_status_id' OR column_name = 'user_city' OR column_name = 'user_country' OR column_name = 'user_mail_address') into test;
IF (test != 10) THEN RETURN 24;
END IF;
select COUNT(*) from INFORMATION_SCHEMA.COLUMNS 
where table_name = 'user_status' and (column_name = 'status_id' OR column_name = 'status_label') into test;
IF (test != 2) THEN RETURN 25;
END IF;
select COUNT(*) from INFORMATION_SCHEMA.COLUMNS 
where table_name = 'task' and (column_name = 'task_id' OR column_name = 'task_type' OR column_name = 'task_label' OR column_name = 'task_default_severity') into test;
IF (test != 4) THEN RETURN 26;
END IF;
select COUNT(*) from INFORMATION_SCHEMA.COLUMNS 
where table_name = 'user_task' and (column_name = 'user_id' OR column_name = 'task_id') into test;
IF (test != 2) THEN RETURN 27;
END IF;
select COUNT(*) from INFORMATION_SCHEMA.COLUMNS 
where table_name = 'schedule' and (column_name = 'task_id' OR column_name = 'user_id' OR column_name = 'schedule_days' OR column_name = 'schedule_start_hour' OR column_name = 'schedule_end_hour') into test;
IF (test != 5) THEN RETURN 28;
END IF;
select COUNT(*) from INFORMATION_SCHEMA.COLUMNS 
where table_name = 'task_event' and (column_name = 'event_id' OR column_name = 'task_id' OR column_name = 'user_prm_id' OR column_name = 'user_helper_id' OR column_name = 'event_status' OR column_name = 'event_severity') into test;
IF (test != 6) THEN RETURN 29;
END IF;
SET search_path TO ${schema~};
-- Check if basic user_status are present
select COUNT(*) from user_status into test;
IF (test != 3) THEN RETURN 31;
END IF;
-- Check if basic user_status are present
select COUNT(*) from task into test;
IF (test != 4) THEN RETURN 32;
END IF;

RETURN 0;
END;
$$ 
LANGUAGE 'plpgsql';
SELECT * FROM test();