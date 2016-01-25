package org.zsq.atciviti.controller;

import org.springframework.core.annotation.Order;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.AbstractJsonpResponseBodyAdvice;

@Order(2)  
@ControllerAdvice(basePackages = {"org.zsq","org.activiti.rest.service.api"})
public class JsonpAdvice extends AbstractJsonpResponseBodyAdvice {  
    public JsonpAdvice() {  
        super("callback", "jsonp"); //指定jsonpParameterNames  
    }  
}  
