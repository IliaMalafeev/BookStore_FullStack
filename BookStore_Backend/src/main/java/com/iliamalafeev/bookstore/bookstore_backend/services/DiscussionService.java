package com.iliamalafeev.bookstore.bookstore_backend.services;

import com.iliamalafeev.bookstore.bookstore_backend.dto.DiscussionDTO;
import com.iliamalafeev.bookstore.bookstore_backend.entities.Discussion;
import com.iliamalafeev.bookstore.bookstore_backend.entities.Person;
import com.iliamalafeev.bookstore.bookstore_backend.repositories.DiscussionRepository;
import com.iliamalafeev.bookstore.bookstore_backend.repositories.PersonRepository;
import com.iliamalafeev.bookstore.bookstore_backend.utils.ErrorsUtil;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class DiscussionService {

    private final ModelMapper modelMapper;
    private final DiscussionRepository discussionRepository;
    private final PersonRepository personRepository;

    @Autowired
    public DiscussionService(ModelMapper modelMapper, DiscussionRepository discussionRepository, PersonRepository personRepository) {
        this.modelMapper = modelMapper;
        this.discussionRepository = discussionRepository;
        this.personRepository = personRepository;
    }

//  <------------------------------------------------------------------------------->
//  <-------------------- Service public methods for controller -------------------->
//  <------------------------------------------------------------------------------->

    public Page<DiscussionDTO> findAllByPersonEmail(String personEmail, Pageable pageable) {

        Person person = getPersonFromRepository(personEmail);

        Page<Discussion> discussions = discussionRepository.findByDiscussionHolder(person, PageRequest.of(pageable.getPageNumber(), pageable.getPageSize()));

        List<DiscussionDTO> pageContent = new ArrayList<>();

        for (Discussion discussion : discussions) {
            DiscussionDTO discussionDTO = convertToDiscussionDTO(discussion);
            discussionDTO.setPersonEmail(personEmail);
            discussionDTO.setPersonFirstName(person.getFirstName());
            discussionDTO.setPersonLastName(person.getLastName());
            pageContent.add(discussionDTO);
        }

        return new PageImpl<>(pageContent, discussions.getPageable(), discussions.getTotalElements());
    }

    public Page<DiscussionDTO> findAllByClosed(Pageable pageable) {

        Page<Discussion> discussions = discussionRepository.findByClosed(false, PageRequest.of(pageable.getPageNumber(), pageable.getPageSize()));

        List<DiscussionDTO> pageContent = new ArrayList<>();

        for (Discussion discussion : discussions) {
            Person person = discussion.getDiscussionHolder();
            DiscussionDTO discussionDTO = convertToDiscussionDTO(discussion);
            discussionDTO.setPersonEmail(person.getEmail());
            discussionDTO.setPersonFirstName(person.getFirstName());
            discussionDTO.setPersonLastName(person.getLastName());
            pageContent.add(discussionDTO);
        }

        return new PageImpl<>(pageContent, discussions.getPageable(), discussions.getTotalElements());
    }

    public void addDiscussion(String personEmail, DiscussionDTO discussionDTO, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            ErrorsUtil.returnDiscussionError("Some fields are invalid.", bindingResult);
        }

        Person person = getPersonFromRepository(personEmail);

        Discussion discussion = convertToDiscussion(discussionDTO);
        discussion.setDiscussionHolder(person);
        discussion.setClosed(false);
        person.getDiscussions().add(discussion);

        discussionRepository.save(discussion);
    }

    public void updateDiscussion(String adminEmail, DiscussionDTO discussionDTO, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            ErrorsUtil.returnDiscussionError("Some fields are invalid.", bindingResult);
        }

        if (discussionDTO.getResponse() == null || discussionDTO.getResponse().isEmpty() || discussionDTO.getResponse().replaceAll(" *", "").isEmpty()) {
            ErrorsUtil.returnDiscussionError("Discussion cannot be closed without administration response", null);
        }

        Optional<Discussion> discussionOptional = discussionRepository.findById(discussionDTO.getId());

        if (discussionOptional.isEmpty()) {
            ErrorsUtil.returnDiscussionError("Discussion not found.", null);
        }

        Discussion discussion = discussionOptional.get();

        if (discussion.getClosed()) {
            ErrorsUtil.returnDiscussionError("This discussion is already closed.", null);
        }

        discussion.setAdminEmail(adminEmail);
        discussion.setResponse(discussionDTO.getResponse());
        discussion.setClosed(true);

        discussionRepository.save(discussion);
    }

//  <-------------------------------------------------------------------------------------------->
//  <-------------------- Service private methods for some code re-usability -------------------->
//  <-------------------------------------------------------------------------------------------->

    private Person getPersonFromRepository(String personEmail) {

        return personRepository.findByEmail(personEmail).get();
    }

    private DiscussionDTO convertToDiscussionDTO(Discussion discussion) {
        return modelMapper.map(discussion, DiscussionDTO.class);
    }

    private Discussion convertToDiscussion(DiscussionDTO discussionDTO) {
        return modelMapper.map(discussionDTO, Discussion.class);
    }
}