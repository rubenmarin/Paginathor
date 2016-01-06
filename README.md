# paginationjs
assets/js/scripts.js

```js
/*.ready*/
$(function() {
	
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
```

#### Based on above it would render like this

1 2 3 4 5 ... 21 22
