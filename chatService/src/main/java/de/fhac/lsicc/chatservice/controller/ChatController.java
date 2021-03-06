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
import java.util.Collection;
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
    public ResponseEntity<List<Long>> getAllUserChats(Principal principal){
        long uid = getPrincipalId(principal);
        
        List<ChatParticipant> participations = chatParticipantRepo.findByUserId(uid);
        List<Long> chatIds = participations.stream().map(chatParticipant -> chatParticipant.getChat().getId())
                .toList();
        
        return ResponseEntity.ok(chatIds);
    }
    
    @PostMapping
    public ResponseEntity<ChatDTO> createChat(@RequestBody ChatDTO dto, Principal principal){
        long uid = getPrincipalId(principal);
        // Make sure creator is in the list of participants
        if(!dto.participants().contains(uid)){
            dto.participants().add(uid);
        }
        
        // Remove duplicate participants
        List<Long> participants = new ArrayList<>(new HashSet<>(dto.participants()));
        
        // Create chat
        Chat chat = new Chat();
        chat.setChatName(dto.chatName());
        chat = chatRepo.save(chat);
        
        // Create chat participants
        for (long participant_id : participants) {
            ChatParticipant chatParticipant = new ChatParticipant();
            chatParticipant.setChat(chat);
            chatParticipant.setUserId(participant_id);
            chatParticipantRepo.save(chatParticipant);
        }
        
        return ResponseEntity.ok(new ChatDTO(dto.chatName(),chat.getId(), participants));
    }
    
    @GetMapping("/{chatId}")
    public ResponseEntity<ChatDTO> getChatById(@PathVariable long chatId, Principal principal){
        long uid = getPrincipalId(principal);
        
        Chat chat = chatRepo.findById(chatId).orElse(null);
        if(chat == null){
            return ResponseEntity.notFound().build();
        }
        
        List<Long> participants = chat.getChatParticipants().stream()
                .map(ChatParticipant::getUserId)
                .toList();
        
        if(!participants.contains(uid)){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        
        return ResponseEntity.ok(new ChatDTO(chat.getChatName(), chat.getId(), participants));
    }
    
    private long getPrincipalId(Principal principal)
    {
        JwtTokenService.TokenDetails underlyingPrincipal = (JwtTokenService.TokenDetails)
                ((UsernamePasswordAuthenticationToken)principal).getPrincipal();
        return underlyingPrincipal.uid();
    }
    
    @DeleteMapping("/{chatId}")
    public ResponseEntity<ChatDTO> deleteChatById(@PathVariable long chatId, Principal principal){
        long uid = getPrincipalId(principal);
        
        Chat chat = chatRepo.findById(chatId).orElse(null);
        if(chat == null){
            return ResponseEntity.notFound().build();
        }
    
        Collection<ChatParticipant> participants = chat.getChatParticipants();
        List<Long> participant_ids = participants.stream()
                .map(ChatParticipant::getUserId)
                .toList();
        
        if(!participant_ids.contains(uid))
        {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        chatParticipantRepo.deleteAll(participants);
        chatRepo.delete(chat);
        return ResponseEntity.ok(new ChatDTO(chat.getChatName(), chat.getId(), participant_ids));
    }
}
