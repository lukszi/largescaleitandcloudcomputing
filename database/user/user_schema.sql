-- -----------------------------------------------------
-- Schema chat_service
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS "users";

-- -----------------------------------------------------
-- Table "users"."users"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "users"."users" (
    "user_id" SERIAL NOT NULL,
    "name" VARCHAR(45) NOT NULL UNIQUE,
    "password" VARCHAR(60) NOT NULL,
    PRIMARY KEY ("user_id"));

INSERT INTO "users"."users" (name, password) VALUES ('Lukas', '$2a$12$WTHbLMXJZ9WuNmTJ16Zq3uQAPoL.nVM99y/gDjUu.KvgWF1fqBg0q')