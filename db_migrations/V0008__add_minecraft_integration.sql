-- Add Minecraft integration columns to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS minecraft_nickname VARCHAR(255) UNIQUE;

-- Create minecraft_stats table for player statistics
CREATE TABLE IF NOT EXISTS minecraft_stats (
    id SERIAL PRIMARY KEY,
    player_name VARCHAR(255) UNIQUE NOT NULL,
    kills INTEGER DEFAULT 0,
    deaths INTEGER DEFAULT 0,
    balance DECIMAL(15, 2) DEFAULT 0,
    playtime_hours INTEGER DEFAULT 0,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_minecraft_stats_player ON minecraft_stats(player_name);
