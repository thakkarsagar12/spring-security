package com.solstice.security.controller;

import com.solstice.security.model.User;
import com.solstice.security.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> listUser(){
        return userService.findAll();
    }

    @GetMapping("/{id}")
    User getUser(@PathVariable("id") Long id){
        return userService.findUser(id);
    }

    @PostMapping
    public User create(@RequestBody User user){
        return userService.save(user);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable("id") Long id){
        userService.delete(id);
        return "Success";
    }

}
