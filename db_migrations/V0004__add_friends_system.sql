-- Добавляем таблицу для друзей
CREATE TABLE IF NOT EXISTS t_p89978113_website_creation_pro.friends (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES t_p89978113_website_creation_pro.users(id),
    friend_id INTEGER NOT NULL REFERENCES t_p89978113_website_creation_pro.users(id),
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, friend_id)
);

-- Индексы для быстрого поиска друзей
CREATE INDEX idx_friends_user_id ON t_p89978113_website_creation_pro.friends(user_id);
CREATE INDEX idx_friends_friend_id ON t_p89978113_website_creation_pro.friends(friend_id);
CREATE INDEX idx_friends_status ON t_p89978113_website_creation_pro.friends(status);