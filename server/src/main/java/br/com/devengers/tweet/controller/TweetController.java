package br.com.devengers.tweet.controller;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import br.com.devengers.tweet.model.Tweet;
import br.com.devengers.tweet.repository.TweetRepository;

@RestController
@RequestMapping("/tweets")
@CrossOrigin
public class TweetController {

	@Autowired
	private TweetRepository repository;

	@GetMapping
	public List<Tweet> findAll() {
		return repository.findAll();
	}

	@GetMapping(path = "/{id}")
	public Tweet getById(@PathVariable("id") Long id) {
		return repository.findById(id).orElse(null);
	}

	@PostMapping
	public ResponseEntity<Object> salvar(@RequestBody @Valid Tweet tweet) {

		Tweet tweetSalvo = repository.save(tweet);

		URI location = montarLocation(tweetSalvo);

		return ResponseEntity.created(location).build();
	}

	@PutMapping(path = "/{id}")
	public void atualizar(@RequestBody @Valid Tweet tweet) {
		repository.save(tweet);
	}

	@DeleteMapping(path = "/{id}")
	public void deletar(@PathVariable("id") Long id) {
		repository.deleteById(id);
	}

	@DeleteMapping()
	public void deletarTodos() {
		repository.deleteAll();
	}

	private URI montarLocation(Tweet tweet) {
		return ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(tweet.getId()).toUri();
	}

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public List<String> handleValidationExceptions(MethodArgumentNotValidException ex) {
		return ex.getBindingResult().getAllErrors().stream().map(ObjectError::getDefaultMessage)
				.collect(Collectors.toList());
	}

}
