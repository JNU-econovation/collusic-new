package com.collusic.collusicbe.service;

import com.collusic.collusicbe.domain.requestproject.RequestProject;
import com.collusic.collusicbe.domain.requestproject.RequestProjectRepository;
import com.collusic.collusicbe.util.StringUtils;
import com.collusic.collusicbe.web.dto.RequestProjectResponseDto;
import com.collusic.collusicbe.web.dto.RequestProjectSaveRequestDto;
import com.collusic.collusicbe.web.dto.RequestProjectUpdateRequestDto;
import com.collusic.collusicbe.web.dto.RequestProjectsWithPaginationDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class RequestProjectService {

    private final RequestProjectRepository requestProjectRepository;
    private final S3Service s3Service;

    @Transactional
    public RequestProjectResponseDto save(RequestProjectSaveRequestDto requestProjectSaveRequestDto) throws IOException {
        String uploadFilePath = s3Service.upload(requestProjectSaveRequestDto.getMultipartFile(), "static");
        requestProjectSaveRequestDto.setUploadFilePath(uploadFilePath);
        RequestProject savedRequestProejct = requestProjectRepository.save(requestProjectSaveRequestDto.toEntity());
        return new RequestProjectResponseDto(savedRequestProejct);
    }

    @Transactional
    public RequestProjectResponseDto update(Long id, RequestProjectUpdateRequestDto requestProjectUpdateRequestDto) throws IOException {
        RequestProject requestProject = requestProjectRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 요청작이 없습니다. id=" + id));
        String savedFileName = StringUtils.extractFileNameFromFilePath(requestProject.getUploadFilePath());
        String uploadFilePath = s3Service.update(requestProjectUpdateRequestDto.getMultipartFile(), "static", savedFileName);
        requestProjectUpdateRequestDto.setUploadFilePath(uploadFilePath);
        requestProject.update(requestProjectUpdateRequestDto);
        return new RequestProjectResponseDto(requestProject);
    }

    @Transactional
    public RequestProjectResponseDto findById(Long id) {
        RequestProject requestProject = requestProjectRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 요청작이 없습니다. id=" + id));

        return new RequestProjectResponseDto(requestProject);
    }

    @Transactional
    public void delete(Long id) {
        RequestProject requestProject = requestProjectRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 요청작이 없습니다. id=" + id));

        requestProjectRepository.delete(requestProject);
    }

    @Transactional
    public RequestProjectsWithPaginationDto getRequestProjectsWithPagination(Pageable pageable) {
        Page<RequestProject> all = requestProjectRepository.findAll(pageable);
        List<RequestProjectResponseDto> requestProjectResponseDtos = all.getContent().stream().map(requestProject -> new RequestProjectResponseDto(requestProject)).collect(Collectors.toList());
        int totalPages = all.getTotalPages();
        return new RequestProjectsWithPaginationDto(requestProjectResponseDtos, totalPages);
    }
}