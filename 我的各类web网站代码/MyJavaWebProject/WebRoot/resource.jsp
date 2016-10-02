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
			<a href="#"><img src='http://v2.freep.cn/3tb_1603201737172dm5512293.jpg'  width="1200" height="800" /></a>
		</div>
		<div id="box">
		<%
		String loginUser4 = "";
		if(session.getAttribute("loginUser4")!=null)
		{
		   loginUser4 = session.getAttribute("loginUser4").toString();
		}
		 %>
			<font size=6><strong>欢迎您<font color="red"><%=loginUser4%></font><br>
			<a href="http://pan.baidu.com/s/1jHgGaZc" target="_blank">如需碎碎资源，请点此链接</a></strong></font>
			
		</div>
	</div>
	</body>
</html>