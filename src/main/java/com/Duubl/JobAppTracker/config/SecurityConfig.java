package com.Duubl.JobAppTracker.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.Duubl.JobAppTracker.services.CustomUserDetailsService;

@EnableWebSecurity
@Configuration
public class SecurityConfig {
    
    private final CustomUserDetailsService userDetailsService;
    
    @Autowired
    public SecurityConfig(CustomUserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }
    
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
		.csrf().disable()
		.cors().and()
			.authorizeHttpRequests((authorize) -> authorize
				.requestMatchers("/api/login").permitAll()
				.requestMatchers("/api/auth/status").permitAll()
				.requestMatchers("/api/job-applications/**").authenticated()
				.anyRequest().authenticated()
			)
			.userDetailsService(userDetailsService)
			.formLogin(form -> form
				.loginProcessingUrl("/api/login")
				.successHandler((request, response, authentication) -> {
					response.setStatus(200);
					response.getWriter().write("{\"message\": \"Login successful\", \"username\": \"" + authentication.getName() + "\"}");
				})
				.failureHandler((request, response, exception) -> {
					response.setStatus(401);
					response.getWriter().write("{\"message\": \"Invalid username or password\"}");
				})
				.permitAll()
				)
				.logout(logout -> logout
					.logoutUrl("/api/logout")
					.logoutSuccessHandler((request, response, authentication) -> {
						response.setStatus(200);
						response.getWriter().write("{\"message\": \"Logout successful\"}");
					})
				);
		return http.build();
	}

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:3000"); // React dev server
        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
