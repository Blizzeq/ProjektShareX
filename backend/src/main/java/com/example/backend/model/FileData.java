package com.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.minidev.json.annotate.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "files")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FileData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String type;

    @Lob
    @Column(name = "file_data", columnDefinition = "longblob")
    private byte[] fileData;

    private Long uploadBy;

    @JsonIgnore
    @ManyToMany
    @JoinTable(name = "files_assign_task", joinColumns = @JoinColumn(name = "file_id"), inverseJoinColumns = @JoinColumn(name = "task_id"))
    private Set<Task> assignedTasksFile  = new HashSet<>();

}
