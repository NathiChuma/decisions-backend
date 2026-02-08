package com.ghostcoder.decisions_backend;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class User {
    private String documentId;
    private String email;
    private String password;
}
