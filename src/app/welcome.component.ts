import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'welcome',
  template: `

    <section id="section01" class='page-container'>
    
      <app-header></app-header>
  
  
      <div class="title-container">
  
        <img src="assets/bohater2.png" height="200px">
        <img src="assets/bohater.png" height="300px">
        <img src="assets/bohater3.png" height="200px">
        
        <br>
        <form class="enter left" >
          <button routerLink='/rodzic-logowanie'>RODZIC</button>
        </form>
  
        <form class="enter right">
          <button routerLink='/dziecko-logowanie'>DZIECKO</button>
        </form>
  
      </div>
  
      <a href="#section02" class="scrolling"><span></span>Dowiedz się więcej</a>
    </section>
  
    <section id="section02" class="half-page-container">
    <p>Czy</p>
    <ul class="blue-square">
      <li>...masz dość ciągłego przypominania dzieciom o posprzątaniu zabawek, odrabianiu lekcji albo myciu zębów ?</li>
      <li>...chcesz by Twoje dziecko częściej pomagało Ci w pracach domowych ?</li>
    </ul>
  
    </section>	
  
    <section id="section03" class="half-page-container">
        <div class="logo-banner"><p>Bohater</p> <p class="font-skew">Tygodnia</p></div>
      
      <p class="move-down">to narzędzie które sprawi że:</p>
      <ul class="green-circle">
        <li>codzienne obowiązki przestaną być problemem,</li>
        <li>Twoje dziecko będzie bardziej samodzielne,</li>
        <li>a Ty zyskach więcej czasu dla siebie!</li>
      </ul>
  
    </section>	
  
    <section id="section04" class="page-container">
    
      <p class="move-all">Bohater Tygodnia motywuje Twoje dziecko na dwa sposoby:</p>
  
      <div class="logo-banner-point"><p>Dziecko wykonuje misje i zdobywa punkty za które odbiera wybrane przez Ciebie <span>nagrody</span></p> </div>
  
      <p> <img src="assets/gift.svg" class="img-float-right">
        Pamiętaj nagrody nie muszą być czymś materialnym - może być to wyjście na lody lub przekazanie pieniędzy na cel charytatywny
      </p>
      
      
      <div class="logo-banner-point logo-banner-point-right"><p>Po wykonaniu wszystkich misji w każdym tygodniu Dziecko zdobywa <span>odznakę Bohatera Tygodnia</span></p></div>
      
      <p> <img src="assets/bohater.png" class="img-float-left">Za odznakę dziecko ulepsza swojego wirtualnego Bohatera dodając mu nowe moce a Ty uczysz dziecko systematyczności!</p>
      
    </section>	
  
    <section id="section05" class="page-container">
        
  
      <p class="move-all">Wydaje Ci się że nie masz czasu albo pomysłu od czego zacząć? </p>
      <ul class="green-circle">
        <li>nasz <span>zespół ekspertów - doświadczonych psychologów</span> opracował gotowe plany zadań i nagród odpowiednie dla dziecka w Twoim wieku. Możesz je wykorzystać w całości albo się nimi zainspirować.</li>
        <li>strona jest <span>intuicyjna, prosta i darmowa,</span> dostosowana dla dzieci w różnym wieku, nawet dla najmłodszych nieumiejących czytać</li>
        <li>ani Ty ani Twoje dziecko nie spędzicie godzin na jej obsłudze - <span>naszą misją jest dać Ci więcej czasu a nie go zabrać!</span></li>
      </ul>
  
  
      <img src="assets/bohater2.png" height="200px">
      <img src="assets/bohater.png" height="300px">
      <img src="assets/bohater3.png" height="200px">
      
  
      <a href="#section01" class="scrolling scrolling-reverse"><span></span>Powrót do góry</a>
    </section>	
  `,
    styleUrls: ['../sass/welcome.scss']
 
})
export class WelcomeComponent implements OnInit {

  constructor(
    private renderer: Renderer2) { 
      this.renderer.addClass(document.body,'kid')
      this.renderer.addClass(document.body,'title-page')
    }
  
    ngOnInit(){}

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'kid');
    this.renderer.removeClass(document.body, 'title-page');
  }


}
