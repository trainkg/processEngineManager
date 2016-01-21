package org.zsq.atciviti.controller;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 作为数据监控项目的后端路由
 * @author zhuyy
 */
@RequestMapping
@Controller
@Slf4j
public class ApplicationController {
	
	/**
	 * 使用main.jsp 作为系统入口,利用JSP特性保护主页面
	 * @return
	 */
	@RequestMapping("app")
	public String gotoMainApp(){
		log.info("登陆系统~");
		return "main";
	}
}
