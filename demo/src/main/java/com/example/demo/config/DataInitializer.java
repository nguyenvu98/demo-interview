package com.example.demo.config;

import com.example.demo.entity.Product;
import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.util.List;

@Configuration
public class DataInitializer {
    @Bean
    CommandLineRunner seedData(UserRepository userRepository, ProductRepository productRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (!userRepository.existsByUsername("admin")) {
                User admin = new User();
                admin.setUsername("admin");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setRole(Role.ADMIN);
                userRepository.save(admin);
            }

            if (!userRepository.existsByUsername("user")) {
                User user = new User();
                user.setUsername("user");
                user.setPassword(passwordEncoder.encode("user123"));
                user.setRole(Role.USER);
                userRepository.save(user);
            }

            if (productRepository.count() == 0) {
                Product p1 = new Product();
                p1.setName("Laptop Pro");
                p1.setDescription("High performance laptop");
                p1.setPrice(new BigDecimal("1200.00"));
                p1.setInventory(10);

                Product p2 = new Product();
                p2.setName("Wireless Mouse");
                p2.setDescription("Ergonomic bluetooth mouse");
                p2.setPrice(new BigDecimal("25.00"));
                p2.setInventory(50);

                Product p3 = new Product();
                p3.setName("Mechanical Keyboard");
                p3.setDescription("RGB mechanical keyboard");
                p3.setPrice(new BigDecimal("80.00"));
                p3.setInventory(30);

                productRepository.saveAll(List.of(p1, p2, p3));
            }
        };
    }
}
