package de.fhac.lsicc.chatservice.controller;

import de.fhac.lsicc.chatservice.config.JwtTokenService;
import de.fhac.lsicc.chatservice.dto.CreateChatDTO;
import de.fhac.lsicc.chatservice.model.Chat;
import de.fhac.lsicc.chatservice.model.ChatParticipant;
import de.fhac.lsicc.chatservice.repsitories.ChatParticipantRepository;
import de.fhac.lsicc.chatservice.repsitories.ChatRepository;
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
        JwtTokenService.TokenDetails underlyingPrincipal = (JwtTokenService.TokenDetails)
                ((UsernamePasswordAuthenticationToken) principal).getPrincipal();
        int uid = underlyingPrincipal.uid();
        List<ChatParticipant> participations = chatParticipantRepo.findByUserId(uid);
        List<Integer> chatIds = participations.stream().map(ChatParticipant::getChatId).toList();
        return ResponseEntity.ok(chatIds);
    }
    
    @PostMapping
    public ResponseEntity<CreateChatDTO> createChat(@RequestBody CreateChatDTO dto, Principal principal){
        JwtTokenService.TokenDetails underlyingPrincipal = (JwtTokenService.TokenDetails)
                ((UsernamePasswordAuthenticationToken) principal).getPrincipal();
        // Make sure creator is in the list of participants
        int uid = underlyingPrincipal.uid();
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
            chatParticipant.setChatId(chat.getId());
            chatParticipant.setUserId(participant);
        }
        
        return ResponseEntity.ok(new CreateChatDTO(dto.chatName(),chat.getId(), participants));
    }
    
}
