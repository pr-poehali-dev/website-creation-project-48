INSERT INTO t_p89978113_website_creation_pro.users (username, email, password_hash) 
VALUES ('admin', 'admin@imunnsrp.ru', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f')
ON CONFLICT (username) DO NOTHING;