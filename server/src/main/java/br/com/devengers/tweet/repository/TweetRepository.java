package br.com.devengers.tweet.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.devengers.tweet.model.Tweet;

@Repository
public interface TweetRepository extends JpaRepository<Tweet,Long>{

}