package com.data.dao;

import java.util.List;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.data.vo.MovieVO;

@Repository
public class MovieDAOImpl implements MovieDAO {

	
	@Inject
	private SqlSession sqlSession;
	
	private static final String Namespace = "com.data.mybatis.sql.test";
	
	@Override
	public List<MovieVO> selectMovie() throws Exception {
		// TODO Auto-generated method stub
		return sqlSession.selectList(Namespace+".selectMovie");
	}
	
	
}
