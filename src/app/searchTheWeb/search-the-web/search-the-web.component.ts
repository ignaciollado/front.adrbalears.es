import { Component, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource, NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { ArticleContentService } from '../../services/article-content.service';
import { genericDataDTO } from '../../Models/generic-data.dto';
import { SearchTheWebService } from '../../services/search-the-web.service';
import { reqArticle } from '../../Models/article-data.dto';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-search-the-web',
  templateUrl: './search-the-web.component.html',
  styleUrl: './search-the-web.component.scss'
})
export class SearchTheWebComponent {
  searchTheWebForm!: FormGroup
	totalFound: string = ""
	public contenidos: reqArticle[] = []
	currentLang: string = ""
	genericDataContents: genericDataDTO[] = []
  images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/868/500`)

	paused: boolean = false
	unpauseOnArrow: boolean = false
	pauseOnIndicator: boolean = false
	pauseOnHover: boolean = true
	pauseOnFocus: boolean = true
  value = 'Clear me';
  
  @Input() showLinks: string;

    constructor(private route: ActivatedRoute, private router: Router, config: NgbTooltipConfig,
		private contentService: ArticleContentService,
		private formBuilder: FormBuilder,
		public translateService: TranslateService, 
		private searchService: SearchTheWebService) {
				// customize default values of tooltips used by this component tree
				config.placement = 'bottom'
				config.triggers = 'hover'
		}

  createForm() {
    this.searchTheWebForm = this.formBuilder.group( {
        searchTerm: [ '', [Validators.required ] ]
    } )
  }
      
  get searchTerm() {
    return this.searchTheWebForm.get('searchTerm');
  }
      
  ngOnInit() {
    this.createForm()
    switch (localStorage.getItem('preferredLang')) {
      case 'cat':
        this.currentLang = 'ca-ES'
        break
      case 'cas':
        this.currentLang = 'es-ES'      
        break
      case 'en':
        this.currentLang = 'en-EN'
        break
      default:
        this.currentLang = 'ca-ES'
      }
      this.contentService.getAll()
        .subscribe((response:any[]) => {
          this.genericDataContents = response;
        })
  }
      
  @ViewChild('carousel', { static: true }) carousel: NgbCarousel = new NgbCarousel;
      
  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
      this.paused = !this.paused;
  }
      
  onSlide(slideEvent: NgbSlideEvent) {
    if (
        this.unpauseOnArrow &&
        slideEvent.paused &&
        (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
      ) {
        this.togglePaused();
        }
      if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
        this.togglePaused();
      }
  }
      
  onClick(searchTheWebForm: any) {
          let resultCounter = document.getElementById("totalResults")
          if (searchTheWebForm.valid) {
            resultCounter?.classList.remove("ocultar")
            this.totalFound = "searching..."
            const searchTerm: string = searchTheWebForm.value.searchTerm
      
            this.searchService.getArticles()
            .subscribe( (result: any) => {
              this.contenidos = result.data
              this.contenidos = result.data.filter( (item : reqArticle) => item.attributes.language === `${this.currentLang}`) 
              console.log("1- ", this.contenidos)
              this.contenidos.map((item:reqArticle) => {
                if (item.attributes.state.toString().includes('0')) {
                  this.contenidos?.splice(this.contenidos?.indexOf(item), 1)
                }
              })
              console.log("2- ", this.contenidos)
              this.contenidos = this.contenidos.filter( item => item.attributes.text.toUpperCase().includes(searchTerm.trim().toUpperCase()) )
              this.totalFound = this.contenidos.length.toString()
              console.log("3- ", this.contenidos)

            }, (err) => {
              console.log ( err.msg );
            });
      
          } else {
            console.error('Contact form is in an invalid state: ', searchTheWebForm)
          } 
        }
  
  projectLandingPage(projectName: string, contentID: string, categoryID: string, showLinks: string, faseProCSSClass: string, newsCategory: string, agendaCategory: string) {
    this.router.navigate([`landing-page/${projectName}/${contentID}/${categoryID}/${showLinks}/${faseProCSSClass}/${newsCategory}/${agendaCategory}`])
  }
       
}