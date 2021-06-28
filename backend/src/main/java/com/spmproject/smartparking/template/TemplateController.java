package com.spmproject.smartparking.template;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/")
public class TemplateController {

    @GetMapping("login")
    public String getLoginView() {
        return "login";
    }

    @GetMapping("home")
    public String homeView(HttpServletRequest request) {
        if (request.isUserInRole("ROLE_DRIVER"))
            return "homeDriver";
        else if (request.isUserInRole("ROLE_POLICEMAN"))
            return "homePoliceman";
        else if (request.isUserInRole("ROLE_MUNICIPALITY"))
            return "homeMunicipality";
        else if (request.isUserInRole("ROLE_ADMIN"))
            return "homeAdmin";
        else
            return "noAuth";
    }
}
