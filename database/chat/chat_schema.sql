-- -----------------------------------------------------
-- Schema chat_service
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS "chat";

-- -----------------------------------------------------
-- Table "chat"."chat"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "chat"."chat" (
    "id" SERIAL NOT NULL,
    "chat_name" VARCHAR(45) NULL,
    PRIMARY KEY ("id"));

-- -----------------------------------------------------
-- Table "chat"."chat_participant"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "chat"."chat_participant" (
    "participation_id" SERIAL NOT NULL,
    "user_id" INT NOT NULL,
    "chat_id" INT NOT NULL,
    PRIMARY KEY ("participation_id"),
    CONSTRAINT "fk_chat"
    FOREIGN KEY ("chat_id")
    REFERENCES "chat"."chat" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);