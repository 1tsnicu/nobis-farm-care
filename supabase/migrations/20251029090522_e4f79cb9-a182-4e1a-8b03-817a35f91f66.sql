INSERT INTO categories (name, slug, icon, display_order, description)
VALUES (
  'Frumusețe și Igienă - Igienă Personală',
  'frumusete-si-igiena-igiena-personala',
  '🧼',
  9,
  'Produse pentru igienă personală: paste de dinți, deodoranți, absorbante, gel intim și alte produse de igienă'
)
ON CONFLICT DO NOTHING;