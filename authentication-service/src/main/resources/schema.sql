create table if not exists oauth_client_details
(
    client_id               VARCHAR(256) PRIMARY KEY,
    resource_ids            VARCHAR(256),
    client_secret           VARCHAR(256),
    scope                   VARCHAR(256),
    authorized_grant_types  VARCHAR(256),
    web_server_redirect_uri VARCHAR(256),
    authorities             VARCHAR(256),
    access_token_validity   INTEGER,
    refresh_token_validity  INTEGER,
    additional_information  VARCHAR(4096),
    autoapprove             VARCHAR(256)
);

create table if not exists oauth_access_token
(
    token_id          VARCHAR(255),
    token             bytea,
    authentication_id VARCHAR(255),
    user_name         VARCHAR(255),
    client_id         VARCHAR(255),
    authentication    bytea,
    refresh_token     VARCHAR(255)
);

create index if not exists oauth_access_token_id on oauth_access_token (token_id);
create index if not exists oauth_refresh_token_id on oauth_access_token (token_id);

create table if not exists oauth_refresh_token
(
    token_id       VARCHAR(255),
    token          bytea,
    authentication bytea
);

create table if not exists app_user
(
    card_id         varchar(16) not null
        constraint app_user_pkey
            primary key,
    activation_code uuid,
    active          boolean,
    email           varchar(255)
        constraint uk_1j9d9a06i600gd43uu3km82jw
            unique,
    password        varchar(255),
    reset_code      uuid
);

create table if not exists app_role
(
    card_id varchar(16) not null
        constraint fkpudms5ttsusiw6dqha8167y73
            references app_user
            on update cascade on delete cascade,
    roles   varchar(255)
);



INSERT INTO oauth_client_details
(client_id, client_secret, scope, authorized_grant_types, authorities, access_token_validity, refresh_token_validity)
VALUES ('netcracker', '$2a$10$Fx2/ek02O3z/vrwXQNc52.EDjxrUkwqwfCuKRGyJSkYrGodBaJkli', 'webclient, mobileclient',
        'password,refresh_token,client_credentials,authorization_code', 'ROLE_CLIENT,ROLE_TRUSTED_CLIENT', 900, 2592000)
on conflict do nothing;