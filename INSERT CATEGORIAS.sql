-- CATEGORIAS
INSERT INTO public.categoria ( "name", description, icon, parent_id, created_at, updated_at)
VALUES
( 'Periféricos', 'Mouse, teclado, headset e acessórios', '🖱️', NULL, now(), now()),
( 'Informática', 'Computadores, notebooks e monitores', '💻', NULL, now(), now()),
( 'Armazenamento', 'HDs, SSDs e pen drives', '💾', NULL, now(), now()),
( 'Acessórios', 'Cabos, suportes e outros itens menores', '🔌', NULL, now(), now()),
('Móveis Gamer', 'Cadeiras, mesas e suportes para setup gamer', '🪑', NULL, now(), now());
