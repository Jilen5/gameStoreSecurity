DROP TABLE IF EXISTS user_games;
DROP TABLE IF EXISTS game_categories;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS roles;

CREATE TABLE roles(
   id_role SERIAL PRIMARY KEY,
   name VARCHAR(50) NOT NULL
);

CREATE TABLE users(
   id_user SERIAL PRIMARY KEY,
   username TEXT NOT NULL,
   email_enc TEXT NOT NULL,
   email_hash CHAR(64) NOT NULL,
   password VARCHAR(200) NOT NULL,
   id_role INT NOT NULL,
   UNIQUE(email_hash),
   FOREIGN KEY(id_role) REFERENCES roles(id_role)
);

CREATE TABLE games(
   id_game SERIAL PRIMARY KEY,
   name VARCHAR(50) NOT NULL,
   price DECIMAL(15,2) NOT NULL,
   description TEXT NOT NULL
);

CREATE TABLE comments(
   id_comment SERIAL PRIMARY KEY,
   content TEXT NOT NULL,
   note DECIMAL(15,2) NOT NULL,
   type VARCHAR(50) NOT NULL,
   id_user INT NOT NULL,
   id_game INT NOT NULL,
   FOREIGN KEY(id_user) REFERENCES users(id_user),
   FOREIGN KEY(id_game) REFERENCES games(id_game)
);

CREATE TABLE categories(
   id_category SERIAL PRIMARY KEY,
   name VARCHAR(50) NOT NULL
);

CREATE TABLE game_Categories(
   id_game INT,
   id_category INT,
   PRIMARY KEY(id_game, id_category),
   FOREIGN KEY(id_game) REFERENCES games(id_game),
   FOREIGN KEY(id_category) REFERENCES categories(id_category)
);

CREATE TABLE user_Games(
   id_user INT,
   id_game INT,
   buyDate DATE NOT NULL,
   PRIMARY KEY(id_user, id_game),
   FOREIGN KEY(id_user) REFERENCES users(id_user),
   FOREIGN KEY(id_game) REFERENCES games(id_game)
);

INSERT INTO roles (name) VALUES ('admin'), ('user');
INSERT INTO games (name, price, description)
VALUES ('Rocket League', 0.0, 'Un jeu avec des voitures qui font du foot');
INSERT INTO categories (name)
VALUES ('Action');
INSERT INTO game_categories (id_game, id_category)
VALUES (1, 1);
