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
  
getExpertHeroes(){
  return this.expertHeroes
}
  
getOneExpertHero(heroId){
  return this.expertHeroes.find (x => x.id == heroId)
}
  
expertMissions = [ 
  {      id: 1,      name: "Zęby rano",               icon: "assets/ikony/m_zeby.svg"     },    
  {      id: 2,      name: "Zęby wieczór",            icon: "assets/ikony/m_zeby.svg"     },    
  {      id: 3,      name: "Posprzątać pokój",        icon: "assets/room.svg"             },    
  {      id: 4,      name: "Poskładać zabawki",       icon: "assets/ikony/m_zabawki.svg"  },    
  {      id: 5,      name: "Opróżnić zmywarkę",       icon: "assets/ikony/m_zmywarka.svg" },    
  {      id: 6,      name: "Wstawić pranie",          icon: "assets/laundry.svg"          },    
  {      id: 7,      name: "Pościelić łóżko",         icon: "assets/ikony/m_lozko.svg"    },    
  {      id: 8,      name: "Odkurzyć podłogę",        icon: "assets/ikony/m_odkurzacz.svg"},    
  {      id: 9,      name: "Umyć podłogę",            icon: "assets/cleaning.svg"         },    
  {      id: 10,     name: "Nakryć stół",             icon: "assets/cutlery.svg"          },    
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
  {      id: 22,     name: "Przeczytać książkę",      icon: "assets/book.svg"             },    
  {      id: 23,     name: "Poskładać ubrania",       icon: "assets/ikony/m_ubrania.svg"  },    
  {      id: 24,     name: "Ubrać się samemu",        icon: "assets/ikony/m_ubrac.svg"    }  
]

expertGifts = [
  {      id: 1,      name: "Wyjście na lody",         icon: "assets/ikony/n_lody.svg"     },    
  {      id: 2,      name: "Wyjście do kina",         icon: "assets/ikony/n_kino.svg"     },    
  {      id: 3,      name: "Wycieczka na weekend",    icon: "assets/ikony/n_wycieczka.svg"},    
  {      id: 4,      name: "Aquapark ",               icon: "assets/swimming-pool.svg"    },    
  {      id: 5,      name: "15 min na gry",           icon: "assets/ikony/n_kwadrans.svg" },    
  {      id: 6,      name: "30 min na gry",           icon: "assets/ikony/n_pol.svg"      },    
  {      id: 7,      name: "45 min na gry",           icon: "assets/ikony/n_trzyczwarte.svg"},    
  {      id: 8,      name: "Nowa gra",                icon: "assets/remote-control.svg"   },    
  {      id: 9,      name: "Nowa zabawka",            icon: "assets/ikony/n_prezent.svg"  },    
  {      id: 10,     name: "Wieczór gier",            icon: "assets/ikony/n_gry.svg"      },    
  {      id: 11,     name: "Deser",                   icon: "assets/ikony/n_deser.svg"    },    
  {      id: 12,     name: "Późniejszy powrót do domu",icon: "assets/history.svg"         },    
  {      id: 13,     name: "Deskorolka",              icon: "assets/ikony/n_deska.svg"    },    
  {      id: 14,     name: "Niespodzianka",           icon: "assets/gift2.svg"            },    
  {      id: 15,     name: "Klocki LEGO",             icon: "assets/ikony/n_lego.svg"     }  
]
  
expertHeroes = [
  {     id: 1,      name: "Szybki Bil",              image: "assets/bohater.png",      
        badges1: [        
            {        badgeName: "Buty mocy",          icon: "assets/ikony/o_but1.svg",      gained: "false"        },        
            {        badgeName: "Buty super mocy",    icon: "assets/ikony/o_but2.svg",      gained: "false"        },        
            {        badgeName: "Buty extra mocy",    icon: "assets/ikony/o_but3.svg",      gained: "false"        }      
        ],      
        badges2: [        
            {        badgeName: "Ręka mocy",          icon: "assets/ikony/o_reka1.svg",     gained: "false"        },        
            {        badgeName: "Ręka super mocy",    icon: "assets/ikony/o_reka2.svg",     gained: "false"        },        
            {        badgeName: "Ręka extra mocy",    icon: "assets/ikony/o_reka3.svg",     gained: "false"        }      
        ],
        badges3: [        
            {        badgeName: "Maska mocy",         icon: "assets/ikony/o_maska1.svg",    gained: "false"        },        
            {        badgeName: "Maska super mocy",   icon: "assets/ikony/o_maska2.svg",    gained: "false"        },        
            {        badgeName: "Maska extra mocy",   icon: "assets/ikony/o_maska3.svg",    gained: "false"        }      
        ]    
  },
  {     id:2,        name: "Silny Jack",              image: "assets/bohater2.png",
        badges1: [
            {        badgeName: "Buty mocy",          icon: "assets/ikony/o_but1.svg",      gained: "false"        },
            {        badgeName: "Buty super mocy",    icon: "assets/ikony/o_but2.svg",      gained: "false"        },
            {        badgeName: "Buty extra mocy",    icon: "assets/ikony/o_but3.svg",      gained: "false"        }
        ],
        badges2: [
            {        badgeName: "Ręka mocy",          icon: "assets/ikony/o_reka1.svg",     gained: "false"        },
            {        badgeName: "Ręka super mocy",    icon: "assets/ikony/o_reka2.svg",     gained: "false"        },
            {        badgeName: "Ręka extra mocy",    icon: "assets/ikony/o_reka3.svg",     gained: "false"        }
        ],
        badges3: [
            {        badgeName: "Maska mocy",         icon: "assets/ikony/o_maska1.svg",    gained: "false"        },
            {        badgeName: "Maska super mocy",   icon: "assets/ikony/o_maska2.svg",    gained: "false"        },
            {        badgeName: "Maska extra mocy",   icon: "assets/ikony/o_maska3.svg",    gained: "false"        }
        ]   
  },
  {     id:3,        name: "Zwinna Jane",             image: "assets/bohater2.png",
        badges1: [
            {        badgeName: "Buty mocy",          icon: "assets/ikony/o_but1.svg",      gained: "false"        },
            {        badgeName: "Buty super mocy",    icon: "assets/ikony/o_but2.svg",      gained: "false"        },
            {        badgeName: "Buty extra mocy",    icon: "assets/ikony/o_but3.svg",      gained: "false"        }
        ],
        badges2: [
            {        badgeName: "Ręka mocy",          icon: "assets/ikony/o_reka1.svg",     gained: "false"        },
            {        badgeName: "Ręka super mocy",    icon: "assets/ikony/o_reka2.svg",     gained: "false"        },
            {        badgeName: "Ręka extra mocy",    icon: "assets/ikony/o_reka3.svg",     gained: "false"        }
        ],
        badges3: [
            {        badgeName: "Maska mocy",         icon: "assets/ikony/o_maska1.svg",    gained: "false"        },
            {        badgeName: "Maska super mocy",   icon: "assets/ikony/o_maska2.svg",    gained: "false"        },
            {        badgeName: "Maska extra mocy",   icon: "assets/ikony/o_maska3.svg",    gained: "false"        }
        ]
  }
]
}
