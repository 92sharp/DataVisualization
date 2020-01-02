package com.data.dao;

import java.util.List;

import com.data.vo.WineVO;

public interface WineDAO {

	public List<WineVO>selectWine() throws Exception;
}
