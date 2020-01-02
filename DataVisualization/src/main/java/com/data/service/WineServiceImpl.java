package com.data.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.data.dao.WineDAO;
import com.data.vo.WineVO;

@Service
public class WineServiceImpl implements WineService {

	@Inject
	private WineDAO dao;
	
	@Override
	public List<WineVO> selectWine() throws Exception {
		// TODO Auto-generated method stub
		return dao.selectWine();
	}
	
}
