var cur_page = 0;

var bp_more_inner_o = '';

var cur_filter = '';


function reload_list()
{	
	cur_page = 0;

	$('#main_contents').html('<p style="padding: 15px 0" align="center"><img src="' + G_STATIC_URL + '/common/loading_b.gif" alt="" /></p>');

	$('#bp_more').html(bp_more_inner_o);

	$('#bp_more').click();
}

$(document).ready(function()
{
	bp_more_inner_o = $('#bp_more').html();

	$('.aw-mod.side-nav a').click(function () {

		if ($('#main_title').attr('id') != null && $(this).attr('rel'))
		{

			$('.aw-mod.side-nav a').removeClass('active');

			window.location.hash = $(this).attr('rel');

			$('#main_title').html($(this).html());

			$('#main_title i').detach();

			$(this).addClass('active');

			reload_list();

			return false;
		}
	});

	
	$('#bp_more').click(function()
	{
		var _this = this;
		
		switch (window.location.hash)
		{
			default:
				if (window.location.hash != '#all')
				{
					query_string = window.location.hash.replace(/#/g, '').split('__');

					for (i = 0; i < 3; i++)
					{
						if (!query_string[i])
						{
							query_string[i] = '';
						}
					}
					

					if (query_string[1])
					{
						cur_filter = query_string[1];
					}
					else
					{
						cur_filter = '';
					}
				}
				else
				{
					cur_filter = '';
				}

				var request_url = G_BASE_URL + '/home/ajax/index_actions/page-' + cur_page + '__filter-' + cur_filter;
			break;

			case '#draft_list__draft':
				var request_url = G_BASE_URL + '/home/ajax/draft/page-' + cur_page;

				$('#main_title').prepend('<a class="pull-right btn btn-mini btn-success" id="delete-draft" onclick="$.each($(\'a.delete-draft\'), function (i, e) { $(e).click(); });">' + _t('清空所有') + '</a>');
			break;

			case '#invite_list__invite':
				var request_url = G_BASE_URL + '/home/ajax/invite/page-' + cur_page;
			break;
		}

		$(this).addClass('loading');

		$.get(request_url, function (response)
		{
			if (response.length)
			{
				if (cur_page == 0)
				{
					$('#main_contents').html(response);
				}
				else
				{
					$('#main_contents').append(response);
				}

				cur_page++;

				$(_this).html(bp_more_inner_o); 
			}
			else
			{
				if (cur_page == 0)
				{
					$('#main_contents').html('<p style="padding: 15px 0" align="center">' + _t('没有内容') + '</p>');
				}

				$(_this).addClass('disabled');

				$(_this).find('span').html(_t('没有更多了'));
			}

			$(_this).removeClass('loading');
		})

		return false;
	});

	if ($('.aw-mod.side-nav a[rel=' + window.location.hash.replace(/#/g, '') + ']').attr('href'))
	{
		$('.aw-mod.side-nav a[rel=' + window.location.hash.replace(/#/g, '') + ']').click();
	}
	else
	{
		$('.aw-mod.side-nav a[rel=all]').click();
	}

	//问题添加评论
    AWS.Init.init_comment_box('.aw-add-comment');
});

function _welcome_step_1_form_processer(result)
{
	welcome_step_2_load();
}

function welcome_step_1_load()
{
	AWS.Init.init_avatar_uploader($('#welcome_avatar_uploader'), $('#aw-img-uploading'), $("#aw-upload-img"));

	$('.aw-first-login').css({
		left : $(window).width() / 2 - ($('.aw-first-login').width() + 42) / 2
	});
}

function welcome_step_2_load()
{
	$('#welcome_topics_list').html('<p style="padding: 15px 0" align="center"><img src="' + G_STATIC_URL + '/common/loading_b.gif" alt="" /></p>');

	$('.aw-first-login').hide().siblings().eq(1).show();

	$.get(G_BASE_URL + '/account/ajax/welcome_get_topics/', function (result) {
		$('#welcome_topics_list').html(result);
	});
}

function welcome_step_3_load()
{
	$('#welcome_users_list').html('<p style="padding: 15px 0" align="center"><img src="' + G_STATIC_URL + '/common/loading_b.gif" alt="" /></p>');

	$('.aw-first-login').hide().siblings().eq(2).show();

	$.get(G_BASE_URL + '/account/ajax/welcome_get_users/', function (result) {
		$('#welcome_users_list').html(result);
	});
}

function welcome_step_finish()
{
	$('#aw-ajax-box').html('');
	$('.modal-backdrop').detach();
	$('body').removeClass('modal-open');

	$.get(G_BASE_URL + '/account/ajax/clean_first_login/', function (result)
	{
		//window.location = G_BASE_URL + '/home/';
	});
}

function check_actions_new(uid, time)
{
	$.get(G_BASE_URL + '/home/ajax/check_actions_new/uid-' + uid + '__time-' + time, function (result) 
	{
		if (result.errno == 1)
		{
			if (result.rsm.new_count > 0)
			{
				if ($('#new_actions_tip').is(':hidden'))
				{
					$('#new_actions_tips').fadeIn();
				}

				$('#new_action_num').html(result.rsm.new_count);
			}
		}
	}, 'json');
}