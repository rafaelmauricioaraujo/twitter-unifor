import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TweetService } from "../tweet.service";
import { UsuarioService } from "../usuario.service";
import { Usuario } from '../Usuario';
import { Tweets } from '../mock-tweets';
import { Tweet } from "../tweet";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  id: number;
  tweet: Tweet;
  rForm: FormGroup;
  url = '';
  pefurl = '';
  usuarios: Usuario[];
  ativo: boolean;
  constructor(private fb: FormBuilder, private tweetService: TweetService, private usuarioService: UsuarioService, private route: ActivatedRoute) {
    this.rForm = fb.group({
      'usuario': [null, Validators.required],
      'description': [null, Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(500)])],
      'ativo': [false, Validators.requiredTrue]
    })
  }

  ngOnInit() {
    this.usuarioService.getUsers().subscribe(usuarios => this.usuarios = usuarios);
    this.getTweet();
    if (this.id) {
      this.rForm.get('ativo').setValue(true);
    }
  }


  addPost(post) {
    post.url = this.url;

    let nome = post.usuario.nome;
    let fotourl = post.usuario.fotoUrl;
    post.name = nome;
    post.pefurl = fotourl;


    if (this.url) {
      this.tweet.url = this.url;

    }
    if (this.id) {

      this.tweet.name = nome;
      this.tweet.description = post.description;
      this.tweet.ativo = post.ativo;
      this.tweet.pefurl = fotourl;
      this.tweetService.updateTweet(this.tweet).subscribe();
    } else {
      post.id = Math.round(Math.random() * 100) + 4;
      this.tweetService.addTweet(post).subscribe();
    }
    this.rForm.reset('');
    this.url = '';
  }

  getTweet(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.tweetService.getTweet(this.id)
      .subscribe(tweet => this.tweet = tweet);

  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }
  save(): void {
    this.tweetService.updateTweet(this.tweet)
      .subscribe();

  }
}
