package com.example.demo.service;

import com.example.demo.dto.ProductRequest;
import com.example.demo.dto.ProductResponse;
import com.example.demo.dto.ProductPageCache;
import com.example.demo.entity.Product;
import com.example.demo.exception.NotFoundException;
import com.example.demo.repository.ProductRepository;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final CacheManager cacheManager;

    public ProductService(ProductRepository productRepository, CacheManager cacheManager) {
        this.productRepository = productRepository;
        this.cacheManager = cacheManager;
    }

    @Transactional(readOnly = true)
    public Page<ProductResponse> getProducts(int page, int size, String keyword) {
        String cacheKey = page + ":" + size + ":" + keyword;
        Cache cache = cacheManager.getCache("products:list");
        if (cache != null) {
            try {
                ProductPageCache cached = cache.get(cacheKey, ProductPageCache.class);
                if (cached != null) {
                    Pageable cachedPageable = PageRequest.of(cached.page(), cached.size(), Sort.by("id").descending());
                    return new PageImpl<>(cached.content(), cachedPageable, cached.totalElements());
                }
            } catch (RuntimeException ex) {
                // Evict incompatible legacy cache value (e.g. previously cached PageImpl payload).
                cache.evict(cacheKey);
            }
        }

        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        Specification<Product> spec = (root, query, cb) -> {
            if (!StringUtils.hasText(keyword)) {
                return cb.conjunction();
            }
            String likeKeyword = "%" + keyword.toLowerCase() + "%";
            return cb.or(
                    cb.like(cb.lower(root.get("name")), likeKeyword),
                    cb.like(cb.lower(root.get("description")), likeKeyword)
            );
        };
        Page<ProductResponse> result = productRepository.findAll(spec, pageable).map(this::toResponse);
        if (cache != null) {
            cache.put(cacheKey, new ProductPageCache(result.getContent(), result.getNumber(), result.getSize(), result.getTotalElements()));
        }
        return result;
    }

    @Transactional(readOnly = true)
    public ProductResponse getById(Long id) {
        return toResponse(loadProduct(id));
    }

    @Transactional
    @CacheEvict(value = "products:list", allEntries = true)
    public ProductResponse create(ProductRequest request) {
        Product product = new Product();
        apply(product, request);
        return toResponse(productRepository.save(product));
    }

    @Transactional
    @CacheEvict(value = "products:list", allEntries = true)
    public ProductResponse update(Long id, ProductRequest request) {
        Product product = loadProduct(id);
        apply(product, request);
        return toResponse(productRepository.save(product));
    }

    @Transactional
    @CacheEvict(value = "products:list", allEntries = true)
    public void delete(Long id) {
        Product product = loadProduct(id);
        productRepository.delete(product);
    }

    private Product loadProduct(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new NotFoundException("Product not found: " + id));
    }

    private void apply(Product product, ProductRequest request) {
        product.setName(request.name());
        product.setDescription(request.description());
        product.setPrice(request.price());
        product.setInventory(request.inventory());
    }

    private ProductResponse toResponse(Product product) {
        return new ProductResponse(product.getId(), product.getName(), product.getDescription(), product.getPrice(), product.getInventory());
    }
}
