package org.zsq.spider.resource;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * 流程引擎对外提供的restful风格的资源信息列表
 * 
 * 
 * @author peculiar.1@163.com
 * @version $ID: ProcessEngineResource.java, V1.0.0 2015年12月2日 下午10:26:49 $
 */
@RestController
@RequestMapping("pseg")
public class ProcessEngineResource {
	
	/**
	 * 系统进程
	 * @return
	 */
	@RequestMapping(value="process",method= RequestMethod.GET)
	public List<String> process(){
		List<String> test = new ArrayList<String>();
		test.add("test");
		return test;
	}
}
