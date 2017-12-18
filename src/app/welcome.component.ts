import { Component, OnInit, Renderer2 } from '@angular/core';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'welcome',
  template: `

    <section id="section01" class='page-container'>
    
      <app-header [simpleH1]="'Bohater'" [skewH1]="'Tygodnia'"></app-header> 

      <div class="title-container">
          <button class="enter parent" routerLink='/rodzic'>RODZIC</button>
          <div class="avatar-images">
            <img src="assets/bohater2.png" width="25%">
            <img src="assets/bohater.png" width="30%">
            <img src="assets/bohater3.png" width="25%">
          </div>
          <button class="enter kid" routerLink='/dziecko'>DZIECKO</button>
      </div>
  
      <a (click)="goTo('section02')" class="scrolling"><span></span>Dowiedz się więcej</a>
    </section>
  
    <section id="section02">
      <p>Czy</p>
      <ul class="blue-square">
        <li>...masz dość ciągłego przypominania dzieciom o posprzątaniu zabawek, odrabianiu lekcji albo myciu zębów ?</li>
        <li>...chcesz by Twoje dziecko częściej pomagało Ci w pracach domowych ?</li>
      </ul>
    </section>	

    <div class="logo-banner"><img src="assets/logo.png"><p>Bohater</p> <p class="font-skew">Tygodnia</p></div>
    
    <section id="section03">
        
        <p>to narzędzie które sprawi że:</p>
        <ul class="green-circle">
          <li>codzienne obowiązki przestaną być problemem,</li>
          <li>Twoje dziecko będzie bardziej samodzielne,</li>
          <li>a Ty zyskach więcej czasu dla siebie!</li>
        </ul>
    </section>	
  
    <section id="section04">
    
      <p>Bohater Tygodnia motywuje Twoje dziecko na dwa sposoby:</p>
      <div class="logo-banner-point"><p>Dziecko wykonuje misje i zdobywa punkty za które odbiera wybrane przez Ciebie <span>nagrody</span><img src="assets/gift.svg" class="img-float-right"></p> </div>
        <p> 
        Pamiętaj nagrody nie muszą być czymś materialnym - może być to wyjście na lody lub przekazanie pieniędzy na cel charytatywny
        </p>
            
      <div class="logo-banner-point logo-banner-point-right"><p>Po wykonaniu wszystkich misji w każdym tygodniu Dziecko zdobywa <img src="assets/bohater.png" class="img-float-left"> <span>odznakę Bohatera Tygodnia</span></p></div>   
      <p> Za odznakę dziecko ulepsza swojego wirtualnego Bohatera dodając mu nowe moce a Ty uczysz dziecko systematyczności!</p>
      
    </section>	
  
    <section id="section05">
        
  
      <p class="move-all">Wydaje Ci się że nie masz czasu albo pomysłu od czego zacząć? </p>
      <ul class="green-circle">
        <li>nasz <span>zespół ekspertów - doświadczonych psychologów</span> opracował gotowe plany zadań i nagród odpowiednie dla dziecka w Twoim wieku. Możesz je wykorzystać w całości albo się nimi zainspirować.</li>
        <li>strona jest <span>intuicyjna, prosta i darmowa,</span> dostosowana dla dzieci w różnym wieku, nawet dla najmłodszych nieumiejących czytać</li>
        <li>ani Ty ani Twoje dziecko nie spędzicie godzin na jej obsłudze - <span>naszą misją jest dać Ci więcej czasu a nie go zabrać!</span></li>
      </ul>
  
  
      <img src="assets/bohater2.png" height="200px">
      <img src="assets/bohater.png" height="300px">
      <img src="assets/bohater3.png" height="200px">
      
  
      <a (click)="goTo('section01')" class="scrolling scrolling-reverse"><span></span>Powrót do góry</a>
    </section>	
  `,
    styleUrls: ['../sass/welcome.scss']
 
})
export class WelcomeComponent implements OnInit {

  constructor(
    private service: FirebaseService, 
    private renderer: Renderer2) { 
      this.renderer.addClass(document.body,'kid')
      this.renderer.addClass(document.body,'title-page')
    }
  
  

    ngOnInit(){
      this.service.getKids().subscribe( kids => {
        console.log(kids)
      })
      this.service.getUserMissions('RrsKnBvXZ8qft0O0FMtv').subscribe( userMissions => {
          console.log(userMissions)
      })

      
    }
    

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'kid');
    this.renderer.removeClass(document.body, 'title-page');
  }

  goTo(location: string): void {
    window.location.hash = location;
}

}
