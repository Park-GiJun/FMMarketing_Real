# FM Marketing Platform

A marketing platform that connects administrators, stores, and bloggers. The platform facilitates a campaign-based system that enables efficient collaboration between all parties.

## Project Structure

### Backend (Spring Boot)

The backend follows a modular structure organized by domain:

```
backend/
├── src/main/java/com/gijun/backend/
│   ├── admin/         # Admin-specific functionality
│   ├── application/   # Application (blogger submissions) domain
│   ├── blogger/       # Blogger-specific functionality
│   ├── common/        # Shared components, security, utilities
│   ├── store/         # Store-specific functionality
│   └── BackendApplication.java
```

### Frontend (React + Vite)

The frontend is implemented using React with Vite as the build tool:

```
fm_marketing/
├── public/
├── src/
│   ├── assets/        # Static assets
│   ├── components/    # Reusable components 
│   │   ├── common/    # Shared components
│   │   ├── pc/        # Desktop-specific components
│   │   └── mobile/    # Mobile-specific components
│   ├── layouts/       # Page layouts (PC/Mobile)
│   ├── pages/         # Page components
│   │   ├── admin/     # Admin pages
│   │   ├── blogger/   # Blogger pages
│   │   ├── common/    # Common pages (login, error)
│   │   ├── pc/        # PC-specific pages
│   │   ├── store/     # Store pages
│   │   └── mobile/    # Mobile-specific pages
│   ├── routes/        # Routing configuration
│   ├── stores/        # Zustand state management
│   ├── styles/        # Global styles
│   ├── utils/         # Utility functions
│   ├── App.jsx        # Main App component
│   ├── main.jsx       # Application entry point
│   └── ...
├── vite.config.js
└── ...
```

## Core Business Logic

### User Roles

1. **Administrator**
   - Create and manage campaigns for stores
   - Review and approve blogger applications
   - Manage the platform and users

2. **Store**
   - View campaigns related to their business
   - View reviews created by bloggers

3. **Blogger**
   - Browse available campaigns
   - Apply to participate in campaigns
   - Submit review URLs after visiting stores

### Workflow

1. Admins create campaigns for stores
2. Bloggers browse campaigns and apply to participate
3. Admins review blogger applications and approve suitable candidates
4. Approved bloggers visit stores and write reviews on their own blogs
5. Bloggers submit the review URLs to the platform
6. Stores can view these reviews

## Technology Stack

- Backend: Spring Boot, Spring Security, JPA/Hibernate, MySQL
- Frontend: React, React Router, Zustand, TailwindCSS
- Authentication: JWT-based
- Build Tools: Gradle (backend), Vite (frontend)

## Configuration Management

The application uses environment-specific configuration files:

1. **application.yml**: Common settings for all environments
2. **application-local.yml**: Local development environment settings
3. **application-dev.yml**: Development server environment settings
4. **application-test.yml**: Testing environment settings
5. **application-prod.yml**: Production environment settings

To activate a specific profile, set the `spring.profiles.active` property. For example:

```
# Via command line
java -jar backend.jar --spring.profiles.active=dev

# Via environment variable
export SPRING_PROFILES_ACTIVE=prod
java -jar backend.jar
```

## Architecture Cleanup Notes

Several redundancies and potential conflicts have been cleaned up:

1. Consolidated multiple ID class implementations
2. Removed duplicate model entities
3. Consolidated repository interfaces
4. Addressed configuration duplications
5. Fixed service-layer redundancies

For any new development, always follow the established package structure and avoid creating duplicate implementations.

## Development Guidelines

1. Keep domain-specific code in its appropriate package
2. Use the common package for shared utilities only
3. Follow a proper layered architecture: controller -> service -> repository
4. Maintain proper authorization checks at both controller and service levels
5. Keep frontend state management clean using Zustand stores
