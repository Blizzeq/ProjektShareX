package com.example.backend.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Document(collection = "avatars")
public class AvatarFile {

    @Id
    private String id;

    @Field(targetType = FieldType.BINARY)
    private byte[] data;
    private String fileName;
    private String contentType;

    public AvatarFile(byte[] data, String fileName, String contentType) {
        this.data = data;
        this.fileName = fileName;
        this.contentType = contentType;
    }
}
