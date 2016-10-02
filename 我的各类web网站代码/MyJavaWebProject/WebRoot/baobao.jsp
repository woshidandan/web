<%@ page language="java" import="java.util.*" contentType="text/html; charset=utf-8"%>
<%
   String path = request.getContextPath();
   String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
	<head>
		<!-- Page title -->
		<title>乖宝宝</title>
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
			<a href="#"><img src='http://v1.freep.cn/3tb_160320212522ixa9512293.gif'  width="1200" height="800" /></a>
		</div>
		<div id="box">
		<%
		String loginUser6 = "";
		if(session.getAttribute("loginUser6")!=null)
		{
		   loginUser6 = session.getAttribute("loginUser6").toString();
		}
		 %>
			<font size=7><strong>欢迎<font color="red"><%=loginUser6%></font><br>
			由于你太美丽了，系统卡在这里了！</strong></font>
			
		</div>
	</div>
	</body>
</html>