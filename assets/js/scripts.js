/*.ready*/
$(function() {
	/*
		var myPagi = new Paginathor({ page : 1 , total : 214 , limit : 10 , adj : 1 , target : '#' , elClass : 'submission-page' });
		var pagiBuild = myPagi.build();
		//<div id="pagination-wrapper"><ul></ul></div> 
		pagiWrapper.innerHTML = pagiBuild;
	*/

	var myPagi = new Paginathor({ page : 1 , total : 214 , limit : 10 , adj : 1 , target : '#' , elClass : 'submission-page' });

	var pagiBuild = myPagi.build();

	var pagiWrapper = $('#pagiWrapper ul');
	pagiWrapper.html(pagiBuild);
	
	function paginateClicker(){
		$('.submission-page').on('click', function(e){
			e.preventDefault();
			var t = $(this);
			var p = t.data('submissionPage');
			html = myPagi.build({ page : p });
			pagiWrapper.html(html);
			console.log(myPagi);
			paginateClicker();
		});	
	}
	paginateClicker();
	
});
