package com.security.openidoauth2.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpCookie;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Controller
public class HomeController {
    private final Logger logger = LoggerFactory.getLogger(getClass());

    @RequestMapping("/")
    @ResponseBody
    public final String home() {
        final String username = SecurityContextHolder.getContext().getAuthentication().getName();
        logger.info(username);
        return "Welcome, " + SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
    }

    @RequestMapping("/my")
    @ResponseBody
    public final String logout(HttpCookie cookie) {
        return cookie.getValue();
    }
    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public void logout(HttpServletRequest request,
                       HttpServletResponse response) {
        /* Getting session and then invalidating it */
        HttpSession session = request.getSession(false);
        if (request.isRequestedSessionIdValid() && session != null) {
            session.invalidate();
        }
        handleLogOutResponse(request, response);
    }
    /**
     * This method would edit the cookie information and make JSESSIONID empty
     * while responding to logout. This would further help in order to. This would help
     * to avoid same cookie ID each time a person logs in
     * @param response
     */
    private void handleLogOutResponse(HttpServletRequest request, HttpServletResponse response) {
        Cookie[] cookies = request.getCookies();
        for (Cookie cookie : cookies) {
            cookie.setMaxAge(0);
            cookie.setValue(null);
            cookie.setPath("/");
            response.addCookie(cookie);
        }
    }
}
