package com.data.service;

import java.util.List;

import com.data.vo.WineVO;

public interface WineService {

	public List<WineVO>selectWine() throws Exception;
}
