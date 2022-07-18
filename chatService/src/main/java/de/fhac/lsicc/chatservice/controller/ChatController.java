package de.fhac.lsicc.chatservice.controller;

import de.fhac.lsicc.chatservice.config.JwtTokenService;
import de.fhac.lsicc.chatservice.dto.ChatDTO;
import de.fhac.lsicc.chatservice.model.Chat;
import de.fhac.lsicc.chatservice.model.ChatParticipant;
import de.fhac.lsicc.chatservice.repsitories.ChatParticipantRepository;
import de.fhac.lsicc.chatservice.repsitories.ChatRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

/**
 * Created by Lukas Szimtenings on 7/18/2022.
 */
@RestController
@RequestMapping("/chat")
public class ChatController
{
    private final ChatRepository chatRepo;
    private final ChatParticipantRepository chatParticipantRepo;
    
    public ChatController(ChatRepository chatRepo, ChatParticipantRepository chatParticipantRepo){
        this.chatRepo = chatRepo;
        this.chatParticipantRepo = chatParticipantRepo;
    }
    
    @GetMapping
    public ResponseEntity<List<Integer>> getAllUserChats(Principal principal){
        int uid = getPrincipalId(principal);
        
        List<ChatParticipant> participations = chatParticipantRepo.findByUserId(uid);
        List<Integer> chatIds = participations.stream().map(chatParticipant -> chatParticipant.getChat().getId())
                .toList();
        
        return ResponseEntity.ok(chatIds);
    }
    
    @PostMapping
    public ResponseEntity<ChatDTO> createChat(@RequestBody ChatDTO dto, Principal principal){
        int uid = getPrincipalId(principal);
        // Make sure creator is in the list of participants
        if(!dto.participants().contains(uid)){
            dto.participants().add(uid);
        }
        
        // Remove duplicate participants
        List<Integer> participants = new ArrayList<>(new HashSet<>(dto.participants()));
        
        // Create chat
        Chat chat = new Chat();
        chat.setChatName(dto.chatName());
        chat = chatRepo.save(chat);
        
        // Create chat participants
        for (Integer participant : participants) {
            ChatParticipant chatParticipant = new ChatParticipant();
            chatParticipant.setChat(chat);
            chatParticipant.setUserId(participant);
            chatParticipantRepo.save(chatParticipant);
        }
        
        return ResponseEntity.ok(new ChatDTO(dto.chatName(),chat.getId(), participants));
    }
    
    private int getPrincipalId(Principal principal)
    {
        JwtTokenService.TokenDetails underlyingPrincipal = (JwtTokenService.TokenDetails)
                ((UsernamePasswordAuthenticationToken)principal).getPrincipal();
        return underlyingPrincipal.uid();
    }
}
