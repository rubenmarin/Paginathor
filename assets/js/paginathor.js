var Paginathor = (function () {
/* 
	based on : http://www.strangerstudios.com/sandbox/pagination/diggstyle.php
*/
	/* Private */
	var _settings = { page : 1 , total : 0 , limit : 10 , adj : 1 , target : '#' , sep : '...'};
	var _tmpl = {
		/* example : function(MUST_BE_ARRAY) */
		isSelected : function(arr){
			return "<li class=\"selected\"><a>"+arr[0]+"</a></li>";
		},
		pageItem : function(arr){
			return "<li><a class=\"submission-page\" data-submission-page=\""+arr[1]+"\" href=\""+arr[0]+arr[1]+"\">"+arr[1]+"</a></li>";
		},
		sep : function(arr){
			return "<li><span class=\"elipses\">"+arr[0]+"</span></li>";
		}
	};
	var _updateSettings = function(o){
		for (var attrname in o) { _settings[attrname] = o[attrname]; }
	};
	var renderTmpl = function(tmplname , arr ){
		var f = _tmpl[tmplname];
		return f.call( this , arr );
	};
	/* PUBLIC */
	return{
		addTmpl: function( t ){
			if(t){
				for (var attrname in t) { _tmpl[attrname] = t[attrname]; }
			}
		},
		getSettings:function(){
			return _settings;
		},
		renderTmpl:function( tmplname , arr ){
			return renderTmpl( tmplname , arr );
		},
		build: function( o ){
			
			_updateSettings( o );

			var s        = _settings;
			var prev     = ( s.page - 1);
			var next     = ( s.page + 1);
			var lastpage = Math.ceil( s.total / s.limit );
			var lpm1     = ( lastpage - 1 );		
			var html = "";
			
			var firsttwo = "";
				firsttwo += this.renderTmpl('pageItem' , [ s.target , '1']);
				firsttwo += this.renderTmpl('pageItem' , [ s.target , '2']);

			var lasttwo = "";
				lasttwo += this.renderTmpl('pageItem' , [ s.target ,lpm1]);
				lasttwo += this.renderTmpl('pageItem' , [ s.target ,lastpage]);
			/* separator / ellipsis / placeholder */
			var sep = this.renderTmpl('sep' , [s.sep]);

			if(lastpage > 1){
				/**
				* not enough pages to bother breaking it up
				**/
				if ( lastpage < 7 + ( s.adj * 2) ){		
					for ( counter = 1; counter <= lastpage; counter++ ){
						if( counter == s.page ){
							html += this.renderTmpl('isSelected' , [ counter ]);
						}
						else{
							html += this.renderTmpl('pageItem' , [ counter ]);
						}				
					}
				}
				/**
				* enough pages to hide some
				**/
				else if( lastpage >= 7 + ( s.adj * 2 ) ){
					/* close to beginning; only hide later pages */
					if( s.page < 1 + ( s.adj * 3) ){
						for ( counter = 1; counter < 4 + ( s.adj * 2); counter++)
						{
							if ( counter == s.page){
								html += this.renderTmpl('isSelected' , [ counter ]);
							}
							else{
								html += this.renderTmpl('pageItem' , [ s.target , counter ]);
							}				
						}
						html += sep;
						html += lasttwo;
					}
					/*in middle; hide some front and some back */
					else if(lastpage - (s.adj * 2) > s.page && s.page > (s.adj * 2)){
						html += firsttwo;
						html += sep;
						for (counter = s.page - s.adj; counter <= s.page + s.adj; counter++)
						{
							if (counter == s.page){
								html += this.renderTmpl('isSelected' , [ counter ]);
							}
							else{
								html += this.renderTmpl('pageItem' , [ s.target , counter ]);
							}			
						}
						html += sep;
						html += lasttwo;	
					}
					/* close to end; only hide early pages */
					else{
						html += firsttwo;
						html += sep;
						for (counter = lastpage - ( 1 + (s.adj * 3)); counter <= lastpage; counter++ )
						{
							if (counter == s.page){
								html += this.renderTmpl('isSelected' , [ counter ]);
							}
							else{
								html += this.renderTmpl('pageItem' , [ s.target , counter ]);				
							}
						}
					}				
				}
			}
			return html;
		}
	};
})();