-- PRODUTOS
INSERT INTO public.produto
(id, nome, preco_custo, preco_venda, margem_lucro, preco_promocional, quantidade_estoque, unidade, ativo, observacoes, created_at, updated_at, deleted_at, categoria_id, fornecedor_id)
VALUES
(uuid_generate_v4(), 'Mouse Sem Fio Logitech M170', 60.00, 89.90, 49.83, 79.90, 120, 'UN', true, 'Mouse óptico sem fio 2.4GHz', now(), now(), NULL, 'c6bbaf5f-79d1-4e43-aa78-3f9571856607', 'e4a466d5-0192-474b-aefd-67ecc9c762d9'),

(uuid_generate_v4(), 'Teclado Mecânico Redragon Kumara', 150.00, 229.90, 53.27, 199.90, 75, 'UN', true, 'Switches Outemu Blue, iluminação RGB', now(), now(), NULL, 'c6bbaf5f-79d1-4e43-aa78-3f9571856607', 'e4a466d5-0192-474b-aefd-67ecc9c762d9'),

(uuid_generate_v4(), 'Monitor LG 24" Full HD', 600.00, 879.00, 46.50, 829.00, 40, 'UN', true, 'Painel IPS, HDMI, 75Hz', now(), now(), NULL, 'c6bbaf5f-79d1-4e43-aa78-3f9571856607', 'e4a466d5-0192-474b-aefd-67ecc9c762d9'),

(uuid_generate_v4(), 'Notebook Dell Inspiron 15', 2800.00, 3699.00, 32.10, 3499.00, 12, 'UN', true, 'i5 12ª geração, 8GB RAM, SSD 512GB', now(), now(), NULL, 'c6bbaf5f-79d1-4e43-aa78-3f9571856607', 'e4a466d5-0192-474b-aefd-67ecc9c762d9'),

(uuid_generate_v4(), 'Pen Drive Sandisk 64GB', 35.00, 59.90, 71.14, 49.90, 250, 'UN', true, 'USB 3.1, alta velocidade', now(), now(), NULL, 'c6bbaf5f-79d1-4e43-aa78-3f9571856607', 'e4a466d5-0192-474b-aefd-67ecc9c762d9'),

(uuid_generate_v4(), 'HD Externo Seagate 1TB', 230.00, 349.00, 51.74, 319.00, 60, 'UN', true, 'USB 3.0, portátil', now(), now(), NULL, 'c6bbaf5f-79d1-4e43-aa78-3f9571856607', 'e4a466d5-0192-474b-aefd-67ecc9c762d9'),

(uuid_generate_v4(), 'Cabo HDMI 2.0 2m', 15.00, 29.90, 99.33, 24.90, 300, 'UN', true, 'Compatível com 4K a 60Hz', now(), now(), NULL, 'c6bbaf5f-79d1-4e43-aa78-3f9571856607', 'e4a466d5-0192-474b-aefd-67ecc9c762d9'),

(uuid_generate_v4(), 'Suporte para Monitor Articulado', 85.00, 139.00, 63.53, 119.00, 30, 'UN', true, 'Suporte ajustável de mesa', now(), now(), NULL, 'c6bbaf5f-79d1-4e43-aa78-3f9571856607', 'e4a466d5-0192-474b-aefd-67ecc9c762d9'),

(uuid_generate_v4(), 'Cadeira Gamer ThunderX3 TGC12', 700.00, 1099.00, 57.00, 999.00, 15, 'UN', true, 'Reclinável, com apoio de braço 3D', now(), now(), NULL, 'c6bbaf5f-79d1-4e43-aa78-3f9571856607', 'e4a466d5-0192-474b-aefd-67ecc9c762d9'),

(uuid_generate_v4(), 'Headset Logitech G432', 200.00, 299.00, 49.50, 279.00, 80, 'UN', true, 'Som 7.1, microfone retrátil', now(), now(), NULL, 'c6bbaf5f-79d1-4e43-aa78-3f9571856607', 'e4a466d5-0192-474b-aefd-67ecc9c762d9');
