CREATE TABLE `dev_wiki`.`tag_mapping` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `entity_id` INT NOT NULL,
  `tag_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `IX_FK_ENTITY_ID_idx` (`entity_id` ASC),
  INDEX `IX_FK_TAG_ID_idx` (`tag_id` ASC),
  CONSTRAINT `IX_FK_ENTITY_ID`
    FOREIGN KEY (`entity_id`)
    REFERENCES `dev_wiki`.`data_entity` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `IX_FK_TAG_ID`
    FOREIGN KEY (`tag_id`)
    REFERENCES `dev_wiki`.`tags` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
