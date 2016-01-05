# paginationjs
assets/js/scripts.js

```js
/*.ready*/
$(function() {
	/*
		var paginatehtml = Paginathor.build({ page : 1 , total : 214 , limit : 10 , adj : 1 , target : '#'});
		var pagiWrapper = document.getElementById("pagination-wrapper").firstElementChild;
		//<div id="pagination-wrapper"><ul></ul></div> 
		pagiWrapper.innerHTML = paginatehtml;
	*/
	
	var paginatehtml = Paginathor.build({ page : 1 , total : 214 , limit : 10 , adj : 1 , target : '#'});
	var pagiWrapper = $('#pagiWrapper ul');
	pagiWrapper.html(paginatehtml);
	
	function paginateClicker(){
		$('.submission-page').on('click', function(e){
			e.preventDefault();
			var t = $(this);
			var p = t.data('submissionPage');
			html = Paginathor.build({ page : p });
			pagiWrapper.html(html);
			paginateClicker();
		});	
	}
	paginateClicker();
	
});
```
