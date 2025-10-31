-- Move imported vitamin products from OTC to Vitamins & Minerals category
-- This migration moves products that were incorrectly categorized

BEGIN;

-- Get the IDs of both categories
WITH category_ids AS (
  SELECT 
    (SELECT id FROM categories WHERE name = 'Sănătate - Medicamente OTC') AS otc_id,
    (SELECT id FROM categories WHERE name = 'Vitamine și Minerale') AS vitamins_id
)
-- Update products that look like vitamins and are in OTC category
UPDATE products
SET category_id = (SELECT vitamins_id FROM category_ids)
WHERE 
  category_id = (SELECT otc_id FROM category_ids)
  AND (
    name ILIKE '%vitamin%'
    OR name ILIKE '%minerale%'
    OR name ILIKE '%mineral%'
    OR name ILIKE '%complex%vitaminic%'
    OR name ILIKE '%omega%'
    OR name ILIKE '%probiotice%'
    OR name ILIKE '%zinc%'
    OR name ILIKE '%magnesium%'
    OR name ILIKE '%potasiu%'
    OR name ILIKE '%calciu%'
    OR name ILIKE '%fier%'
    OR name ILIKE '%iron%'
    OR name ILIKE '%supplement%'
  );

COMMIT;
