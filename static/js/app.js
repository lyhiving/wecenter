var document_title;$(document).ready(function () {		document_title = document.title;		// fix form bug...	$("form[action='']").attr('action', window.location.href);		if (typeof(G_NOTIFICATION_INTERVAL) != 'undefined')	{		check_notifications();			setInterval('check_notifications()', G_NOTIFICATION_INTERVAL);	}		$('a[rel=lightbox]').fancybox({					openEffect  : 'none',		closeEffect : 'none',		prevEffect : 'none',		nextEffect : 'none',		closeBtn  : false,		helpers : {			buttons	: {				position : 'bottom'			}		},		afterLoad : function() {			this.title = '第 ' + (this.index + 1) + ' 张, 共 ' + this.group.length + ' 张' + (this.title ? ' - ' + this.title : '');		}	});		if (typeof(myMarkdownSettings) != 'undefined' && document.getElementById('advanced_editor'))	{				$('#advanced_editor').markItUp(myMarkdownSettings);				$.setEditorPreview();				setInterval(function()		{		    	if (advanced_editor != null){		    	advanced_editor.save();		        $('#markItUpPreviewFrames').html(Markdown($('#advanced_editor').val()));	    	}		    	var content = $('#advanced_editor').val().split(/\r?\n/);	    		    	if (content.length > 5 && content.length < 30) {	    		$('#advanced_editor').height(content.length * 21).css('overflow', 'hidden');	    	} else if (content.length >= 30) {	    		$('#advanced_editor').height(30 * 21).css('overflow', 'auto');	    	}	    }, 500);	}	else if (document.getElementById('markItUpPreviewFrame'))	{		$('#markItUpPreviewFrame').hide();	}	});