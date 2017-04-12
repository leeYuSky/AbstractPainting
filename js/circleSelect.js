(function($){
	$.fn.circleSelect = function(options){
		var defaults = {
			parent : ".nav-wrap",
			link : ".main-nav",
			selector : ".lee",
		}

		$.extend("true",defaults,options);

		var navWrap = $(this); //父容器

		$.each(navWrap,function(){

			var thisWrap = $(this);

			var navs = thisWrap.find("div"+defaults.selector); //子单选框

	        // 圆的半径 raduis
			var width = thisWrap.width();
			var radius = width / 2;

			// 圆形菜单的起始、终止角度
			var startAngle = 0;
			var endAngle = 360;

			// 两个子菜单间的夹角 gap
			var total = navs.length;
			var gap = (endAngle - startAngle) / total;

			 // 角度->弧度
	        var radian = Math.PI / 180;

	        $.each(navs, function(index, item){

	          	// 当前子菜单与x轴正向的夹角 θ （角度->弧度）
	          	var myAngle = (startAngle + gap*index) * radian;  // θ

	          	// 计算当前子菜单相对于左上角(0,0)的坐标 (x,y)
	          	var myX = radius + radius * Math.cos( myAngle ), // x=r+rcos(θ)
	              	myY = radius + radius * Math.sin( myAngle ); // y=r+rsin(θ)
	        
	          	// 设置当前子菜单的位置 (left,top) = (x,y)
	          	$(this).css({
	                left: myX + 'px',
	                top:  myY + 'px'
	            });
	        });
		});

		
	}
})(jQuery);