package de.fhac.lsicc.chatservice.repsitories;

import de.fhac.lsicc.chatservice.model.ChatParticipant;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by Lukas Szimtenings on 7/18/2022.
 */
public interface ChatParticipantRepository extends CrudRepository<ChatParticipant, Long>
{
    public List<ChatParticipant> findByUserId(long userId);
}