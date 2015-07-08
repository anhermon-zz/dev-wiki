package org.angel.devWiki.api.controllers;

import org.angel.devWiki.api.model.DataEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel="dataEntity", path="dataEntity")
public interface DataEntityRepository extends CrudRepository<DataEntity, Integer>{
}
