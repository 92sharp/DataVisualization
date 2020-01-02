package com.data.service;

import java.util.List;

import com.data.vo.MovieVO;

public interface MovieService {

	public List<MovieVO>selectMovie() throws Exception;
}
