import { Component, inject, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    defaultLang:string = "ca"
    constructor( private router: Router, private translate:TranslateService ) {
        translate.addLangs(['es', 'ca']);
        translate.setDefaultLang('ca');
        translate.use('ca');
    }

ngOnInit(): void {
    localStorage.setItem('preferredLang', 'ca')
}
    
private offcanvasService = inject(NgbOffcanvas);

ngAfterViewInit(): void {
/*     CookieConsent.run({
      categories: {
          necessary: {
              enabled: true,  // this category is enabled by default
              readOnly: true  // this category cannot be disabled
          },
          analytics: {}
      },
  
      language: {
          default: this.currentLang,
          translations: {
            'en': {
                consentModal: {
                    title: 'We use cookies',
                    description: 'Cookie modal description',
                    acceptAllBtn: 'Accept all',
                    acceptNecessaryBtn: 'Reject all',
                    showPreferencesBtn: 'Manage Individual preferences'
                },
                preferencesModal: {
                    title: 'Manage cookie preferences',
                    acceptAllBtn: 'Accept all',
                    acceptNecessaryBtn: 'Reject all',
                    savePreferencesBtn: 'Accept current selection',
                    closeIconLabel: 'Close modal',
                    sections: [
                        {
                            title: 'Somebody said ... cookies?',
                            description: 'I want one!'
                        },
                        {
                            title: 'Strictly Necessary cookies',
                            description: 'These cookies are essential for the proper functioning of the website and cannot be disabled.',
                            //this field will generate a toggle linked to the 'necessary' category
                            linkedCategory: 'necessary'
                        },
                        {
                            title: 'Performance and Analytics',
                            description: 'These cookies collect information about how you use our website. All of the data is anonymized and cannot be used to identify you.',
                            linkedCategory: 'analytics'
                        },
                        {
                            title: 'More information',
                            description: 'For any queries in relation to my policy on cookies and your choices, please <a href="#contact-page">contact us</a>'
                        }
                    ]
                }
            },
            'es': {
                consentModal: {
                    title: 'Usamos cookies',
                    description: 'Descripción de las cookies',
                    acceptAllBtn: 'Aceptar todo',
                    acceptNecessaryBtn: 'Rechazar todo',
                    showPreferencesBtn: 'Gestionar preferencias individuales'
                },
                preferencesModal: {
                    title: 'Gestionar cookies',
                    acceptAllBtn: 'Aceptar todo',
                    acceptNecessaryBtn: 'Rechazar todo',
                    savePreferencesBtn: 'Aceptar selección actual',
                    closeIconLabel: 'Cerrar modal',
                    sections: [
                        {
                            title: '¿Qué son las cookies?',
                            description: 'es un pequeño fichero de texto que se almacena en el navegador cuando se visita cualquier página web. La utilidad que tiene es que la web sea capaz de recordar la visita cuando se vuelva a navegar por esta página. Las galletas suelen almacenar información de carácter técnico, preferencias personales, personalización de contenidos, estadísticas de uso, enlaces en redes sociales, acceso a cuentas de usuario, etc. El objetivo de la galleta es adaptar el contenido de la web al perfil y a las necesidades de cada uno, dado que sin galletas los servicios ofrecidos por cualquier página quedarían disminuidos notablemente.'
                        },
                        {
                            title: 'Galletas estrictamente necesarias',
                            description: 'Estas galletas son necesarias para que el sitio web funcione y no se pueden desactivar en nuestros sistemas. En general, solo se establecen en respuesta a vuestras acciones para una petición de servicios, como configurar las preferencias de privacidad, iniciar la sesión o rellenar formularios. Puede configurar el navegador para bloquear estas galletas o para recibir alertas sobre su uso, pero algunas partes del sitio web no funcionarán. Estas galletas no almacenan ninguna información personal identificable.',
                            //this field will generate a toggle linked to the 'necessary' category
                            linkedCategory: 'necessary'
                        },
                        {
                            title: 'Galletas de rendimiento',
                            description: 'These cookies collect information about how you use our website. All of the data is anonymized and cannot be used to identify you.',
                            linkedCategory: 'analytics'
                        },
                        {
                            title: 'Más información',
                            description: 'For any queries in relation to my policy on cookies and your choices, please <a href="#contact-page">contact us</a>'
                        }
                    ]
                }
            },
            'ca': {
                consentModal: {
                    title: 'Empram galetes',
                    description: 'Descripció de les galetes',
                    acceptAllBtn: 'Aceptar-ho tot',
                    acceptNecessaryBtn: 'Rebutjar tot',
                    showPreferencesBtn: 'Gestionar preferències individuals'
                },
                preferencesModal: {
                    title: 'Gestionar galetes',
                    acceptAllBtn: 'Aceptar-ho tot',
                    acceptNecessaryBtn: 'Rebutjar tot',
                    savePreferencesBtn: 'Aceptar sel·lecció actual',
                    closeIconLabel: 'Tanca modal',
                    sections: [
                        {
                            title: 'Qué son les galetes?',
                            description: 'és un petit fitxer de text que s’emmagatzema al navegador quan es visita qualsevol pàgina web. La utilitat que té és que el web sigui capaç de recordar la visita quan es torni a navegar per aquesta pàgina. Les galetes solen emmagatzemar informació de caràcter tècnic, preferències personals, personalització de continguts, estadístiques d’ús, enllaços a xarxes socials, accés a comptes d’usuari, etc. L’objectiu de la galeta és adaptar el contingut del web al perfil i a les necessitats de cadascú, atès que sense galetes els serveis que ofereix un web quedarien minvats notablement..'
                        },
                        {
                            title: 'StrGaletes estrictament necessàriesictly Necessary cookies',
                            description: 'Aquestes galetes són necessàries perquè el lloc web funcioni i no es poden desactivar en els nostres sistemes. En general, només s’estableixen en resposta a les vostres accions per a una petició de serveis, com ara configurar les preferències de privadesa, iniciar la sessió o omplir formularis. Podeu configurar el navegador per bloquejar aquestes galetes o per rebre alertes sobre el seu ús, però algunes parts del lloc no funcionaran. Aquestes galetes no emmagatzemen cap informació personal identificable..',
                            //this field will generate a toggle linked to the 'necessary' category
                            linkedCategory: 'necessary'
                        },
                        {
                            title: 'Galetes de rendiment',
                            description: 'These cookies collect information about how you use our website. All of the data is anonymized and cannot be used to identify you.',
                            linkedCategory: 'analytics'
                        },
                        {
                            title: 'Mes informació',
                            description: 'For any queries in relation to my policy on cookies and your choices, please <a href="#contact-page">contact us</a>'
                        }
                    ]
                }
            }            
          }
      }
  }); */
}

openCustomPanelClass(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { panelClass: 'bg-info' });
}

scroll(el: string) {
    console.log (window.innerHeight, window.innerWidth)
}

redirectToExternalUrl(externalURL: string) {
    window.open (externalURL, '_blank');
}

projectLandingPage(projectName: string, contentID: string, categoryID: string, showLinks: string, faseProCSSClass: string, newsCategory: string, agendaCategory: string) {
    this.router.navigate([`landing-page/${projectName}/${contentID}/${categoryID}/${showLinks}/${faseProCSSClass}/${newsCategory}/${agendaCategory}`])
}

/* switchLanguage( lang:string ) {
    localStorage.setItem('preferredLang', lang)
    location.reload() 
} */

switchLanguage( lang:string ) {
    this.translate.use(lang)
    localStorage.setItem("preferredLang", lang)
    window.location.reload()
}

}
