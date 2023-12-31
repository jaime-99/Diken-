import { Menu } from './menu.model';

export const menuItems = [
    // new Menu (10, 'ADMIN_NAV.DASHBOARD', '/admin/dashboard', null, 'dashboard', null, false, 0),//todo esta la comente
    new Menu (20, 'Productos', null, null, 'grid_on', null, true, 0),
    new Menu (21, 'Categorias', '/admin/products/categories', null, 'category', null, false, 20),
    new Menu (22, 'Productos', '/admin/products/product-list', null, 'list', null, false, 20),
    // new Menu (23, 'ADMIN_NAV.PRODUCT_DETAIL', '/admin/products/product-detail', null, 'remove_red_eye', null, false, 20),
    // new Menu (24, 'Agregar Producto', '/admin/products/add-product', null, 'add_circle_outline', null, false, 20),
    // new Menu (30, 'Ventas', null, null, 'monetization_on', null, true, 0), //todo esta la comente
    // new Menu (31, 'Cotizaciones', '/admin/sales/orders', null, 'list_alt', null, false, 30),
    new Menu (32, 'Cotizaciones', '/admin/sales/cotizaciones', null, 'local_atm', null, false, 30),
    new Menu (40, 'Usuarios.', '/admin/users', null, 'group_add', null, false, 0),
    // new Menu (50, 'Clientes', '/admin/customers', null, 'supervisor_account', null, false, 0),
    // new Menu (60, 'ADMIN_NAV.COUPONS', '/admin/coupons', null, 'card_giftcard', null, false, 0),
    // new Menu (70, 'ADMIN_NAV.WITHDRAWAL', '/admin/withdrawal', null, 'credit_card', null, false, 0),
    new Menu (80, 'Analitica', '/admin/analytics', null, 'multiline_chart', null, false, 0),
    // new Menu (90, 'ADMIN_NAV.REFUND', '/admin/refund', null, 'restore', null, false, 0),
    // new Menu (100, 'Asesores', '/admin/followers', null, 'follow_the_signs', null, false, 0),
    // new Menu (110, 'Mesa de ayuda', null, null, 'support', null, true, 0),
    // new Menu (111, 'Tablero', '/admin/support/board', null, 'category', null, false, 110),
    // new Menu (112, 'Tickets', '/admin/support/Tiket-list', null, 'support', null, false, 110),
    // // new Menu (110, 'ADMIN_NAV.SUPPORT', '/admin/support', null, 'support', null, false, 0),
    // new Menu (120, 'ADMIN_NAV.REVIEWS', '/admin/reviews', null, 'insert_comment', null, false, 0),
    // new Menu (140, 'Level 1', null, null, 'more_horiz', null, true, 0),
    // new Menu (141, 'Level 2', null, null, 'folder_open', null, true, 140),
    // new Menu (142, 'Level 3', null, null, 'folder_open', null, true, 141),
    // new Menu (143, 'Level 4', null, null, 'folder_open', null, true, 142),
    // new Menu (144, 'Level 5', null, '/', 'link', null, false, 143),
    // new Menu (200, 'ADMIN_NAV.EXTERNAL_LINK', null, 'http://themeseason.com', 'open_in_new', '_blank', false, 0)
]
