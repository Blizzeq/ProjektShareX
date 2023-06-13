package com.example.backend.exception;

public class TaskNotFoundException extends RuntimeException {
    public TaskNotFoundException(Long taskId) {
        super("Could not found the task with id "+ taskId);
    }
}
