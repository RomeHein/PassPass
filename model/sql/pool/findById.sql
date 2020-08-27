SET search_path TO ${schema~};
SELECT 
    p.pool_id,
    p.pool_label,
    p.pool_owner_id,
    p.pool_qrcode,
    p.pool_qrcode_label,
    p.pool_qrcode_theme_id
FROM "pool" t
WHERE p.pool_id = $1;
