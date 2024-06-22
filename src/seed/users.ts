enum UserRoles {
    ADMIN = "ADMIN",
    CUSTOMER = "CUSTOMER",
    EMPLOYEE = "EMPLOYEE",
    SUPER_USER = "SUPER_USER",
}

export interface SeedUser {
    full_name: string;
    email: string;
    password: string;
    is_active: boolean;
    role: UserRoles;
}

export const seedUsers: SeedUser[] = [
    { full_name: "John Smith", email: "john.smith@example.com", password: "password123", is_active: true, role: UserRoles.ADMIN },
    { full_name: "Jane Johnson", email: "jane.johnson@example.com", password: "password123", is_active: true, role: UserRoles.CUSTOMER },
    { full_name: "Alex Williams", email: "alex.williams@example.com", password: "password123", is_active: true, role: UserRoles.EMPLOYEE },
    { full_name: "Emily Jones", email: "emily.jones@example.com", password: "password123", is_active: true, role: UserRoles.SUPER_USER },
    { full_name: "Chris Brown", email: "chris.brown@example.com", password: "password123", is_active: false, role: UserRoles.ADMIN },
    { full_name: "Katie Davis", email: "katie.davis@example.com", password: "password123", is_active: true, role: UserRoles.CUSTOMER },
    { full_name: "Michael Miller", email: "michael.miller@example.com", password: "password123", is_active: true, role: UserRoles.EMPLOYEE },
    { full_name: "Laura Wilson", email: "laura.wilson@example.com", password: "password123", is_active: false, role: UserRoles.SUPER_USER },
    { full_name: "David Moore", email: "david.moore@example.com", password: "password123", is_active: true, role: UserRoles.ADMIN },
    { full_name: "Sarah Taylor", email: "sarah.taylor@example.com", password: "password123", is_active: true, role: UserRoles.CUSTOMER },
    // ... (añade los restantes 90 usuarios de manera similar)
];