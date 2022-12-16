$(document).ready(function() {
	$(".parallax").parallax();
	$(".button-collapse").sideNav();

	
});

// Select all links with hashes

	$('a[href*="#"]')
		// Remove links that don't actually link to anything
		.not('[href="#"]')
		.not('[href="#0"]')
		.click(function(event) {
			// On-page links
			if (
				location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") &&
				location.hostname == this.hostname
			) {
				// Figure out element to scroll to
				var target = $(this.hash);
				target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
				// Does a scroll target exist?
				if (target.length) {
					// Only prevent default if animation is actually gonna happen
					event.preventDefault();
					$("html, body").animate(
						{
							scrollTop: target.offset().top
						},
						1000,
						function() {
							// Callback after animation
							// Must change focus!
							var $target = $(target);
							$target.focus();
							if ($target.is(":focus")) {
								// Checking if the target was focused
								return false;
							} else {
								$target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
								$target.focus(); // Set focus again
							}
						}
					);
				}
			}
		});


// Contador 

countdownManager = {
    // Configuration
    targetTime: new Date('Apr 22 19:00:00 2023'), // Date cible du compte à rebours (00:00:00)
    displayElement: { // Elements HTML où sont affichés les informations
        day:  null,
        hour: null,
        min:  null,
        sec:  null
    },
     
    // Initialisation du compte à rebours (à appeler 1 fois au chargement de la page)
    init: function(){
        // Récupération des références vers les éléments pour l'affichage
        // La référence n'est récupérée qu'une seule fois à l'initialisation pour optimiser les performances
        this.displayElement.day  = jQuery('#countdown_day');
        this.displayElement.hour = jQuery('#countdown_hour');
        this.displayElement.min  = jQuery('#countdown_min');
        this.displayElement.sec  = jQuery('#countdown_sec');
         
        // Lancement du compte à rebours
        this.tick(); // Premier tick tout de suite
        window.setInterval("countdownManager.tick();", 1000); // Ticks suivant, répété toutes les secondes (1000 ms)
    },
     
    // Met à jour le compte à rebours (tic d'horloge)
    tick: function(){
        // Instant présent
        var timeNow  = new Date();
         
        // On s'assure que le temps restant ne soit jamais négatif (ce qui est le cas dans le futur de targetTime)
        if( timeNow > this.targetTime ){
            timeNow = this.targetTime;
        }
         
        // Calcul du temps restant
        var diff = this.dateDiff(timeNow, this.targetTime);
         
        this.displayElement.day.text(  diff.day  );
        this.displayElement.hour.text( diff.hour );
        this.displayElement.min.text(  diff.min  );
        this.displayElement.sec.text(  diff.sec  );
    },
     
    // Calcul la différence entre 2 dates, en jour/heure/minute/seconde
    dateDiff: function(date1, date2){
        var diff = {}                           // Initialisation du retour
        var tmp = date2 - date1;
 
        tmp = Math.floor(tmp/1000);             // Nombre de secondes entre les 2 dates
        diff.sec = tmp % 60;                    // Extraction du nombre de secondes
        tmp = Math.floor((tmp-diff.sec)/60);    // Nombre de minutes (partie entière)
        diff.min = tmp % 60;                    // Extraction du nombre de minutes
        tmp = Math.floor((tmp-diff.min)/60);    // Nombre d'heures (entières)
        diff.hour = tmp % 24;                   // Extraction du nombre d'heures
        tmp = Math.floor((tmp-diff.hour)/24);   // Nombre de jours restants
        diff.day = tmp;
 
        return diff;
    }
};
 
jQuery(function($){
    // Lancement du compte à rebours au chargement de la page
    countdownManager.init();
});



/* EFFET SMOOTH SCOLL */

/*

// Pour tous les liens commençant par #.
	$("a[href^='#']").click(function (e) {
		var 
			yPos,
			yInitPos,
			target = ($($(this).attr("href") + ":first"));
			
		// On annule le comportement initial au cas ou la base soit différente de la page courante.
		e.preventDefault(); 
		
		yInitPos = $(window).scrollTop();
		
		// On ajoute le hash dans l'url.
		window.location.hash = $(this).attr("href");
		
		// Comme il est possible que l'ajout du hash perturbe le défilement, on va forcer le scrollTop à son endroit inital.
		$(window).scrollTop(yInitPos);
		
		// On cible manuellement l'ancre pour en extraire sa position.
		// Si c'est un ID on l'obtient.
		target = ($($(this).attr("href") + ":first"));
 
		// Sinon on cherche l'ancre dans le name d'un a.
		if (target.length == 0) {
			target = ($("a[name=" + $(this).attr("href").replace(/#/gi,"") + "]:first"))
		}
		
		// Si on a trouvé un name ou un id, on défile.
		if (target.length == 1) {
			yPos = target.offset().top; // Position de l'ancre.
		
            // La largeur minimale de l'écran correspond
      if (window.matchMedia ('(min-width: 1000px)').matches)
      {
        $('html,body').animate({ scrollTop: yPos - 60 }, 1000);
      }
      // Sinon
      else
      {
        $('html,body').animate({ scrollTop: yPos - 60 }, 1000);
      }
			// On anime le défilement jusqu'à l'ancre.
			 // On décale de 190 pixels l'affichage pour ne pas coller le bord haut de l'affichage du navigateur et on défile en 1 seconde jusqu'à l'ancre.
		}
	});

/* ~~~~~~~~~~~~~~~~~~~ */
