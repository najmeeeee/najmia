package com.marian.project.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;



@Configuration
public class SecurityConfig implements WebMvcConfigurer {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();  // To hash passwords
    }

    /**
     * Configures CORS mappings globally.
     * Adjusts allowed origins dynamically via environment variables or defaults to localhost.
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(System.getenv("FRONTEND_URL") != null 
                        ? System.getenv("FRONTEND_URL") 
                        : "http://localhost:3000") // Default to localhost if env variable isn't set
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                .allowedHeaders("*") // Allow all headers
                .allowCredentials(true); // Enable credentials
    }

    /**
     * Configures HTTP security settings.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable()) // Disable CSRF for simplicity, but reconsider in production
            .cors(cors -> cors.disable()) // CORS configuration is handled separately
            .authorizeHttpRequests(auth -> auth
                // Public endpoints
                .requestMatchers(
                    "/api/users/register", 
                    "/api/users/count/**",
                    "/api/users/login", 
                    "/api/users/all",
                    "/api/admin/events/**",
                    "/api/event-registrations/**",
                    "/api/notifications/**",
                    "/api/password/request-reset/**", // Public access for password reset requests
                    "/api/password/reset/**",         // Public access to reset password
                    "/api/password/validate-token/**" // Public access to validate tokens
                ).permitAll()

                // Restricted endpoints
                .requestMatchers("/api/admin/**").hasRole("ADMIN") // Admin-only endpoints
                .requestMatchers("/api/password/change-password").authenticated() // Authenticated users only
                
                // All other endpoints
                .anyRequest().authenticated() // Authentication required for all other endpoints
            );
        return http.build();
    }
}
