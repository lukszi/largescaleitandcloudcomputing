-- -----------------------------------------------------
-- Schema chat_service
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS "user";

-- -----------------------------------------------------
-- Table "user"."user"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "user"."user" (
    user_id SERIAL NOT NULL,
    "name" VARCHAR(45) NOT NULL,
    "password" bytea NOT NULL,
    PRIMARY KEY (user_id));