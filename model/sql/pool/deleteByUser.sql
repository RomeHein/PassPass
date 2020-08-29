SET search_path TO ${schema~};
DELETE FROM "pool" p WHERE p.pool_owner_id = $1;