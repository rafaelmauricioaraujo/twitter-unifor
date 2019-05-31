package br.com.devengers.tweet.model;

import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name="TWEET")
public class Tweet {
	
	@Id
	@Column(nullable = false, name="ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "TEXTO")
	private String texto;
	
	@Column(name = "USUARIO")
	private String usuario;

	
	public Long getId() {
		return this.id;
	}

	public String getTexto() {
		return texto;
	}

	public String getUsuario() {
		return usuario;
	}	

}