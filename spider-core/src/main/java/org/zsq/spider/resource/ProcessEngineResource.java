package org.zsq.spider.resource;

import java.util.HashMap;
import java.util.Map;

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
@RestController("test")
@RequestMapping("/test")
public class ProcessEngineResource {
	
	/**
	 * 系统进程
	 * @return
	 */
	@RequestMapping(value="/process.json", method = RequestMethod.GET, produces = "application/json")
	public Map<String,String> process(){
		Map<String,String> test = new HashMap<String, String>();
		test.put("name", "朱元宇");
		return test;
	}
}
