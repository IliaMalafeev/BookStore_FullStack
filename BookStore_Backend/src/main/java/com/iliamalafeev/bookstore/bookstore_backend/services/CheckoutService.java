package com.iliamalafeev.bookstore.bookstore_backend.services;

import com.iliamalafeev.bookstore.bookstore_backend.dto.BookDTO;
import com.iliamalafeev.bookstore.bookstore_backend.dto.CheckoutDTO;
import com.iliamalafeev.bookstore.bookstore_backend.entities.Book;
import com.iliamalafeev.bookstore.bookstore_backend.entities.Checkout;
import com.iliamalafeev.bookstore.bookstore_backend.entities.Person;
import com.iliamalafeev.bookstore.bookstore_backend.repositories.CheckoutRepository;
import com.iliamalafeev.bookstore.bookstore_backend.repositories.PersonRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class CheckoutService {

    private final ModelMapper modelMapper;
    private final CheckoutRepository checkoutRepository;
    private final PersonRepository personRepository;

    @Autowired
    public CheckoutService(ModelMapper modelMapper, CheckoutRepository checkoutRepository, PersonRepository personRepository) {
        this.modelMapper = modelMapper;
        this.checkoutRepository = checkoutRepository;
        this.personRepository = personRepository;
    }

//  <------------------------------------------------------------------------------->
//  <-------------------- Service public methods for controller -------------------->
//  <------------------------------------------------------------------------------->

    public int getCurrentCheckoutsCount(String personEmail) {

        Person person = getPersonFromRepository(personEmail);

        return checkoutRepository.findByCheckoutHolder(person).size();
    }

    public List<CheckoutDTO> getCurrentCheckouts(String personEmail) {

        Person person = getPersonFromRepository(personEmail);

        List<CheckoutDTO> response = new ArrayList<>();

        List<Checkout> checkouts = checkoutRepository.findByCheckoutHolder(person);

        Map<Checkout, Book> checkoutBookMap = new HashMap<>();

        for (Checkout checkout : checkouts) {
            checkoutBookMap.put(checkout, checkout.getCheckedOutBook());
        }

        for (Map.Entry<Checkout, Book> entry : checkoutBookMap.entrySet()) {
            LocalDate d1 = entry.getKey().getReturnDate();
            LocalDate d2 = LocalDate.now();

            long differenceInTime = ChronoUnit.DAYS.between(d2, d1);

            CheckoutDTO checkoutDTO = new CheckoutDTO(convertToBookDTO(entry.getValue()), (int) differenceInTime);
            response.add(checkoutDTO);
        }

        return response;
    }

//  <-------------------------------------------------------------------------------------------->
//  <-------------------- Service private methods for some code re-usability -------------------->
//  <-------------------------------------------------------------------------------------------->

    private Person getPersonFromRepository(String personEmail) {

        return personRepository.findByEmail(personEmail).get();
    }

    private BookDTO convertToBookDTO(Book book) {
        return modelMapper.map(book, BookDTO.class);
    }
}