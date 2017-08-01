package br.com.seriesapp.ws.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.com.seriesapp.ws.model.Client;
import br.com.seriesapp.ws.service.ClientService;

@RestController
public class LoginController {
		
	@Autowired
	private ClientService clientService;
	
	@RequestMapping(method = RequestMethod.POST, value = "/clients/authenticate",
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Client> authenticate(@RequestBody Client client) {
		return new ResponseEntity<>(this.clientService.authenticateClient(client), HttpStatus.OK);
	}
	
}
