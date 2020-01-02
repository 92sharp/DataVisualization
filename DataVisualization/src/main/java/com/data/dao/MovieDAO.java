package com.data.dao;

import java.util.List;

import com.data.vo.MovieVO;

public interface MovieDAO {

	public List<MovieVO>selectMovie() throws Exception;
	
}
