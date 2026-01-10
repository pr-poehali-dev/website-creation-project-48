CREATE TABLE IF NOT EXISTS t_p89978113_website_creation_pro.player_achievements (
  id SERIAL PRIMARY KEY,
  player_nickname VARCHAR(255) NOT NULL,
  achievement_id INTEGER NOT NULL,
  unlocked BOOLEAN DEFAULT FALSE,
  progress INTEGER DEFAULT 0,
  claimed BOOLEAN DEFAULT FALSE,
  unlocked_at TIMESTAMP,
  claimed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(player_nickname, achievement_id)
);

CREATE INDEX idx_player_achievements_nickname ON t_p89978113_website_creation_pro.player_achievements(player_nickname);
CREATE INDEX idx_player_achievements_achievement_id ON t_p89978113_website_creation_pro.player_achievements(achievement_id);
