package org.ncstudy.transportservice.controllers;


import org.ncstudy.transportservice.model.Card;
import org.ncstudy.transportservice.services.CardService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="api/v1/data")
public class CardController {
    private static final Logger logger = LoggerFactory.getLogger(CardController.class);

    @Autowired
    private CardService cardService;

    @RequestMapping(value="/card",method = RequestMethod.GET)
    public List<Card> getAllCards() {
        logger.debug("Looking up data for cards...");
        List<Card> list = cardService.getAllCards();
        logger.debug("Found {} cards entries.", list.size());
        return list;
    }


    @RequestMapping(value="/card",method = RequestMethod.POST)
    public void saveCard(@RequestBody Card card) {
        cardService.saveCard(card);
    }

    @RequestMapping(value="/card",method = RequestMethod.PUT)
    public void updateCard(@RequestBody Card card) {
        cardService.updateCard(card);

    }

    @RequestMapping(value="/card/{card_id}",method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCard( @PathVariable("card_id") int card_id) {
        cardService.deleteCard( card_id );
    }
}
