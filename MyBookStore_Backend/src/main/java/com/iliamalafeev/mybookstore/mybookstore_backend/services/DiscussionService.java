package com.iliamalafeev.mybookstore.mybookstore_backend.services;

import com.iliamalafeev.mybookstore.mybookstore_backend.dto.DiscussionDTO;
import com.iliamalafeev.mybookstore.mybookstore_backend.entities.Discussion;
import com.iliamalafeev.mybookstore.mybookstore_backend.entities.Person;
import com.iliamalafeev.mybookstore.mybookstore_backend.repositories.DiscussionRepository;
import com.iliamalafeev.mybookstore.mybookstore_backend.repositories.PersonRepository;
import com.iliamalafeev.mybookstore.mybookstore_backend.utils.ErrorsUtil;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
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

    public List<DiscussionDTO> findAllByPersonEmail(String personEmail) {

        Person person = personRepository.findByEmail(personEmail).get();

        List<Discussion> discussions = discussionRepository.findByDiscussionHolder(person);

        List<DiscussionDTO> response = new ArrayList<>();

        for (Discussion discussion : discussions) {
            DiscussionDTO discussionDTO = convertToDiscussionDTO(discussion);
            discussionDTO.setPersonEmail(personEmail);
            discussionDTO.setPersonFirstName(person.getFirstName());
            discussionDTO.setPersonLastName(person.getLastName());
            response.add(discussionDTO);
        }

        return response;
    }

    public void addDiscussion(String personEmail, DiscussionDTO discussionDTO, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            ErrorsUtil.returnDiscussionError("Some fields are invalid.", bindingResult);
        }

        Person person = personRepository.findByEmail(personEmail).get();

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

    private DiscussionDTO convertToDiscussionDTO(Discussion discussion) {
        return modelMapper.map(discussion, DiscussionDTO.class);
    }

    private Discussion convertToDiscussion(DiscussionDTO discussionDTO) {
        return modelMapper.map(discussionDTO, Discussion.class);
    }
}