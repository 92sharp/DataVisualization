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

import com.data.service.MovieService;
import com.data.vo.MovieVO;

/**
 * Handles requests for the application home page.
 */

@RestController
public class restController {
	
	private static final Logger logger = LoggerFactory.getLogger(restController.class);
	
	@Inject
	private MovieService service;
	
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/restex")
	public List<MovieVO> movieList() throws Exception {
		logger.info("home");
		
		List<MovieVO>movieList = service.selectMovie();
		
		//model.addAttribute("movieList", movieList);
		
		return movieList;
	}
	
}

