package org.angel.devWiki.api.repositories;

import java.util.Date;

import javax.transaction.Transactional;

import org.angel.devWiki.api.App;
import org.angel.devWiki.api.controllers.DataEntityRepository;
import org.angel.devWiki.api.model.DataEntity;
import org.angel.devWiki.api.model.Resource;
import org.apache.log4j.Logger;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes={App.class})
@ActiveProfiles("dev")
public class DataEntityRepositoryTest {
	private static final Logger logger = Logger.getLogger(DataEntityRepositoryTest.class);
	@Autowired
	private DataEntityRepository dataEntityRepository;
	
	//@Test
	public void initTest() {
		logger.info("DataEntityRepository init test");
		Assert.assertNotNull(dataEntityRepository);
	}
	
	//@Test
	public void resourceCRUDTest() {
		logger.info("Resource CRUD test:");
		DataEntity resource = new Resource();
		resource.setAuthor("Angel");
		resource.setCrationDate(new Date());
		resource.setTitle("title");
		logger.info("Saving: " + resource);
		dataEntityRepository.save(resource);
		Assert.assertNotNull(resource.getId());
		Assert.assertNotNull(dataEntityRepository.findOne(resource.getId()));
		logger.info("Saved successfully!, deleteing...");
		dataEntityRepository.delete(resource);
	}

}
