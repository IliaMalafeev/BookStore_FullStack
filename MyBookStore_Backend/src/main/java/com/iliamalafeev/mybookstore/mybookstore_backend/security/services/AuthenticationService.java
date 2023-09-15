package com.iliamalafeev.mybookstore.mybookstore_backend.security.services;

import com.iliamalafeev.mybookstore.mybookstore_backend.entities.Person;
import com.iliamalafeev.mybookstore.mybookstore_backend.repositories.PersonRepository;
import com.iliamalafeev.mybookstore.mybookstore_backend.security.dto.requests.PersonLoginDTO;
import com.iliamalafeev.mybookstore.mybookstore_backend.security.dto.requests.PersonRegistrationDTO;
import com.iliamalafeev.mybookstore.mybookstore_backend.security.dto.responses.AuthenticationResponse;
import com.iliamalafeev.mybookstore.mybookstore_backend.security.entities.PersonDetails;
import com.iliamalafeev.mybookstore.mybookstore_backend.security.entities.Role;
import com.iliamalafeev.mybookstore.mybookstore_backend.security.jwt.JwtUtils;
import com.iliamalafeev.mybookstore.mybookstore_backend.utils.ErrorsUtil;
import com.iliamalafeev.mybookstore.mybookstore_backend.utils.validators.PersonValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.time.Instant;
import java.time.ZoneId;
import java.util.Optional;

@Service
public class AuthenticationService {

    private final PersonValidator personValidator;
    private final PersonRepository personRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public AuthenticationService(PersonValidator personValidator, PersonRepository personRepository,
                                 PasswordEncoder passwordEncoder, JwtUtils jwtUtils,
                                 AuthenticationManager authenticationManager) {
        this.personValidator = personValidator;
        this.personRepository = personRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
        this.authenticationManager = authenticationManager;
    }

    public AuthenticationResponse registerPerson(PersonRegistrationDTO personRegistrationDTO,
                                                 BindingResult bindingResult) {

        Person person = new Person();

        person.setFirstName(personRegistrationDTO.getFirstName());
        person.setLastName(personRegistrationDTO.getLastName());
        person.setDateOfBirth(personRegistrationDTO.getDateOfBirth());
        person.setEmail(personRegistrationDTO.getEmail());
        person.setPassword(passwordEncoder.encode(personRegistrationDTO.getPassword()));
        person.setRole(Role.ROLE_USER);
        person.setRegisteredAt(Instant.ofEpochMilli(System.currentTimeMillis()).atZone(ZoneId.of("UTC")).toLocalDateTime());

        personValidator.validate(person, bindingResult);

        if (bindingResult.hasErrors()) {
            ErrorsUtil.returnPersonError("Some fields are invalid.", bindingResult);
        }

        personRepository.save(person);

        String jwtToken = jwtUtils.generateToken(new PersonDetails(person));

        return new AuthenticationResponse(jwtToken);
    }

    public AuthenticationResponse authenticatePerson(PersonLoginDTO personLoginDTO,
                                                     BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            ErrorsUtil.returnPersonError("Some fields are invalid.", bindingResult);
        }

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(personLoginDTO.getEmail(), personLoginDTO.getPassword()));
        } catch (BadCredentialsException e) {
            ErrorsUtil.returnPersonError("Login or password is incorrect.", bindingResult);
        }

        Optional<Person> person = personRepository.findByEmail(personLoginDTO.getEmail());

        if (person.isEmpty()) {
            ErrorsUtil.returnPersonError("Person with such email is not found. Please check the input fields.", bindingResult);
        }

        String jwtToken = jwtUtils.generateToken(new PersonDetails(person.get()));

        return new AuthenticationResponse(jwtToken);
    }
}
