CREATE TABLE users2(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL
);

INSERT INTO users2(user_name, user_password, user_email) VALUES('jomar','test123','jomar22@hotmail.com');