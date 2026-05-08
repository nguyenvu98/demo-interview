package com.example.demo.repository;

import com.example.demo.entity.Order;
import com.example.demo.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
    @EntityGraph(attributePaths = {"items", "items.product", "user"})
    Page<Order> findByUser(User user, Pageable pageable);

    @EntityGraph(attributePaths = {"items", "items.product", "user"})
    Page<Order> findAll(Pageable pageable);
}
