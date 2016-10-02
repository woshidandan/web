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
	<div id="container">
		<div class="logo">
			<a href="#"><img src='http://v1.freep.cn/3tb_160320191359odkc512293.jpg'  width="910" height="800" /></a>
			<a href="#"><img src='http://v2.freep.cn/3tb_160320205259247c512293.png'  width="910" height="800" /></a>
		</div>
		<div id="box">
		<%
		String loginUser = "";
		if(session.getAttribute("loginUser")!=null)
		{
		   loginUser = session.getAttribute("loginUser").toString();
		}
		 %>
			<font size=6><strong>欢迎您<font color="red"><%=loginUser%></font><br>
			<a href="http://tieba.baidu.com/f?kw=cc%C3%A8_&fr=ala0&tpl=5" target="_blank">请点击此链接进入我们的贴吧首页</a></strong></font>
			
		</div>
	</div>
	</body>
</html>