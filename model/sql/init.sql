CREATE SCHEMA if not exists ${schema~};
SET search_path TO ${schema~};

CREATE TABLE if not exists migration (
    migration_name TEXT NOT NULL PRIMARY KEY,
    migration_date DATE
);

CREATE TABLE if not exists user_status (
    status_id SERIAL PRIMARY KEY,
    status_label TEXT
);

CREATE TABLE if not exists "pool" (
    pool_id SERIAL PRIMARY KEY,
    pool_label TEXT,
    pool_qrcode TEXT
);

CREATE TABLE if not exists "user" (
    user_id SERIAL PRIMARY KEY,
    user_prm_status INTEGER,
    -- 0: helper
    -- 1: pmr
    user_telegram_id INTEGER UNIQUE,
    user_messenger_id INTEGER UNIQUE,
    user_telegram_name TEXT,
    user_messenger_name TEXT,
    user_status_id INTEGER REFERENCES user_status (status_id) ON DELETE SET DEFAULT ON UPDATE CASCADE,
    user_city TEXT,
    user_country TEXT,
    user_mail_address TEXT
);

CREATE TABLE if not exists task (
    task_id SERIAL PRIMARY KEY,
    task_type INTEGER,
    task_label TEXT,
    task_default_severity INTEGER
    -- 0: normal 
    -- 1: need assistance ASAP, bot will ping helpers every 2 minutes until someone answer
    -- 2: need assistance urgentely, bot will ping every 1 minute
    -- 3: vital risk, ping every 30s until someone answer positively or call for help. If not disabled after 1 minute, call emergency
);

CREATE TABLE if not exists schedule (
    task_id INTEGER REFERENCES task (task_id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES "user" (user_id) ON DELETE CASCADE,
    schedule_days INTEGER[],
    schedule_start_hour TEXT,
    schedule_end_hour TEXT,
    PRIMARY KEY (task_id, user_id)
);

CREATE TABLE if not exists task_event (
    event_id SERIAL PRIMARY KEY,
    task_id INTEGER REFERENCES task (task_id) ON DELETE CASCADE,
    user_prm_id INTEGER REFERENCES "user" (user_id) ON DELETE CASCADE,
    user_helper_id INTEGER REFERENCES "user" (user_id) ON DELETE CASCADE,
    event_status INTEGER,
    -- 0: not picked up
    -- 1: picked up
    -- 2: done
    -- 3: canceled
    event_severity INTEGER
);

CREATE TABLE if not exists user_pool (
    pool_id INTEGER REFERENCES pool (pool_id) ON DELETE CASCADE ON UPDATE CASCADE,
    user_prm_id INTEGER REFERENCES "user" (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    user_helper_id INTEGER REFERENCES "user" (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY(pool_id, user_helper_id)
);

CREATE TABLE if not exists user_task (
    task_id INTEGER REFERENCES task (task_id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES "user" (user_id) ON DELETE CASCADE,
    PRIMARY KEY(task_id,user_id)
);

-- Insert default status
INSERT INTO user_status (status_id, status_label) VALUES (1, 'Available') ON CONFLICT (status_id) DO NOTHING;
INSERT INTO user_status (status_id, status_label) VALUES (2, 'EmergencyOnly') ON CONFLICT (status_id) DO NOTHING;
INSERT INTO user_status (status_id, status_label) VALUES (3, 'NotAvailable') ON CONFLICT (status_id) DO NOTHING;