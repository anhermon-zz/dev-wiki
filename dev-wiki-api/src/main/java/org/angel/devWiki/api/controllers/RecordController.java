package org.angel.devWiki.api.controllers;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value = "/api")
public class RecordController {

//	private static final Logger logger = Logger.getLogger(RecordController.class);
	
	//PRIVATE APIs
	@RequestMapping(value = "/user" , method = RequestMethod.GET)
	public Response getUserProfile(){
		try{
			return Response.ok()./*entity(upd.getById(1)).*/build(); //In case property was inserted successfully return HTTP 200
		}catch(Exception e){
			e.printStackTrace();
			return Response.status(Status.INTERNAL_SERVER_ERROR).build(); // In case of exception return HTTP 500
		}
	}
	
}
