package com.vsnamta.bookstore.web.page;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.web.ErrorProperties;
import org.springframework.boot.autoconfigure.web.servlet.error.BasicErrorController;
import org.springframework.boot.autoconfigure.web.servlet.error.ErrorViewResolver;
import org.springframework.boot.web.servlet.error.DefaultErrorAttributes;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class CustomErrorController extends BasicErrorController {
    @Autowired
    public CustomErrorController(List<ErrorViewResolver> errorViewResolvers) {
        super(new CustomErrorAttributes(), new ErrorProperties(), errorViewResolvers);
    }

    @Override
    public ModelAndView errorHtml(HttpServletRequest request, HttpServletResponse response) {
        HttpStatus status = getStatus(request);

        if(status.equals(HttpStatus.NOT_FOUND)) {
            response.setStatus(HttpStatus.OK.value());

            return new ModelAndView("/");
        }                       

        return super.errorHtml(request, response);
    }

    private static class CustomErrorAttributes extends DefaultErrorAttributes {
        @Override
        public Map<String, Object> getErrorAttributes(WebRequest webRequest, boolean includeStackTrace) {
            Map<String, Object> errorAttributes = super.getErrorAttributes(webRequest, includeStackTrace);
            errorAttributes.remove("timestamp");
            errorAttributes.remove("status");
            errorAttributes.remove("error");
            errorAttributes.remove("path");

            return errorAttributes;
        }
    }
}