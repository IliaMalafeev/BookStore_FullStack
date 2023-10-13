package com.iliamalafeev.mybookstore.mybookstore_backend.services;

import com.iliamalafeev.mybookstore.mybookstore_backend.dto.BookDTO;
import com.iliamalafeev.mybookstore.mybookstore_backend.dto.HistoryRecordDTO;
import com.iliamalafeev.mybookstore.mybookstore_backend.entities.Book;
import com.iliamalafeev.mybookstore.mybookstore_backend.entities.HistoryRecord;
import com.iliamalafeev.mybookstore.mybookstore_backend.entities.Person;
import com.iliamalafeev.mybookstore.mybookstore_backend.repositories.HistoryRecordRepository;
import com.iliamalafeev.mybookstore.mybookstore_backend.repositories.PersonRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class HistoryRecordService {

    private final ModelMapper modelMapper;
    private final HistoryRecordRepository historyRecordRepository;
    private final PersonRepository personRepository;

    @Autowired
    public HistoryRecordService(ModelMapper modelMapper, HistoryRecordRepository historyRecordRepository, PersonRepository personRepository) {
        this.modelMapper = modelMapper;
        this.historyRecordRepository = historyRecordRepository;
        this.personRepository = personRepository;
    }

    public Page<HistoryRecordDTO> findAllByPersonEmail(String personEmail, Pageable pageable) {

        Person person = personRepository.findByEmail(personEmail).get();

        Page<HistoryRecord> historyRecords = historyRecordRepository.findByHistoryRecordHolder(person, PageRequest.of(pageable.getPageNumber(), pageable.getPageSize()));

        List<HistoryRecordDTO> pageContent = new ArrayList<>();

        for (HistoryRecord historyRecord : historyRecords) {
            HistoryRecordDTO historyRecordDTO = convertToHistoryRecordDTO(historyRecord);
            historyRecordDTO.setBookDTO(convertToBookDTO(historyRecord.getHistoryRecordedBook()));
            pageContent.add(historyRecordDTO);
        }

        return new PageImpl<>(pageContent, historyRecords.getPageable(), historyRecords.getTotalElements());
    }

    private HistoryRecordDTO convertToHistoryRecordDTO(HistoryRecord historyRecord) {
        return modelMapper.map(historyRecord, HistoryRecordDTO.class);
    }

    private BookDTO convertToBookDTO(Book book) {
        return modelMapper.map(book, BookDTO.class);
    }
}
