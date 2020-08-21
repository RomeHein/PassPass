CREATE SCHEMA if not exists ${schema~};
SET search_path TO ${schema~};

CREATE TABLE if not exists migration (
    migration_name TEXT NOT NULL PRIMARY KEY,
    migration_date DATE
);

CREATE TABLE if not exists user_status (
    status_id INTEGER NOT NULL PRIMARY KEY,
    status_label TEXT
);

CREATE TABLE if not exists "user" (
    user_id TEXT NOT NULL PRIMARY KEY,
    user_telegram_id INTEGER UNIQUE,
    user_telegram_name TEXT,
    user_status_id INTEGER REFERENCES user_status (status_id) ON DELETE SET DEFAULT ON UPDATE CASCADE
);

CREATE TABLE if not exists schedule (
    schedule_id SERIAL PRIMARY KEY,
    action_id TEXT REFERENCES actionnable (action_id) ON DELETE CASCADE,
    schedule_days INTEGER[],
    schedule_start_hour TEXT,
    schedule_end_hour TEXT
);

-- Insert default status
INSERT INTO user_status (status_id, status_label) VALUES (1, 'Active') ON CONFLICT (status_id) DO NOTHING;
INSERT INTO user_status (status_id, status_label) VALUES (2, 'Pending') ON CONFLICT (status_id) DO NOTHING;
INSERT INTO user_status (status_id, status_label) VALUES (3, 'Blocked') ON CONFLICT (status_id) DO NOTHING;
INSERT INTO user_status (status_id, status_label) VALUES (4, 'Deleted') ON CONFLICT (status_id) DO NOTHING;