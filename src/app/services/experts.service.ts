import { Injectable} from '@angular/core';

@Injectable()
export class ExpertsService {

  constructor() { }  

getExpertMissions(){
  return this.expertMissions
}

getOneExpertMission(missionId){
  return this.expertMissions.find(x => x.id == missionId)   
}
  
getExpertGifts(){
  return this.expertGifts
}
  
getOneExpertGift(giftId){
  return this.expertGifts.find(x => x.id == giftId)
}
  
getExpertHeroes(gender){
  return this.expertHeroes.filter( x=> x.gender == gender)
}
  
getOneExpertHero(heroId){
  return this.expertHeroes.find (x => x.id == heroId)
}

getHeroImage(heroId){
  return this.expertHeroes.find(x=>x.id == heroId)['image']
}

getHeroPowers(heroId,badges){
  let hero = this.expertHeroes.find(x=>x.id==heroId)
  let powers= hero.powers

  badges.forEach((badge,index) => {
    if (badge == true){
      let gained = hero.badges[index].gained
      powers = powers.map(function(x,i){return  x + gained[i]})
    }
  })

  return powers
}

  
expertMissions = [ 
  {      id: 1,      name: "Zęby rano",               icon: "assets/ikony/m_zeby.svg"     },    
  {      id: 2,      name: "Zęby wieczór",            icon: "assets/ikony/m_zeby.svg"     },    
  {      id: 3,      name: "Posprzątać pokój",        icon: "assets/room.svg"             },    
  {      id: 4,      name: "Poskładać zabawki",       icon: "assets/ikony/m_zabawki.svg"  },    
  {      id: 5,      name: "Opróżnić zmywarkę",       icon: "assets/ikony/m_zmywarka.svg" },    
  {      id: 6,      name: "Wstawić pranie",          icon: "assets/ikony/m_pranie.svg"   },    
  {      id: 7,      name: "Pościelić łóżko",         icon: "assets/ikony/m_lozko.svg"    },    
  {      id: 8,      name: "Odkurzyć podłogę",        icon: "assets/ikony/m_odkurzacz.svg"},    
  {      id: 9,      name: "Umyć podłogę",            icon: "assets/ikony/m_podloga.svg"  },    
  {      id: 10,     name: "Nakryć stół",             icon: "assets/ikony/m_nakrycie.svg" },    
  {      id: 11,     name: "Posprzątać ze stołu",     icon: "assets/table.svg"            },    
  {      id: 12,     name: "Wynieść śmieci",          icon: "assets/ikony/m_smieci.svg"   },    
  {      id: 13,     name: "Posprzątać po zwierzątku",icon: "assets/ikony/m_kuweta.svg"   },    
  {      id: 14,     name: "Umyć auto",               icon: "assets/ikony/m_samochod.svg" },    
  {      id: 15,     name: "Zetrzeć kurze",           icon: "assets/ikony/m_kurz.svg"     },    
  {      id: 16,     name: "Nakarmić zwierzątko",     icon: "assets/ikony/m_nakarmic.svg" },    
  {      id: 17,     name: "Wyprowadzić zwierzątko",  icon: "assets/ikony/m_spacer.svg"   },    
  {      id: 18,     name: "Rozpakować zakupy",       icon: "assets/ikony/m_zakupy.svg"   },    
  {      id: 19,     name: "Pomoc w ogródku",         icon: "assets/ikony/m_ogrod.svg"    },    
  {      id: 20,     name: "Umyć naczynia",           icon: "assets/ikony/m_naczynia.svg" },    
  {      id: 21,     name: "Odrobić pracę domową",    icon: "assets/ikony/m_lekcje.svg"   },    
  {      id: 22,     name: "Przeczytać książkę",      icon: "assets/ikony/m_ksiazka.svg"  },    
  {      id: 23,     name: "Poskładać ubrania",       icon: "assets/ikony/m_ubrania.svg"  },    
  {      id: 24,     name: "Ubrać się samemu",        icon: "assets/ikony/m_ubrac.svg"    }  
]

expertGifts = [
  {      id: 1,      name: "Wyjście na lody",         icon: "assets/ikony/n_lody.svg"     },    
  {      id: 2,      name: "Wyjście do kina",         icon: "assets/ikony/n_kino.svg"     },    
  {      id: 3,      name: "Wycieczka na weekend",    icon: "assets/ikony/n_wycieczka.svg"},    
  {      id: 4,      name: "Aquapark ",               icon: "assets/swimming-pool.svg"    },    
  {      id: 5,      name: "15 min na gry",           icon: "assets/ikony/n_kwadrans.svg" },    
  {      id: 6,      name: "30 min na gry",           icon: "assets/ikony/n_pol2.svg"      },    
  {      id: 7,      name: "45 min na gry",           icon: "assets/ikony/n_trzyczwarte.svg"},    
  {      id: 8,      name: "Nowa gra",                icon: "assets/ikony/n_pad.svg"      },    
  {      id: 9,      name: "Nowa zabawka",            icon: "assets/ikony/n_prezent.svg"  },    
  {      id: 10,     name: "Wieczór gier",            icon: "assets/ikony/n_gry.svg"      },    
  {      id: 11,     name: "Deser",                   icon: "assets/ikony/n_deser.svg"    },    
  {      id: 12,     name: "Późniejszy powrót do domu",icon: "assets/ikony/n_powrot.svg"  },    
  {      id: 13,     name: "Deskorolka",              icon: "assets/ikony/n_deska.svg"    },    
  {      id: 14,     name: "Niespodzianka",           icon: "assets/ikony/n_prezent.svg"  },    
  {      id: 15,     name: "Klocki LEGO",             icon: "assets/ikony/n_lego.svg"     },
  {      id: 16,     name: "Wyjście na łyżwy",        icon: "assets/ice-skate.svg"        }
]
  
expertHeroes = [
  {     id: 1,      name: "Szybki Bil",              image: "assets/bohater1.png",           powers: [20,20,20],  
        gender: 'M', badges: [        
            {        badgeName: "Buty mocy",          icon: "assets/ikony/o_but1.svg",      gained: [20,0,0]     },        
            {        badgeName: "Buty super mocy",    icon: "assets/ikony/o_but2.svg",      gained: [20,0,0]     },        
            {        badgeName: "Buty extra mocy",    icon: "assets/ikony/o_but3.svg",      gained: [20,0,0]     },             
            {        badgeName: "Ręka mocy",          icon: "assets/ikony/o_reka1.svg",     gained: [0,20,0]     },        
            {        badgeName: "Ręka super mocy",    icon: "assets/ikony/o_reka2.svg",     gained: [0,20,0]     },        
            {        badgeName: "Ręka extra mocy",    icon: "assets/ikony/o_reka3.svg",     gained: [0,20,0]     },            
            {        badgeName: "Maska mocy",         icon: "assets/ikony/o_maska1.svg",    gained: [0,0,20]     },        
            {        badgeName: "Maska super mocy",   icon: "assets/ikony/o_maska2.svg",    gained: [0,0,20]     },        
            {        badgeName: "Maska extra mocy",   icon: "assets/ikony/o_maska3.svg",    gained: [0,0,20]     }      
        ]    
  },
  {     id:2,        name: "Silny Jack",              image: "assets/bohater2.png",       powers: [20,20,20],
        gender: 'M', badges: [
          {        badgeName: "Buty mocy",          icon: "assets/ikony/o_but1.svg",      gained: [20,0,0]     },        
          {        badgeName: "Buty super mocy",    icon: "assets/ikony/o_but2.svg",      gained: [20,0,0]     },        
          {        badgeName: "Buty extra mocy",    icon: "assets/ikony/o_but3.svg",      gained: [20,0,0]     },             
          {        badgeName: "Ręka mocy",          icon: "assets/ikony/o_reka1.svg",     gained: [0,20,0]     },        
          {        badgeName: "Ręka super mocy",    icon: "assets/ikony/o_reka2.svg",     gained: [0,20,0]     },        
          {        badgeName: "Ręka extra mocy",    icon: "assets/ikony/o_reka3.svg",     gained: [0,20,0]     },            
          {        badgeName: "Maska mocy",         icon: "assets/ikony/o_maska1.svg",    gained: [0,0,20]     },        
          {        badgeName: "Maska super mocy",   icon: "assets/ikony/o_maska2.svg",    gained: [0,0,20]     },        
          {        badgeName: "Maska extra mocy",   icon: "assets/ikony/o_maska3.svg",    gained: [0,0,20]     }  
        ]   
  },
  {     id:3,        name: "Zwinna Jane",             image: "assets/bohater4.png",       powers: [20,20,20],
        gender: 'M', badges: [
          {        badgeName: "Buty mocy",          icon: "assets/ikony/o_but1.svg",      gained: [20,0,0]     },        
          {        badgeName: "Buty super mocy",    icon: "assets/ikony/o_but2.svg",      gained: [20,0,0]     },        
          {        badgeName: "Buty extra mocy",    icon: "assets/ikony/o_but3.svg",      gained: [20,0,0]     },             
          {        badgeName: "Ręka mocy",          icon: "assets/ikony/o_reka1.svg",     gained: [0,20,0]     },        
          {        badgeName: "Ręka super mocy",    icon: "assets/ikony/o_reka2.svg",     gained: [0,20,0]     },        
          {        badgeName: "Ręka extra mocy",    icon: "assets/ikony/o_reka3.svg",     gained: [0,20,0]     },            
          {        badgeName: "Maska mocy",         icon: "assets/ikony/o_maska1.svg",    gained: [0,0,20]     },        
          {        badgeName: "Maska super mocy",   icon: "assets/ikony/o_maska2.svg",    gained: [0,0,20]     },        
          {        badgeName: "Maska extra mocy",   icon: "assets/ikony/o_maska3.svg",    gained: [0,0,20]     }  
        ]
  },
  {     id: 4,      name: "Szybki Bil",              image: "assets/bohater5.png",           powers: [20,20,20],  
        gender: 'F', badges: [        
            {        badgeName: "Buty mocy",          icon: "assets/ikony/o_but1.svg",      gained: [20,0,0]     },        
            {        badgeName: "Buty super mocy",    icon: "assets/ikony/o_but2.svg",      gained: [20,0,0]     },        
            {        badgeName: "Buty extra mocy",    icon: "assets/ikony/o_but3.svg",      gained: [20,0,0]     },             
            {        badgeName: "Ręka mocy",          icon: "assets/ikony/o_reka1.svg",     gained: [0,20,0]     },        
            {        badgeName: "Ręka super mocy",    icon: "assets/ikony/o_reka2.svg",     gained: [0,20,0]     },        
            {        badgeName: "Ręka extra mocy",    icon: "assets/ikony/o_reka3.svg",     gained: [0,20,0]     },            
            {        badgeName: "Maska mocy",         icon: "assets/ikony/o_maska1.svg",    gained: [0,0,20]     },        
            {        badgeName: "Maska super mocy",   icon: "assets/ikony/o_maska2.svg",    gained: [0,0,20]     },        
            {        badgeName: "Maska extra mocy",   icon: "assets/ikony/o_maska3.svg",    gained: [0,0,20]     }      
        ]    
  },
  {     id:5,        name: "Silny Jack",              image: "assets/bohater3.png",       powers: [20,20,20],
        gender: 'F', badges: [
          {        badgeName: "Buty mocy",          icon: "assets/ikony/o_but1.svg",      gained: [20,0,0]     },        
          {        badgeName: "Buty super mocy",    icon: "assets/ikony/o_but2.svg",      gained: [20,0,0]     },        
          {        badgeName: "Buty extra mocy",    icon: "assets/ikony/o_but3.svg",      gained: [20,0,0]     },             
          {        badgeName: "Ręka mocy",          icon: "assets/ikony/o_reka1.svg",     gained: [0,20,0]     },        
          {        badgeName: "Ręka super mocy",    icon: "assets/ikony/o_reka2.svg",     gained: [0,20,0]     },        
          {        badgeName: "Ręka extra mocy",    icon: "assets/ikony/o_reka3.svg",     gained: [0,20,0]     },            
          {        badgeName: "Maska mocy",         icon: "assets/ikony/o_maska1.svg",    gained: [0,0,20]     },        
          {        badgeName: "Maska super mocy",   icon: "assets/ikony/o_maska2.svg",    gained: [0,0,20]     },        
          {        badgeName: "Maska extra mocy",   icon: "assets/ikony/o_maska3.svg",    gained: [0,0,20]     }  
        ]   
  },
  {     id:6,        name: "Zwinna Jane",             image: "assets/bohater6.png",       powers: [20,20,20],
        gender: 'F', badges: [
          {        badgeName: "Buty mocy",          icon: "assets/ikony/o_but1.svg",      gained: [20,0,0]     },        
          {        badgeName: "Buty super mocy",    icon: "assets/ikony/o_but2.svg",      gained: [20,0,0]     },        
          {        badgeName: "Buty extra mocy",    icon: "assets/ikony/o_but3.svg",      gained: [20,0,0]     },             
          {        badgeName: "Ręka mocy",          icon: "assets/ikony/o_reka1.svg",     gained: [0,20,0]     },        
          {        badgeName: "Ręka super mocy",    icon: "assets/ikony/o_reka2.svg",     gained: [0,20,0]     },        
          {        badgeName: "Ręka extra mocy",    icon: "assets/ikony/o_reka3.svg",     gained: [0,20,0]     },            
          {        badgeName: "Maska mocy",         icon: "assets/ikony/o_maska1.svg",    gained: [0,0,20]     },        
          {        badgeName: "Maska super mocy",   icon: "assets/ikony/o_maska2.svg",    gained: [0,0,20]     },        
          {        badgeName: "Maska extra mocy",   icon: "assets/ikony/o_maska3.svg",    gained: [0,0,20]     }  
        ]
  }
]

}
