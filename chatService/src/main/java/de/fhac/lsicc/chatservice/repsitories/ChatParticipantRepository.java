package de.fhac.lsicc.chatservice.repsitories;

import de.fhac.lsicc.chatservice.model.ChatParticipant;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by Lukas Szimtenings on 7/18/2022.
 */
public interface ChatParticipantRepository extends CrudRepository<ChatParticipant, Integer>
{
}