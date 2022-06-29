-- -----------------------------------------------------
-- Schema chat_service
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS "message";

-- -----------------------------------------------------
-- Table "chat_service"."chat_message"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "message"."chat_message" (
    "message_id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "chat_id" INT NOT NULL,
    "time" TIMESTAMP NULL,
    "author_id" INT NULL,
    PRIMARY KEY ("message_id"));