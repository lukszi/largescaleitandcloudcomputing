package de.fhac.lsicc.chatservice.repsitories;

import de.fhac.lsicc.chatservice.model.Chat;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by Lukas Szimtenings on 7/18/2022.
 */
public interface ChatRepository extends CrudRepository<Chat, Long>
{
}
