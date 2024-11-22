package at.htlleonding.instaff.features.role;

import at.htlleonding.instaff.features.employee.Employee;
import at.htlleonding.instaff.features.employee.EmployeeDTO;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.LinkedList;
import java.util.List;

@Path("/roles")
@Produces(MediaType.APPLICATION_JSON)
public class RoleResource {
    @Inject
    RoleRepository roleRepository;
    @Inject
    RoleMapper roleMapper;

    @GET
    public List<RoleDTO> all() {
        var roles = roleRepository.listAll();
        return roles
                .stream()
                .map(roleMapper::toResource)
                .toList();
    }

    @GET
    @Path("{id}")
    public Response getEmployeeById(@PathParam("id") Long id) {
        var role = roleRepository.findById(id);
        if (role == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        RoleDTO roleDTO = roleMapper.toResource(role);
        return Response.ok(roleDTO).build();
    }

    @GET
    @Path("company/{company}")
    public List<RoleDTO> getRoleByCompany(@PathParam("company") Long companyId) {
        var roles = roleRepository.listAll();
        if (roles == null) {
            return null;
        }
        List<Role> rolesWithCompany = new LinkedList<Role>();
        for (Role role : roles) {
            if (role.getCompany().getId().equals(companyId)) {
                rolesWithCompany.add(role);
            }
        }
        return rolesWithCompany
                .stream()
                .map(roleMapper::toResource)
                .toList();
    }
}