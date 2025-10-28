INSERT INTO categories (name, slug, icon, display_order, description)
VALUES (
  'Sănătate - Articole Ortopedice',
  'sanate-articole-ortopedice',
  '🏥',
  7,
  'Articole ortopedice și dispozitive medicale pentru sănătate și recuperare'
)
ON CONFLICT DO NOTHING;