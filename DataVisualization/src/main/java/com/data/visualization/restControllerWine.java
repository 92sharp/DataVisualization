package com.data.visualization;

import java.util.List;
import java.util.Locale;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.data.service.WineService;
import com.data.vo.WineVO;

/**
 * Handles requests for the application home page.
 */

@RestController
public class restControllerWine {
	
	private static final Logger logger = LoggerFactory.getLogger(restControllerWine.class);
	
	@Inject
	private WineService service;
	
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/wine")
	public List<WineVO> movieList() throws Exception {
		logger.info("home");
		
		List<WineVO>WineList = service.selectWine();
		
		//model.addAttribute("movieList", movieList);
		
		return WineList;
	}
	
}

