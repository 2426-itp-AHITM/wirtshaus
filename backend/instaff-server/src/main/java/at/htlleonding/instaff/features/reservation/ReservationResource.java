package at.htlleonding.instaff.features.reservation;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/reservations")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ReservationResource {
    @Inject
    ReservationRepository reservationRepository;
    @Inject
    ReservationMapper reservationMapper;

    @GET
    public List<ReservationDTO> all() {
        var reservations = reservationRepository.findAll();
        return reservations
                .stream()
                .map(reservationMapper::toResource)
                .toList();
    }

    @GET
    @Path("/{id}")
    public Response getById(@PathParam("id") Long id) {
        return Response.ok(reservationMapper.toResource(reservationRepository.findById(id))).build();
    }

    @POST
    @Transactional
    public Response create(ReservationCreateDTO dto) {
        Reservation reservation = reservationRepository.create(dto);
        return Response.status(Response.Status.CREATED).entity(reservationMapper.toResource(reservation)).build();
    }

}
