package com.iliamalafeev.bookstore.bookstore_backend.security.dto.responses;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class AuthenticationResponse {

    private String token;
}
