define(function(require) {
	var Site = require('../comp/init.js');
	require('../plugins/jquery.box.js');
	require('../plugins/jquery.window.js');
	require('../plugins/jquery.combobox.js');
	require('../Y-all/Y-script/Y-countdown.js');
	require('../comp/security.js');

	$('.lyclose').click(function() {
		location = location;
	});
	//------------------------------------------------------修改登录/支付密码-----------------------------------------------------------------

	var changeWnd;
	
	$('.modify').click(function() {
		$('input[name=type]').val($(this).attr('t'));
		var operator = $('input[name=operator]').attr('data');
		$('input[name=password]').nextAll('[data=newLogPasswordMail]').remove();
		if("logPassword" == $(this).attr('t')){

		}else{
			if(operator == 'yes'){
				$('input[name=password]').after('<a data="newLogPasswordMail" id="forgotPayPwd" href="javascript:;"> 忘记审核密码？ </a>');
			}else{
				$('input[name=password]').after('<a data="newLogPasswordMail" id="forgotPayPwd" href="javascript:;"> 忘记支付密码？ </a>');
			}
		}
		$('b.error-tip').hide();
		changeWnd = $('body').window({
			content : '#n-fn-layer',
			simple : true,
			closeEle : '.lyclose',
			show : function() {
				this.wnd.find('input').not('[name=type]').val('');
			}
		});
	});
	
	$("#forgotPayPwd").live("click", function(){
		$.ajax({
			url : '/PasswordManage/newPayPasswordMail',
			type : 'post',
			dataType : 'json',
			success : function(res){
				alert(res.message);
			}
		});
	});
	
	var password_form = $('#password_form');
	if (password_form.length) {
		password_form.validate({
			errorClass : 'error-tip',
			errorElement : 'b',
			submitHandler : function() {
				changeWnd.close();
				setHiddenPwd();
				if(!pwd){
					setTimeout(setHiddenPwd,10);
				}else{
					$('[name=password]').val(pwd);
					$('[name=newPassword]').val(rsaPwd);
					$('[name=newPasswordTo]').val(rsaPwdTo);
				}
				password_form.ajaxSubmit({
					success : function(res) {
						if (res.code == 1) {
							$('body').window({
								content : '#result_ok',
								simple : true,
								closeEle : '.lyclose'
							});
						}
						if (res.code == 0) {
							$('body').window({
								content : '#result_no',
								simple : true,
								closeEle : '.lyclose'
							});
						}
					}
				});
			},
			rules : {
				password : {
					required : true
				},
				newPassword : {
					required : true,
					minlength : 6,
					mustNotInclude : ' ',
					notAllNum : true,
					notAllSame : true,
					noZh : true
				},
				newPasswordTo : {
					required : true,
					equalTo : '#newPassword'
				}
			},
			messages : {
				password : {
					required : '请填入当前密码'
				},
				newPassword : {
					required : '请填入新密码',
					range : '新密码为6-20位',
					mustNotInclude : '新密码不允许包含空格',
					notAllNum : '新密码不能全为数字',
					notAllSame : '不能使用完全相同的数字、字母或符号',
					noZh : '不允许中文'
				},
				newPasswordTo : {
					required : '请再次确认新密码',
					equalTo : '两次输入的新密码不一致，请重新输入'
				}
			},
			onkeyup : false
		});

	}
	var modulus = "";
	var exponent = "";
	$('[name=password]').blur(function(){
		$.ajax({
			url : '/login/keyPair',
			type : 'post',
			dataType : 'json',
			success : function(res){
				if(res.code==1){
					modulus = res.modulus;
					exponent = res.exponent;
				}
			}
		});
	});

	var pwd,rsaPwd,rsaPwdTo;
	function setHiddenPwd(){
		var thisPwd = $('[name=password]').val();
		var newPwd = $('[name=newPassword]').val();
		var newPwdTo = $('[name=newPasswordTo]').val();
		var key = RSAUtils.getKeyPair(exponent, '', modulus);
		pwd =  RSAUtils.encryptedString(key, thisPwd);
		rsaPwd = RSAUtils.encryptedString(key, newPwd);
		rsaPwdTo = RSAUtils.encryptedString(key, newPwdTo);
	}
	
	//------------------------------------------------------绑定手机-----------------------------------------------------------------
	var boundMobileWnd;
	$('.bound_mobile').click(function() {
		$('b.error-tip').hide();
		boundMobileWnd = $('body').window({
			content : '#bound_mobile',
			simple : true,
			closeEle : '.lyclose',
			show : function() {
				this.wnd.find('input[name=mobile],input[name=code]').val('');
			}
		});
	});
	
	var boundMobile_form = $('#boundMobile_form');
	if (boundMobile_form.length) {
		boundMobile_form.validate({
			errorClass : 'error-tip',
			errorElement : 'b',
			errorPlacement : function(error, element) {
				if (element.attr('name') == 'mobile') {
					element.next().after(error);
				} else {
					element.after(error);
				}
			},
			submitHandler : function() {
				boundMobileWnd.close();
				boundMobile_form.ajaxSubmit({
					success : function(res) {
						if (res.code == 1) {
							$('body').window({
								content : '#boundMobile_ok',
								simple : true,
								closeEle : '.lyclose'
							});
						}
						if (res.code == 0) {
							$('body').window({
								content : '#boundMobile_no',
								simple : true,
								closeEle : '.lyclose'
							});
						}
					}
				});
			},
			rules : {
				mobile : {
					required : true,
					customRemote : {
						url : '/anon/checkMobile?dateTag=' + new Date().getTime(),
						customError : function(element, res) {
							return res.message;
						}
					}
				},
				code : {
					required : true,
					customRemote : {
						url : '/anon/checkSmsCode',
						data : {
							mobile : function() {
								return $('#mobile2').val();
							},
							business : function() {
								return $('#business2').val();
							},
							code : function() {
								return $('#code2').val();
							}
						},
						customError : function(element, res) {
							return res.message;
						}
					}
				}
			},
			messages : {
				mobile : {
					required : '请输入手机号码'
				},
				code : {
					required : '请输入验证码'
				}
			},
			onkeyup : false
		});

	}
	
	
	//------------------------------------------------------修改绑定手机-----------------------------------------------------------------
	var boundUpdateMobileWnd;
	$('.bound_updateMobile').click(function() {
		$('b.error-tip').hide();
		boundUpdateMobileWnd = $('body').window({
			content : '#bound_updateMobile',
			simple : true,
			closeEle : '.lyclose',
			show : function() {
				this.wnd.find('input[name=newMobile],input[name=code]').val('');
			}
		});
	});
	
	
	var updateBoundMobile_form = $('#updateBoundMobile_form');
	if (updateBoundMobile_form.length) {
		updateBoundMobile_form.validate({
			errorClass : 'error-tip',
			errorElement : 'b',
			errorPlacement : function(error, element) {
				if (element.attr('name') == 'mobile') {
					element.next().after(error);
				} else {
					element.after(error);
				}
			},
			submitHandler : function() {
				boundUpdateMobileWnd.close();
				updateBoundMobile_form.ajaxSubmit({
					success : function(res) {
						if (res.code == 1) {
							$('body').window({
								content : '#boundMobile_ok',
								simple : true,
								closeEle : '.lyclose'
							});
						}
						if (res.code == 0) {
							$('body').window({
								content : '#boundMobile_no',
								simple : true,
								closeEle : '.lyclose'
							});
						}
					}
				});
			},
			rules : {
				mobile : {
					required : true
				},
				newMobile : {
					required : true,
					customRemote : {
						url : '/anon/checkMobile?dateTag='+ new Date().getTime(),
						data : {
							mobile : function() {
								return $('input[name=newMobile]').val();
							}
						},
						customError : function(element, res) {
							return res.message;
						}
					}
				},
				code : {
					required : true,
					customRemote : {
						url : '/anon/checkSmsCode',
						data : {
							mobile : function() {
								return $('#mobile1').val();
							},
							business : function() {
								return $('#business1').val();
							},
							code : function() {
								return $('#code1').val();
							}
						},
						customError : function(element, res) {
							return res.message;
						}
					}
				}
			},
			messages : {
				mobile : {
					required : '请输入手机号码'
				},
				newMobile : {
					required : '请输入新手机号码'
				},
				code : {
					required : '请输入验证码'
				}
			},
			onkeyup : false
		});

	}
	
	// -------------------------------------发送手机验证码-----------------------------------------------
	$('#getCode1').click(function() {
		var business = $("#business1").val();
		var mobile = $("#mobile1").val();
		var countdown = Y.getCmp('getCode1');
		sendMobile(business, mobile, countdown);
	});
	$('#getCode2').click(function() {
		var business = $("#business2").val();
		var mobile = $("#mobile2").val();
		var countdown = Y.getCmp('getCode2');
		if (!$("#mobile2").valid()) {
			countdown.close(0);
			return;
		} else {
			sendMobile(business, mobile, countdown);
		}
	});

	function sendMobile(business, mobile, conutdown) {
		$.ajax({
			url : '/anon/sendSmsCode?date='+new Date().getTime(),
			dataType : 'json',
			data : {
				mobile : mobile,
				business : business
			},
			cache : false,
			success : function(res) {
				if (res.code == 1) {
				} else {
					alert(res.message);
					if (countdown) {
						countdown.close();
					}
				}
			},
			error : function() {
				alert('获取验证码失败');
				if (countdown) {
					countdown.close();
				}
			}
		});
	}
/**************************************修改邮箱*******************************************/
	var boundUpdateMailWnd;
	$('.bound_updateMail').click(function() {
		$('b.error-tip').hide();
		boundUpdateMailWnd = $('body').window({
			content : '#bound_updateMail',
			simple : true,
			closeEle : '.lyclose',
			show : function() {
				this.wnd.find('input[name=newMobile],input[name=code]').val('');
			}
		});
	});
	
	$('#getCode3').click(function() {
		var business = $("#business3").val();
		var mobile = $("#mobile5").val();
		var userName = $('#userName').val();
		var countdown = Y.getCmp('getCode3');
		if(userName!=""){
			sendMobile1(business, mobile, countdown,userName);
		}else{
			alert('请输入用户名');
		}
		
	});
	function sendMobile1(business, mobile, countdown,userName) {
		$.ajax({
			url : '/anon/sendSmsPasswordCode',
			dataType : 'json',
			data : {
				mobile : mobile,
				business : business,
				userName : userName
			},
			cache : false,
			success : function(res) {
				if (res.code == 1) {
				} else {
					alert(res.message);
					if (countdown) {
						countdown.close();
					}
				}
			},
			error : function() {
				alert('获取验证码失败');
				if (countdown) {
					countdown.close();
				}
			}
		});
	}
	
	var bound_updateMail_form = $('#bound_updateMail_form');
	if (bound_updateMail_form.length) {
		bound_updateMail_form.validate({
			errorClass : 'error-tip',
			errorElement : 'b',
			errorPlacement : function(error, element) {
				if (element.attr('name') == 'newMail') {
					element.after(error);
				} else {
					element.after(error);
				}
			},
			submitHandler : function() {
				boundUpdateMailWnd.close();
				bound_updateMail_form.ajaxSubmit({
					success : function(res) {
						if (res.code == 1) {
							window.location.href="/usercenter/accountSetting";   //账户设置
							alert('修改邮箱成功');
							window.location.reload();
						}
						if (res.code == 0) {
							window.location.href="/security/center";
							alert('修改邮箱失败');
						}
					}
				});
			},
			rules : {
				newMail : {
					required : true,
					customRemote : {
						url : '/anon/checkEmail?dateTag='+ new Date().getTime(),
						data : {
							email : function() {
								return $('[name=newMail]').val();
							}
						},
						customError : function(element, res) {
							return res.message;
						}
					}
				},
				mailCode : {
					required : true,
					customRemote : {
						url : '/anon/checkSmsCode',
						data : {
							mobile : function() {
								return $('#mobile5').val();
							},
							business : function() {
								return $('#business3').val();
							},
							code : function() {
								return $('#mailCode').val();
							}
						},
						customError : function(element, res) {
							return res.message;
						}
					}
				}
			},
			messages : {
				newMail : {
					required : '请输入新邮箱地址'
				},
				mailCode : {
					required : '请输入验证码'
				}
			},
			onkeyup : false
		});

	}
	
});
