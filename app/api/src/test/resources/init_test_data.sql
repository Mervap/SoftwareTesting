insert into user_roles (id, name) values (1, 'ROLE_USER');
insert into users (id, password, username) values (1, '$2a$10$SFRS8KFwYzdjYV5q3HynpuCSbl6TK9krkqKK0evSrX7MtAKVyxP1C', 'TestUser');
insert into users_roles (user_id, roles_id) values (1, 1);