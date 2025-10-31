-- Rename category from "Sănătate - Medicamente OTC" to "Vitamine și Minerale"
UPDATE categories
SET name = 'Vitamine și Minerale',
    slug = 'vitamine-si-minerale',
    description = 'Vitamine, minerale și suplimente alimentare'
WHERE name = 'Sănătate - Medicamente OTC';
