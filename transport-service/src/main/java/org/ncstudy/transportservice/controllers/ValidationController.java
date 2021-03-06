package org.ncstudy.transportservice.controllers;

import org.ncstudy.transportservice.model.Validation;
import org.ncstudy.transportservice.services.ValidationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "api/v1/data")
public class ValidationController {
    private static final Logger logger = LoggerFactory.getLogger(ValidationController.class);

    @Autowired
    private ValidationService validationService;

    @RequestMapping(value = "/validation", method = RequestMethod.GET)
    public List<Validation> getAllValidations() {
        logger.debug("Looking up data for validations...");
        List<Validation> list = validationService.getAllValidations();
        logger.debug("Found {} validation entries.", list.size());
        return list;
    }

    @RequestMapping(value = "/validation", method = RequestMethod.POST)
    public void saveValidation(@RequestBody Validation validation) {
        validationService.saveValidation(validation);
    }

    @RequestMapping(value = "/validation", method = RequestMethod.PUT)
    public void updateValidation(@RequestBody Validation validation) {
        validationService.updateValidation(validation);

    }

    @RequestMapping(value = "/validation/{validation_id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteValidation(@PathVariable("validation_id") int bus_stop_id) {
        validationService.deleteValidation(bus_stop_id);
    }

    @GetMapping("/validation/user")
    public List<Map> getAllUsersValidations(Principal card) {
        return validationService.getAllValidationsByCardId(card.getName());
    }

}
