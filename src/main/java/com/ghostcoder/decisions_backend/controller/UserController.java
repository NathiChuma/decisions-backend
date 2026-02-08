package com.ghostcoder.decisions_backend.controller;

import com.ghostcoder.decisions_backend.User;
import com.ghostcoder.decisions_backend.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RestController
public class UserController {

    public UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/createUser")
    public String createUser(@RequestBody User user) throws InterruptedException, ExecutionException {

        return userService.createUser(user);
    }

    @GetMapping("/getUser")
    public User getUser(@RequestParam String documentId) throws InterruptedException, ExecutionException {

        return userService.getUser(documentId);
    }

    @PutMapping("/updateUser")
    public String updateUser(@RequestBody User user) throws InterruptedException, ExecutionException {

        return userService.updateUser(user);
    }

    @DeleteMapping("/deleteUser")
    public String deleteUser(@RequestParam String documentId) throws InterruptedException, ExecutionException {

        return userService.deleteUser(documentId);
    }

    @GetMapping("/")
    public ResponseEntity<String> testGetEndPoint(){
        return ResponseEntity.ok("Test get Endpoint is Working");
    }
}
