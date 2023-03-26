package com.example.backend.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Document(collection = "messages")
public class Messages {

    @Id
    private String id;

    @DBRef
    private Group group;
    @DBRef
    private User user;
    private String content;
    private LocalDateTime createdAt;
    private List<String> tags;
    @DBRef
    private List<FileInfo> fileInfoList;
    private Map<String, Integer> reactions;

    public Messages(Group group, User user, String content, LocalDateTime createdAt, List<String> tags, List<FileInfo> fileInfoList, Map<String, Integer> reactions) {
        this.group = group;
        this.user = user;
        this.content = content;
        this.createdAt = createdAt;
        this.tags = tags;
        this.fileInfoList = fileInfoList;
        this.reactions = reactions;
    }
}
