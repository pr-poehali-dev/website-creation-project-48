-- Add moderation fields to screenshots table
ALTER TABLE t_p89978113_website_creation_pro.screenshots 
ADD COLUMN IF NOT EXISTS moderated_at TIMESTAMP,
ADD COLUMN IF NOT EXISTS moderated_by VARCHAR(255),
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'pending';

-- Update existing records
UPDATE t_p89978113_website_creation_pro.screenshots 
SET status = CASE 
    WHEN approved = true THEN 'approved'
    WHEN approved = false THEN 'rejected'
    ELSE 'pending'
END
WHERE status IS NULL;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_screenshots_status ON t_p89978113_website_creation_pro.screenshots(status);
CREATE INDEX IF NOT EXISTS idx_screenshots_server_id ON t_p89978113_website_creation_pro.screenshots(server_id);
