<%@ page language="java" import="java.util.*" contentType="text/html; charset=utf-8"%>
<%
   String path = request.getContextPath();
   String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
	<head>
		<!-- Page title -->
		<title>萌c大大</title>
		<!-- End of Page title -->
		<!-- Libraries -->
		<link type="text/css" href="css/login.css" rel="stylesheet" />	
		<link type="text/css" href="css/smoothness/jquery-ui-1.7.2.custom.html" rel="stylesheet" />	
		<script type="text/javascript" src="js/jquery-1.3.2.min.js"></script>
		<script type="text/javascript" src="js/easyTooltip.js"></script>
		<script type="text/javascript" src="js/jquery-ui-1.7.2.custom.min.js"></script>
		<!-- End of Libraries -->	
	</head>
	<body>
	<--<div id="container">
		<div class="logo">
			<a href="#"><img src='http://v2.freep.cn/3tb_1603201737172dm5512293.jpg'  width="2400" height="800" /></a>
		</div>
		<div id="box">
			<form action="dologin.jsp" method="post">
			<p class="main">
			<font size=3><strong>
			我们cc猫目前有以下项目：贴吧，社团，QQ群，微博，如果喵需要cc表情和图片，请输入：资源<br>
				<label>请输入喵你的姓名哦: </label>
				<input name="username" value="" />
				<label>请输入喵你想要了解的项目: </label> 
				<input name="project" value="" />
				</strong></font>
			</p>
			<p class="space">
				<input type="submit" value="确定" class="login" style="cursor: pointer;"/>
			</p>
			</form>
		</div>
	</div> -->
	</body>
</html>