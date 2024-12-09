package at.htlleonding.instaff.features.employee;

import at.htlleonding.instaff.features.role.Role;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
public class EmployeeRepository implements PanacheRepository<Employee> {
    @Inject
    EntityManager entityManager;

    public List<Employee> findByRoleId(Long role) {
        return find("role", role).stream().toList();
    }

    public List<Employee> findByRoleName(String roleName) {
        String sql = "SELECT e.* " +
                "FROM Employee e " +
                "JOIN employee_role er ON e.id = er.employee_id " +
                "JOIN Role r ON er.roles_id = r.id " +
                "WHERE LOWER(r.rolename) LIKE LOWER(?1)";

        Query query = entityManager.createNativeQuery(sql, Employee.class);
        query.setParameter(1, "%" + roleName + "%");

        return query.getResultList();
    }

    @Transactional
    public void addRole(Long employeeId, Long roleId) {
        // Find the Employee entity by ID
        Employee employee = findById(employeeId);
        if (employee == null) {
            throw new IllegalArgumentException("Employee with ID " + employeeId + " does not exist.");
        }

        // Find the Role entity by ID
        Role role = entityManager.find(Role.class, roleId);
        if (role == null) {
            throw new IllegalArgumentException("Role with ID " + roleId + " does not exist.");
        }

        // Check if the role is already assigned to the employee
        if (employee.getRoles().contains(role)) {
            throw new IllegalStateException("Role with ID " + roleId + " is already assigned to Employee with ID " + employeeId);
        }

        // Add the role to the employee's roles collection
        employee.getRoles().add(role);

        // Persist the updated employee entity
        persist(employee);
    }

}