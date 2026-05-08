package com.example.demo.dto;

import java.io.Serializable;
import java.util.List;

public record ProductPageCache(
        List<ProductResponse> content,
        int page,
        int size,
        long totalElements
) implements Serializable {
}
