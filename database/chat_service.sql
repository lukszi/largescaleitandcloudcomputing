-- -----------------------------------------------------
-- Schema chat_service
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS "chat_service";

-- -----------------------------------------------------
-- Table "chat_service"."user"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "chat_service"."user" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(45) NOT NULL,
    PRIMARY KEY ("id"));


-- -----------------------------------------------------
-- Table "chat_service"."chat"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "chat_service"."chat" (
    "id" SERIAL NOT NULL,
    "chat_name" VARCHAR(45) NULL,
    PRIMARY KEY ("id"));

-- -----------------------------------------------------
-- Table "chat_service"."chat_participant"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "chat_service"."chat_participant" (
    "user_id" INT NOT NULL,
    "chat_id" INT NOT NULL,
    PRIMARY KEY ("user_id", "chat_id"),
    CONSTRAINT "fk_user"
    FOREIGN KEY ("user_id")
    REFERENCES "chat_service"."user" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    CONSTRAINT "fk_chat"
    FOREIGN KEY ("chat_id")
    REFERENCES "chat_service"."chat" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table "chat_service"."chat_message"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "chat_service"."chat_message" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "chat_id" INT NOT NULL,
    "time" TIMESTAMP NULL,
    "author_id" INT NULL,
    PRIMARY KEY ("id"),
    CONSTRAINT "fk_chat_id"
    FOREIGN KEY ("chat_id")
    REFERENCES "chat_service"."chat" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    CONSTRAINT "fk_author_id"
    FOREIGN KEY ("author_id")
    REFERENCES "chat_service"."user" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);