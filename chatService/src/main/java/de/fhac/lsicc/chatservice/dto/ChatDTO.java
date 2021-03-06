package de.fhac.lsicc.chatservice.dto;

import java.util.List;

/**
 * Created by Lukas Szimtenings on 7/18/2022.
 */
public record ChatDTO(String chatName, Long chatId, List<Long> participants) {
}