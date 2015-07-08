CREATE TABLE `dev_wiki`.`resources` (
  `resource_id` INT NOT NULL,
  `url` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`resource_id`),
  UNIQUE INDEX `url_UNIQUE` (`url` ASC),
  CONSTRAINT `X_FK_ENTITY_ID`
    FOREIGN KEY (`resource_id`)
    REFERENCES `dev_wiki`.`data_entity` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
